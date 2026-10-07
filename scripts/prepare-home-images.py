"""Non-destructive responsive encodes of existing ST WERKZ photography."""
from pathlib import Path
from PIL import Image
import argparse

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--enhanced-source', type=Path)
args = parser.parse_args()

public = Path(__file__).resolve().parents[1] / 'artifacts' / 'stoneworks' / 'public'
output = public / 'design' / 'enhanced' if args.enhanced_source else public / 'design'
output.mkdir(parents=True, exist_ok=True)
enhanced_sources = {
    file.stem.removesuffix('-enhanced'): file
    for file in (args.enhanced_source / 'enhanced').rglob('*-enhanced.png')
} if args.enhanced_source else {}
sources = {
    'hero': 'gallery/interiors-pakistan-onyx-black-gold.jpg',
    'marble-light': 'gallery/stone-faces/white-onyx.jpg',
    'marble-dark': 'gallery/st-werkz/portoro-gold-inlay.jpg',
    'material': 'gallery/st-werkz/portoro-gold-slab.jpg',
    'craft': 'gallery/st-werkz/portoro-workshop-mantel.jpg',
    'interior': 'gallery/interiors-counter-glow.jpg',
    'sample': 'gallery/st-werkz/travertine-bath-ensemble.jpg',
}
for name, source in sources.items():
    input_file = enhanced_sources[Path(source).stem] if args.enhanced_source else public / source
    with Image.open(input_file) as original:
        widths = [480, 960, 1280, original.width] if name == 'hero' else [min(960, original.width)]
        for width in sorted(set(widths)):
            image = original.convert('RGB')
            image.thumbnail((width, round(original.height * width / original.width)), Image.Resampling.LANCZOS)
            filename = output / (f'{name}-{width}.webp' if name == 'hero' else f'{name}.webp')
            options = {'icc_profile': original.info['icc_profile']} if original.info.get('icc_profile') else {}
            image.save(filename, 'WEBP', quality=91 if args.enhanced_source else 88, method=6, **options)
            print(f'{filename.name}: {image.width}x{image.height}, {filename.stat().st_size} bytes')
