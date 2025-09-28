from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai
import base64
import io
import json
import datetime
import sqlite3
import os
from werkzeug.utils import secure_filename
from PIL import Image
import hashlib
import re

# ================================
# CONFIGURATION SECTION
# ================================

# **IMPORTANT: REPLACE WITH YOUR ACTUAL GEMINI API KEY**
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY = "AIzaSyAMOHTSgmPSuRfcDmoce4a8NxiXREJLfOU "# Replace this with your actual API key

# Flask app configuration
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Enable CORS for all domains (adjust for production)
CORS(app)

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Configure Gemini AI
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# ================================
# DATABASE SETUP
# ================================

def init_database():
    """Initialize SQLite database with required tables"""
    conn = sqlite3.connect('agrihealth.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            name TEXT,
            location TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Crop diagnoses table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS crop_diagnoses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT,
            image_path TEXT,
            diagnosis TEXT,
            confidence REAL,
            severity TEXT,
            treatment TEXT,
            prevention TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Soil analyses table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS soil_analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT,
            ph_level REAL,
            moisture_level INTEGER,
            fertility_level TEXT,
            location TEXT,
            recommendations TEXT,
            suitable_crops TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Community questions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            category TEXT,
            author_name TEXT,
            author_email TEXT,
            location TEXT,
            upvotes INTEGER DEFAULT 0,
            replies INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Alerts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            title TEXT,
            message TEXT,
            priority TEXT,
            location TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# ================================
# UTILITY FUNCTIONS
# ================================

def allowed_file(filename):
    """Check if uploaded file is allowed"""
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'heic'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def prepare_image_for_ai(image_path):
    """Prepare image for Gemini AI analysis"""
    try:
        with Image.open(image_path) as img:
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize if too large (Gemini has size limits)
            max_size = (1024, 1024)
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Save to bytes
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='JPEG')
            img_byte_arr.seek(0)
            
            return img_byte_arr.getvalue()
    except Exception as e:
        print(f"Error preparing image: {e}")
        return None

def generate_crop_diagnosis_prompt(additional_info=""):
    """Generate detailed prompt for crop disease diagnosis"""
    return f"""
    You are an expert agricultural pathologist. Analyze this crop image and provide a comprehensive diagnosis.

    Please provide your analysis in the following JSON format:
    {{
        "disease_name": "Name of the disease or condition",
        "confidence": "Confidence percentage (e.g., 85%)",
        "severity": "Mild/Moderate/High",
        "description": "Detailed description of what you observe",
        "treatment": "Specific treatment recommendations with chemical names and application rates",
        "prevention": "Prevention strategies for future occurrences",
        "organic_treatment": "Organic/natural treatment alternatives",
        "expected_recovery": "Expected recovery timeframe",
        "additional_notes": "Any other important observations",
        "follow_up_actions": [
            {{"action": "Re-examine crop", "timeframe": "in 3-5 days", "priority": "High"}},
            {{"action": "Monitor treatment effectiveness", "timeframe": "weekly for 1 month", "priority": "Medium"}}
        ]
    }}

    Additional context: {additional_info}
    
    Be specific, accurate, and provide actionable advice. If you cannot identify a specific disease, provide general plant health assessment.
    """

def generate_soil_analysis_prompt(ph, moisture, fertility, location):
    """Generate prompt for soil analysis"""
    return f"""
    You are an expert soil scientist. Analyze these soil parameters and provide comprehensive recommendations.

    Soil Parameters:
    - pH Level: {ph}
    - Moisture Level: {moisture}%
    - Fertility Level: {fertility}
    - Location: {location}

    Please provide your analysis in the following JSON format:
    {{
        "soil_health_score": "Score out of 100",
        "ph_analysis": {{
            "status": "Optimal/Acidic/Alkaline",
            "recommendation": "Specific pH adjustment recommendations"
        }},
        "moisture_analysis": {{
            "status": "Optimal/Low/High/Excessive",
            "recommendation": "Irrigation and drainage recommendations"
        }},
        "fertility_analysis": {{
            "assessment": "Detailed fertility assessment",
            "recommendation": "Fertilization recommendations"
        }},
        "suitable_crops": ["List of recommended crops for these conditions"],
        "fertilizer_recommendations": [
            {{"name": "Fertilizer name", "application_rate": "Rate and timing", "purpose": "Why this fertilizer"}}
        ],
        "immediate_actions": ["List of actions to take within 1 week"],
        "seasonal_advice": "Season-specific recommendations",
        "long_term_strategy": "Long-term soil improvement plan",
        "warnings": ["Any critical issues to address immediately"]
    }}

    Provide specific, actionable advice based on the soil conditions and location.
    """

