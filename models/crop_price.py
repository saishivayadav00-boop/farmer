from datetime import datetime
from backend.extensions import db

class CropPrice(db.Model):
    __tablename__ = 'crop_prices'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    commodity = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    mandi_name = db.Column(db.String(100), nullable=False)
    modal_price = db.Column(db.Float, nullable=False)
    min_price = db.Column(db.Float, nullable=False)
    max_price = db.Column(db.Float, nullable=False)
    change_pct = db.Column(db.String(20), default='+0.0%')
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'commodity': self.commodity,
            'state': self.state,
            'mandi_name': self.mandi_name,
            'modal_price': self.modal_price,
            'min_price': self.min_price,
            'max_price': self.max_price,
            'change_pct': self.change_pct,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
