from PIL import Image
import os
from pathlib import Path

def remove_white_padding(image_path):
    """Remove white padding from an image"""
    try:
        img = Image.open(image_path)
        
        # Convert RGBA to RGB if needed
        if img.mode == 'RGBA':
            # Create white background
            bg = Image.new('RGB', img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Get image data
        data = img.getdata()
        
        # Find bounding box - exclude white pixels (255, 255, 255)
        # Also exclude near-white pixels (allowing some tolerance)
        white_threshold = 240
        
        pixels = list(data)
        width, height = img.size
        
        # Find bounds
        left, top, right, bottom = width, height, 0, 0
        
        for y in range(height):
            for x in range(width):
                pixel = pixels[y * width + x]
                
                # Check if pixel is not white
                if isinstance(pixel, tuple):
                    r, g, b = pixel[:3]
                    if not (r > white_threshold and g > white_threshold and b > white_threshold):
                        left = min(left, x)
                        top = min(top, y)
                        right = max(right, x)
                        bottom = max(bottom, y)
        
        # Add small margin
        margin = 10
        left = max(0, left - margin)
        top = max(0, top - margin)
        right = min(width, right + margin)
        bottom = min(height, bottom + margin)
        
        # Crop the image
        if left < right and top < bottom:
            cropped = img.crop((left, top, right, bottom))
            
            # Save back
            if image_path.endswith('.jpg') or image_path.endswith('.jpeg'):
                cropped.save(image_path, 'JPEG', quality=95)
            else:
                cropped.save(image_path)
            
            print(f"✓ Processed: {Path(image_path).name}")
            return True
        else:
            print(f"✗ Could not process: {Path(image_path).name}")
            return False
            
    except Exception as e:
        print(f"✗ Error processing {Path(image_path).name}: {str(e)}")
        return False

# Process all logo files
public_dir = Path('public')
logo_files = [
    'burger-king-logo-png_seeklogo-287946.png',
    'logo-kfc.jpg',
    'logo-mcdonalds.jpg',
    'logoshaurma.png',
    'papaJohn.jpg',
    'texas-chicken-logo-png_seeklogo-254144.png'
]

print("Removing white padding from logos...")
print("-" * 40)

for logo in logo_files:
    path = public_dir / logo
    if path.exists():
        remove_white_padding(str(path))
    else:
        print(f"✗ File not found: {logo}")

print("-" * 40)
print("Done!")
