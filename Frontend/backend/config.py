import os
<<<<<<< HEAD
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
=======

class Config:
    DEBUG = True
    RECIPE_API_KEY = os.environ.get('RECIPE_API_KEY', 'mock-recipe-key')
    FLAVOR_API_KEY = os.environ.get('FLAVOR_API_KEY', 'mock-flavor-key')
    RECIPE_API_URL = os.environ.get('RECIPE_API_URL', 'https://api.mockrecipe.com')
    FLAVOR_API_URL = os.environ.get('FLAVOR_API_URL', 'https://api.mockflavor.com')
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
>>>>>>> 823dbe80fda6ffcfb35d27a208439b1388428bd7
