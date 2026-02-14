"""
Regional Recipe Service — loads and queries regional_recipes.json
"""
import json
import os

_DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'regional_recipes.json')


class RegionalService:
    """In-memory service for regional recipe data."""

    def __init__(self):
        self._data = {}
        self._load()

    # ------------------------------------------------------------------ #
    #  Data loading
    # ------------------------------------------------------------------ #
    def _load(self):
        try:
            with open(_DATA_PATH, 'r', encoding='utf-8') as f:
                self._data = json.load(f)
            print(f"[RegionalService] Loaded {len(self._data)} states from regional_recipes.json")
        except Exception as e:
            print(f"[RegionalService] WARNING — could not load data: {e}")
            self._data = {}

    # ------------------------------------------------------------------ #
    #  Public API
    # ------------------------------------------------------------------ #
    def get_all_counts(self):
        """Return {state_code: recipe_count} for every state."""
        return {code: len(info.get('recipes', [])) for code, info in self._data.items()}

    def get_state(self, state_code: str):
        """
        Return full state payload:
        {state, recipe_count, recipes: [{name, image, ingredients, steps, nutrition, ...}]}
        """
        state_code = state_code.upper()
        info = self._data.get(state_code)
        if not info:
            return None

        return {
            'state': info.get('name', state_code),
            'state_code': state_code,
            'recipe_count': len(info.get('recipes', [])),
            'recipes': info.get('recipes', []),
        }

    def get_state_names(self):
        """Return {state_code: state_name} mapping."""
        return {code: info.get('name', code) for code, info in self._data.items()}


# Singleton
regional_service = RegionalService()
