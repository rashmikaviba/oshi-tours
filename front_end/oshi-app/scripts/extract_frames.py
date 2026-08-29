import os
from PIL import Image

def extract_frames():
    gif_path = "public/media/hero-forest.gif"
    output_dir = "public/media/frames"
    
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Opening {gif_path}...")
    im = Image.open(gif_path)
    n_frames = getattr(im, "n_frames", 1)
    print(f"Total frames to extract: {n_frames}")
    
    for i in range(n_frames):
        im.seek(i)
        # Convert to RGB in case palette GIF has transparency/modes
        frame = im.convert("RGB")
        out_path = os.path.join(output_dir, f"frame_{i+1:04d}.webp")
        frame.save(out_path, "WEBP", quality=82)
        if (i + 1) % 20 == 0 or (i + 1) == n_frames:
            print(f"Extracted {i+1}/{n_frames} frames...")
            
    print("Done extracting all frames!")

if __name__ == "__main__":
    extract_frames()
