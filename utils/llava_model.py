from transformers import AutoProcessor, LlavaForConditionalGeneration
import torch
from PIL import Image

def load_llava_model():
    # Load the model in half-precision
    model = LlavaForConditionalGeneration.from_pretrained("llava-hf/llava-1.5-7b-hf", torch_dtype=torch.float16, device_map="auto")
    processor = AutoProcessor.from_pretrained("llava-hf/llava-1.5-7b-hf")
    return model, processor

def user_prompt(image, user_prompt, model, processor):
    conversation = [
        {
            "role": "user",
            "content": [
                {"type": "image"},
                {"type": "text", "text": user_prompt},
            ],
        },
    ]
    image = Image.open(image) # Can change this to base64 if needed
    prompt = processor.apply_chat_template(conversation, add_generation_prompt=True)
    inputs = processor(images=image, text=prompt, padding=True, return_tensors="pt").to(model.device, torch.float16)
    generate_ids = model.generate(**inputs, max_new_tokens=500)
    output = processor.batch_decode(generate_ids, skip_special_tokens=True)
    print(output)
    return output

def safety_prompt(image, model, processor):
    safety_prompt = """
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
                {"type": "text", "text": safety_prompt},
            ],
        },
    ]
    image = Image.open(image) # Can change this to base64 if needed
    prompt = processor.apply_chat_template(conversation, add_generation_prompt=True)
    inputs = processor(images=image, text=prompt, padding=True, return_tensors="pt").to(model.device, torch.float16)
    generate_ids = model.generate(**inputs, max_new_tokens=500)
    output = processor.batch_decode(generate_ids, skip_special_tokens=True)
    print(output)
    return output