"""
CommunityRecipe model for user-posted recipes.
Extends the Recipe concept with community + AI-enriched fields.
"""
from dataclasses import dataclass, field
from typing import List, Dict, Set
import numpy as np


@dataclass
class CommunityRecipe:
    id: str
    author_id: str
    author_name: str
    title: str
    cuisine: str = ""
    region: str = ""
    diet_type: str = "veg"  # veg, vegan, jain, non-veg
    spice_level: int = 3    # 1-5
    ingredients: List[Dict[str, str]] = field(default_factory=list)  # [{name, quantity}]
    steps: List[str] = field(default_factory=list)
    health_tags: List[str] = field(default_factory=list)
    budget_tier: str = "₹₹"  # ₹, ₹₹, ₹₹₹
    image_url: str = ""
    created_at: str = ""

    # Community
    likes: int = 0
    liked_by: Set[str] = field(default_factory=set)

    # AI-generated fields
    flavor_profile: np.ndarray = field(default_factory=lambda: np.zeros(5))
    estimated_nutrition: Dict[str, float] = field(default_factory=dict)
    estimated_cost: float = 0.0
    health_warnings: List[str] = field(default_factory=list)

    def to_dict(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "author_name": self.author_name,
            "title": self.title,
            "cuisine": self.cuisine,
            "region": self.region,
            "diet_type": self.diet_type,
            "spice_level": self.spice_level,
            "ingredients": self.ingredients,
            "steps": self.steps,
            "health_tags": self.health_tags,
            "budget_tier": self.budget_tier,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "likes": self.likes,
            "flavor_profile": self.flavor_profile.tolist(),
            "estimated_nutrition": self.estimated_nutrition,
            "estimated_cost": self.estimated_cost,
            "health_warnings": self.health_warnings,
        }
