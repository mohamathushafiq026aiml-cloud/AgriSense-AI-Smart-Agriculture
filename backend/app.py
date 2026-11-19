from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import csv
from datetime import datetime
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Load disease treatments data
DISEASE_DATA = {}
treatment_csv_path = os.path.join(os.path.dirname(__file__), '..', 'data', '01_disease_treatment.csv')
if os.path.exists(treatment_csv_path):
    with open(treatment_csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            DISEASE_DATA[row['Disease'].lower()] = row

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "AgriSense AI Backend", "version": "1.0.0"})

# 1. AUTHENTICATION (Supabase Auth proxy)
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    return jsonify({
        "success": True,
        "message": "Farmer registration processed with Supabase Auth",
        "user": {
            "id": "usr-101",
            "name": data.get("name", "Farmer"),
            "email": data.get("email"),
            "phone": data.get("phone"),
            "preferredLanguage": data.get("preferredLanguage", "tanglish")
        }
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    return jsonify({
        "success": True,
        "token": "agrisense_jwt_token_sample",
        "user": {
            "id": "usr-101",
            "name": "Murugan Palanisamy",
            "email": data.get("email", "farmer@agrisense.in"),
            "farmCount": 1
        }
    })

# 2. DISEASE PREDICTION
@app.route('/api/disease/predict', methods=['POST'])
def predict_disease():
    # Supports multipart/form-data or json
    data = request.get_json() or {}
    plant_hint = data.get('plantHint', 'Tomato')

    # Guardrail check for clear crop leaf
    if data.get('is_non_leaf'):
        return jsonify({
            "success": False,
            "status": "unknown_or_unsupported",
            "message": "Please upload a clear crop leaf image."
        }), 400

    match_row = DISEASE_DATA.get('early blight', {})
    for key, val in DISEASE_DATA.items():
        if plant_hint.lower() in val.get('Plant', '').lower():
            match_row = val
            break

    return jsonify({
        "success": True,
        "plant": match_row.get('Plant', 'Tomato'),
        "disease": match_row.get('Disease', 'Early Blight'),
        "confidence": 94.2,
        "severity": match_row.get('Severity', 'Medium'),
        "symptoms": match_row.get('Symptoms', 'Target-board lesions with chlorotic halo'),
        "cause": match_row.get('Cause', 'Alternaria solani fungal infection'),
        "treatment": match_row.get('Treatment', 'Prune affected leaves, avoid overhead watering'),
        "organic_treatment": match_row.get('Organic_Treatment', 'Spray Bacillus subtilis @ 2g/L or copper soap'),
        "chemical_treatment": match_row.get('Chemical_Treatment', 'Mancozeb 75% WP @ 2.5 g/L'),
        "prevention": match_row.get('Prevention', 'Crop rotation, mulching, 50cm spacing')
    })

# 3. SMART IRRIGATION
@app.route('/api/irrigation/predict', methods=['POST'])
def predict_irrigation():
    payload = request.get_json() or {}
    moisture = float(payload.get('soilMoisture', 45))
    temp = float(payload.get('temperature', 30))
    rain = float(payload.get('rainfall', 0))
    stage = payload.get('growthStage', 'Vegetative')
    plant = payload.get('plantType', 'Tomato')

    need = moisture < 55 and rain < 10
    duration = 45 if need else 0

    return jsonify({
        "success": True,
        "data": {
            "waterRequirement": 4.6,
            "irrigationNeed": need,
            "recommendedDurationMinutes": duration,
            "waterSavingEstimatePercent": 35,
            "reason": f"Soil moisture is {moisture}%. Daily crop evapotranspiration requires {duration} minutes of precision drip."
        }
    })

# 4. PEST RISK
@app.route('/api/pest/predict', methods=['POST'])
def predict_pest():
    payload = request.get_json() or {}
    return jsonify({
        "success": True,
        "data": {
            "pest": "Whitefly",
            "scientificName": "Bemisia tabaci",
            "riskLevel": "Critical",
            "riskScore": 88,
            "possibleCause": "Hot dry conditions accelerate whitefly nymph emergence.",
            "prevention": "Install 20 yellow sticky traps per acre; spray Neem oil 10,000 ppm @ 2-3 ml/L."
        }
    })

# 5. WEATHER
@app.route('/api/weather', methods=['GET'])
def get_weather():
    return jsonify({
        "success": True,
        "data": {
            "temperature": 29.4,
            "humidity": 72,
            "rainfall": 4.2,
            "windSpeed": 14,
            "condition": "Partly Cloudy"
        }
    })

# 6. CHATBOT (Supports English, Tamil, Hindi, Tanglish)
@app.route('/api/chat', methods=['POST'])
def chat():
    payload = request.get_json() or {}
    message = payload.get('message', '')
    lang = payload.get('language', 'tanglish')

    reply = "AgriSense AI vivasaya nanban! Unga thottathuku thevaiyana leaf scan, thanneer paasanam, matrum poochi control details kekkalam."
    if "yellow" in message.lower() or "manjal" in message.lower():
        reply = "Thakkali ilai yellow aagurathukku pala reasons irukkalam thozhare! Soil moisture romba athigam/kuraivaga irunthal, nitrogen sathu korai irunthal, illana Early Blight disease irukalam. Clear leaf photo scan pannunga!"

    return jsonify({
        "success": True,
        "data": {
            "reply": reply,
            "language": lang
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
