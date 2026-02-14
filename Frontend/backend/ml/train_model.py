"""
Training Pipeline for FlavorSense AI
Loads synthetic interactions, builds features, trains XGBoost, saves model.

Run:
    python backend/ml/train_model.py
"""
import os
import sys
import json
import pickle
import yaml
import pandas as pd
import numpy as np
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

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


def load_interactions():
    csv_path = os.path.join(BASE_DIR, 'data', 'user_interactions.csv')
    return pd.read_csv(csv_path)


def get_user_profile(user_id):
    """Look up synthetic user profile by ID."""
    for u in SYNTHETIC_USERS:
        if u['id'] == user_id:
            return {
                'flavor_vector': u['flavor_vec'],
                'diet_type': u['diet'],
                'calorie_goal': u['calorie_goal'],
                'cuisine_preference': u['cuisine'],
                'daily_budget': u['budget'],
            }
    return None


def main():
    config = load_config()
    training_cfg = config['training']

    print("[1/5] Loading data...")
    interactions = load_interactions()
    recipes_list = load_recipes()
    recipes_map = {r['id']: r for r in recipes_list}

    print(f"      {len(interactions)} interactions, {len(recipes_list)} recipes")

    print("[2/5] Building feature matrix...")
    X_rows = []
    y_rows = []

    for _, row in interactions.iterrows():
        user_profile = get_user_profile(row['user_id'])
        recipe = recipes_map.get(str(row['recipe_id']))

        if user_profile is None or recipe is None:
            continue

        features = build_features(user_profile, recipe)
        X_rows.append(features)
        y_rows.append(float(row['rating']))

    X = np.array(X_rows)
    y = np.array(y_rows)
    print(f"      Feature matrix: {X.shape}, Target: {y.shape}")

    print("[3/5] Splitting train/test...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=training_cfg['test_size'],
        random_state=training_cfg['random_state']
    )

    print("[4/5] Training XGBoost...")
    model = XGBRegressor(
        n_estimators=training_cfg['n_estimators'],
        max_depth=training_cfg['max_depth'],
        learning_rate=training_cfg['learning_rate'],
        random_state=training_cfg['random_state'],
        verbosity=0
    )
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    print(f"      RMSE: {rmse:.4f}  |  R²: {r2:.4f}")

    # Feature importance
    print("\n      Feature Importance:")
    importances = model.feature_importances_
    for name, imp in sorted(zip(FEATURE_NAMES, importances), key=lambda x: -x[1]):
        bar = '█' * int(imp * 40)
        print(f"        {name:20s} {imp:.3f} {bar}")

    print("\n[5/5] Saving model...")
    model_path = os.path.join(BASE_DIR, 'ml', 'model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"      Saved → {model_path}")
    print("\nTraining complete.")


if __name__ == '__main__':
    main()
