from flask import Blueprint, request, jsonify
from models.user_model import User
from services.recommendation_engine import recommendation_engine
import numpy as np

recommendation_bp = Blueprint('recommendation', __name__)

@recommendation_bp.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Create User Object from JSON
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

        recommendations = recommendation_engine.recommend(user)
        
        return jsonify([r.to_dict() for r in recommendations]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
