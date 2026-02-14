"""
Synthetic Data Generator for FlavorSense AI
Generates user_interactions.csv for bootstrapping the ML training pipeline.
"""
import csv
import json
import os
import random
import sys
import numpy as np
import yaml

# Add backend to path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from services.flavor_service import flavor_service
from utils.similarity import calculate_similarity


def load_config():
    config_path = os.path.join(BASE_DIR, 'config', 'model_config.yaml')
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


def load_recipes():
    cache_path = os.path.join(BASE_DIR, 'data', 'recipes_cache.json')
    with open(cache_path, 'r') as f:
        return json.load(f)


def calculate_recipe_flavor(ingredients):
    """Compute normalized flavor vector for a recipe's ingredients."""
    total = np.zeros(5)
    for ing in ingredients:
        total += flavor_service.get_flavor_vector(ing)
    norm = np.linalg.norm(total)
    return total / norm if norm > 0 else total


# --- Synthetic user profiles ---
SYNTHETIC_USERS = [
    {"id": "u1", "diet": "veg",     "cuisine": "indian",        "flavor_vec": [0.3, 0.8, 0.2, 0.1, 0.7], "calorie_goal": 1800, "budget": 20},
    {"id": "u2", "diet": "non-veg", "cuisine": "american",      "flavor_vec": [0.5, 0.3, 0.1, 0.0, 0.9], "calorie_goal": 2500, "budget": 40},
    {"id": "u3", "diet": "vegan",   "cuisine": "mediterranean", "flavor_vec": [0.7, 0.1, 0.5, 0.2, 0.3], "calorie_goal": 2000, "budget": 25},
    {"id": "u4", "diet": "veg",     "cuisine": "italian",       "flavor_vec": [0.4, 0.2, 0.3, 0.1, 0.8], "calorie_goal": 2200, "budget": 30},
    {"id": "u5", "diet": "non-veg", "cuisine": "thai",          "flavor_vec": [0.2, 0.9, 0.4, 0.3, 0.6], "calorie_goal": 2000, "budget": 35},
    {"id": "u6", "diet": "veg",     "cuisine": "chinese",       "flavor_vec": [0.3, 0.5, 0.3, 0.1, 0.9], "calorie_goal": 1900, "budget": 22},
    {"id": "u7", "diet": "jain",    "cuisine": "indian",        "flavor_vec": [0.6, 0.4, 0.1, 0.0, 0.5], "calorie_goal": 1700, "budget": 18},
    {"id": "u8", "diet": "vegan",   "cuisine": "chinese",       "flavor_vec": [0.4, 0.6, 0.2, 0.1, 0.7], "calorie_goal": 2100, "budget": 28},
]


def generate_interactions(recipes, config):
    """
    Generate synthetic user–recipe interactions.
    Action probability is driven by:
      - diet match
      - cuisine match
      - flavor similarity
    """
    action_weights = config['action_weights']
    interactions = []

    for user in SYNTHETIC_USERS:
        user_flavor = np.array(user['flavor_vec'])

        for recipe in recipes:
            recipe_flavor = calculate_recipe_flavor(recipe['ingredients'])
            flavor_sim = float(calculate_similarity(user_flavor, recipe_flavor))

            # Diet match?
            diet_match = user['diet'] in recipe.get('tags', [])
            # Cuisine match?
            cuisine_match = user['cuisine'].lower() == recipe.get('cuisine', '').lower()

            # Compute interaction probability
            base_prob = 0.1
            if diet_match:
                base_prob += 0.3
            if cuisine_match:
                base_prob += 0.2
            base_prob += flavor_sim * 0.3
            base_prob = min(base_prob, 0.95)

            # Decide action
            roll = random.random()
            if roll < base_prob * 0.6:
                action = 'like'
                rating = action_weights['like'] * (0.7 + 0.3 * flavor_sim)
            elif roll < base_prob * 0.85:
                action = 'save'
                rating = action_weights['save'] * (0.6 + 0.4 * flavor_sim)
            elif roll < base_prob:
                action = 'view'
                rating = action_weights['view'] * (0.5 + 0.5 * random.random())
            else:
                # User didn't interact — still record as implicit negative
                action = 'view'
                rating = 0.05

            interactions.append({
                'user_id': user['id'],
                'recipe_id': recipe['id'],
                'action': action,
                'rating': round(rating, 4)
            })

    return interactions


def main():
    config = load_config()
    recipes = load_recipes()

    random.seed(42)
    np.random.seed(42)

    interactions = generate_interactions(recipes, config)

    out_path = os.path.join(BASE_DIR, 'data', 'user_interactions.csv')
    with open(out_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['user_id', 'recipe_id', 'action', 'rating'])
        writer.writeheader()
        writer.writerows(interactions)

    print(f"Generated {len(interactions)} interactions → {out_path}")


if __name__ == '__main__':
    main()
