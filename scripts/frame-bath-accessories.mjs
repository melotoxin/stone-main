import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

// Paths follow the visible edges in the original catalogue photographs. A clip
// controls which original pixels are displayed; it never paints a replacement
// product or infers shape/veining hidden by another item in the photograph.
const frames = [
  {
    id: 'portoro-soap-dispenser', source: 'portoro-bath-set', size: [600, 600],
    viewport: [422, 88, 154, 250],
    title: 'Portoro bath-set dispenser — original photograph detail',
    silhouette: 'M448 109 C460 104 478 103 490 104 L490 102 Q499 98 512 100 L512 103 Q506 107 507 113 L507 143 L505 150 Q519 150 519 157 L519 178 C540 182 555 202 562 228 C570 253 567 279 559 299 C551 316 536 323 520 325 C509 327 498 328 488 326 C475 314 460 302 445 299 C434 280 431 257 433 239 C436 208 452 187 480 178 L480 157 Q480 151 493 150 L493 136 L491 135 L491 112 C474 109 460 110 449 114 L447 113 Z',
    limits: 'The front cotton-jar lid obscures a small lower-left portion of the dispenser. The visible boundary excludes that adjacent lid; no hidden pixels or stone veins are reconstructed.',
  },
  {
    id: 'travertine-soap-dish', source: 'travertine-vanity-gold', size: [600, 600],
    viewport: [250, 350, 176, 112],
    title: 'Travertine vanity soap dish — original photograph detail',
    silhouette: 'M264 378 C281 365 324 355 360 361 C391 364 412 376 412 395 L411 419 C407 435 371 449 336 450 C297 450 262 433 260 416 L260 394 C258 387 259 382 264 378 Z',
    limits: 'The complete front soap dish is visible. The surrounding tray and neighbouring vanity vessels are excluded.',
  },
  {
    id: 'travertine-brush-holder', source: 'travertine-bath-seven', size: [736, 736],
    viewport: [61, 28, 152, 516],
    title: 'Travertine bath brush and holder — original photograph detail',
    silhouette: 'M134 41 Q139 39 142 46 C146 62 148 83 148 104 L147 149 Q148 160 144 164 L144 276 C180 277 196 282 201 290 L202 299 L202 487 C194 493 186 500 182 511 C178 519 177 524 179 528 C158 533 128 533 106 529 C89 525 76 520 75 510 L74 292 C74 282 104 276 131 276 L130 169 L127 162 C126 148 125 128 125 104 C124 83 124 65 127 50 Q129 43 134 41 Z',
    limits: 'The full metal handle and visible holder remain. A small lower-right corner is obscured by the set tray in the source; that adjacent tray is excluded rather than reconstructing a hidden corner.',
  },
  {
    id: 'travertine-cotton-jar', source: 'travertine-bath-ensemble', size: [736, 1130],
    viewport: [381, 565, 355, 303],
    title: 'Travertine bath cotton jar — original photograph detail',
    silhouette: 'M452 583 C501 575 563 575 615 580 C649 583 668 593 674 609 C696 614 715 626 724 642 C733 655 734 675 732 701 L731 803 C730 834 709 850 679 854 L501 856 C467 854 447 842 444 815 L442 696 C423 691 411 681 403 665 C395 650 392 629 396 612 C401 596 422 589 452 583 Z',
    limits: 'The tilted lid, visible cotton and full rounded-square jar are retained. The dispenser behind the jar and the surrounding tray are excluded.',
  },
];
const output = resolve('artifacts/stoneworks/public/gallery/accessories');
await mkdir(output, { recursive: true });
const proofPairs = [];
for (const frame of frames) {
  const bytes = await readFile(resolve('artifacts/stoneworks/public/gallery/st-werkz', frame.source + '.jpg'));
  const jpegData = 'data:image/jpeg;base64,' + bytes.toString('base64');
  const [, , width, height] = frame.viewport;
  const clipId = frame.id + '-original-silhouette';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${frame.viewport.join(' ')}" overflow="hidden"><title>${frame.title}</title><desc>${frame.limits}</desc><defs><clipPath id="${clipId}" clipPathUnits="userSpaceOnUse"><path d="${frame.silhouette}"/></clipPath></defs><image width="${frame.size[0]}" height="${frame.size[1]}" href="${jpegData}" clip-path="url(#${clipId})"/></svg>\n`;
  await writeFile(resolve(output, frame.id + '.svg'), svg);
  frame.originalSha256 = createHash('sha256').update(bytes).digest('hex');
  frame.clipPathId = clipId;
  frame.method = 'Native SVG silhouette clipping of exact embedded original JPEG bytes; no bitmap derivative, generative replacement, sharpening or reconstructed product pixels.';
  proofPairs.push(`<article><h2>${frame.title}</h2><div class="pair"><figure><img src="${jpegData}" alt="Complete original ${frame.source} photograph"><figcaption>Complete original set photograph</figcaption></figure><figure class="detail"><img width="${width}" height="${height}" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" alt="Exact source-pixel extraction"><figcaption>Native detail: ${width} × ${height}px</figcaption></figure></div><p>${frame.limits}</p></article>`);
}
const reportOutput = resolve('output/header-image-refinement');
await mkdir(reportOutput, { recursive: true });
const manifest = JSON.stringify(frames, null, 2) + '\n';
await writeFile(resolve(reportOutput, 'accessory-extraction.json'), manifest);
await writeFile(resolve(reportOutput, 'bath-photo-views.json'), manifest);
await writeFile(resolve(reportOutput, 'extraction-proof.html'), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Original catalogue accessory extraction proof</title><style>body{margin:0;padding:28px;background:#e8e1d6;color:#24211b;font:15px/1.6 system-ui}main{max-width:1100px;margin:auto}h1{font-size:30px}h2{font-size:19px}article{margin:35px 0;padding:24px;background:#f7f2e9;border:1px solid #c7bcab}.pair{display:grid;grid-template-columns:1fr 1fr;gap:22px}figure{margin:0;padding:15px;background:#d8cbb6}figure img{display:block;max-width:100%;max-height:510px;width:auto;height:auto;margin:auto}.detail{display:grid;align-content:center;justify-items:center;background:linear-gradient(45deg,#ddd3c2 25%,transparent 25%,transparent 75%,#ddd3c2 75%),linear-gradient(45deg,#ddd3c2 25%,#efe6d7 25%,#efe6d7 75%,#ddd3c2 75%);background-size:22px 22px;background-position:0 0,11px 11px}figcaption{margin-top:16px;text-align:center;font-size:12px}p{max-width:850px}@media(max-width:650px){body{padding:12px}article{padding:16px}.pair{grid-template-columns:1fr}}</style><main><h1>Original catalogue accessory extraction proof</h1><p>Left: the unchanged complete catalogue photograph. Right: a transparent silhouette view of its visible component at native pixel size. Original embedded JPEG bytes are identical. No hidden parts or marble veins were fabricated.</p>${proofPairs.join('')}</main></html>\n`);
console.log('Extracted four visible bath-set components with native SVG silhouettes; original photograph bytes preserved.');
