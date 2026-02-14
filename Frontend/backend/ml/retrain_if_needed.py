"""
Auto Retrain Script for FlavorSense AI
Merges synthetic + live interactions, retrains XGBoost, updates model registry.

Run:
    python backend/ml/retrain_if_needed.py
"""
import os
import sys
import json
import pickle
from datetime import datetime

import pandas as pd
import numpy as np
import yaml
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from features.feature_builder import build_features, FEATURE_NAMES
from data.generate_synthetic_data import SYNTHETIC_USERS


def load_config():
    config_path = os.path.join(BASE_DIR, 'config', 'model_config.yaml')
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


def load_recipes():
    cache_path = os.path.join(BASE_DIR, 'data', 'recipes_cache.json')
    with open(cache_path, 'r') as f:
        return json.load(f)


def get_user_profile(user_id):
    for u in SYNTHETIC_USERS:
        if u['id'] == user_id:
            return {
                'flavor_vector': u['flavor_vec'],
                'diet_type': u['diet'],
                'calorie_goal': u['calorie_goal'],
                'cuisine_preference': u['cuisine'],
                'daily_budget': u['budget'],
            }
    # For live users, return a generic profile
    return {
        'flavor_vector': [0.5] * 5,
        'diet_type': 'non-veg',
        'calorie_goal': 2000,
        'cuisine_preference': '',
        'daily_budget': 30,
    }


def count_live_interactions():
    csv_path = os.path.join(BASE_DIR, 'data', 'user_interactions_live.csv')
    if not os.path.exists(csv_path):
        return 0
    with open(csv_path, 'r') as f:
        return sum(1 for _ in f) - 1  # minus header


def merge_interactions():
    """Merge synthetic + live interaction CSVs."""
    synthetic_path = os.path.join(BASE_DIR, 'data', 'user_interactions.csv')
    live_path = os.path.join(BASE_DIR, 'data', 'user_interactions_live.csv')

    dfs = []
    if os.path.exists(synthetic_path):
        dfs.append(pd.read_csv(synthetic_path))
    if os.path.exists(live_path):
        dfs.append(pd.read_csv(live_path))

    if not dfs:
        return pd.DataFrame()
    return pd.concat(dfs, ignore_index=True)


def main():
    config = load_config()
    threshold = config.get('retrain', {}).get('min_new_interactions', 50)
    live_count = count_live_interactions()

    print(f"[Retrain] Live interactions: {live_count} / {threshold} threshold")

    # Allow force retrain via --force flag
    force = '--force' in sys.argv

    if live_count < threshold and not force:
        print("[Retrain] Not enough new interactions. Use --force to override.")
        return

    print("[Retrain] Threshold met — retraining...")

    recipes_list = load_recipes()
    recipes_map = {str(r['id']): r for r in recipes_list}
    interactions = merge_interactions()

    if interactions.empty:
        print("[Retrain] No interactions found. Aborting.")
        return

    training_cfg = config['training']

    # Build features
    X_rows, y_rows = [], []
    for _, row in interactions.iterrows():
        user_profile = get_user_profile(row['user_id'])
        recipe = recipes_map.get(str(row['recipe_id']))
        if recipe is None:
            continue
        features = build_features(user_profile, recipe)
        X_rows.append(features)
        y_rows.append(float(row['rating']))

    X = np.array(X_rows)
    y = np.array(y_rows)
    total_samples = len(X)
    print(f"[Retrain] Samples: {total_samples} ({live_count} live + {total_samples - live_count} synthetic)")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=training_cfg['test_size'], random_state=training_cfg['random_state']
    )

    model = XGBRegressor(
        n_estimators=training_cfg['n_estimators'],
        max_depth=training_cfg['max_depth'],
        learning_rate=training_cfg['learning_rate'],
        random_state=training_cfg['random_state'],
        verbosity=0
    )
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    rmse = round(float(np.sqrt(mean_squared_error(y_test, y_pred))), 4)
    print(f"[Retrain] RMSE: {rmse}")

    # Determine next version number
    registry_path = os.path.join(BASE_DIR, 'ml', 'model_registry.json')
    try:
        with open(registry_path, 'r') as f:
            registry = json.load(f)
    except Exception:
        registry = {"history": []}

    history = registry.get('history', [])
    next_version = len(history) + 1
    model_name = f"model_v{next_version}.pkl"

    # Save model
    models_dir = os.path.join(BASE_DIR, 'ml', 'models')
    os.makedirs(models_dir, exist_ok=True)
    model_path = os.path.join(models_dir, model_name)
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"[Retrain] Saved → {model_name}")

    # Update registry
    today = datetime.now().strftime('%Y-%m-%d')
    history.append({
        "version": model_name,
        "trained_on": today,
        "samples": total_samples,
        "rmse": rmse,
    })
    registry = {
        "current_model": model_name,
        "trained_on": today,
        "samples": total_samples,
        "rmse": rmse,
        "features_used": len(FEATURE_NAMES),
        "history": history,
    }
    with open(registry_path, 'w') as f:
        json.dump(registry, f, indent=2)
    print(f"[Retrain] Registry updated → {model_name}")

    # Clear live interactions (already folded into training)
    live_path = os.path.join(BASE_DIR, 'data', 'user_interactions_live.csv')
    if os.path.exists(live_path):
        os.remove(live_path)
        print("[Retrain] Cleared user_interactions_live.csv")

    print("[Retrain] Complete.")


if __name__ == '__main__':
    main()
