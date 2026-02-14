"""
Community Recipes API routes.
"""
from flask import Blueprint, request, jsonify
from services.community_service import community_service

community_bp = Blueprint('community', __name__)


@community_bp.route('/community/recipes', methods=['POST'])
def create_recipe():
    """Create a new community recipe with AI enrichment."""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        if not data.get('title'):
            return jsonify({"error": "Recipe title is required"}), 400

        recipe = community_service.create_recipe(data)
        return jsonify({
            "status": "published",
            "message": f"'{recipe.title}' published with AI enrichment!",
            "recipe": recipe.to_dict()
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@community_bp.route('/community/recipes', methods=['GET'])
def list_recipes():
    """List all community recipes with optional sort and diet filter."""
    try:
        sort_by = request.args.get('sort', 'newest')  # newest, popular, budget
        diet_filter = request.args.get('diet', '')      # veg, vegan, non-veg, jain

        recipes = community_service.get_all(sort_by=sort_by, diet_filter=diet_filter)
        return jsonify({
            "count": len(recipes),
            "sort": sort_by,
            "diet_filter": diet_filter or "all",
            "recipes": [r.to_dict() for r in recipes]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@community_bp.route('/community/recipes/<recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    """Get a single community recipe by ID."""
    recipe = community_service.get_by_id(recipe_id)
    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404
    return jsonify(recipe.to_dict()), 200


@community_bp.route('/community/recipes/<recipe_id>/like', methods=['POST'])
def like_recipe(recipe_id):
    """Toggle like on a community recipe."""
    try:
        data = request.json or {}
        user_id = data.get('user_id', 'anonymous')

        recipe = community_service.like_recipe(recipe_id, user_id)
        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        liked = user_id in recipe.liked_by
        return jsonify({
            "status": "liked" if liked else "unliked",
            "likes": recipe.likes,
            "recipe_id": recipe_id
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
