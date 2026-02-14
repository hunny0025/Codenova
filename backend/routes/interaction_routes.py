"""
Interaction Routes for FlavorSense AI
Records user-recipe interactions and updates user profiles in real-time.
"""
import os
import csv
import json
from flask import Blueprint, request, jsonify
import yaml
import numpy as np

interaction_bp = Blueprint('interaction', __name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _load_config():
    config_path = os.path.join(BASE_DIR, 'config', 'model_config.yaml')
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


def _get_recipe_flavor(recipe_id):
    """Look up recipe and compute its flavor vector."""
    from services.flavor_service import flavor_service

    # Try recipe cache first
    cache_path = os.path.join(BASE_DIR, 'data', 'recipes_cache.json')
    try:
        with open(cache_path, 'r') as f:
            recipes = json.load(f)
        for r in recipes:
            if str(r.get('id')) == str(recipe_id):
                total = np.zeros(5)
                for ing in r.get('ingredients', []):
                    total += flavor_service.get_flavor_vector(ing)
                norm = np.linalg.norm(total)
                return (total / norm).tolist() if norm > 0 else total.tolist()
    except Exception:
        pass

    # Try RecipeService (API or mock)
    from services.recipe_service import recipe_service
    recipe = recipe_service.get_recipe_by_id(recipe_id)
    if recipe:
        total = np.zeros(5)
        for ing in recipe.ingredients:
            total += flavor_service.get_flavor_vector(ing)
        norm = np.linalg.norm(total)
        return (total / norm).tolist() if norm > 0 else total.tolist()

    return [0] * 5


@interaction_bp.route('/interaction', methods=['POST'])
def record_interaction():
    """
    POST /api/interaction
    Body: {
        "user_id": "u1",
        "recipe_id": "12",
        "action": "like"
    }
    Actions: view, like, save, dislike
    """
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        user_id = data.get('user_id')
        recipe_id = data.get('recipe_id')
        action = data.get('action', 'view').lower()

        if not user_id or not recipe_id:
            return jsonify({"error": "user_id and recipe_id required"}), 400

        # Validate action
        config = _load_config()
        action_weights = config['action_weights']
        valid_actions = list(action_weights.keys())
        if action not in valid_actions:
            return jsonify({"error": f"Invalid action. Must be one of: {valid_actions}"}), 400

        weight = action_weights[action]

        # 1. Append to live interactions CSV
        csv_path = os.path.join(BASE_DIR, 'data', 'user_interactions_live.csv')
        file_exists = os.path.exists(csv_path)

        with open(csv_path, 'a', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=['user_id', 'recipe_id', 'action', 'rating'])
            if not file_exists:
                writer.writeheader()
            writer.writerow({
                'user_id': user_id,
                'recipe_id': str(recipe_id),
                'action': action,
                'rating': round(weight, 4)
            })

        # 2. Update user profile if like or save
        if action in ('like', 'save'):
            from services.user_service import user_service
            recipe_flavor = _get_recipe_flavor(recipe_id)

            # Ensure user profile exists
            existing = user_service.get_profile(user_id)
            if existing is None:
                user_service.create_or_update_profile(user_id, {
                    'flavor_preference_vector': [0] * 5,
                    'diet_type': 'non-veg'
                })

            user_service.update_flavor_from_history(user_id, recipe_flavor)
            updated_profile = user_service.get_profile(user_id)
            flavor_updated = True
        else:
            flavor_updated = False
            updated_profile = None

        # 3. Count live interactions for retrain signal
        live_count = 0
        if os.path.exists(csv_path):
            with open(csv_path, 'r') as f:
                live_count = sum(1 for _ in f) - 1  # minus header

        response = {
            "status": "recorded",
            "user_id": user_id,
            "recipe_id": recipe_id,
            "action": action,
            "weight": weight,
            "flavor_updated": flavor_updated,
            "live_interactions_total": live_count
        }

        if flavor_updated and updated_profile:
            response["updated_flavor_vector"] = updated_profile.get('flavor_vector', [])

        # Retrain hint
        retrain_threshold = config.get('retrain', {}).get('min_new_interactions', 50)
        if live_count >= retrain_threshold:
            response["retrain_recommended"] = True

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