# ================================
# API ROUTES
# ================================

@app.route('/')
def index():
    """Serve the main application"""
    return render_template('index.html')

@app.route('/api/crop-diagnosis', methods=['POST'])
def crop_diagnosis():
    """Analyze crop image using Gemini AI"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '' or not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S_")
        filename = timestamp + filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Prepare image for AI analysis
        image_data = prepare_image_for_ai(filepath)
        if image_data is None:
            return jsonify({'error': 'Failed to process image'}), 500
        
        # Get additional info from request
        additional_info = request.form.get('additional_info', '')
        user_email = request.form.get('user_email', 'anonymous')
        
        # Create image part for Gemini
        image_part = {
            "mime_type": "image/jpeg",
            "data": image_data
        }
        
        # Generate diagnosis using Gemini AI
        prompt = generate_crop_diagnosis_prompt(additional_info)
        
        try:
            response = model.generate_content([prompt, image_part])
            
            # Extract JSON from response
            response_text = response.text
            
            # Try to extract JSON from the response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = response_text[json_start:json_end]
                diagnosis_data = json.loads(json_str)
            else:
                # Fallback if JSON extraction fails
                diagnosis_data = {
                    "disease_name": "Analysis completed",
                    "confidence": "85%",
                    "severity": "Moderate",
                    "description": response_text,
                    "treatment": "Please consult with a local agricultural expert",
                    "prevention": "Follow good agricultural practices",
                    "organic_treatment": "Use organic methods when possible",
                    "expected_recovery": "2-3 weeks with proper care"
                }
            
        except Exception as ai_error:
            print(f"AI Analysis Error: {ai_error}")
            # Provide fallback diagnosis
            diagnosis_data = {
                "disease_name": "Unable to analyze - Please consult expert",
                "confidence": "N/A",
                "severity": "Unknown",
                "description": "The image could not be analyzed automatically. Please consult with a local agricultural expert.",
                "treatment": "Consult local agricultural extension office",
                "prevention": "Follow integrated pest management practices",
                "organic_treatment": "Use organic farming methods",
                "expected_recovery": "Varies based on condition"
            }
        
        # Save diagnosis to database
        try:
            conn = sqlite3.connect('agrihealth.db')
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO crop_diagnoses 
                (user_email, image_path, diagnosis, confidence, severity, treatment, prevention)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                user_email, filepath, diagnosis_data.get('disease_name', ''),
                diagnosis_data.get('confidence', ''), diagnosis_data.get('severity', ''),
                diagnosis_data.get('treatment', ''), diagnosis_data.get('prevention', '')
            ))
            conn.commit()
            conn.close()
        except Exception as db_error:
            print(f"Database Error: {db_error}")
        
        return jsonify({
            'success': True,
            'diagnosis': diagnosis_data,
            'image_path': filename
        })
        
    except Exception as e:
        print(f"Error in crop diagnosis: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/soil-analysis', methods=['POST'])
def soil_analysis():
    """Analyze soil parameters using Gemini AI"""
    try:
        data = request.get_json()
        
        # Validate input data
        required_fields = ['ph', 'moisture', 'fertility']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        ph = float(data['ph'])
        moisture = int(data['moisture'])
        fertility = data['fertility']
        location = data.get('location', 'Unknown')
        user_email = data.get('user_email', 'anonymous')
        
        # Validate ranges
        if not (0 <= ph <= 14):
            return jsonify({'error': 'pH must be between 0 and 14'}), 400
        if not (0 <= moisture <= 100):
            return jsonify({'error': 'Moisture must be between 0 and 100%'}), 400
        if fertility not in ['low', 'medium', 'high']:
            return jsonify({'error': 'Fertility must be low, medium, or high'}), 400
        
        # Generate analysis using Gemini AI
        prompt = generate_soil_analysis_prompt(ph, moisture, fertility, location)
        
        try:
            response = model.generate_content(prompt)
            response_text = response.text
            
            # Extract JSON from response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = response_text[json_start:json_end]
                analysis_data = json.loads(json_str)
            else:
                # Fallback analysis
                analysis_data = {
                    "soil_health_score": 75,
                    "ph_analysis": {
                        "status": "Needs attention",
                        "recommendation": "Monitor pH levels regularly"
                    },
                    "moisture_analysis": {
                        "status": "Adequate",
                        "recommendation": "Maintain current irrigation schedule"
                    },
                    "suitable_crops": ["Rice", "Wheat", "Corn"],
                    "fertilizer_recommendations": [
                        {"name": "NPK 10:10:10", "application_rate": "200 kg/acre", "purpose": "Balanced nutrition"}
                    ]
                }
                
        except Exception as ai_error:
            print(f"AI Analysis Error: {ai_error}")
            # Provide basic analysis based on parameters
            analysis_data = generate_basic_soil_analysis(ph, moisture, fertility)
        
        # Save analysis to database
        try:
            conn = sqlite3.connect('agrihealth.db')
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO soil_analyses 
                (user_email, ph_level, moisture_level, fertility_level, location, recommendations, suitable_crops)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                user_email, ph, moisture, fertility, location,
                json.dumps(analysis_data.get('recommendations', [])),
                json.dumps(analysis_data.get('suitable_crops', []))
            ))
            conn.commit()
            conn.close()
        except Exception as db_error:
            print(f"Database Error: {db_error}")
        
        return jsonify({
            'success': True,
            'analysis': analysis_data
        })
        
    except Exception as e:
        print(f"Error in soil analysis: {e}")
        return jsonify({'error': 'Internal server error'}), 500

def generate_basic_soil_analysis(ph, moisture, fertility):
    """Generate basic soil analysis without AI as fallback"""
    score = 100
    suitable_crops = []
    recommendations = []
    
    # pH analysis
    if ph < 6.0:
        recommendations.append("Soil is acidic. Add lime to increase pH.")
        suitable_crops.extend(["Blueberries", "Potatoes", "Sweet Potatoes"])
        score -= 15
    elif ph > 8.0:
        recommendations.append("Soil is alkaline. Add sulfur or organic matter to decrease pH.")
        suitable_crops.extend(["Cabbage", "Spinach", "Lettuce"])
        score -= 10
    else:
        recommendations.append("pH level is optimal for most crops.")
        suitable_crops.extend(["Tomatoes", "Corn", "Beans", "Carrots"])
    
    # Moisture analysis
    if moisture < 30:
        recommendations.append("Soil moisture is low. Increase irrigation frequency.")
        score -= 20
    elif moisture > 70:
        recommendations.append("Soil moisture is high. Improve drainage to prevent root rot.")
        score -= 15
    else:
        recommendations.append("Soil moisture level is good.")
    
    # Fertility analysis
    fertilizer_recs = []
    if fertility == 'low':
        recommendations.append("Add compost or balanced fertilizer to improve soil fertility.")
        fertilizer_recs.append({"name": "NPK 10:10:10", "application_rate": "300 kg/acre", "purpose": "Boost overall fertility"})
        score -= 25
    elif fertility == 'high':
        recommendations.append("Soil fertility is excellent. Maintain with regular organic matter.")
        fertilizer_recs.append({"name": "Compost", "application_rate": "2 tons/acre", "purpose": "Maintain fertility"})
    else:
        recommendations.append("Moderate fertility. Regular fertilization recommended.")
        fertilizer_recs.append({"name": "NPK 20:20:20", "application_rate": "200 kg/acre", "purpose": "Maintain nutrition"})
        score -= 5
    
    return {
        "soil_health_score": max(score, 0),
        "ph_analysis": {
            "status": "Acidic" if ph < 6.0 else "Alkaline" if ph > 8.0 else "Optimal",
            "recommendation": recommendations[0] if recommendations else "Monitor regularly"
        },
        "moisture_analysis": {
            "status": "Low" if moisture < 30 else "High" if moisture > 70 else "Optimal",
            "recommendation": "Adjust irrigation as needed"
        },
        "suitable_crops": suitable_crops[:6],  # Limit to 6 crops
        "fertilizer_recommendations": fertilizer_recs,
        "immediate_actions": recommendations[:3],
        "seasonal_advice": "Follow seasonal planting guidelines for your region"
    }

@app.route('/api/questions', methods=['GET', 'POST'])
def handle_questions():
    """Handle community questions"""
    if request.method == 'POST':
        try:
            data = request.get_json()
            
            # Validate required fields
            required_fields = ['title', 'description', 'category']
            for field in required_fields:
                if field not in data or not data[field].strip():
                    return jsonify({'error': f'Missing required field: {field}'}), 400
            
            # Save question to database
            conn = sqlite3.connect('agrihealth.db')
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO questions (title, description, category, author_name, author_email, location)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                data['title'], data['description'], data['category'],
                data.get('author_name', 'Anonymous'),
                data.get('author_email', 'anonymous'),
                data.get('location', 'Unknown')
            ))
            
            question_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            return jsonify({
                'success': True,
                'message': 'Question posted successfully',
                'question_id': question_id
            })
            
        except Exception as e:
            print(f"Error posting question: {e}")
            return jsonify({'error': 'Failed to post question'}), 500
    
    else:  # GET request
        try:
            category = request.args.get('category', 'all')
            limit = int(request.args.get('limit', 20))
            
            conn = sqlite3.connect('agrihealth.db')
            cursor = conn.cursor()
            
            if category == 'all':
                cursor.execute('''
                    SELECT id, title, description, category, author_name, location, 
                           upvotes, replies, created_at
                    FROM questions 
                    ORDER BY created_at DESC 
                    LIMIT ?
                ''', (limit,))
            else:
                cursor.execute('''
                    SELECT id, title, description, category, author_name, location, 
                           upvotes, replies, created_at
                    FROM questions 
                    WHERE category = ? 
                    ORDER BY created_at DESC 
                    LIMIT ?
                ''', (category, limit))
            
            questions = []
            for row in cursor.fetchall():
                questions.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'category': row[3],
                    'author': row[4],
                    'location': row[5],
                    'upvotes': row[6],
                    'replies': row[7],
                    'timestamp': row[8]
                })
            
            conn.close()
            return jsonify({'questions': questions})
            
        except Exception as e:
            print(f"Error fetching questions: {e}")
            return jsonify({'error': 'Failed to fetch questions'}), 500

@app.route('/api/questions/<int:question_id>/upvote', methods=['POST'])
def upvote_question(question_id):
    """Upvote a question"""
    try:
        conn = sqlite3.connect('agrihealth.db')
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE questions 
            SET upvotes = upvotes + 1 
            WHERE id = ?
        ''', (question_id,))
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Question upvoted'})
        
    except Exception as e:
        print(f"Error upvoting question: {e}")
        return jsonify({'error': 'Failed to upvote question'}), 500

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """Get active alerts"""
    try:
        location = request.args.get('location', '')
        
        conn = sqlite3.connect('agrihealth.db')
        cursor = conn.cursor()
        
        # Get active alerts (not expired)
        cursor.execute('''
            SELECT id, type, title, message, priority, location, created_at
            FROM alerts 
            WHERE expires_at > datetime('now') OR expires_at IS NULL
            ORDER BY 
                CASE priority 
                    WHEN 'high' THEN 3 
                    WHEN 'medium' THEN 2 
                    ELSE 1 
                END DESC,
                created_at DESC
            LIMIT 10
        ''')
        
        alerts = []
        for row in cursor.fetchall():
            alerts.append({
                'id': row[0],
                'type': row[1],
                'title': row[2],
                'message': row[3],
                'priority': row[4],
                'location': row[5],
                'timestamp': row[6]
            })
        
        conn.close()
        return jsonify({'alerts': alerts})
        
    except Exception as e:
        print(f"Error fetching alerts: {e}")
        return jsonify({'error': 'Failed to fetch alerts'}), 500

@app.route('/api/weather', methods=['GET'])
def get_weather():
    """Get weather information (placeholder - integrate with weather API)"""
    try:
        location = request.args.get('location', 'India')
        
        # Placeholder weather data - integrate with actual weather API
        weather_data = {
            'location': location,
            'temperature': 28,
            'humidity': 65,
            'conditions': 'Partly Cloudy',
            'forecast': [
                {'day': 'Today', 'high': 32, 'low': 24, 'conditions': 'Sunny'},
                {'day': 'Tomorrow', 'high': 30, 'low': 23, 'conditions': 'Cloudy'},
                {'day': 'Day 3', 'high': 28, 'low': 22, 'conditions': 'Rain'}
            ],
            'farming_advice': 'Good conditions for irrigation. Avoid spraying pesticides due to expected rain.'
        }
        
        return jsonify(weather_data)
        
    except Exception as e:
        print(f"Error fetching weather: {e}")
        return jsonify({'error': 'Failed to fetch weather data'}), 500

@app.route('/api/user-history/<email>', methods=['GET'])
def get_user_history(email):
    """Get user's diagnosis and analysis history"""
    try:
        conn = sqlite3.connect('agrihealth.db')
        cursor = conn.cursor()
        
        # Get crop diagnoses
        cursor.execute('''
            SELECT diagnosis, confidence, severity, created_at
            FROM crop_diagnoses 
            WHERE user_email = ? 
            ORDER BY created_at DESC 
            LIMIT 10
        ''', (email,))
        
        crop_history = []
        for row in cursor.fetchall():
            crop_history.append({
                'diagnosis': row[0],
                'confidence': row[1],
                'severity': row[2],
                'date': row[3]
            })
        
        # Get soil analyses
        cursor.execute('''
            SELECT ph_level, moisture_level, fertility_level, created_at
            FROM soil_analyses 
            WHERE user_email = ? 
            ORDER BY created_at DESC 
            LIMIT 10
        ''', (email,))
        
        soil_history = []
        for row in cursor.fetchall():
            soil_history.append({
                'ph': row[0],
                'moisture': row[1],
                'fertility': row[2],
                'date': row[3]
            })
        
        conn.close()
        
        return jsonify({
            'crop_diagnoses': crop_history,
            'soil_analyses': soil_history
        })
        
    except Exception as e:
        print(f"Error fetching user history: {e}")
        return jsonify({'error': 'Failed to fetch user history'}), 500

