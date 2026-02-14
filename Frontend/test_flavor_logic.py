import sys
import os
import numpy as np

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from services.flavor_service import flavor_service
from services.recommendation_engine import recommendation_engine

def test_flavor_loading():
    print("Testing Flavor Loading...")
    vec = flavor_service.get_flavor_vector("avocado")
    print(f"Avocado Vector: {vec}")
    assert np.any(vec), "Avocado vector should not be zero"
    
    vec_unknown = flavor_service.get_flavor_vector("unknown_ingredient")
    print(f"Unknown Vector: {vec_unknown}")
    assert not np.any(vec_unknown), "Unknown vector should be zero"
    print("Flavor Loading Passed!")

def test_recipe_calculation():
    print("\nTesting Recipe Calculation...")
    ingredients = ["avocado", "bread", "salt", "pepper"]
    vec = recommendation_engine._calculate_recipe_flavor(ingredients)
    print(f"Recipe Vector (Avocado Toast): {vec}")
    assert np.any(vec), "Recipe vector should not be zero"
    
    # Check normalization
    norm = np.linalg.norm(vec)
    print(f"Norm: {norm}")
    assert np.isclose(norm, 1.0) or norm == 0, "Vector should be normalized"
    print("Recipe Calculation Passed!")

if __name__ == "__main__":
    test_flavor_loading()
    test_recipe_calculation()
