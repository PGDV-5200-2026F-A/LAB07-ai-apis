import requests

from base64 import b64encode
from io import BytesIO
from PIL import Image as PImage

def image_url_to_base64(url):
  try:
    response = requests.get(url)
    response.raise_for_status()
    buffered = BytesIO()
    img = PImage.open(BytesIO(response.content)).convert("RGB")
    img.thumbnail((384, 384))
    img.save(buffered, format="JPEG")
    b64_str = b64encode(buffered.getvalue()).decode("utf-8")
    return { "data": b64_str, "mime_type": "image/jpeg" }
  except requests.exceptions.HTTPError:
    raise

# https://ai.google.dev/gemini-api/docs
def build_prompt(text, image_urls=None):
  input = [{
    "type": "text",
    "text": text
  }]

  if image_urls and type(image_urls) == str:
    image_urls = [image_urls]

  if image_urls and type(image_urls) == list:
    for url in image_urls:
      try:
        img_input = image_url_to_base64(url)
        img_input["type"] = "image"
        input.append(img_input)
      except requests.exceptions.HTTPError:
        pass

  return {
    "model": "gemini-3.5-flash-lite",
    "input": input,
    "generation_config": {
      "thinking_level": "minimal"
    }
  }
