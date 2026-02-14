from typing import List
from models.recipe_model import Recipe
from models.user_model import User

def filter_recipes(user: User, recipes: List[Recipe]) -> List[Recipe]:
    """Filters recipes based on user constraints."""
    filtered = []
    
    for recipe in recipes:
        # 1. Diet Type Filter
        if user.diet_type == 'veg' and 'veg' not in recipe.diet_tags:
            continue
        if user.diet_type == 'vegan' and 'vegan' not in recipe.diet_tags:
            continue
        if user.diet_type == 'jain' and 'jain' not in recipe.diet_tags:
            continue

        # 2. Allergy Filter
        has_allergen = False
        for allergen in user.allergies:
            # Simple substring match for hackathon
            # In production, use structured ingredient IDs
            for ingredient in recipe.ingredients:
                if allergen.lower() in ingredient.lower():
                    has_allergen = True
                    break
            if has_allergen:
                break
        if has_allergen:
            continue

        # 3. Budget Filter (Approximate)
        if user.daily_budget > 0 and recipe.price_approx > (user.daily_budget / 3): # Assuming 3 meals/day
             # Allow some flexibility, maybe handled in ranking, but strict here for now if needed.
             # Let's make it a soft filter or just skip if waay over budget.
             # For now, let's just keep it simple: if single meal cost > 50% of daily budget, skip.
             if recipe.price_approx > (user.daily_budget * 0.5):
                 continue

        # 4. Health Condition Filter (Basic Logic)
        if 'diabetes' in user.health_conditions:
            # Filter out high sugar
            # Mock logic: assume nutrition_info has 'sugar'
            sugar = recipe.nutrition_info.get('sugar', 0)
            if sugar > 10: # Arbitrary threshold
                continue

        if 'heart' in user.health_conditions:
             # Filter out high sodium/fat
             # Mock logic
             sodium = recipe.nutrition_info.get('sodium', 0)
             if sodium > 500:
                 continue

        filtered.append(recipe)
        
    return filtered
