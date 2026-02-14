from dataclasses import dataclass, field
from typing import List, Optional
import numpy as np

@dataclass
class User:
    id: str
    username: str
    diet_type: str  # 'veg', 'vegan', 'jain', 'non-veg'
    allergies: List[str] = field(default_factory=list)
    health_conditions: List[str] = field(default_factory=list) # 'diabetes', 'heart', etc.
    daily_budget: float = 0.0
    nutrition_goal: str = 'maintenance' # 'weight_loss', 'gain', 'maintenance'
    flavor_preference_vector: np.ndarray = field(default_factory=lambda: np.zeros(5)) # [sweet, salty, sour, bitter, umami]

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "diet_type": self.diet_type,
            "allergies": self.allergies,
            "health_conditions": self.health_conditions,
            "daily_budget": self.daily_budget,
            "nutrition_goal": self.nutrition_goal,
            "flavor_preference_vector": self.flavor_preference_vector.tolist()
        }
