from config import app, db
from flask import request, jsonify
from models import User

@app.route('/api/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        
        if not data or not isinstance(data, dict):
            return jsonify({"error": "No valid JSON data provided"}), 400
            
        # Extract and sanitize fields
        username = data.get('username', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '').strip()
        
        # Validate required fields
        if not username:
            return jsonify({"error": "Username is required"}), 400
        if not email:
            return jsonify({"error": "Email is required"}), 400
        if not password:
            return jsonify({"error": "Password is required"}), 400

        # Validate email format
        if '@' not in email or '.' not in email:
            return jsonify({"error": "Invalid email format"}), 400

        # Validate password strength
        if len(password) < 6:
            return jsonify({"error": "Password must be at least 6 characters"}), 400

        # Validate username format (alphanumeric + underscores)
        if not username.replace('_', '').isalnum():
            return jsonify({"error": "Username can only contain letters, numbers, and underscores"}), 400

        # Check for existing username (case-sensitive)
        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 409
            
        # Check for existing email (case-insensitive)
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 409

        # Create new user
        new_user = User(
            username=username,
            email=email
        )
        new_user.set_password(password)
        
        # Add to database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email,
                "created_at": new_user.created_at.isoformat()
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Registration error: {str(e)}")
        return jsonify({"error": "Registration failed"}), 500 
    

@app.route('/api/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        
        if not data or not isinstance(data, dict):
            return jsonify({"error": "No valid JSON data provided"}), 400
            
        # Validate required fields
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        if not password:
            return jsonify({"error": "Password is required"}), 400

        # Basic email validation
        if '@' not in email:
            return jsonify({"error": "Invalid email format"}), 400

        # Find user by email (case-insensitive search)
        user = User.query.filter_by(email=email.lower()).first()
        
        if user and user.check_password(password):
            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "created_at": user.created_at.isoformat()
                }
            }), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        app.logger.error(f"Login error: {str(e)}")
        return jsonify({"error": "Login failed"}), 500  
    


    