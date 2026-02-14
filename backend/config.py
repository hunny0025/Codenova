import os
from dotenv import load_dotenv

# Load .env from backend directory
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))

class Config:
    DEBUG = True
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')

    # Foodoscope RecipeDB API
    FOODOSCOPE_TOKEN = os.environ.get('FOODOSCOPE_TOKEN', '')
    FOODOSCOPE_BASE_URL = os.environ.get('FOODOSCOPE_BASE_URL', 'https://cosylab.iiitd.edu.in/recipe-search/recipe2-api')

    # Legacy keys (kept for backward compatibility)
    RECIPE_API_KEY = os.environ.get('RECIPE_API_KEY', 'mock-recipe-key')
    FLAVOR_API_KEY = os.environ.get('FLAVOR_API_KEY', 'mock-flavor-key')

    # Timeout for external API calls (seconds)
    API_TIMEOUT = 10
