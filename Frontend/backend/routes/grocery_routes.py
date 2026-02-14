from flask import Blueprint, request, jsonify
from services.grocery_service import grocery_service

grocery_bp = Blueprint('grocery', __name__)

@grocery_bp.route('/grocery', methods=['POST'])
def generate_grocery():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No meal plan provided"}), 400

        # Expecting input: { "Monday": [...], "Tuesday": [...] }
        grocery_list = grocery_service.generate_grocery_list(data)
        
        return jsonify(grocery_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
