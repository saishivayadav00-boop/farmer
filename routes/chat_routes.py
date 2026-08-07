from flask import Blueprint, request, jsonify

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')

def generate_agribot_response(message: str) -> dict:
    msg = message.lower()

    # 1. Crop Recommendation Intent
    if any(k in msg for k in ['crop', 'grow', 'soil', 'recommend', 'suitable', 'alluvial', 'black soil', 'clay', 'sandy']):
        if 'black' in msg or 'cotton' in msg:
            reply = "For Black Cotton soil in Kharif season, **Bt-Cotton** (12-15 Quintals/Acre) or **Yellow Soybean** is highly recommended due to high moisture retention."
        elif 'rabi' in msg or 'winter' in msg or 'wheat' in msg:
            reply = "For Rabi season (Winter), **Wheat (HD 2967 / PBW 725)** is the top choice for Alluvial/Loam soils (Est. Yield: 22-25 Quintals/Acre). Alternative options: Mustard or Barley."
        else:
            reply = "Based on general soil NPK and climate telemetry, **Wheat** (Rabi) and **Paddy Basmati 1121** (Kharif) are ideal for high yields. You can run our AI Crop Selector tool for a precise 98% match!"
        intent = 'crop_recommendation'

    # 2. Fertilizer Suggestion Intent
    elif any(k in msg for k in ['fertilizer', 'urea', 'dap', 'mop', 'dosage', 'dose', 'npk', 'nitrogen', 'phosphorus', 'potash']):
        if 'wheat' in msg:
            reply = "For 1 acre of Wheat: Apply **55 Kg DAP + 20 Kg MOP** as basal dose at sowing. Top-dress **45 Kg Urea** in 2 split doses: 50% at 1st irrigation (21 days) and 50% at jointing stage."
        elif 'paddy' in msg or 'rice' in msg:
            reply = "For 1 acre of Paddy: Apply **150 Kg SSP + 25 Kg MOP + 10 Kg Zinc Sulphate** basal. Top-dress **50 Kg Urea** at active tillering (21 days) to prevent Khaira disease."
        else:
            reply = "General NPK Balancing: Use **DAP (18-46-0)** basal for root growth, **MOP (60% K2O)** for grain shine, and **Neem-Coated Urea** top-dressing during vegetative stages. Run our Fertilizer Calculator for exact acre doses!"
        intent = 'fertilizer_suggestion'

    # 3. Disease Diagnosis & Explanation Intent
    elif any(k in msg for k in ['disease', 'blight', 'rust', 'spot', 'fungus', 'leaf', 'yellow', 'symptom', 'treatment', 'cure', 'spray']):
        if 'tomato' in msg or 'blight' in msg:
            reply = "### Tomato Early Blight (*Alternaria solani*)\n- **Symptoms**: Concentric dark brown 'target spot' rings with yellow halos.\n- **Treatment**: Spray Mancozeb 75% WP @ 2g/L water or Copper Oxychloride 50% WP @ 3g/L.\n- **Prevention**: Rotate crops for 2-3 years and use drip irrigation to keep foliage dry."
        elif 'rust' in msg or 'wheat' in msg:
            reply = "### Wheat Brown Rust (*Puccinia triticina*)\n- **Symptoms**: Small oval orange-brown pustules on leaf surfaces.\n- **Treatment**: Spray Propiconazole 25% EC @ 1ml/L water at initial onset.\n- **Prevention**: Plant rust-resistant varieties like HD 2967 or PBW 725."
        else:
            reply = "For crop leaf fungal infections: Spray **Mancozeb 75% WP @ 2g/L** or **Neem Oil (5ml/L)** as organic control. You can upload a leaf photo to our AI Leaf Scanner for instant diagnosis!"
        intent = 'disease_explanation'

    # 4. Mandi Rates / Schemes / General Farming Intent
    elif any(k in msg for k in ['mandi', 'price', 'rate', 'scheme', 'pm-kisan', 'weather', 'rain', 'helpline', 'contact']):
        if 'price' in msg or 'mandi' in msg:
            reply = "Today's APMC Mandi Rates: **Wheat Sharbati** is trading at **₹2,275/qtl** (Ludhiana), **Basmati 1121** at **₹4,120/qtl** (Khanna), and **Cotton** at **₹7,120/qtl** (Rajkot)."
        elif 'scheme' in msg or 'kisan' in msg:
            reply = "Government Welfare Schemes: **PM-KISAN** offers ₹6,000/year in 3 installments of ₹2,000 directly to farmer bank accounts. **PM-KUSUM** provides up to 60% solar pump subsidies."
        else:
            reply = "Weather & Support: 24/7 Kisan Emergency Helpline is **1800-180-1551** (Toll Free). Local agronomists are available daily from 6:00 AM to 10:00 PM."
        intent = 'general_advisory'

    else:
        reply = "Hello! I am **AgriBot**, your AI Smart Farming Assistant. I can help you with:\n1. 🌾 Crop Selection & Suitability\n2. 🧪 Fertilizer Doses (Urea, DAP, MOP per acre)\n3. 🐛 Leaf Disease Diagnosis & Fungicides\n4. 📈 Mandi Commodity Prices & Weather Advisories\n\nHow may I assist your farm today?"
        intent = 'greeting'

    return {
        'reply': reply,
        'intent': intent,
        'suggested_actions': [
            'Best crop for Alluvial soil?',
            'Urea dose for 1 acre wheat',
            'Tomato Early Blight cure',
            'Live Mandi wheat price'
        ]
    }

@chat_bp.route('', methods=['POST'])
@chat_bp.route('/', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get('message', '').strip()

    if not message:
        return jsonify({'status': 'error', 'message': 'Message parameter is required.'}), 400

    response_payload = generate_agribot_response(message)
    return jsonify({'status': 'success', 'chat_response': response_payload}), 200
