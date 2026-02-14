from typing import List
from models.recipe_model import Recipe
import numpy as np
from services.flavor_service import flavor_service

class RecipeService:
    def get_all_recipes(self) -> List[Recipe]:
        """
        Mocks fetching recipes from an external DB or API.
        """
        # Mock Data
        mock_data = [
            {
                "id": "1", "title": "Avocado Toast", "ingredients": ["avocado", "bread", "salt", "pepper"],
                "nutrition": {"calories": 300, "sugar": 2}, "price": 5.0, "tags": ["veg", "vegan", "breakfast"]
            },
            {
                "id": "2", "title": "Chicken Curry", "ingredients": ["chicken", "curry paste", "coconut milk"],
                "nutrition": {"calories": 600, "sodium": 800}, "price": 12.0, "tags": ["non-veg", "dinner"]
            },
            {
                "id": "3", "title": "Vegan Salad", "ingredients": ["lettuce", "tofu", "tomato", "cucumber"],
                "nutrition": {"calories": 200, "sugar": 3}, "price": 8.0, "tags": ["veg", "vegan", "jain", "lunch"]
            },
            {
                "id": "4", "title": "Grilled Salmon", "ingredients": ["salmon", "lemon", "herbs"],
                "nutrition": {"calories": 500, "sugar": 0, "sodium": 100}, "price": 15.0, "tags": ["non-veg", "dinner"]
            },
             {
                "id": "5", "title": "Pasta Alfredo", "ingredients": ["pasta", "cream", "cheese"],
                "nutrition": {"calories": 800, "sugar": 5, "sodium": 400}, "price": 10.0, "tags": ["veg", "dinner"]
            },
             {
                "id": "6", "title": "Fruit Bowl", "ingredients": ["apple", "banana", "berry"],
                "nutrition": {"calories": 150, "sugar": 20}, "price": 4.0, "tags": ["veg", "vegan", "jain", "breakfast"]
            },
             {
                "id": "7", "title": "Vegetable Stir Fry", "ingredients": ["broccoli", "carrot", "soy sauce"],
                "nutrition": {"calories": 350, "sodium": 600}, "price": 7.0, "tags": ["veg", "vegan", "dinner"]
            },
        ]

        recipes = []
        for data in mock_data:
            # Calculate composite flavor profile
            flavor_accum = np.zeros(5)
            for ing in data["ingredients"]:
                flavor_accum += flavor_service.get_flavor_vector(ing)
            
            # Average flavor vector
            if len(data["ingredients"]) > 0:
                flavor_accum /= len(data["ingredients"])

            recipe = Recipe(
                id=data["id"],
                title=data["title"],
                ingredients=data["ingredients"],
                flavor_profile=flavor_accum,
                nutrition_info=data["nutrition"],
                price_approx=data["price"],
                diet_tags=data["tags"]
            )
            recipes.append(recipe)
            
        return recipes

    def get_recipes_by_ingredients(self, ingredients: List[str]) -> List[Recipe]:
        all_recipes = self.get_all_recipes()
        matched = []
        for r in all_recipes:
            # Simple check: if recipe contains ANY of the pantry ingredients
            # Logic can be improved to "percentage of matched ingredients"
            match_count = sum(1 for i in r.ingredients if i in ingredients)
            if match_count > 0:
                matched.append(r)
        return matched

recipe_service = RecipeService()
