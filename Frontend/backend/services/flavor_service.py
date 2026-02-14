<<<<<<< HEAD
"""
FlavorService — Production-quality flavor vector provider for FlavorSense AI.

Priority pipeline:
    1. In-memory cache (instant)
    2. Local dataset  (flavor_vectors.json)
    3. Synthetic fallback (deterministic hash-based generation)
    -- Future: External Flavor API layer can be inserted at priority 2.5 --

Vector dimensions: 5 → [sweet, spicy, sour, bitter, umami]
"""

import hashlib
import json
import os
from typing import Dict, Optional

import numpy as np

# Constants
VECTOR_DIM = 5
FLAVOR_LABELS = ['sweet', 'spicy', 'sour', 'bitter', 'umami']
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'flavor_vectors.json')


class FlavorService:
    """
    Single authoritative source for ingredient flavor vectors.

    Lookup order:
        cache → local dataset → synthetic fallback → cache store
    """

    def __init__(self):
        self._cache: Dict[str, np.ndarray] = {}
        self._dataset: Dict[str, list] = {}
        self._dataset_hits = 0
        self._synthetic_hits = 0
        self._load_dataset()

    # ── Layer 0: Dataset Loading ────────────────────────────────

    def _load_dataset(self):
        """Load flavor vectors from local JSON file at startup."""
        try:
            with open(DATA_PATH, 'r') as f:
                raw = json.load(f)
            # Normalize keys to lowercase
            self._dataset = {k.lower().strip(): v for k, v in raw.items()}
            print(f"[FlavorService] Dataset loaded: {len(self._dataset)} ingredients from {DATA_PATH}")
        except FileNotFoundError:
            print(f"[FlavorService] WARNING: Dataset not found at {DATA_PATH}")
        except json.JSONDecodeError as e:
            print(f"[FlavorService] WARNING: Invalid JSON in dataset: {e}")
        except Exception as e:
            print(f"[FlavorService] WARNING: Failed to load dataset: {e}")

    # ── Layer 1: Cache ──────────────────────────────────────────

    def _cache_get(self, key: str) -> Optional[np.ndarray]:
        return self._cache.get(key)

    def _cache_set(self, key: str, vector: np.ndarray):
        self._cache[key] = vector

    # ── Layer 2: Local Dataset Lookup ───────────────────────────

    def _lookup_dataset(self, ingredient: str) -> Optional[np.ndarray]:
        """Exact-match lookup against the loaded flavor_vectors.json."""
        raw = self._dataset.get(ingredient)
        if raw is not None:
            self._dataset_hits += 1
            return np.array(raw, dtype=float)
        return None

    # ── Layer 3: Synthetic Fallback (Deterministic) ─────────────

    @staticmethod
    def _generate_synthetic(ingredient: str) -> np.ndarray:
        """
        Generates a deterministic synthetic flavor vector from ingredient name.
        Uses SHA-256 hash as seed → same ingredient always produces same vector.
        """
        digest = hashlib.sha256(ingredient.encode('utf-8')).hexdigest()
        # Use first 10 hex chars (5 pairs) as seeds for each dimension
        raw = np.array([
            int(digest[i * 2: i * 2 + 2], 16) / 255.0
            for i in range(VECTOR_DIM)
        ], dtype=float)

        # Normalize to unit length
        norm = np.linalg.norm(raw)
        return raw / norm if norm > 0 else raw

    # ── Public API ──────────────────────────────────────────────

    def get_flavor_vector(self, ingredient: str) -> np.ndarray:
        """
        Returns a 5-D flavor vector for the given ingredient.

        Pipeline: cache → dataset → synthetic → cache store
        """
        key = ingredient.lower().strip()
        if not key:
            return np.zeros(VECTOR_DIM)

        # 1. Cache hit
        cached = self._cache_get(key)
        if cached is not None:
            return cached

        # 2. Dataset lookup
        vector = self._lookup_dataset(key)

        # 3. Synthetic fallback
        if vector is None:
            vector = self._generate_synthetic(key)
            self._synthetic_hits += 1

        # Store in cache for future lookups
        self._cache_set(key, vector)
        return vector

    def get_stats(self) -> dict:
        """Returns service statistics for observability."""
        return {
            "dataset_size": len(self._dataset),
            "cache_size": len(self._cache),
            "dataset_hits": self._dataset_hits,
            "synthetic_hits": self._synthetic_hits,
        }


# Singleton instance
=======
import numpy as np
import random
from utils.cache import cache

class FlavorService:
    def get_flavor_vector(self, ingredient: str) -> np.ndarray:
        """
        Fetches flavor profile for an ingredient.
        Returns a 5-dim vector: [sweet, salty, sour, bitter, umami]
        """
        # check cache first
        cached_vector = cache.get(f"flavor_{ingredient}")
        if cached_vector is not None:
            return cached_vector

        # Mock Logic: Deterministic random based on hash of ingredient name
        # so same ingredient always gets same vector
        random.seed(ingredient)
        vector = np.random.rand(5)
        
        # Normalize to unit vector
        norm = np.linalg.norm(vector)
        if norm > 0:
            vector = vector / norm
            
        cache.set(f"flavor_{ingredient}", vector)
        return vector

>>>>>>> 823dbe80fda6ffcfb35d27a208439b1388428bd7
flavor_service = FlavorService()
