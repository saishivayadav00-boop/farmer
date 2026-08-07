from flask import Blueprint, request, jsonify

weather_bp = Blueprint('weather', __name__, url_prefix='/api/weather')

@weather_bp.route('', methods=['GET'])
@weather_bp.route('/', methods=['GET'])
def get_weather():
    location = request.args.get('location', 'Ludhiana, Punjab').strip()
    
    # Custom response tailored for the requested location
    location_lower = location.lower()
    
    if 'maharashtra' in location_lower or 'nashik' in location_lower or 'mumbai' in location_lower or 'pune' in location_lower:
        temp = 29.0
        condition = "Humid & Overcast"
        humidity = 76
        wind_speed = 18
        rain_prob = 45
        sunrise = "06:05 AM"
        sunset = "07:02 PM"
        advisory = "High humidity detected. Spray preventive bio-fungicide for grapes & sugarcane crops."
    elif 'gujarat' in location_lower or 'rajkot' in location_lower or 'ahmedabad' in location_lower:
        temp = 34.0
        condition = "Hot & Clear Sky"
        humidity = 52
        wind_speed = 12
        rain_prob = 5
        sunrise = "06:12 AM"
        sunset = "07:18 PM"
        advisory = "High temperatures expected. Ensure adequate evening irrigation for Bt-Cotton fields."
    else:
        temp = 31.0
        condition = "Partly Cloudy & Warm"
        humidity = 68
        wind_speed = 16
        rain_prob = 10
        sunrise = "05:42 AM"
        sunset = "07:15 PM"
        advisory = "Moderate rainfall expected on Saturday (65%-80% probability). Postpone pesticide & herbicide spraying on Friday evening."

    forecast_7day = [
        {"day": "Today", "date": "7 Aug", "temp_high": 32, "temp_low": 24, "condition": "Partly Cloudy", "rain_prob": rain_prob, "icon_type": "sun_cloud"},
        {"day": "Tomorrow", "date": "8 Aug", "temp_high": 29, "temp_low": 23, "condition": "Light Showers", "rain_prob": 65, "icon_type": "rain"},
        {"day": "Saturday", "date": "9 Aug", "temp_high": 28, "temp_low": 22, "condition": "Moderate Rain", "rain_prob": 80, "icon_type": "rain"},
        {"day": "Sunday", "date": "10 Aug", "temp_high": 30, "temp_low": 23, "condition": "Passing Clouds", "rain_prob": 25, "icon_type": "cloud"},
        {"day": "Monday", "date": "11 Aug", "temp_high": 32, "temp_low": 25, "condition": "Sunny & Clear", "rain_prob": 0, "icon_type": "sun"},
        {"day": "Tuesday", "date": "12 Aug", "temp_high": 33, "temp_low": 26, "condition": "Hot & Clear", "rain_prob": 5, "icon_type": "sun"},
        {"day": "Wednesday", "date": "13 Aug", "temp_high": 31, "temp_low": 24, "condition": "Mild Breeze", "rain_prob": 20, "icon_type": "sun_cloud"}
    ]

    return jsonify({
        'status': 'success',
        'weather': {
            'location': location,
            'temperature': temp,
            'feels_like': round(temp + 2.5, 1),
            'condition': condition,
            'humidity': humidity,
            'wind_speed': wind_speed,
            'wind_direction': 'SW',
            'rain_probability': rain_prob,
            'uv_index': 6,
            'pressure': 1012,
            'sunrise': sunrise,
            'sunset': sunset,
            'agricultural_advisory': advisory,
            'forecast_7day': forecast_7day
        }
    }), 200
