import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename

disease_bp = Blueprint('disease', __name__, url_prefix='/api/disease')

# TensorFlow Placeholder Model Predictor
def tensorflow_placeholder_predict(filename_or_sample: str):
    """
    Simulates TensorFlow CNN model inference (MobileNetV2 / ResNet50 backbone).
    Extracts leaf feature maps and predicts disease class with confidence score.
    """
    key = str(filename_or_sample).lower()

    if 'wheat' in key or 'rust' in key:
        return {
            'disease_name': 'Wheat - Brown Rust (Puccinia triticina)',
            'confidence': '94.2%',
            'symptoms': 'Small oval orange-brown pustules scattered randomly across the upper leaf surface, causing foliage desiccation.',
            'causes': 'Fungal pathogen Puccinia triticina spread by windborne urediniospores in high humidity (75-90%) and mild temperature (15-25°C).',
            'treatment': 'Spray Propiconazole 25% EC @ 1 ml/L water or Tebuconazole 250 EC @ 1.5 ml/L at first appearance of symptoms.',
            'prevention': 'Plant rust-resistant varieties (HD 2967, PBW 725), maintain proper nitrogen balance, and destroy volunteer wheat weeds.'
        }
    elif 'paddy' in key or 'rice' in key or 'blast' in key:
        return {
            'disease_name': 'Paddy - Rice Blast (Magnaporthe oryzae)',
            'confidence': '95.8%',
            'symptoms': 'Spindle-shaped lesions with brown borders and grey centers on leaves, neck rot, and empty grain panicles.',
            'causes': 'Ascomycete fungus Magnaporthe oryzae favored by high relative humidity (>90%), dew, and heavy nitrogen application.',
            'treatment': 'Spray Tricyclazole 75% WP @ 0.6 g/L water or Isoprothiolane 40% EC @ 1.5 ml/L during early booting stage.',
            'prevention': 'Avoid excessive nitrogen fertilization, maintain proper water depth in puddles, and treat seeds with Pseudomonas fluorescens.'
        }
    else:
        # Default: Tomato Early Blight
        return {
            'disease_name': 'Tomato - Early Blight (Alternaria solani)',
            'confidence': '97.6%',
            'symptoms': 'Concentric dark brown spot rings ("target spots") on lower leaves, yellow halo surrounding lesions, premature leaf fall.',
            'causes': 'Fungal pathogen Alternaria solani surviving in crop residue under warm temperatures (24-29°C) and frequent leaf wetness.',
            'treatment': 'Apply Mancozeb 75% WP @ 2 g/L water or Copper Oxychloride 50% WP @ 3 g/L water every 7-10 days.',
            'prevention': 'Rotate crops with non-solanaceous plants for 2-3 years, utilize drip irrigation to keep foliage dry, and prune bottom leaves.'
        }

@disease_bp.route('/detect', methods=['POST'])
def detect_disease():
    sample_type = request.form.get('sample_type', '')
    
    filename_to_process = sample_type
    
    # Handle image file upload if provided
    if 'file' in request.files:
        file = request.files['file']
        if file and file.filename:
            filename = secure_filename(file.filename)
            filename_to_process = filename
            upload_dir = current_app.config.get('UPLOAD_FOLDER', 'uploads')
            os.makedirs(upload_dir, exist_ok=True)
            file.save(os.path.join(upload_dir, filename))

    # Execute TensorFlow Placeholder Model Predictor
    diagnosis_output = tensorflow_placeholder_predict(filename_to_process)

    return jsonify({
        'status': 'success',
        'model_engine': 'TensorFlow CNN Crop-Net v2.4 (Placeholder)',
        'diagnosis': diagnosis_output
    }), 200
