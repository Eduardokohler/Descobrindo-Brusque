from rembg import remove
from PIL import Image

input_path = 'src/assets/images/mascote.png'
output_path = 'src/assets/images/mascote_nobg.png'

print("Removing background...")
try:
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    print("Done!")
except Exception as e:
    print(f"Error: {e}")
