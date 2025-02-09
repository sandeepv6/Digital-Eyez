import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image
from utils.gpt_api import call_gpt as user_prompt
from utils.gpt_api import call_gpt_safety as safety_prompt

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Flask backend connected!"})

@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        data = request.get_json()
        image_data = data.get("image")

        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        # Decode Base64 image
        image_data = image_data.split(",")[1]  # Remove Base64 header
        image_bytes = base64.b64decode(image_data)
        image = Image.open(BytesIO(image_bytes))

        # Perform image processing (Example: Save or analyze)
        image.save("received_image.jpg")  # Optional: Save image for debugging
        
        # After calling image.save("received_image.jpg")
        file_path = "received_image.jpg"

        # Check if the file exists
        if os.path.exists(file_path):
            response = query_llm("")
        else:
            print("Image file was not saved.")
        
        return jsonify({"AI_Response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/submit_prompt', methods=['POST'])
def process_prompt():
    data = request.get_json()
    prompt_text = data.get('prompt_text', '')
    response_message = f"Recieved: {prompt_text}"
    
    response = query_llm(response_message)
    
    print(response_message)

    return jsonify({"AI_Response": response})


def query_llm(queries):
    image_path = "received_image.jpg"
    if user_prompt == "":
       return safety_prompt(image_path)
    user_prompt_text = queries
    output = user_prompt(image_path, user_prompt_text)
    
    return output

if __name__ == '__main__':
    app.run(debug=True)
