"""
User Profile Service for FlavorSense AI (v2)
Manages user profiles with data-driven flavor vector evolution.
"""
import csv
import numpy as np
from typing import Dict, Optional, List
import yaml
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _load_config():
    config_path = os.path.join(BASE_DIR, 'config', 'model_config.yaml')
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


_config = _load_config()


class UserService:
    """
    In-memory user profile store with data-driven learning.
    Flavor vector evolves from interaction history — no hardcoded logic.
    """

    def __init__(self):
        self._profiles: Dict[str, dict] = {}
        self._load_live_history()

    def _load_live_history(self):
        """Bootstrap profiles from existing live interactions CSV."""
        csv_path = os.path.join(BASE_DIR, 'data', 'user_interactions_live.csv')
        if not os.path.exists(csv_path):
            return

        try:
            with open(csv_path, 'r') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    user_id = row.get('user_id')
                    action = row.get('action', '')
                    if user_id and action in ('like', 'save'):
                        recipe_id = row.get('recipe_id')
                        # We'll populate flavor vectors later on actual calls
                        profile = self._profiles.setdefault(user_id, {
                            'user_id': user_id,
                            'flavor_vector': [0] * 5,
                            'diet_type': 'non-veg',
                            'calorie_goal': float(_config['users']['default_calorie_goal']),
                            'cuisine_preference': '',
                            'daily_budget': float(_config['users']['default_budget']),
                            'allergies': [],
                            'liked_recipes_flavors': [],
                            'interaction_count': 0,
                        })
                        profile['interaction_count'] = profile.get('interaction_count', 0) + 1
        except Exception as e:
            print(f"[UserService] Error loading live history: {e}")

    def get_profile(self, user_id: str) -> Optional[dict]:
        """Returns user profile dict, or None if not found."""
        return self._profiles.get(user_id)

    def create_or_update_profile(self, user_id: str, data: dict) -> dict:
        """
        Create or update a user profile from onboarding or request data.
        """
        profile = self._profiles.get(user_id, {})

        profile['user_id'] = user_id
        profile['flavor_vector'] = data.get(
            'flavor_preference_vector',
            data.get('flavor_vector', profile.get('flavor_vector', [0]*5))
        )
        profile['diet_type'] = data.get('diet_type', profile.get('diet_type', 'non-veg'))
        profile['calorie_goal'] = data.get(
            'calorie_goal',
            float(_config['users']['default_calorie_goal'])
        )
        profile['cuisine_preference'] = data.get(
            'cuisine_preference',
            profile.get('cuisine_preference', '')
        )
        profile['daily_budget'] = data.get(
            'daily_budget',
            float(_config['users']['default_budget'])
        )
        profile['allergies'] = data.get('allergies', profile.get('allergies', []))
        profile['liked_recipes_flavors'] = profile.get('liked_recipes_flavors', [])
        profile['interaction_count'] = profile.get('interaction_count', 0)

        self._profiles[user_id] = profile
        return profile

    def update_flavor_from_history(self, user_id: str, liked_recipe_flavor: List[float]):
        """
        Data-driven flavor update.
        New flavor_vector = average of all liked recipe flavor vectors.
        No hardcoded weighting — purely learned from user actions.
        """
        profile = self._profiles.get(user_id)
        if profile is None:
            return

        history = profile.get('liked_recipes_flavors', [])
        history.append(liked_recipe_flavor)
        profile['liked_recipes_flavors'] = history
        profile['interaction_count'] = profile.get('interaction_count', 0) + 1

        # Pure data-driven: average of all positive interactions
        avg_flavor = np.mean(history, axis=0).tolist()
        profile['flavor_vector'] = avg_flavor

    def build_profile_for_ranking(self, data: dict) -> dict:
        """
        Build a profile dict suitable for model_service.rank_recipes().
        
        If user has interaction history → use learned flavor vector.
        If new user → use provided onboarding vector.
        """
        user_id = data.get('user_id', data.get('id', 'guest'))

        existing = self.get_profile(user_id)
        if existing and existing.get('liked_recipes_flavors'):
            # User has history — use learned flavor vector (data-driven)
            merged = dict(existing)
            # Allow overrides for diet/budget/cuisine
            if 'diet_type' in data:
                merged['diet_type'] = data['diet_type']
            if 'daily_budget' in data:
                merged['daily_budget'] = data['daily_budget']
            if 'cuisine_preference' in data:
                merged['cuisine_preference'] = data['cuisine_preference']
            if 'calorie_goal' in data:
                merged['calorie_goal'] = data['calorie_goal']
            # Do NOT override flavor_vector — it's learned from history
            return merged

        # New user — use onboarding input
        return self.create_or_update_profile(user_id, data)

    def get_interaction_count(self, user_id: str) -> int:
        profile = self._profiles.get(user_id)
        return profile.get('interaction_count', 0) if profile else 0


# Singleton
user_service = UserService()
