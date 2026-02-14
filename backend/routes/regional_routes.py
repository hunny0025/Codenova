"""
Regional Routes — heatmap data endpoints.
"""
from flask import Blueprint, request, jsonify
from services.regional_service import regional_service

regional_bp = Blueprint('regional', __name__)


@regional_bp.route('/regions/popular/all', methods=['GET'])
def popular_all():
    """
    GET /api/regions/popular/all
    Returns recipe counts per state for heatmap coloring.
    """
    counts = regional_service.get_all_counts()
    names = regional_service.get_state_names()
    return jsonify({
        'counts': counts,
        'names': names,
    }), 200


@regional_bp.route('/regions/popular', methods=['GET'])
def popular_state():
    """
    GET /api/regions/popular?state=UP
    Returns full recipe list for a single state.
    """
    state_code = request.args.get('state', '').upper()
    if not state_code:
        return jsonify({'error': 'Missing ?state= parameter'}), 400

    data = regional_service.get_state(state_code)
    if not data:
        return jsonify({'error': f'No data for state: {state_code}'}), 404

    return jsonify(data), 200
