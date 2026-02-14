from flask import Blueprint, request, jsonify
from services.recipe_service import recipe_service
from services.recommendation_engine import recommendation_engine
from models.user_model import User
import numpy as np

search_bp = Blueprint('search', __name__)


@search_bp.route('/search', methods=['POST'])
def search_recipes():
    """
    POST /api/search
    Body: { "title": "paneer" }
    Searches RecipeDB by title. Returns raw results (no ranking).
    """
    try:
        data = request.json
        if not data or 'title' not in data:
            return jsonify({"error": "Missing 'title' in request body"}), 400

        title = data['title']
        recipes = recipe_service.search_by_title(title)

        return jsonify({
            "query": title,
            "count": len(recipes),
            "results": [r.to_dict() for r in recipes]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@search_bp.route('/recipe/<recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    """
    GET /api/recipe/<id>
    Returns a single recipe by ID.
    """
    try:
        recipe = recipe_service.get_recipe_by_id(recipe_id)
        if recipe is None:
            return jsonify({"error": f"Recipe {recipe_id} not found"}), 404

        # Compute flavor profile for the returned recipe
        from services.flavor_service import flavor_service
        from services.recommendation_engine import recommendation_engine
        recipe.flavor_profile = recommendation_engine._calculate_recipe_flavor(recipe.ingredients)

        return jsonify(recipe.to_dict()), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@search_bp.route('/cuisine', methods=['POST'])
def filter_cuisine():
    """
    POST /api/cuisine
    Body: { "cuisine": "Punjabi" }
    Filters recipes by cuisine/region.
    """
    try:
        data = request.json
        if not data or 'cuisine' not in data:
            return jsonify({"error": "Missing 'cuisine' in request body"}), 400

        cuisine = data['cuisine']
        recipes = recipe_service.filter_by_cuisine(cuisine)

        return jsonify({
            "cuisine": cuisine,
            "count": len(recipes),
            "results": [r.to_dict() for r in recipes]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
