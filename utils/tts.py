from transformers import pipeline
import os

# Load Hugging Face TTS model
tts = pipeline("text-to-speech", model="facebook/mms-tts-eng")

def text_to_speech(text, output_file="output.wav"):
    speech = tts(text)
    with open(output_file, "wb") as f:
        f.write(speech["audio"])
    os.system(f"start {output_file}")  # Play audio
