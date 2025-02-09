import openai
import base64
import os

API_KEY = os.getenv("OPENAI_API_KEY")

# OpenAI client
client = openai.OpenAI(api_key=API_KEY)

# Convert image to Base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
    
# Call GPT with image and text
def call_gpt(image_path, prompt):
    image_base64 = encode_image(image_path)

    # Define messages correctly
    messages = [
        {"role": "user", "content": [
            {"type": "text", "text": prompt},
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_base64}"}}
        ]}
    ]

    # Make API call
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages,
        max_tokens=300,
        temperature=0.7
    )

    print(response.choices[0].message.content)
    return response.choices[0].message.content

def call_gpt_safety(image_path):
    image_base64 = encode_image(image_path)

    safety_prompt = """
    You are an AI vision assistant analyzing this image for potential hazards or warnings related to driving
    and road safety. Identify any stop signs, traffic lights, pedestrians, cyclists, approaching vehicles, or
    environmental risks that could indicate a need for caution. If a hazard or warning is present, describe it
    concisely. If no hazards or warnings are detected, return only the text: 'No Hazard'.
    """

    # Define messages correctly
    messages = [
        {"role": "user", "content": [
            {"type": "text", "text": safety_prompt},
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_base64}"}}
        ]}
    ]

    # Make API call
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages,
        max_tokens=300,
        temperature=0.7
    )

    print(response.choices[0].message.content)
    return response.choices[0].message.content
