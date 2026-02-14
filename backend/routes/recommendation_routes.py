from flask import Blueprint, request, jsonify
from services.recipe_service import recipe_service
from services.user_service import user_service
from ml.model_service import model_service
import numpy as np

recommendation_bp = Blueprint('recommendation', __name__)


@recommendation_bp.route('/recommend', methods=['POST'])
def recommend():
    """
    POST /api/recommend
    Body: {
        "user_id": "u1",
        "diet_type": "veg",
        "flavor_preference_vector": [0.8, 0.2, 0.1, 0.1, 0.5],
        "cuisine_preference": "indian",
        "calorie_goal": 2000,
        "daily_budget": 25,
        "allergies": []
    }

    Flow:
        user_service.build_profile()
        → recipe_service.get_candidates()
        → model_service.rank_recipes()  (with confidence + explanation)
        → return top results with metadata
    """
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # 1. Build user profile (merges history + request)
        profile = user_service.build_profile_for_ranking(data)

        # 2. Fetch candidate recipes
        diet = data.get('diet_type', '')
        if diet and recipe_service.is_live:
            candidates_raw = recipe_service.filter_by_diet(diet, limit=20)
        else:
            candidates_raw = recipe_service.get_all_recipes()

        # Convert Recipe objects to dicts for the feature builder
        candidates = []
        for r in candidates_raw:
            d = r.to_dict()
            d.setdefault('cuisine', '')
            d.setdefault('price', d.get('price_approx', 0))
            d.setdefault('nutrition', d.get('nutrition_info', {}))
            d.setdefault('tags', d.get('diet_tags', []))
            candidates.append(d)

        # 3. Hard constraint: remove allergens
        allergies = profile.get('allergies', [])
        if allergies:
            filtered = []
            for recipe in candidates:
                has_allergen = False
                for allergen in allergies:
                    for ing in recipe.get('ingredients', []):
                        if allergen.lower() in ing.lower():
                            has_allergen = True
                            break
                    if has_allergen:
                        break
                if not has_allergen:
                    filtered.append(recipe)
            candidates = filtered

        # 4. Rank via ML model (or cosine fallback) — now returns dict with metadata
        result = model_service.rank_recipes(profile, candidates)
        ranked = result['ranked']
        metadata = result['metadata']

        # Format results with score, confidence, explanation
        results = []
        for item in ranked:
            score, recipe, explanation, confidence = item
            recipe['relevance_score'] = round(float(score), 4)
            recipe['confidence'] = confidence
            recipe['explanation'] = explanation
            results.append(recipe)

        return jsonify({
            "ranking_source": metadata.get("ranking_source", "unknown"),
            "model_version": metadata.get("model_version", "none"),
            "features_used": metadata.get("features_used", 0),
            "recommendation_time_ms": metadata.get("recommendation_time_ms", 0),
            "count": len(results),
            "results": results
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
