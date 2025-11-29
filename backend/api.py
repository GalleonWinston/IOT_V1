from config import app, db
from flask import request, jsonify
from models import User


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt

JWT_BLOCKLIST = set()

@app.route('/api/auth/register', methods=['POST'])
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

        # create access token to authenticate users and return JWT
        access_token = create_access_token(identity=str(new_user.id))

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email,
                "created_at": new_user.created_at.isoformat(),
                
            },
            "access_token": access_token
        }), 201

    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Registration error: {str(e)}")
        return jsonify({"error": "Registration failed"}), 500 
    

@app.route('/api/auth/login', methods=['POST'])
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

            # create access token to authenticate users and return JWT
            access_token = create_access_token(identity=str(user.id))

            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "created_at": user.created_at.isoformat()
                },
                "access_token": access_token
            }), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        app.logger.error(f"Login error: {str(e)}")
        return jsonify({"error": "Login failed"}), 500  
    
@app.route('/api/auth/logout', methods=['POST'])
@jwt_required()
def logout_user():
    global JWT_BLOCKLIST
    # Retrieve the unique identifier of the token
    jti = get_jwt()["jti"]
    
    # 1. Add the token's JTI to the blocklist/revocation list
    # The blocklist is checked before every @jwt_required() request.
    JWT_BLOCKLIST.add(jti) 
    
    # 2. Clear JWT cookies if you are storing the tokens in cookies (optional)
    # response = jsonify({"message": "Successfully logged out (token revoked)"})
    # unset_jwt_cookies(response) 
    
    # Returning a simple message for client-side cleanup
    return jsonify({"message": "Logout successful"}), 200

@app.route('/api/auth/check', methods=['GET'])
@jwt_required() # <--- Ensures a valid token is present
def get_user_profile():
    # 1. Get the user ID from the JWT payload
    user_id = get_jwt_identity()

    # 2. Fetch the full User object from the database
    # Assuming 'User' model and 'db' are available
    user = User.query.get(int(user_id))

    if user:
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "message": "Profile fetched successfully"
        }), 200
    else:
        # Should not happen if database is consistent
        return jsonify({"error": "User not found"}), 404 