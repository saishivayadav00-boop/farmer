from flask import Blueprint, request, jsonify
from backend.extensions import db
from models.crop import SoilLog, Crop

crop_bp = Blueprint('crops', __name__, url_prefix='/api/crops')

@crop_bp.route('/recommend', methods=['POST'])
def recommend_crop():
    data = request.get_json() or {}
    
    soil_type = data.get('soil_type', 'Alluvial / Loam').strip()
    temperature = float(data.get('temperature', 24.5))
    humidity = float(data.get('humidity', 62.0))
    rainfall = float(data.get('rainfall', 185.0))
    season = data.get('season', 'Rabi').strip()
    
    n = float(data.get('nitrogen', 90))
    p = float(data.get('phosphorus', 42))
    k = float(data.get('potassium', 43))
    ph = float(data.get('ph', 6.8))

    soil_lower = soil_type.lower()
    season_lower = season.lower()

    if 'black' in soil_lower or 'cotton' in soil_lower:
        recommended_crop = "Cotton (Bt-Cotton)"
        confidence_score = "96.4%"
        expected_yield = "12 - 15 Quintals / Acre"
        reason = f"Deep black cotton soil combined with {season} season temperature ({temperature}°C) and rainfall ({rainfall} mm) provides ideal moisture retention for deep root development."
        secondary_crops = [
            {'name': 'Soybean (Yellow)', 'confidence_score': '89.5%'},
            {'name': 'Pigeon Pea (Arhar)', 'confidence_score': '84.2%'}
        ]
    elif 'rabi' in season_lower or (temperature < 26.0 and rainfall < 220.0):
        recommended_crop = "Wheat (HD 2967 / PBW 725)"
        confidence_score = "97.8%"
        expected_yield = "22 - 25 Quintals / Acre"
        reason = f"Cool Rabi season temperature profile ({temperature}°C), {soil_type} texture, and moderate rainfall ({rainfall} mm) match ideal wheat germination and grain filling conditions."
        secondary_crops = [
            {'name': 'Mustard (Sarson)', 'confidence_score': '91.2%'},
            {'name': 'Barley (Jau)', 'confidence_score': '86.0%'},
            {'name': 'Chickpea (Chana)', 'confidence_score': '81.4%'}
        ]
    elif 'clay' in soil_lower or 'kharif' in season_lower or rainfall > 220.0:
        recommended_crop = "Paddy / Rice (Basmati 1121)"
        confidence_score = "95.2%"
        expected_yield = "28 - 32 Quintals / Acre"
        reason = f"High rainfall ({rainfall} mm), heavy {soil_type} water retention, and humid Kharif climate ({humidity}%) create prime conditions for paddy tillering."
        secondary_crops = [
            {'name': 'Maize (Corn)', 'confidence_score': '88.0%'},
            {'name': 'Sugarcane', 'confidence_score': '83.5%'}
        ]
    elif 'sandy' in soil_lower or rainfall < 100.0:
        recommended_crop = "Pearl Millet (Bajra)"
        confidence_score = "92.0%"
        expected_yield = "10 - 12 Quintals / Acre"
        reason = f"Drought-tolerant crop suitable for sandy soil with low rainfall ({rainfall} mm) and warm ambient temperature ({temperature}°C)."
        secondary_crops = [
            {'name': 'Cluster Bean (Guar)', 'confidence_score': '87.4%'},
            {'name': 'Moth Bean', 'confidence_score': '82.1%'}
        ]
    else:
        recommended_crop = "Maize (Hybrid Corn)"
        confidence_score = "90.5%"
        expected_yield = "20 - 24 Quintals / Acre"
        reason = f"Well-drained {soil_type} with balanced temperature ({temperature}°C) and humidity ({humidity}%) supports high photosynthetic efficiency."
        secondary_crops = [
            {'name': 'Sunflower', 'confidence_score': '85.0%'},
            {'name': 'Groundnut (Peanut)', 'confidence_score': '80.2%'}
        ]

    try:
        log = SoilLog(
            user_id=data.get('user_id'),
            nitrogen=n,
            phosphorus=p,
            potassium=k,
            ph=ph,
            temperature=temperature,
            humidity=humidity,
            rainfall=rainfall,
            recommended_crop=recommended_crop,
            match_score=confidence_score
        )
        db.session.add(log)
        db.session.commit()
    except Exception as e:
        db.session.rollback()

    return jsonify({
        'status': 'success',
        'recommendation': {
            'recommended_crop': recommended_crop,
            'confidence_score': confidence_score,
            'expected_yield': expected_yield,
            'reason': reason,
            'secondary_crops': secondary_crops
        }
    }), 200

