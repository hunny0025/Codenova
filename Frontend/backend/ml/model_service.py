"""
Model Service for FlavorSense AI (v2)
- Loads model from model_registry.json
- Returns confidence (prediction variance proxy)
- Returns feature-level explanations
- Includes response timing metadata
"""
import os
import sys
import json
import pickle
import time
import yaml
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from features.feature_builder import build_features_batch, build_features, FEATURE_NAMES
from utils.similarity import calculate_similarity


def _load_config():
    config_path = os.path.join(BASE_DIR, 'config', 'model_config.yaml')
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


def _load_registry():
    registry_path = os.path.join(BASE_DIR, 'ml', 'model_registry.json')
    try:
        with open(registry_path, 'r') as f:
            return json.load(f)
    except Exception:
        return {"current_model": None}


class ModelService:
    """Ranks recipes using trained ML model with cosine-similarity fallback."""

    def __init__(self):
        self.config = _load_config()
        self.registry = _load_registry()
        self.model = None
        self.model_version = None
        self._load_model()

    def _load_model(self):
        """Load model from versioned registry."""
        model_name = self.registry.get('current_model')
        if not model_name:
            print("[ModelService] No model in registry — using cosine fallback")
            return

        models_dir = os.path.join(BASE_DIR, self.config['model'].get('models_dir', 'ml/models'))
        model_path = os.path.join(models_dir, model_name)

        # Fallback to legacy path
        if not os.path.exists(model_path):
            model_path = os.path.join(BASE_DIR, 'ml', 'model.pkl')

        try:
            with open(model_path, 'rb') as f:
                self.model = pickle.load(f)
            self.model_version = model_name.replace('.pkl', '')
            print(f"[ModelService] Loaded {model_name} from {model_path}")
        except FileNotFoundError:
            print(f"[ModelService] Model not found at {model_path} — cosine fallback")
        except Exception as e:
            print(f"[ModelService] Error loading model: {e} — cosine fallback")

    def reload_model(self):
        """Hot-reload model from updated registry."""
        self.registry = _load_registry()
        self._load_model()

    @property
    def is_ml_ready(self) -> bool:
        return self.model is not None

    @property
    def features_used(self) -> int:
        return len(self.config.get('features', []))

    def get_metadata(self) -> dict:
        """Returns model metadata for response enrichment."""
        return {
            "model_version": self.model_version or "none",
            "features_used": self.features_used,
            "trained_on": self.registry.get('trained_on', 'unknown'),
            "training_samples": self.registry.get('samples', 0),
        }

    def rank_recipes(self, user_profile: dict, recipes: list, top_n: int = None) -> dict:
        """
        Rank recipes for a given user.

        Returns dict with:
            ranked: List of (score, recipe, explanation) tuples
            metadata: model version, timing, etc.
        """
        start_time = time.time()

        if top_n is None:
            top_n = self.config['model']['top_n']

        if not recipes:
            return {"ranked": [], "metadata": self.get_metadata(), "time_ms": 0}

        if self.is_ml_ready:
            ranked = self._rank_ml(user_profile, recipes, top_n)
            source = "ml_model"
        else:
            ranked = self._rank_cosine(user_profile, recipes, top_n)
            source = "cosine_fallback"

        elapsed_ms = round((time.time() - start_time) * 1000, 1)

        metadata = self.get_metadata()
        metadata["ranking_source"] = source
        metadata["recommendation_time_ms"] = elapsed_ms

        return {"ranked": ranked, "metadata": metadata}

    def _rank_ml(self, user_profile, recipes, top_n):
        """Rank using trained XGBoost model with explanations."""
        feature_matrix = build_features_batch(user_profile, recipes)
        X = np.array(feature_matrix)

        # Predict relevance scores
        scores = self.model.predict(X)

        # Confidence: use prediction margin from mean as proxy
        mean_score = float(np.mean(scores))
        std_score = float(np.std(scores)) if len(scores) > 1 else 0.0

        # Feature importances from the model
        model_importances = self.model.feature_importances_

        results = []
        for i, (score, recipe) in enumerate(zip(scores.tolist(), recipes)):
            # Per-recipe explanation: feature_value * model_importance
            features = feature_matrix[i]
            explanation = {}
            for fname, fval, fimp in zip(FEATURE_NAMES, features, model_importances):
                explanation[fname] = round(float(fval) * float(fimp), 4)

            # Confidence: higher when prediction is further from mean
            confidence = round(min(1.0, abs(score - mean_score) / max(std_score, 0.01) * 0.5), 3)

            results.append((score, recipe, explanation, confidence))

        results.sort(key=lambda x: x[0], reverse=True)
        return results[:top_n]

    def _rank_cosine(self, user_profile, recipes, top_n):
        """Fallback: rank by cosine similarity only."""
        from services.flavor_service import flavor_service

        user_flavor = np.array(user_profile.get('flavor_vector', [0]*5), dtype=float)
        results = []

        for recipe in recipes:
            ingredients = recipe.get('ingredients', [])
            total = np.zeros(5)
            for ing in ingredients:
                total += flavor_service.get_flavor_vector(ing)
            norm = np.linalg.norm(total)
            recipe_flavor = total / norm if norm > 0 else total

            sim = float(calculate_similarity(user_flavor, recipe_flavor))
            explanation = {"flavor_similarity": round(sim, 4)}
            results.append((sim, recipe, explanation, round(sim, 3)))

        results.sort(key=lambda x: x[0], reverse=True)
        return results[:top_n]


# Singleton
model_service = ModelService()
