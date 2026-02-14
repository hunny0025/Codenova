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

flavor_service = FlavorService()
