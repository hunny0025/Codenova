"""
CommunityService — In-memory store for user-posted recipes with AI enrichment.
"""
import uuid
import hashlib
from datetime import datetime
from typing import List, Optional, Dict
import numpy as np

from models.community_recipe_model import CommunityRecipe
from services.flavor_service import flavor_service


# Nutrition estimates per common ingredient category (per 100g approx)
INGREDIENT_NUTRITION = {
    'rice': {'calories': 130, 'protein': 2.7, 'carbs': 28, 'fat': 0.3, 'fiber': 0.4},
    'wheat': {'calories': 340, 'protein': 13, 'carbs': 72, 'fat': 2.5, 'fiber': 12},
    'dal': {'calories': 116, 'protein': 9, 'carbs': 20, 'fat': 0.4, 'fiber': 8},
    'potato': {'calories': 77, 'protein': 2, 'carbs': 17, 'fat': 0.1, 'fiber': 2.2},
    'chicken': {'calories': 239, 'protein': 27, 'carbs': 0, 'fat': 14, 'fiber': 0},
    'paneer': {'calories': 265, 'protein': 18, 'carbs': 1.2, 'fat': 21, 'fiber': 0},
    'tomato': {'calories': 18, 'protein': 0.9, 'carbs': 3.9, 'fat': 0.2, 'fiber': 1.2},
    'onion': {'calories': 40, 'protein': 1.1, 'carbs': 9, 'fat': 0.1, 'fiber': 1.7},
    'oil': {'calories': 884, 'protein': 0, 'carbs': 0, 'fat': 100, 'fiber': 0},
    'milk': {'calories': 42, 'protein': 3.4, 'carbs': 5, 'fat': 1, 'fiber': 0},
    'sugar': {'calories': 387, 'protein': 0, 'carbs': 100, 'fat': 0, 'fiber': 0},
    'butter': {'calories': 717, 'protein': 0.9, 'carbs': 0.1, 'fat': 81, 'fiber': 0},
    'cream': {'calories': 340, 'protein': 2, 'carbs': 3, 'fat': 36, 'fiber': 0},
    'cheese': {'calories': 402, 'protein': 25, 'carbs': 1.3, 'fat': 33, 'fiber': 0},
    'egg': {'calories': 155, 'protein': 13, 'carbs': 1.1, 'fat': 11, 'fiber': 0},
    'fish': {'calories': 206, 'protein': 22, 'carbs': 0, 'fat': 12, 'fiber': 0},
    'coconut': {'calories': 354, 'protein': 3.3, 'carbs': 15, 'fat': 33, 'fiber': 9},
    'lemon': {'calories': 29, 'protein': 1.1, 'carbs': 9, 'fat': 0.3, 'fiber': 2.8},
    'spinach': {'calories': 23, 'protein': 2.9, 'carbs': 3.6, 'fat': 0.4, 'fiber': 2.2},
    'carrot': {'calories': 41, 'protein': 0.9, 'carbs': 10, 'fat': 0.2, 'fiber': 2.8},
}

# Default nutrition for unknown ingredients
DEFAULT_NUTRITION = {'calories': 80, 'protein': 2, 'carbs': 12, 'fat': 1.5, 'fiber': 1}

# Cost heuristics per budget tier
COST_PER_INGREDIENT = {'₹': 8, '₹₹': 15, '₹₹₹': 25}


