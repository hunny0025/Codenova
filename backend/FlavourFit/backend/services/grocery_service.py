from typing import Dict, List

class GroceryService:
    def generate_grocery_list(self, meal_plan: Dict[str, List[Dict]]) -> Dict[str, int]:
        """
        Aggregates ingredients from a meal plan.
        Returns: {"ingredient_name": quantity_count, ...}
        """
        grocery_list = {}
        
        for day, meals in meal_plan.items():
            for meal in meals:
                recipe = meal['recipe']
                ingredients = recipe.get('ingredients', [])
                for ing in ingredients:
                    ing_name = ing.lower().strip()
                    if ing_name in grocery_list:
                        grocery_list[ing_name] += 1
                    else:
                        grocery_list[ing_name] = 1
                        
        return grocery_list

grocery_service = GroceryService()
