from transformers import AutoProcessor, LlavaForConditionalGeneration
import torch
from PIL import Image



def load_llava_model():
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(device)
    
    # Load the model in half-precision with trust_remote_code enabled
    model = LlavaForConditionalGeneration.from_pretrained(
        "llava-hf/llava-1.5-7b-hf",
        torch_dtype=torch.float16,
        device_map="auto",
        trust_remote_code=True
    )
    processor = AutoProcessor.from_pretrained(
        "llava-hf/llava-1.5-7b-hf",
        trust_remote_code=True
    )
    return model, processor

def user_prompt(image, user_prompt_text, model, processor):
    conversation = [
        {
            "role": "user",
            "content": [
                {"type": "image"},
                {"type": "text", "text": user_prompt_text},
            ],
        },
    ]
    image = Image.open(image)  # Can change this to base64 if needed
    prompt = processor.apply_chat_template(conversation, add_generation_prompt=True)
    inputs = processor(images=image, text=prompt, padding=True, return_tensors="pt").to(model.device, torch.float16)
    generate_ids = model.generate(**inputs, max_new_tokens=500)
    output = processor.batch_decode(generate_ids, skip_special_tokens=True)
    print(output)
    return output

def safety_prompt(image, model, processor):
    safety_instructions = """
    You are an AI vision assistant analyzing this image for potential hazards or warnings related to driving
    and road safety. Identify any stop signs, traffic lights, pedestrians, cyclists, approaching vehicles, or
    environmental risks that could indicate a need for caution. If a hazard or warning is present, describe it
    concisely. If no hazards or warnings are detected, return only the text: 'No Hazard'.
    """
    conversation = [
        {
            "role": "user",
            "content": [
                {"type": "image"},
                {"type": "text", "text": safety_instructions},
            ],
        },
    ]
    image = Image.open(image)  # Can change this to base64 if needed
    prompt = processor.apply_chat_template(conversation, add_generation_prompt=True)
    inputs = processor(images=image, text=prompt, padding=True, return_tensors="pt").to(model.device, torch.float16)
    generate_ids = model.generate(**inputs, max_new_tokens=500)
    output = processor.batch_decode(generate_ids, skip_special_tokens=True)
    print(output)
    return output

model, processor = load_llava_model()
image_path = "2.jpg"
user_prompt_text = "Describe the picture"

user_prompt(image_path, user_prompt_text, model, processor)