# ================================
# INITIALIZATION AND STARTUP
# ================================

def create_sample_data():
    """Create sample alerts for demonstration"""
    try:
        conn = sqlite3.connect('agrihealth.db')
        cursor = conn.cursor()
        
        # Check if alerts already exist
        cursor.execute('SELECT COUNT(*) FROM alerts')
        count = cursor.fetchone()[0]
        
        if count == 0:
            sample_alerts = [
                ('weather', 'Heavy Rain Alert', 'Heavy rainfall expected in next 48 hours. Protect crops from waterlogging.', 'high', 'General', datetime.datetime.now() + datetime.timedelta(days=2)),
                ('scheme', 'PM-KISAN Update', 'New installment will be credited soon. Check your account.', 'medium', 'General', datetime.datetime.now() + datetime.timedelta(days=7)),
                ('reminder', 'Pesticide Application', 'Time for scheduled pesticide application on cotton crop.', 'high', 'General', datetime.datetime.now() + datetime.timedelta(days=1)),
                ('weather', 'Temperature Drop', 'Significant temperature drop expected. Protect sensitive crops.', 'medium', 'General', datetime.datetime.now() + datetime.timedelta(days=5))
            ]
            
            cursor.executemany('''
                INSERT INTO alerts (type, title, message, priority, location, expires_at)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', sample_alerts)
            
            conn.commit()
        
        conn.close()
    except Exception as e:
        print(f"Error creating sample data: {e}")

if __name__ == '__main__':
    # Initialize database
    init_database()
    create_sample_data()
    
    # Print setup instructions
    print("\n" + "="*60)
    print("🌱 AGRIHEALTH CONNECT - FLASK BACKEND")
    print("="*60)
    print("\n📋 SETUP INSTRUCTIONS:")
    print("\n1. GEMINI AI API KEY SETUP:")
    print("   • Go to: https://makersuite.google.com/app/apikey")
    print("   • Sign in with your Google account")
    print("   • Click 'Create API Key'")
    print("   • Copy the API key")
    print(f"   • Replace 'YOUR_GEMINI_API_KEY_HERE' in line 19 with your actual API key")
    print("\n2. INSTALL REQUIRED PACKAGES:")
    print("   pip install flask flask-cors google-generativeai pillow")
    print("\n3. FOLDER STRUCTURE:")
    print("   Create a 'templates' folder and put your index.html inside it")
    print("   Or update the frontend to make API calls to http://localhost:5000")
    print("\n4. API ENDPOINTS:")
    print("   • POST /api/crop-diagnosis - Upload image for crop analysis")
    print("   • POST /api/soil-analysis - Analyze soil parameters")
    print("   • GET/POST /api/questions - Community questions")
    print("   • GET /api/alerts - Get active alerts")
    print("   • GET /api/weather - Weather information")
    print("   • GET /api/user-history/<email> - User history")
    print("\n5. IMPORTANT NOTES:")
    if GEMINI_API_KEY == "YOUR_GEMINI_API_KEY_HERE":
        print("   ⚠️  WARNING: Please set your actual Gemini API key!")
        print("   ⚠️  The app will not work without a valid API key!")
    else:
        print("   ✅ Gemini API key is configured")
    print("   • Free Gemini API has rate limits")
    print("   • Upgrade to paid plan for production use")
    print("   • Database file 'agrihealth.db' will be created automatically")
    print("\n🚀 Starting Flask server on http://localhost:5000")
    print("="*60)
    
    # Check if API key is set
    if GEMINI_API_KEY == "YOUR_GEMINI_API_KEY_HERE":
        print("\n❌ ERROR: Please set your Gemini API key before running the server!")
        print("Edit line 19 in this file and replace 'YOUR_GEMINI_API_KEY_HERE' with your actual API key.")
        exit(1)
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)