from flask import Blueprint, request, jsonify
from models.user_model import User
from services.mealplan_service import mealplan_service
from services.recommendation_engine import recommendation_engine
from services.recipe_service import recipe_service
import numpy as np

mealplan_bp = Blueprint('mealplan', __name__)

@mealplan_bp.route('/mealplan', methods=['POST'])
def generate_mealplan():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Create User Object
        # In a real app, this would be fetched from DB via ID
        flavor_vec = data.get('flavor_preference_vector', [0,0,0,0,0])
        user = User(
            id=data.get('id', 'guest'),
            username=data.get('username', 'Guest'),
            diet_type=data.get('diet_type', 'non-veg'),
            allergies=data.get('allergies', []),
            health_conditions=data.get('health_conditions', []),
            daily_budget=data.get('daily_budget', 0),
            nutrition_goal=data.get('nutrition_goal', 'maintenance'),
            flavor_preference_vector=np.array(flavor_vec)
        )

        
        # NOTE: Updated MealPlanService to call recommendation engine internally
        # Logic is inside mealplan_service.generate_weekly_plan
        from services.mealplan_service import mealplan_service
        
        # We need to temporarily patch/inject the recommendation engine results if needed
        # but the service handles it.

        # However, the previous service implementation had a bug:
        # It called `recommendation_engine.recommend` which expects a User object.
        # But in `mealplan_service.py` at line 13, I called it properly.
        # Wait, I see I imported `recommendation_engine` in `mealplan_service.py`.
        # I need to fix `mealplan_service.py` because `recommendation_engine.recommend` returns a list of Recipe objects.
        # The service then uses `idx` to pick from it.
        # But `recommend_recipes` returns top 5 by default.
        # I need to make sure `recommend` can return more.
        # I already updated `recommend` to take `top_n`.

        # Let's double check `mealplan_service.py` logic.
        # `recommendation_engine.recommend(user, top_n=21)` -> correct.
        
        plan = mealplan_service.generate_weekly_plan(user)
        return jsonify(plan), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
