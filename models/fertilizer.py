from backend.extensions import db

class Fertilizer(db.Model):
    __tablename__ = 'fertilizers'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    type = db.Column(db.String(50), nullable=False)  # Nitrogenous, Phosphatic, Potassic, Complex
    nitrogen_pct = db.Column(db.Float, default=0.0)
    phosphorus_pct = db.Column(db.Float, default=0.0)
    potassium_pct = db.Column(db.Float, default=0.0)
    application_guide = db.Column(db.Text, nullable=False)
    dosage_per_acre = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'composition': f"N:{self.nitrogen_pct}% P:{self.phosphorus_pct}% K:{self.potassium_pct}%",
            'application_guide': self.application_guide,
            'dosage_per_acre': self.dosage_per_acre
        }
