from datetime import datetime
from backend.extensions import db

class GovernmentScheme(db.Model):
    __tablename__ = 'government_schemes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'), nullable=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    benefit = db.Column(db.String(255), nullable=False)
    eligibility = db.Column(db.Text, nullable=False)
    department = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'admin_id': self.admin_id,
            'title': self.title,
            'category': self.category,
            'benefit': self.benefit,
            'eligibility': self.eligibility,
            'department': self.department,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
