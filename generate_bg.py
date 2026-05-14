import os
import requests
import urllib.parse
from PIL import Image
from io import BytesIO\

prompt = "pixel art 16-bit stardew valley style illustration of a zoomed out wide panoramic view of a cozy retro town valley with a river and small colorful houses and trees, beautiful day"
encoded_prompt = urllib.parse.quote(prompt)
url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&seed=101"

print("Generating main background...")
try:
    response = requests.get(url, timeout=40)
    response.raise_for_status()
    
    img = Image.open(BytesIO(response.content)).convert('RGB')
    out_path = "src/assets/images/background.png"
    img.save(out_path)
    print(f"Saved {out_path}")
except Exception as e:
    print(f"Failed to generate: {e}")
