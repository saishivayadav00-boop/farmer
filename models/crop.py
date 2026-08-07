from datetime import datetime
from backend.extensions import db

class Crop(db.Model):
    __tablename__ = 'crops'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    season = db.Column(db.String(50), nullable=False)  # Rabi, Kharif, Zaid
    soil_type = db.Column(db.String(100), nullable=False)  # Alluvial, Black, Loamy, Sandy
    nitrogen_req = db.Column(db.Float, nullable=False)  # mg/kg
    phosphorus_req = db.Column(db.Float, nullable=False)
    potassium_req = db.Column(db.Float, nullable=False)
    ph_min = db.Column(db.Float, nullable=False, default=6.0)
    ph_max = db.Column(db.Float, nullable=False, default=7.5)
    min_rainfall = db.Column(db.Float, nullable=False, default=50.0)  # mm
    max_rainfall = db.Column(db.Float, nullable=False, default=300.0)
    expected_yield = db.Column(db.String(100), nullable=False)  # e.g., 22 - 25 Quintals / Acre
    description = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'season': self.season,
            'soil_type': self.soil_type,
            'nitrogen_req': self.nitrogen_req,
            'phosphorus_req': self.phosphorus_req,
            'potassium_req': self.potassium_req,
            'ph_range': f"{self.ph_min} - {self.ph_max}",
            'rainfall_range': f"{self.min_rainfall} - {self.max_rainfall} mm",
            'expected_yield': self.expected_yield,
            'description': self.description
        }

class SoilLog(db.Model):
    __tablename__ = 'soil_logs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    nitrogen = db.Column(db.Float, nullable=False)
    phosphorus = db.Column(db.Float, nullable=False)
    potassium = db.Column(db.Float, nullable=False)
    ph = db.Column(db.Float, nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
    rainfall = db.Column(db.Float, nullable=False)
    recommended_crop = db.Column(db.String(100), nullable=False)
    match_score = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'nitrogen': self.nitrogen,
            'phosphorus': self.phosphorus,
            'potassium': self.potassium,
            'ph': self.ph,
            'temperature': self.temperature,
            'humidity': self.humidity,
            'rainfall': self.rainfall,
            'recommended_crop': self.recommended_crop,
            'match_score': self.match_score,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
