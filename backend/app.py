import os
from flask import Flask, jsonify, send_from_directory
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
    dist_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))
    
    app = Flask(__name__, static_folder=dist_folder if os.path.exists(dist_folder) else None)
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

    # Catch-all route to serve React frontend SPA or API info
    @app.route('/', defaults={'path': ''}, methods=['GET'])
    @app.route('/<path:path>', methods=['GET'])
    def catch_all(path):
        if path.startswith('api/'):
            return jsonify({'error': 'Endpoint not found'}), 404
        
        if os.path.exists(dist_folder) and os.path.exists(os.path.join(dist_folder, 'index.html')):
            if path != "" and os.path.exists(os.path.join(dist_folder, path)):
                return send_from_directory(dist_folder, path)
            else:
                return send_from_directory(dist_folder, 'index.html')
        
        return jsonify({
            'status': 'online',
            'service': 'AgriConnect REST API Backend',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'weather': '/api/weather',
                'crops': '/api/crops/recommend',
                'mandi': '/api/mandi/prices',
                'schemes': '/api/schemes',
                'blogs': '/api/blogs',
                'chat': '/api/chat',
                'contact': '/api/contact'
            }
        }), 200

    # Auto-create tables if they don't exist
    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    print("[SERVER] Starting AgriConnect Flask REST API Server on http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
