import datetime
import jwt
import re
from functools import wraps
from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash

# In-memory JWT Blacklist store
BLACK_LISTED_TOKENS = set()

def hash_password(password: str) -> str:
    """Hash password using pbkdf2:sha256."""
    return generate_password_hash(password, method='pbkdf2:sha256')

def verify_password(password_hash: str, password: str) -> bool:
    """Verify raw password against stored hash."""
    return check_password_hash(password_hash, password)

def generate_token(user_id: int, role: str, full_name: str = '') -> str:
    """Generate PyJWT token valid for 7 days."""
    secret_key = current_app.config.get('JWT_SECRET_KEY', 'agriconnect_jwt_auth_secret_key_9988')
    now = datetime.datetime.now(datetime.timezone.utc)
    payload = {
        'sub': str(user_id),
        'role': role,
        'name': full_name,
        'iat': int(now.timestamp()),
        'exp': int((now + datetime.timedelta(days=7)).timestamp())
    }
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    if isinstance(token, bytes):
        token = token.decode('utf-8')
    return token

def decode_token(token: str):
    """Decode and validate PyJWT token."""
    secret_key = current_app.config.get('JWT_SECRET_KEY', 'agriconnect_jwt_auth_secret_key_9988')
    try:
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return {'error': 'Token has expired'}
    except jwt.InvalidTokenError as e:
        return {'error': f'Invalid authorization token: {str(e)}'}

def blacklist_token(token: str):
    """Add token to blacklist set."""
    BLACK_LISTED_TOKENS.add(token)

def is_token_blacklisted(token: str) -> bool:
    """Check if token is blacklisted."""
    return token in BLACK_LISTED_TOKENS

def token_required(f):
    """Decorator to enforce JWT token authorization on protected routes."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            
        if not token:
            return jsonify({'status': 'error', 'message': 'Authorization token is missing!'}), 401
            
        if is_token_blacklisted(token):
            return jsonify({'status': 'error', 'message': 'Token has been logged out. Please log in again.'}), 401

        decoded = decode_token(token)
        if 'error' in decoded:
            return jsonify({'status': 'error', 'message': decoded['error']}), 401
            
        # Attach user information and active token to request context
        sub_val = decoded['sub']
        request.user_id = int(sub_val) if str(sub_val).isdigit() else sub_val
        request.user_role = decoded['role']
        request.token = token
        return f(*args, **kwargs)
        
    return decorated

def role_required(*allowed_roles):
    """Decorator to enforce Role-Based Access Control (RBAC)."""
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not hasattr(request, 'user_role'):
                return jsonify({'status': 'error', 'message': 'Authentication required.'}), 401
                
            if request.user_role not in allowed_roles:
                return jsonify({
                    'status': 'error', 
                    'message': f'Access denied! Require one of roles: {", ".join(allowed_roles)}. Your role is {request.user_role}.'
                }), 403
                
            return f(*args, **kwargs)
        return decorated
    return decorator
