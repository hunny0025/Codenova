import requests
import numpy as np
from typing import List, Optional, Dict, Any
from models.recipe_model import Recipe
from utils.cache import cache
from config import Config
from services.flavor_service import flavor_service

class RecipeService:
    """
    Connects to Foodoscope RecipeDB API with Bearer authentication.
    Falls back to mock data if the API is unavailable or token is missing.
    """

    def __init__(self):
        self.base_url = Config.FOODOSCOPE_BASE_URL
        self.token = Config.FOODOSCOPE_TOKEN
        self.timeout = Config.API_TIMEOUT

    @property
    def headers(self) -> Dict[str, str]:
        return {"Authorization": f"Bearer {self.token}"}

    @property
    def is_live(self) -> bool:
        """Check if we have a valid token for live API calls."""
        return bool(self.token) and self.token != 'your_token_here'

    @staticmethod
    def _compute_flavor(ingredients: list) -> np.ndarray:
        """Compute mean flavor vector from ingredient list using FlavorService."""
        if not ingredients:
            return np.zeros(5)
        vectors = [flavor_service.get_flavor_vector(ing) for ing in ingredients]
        return np.mean(vectors, axis=0)

    def _api_get(self, path: str, params: Dict = None) -> Optional[Any]:
        """
        Makes a GET request to the Foodoscope API.
        Returns parsed JSON on success, None on failure.
        """
        if not self.is_live:
            return None

        cache_key = f"api_{path}_{params}"
        cached = cache.get(cache_key)
        if cached is not None:
            return cached

        try:
            url = f"{self.base_url}{path}"
            resp = requests.get(url, headers=self.headers, params=params, timeout=self.timeout)

            if resp.status_code == 401:
                print("[RecipeService] Invalid or expired Foodoscope token.")
                return None
            if resp.status_code != 200:
                print(f"[RecipeService] API returned {resp.status_code}: {resp.text[:200]}")
                return None

            data = resp.json()
            cache.set(cache_key, data)
            return data

        except requests.exceptions.Timeout:
            print("[RecipeService] API request timed out.")
            return None
        except requests.exceptions.ConnectionError:
            print("[RecipeService] Could not connect to Foodoscope API.")
            return None
        except Exception as e:
            print(f"[RecipeService] Unexpected error: {e}")
            return None



    def _parse_recipe(self, raw: Dict) -> Recipe:
        """Converts a Foodoscope API recipe dict into our Recipe model."""
        # Foodoscope fields vary; adapt gracefully
        recipe_id = str(raw.get('recipe_id', raw.get('_id', '')))
        title = raw.get('recipe_title', raw.get('title', 'Untitled'))

        # Ingredients: Foodoscope may return 'ingredients' as list of dicts or strings
        raw_ingredients = raw.get('ingredients', [])
        ingredients = []
        for ing in raw_ingredients:
            if isinstance(ing, dict):
                ingredients.append(ing.get('ingredient', str(ing)))
            else:
                ingredients.append(str(ing))

        # Nutrition
        nutrition = {}
        if 'nutritional_info' in raw:
            nutrition = raw['nutritional_info']
        elif 'calories' in raw:
            nutrition = {'calories': raw.get('calories', 0)}

        # Diet tags
        diet_tags = []
        diet = raw.get('diet', raw.get('sub_region', ''))
        if isinstance(diet, str) and diet:
            diet_tags.append(diet.lower())
        continent = raw.get('continent', '')
        if continent:
            diet_tags.append(continent.lower())

        # Price approximation (based on ingredient count)
        price = round(len(ingredients) * 2.5, 2)

        # Image
        image_url = raw.get('img_url', raw.get('image_url', ''))

        # Compute flavor profile from ingredients
        flavor_profile = self._compute_flavor(ingredients)

        return Recipe(
            id=recipe_id,
            title=title,
            ingredients=ingredients,
            flavor_profile=flavor_profile,
            nutrition_info=nutrition,
            price_approx=price,
            diet_tags=diet_tags,
            image_url=image_url
        )

    def _parse_recipes(self, data: Any) -> List[Recipe]:
        """Parses API response (list or dict with results) into Recipe list."""
        if data is None:
            return []
        if isinstance(data, list):
            return [self._parse_recipe(r) for r in data]
        if isinstance(data, dict):
            # Some endpoints wrap results
            results = data.get('results', data.get('recipes', data.get('data', [])))
            if isinstance(results, list):
                return [self._parse_recipe(r) for r in results]
            # Single recipe object
            return [self._parse_recipe(data)]
        return []

    # ──────────────────────────────────────────────
    # 5 Foodoscope API Endpoints
    # ──────────────────────────────────────────────

    def search_by_title(self, title: str) -> List[Recipe]:
        """GET /recipe-bytitle/recipeByTitle?title={title}"""
        data = self._api_get('/recipe-bytitle/recipeByTitle', params={'title': title})
        recipes = self._parse_recipes(data)
        return recipes if recipes else self._get_mock_recipes_filtered(title=title)

    def filter_by_diet(self, diet: str, limit: int = 10) -> List[Recipe]:
        """GET /recipe-diet/recipe-diet?diet={diet}&limit={limit}"""
        data = self._api_get('/recipe-diet/recipe-diet', params={'diet': diet, 'limit': limit})
        recipes = self._parse_recipes(data)
        return recipes if recipes else self._get_mock_recipes_filtered(diet=diet)

    def filter_by_calories(self, min_cal: int, max_cal: int) -> List[Recipe]:
        """GET /recipe-calories/recipe-calories?min={min}&max={max}"""
        data = self._api_get('/recipe-calories/recipe-calories', params={'min': min_cal, 'max': max_cal})
        recipes = self._parse_recipes(data)
        return recipes if recipes else self._get_mock_recipes()

    def get_recipe_by_id(self, recipe_id: str) -> Optional[Recipe]:
        """GET /recipe-byid?id={id}"""
        data = self._api_get('/recipe-byid', params={'id': recipe_id})
        recipes = self._parse_recipes(data)
        if recipes:
            return recipes[0]
        # Fallback: search mock data by ID
        for r in self._get_mock_recipes():
            if r.id == recipe_id:
                return r
        return None

    def filter_by_cuisine(self, cuisine: str) -> List[Recipe]:
        """GET /recipe-by-cuisine/recipe-by-cuisine?cuisine={cuisine}"""
        data = self._api_get('/recipe-by-cuisine/recipe-by-cuisine', params={'cuisine': cuisine})
        recipes = self._parse_recipes(data)
        return recipes if recipes else self._get_mock_recipes()

    # ──────────────────────────────────────────────
    # Existing methods (preserved for backward compat)
    # ──────────────────────────────────────────────

    def get_all_recipes(self) -> List[Recipe]:
        """
        Returns recipes. Tries live API (diet=vegetarian) first,
        falls back to mock data.
        """
        if self.is_live:
            live = self.filter_by_diet('vegetarian', limit=20)
            if live:
                return live
        return self._get_mock_recipes()

    def get_recipes_by_ingredients(self, ingredients: List[str]) -> List[Recipe]:
        """Pantry mode: match recipes by available ingredients."""
        all_recipes = self.get_all_recipes()
        matched = []
        for r in all_recipes:
            match_count = sum(1 for i in r.ingredients if i.lower() in [x.lower() for x in ingredients])
            if match_count > 0:
                matched.append(r)
        return matched

    # ──────────────────────────────────────────────
    # Mock / Fallback Data
    # ──────────────────────────────────────────────

    def _get_mock_recipes(self) -> List[Recipe]:
        """Returns hardcoded demo recipes as fallback."""
        mock_data = [
            {"id": "1", "title": "Avocado Toast", "ingredients": ["avocado", "bread", "salt", "pepper"],
             "nutrition": {"calories": 300, "sugar": 2}, "price": 5.0, "tags": ["veg", "vegan", "breakfast"]},
            {"id": "2", "title": "Chicken Curry", "ingredients": ["chicken", "curry paste", "coconut milk"],
             "nutrition": {"calories": 600, "sodium": 800}, "price": 12.0, "tags": ["non-veg", "dinner"]},
            {"id": "3", "title": "Vegan Salad", "ingredients": ["lettuce", "tofu", "tomato", "cucumber"],
             "nutrition": {"calories": 200, "sugar": 3}, "price": 8.0, "tags": ["veg", "vegan", "jain", "lunch"]},
            {"id": "4", "title": "Grilled Salmon", "ingredients": ["salmon", "lemon", "herbs"],
             "nutrition": {"calories": 500, "sugar": 0, "sodium": 100}, "price": 15.0, "tags": ["non-veg", "dinner"]},
            {"id": "5", "title": "Pasta Alfredo", "ingredients": ["pasta", "cream", "cheese"],
             "nutrition": {"calories": 800, "sugar": 5, "sodium": 400}, "price": 10.0, "tags": ["veg", "dinner"]},
            {"id": "6", "title": "Fruit Bowl", "ingredients": ["apple", "banana", "berry"],
             "nutrition": {"calories": 150, "sugar": 20}, "price": 4.0, "tags": ["veg", "vegan", "jain", "breakfast"]},
            {"id": "7", "title": "Vegetable Stir Fry", "ingredients": ["broccoli", "carrot", "soy sauce"],
             "nutrition": {"calories": 350, "sodium": 600}, "price": 7.0, "tags": ["veg", "vegan", "dinner"]},
        ]
        recipes = []
        for d in mock_data:
            recipes.append(Recipe(
                id=d["id"], title=d["title"], ingredients=d["ingredients"],
                flavor_profile=self._compute_flavor(d["ingredients"]),
                nutrition_info=d["nutrition"],
                price_approx=d["price"], diet_tags=d["tags"]
            ))
        return recipes

    def _get_mock_recipes_filtered(self, title: str = None, diet: str = None) -> List[Recipe]:
        """Returns mock recipes filtered by title or diet for fallback."""
        recipes = self._get_mock_recipes()
        if title:
            recipes = [r for r in recipes if title.lower() in r.title.lower()]
        if diet:
            recipes = [r for r in recipes if diet.lower() in [t.lower() for t in r.diet_tags]]
        return recipes


recipe_service = RecipeService()