class CommunityService:
    """In-memory community recipe store with AI enrichment."""

    def __init__(self):
        self._recipes: Dict[str, CommunityRecipe] = {}
        self._seed_demo_recipes()

    def _seed_demo_recipes(self):
        """Pre-populate with demo recipes for hackathon presentation."""
        demos = [
            {
                "author_id": "demo_chef_1", "author_name": "Priya Sharma",
                "title": "Mumbai Street Pav Bhaji",
                "cuisine": "Street Food", "region": "Maharashtra",
                "diet_type": "veg", "spice_level": 4,
                "ingredients": [
                    {"name": "potato", "quantity": "4 medium"},
                    {"name": "tomato", "quantity": "3 large"},
                    {"name": "onion", "quantity": "2 medium"},
                    {"name": "butter", "quantity": "3 tbsp"},
                    {"name": "pav bhaji masala", "quantity": "2 tbsp"},
                    {"name": "bread", "quantity": "8 pav rolls"},
                ],
                "steps": [
                    "Boil and mash potatoes",
                    "Sauté finely chopped onions and tomatoes in butter",
                    "Add pav bhaji masala and cook until oil separates",
                    "Mix in mashed potatoes, simmer for 10 minutes",
                    "Toast pav rolls with butter on a flat pan",
                    "Serve bhaji topped with raw onion and lemon"
                ],
                "health_tags": ["budget-friendly"],
                "budget_tier": "₹",
            },
            {
                "author_id": "demo_chef_2", "author_name": "Arjun Reddy",
                "title": "Hyderabadi Chicken Biryani",
                "cuisine": "Mughlai", "region": "Telangana",
                "diet_type": "non-veg", "spice_level": 4,
                "ingredients": [
                    {"name": "rice", "quantity": "2 cups basmati"},
                    {"name": "chicken", "quantity": "500g"},
                    {"name": "onion", "quantity": "3 large"},
                    {"name": "tomato", "quantity": "2 medium"},
                    {"name": "yogurt", "quantity": "1 cup"},
                    {"name": "biryani masala", "quantity": "2 tbsp"},
                    {"name": "oil", "quantity": "4 tbsp"},
                ],
                "steps": [
                    "Marinate chicken in yogurt and spices for 2 hours",
                    "Fry sliced onions until golden brown",
                    "Cook rice to 70% done with whole spices",
                    "Layer chicken, fried onions, and rice in a heavy pot",
                    "Seal and cook on very low heat (dum) for 25 minutes",
                    "Garnish with mint, serve with raita"
                ],
                "health_tags": ["high-protein"],
                "budget_tier": "₹₹",
            },
            {
                "author_id": "demo_chef_3", "author_name": "Meera Patel",
                "title": "Gujarati Dal Dhokli",
                "cuisine": "Gujarati", "region": "Gujarat",
                "diet_type": "veg", "spice_level": 2,
                "ingredients": [
                    {"name": "dal", "quantity": "1 cup toor dal"},
                    {"name": "wheat", "quantity": "1 cup flour"},
                    {"name": "tomato", "quantity": "1 medium"},
                    {"name": "jaggery", "quantity": "1 tbsp"},
                    {"name": "lemon", "quantity": "1"},
                    {"name": "peanut", "quantity": "2 tbsp"},
                ],
                "steps": [
                    "Cook toor dal with turmeric until soft",
                    "Knead wheat flour dough with spices",
                    "Roll thin and cut into diamond shapes",
                    "Add jaggery, tamarind to boiling dal",
                    "Drop dhokli pieces into simmering dal",
                    "Cook until dhokli floats, temper with mustard seeds"
                ],
                "health_tags": ["high-protein", "diabetic-friendly"],
                "budget_tier": "₹",
            },
            {
                "author_id": "demo_chef_4", "author_name": "Lakshmi Iyer",
                "title": "Kerala Fish Curry",
                "cuisine": "Kerala", "region": "Kerala",
                "diet_type": "non-veg", "spice_level": 3,
                "ingredients": [
                    {"name": "fish", "quantity": "500g seer fish"},
                    {"name": "coconut", "quantity": "1 cup milk"},
                    {"name": "tomato", "quantity": "2 medium"},
                    {"name": "onion", "quantity": "1 large"},
                    {"name": "tamarind", "quantity": "1 tbsp"},
                    {"name": "curry leaves", "quantity": "2 sprigs"},
                ],
                "steps": [
                    "Grind coconut with chilli and turmeric to paste",
                    "Sauté onions and tomatoes in coconut oil",
                    "Add coconut paste and thin with water",
                    "Bring to gentle simmer, add tamarind",
                    "Slide fish pieces in, cook 8-10 minutes",
                    "Finish with curry leaves and raw coconut oil"
                ],
                "health_tags": ["high-protein", "low-carb"],
                "budget_tier": "₹₹",
            },
            {
                "author_id": "demo_chef_5", "author_name": "Ritu Kapoor",
                "title": "Rajasthani Dal Baati Churma",
                "cuisine": "Rajasthani", "region": "Rajasthan",
                "diet_type": "veg", "spice_level": 2,
                "ingredients": [
                    {"name": "wheat", "quantity": "2 cups flour"},
                    {"name": "dal", "quantity": "1 cup mixed dal"},
                    {"name": "butter", "quantity": "100g ghee"},
                    {"name": "sugar", "quantity": "3 tbsp"},
                    {"name": "onion", "quantity": "1 medium"},
                    {"name": "tomato", "quantity": "1 medium"},
                ],
                "steps": [
                    "Knead stiff dough with ghee, shape into round baatis",
                    "Bake baatis in oven at 180°C until golden (40 min)",
                    "Cook mixed dal with spices until creamy",
                    "Crush baked baati, mix with ghee and jaggery for churma",
                    "Serve baati broken into dal, with churma on side"
                ],
                "health_tags": ["traditional"],
                "budget_tier": "₹",
            },
        ]
        for d in demos:
            self.create_recipe(d)
        print(f"[CommunityService] Seeded {len(demos)} demo community recipes")

    # ── AI Enrichment ──────────────────────────────────────────

    def _ai_enrich(self, recipe: CommunityRecipe):
        """
        AI-powered enrichment using FlavorService.
        Generates: flavor_profile, estimated_nutrition, estimated_cost, health_warnings.
        """
        ingredient_names = [ing.get('name', '') for ing in recipe.ingredients]

        # 1. Flavor vector — average of all ingredient vectors via FlavorService
        if ingredient_names:
            vectors = [flavor_service.get_flavor_vector(name) for name in ingredient_names]
            recipe.flavor_profile = np.mean(vectors, axis=0)
        else:
            recipe.flavor_profile = np.zeros(5)

        # 2. Nutrition estimation
        total = {'calories': 0, 'protein': 0, 'carbs': 0, 'fat': 0, 'fiber': 0}
        for name in ingredient_names:
            key = name.lower().strip()
            # Fuzzy match: check if any known ingredient is a substring
            matched = DEFAULT_NUTRITION
            for known, values in INGREDIENT_NUTRITION.items():
                if known in key or key in known:
                    matched = values
                    break
            for nutrient in total:
                total[nutrient] += matched[nutrient]

        # Per serving (assume 2 servings)
        recipe.estimated_nutrition = {k: round(v / 2, 1) for k, v in total.items()}

        # 3. Cost estimation
        base_cost = COST_PER_INGREDIENT.get(recipe.budget_tier, 15)
        recipe.estimated_cost = round(base_cost * len(ingredient_names) / 2, 2)

        # 4. Health warnings
        warnings = []
        if recipe.estimated_nutrition.get('calories', 0) > 600:
            warnings.append("High calorie dish — consider reducing oil/butter")
        if recipe.estimated_nutrition.get('fat', 0) > 30:
            warnings.append("High fat content — may not suit heart-healthy diets")
        if recipe.estimated_nutrition.get('carbs', 0) > 80:
            warnings.append("High carb — not ideal for low-carb or diabetic diets")
        if recipe.spice_level >= 4:
            warnings.append("Very spicy — may cause discomfort for sensitive stomachs")
        recipe.health_warnings = warnings

    # ── CRUD Operations ────────────────────────────────────────

    def create_recipe(self, data: dict) -> CommunityRecipe:
        """Create a new community recipe with AI enrichment."""
        recipe_id = str(uuid.uuid4())[:8]

        recipe = CommunityRecipe(
            id=recipe_id,
            author_id=data.get('author_id', 'anonymous'),
            author_name=data.get('author_name', 'Anonymous Chef'),
            title=data.get('title', 'Untitled Recipe'),
            cuisine=data.get('cuisine', ''),
            region=data.get('region', ''),
            diet_type=data.get('diet_type', 'veg'),
            spice_level=int(data.get('spice_level', 3)),
            ingredients=data.get('ingredients', []),
            steps=data.get('steps', []),
            health_tags=data.get('health_tags', []),
            budget_tier=data.get('budget_tier', '₹₹'),
            image_url=data.get('image_url', ''),
            created_at=datetime.utcnow().isoformat() + 'Z',
        )

        # AI enrichment
        self._ai_enrich(recipe)

        self._recipes[recipe_id] = recipe
        return recipe

    def get_all(self, sort_by: str = 'newest', diet_filter: str = '') -> List[CommunityRecipe]:
        """Get all recipes with sorting and optional diet filter."""
        recipes = list(self._recipes.values())

        # Filter by diet
        if diet_filter:
            recipes = [r for r in recipes if r.diet_type == diet_filter]

        # Sort
        if sort_by == 'popular':
            recipes.sort(key=lambda r: r.likes, reverse=True)
        elif sort_by == 'budget':
            tier_order = {'₹': 0, '₹₹': 1, '₹₹₹': 2}
            recipes.sort(key=lambda r: tier_order.get(r.budget_tier, 1))
        else:  # newest
            recipes.sort(key=lambda r: r.created_at, reverse=True)

        return recipes

    def get_by_id(self, recipe_id: str) -> Optional[CommunityRecipe]:
        return self._recipes.get(recipe_id)

    def like_recipe(self, recipe_id: str, user_id: str) -> Optional[CommunityRecipe]:
        """Toggle like on a recipe."""
        recipe = self._recipes.get(recipe_id)
        if not recipe:
            return None

        if user_id in recipe.liked_by:
            recipe.liked_by.discard(user_id)
            recipe.likes = max(0, recipe.likes - 1)
        else:
            recipe.liked_by.add(user_id)
            recipe.likes += 1

        return recipe

    def get_by_author(self, author_id: str) -> List[CommunityRecipe]:
        return [r for r in self._recipes.values() if r.author_id == author_id]


# Singleton
community_service = CommunityService()
