<<<<<<< HEAD
"""
End-to-end verification for FlavorSense AI Production Improvements.
Tests: ML ranking + metadata, interaction pipeline, allergy filter, and all existing endpoints.
"""
import requests
import json

BASE_URL = "http://127.0.0.1:5000/api"


def test_recommend_ml():
    """Test ML-powered recommendation with full metadata."""
    print("\n=== POST /api/recommend (ML + Metadata) ===")
    payload = {
        "user_id": "u1",
        "diet_type": "veg",
        "flavor_preference_vector": [0.8, 0.2, 0.1, 0.1, 0.5],
        "cuisine_preference": "indian",
        "calorie_goal": 2000,
        "daily_budget": 25,
        "allergies": []
    }
    resp = requests.post(f"{BASE_URL}/recommend", json=payload)
    print(f"Status: {resp.status_code}")
    data = resp.json()
    print(f"  ranking_source: {data.get('ranking_source')}")
    print(f"  model_version: {data.get('model_version')}")
    print(f"  features_used: {data.get('features_used')}")
    print(f"  recommendation_time_ms: {data.get('recommendation_time_ms')}")
    print(f"  count: {data.get('count')}")
    if 'results' in data and data['results']:
        r = data['results'][0]
        print(f"  Top recipe: {r['title']}")
        print(f"    score: {r.get('relevance_score')}")
        print(f"    confidence: {r.get('confidence')}")
        print(f"    explanation: {r.get('explanation')}")


def test_interaction_like():
    """Test recording a like interaction."""
    print("\n=== POST /api/interaction (like) ===")
    payload = {"user_id": "test_u1", "recipe_id": "1", "action": "like"}
    resp = requests.post(f"{BASE_URL}/interaction", json=payload)
    print(f"Status: {resp.status_code}")
    data = resp.json()
    print(f"  status: {data.get('status')}")
    print(f"  flavor_updated: {data.get('flavor_updated')}")
    print(f"  updated_flavor_vector: {data.get('updated_flavor_vector', 'N/A')}")
    print(f"  live_interactions_total: {data.get('live_interactions_total')}")


def test_interaction_dislike():
    """Test recording a dislike interaction."""
    print("\n=== POST /api/interaction (dislike) ===")
    payload = {"user_id": "test_u1", "recipe_id": "2", "action": "dislike"}
    resp = requests.post(f"{BASE_URL}/interaction", json=payload)
    print(f"Status: {resp.status_code}")
    data = resp.json()
    print(f"  status: {data.get('status')}")
    print(f"  weight: {data.get('weight')}")
    print(f"  flavor_updated: {data.get('flavor_updated')}")


def test_allergy_filter():
    """Test allergy hard filter."""
    print("\n=== POST /api/recommend (allergy=salmon) ===")
    payload = {
        "user_id": "u2", "diet_type": "non-veg",
        "flavor_preference_vector": [0.5, 0.3, 0.1, 0.0, 0.9],
        "allergies": ["salmon"]
    }
    resp = requests.post(f"{BASE_URL}/recommend", json=payload)
    data = resp.json()
    titles = [r['title'] for r in data.get('results', [])]
    has_salmon = any('salmon' in t.lower() for t in titles)
    print(f"Status: {resp.status_code}, Contains Salmon: {has_salmon} (should be False)")


def test_search():
    print("\n=== POST /api/search ===")
    resp = requests.post(f"{BASE_URL}/search", json={"title": "pasta"})
    print(f"Status: {resp.status_code}, Count: {resp.json().get('count')}")


def test_recipe_by_id():
    print("\n=== GET /api/recipe/1 ===")
    resp = requests.get(f"{BASE_URL}/recipe/1")
    print(f"Status: {resp.status_code}, Title: {resp.json().get('title', resp.json().get('error'))}")


def test_mealplan():
    print("\n=== POST /api/mealplan ===")
    payload = {"diet_type": "veg", "flavor_preference_vector": [0.5,0.5,0.5,0.5,0.5]}
    resp = requests.post(f"{BASE_URL}/mealplan", json=payload)
    data = resp.json()
    print(f"Status: {resp.status_code}, Days: {len(data) if isinstance(data, dict) else 'N/A'}")


if __name__ == "__main__":
    test_recommend_ml()
    test_interaction_like()
    test_interaction_dislike()
    test_allergy_filter()
    test_search()
    test_recipe_by_id()
    test_mealplan()
    print("\n=== ALL TESTS COMPLETE ===")
=======
import requests
import json
import time
import sys

BASE_URL = "http://127.0.0.1:5000/api"

def test_recommendation():
    print("\n--- Testing /recommend ---")
    payload = {
        "id": "user123",
        "username": "TestUser",
        "diet_type": "veg",
        "allergies": ["peanut"],
        "daily_budget": 20.0,
        "flavor_preference_vector": [0.8, 0.2, 0.1, 0.1, 0.5]
    }
    
    try:
        response = requests.post(f"{BASE_URL}/recommend", json=payload)
        if response.status_code == 200:
            print("SUCCESS: Recommendation API")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"FAILED: Recommendation API - {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"ERROR: {e}")

def test_mealplan():
    print("\n--- Testing /mealplan ---")
    payload = {
        "id": "user123",
        "diet_type": "non-veg",
        "daily_budget": 50.0,
        "flavor_preference_vector": [0.5, 0.5, 0.5, 0.5, 0.5]
    }
    
    try:
        response = requests.post(f"{BASE_URL}/mealplan", json=payload)
        if response.status_code == 200:
            print("SUCCESS: Meal Plan API")
            # Print just one day to save space
            data = response.json()
            print(json.dumps({"Monday": data.get("Monday")}, indent=2))
            return data # Return for grocery test
        else:
            print(f"FAILED: Meal Plan API - {response.status_code}")
            print(response.text)
            return None
    except Exception as e:
        print(f"ERROR: {e}")
        return None

def test_grocery(meal_plan):
    print("\n--- Testing /grocery ---")
    if not meal_plan:
        print("SKIPPING: No meal plan data")
        return

    try:
        response = requests.post(f"{BASE_URL}/grocery", json=meal_plan)
        if response.status_code == 200:
            print("SUCCESS: Grocery API")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"FAILED: Grocery API - {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    # Wait for server to start if running immediately after spawn
    time.sleep(2) 
    
    test_recommendation()
    plan = test_mealplan()
    test_grocery(plan)
>>>>>>> 823dbe80fda6ffcfb35d27a208439b1388428bd7
