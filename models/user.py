from datetime import datetime
from backend.extensions import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='farmer', nullable=False)  # farmer, agronomist, trader, admin
    state = db.Column(db.String(50), nullable=True, default='Punjab')
    district = db.Column(db.String(50), nullable=True)
    farm_size = db.Column(db.Float, nullable=True, default=5.0)
    primary_crop = db.Column(db.String(50), nullable=True, default='Wheat')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    contact_messages = db.relationship('ContactMessage', backref='user', lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True)
    soil_logs = db.relationship('SoilLog', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'state': self.state,
            'district': self.district,
            'farm_size': self.farm_size,
            'primary_crop': self.primary_crop,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
