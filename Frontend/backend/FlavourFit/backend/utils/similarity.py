import numpy as np

def calculate_similarity(vector_a: np.ndarray, vector_b: np.ndarray) -> float:
    """Calculates cosine similarity between two flavor vectors."""
    if vector_a is None or vector_b is None:
        return 0.0
    
    norm_a = np.linalg.norm(vector_a)
    norm_b = np.linalg.norm(vector_b)
    
    if norm_a == 0 or norm_b == 0:
        return 0.0
        
    return np.dot(vector_a, vector_b) / (norm_a * norm_b)
