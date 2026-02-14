"""
Feature Builder for FlavorSense AI
Computes numeric feature vectors for (user, recipe) pairs.
No decision logic — pure numeric features only.
"""
import os
import sys
import numpy as np
import yaml

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from services.flavor_service import flavor_service
from utils.similarity import calculate_similarity


def load_model_config():
    config_path = os.path.join(BASE_DIR, 'config', 'model_config.yaml')
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


_config = load_model_config()


def calculate_recipe_flavor(ingredients):
    """Compute normalized flavor vector for a recipe."""
    total = np.zeros(5)
    for ing in ingredients:
        total += flavor_service.get_flavor_vector(ing)
    norm = np.linalg.norm(total)
    return total / norm if norm > 0 else total


def build_features(user_profile: dict, recipe: dict) -> list:
    """
    Build numeric feature vector for a (user, recipe) pair.

    User profile keys:
        flavor_vector, diet_type, calorie_goal, cuisine_preference, daily_budget

    Recipe keys (raw dict from cache or parsed):
        ingredients, nutrition, tags, cuisine, price

    Returns:
        List of floats: [flavor_sim, calorie_dist, cuisine_match, diet_match,
                         budget_dist, ingredient_count, price_estimate]
    """
    # --- User features ---
    user_flavor = np.array(user_profile.get('flavor_vector', [0]*5), dtype=float)
    user_diet = user_profile.get('diet_type', '').lower()
    user_cal = float(user_profile.get('calorie_goal', _config['users']['default_calorie_goal']))
    user_cuisine = user_profile.get('cuisine_preference', '').lower()
    user_budget = float(user_profile.get('daily_budget', _config['users']['default_budget']))

    # --- Recipe features ---
    ingredients = recipe.get('ingredients', [])
    recipe_flavor = calculate_recipe_flavor(ingredients)
    recipe_cal = float(recipe.get('nutrition', {}).get('calories', 0))
    recipe_cuisine = recipe.get('cuisine', '').lower()
    recipe_tags = [t.lower() for t in recipe.get('tags', recipe.get('diet_tags', []))]
    recipe_price = float(recipe.get('price', recipe.get('price_approx', len(ingredients) * 2.5)))

    # --- Derived features ---

    # 1. Flavor similarity (cosine)
    flavor_sim = float(calculate_similarity(user_flavor, recipe_flavor))

    # 2. Calorie distance (normalized)
    calorie_dist = abs(user_cal - recipe_cal) / max(user_cal, 1.0)

    # 3. Cuisine match (binary)
    cuisine_match = 1.0 if user_cuisine and user_cuisine == recipe_cuisine else 0.0

    # 4. Diet match (binary)
    diet_match = 1.0 if user_diet in recipe_tags else 0.0

    # 5. Budget distance (normalized, per-meal ≈ budget/3)
    per_meal_budget = user_budget / 3.0
    budget_dist = abs(per_meal_budget - recipe_price) / max(per_meal_budget, 1.0)

    # 6. Ingredient count (raw)
    ingredient_count = float(len(ingredients))

    # 7. Price estimate (raw)
    price_estimate = recipe_price

    return [
        flavor_sim,
        calorie_dist,
        cuisine_match,
        diet_match,
        budget_dist,
        ingredient_count,
        price_estimate,
    ]


FEATURE_NAMES = [
    'flavor_similarity',
    'calorie_distance',
    'cuisine_match',
    'diet_match',
    'budget_distance',
    'ingredient_count',
    'price_estimate',
]


def build_features_batch(user_profile: dict, recipes: list) -> list:
    """Build feature vectors for a list of recipes against one user."""
    return [build_features(user_profile, r) for r in recipes]
