from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_cors import CORS

from flask_jwt_extended import JWTManager

import os

load_dotenv()

app = Flask(__name__)
CORS(
    app, 
    supports_credentials=True,  # 🎯 MUST be True
    origins=["http://localhost:5173", "http://127.0.0.1:5173"], # 🎯 MUST list all frontend URLs
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"] # Must include OPTIONS
)


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')


db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
