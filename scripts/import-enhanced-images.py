"""Match the supplied photographs by filename and import optimized copies.

Original photographs and the external source folder are never modified.
Run with --apply after inspecting the default dry-run manifest.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
from pathlib import Path
import shutil

from PIL import Image

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', type=Path, required=True)
parser.add_argument('--apply', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
site = root / 'artifacts' / 'stoneworks'
public = site / 'public'
backup = root / '.local' / 'enhanced-images-backup'
report_dir = root / 'output' / 'enhanced-images'
source = args.source.resolve() / 'enhanced'
assert source.is_dir(), f'Enhanced folder missing: {source}'

index = {}
for image in (public / 'gallery').rglob('*'):
    if image.is_file() and image.suffix.lower() in {'.jpg', '.jpeg', '.png'}:
        index.setdefault(image.stem.lower(), []).append(image)

records = []
for enhanced in sorted(source.rglob('*-enhanced.png')):
    matches = index.get(enhanced.stem.removesuffix('-enhanced').lower(), [])
    assert len(matches) == 1, f'Expected one match for {enhanced}: {matches}'
    original = matches[0]
    output = original.with_name(f'{original.stem}-enhanced.webp')
    with Image.open(enhanced) as image:
        width, height = image.size
    records.append({
        'source': str(enhanced),
        'source_sha256': hashlib.sha256(enhanced.read_bytes()).hexdigest(),
        'original_url': '/' + original.relative_to(public).as_posix(),
        'enhanced_url': '/' + output.relative_to(public).as_posix(),
        'output': str(output),
        'width': width,
        'height': height,
        'source_bytes': enhanced.stat().st_size,
    })
assert len(records) == 142, f'Expected 142 matched photographs, found {len(records)}'
report_dir.mkdir(parents=True, exist_ok=True)

def encode(record):
    with Image.open(record['source']) as original:
        image = original.convert('RGBA' if 'A' in original.getbands() else 'RGB')
        options = {'icc_profile': original.info['icc_profile']} if original.info.get('icc_profile') else {}
        image.save(record['output'], 'WEBP', quality=90, method=5, **options)
    record['output_bytes'] = Path(record['output']).stat().st_size
    return record

changed_files = []
if args.apply:
    with ThreadPoolExecutor(max_workers=4) as executor:
        jobs = [executor.submit(encode, record) for record in records]
        for completed, job in enumerate(as_completed(jobs), 1):
            job.result()
            if completed % 20 == 0 or completed == len(records):
                print(f'Imported {completed}/{len(records)} photographs', flush=True)

    replacements = {r['original_url']: r['enhanced_url'] for r in records}
    paths = list((site / 'src').rglob('*.ts')) + list((site / 'src').rglob('*.tsx'))
    paths += [site / 'index.html', site / 'seo-static.ts']
    for path in paths:
        original = path.read_text(encoding='utf-8')
        updated = original
        for before, after in replacements.items():
            updated = updated.replace(before, after)
        if path.name == 'pakistan-stones.ts':
            assert sum('/stone-faces/' in r['original_url'] for r in records) == 43
            updated = updated.replace('`/gallery/stone-faces/${stone.id}.jpg`', '`/gallery/stone-faces/${stone.id}-enhanced.webp`')
        if updated != original:
            saved = backup / path.relative_to(root)
            saved.parent.mkdir(parents=True, exist_ok=True)
            if not saved.exists():
                shutil.copy2(path, saved)
            path.write_text(updated, encoding='utf-8')
            changed_files.append(path.relative_to(root).as_posix())

summary = {
    'source_folder': str(args.source.resolve()),
    'mode': 'applied' if args.apply else 'dry-run',
    'photographs': len(records),
    'stone_faces': sum('/stone-faces/' in r['original_url'] for r in records),
    'source_bytes': sum(r['source_bytes'] for r in records),
    'optimized_bytes': sum(r.get('output_bytes', 0) for r in records),
    'changed_files': changed_files,
    'images': records,
}
report = report_dir / ('import-manifest.json' if args.apply else 'import-plan.json')
report.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(json.dumps({k: v for k, v in summary.items() if k != 'images'}, indent=2), flush=True)
