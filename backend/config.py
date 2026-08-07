import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..'))

db_url = os.environ.get('DATABASE_URL', '')
if db_url.startswith('postgres://'):
    db_url = db_url.replace('postgres://', 'postgresql://', 1)

class Config:
    """Base application configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'agriconnect_super_secret_jwt_key_2026')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'agriconnect_jwt_auth_secret_key_9988')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)
    
    # SQLite / PostgreSQL Database Configuration
    DATABASE_PATH = os.path.join(PROJECT_ROOT, 'database', 'agriconnect.db')
    SQLALCHEMY_DATABASE_URI = db_url if db_url else f'sqlite:///{DATABASE_PATH}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Uploads Configuration
    UPLOAD_FOLDER = os.path.join(PROJECT_ROOT, 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB Max Upload Limit
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

    # CORS Allowed Origins (Wildcard * allows any Vercel domain)
    CORS_HEADERS = 'Content-Type, Authorization'
    CORS_ORIGINS = '*'

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config_by_name = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig,
    'default': DevelopmentConfig
}
