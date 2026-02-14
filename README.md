
# FlavorSense AI Backend

FlavorSense AI is a modular, scalable Flask backend for personalized food recommendation.

## Features
- **User Profile Management**: Diet, allergies, health conditions, budget, flavor preferences.
- **Recipe Recommendation**: Cosine similarity matching based on flavor profiles.
- **Meal Planning**: Automated 7-day meal plan generation.
- **Grocery List**: Aggregates ingredients from meal plans.

## Flavor Intelligence
**Flavor intelligence is powered by offline ingredient flavor embeddings derived from FlavorDB2 molecular flavor dataset for computational gastronomy.**

The system uses a local dataset (`backend/data/flavor_vectors.json`) to dynamically calculate recipe flavor profiles based on ingredients, eliminating the need for external flavor APIs.

## Tech Stack
- Python 3.x
- Flask
- NumPy (for vector math)

## Setup & Run

1. **Install Dependencies**
   ```bash
   pip install -r backend/requirements.txt
   ```

2. **Run Server**
   ```bash
   python backend/app.py
   ```

3. **Verify**
   ```bash
   python backend/verify_backend.py
   ```

## API Endpoints
- `POST /api/recommend`: Get top 5 recipe recommendations.
- `POST /api/mealplan`: Generate weekly meal plan.
- `POST /api/grocery`: Generate grocery list from meal plan.
=======
# Codenova
>>>>>>> 823dbe80fda6ffcfb35d27a208439b1388428bd7
