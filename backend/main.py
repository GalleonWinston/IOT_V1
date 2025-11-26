from flask import jsonify
from config import app, db

from api import *



@app.route('/')
def hello_world():
    return jsonify({ "message" : "hello_world"})

@app.route('/favicon.ico')
def favicon():
    return '', 204  # No Content status


if __name__ == "__main__":
    app.run(debug=True)
