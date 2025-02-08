from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing (CORS)

count = 0

@app.route('/')
def home():
    return jsonify({"message": "Flask server IS CONNECTED"})

if __name__ == '__main__':
    count = 20
    app.run(debug=True)
