from backend.extensions import db

class Disease(db.Model):
    __tablename__ = 'diseases'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    crop_name = db.Column(db.String(100), nullable=False)
    disease_name = db.Column(db.String(150), nullable=False)
    scientific_name = db.Column(db.String(150), nullable=True)
    symptoms = db.Column(db.Text, nullable=False)
    organic_treatment = db.Column(db.Text, nullable=False)
    chemical_treatment = db.Column(db.Text, nullable=False)
    severity = db.Column(db.String(20), default='Moderate')  # Low, Moderate, High, Severe

    def to_dict(self):
        return {
            'id': self.id,
            'crop_name': self.crop_name,
            'disease_name': self.disease_name,
            'scientific_name': self.scientific_name,
            'symptoms': self.symptoms,
            'organic_treatment': self.organic_treatment,
            'chemical_treatment': self.chemical_treatment,
            'severity': self.severity
        }
