"""Responsive encodes of the reference-derived photographic assets; keep sources."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / 'artifacts' / 'stoneworks' / 'public' / 'design' / 'reference'
with Image.open(assets / 'vanity-background.png') as source:
    for width in (768, 1440, source.width):
        image = source.convert('RGB')
        image.thumbnail((width, round(source.height * width / source.width)), Image.Resampling.LANCZOS)
        target = assets / f'vanity-{width}.webp'
        image.save(target, 'WEBP', quality=90, method=6)
        print(f'{target.name}: {image.width}x{image.height}, {target.stat().st_size} bytes')
for variant in ('light', 'dark'):
    source = assets / f'marble-{variant}.png'
    if source.exists():
        with Image.open(source) as original:
            image = original.convert('RGB')
            image.thumbnail((1200, 600), Image.Resampling.LANCZOS)
            target = assets / f'marble-{variant}.webp'
            image.save(target, 'WEBP', quality=91, method=6)
            print(f'{target.name}: {target.stat().st_size} bytes')
