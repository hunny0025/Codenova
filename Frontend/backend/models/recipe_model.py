from dataclasses import dataclass, field
from typing import List, Dict
import numpy as np

@dataclass
class Recipe:
    id: str
    title: str
    ingredients: List[str]
    flavor_profile: np.ndarray = field(default_factory=lambda: np.zeros(5)) # [sweet, salty, sour, bitter, umami]
    nutrition_info: Dict[str, float] = field(default_factory=dict) # {'calories': 0, 'protein': 0, ...}
    price_approx: float = 0.0
    diet_tags: List[str] = field(default_factory=list) # ['veg', 'gluten-free']
    image_url: str = ""

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "ingredients": self.ingredients,
            "flavor_profile": self.flavor_profile.tolist(),
            "nutrition_info": self.nutrition_info,
            "price_approx": self.price_approx,
            "diet_tags": self.diet_tags,
            "image_url": self.image_url
        }
