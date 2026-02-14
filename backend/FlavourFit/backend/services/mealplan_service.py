from typing import Dict, List
from models.user_model import User
from models.recipe_model import Recipe
from services.recommendation_engine import recommendation_engine
import random

class MealPlanService:
    def generate_weekly_plan(self, user: User) -> Dict[str, List[Dict]]:
        """
        Generates a 7-day meal plan.
        Returns: { "Day 1": [{"meal": "Breakfast", "recipe": ...}, ...], ... }
        """
        # Get a larger pool of recommendations
        recommendations = recommendation_engine.recommend(user, top_n=21) # 7 days * 3 meals
        
        if len(recommendations) < 7:
            # Fallback: repeat recipes if not enough variety
            recommendations = recommendations * (7 // len(recommendations) + 1)
        
        random.shuffle(recommendations)
        
        week_plan = {}
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        
        idx = 0
        for day in days:
            day_meals = []
            meals = ["Breakfast", "Lunch", "Dinner"]
            for meal_type in meals:
                if idx < len(recommendations):
                    recipe = recommendations[idx]
                    day_meals.append({
                        "meal": meal_type,
                        "recipe": recipe.to_dict()
                    })
                    idx += 1
            week_plan[day] = day_meals
            
        return week_plan

mealplan_service = MealPlanService()
