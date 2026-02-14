from typing import List
from models.user_model import User
from models.recipe_model import Recipe
<<<<<<< HEAD
from services.flavor_service import flavor_service
=======
from services.recipe_service import recipe_service
>>>>>>> 823dbe80fda6ffcfb35d27a208439b1388428bd7
from utils.similarity import calculate_similarity
from utils.filters import filter_recipes
import numpy as np

<<<<<<< HEAD

class RecommendationEngine:
    """
    Core recommendation logic.
    Builds recipe flavor vectors from offline FlavorDB data,
    then ranks by cosine similarity against user preference vector.
    """

    def _calculate_recipe_flavor(self, ingredients: List[str]) -> np.ndarray:
        """
        Builds recipe flavor vector from ingredient list.
        Sum ingredient vectors → Normalize.
        """
        if not ingredients:
            return np.zeros(5)

        total_vector = np.zeros(5)
        for ing in ingredients:
            total_vector += flavor_service.get_flavor_vector(ing)

        norm = np.linalg.norm(total_vector)
        if norm > 0:
            return total_vector / norm
        return np.zeros(5)

    def _score_and_rank(self, user: User, recipes: List[Recipe], top_n: int) -> List[Recipe]:
        """Shared scoring pipeline: compute flavor → cosine sim → rank → return top N."""
        if not recipes:
            return []

        scored = []
        for recipe in recipes:
            # Dynamically compute flavor profile using offline FlavorDB vectors
            recipe.flavor_profile = self._calculate_recipe_flavor(recipe.ingredients)

            # Cosine similarity with user preference
            sim_score = calculate_similarity(user.flavor_preference_vector, recipe.flavor_profile)

            # Budget heuristic boost
            if user.daily_budget > 0 and recipe.price_approx < (user.daily_budget / 4):
                sim_score += 0.1

            scored.append((sim_score, recipe))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [r for _, r in scored[:top_n]]

    def recommend(self, user: User, top_n: int = 5) -> List[Recipe]:
        """
        Original recommendation path.
        Fetches ALL recipes from RecipeService (live API or mock),
        applies hard filters, then ranks by flavor similarity.
        """
        from services.recipe_service import recipe_service
        candidates = recipe_service.get_all_recipes()
        filtered = filter_recipes(user, candidates)
        return self._score_and_rank(user, filtered, top_n)

    def recommend_from_recipes(self, user: User, recipes: List[Recipe], top_n: int = 5) -> List[Recipe]:
        """
        Recommendation path for pre-fetched recipes (e.g. from search or cuisine filter).
        Applies hard filters, then ranks by flavor similarity.
        """
        filtered = filter_recipes(user, recipes)
        return self._score_and_rank(user, filtered, top_n)

=======
class RecommendationEngine:
    def recommend(self, user: User, top_n: int = 5) -> List[Recipe]:
        # 1. Fetch Candidates (Mock: Get All)
        candidates = recipe_service.get_all_recipes()
        
        # 2. Apply Hard Filters (Diet, Allergy, Health, Budget)
        filtered_candidates = filter_recipes(user, candidates)
        
        if not filtered_candidates:
            return []

        # 3. Score Candidates
        scored_recipes = []
        for recipe in filtered_candidates:
            # Similarity Score
            sim_score = calculate_similarity(user.flavor_preference_vector, recipe.flavor_profile)
            
            # Add simple heuristic: boost if in budget
            if user.daily_budget > 0 and recipe.price_approx < (user.daily_budget / 4):
                 sim_score += 0.1
            
            scored_recipes.append((sim_score, recipe))
            
        # 4. Rank
        scored_recipes.sort(key=lambda x: x[0], reverse=True)
        
        # 5. Return Top N
        return [r for score, r in scored_recipes[:top_n]]
>>>>>>> 823dbe80fda6ffcfb35d27a208439b1388428bd7

recommendation_engine = RecommendationEngine()
