import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

// Native SVG viewports frame the exact original JPEG bytes. No product pixels
// are retouched or regenerated; screenshot controls sit outside the viewport.
const gallery = resolve('artifacts/stoneworks/public/gallery');
const frames = [
  { name: 'accents-bulbous-vessel', source: [679, 1024], frame: [660, 859], title: 'Travertine Sculptural Vessel' },
  { name: 'accents-travertine-candlesticks', source: [750, 922], frame: [660, 922], title: 'Travertine Candle Holders' },
  { name: 'accents-tapered-vessel', source: [679, 1024], frame: [660, 837], title: 'Tapered Travertine Vessel' },
  { name: 'accents-round-tray', source: [672, 586], origin: [72, 225], frame: [584, 244], title: 'Travertine Round Tray' },
  { name: 'accents-curved-canisters', source: [736, 920], origin: [130, 290], frame: [470, 390], title: 'Curved Travertine Canisters' },
  { name: 'accents-pedestal-bowl', source: [750, 488], origin: [78, 136], frame: [570, 283], title: 'Pedestal Bowl' },
];
await mkdir(resolve(gallery, 'clean'), { recursive: true });
const report = [];
for (const { name, source, frame, origin = [0, 0], title } of frames) {
  const bytes = await readFile(resolve(gallery, name + '.jpg'));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${frame[0]}" height="${frame[1]}" viewBox="${origin[0]} ${origin[1]} ${frame[0]} ${frame[1]}" overflow="hidden"><title>${title}</title><image width="${source[0]}" height="${source[1]}" href="data:image/jpeg;base64,${bytes.toString('base64')}"/></svg>\n`;
  await writeFile(resolve(gallery, 'clean', name + '.svg'), svg);
  report.push({ source: '/gallery/' + name + '.jpg', displayed: '/gallery/clean/' + name + '.svg', originalSha256: createHash('sha256').update(bytes).digest('hex'), sourceDimensions: source, frameDimensions: frame, viewport: [...origin, ...frame], pixelEdits: false });
}
await mkdir(resolve('output/product-overlay-audit'), { recursive: true });
await writeFile(resolve('output/product-overlay-audit/framing.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
