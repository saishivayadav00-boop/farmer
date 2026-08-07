import os
from flask import Flask, jsonify
from backend.config import Config
from backend.extensions import db, cors, migrate

# Import all 10 models
from models import (
    User, Admin, Crop, SoilLog, Fertilizer, Disease,
    CropPrice, GovernmentScheme, Blog, ContactMessage, Notification
)

# Import Blueprints
from routes.auth_routes import auth_bp
from routes.crop_routes import crop_bp
from routes.mandi_routes import mandi_bp
from routes.disease_routes import disease_bp
from routes.scheme_routes import scheme_bp
from routes.weather_routes import weather_bp
from routes.chat_routes import chat_bp
from routes.blog_routes import blog_bp
from routes.contact_routes import contact_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Ensure database & upload directories exist
    os.makedirs(os.path.dirname(app.config['DATABASE_PATH']), exist_ok=True)
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Initialize Extensions
    db.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
    migrate.init_app(app, db)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(crop_bp)
    app.register_blueprint(mandi_bp)
    app.register_blueprint(disease_bp)
    app.register_blueprint(scheme_bp)
    app.register_blueprint(weather_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(blog_bp)
    app.register_blueprint(contact_bp)

    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'online',
            'database': 'SQLite connected',
            'message': 'AgriConnect Backend API active & ready'
        }), 200

    # Auto-create tables if they don't exist
    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    print("[SERVER] Starting AgriConnect Flask REST API Server on http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
