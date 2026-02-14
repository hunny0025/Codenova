from flask import Flask

from dotenv import load_dotenv

from config import Config
from routes.recommendation_routes import recommendation_bp
from routes.mealplan_routes import mealplan_bp
from routes.grocery_routes import grocery_bp

from routes.search_routes import search_bp
from routes.interaction_routes import interaction_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Register Blueprints
    app.register_blueprint(recommendation_bp, url_prefix='/api')
    app.register_blueprint(mealplan_bp, url_prefix='/api')
    app.register_blueprint(grocery_bp, url_prefix='/api')

    app.register_blueprint(search_bp, url_prefix='/api')
    app.register_blueprint(interaction_bp, url_prefix='/api')


    @app.route('/')
    def index():
        return "FlavorSense AI Backend is Running!"

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
