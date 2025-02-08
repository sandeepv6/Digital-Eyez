#Main Python Backend File
#JUST GARBAGE CODE FOR NOW
from flask import Flask, request, render_template
import os
from utils.ocr import extract_text
from utils.object_detection import detect_objects
from utils.tts import text_to_speech

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file"]
        if file:
            image_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(image_path)

            # Process Image
            text = extract_text(image_path)
            objects = detect_objects(image_path)

            # Convert text to speech
            text_to_speech(text)

            return render_template("index.html", text=text, objects=objects, image_path=image_path)

    return render_template("index.html", text=None, objects=None, image_path=None)

if __name__ == "__main__":
    app.run(debug=True)