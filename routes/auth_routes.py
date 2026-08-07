import re
from flask import Blueprint, request, jsonify
from backend.extensions import db
from models.user import User
from models.admin import Admin
from utils.auth import (
    hash_password, 
    verify_password, 
    generate_token, 
    blacklist_token,
    token_required, 
    role_required
)

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
PHONE_REGEX = r'^\+?[0-9]{10,15}$'

def is_valid_email(email: str) -> bool:
    return bool(re.match(EMAIL_REGEX, email))

def is_valid_phone(phone: str) -> bool:
    return bool(re.match(PHONE_REGEX, phone.replace(' ', '').replace('-', '')))

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    
    full_name = data.get('full_name', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', '')
    role = data.get('role', 'farmer').lower()
    state = data.get('state', 'Punjab')
    district = data.get('district', '')
    farm_size = data.get('farm_size', 5.0)
    primary_crop = data.get('primary_crop', 'Wheat')

    # Input Validation
    errors = []
    if not full_name:
        errors.append('Full name is required.')
    if not email or not is_valid_email(email):
        errors.append('A valid email address is required.')
    if not phone or not is_valid_phone(phone):
        errors.append('A valid 10-digit mobile number is required.')
    if not password or len(password) < 6:
        errors.append('Password must be at least 6 characters long.')
    if role not in ['farmer', 'trader', 'agronomist', 'admin']:
        errors.append('Role must be one of: farmer, trader, agronomist, admin.')

    if errors:
        return jsonify({'status': 'error', 'errors': errors}), 400

    # Duplicate check for User & Admin tables
    existing_user = User.query.filter((User.email == email) | (User.phone == phone)).first()
    existing_admin = Admin.query.filter_by(email=email).first()

    if existing_user or existing_admin:
        return jsonify({
            'status': 'error',
            'message': 'A user with this email or phone number is already registered.'
        }), 409

    pwd_hash = hash_password(password)

    if role == 'admin':
        admin_user = Admin(
            full_name=full_name,
            email=email,
            password_hash=pwd_hash,
            permission_level='superadmin'
        )
        db.session.add(admin_user)
        db.session.commit()

        token = generate_token(admin_user.id, role='admin', full_name=admin_user.full_name)
        return jsonify({
            'status': 'success',
            'message': 'Admin registered successfully!',
            'access_token': token,
            'user': admin_user.to_dict()
        }), 201
    else:
        user = User(
            full_name=full_name,
            email=email,
            phone=phone,
            password_hash=pwd_hash,
            role=role,
            state=state,
            district=district,
            farm_size=float(farm_size) if farm_size else 5.0,
            primary_crop=primary_crop
        )
        db.session.add(user)
        db.session.commit()

        token = generate_token(user.id, role=user.role, full_name=user.full_name)
        return jsonify({
            'status': 'success',
            'message': 'Farmer account registered successfully!',
            'access_token': token,
            'user': user.to_dict()
        }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    identifier = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not identifier or not password:
        return jsonify({
            'status': 'error',
            'message': 'Email/Phone and password are required.'
        }), 400

    # Search in User table first
    user = User.query.filter((User.email == identifier) | (User.phone == identifier)).first()
    
    if user and verify_password(user.password_hash, password):
        token = generate_token(user.id, role=user.role, full_name=user.full_name)
        return jsonify({
            'status': 'success',
            'message': 'Login successful!',
            'access_token': token,
            'user': user.to_dict()
        }), 200

    # Search in Admin table
    admin = Admin.query.filter_by(email=identifier).first()
    if admin and verify_password(admin.password_hash, password):
        token = generate_token(admin.id, role='admin', full_name=admin.full_name)
        return jsonify({
            'status': 'success',
            'message': 'Admin login successful!',
            'access_token': token,
            'user': admin.to_dict()
        }), 200

    return jsonify({
        'status': 'error',
        'message': 'Invalid credentials. Please check your login details.'
    }), 401

@auth_bp.route('/logout', methods=['POST'])
@token_required
def logout():
    token = request.token
    blacklist_token(token)
    return jsonify({
        'status': 'success',
        'message': 'Successfully logged out and token invalidated.'
    }), 200

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_profile():
    if request.user_role == 'admin':
        admin = Admin.query.get(request.user_id)
        if not admin:
            return jsonify({'status': 'error', 'message': 'Admin profile not found'}), 404
        return jsonify({'status': 'success', 'user': admin.to_dict()}), 200
    else:
        user = User.query.get(request.user_id)
        if not user:
            return jsonify({'status': 'error', 'message': 'User profile not found'}), 404
        return jsonify({'status': 'success', 'user': user.to_dict()}), 200

@auth_bp.route('/admin-dashboard', methods=['GET'])
@token_required
@role_required('admin', 'superadmin', 'agronomist_mod')
def admin_dashboard_metrics():
    user_count = User.query.count()
    admin_count = Admin.query.count()
    return jsonify({
        'status': 'success',
        'admin_metrics': {
            'registered_farmers': user_count,
            'active_admins': admin_count,
            'system_status': 'Operational',
            'message': 'Access granted to Protected Admin Console!'
        }
    }), 200
