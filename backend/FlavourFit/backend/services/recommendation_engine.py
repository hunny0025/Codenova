from typing import List
from models.user_model import User
from models.recipe_model import Recipe
from services.recipe_service import recipe_service
from utils.similarity import calculate_similarity
from utils.filters import filter_recipes
import numpy as np

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

recommendation_engine = RecommendationEngine()
