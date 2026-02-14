import requests
import time

# Your Foodoscope API Key
API_KEY = "PASTE_YOUR_API_KEY_HERE"

# Correct endpoint
URL = "https://api.foodoscope.com/recipe2-api/recipe-bytitle/recipeByTitle"

# Query parameters
PARAMS = {
    "title": "chicken"
}

# Headers (Important)
HEADERS = {
    "Authorization": f"Bearer {API_KEY}"
}

start_time = time.time()

try:
    response = requests.get(URL, params=PARAMS, headers=HEADERS)
    end_time = time.time()

    print("Status Code:", response.status_code)
    print("Response Time:", round(end_time - start_time, 2), "seconds")

    data = response.json()

    print("\nSample Data:")
    print(data)

except Exception as e:
    print("API Error:", e)

