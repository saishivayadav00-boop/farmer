import random
from flask import Blueprint, request, jsonify
from backend.extensions import db
from models.contact_message import ContactMessage

contact_bp = Blueprint('contact', __name__, url_prefix='/api/contact')

@contact_bp.route('', methods=['POST'])
@contact_bp.route('/', methods=['POST'])
def submit_contact_message():
    data = request.get_json() or {}

    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()
    email = data.get('email', '').strip()
    state = data.get('state', 'Punjab').strip()
    category = data.get('category', data.get('subject', 'General Inquiry')).strip()
    message = data.get('message', '').strip()

    if not name or not phone or not message:
        return jsonify({
            'status': 'error',
            'message': 'Name, mobile phone number, and query message are required.'
        }), 400

    try:
        new_msg = ContactMessage(
            user_id=data.get('user_id'),
            name=name,
            phone=phone,
            state=state,
            category=category,
            message=message,
            status='Pending'
        )
        db.session.add(new_msg)
        db.session.commit()

        ticket_id = f"TKT-{random.randint(10000, 99999)}"

        return jsonify({
            'status': 'success',
            'message': 'Your agricultural query has been submitted successfully and saved to our portal database.',
            'ticket_id': ticket_id,
            'contact_message': new_msg.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 'error',
            'message': f'Failed to store message in database: {str(e)}'
        }), 500

@contact_bp.route('/messages', methods=['GET'])
def get_contact_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({
        'status': 'success',
        'count': len(messages),
        'messages': [m.to_dict() for m in messages]
    }), 200
