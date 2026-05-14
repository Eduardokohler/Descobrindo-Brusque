import os
import requests
from PIL import Image
from io import BytesIO

urls = {
    3: "https://loremflickr.com/800/800/duck",
    4: "https://loremflickr.com/800/800/river,nature",
    5: "https://loremflickr.com/800/800/oktoberfest,beer",
    6: "https://loremflickr.com/800/800/timber,house,german",
    7: "https://loremflickr.com/800/800/roast,duck,food",
    8: "https://loremflickr.com/800/800/museum,building",
    9: "https://loremflickr.com/800/800/suspension,bridge",
    10: "https://loremflickr.com/800/800/department,store",
    11: "https://loremflickr.com/800/800/vintage,town",
    12: "https://loremflickr.com/800/800/baron,portrait",
    13: "https://loremflickr.com/800/800/vintage,airplane",
    14: "https://loremflickr.com/800/800/sculpture,park",
    15: "https://loremflickr.com/800/800/zoo,animals"
}

out_dir = "src/assets/images"
os.makedirs(out_dir, exist_ok=True)

for q_id, url in urls.items():
    print(f"Downloading {q_id}...")
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content)).convert('RGB')
        
        width, height = img.size
        min_dim = min(width, height)
        left = (width - min_dim)/2
        top = (height - min_dim)/2
        right = (width + min_dim)/2
        bottom = (height + min_dim)/2
        img = img.crop((left, top, right, bottom))
        
        # Pixelate: downscale then upscale (less pixelated for better clarity)
        pixel_size = 256
        img_small = img.resize((pixel_size, pixel_size), Image.Resampling.BILINEAR)
        # Increase saturation and contrast slightly to fit Stardew style
        # pyrefly: ignore [missing-import]
        from PIL import ImageEnhance
        enhancer = ImageEnhance.Color(img_small)
        img_small = enhancer.enhance(1.3)
        enhancer2 = ImageEnhance.Contrast(img_small)
        img_small = enhancer2.enhance(1.1)

        img_pixelated = img_small.resize((768, 768), Image.Resampling.NEAREST)
        
        out_path = os.path.join(out_dir, f"bg_q{q_id}.png")
        img_pixelated.save(out_path)
        print(f"Saved {out_path}")
    except Exception as e:
        print(f"Failed for {q_id}: {e}")
