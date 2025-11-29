# requirements
make sure you have node and python install in your system and mysql server



# Navigate to backend directory
cd backend

# set up your mysql server

# Set up virtual environment and install dependencies
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
export FLASK_APP=main.py  # Windows: set FLASK_APP=main.py

# Initialize database
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Start backend server
python3 main.py # windoes: python3 main.py


# Navigate to frontend directory
cd frontend
# install dependencies
npm install

# Start frontend server
npm run dev