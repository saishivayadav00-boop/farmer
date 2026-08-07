from datetime import datetime
from backend.extensions import db

class Admin(db.Model):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    permission_level = db.Column(db.String(20), default='superadmin')  # superadmin, agronomist_mod, mandi_mod
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    blogs = db.relationship('Blog', backref='author_admin', lazy=True)
    schemes = db.relationship('GovernmentScheme', backref='managed_by_admin', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'permission_level': self.permission_level,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