@crop_bp.route('/fertilizer', methods=['POST'])
def calculate_fertilizer():
    data = request.get_json() or {}
    crop = data.get('crop', 'Wheat').strip()
    soil = data.get('soil', 'Loamy Soil').strip()

    crop_lower = crop.lower()
    soil_lower = soil.lower()

    if 'wheat' in crop_lower:
        best_fertilizer = "Urea (46% N) + DAP (18-46-0) + MOP (60% K2O)"
        reason = f"Wheat cultivated in {soil} requires robust Nitrogen for crown root initiation and high Phosphorus to establish deep root architecture."
        usage = "Apply 55 Kg DAP + 20 Kg MOP per acre as basal dose during sowing. Apply 45 Kg Urea in 2 split doses: 50% at first irrigation (21 days) and 50% at jointing stage (45 days)."
        precautions = "Do not apply Urea on dry soil surface. Avoid mixing DAP directly with Zinc Sulphate. Wear protective gloves and mask when broadcasting."
    elif 'paddy' in crop_lower or 'rice' in crop_lower:
        best_fertilizer = "Urea + Single Super Phosphate (SSP) + MOP + Zinc Sulphate (21%)"
        reason = f"Paddy grown in {soil} needs early Nitrogen and Zinc supplementation to prevent Khaira disease in flooded clay fields."
        usage = "Apply 150 Kg SSP + 25 Kg MOP + 10 Kg Zinc Sulphate per acre before transplanting. Top-dress 50 Kg Urea at active tillering (21 days) and 35 Kg Urea at panicle initiation."
        precautions = "Keep field flooded with 2-3 cm water layer during Urea application. Never apply Zinc Sulphate with DAP directly in the same basin."
    elif 'cotton' in crop_lower:
        best_fertilizer = "NPK 10-26-26 + Neem-Coated Urea + Magnesium Sulphate"
        reason = f"Cotton in {soil} demands balanced Potassium to prevent square dropping and improve boll size and lint quality."
        usage = "Apply 75 Kg NPK 10-26-26 + 10 Kg Magnesium Sulphate basal per acre. Apply 35 Kg Urea at 30 days and 35 Kg Urea at peak flowering."
        precautions = "Avoid heavy Nitrogen application during vegetative stage to prevent excessive leaf growth and boll rot."
    elif 'sugarcane' in crop_lower:
        best_fertilizer = "Urea (46% N) + DAP + MOP + Bio-Fertilizer (Azotobacter)"
        reason = f"Sugarcane is a heavy feeder in {soil} requiring high Potassium for cane elongation and sugar accumulation."
        usage = "Apply 100 Kg DAP + 50 Kg MOP per acre at planting. Apply 120 Kg Urea in 3 split doses up to earthing-up (90 days)."
        precautions = "Ensure thorough earthing-up after the final Urea application to minimize ammonia volatilization."
    else:
        best_fertilizer = "Complex NPK 19-19-19 + Organic Vermicompost"
        reason = f"{crop} in {soil} benefits from balanced NPK nutrition alongside organic carbon enhancement."
        usage = "Incorporate 2 tonnes Vermicompost + 50 Kg NPK 19-19-19 per acre during field preparation. Spray 1% foliar NPK 19-19-19 at 30 days."
        precautions = "Foliar spraying should be performed during late afternoon to prevent leaf scorching under hot sun."

    return jsonify({
        'status': 'success',
        'crop': crop,
        'soil': soil,
        'recommendation': {
            'best_fertilizer': best_fertilizer,
            'reason': reason,
            'usage': usage,
            'precautions': precautions
        }
    }), 200
