from flask import Blueprint, request, jsonify
from models.scheme import GovernmentScheme

scheme_bp = Blueprint('schemes', __name__, url_prefix='/api/schemes')

@scheme_bp.route('', methods=['GET'])
@scheme_bp.route('/', methods=['GET'])
def get_schemes():
    category = request.args.get('category')
    query = GovernmentScheme.query
    if category and category != 'All':
        query = query.filter_by(category=category)
    
    schemes = query.all()
    if not schemes:
        default_schemes = [
            {
                'id': 1,
                'title': 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
                'category': 'Direct Income Support',
                'benefit': '₹6,000 / year (3 installments of ₹2,000)',
                'eligibility': 'Small & marginal landholder farmer families.',
                'department': 'Ministry of Agriculture & Farmers Welfare',
                'description': 'Direct financial assistance to small farmer households across India.'
            },
            {
                'id': 2,
                'title': 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
                'category': 'Crop Insurance',
                'benefit': 'Comprehensive crop loss protection against natural risks at 1.5%-2% premium',
                'eligibility': 'Farmers growing notified crops in notified areas.',
                'department': 'Department of Agriculture & Farmers Welfare',
                'description': 'Financial support to farmers suffering crop damage arising out of natural calamities.'
            }
        ]
        return jsonify({'status': 'success', 'schemes': default_schemes, 'count': len(default_schemes)}), 200

    return jsonify({'status': 'success', 'schemes': [s.to_dict() for s in schemes], 'count': len(schemes)}), 200
