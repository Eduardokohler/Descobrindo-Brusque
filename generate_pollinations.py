import os
import time
import requests
import urllib.parse
from PIL import Image
from io import BytesIO

prompts = {
    7: "pixel art 16-bit stardew valley style illustration of a roasted duck dish served on a wooden table",
    8: "pixel art 16-bit stardew valley style illustration of an old historical museum building in a town",
    9: "pixel art 16-bit stardew valley style illustration of a modern cable-stayed bridge over a river in a retro town",
    10: "pixel art 16-bit stardew valley style illustration of a large retro department store building in a town",
    11: "pixel art 16-bit stardew valley style illustration of an old town square from 1860 with pioneers",
    12: "pixel art 16-bit stardew valley style portrait of a noble baron from the 1800s",
    13: "pixel art 16-bit stardew valley style illustration of a vintage airplane resting on top of a water tower",
    14: "pixel art 16-bit stardew valley style illustration of a park with modern sculptures on the grass",
    15: "pixel art 16-bit stardew valley style illustration of a zoo and botanical garden with green plants and animals"
}

out_dir = "src/assets/images"

for q_id, prompt in prompts.items():
    print(f"Generating image for Q{q_id}...")
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=800&height=800&nologo=true&seed=42"
    
    success = False
    for attempt in range(5):
        try:
            response = requests.get(url, timeout=40)
            if response.status_code == 429:
                print("429, sleeping 10s...")
                time.sleep(10)
                continue
            response.raise_for_status()
            
            img = Image.open(BytesIO(response.content)).convert('RGB')
            out_path = os.path.join(out_dir, f"bg_q{q_id}.png")
            img.save(out_path)
            print(f"Saved {out_path}")
            success = True
            time.sleep(2) # be nice to the API
            break
        except Exception as e:
            print(f"Failed for Q{q_id}: {e}")
            time.sleep(10)
            
    if not success:
        print(f"Completely failed Q{q_id}")
