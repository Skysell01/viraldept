from PIL import Image, ImageDraw, ImageFont
import os

def create_favicon():
    # Sizes to generate for ICO
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    images = []

    # Try to load a nice serif font (Georgia Bold)
    font_path = "C:\\Windows\\Fonts\\georgiab.ttf"
    if not os.path.exists(font_path):
        font_path = "C:\\Windows\\Fonts\\timesbd.ttf"

    for size in sizes:
        w, h = size
        # Create image with transparent background
        img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Draw rounded rectangle in brand crimson #8b261e
        radius = int(w * 0.25)
        crimson = (139, 38, 30, 255)
        draw.rounded_rectangle([(0, 0), (w - 1, h - 1)], radius=radius, fill=crimson)

        # Draw letter 'V' and period '.'
        font_size = int(h * 0.65)
        try:
            font = ImageFont.truetype(font_path, font_size)
        except:
            font = ImageFont.load_default()

        # Calculate text position
        text = "V"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]

        # Center V slightly to the left to leave room for the dot
        x = int((w - text_w) / 2) - int(w * 0.08)
        y = int((h - text_h) / 2) - int(h * 0.08)
        draw.text((x, y), text, font=font, fill=(255, 248, 246, 255))

        # Accent dot #f5c6c0 (warm coral/rose)
        dot_r = max(1, int(w * 0.07))
        dot_x = x + text_w + int(w * 0.04)
        dot_y = y + text_h - dot_r
        draw.ellipse([(dot_x, dot_y), (dot_x + dot_r * 2, dot_y + dot_r * 2)], fill=(245, 198, 192, 255))

        images.append(img)

    # Save to public/favicon.ico and src/app/favicon.ico
    os.makedirs("public", exist_ok=True)
    os.makedirs("src/app", exist_ok=True)

    images[0].save(
        "public/favicon.ico",
        format="ICO",
        sizes=sizes,
        append_images=images[1:]
    )
    images[0].save(
        "src/app/favicon.ico",
        format="ICO",
        sizes=sizes,
        append_images=images[1:]
    )

    # Save 180x180 Apple touch icon & standard 192x192 icon
    apple_img = images[-1].resize((180, 180), Image.Resampling.LANCZOS)
    apple_img.save("public/apple-icon.png", format="PNG")
    apple_img.save("src/app/apple-icon.png", format="PNG")

    icon192 = images[-1].resize((192, 192), Image.Resampling.LANCZOS)
    icon192.save("public/icon.png", format="PNG")
    icon192.save("src/app/icon.png", format="PNG")

    print("Favicons generated successfully!")

if __name__ == "__main__":
    create_favicon()

