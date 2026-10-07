import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Structural rendering only. This script does not launch or automate a browser.
const project = resolve('artifacts/stoneworks');
const output = resolve('output/creative-product-cards');
const require = createRequire(resolve(project, 'package.json'));
const { createServer } = await import(pathToFileURL(require.resolve('vite')).href);
const React = require('react');
const { renderToString } = require('react-dom/server');
const { Router } = await import(pathToFileURL(require.resolve('wouter')).href);
const server = await createServer({
  configFile: false, root: project,
  server: { middlewareMode: true }, appType: 'custom',
  resolve: { alias: { '@': resolve(project, 'src') }, dedupe: ['react', 'react-dom'] },
  esbuild: { jsx: 'automatic' }, optimizeDeps: { noDiscovery: true, include: [] },
});
const report = {
  createdAt: new Date().toISOString(),
  method: 'Vite SSR transformation and React renderToString; synthetic hashes for initial product category selection',
  limits: 'No effects, browser history interaction, visual layouts, keyboard or pointer events, scroll animation, or form submission are exercised.',
  pages: [], productCategories: [], productDetails: [], imageDimensions: [], assets: [], errors: [],
};
const assert = (condition, message) => { if (!condition) throw Error(message); };
const decode = value => value.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&#(?:0?39);/g, "'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1].toLowerCase(), decode(match[2])]));
const anchorsIn = html => [...html.matchAll(/<a\b[^>]*>/g)].map(match => attrs(match[0]));
const imagesIn = html => [...html.matchAll(/<img\b[^>]*>/g)].map(match => attrs(match[0]));
const barePath = path => path.replace(/^\/(es|it|fr|ar|ur|ru)(?=\/|$)/, '') || '/';
const imagePath = src => src.split(/[?#]/)[0];
const assetCache = new Map();
const dimensionCache = new Map();

async function checkAsset(src, scope) {
  if (!src || !src.startsWith('/') || src.startsWith('//')) return;
  const path = imagePath(src);
  if (!assetCache.has(path)) {
    try { await access(resolve(project, 'public', path.slice(1))); assetCache.set(path, true); }
    catch { assetCache.set(path, false); }
  }
  assert(assetCache.get(path), 'Missing asset: ' + path + ' (' + scope + ')');
}

function jpegDimensions(buffer) {
  assert(buffer[0] === 0xff && buffer[1] === 0xd8, 'Invalid JPEG header');
  let position = 2;
  const sizes = new Set([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf]);
  while (position < buffer.length) {
    if (buffer[position++] !== 0xff) continue;
    while (buffer[position] === 0xff) position++;
    const marker = buffer[position++];
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || marker >= 0xd0 && marker <= 0xd7) continue;
    const length = buffer.readUInt16BE(position);
    if (sizes.has(marker)) return [buffer.readUInt16BE(position + 5), buffer.readUInt16BE(position + 3)];
    if (marker === 0xda) break;
    position += length;
  }
  throw Error('Unsupported JPEG dimensions');
}

async function actualDimensions(src) {
  const path = imagePath(src);
  if (dimensionCache.has(path)) return dimensionCache.get(path);
  const buffer = await readFile(resolve(project, 'public', path.slice(1)));
  let size;
  if (/\.jpe?g$/i.test(path)) size = jpegDimensions(buffer);
  else if (/\.png$/i.test(path)) {
    assert(buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), 'Invalid PNG: ' + path);
    size = [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
  } else if (/\.svg$/i.test(path)) {
    const svg = attrs(buffer.toString('utf8').match(/<svg\b[^>]*>/)?.[0] || '');
    size = [Number(svg.width), Number(svg.height)];
    if (!size.every(value => Number.isFinite(value) && value > 0)) {
      const box = svg.viewbox?.trim().split(/\s+/).map(Number);
      size = box?.slice(2);
    }
  }
  assert(size?.length === 2 && size.every(value => Number.isFinite(value) && value > 0), 'Could not read image dimensions: ' + path);
  dimensionCache.set(path, size);
  return size;
}

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { productChapters } = await server.ssrLoadModule('/src/data/products.ts');
  const { productAccessories, productItemCount, accessoryParent } = await server.ssrLoadModule('/src/data/product-accessories.ts');
  const { cataloguePhotos } = await server.ssrLoadModule('/src/data/catalogue-photos.ts');
  const { indexableRoutes } = await server.ssrLoadModule('/src/lib/seo.ts');
  const { ALL_LOCALES, prefixLocale, localeFromPath } = await server.ssrLoadModule('/src/i18n/index.ts');
  const routePaths = new Set(indexableRoutes().map(route => route.path));
  const canonicalPieces = [...new Map(productChapters.flatMap(chapter => chapter.pieces).map(piece => [piece.slug, piece])).values()];
  const totalDisplayed = productChapters.reduce((sum, chapter) => sum + productItemCount(chapter), 0);
  assert(canonicalPieces.length === 41, 'Canonical product count changed');
  assert(totalDisplayed === 48, 'Displayed object count changed');
  report.catalogue = { canonicalProducts: canonicalPieces.length, totalDisplayed, categories: productChapters.map(chapter => ({ id: chapter.id, catalogue: chapter.pieces.length, accessories: productAccessories[chapter.id].length, displayed: productItemCount(chapter) })) };
  const mainPages = ['/', '/collection', '/architects', '/interiors', '/retail', '/export', '/about', '/atelier', '/enquire'];
  const cases = ALL_LOCALES.flatMap(locale => [
    ...productChapters.map(chapter => ({ path: prefixLocale('/products', locale), hash: '#' + chapter.id, chapter })),
    ...mainPages.map(path => ({ path: prefixLocale(path, locale), hash: '' })),
  ]);
  cases.push(...canonicalPieces.map(piece => ({ path: '/collection/' + piece.room + '/' + piece.slug, hash: '', piece })));
  const retouchedLabels = { en: 'Retouched detail', es: 'Detalle retocado', it: 'Dettaglio ritoccato', fr: 'Détail retouché', ar: 'تفصيل مُحسَّن', ur: 'بہتر کی گئی تفصیل', ru: 'Ретушированная деталь' };
  for (const page of cases) {
    const scope = page.path + page.hash;
    try {
      if (page.hash) globalThis.window = { location: { hash: page.hash, pathname: page.path, search: '', origin: 'http://localhost:4174' } };
      else delete globalThis.window;
      const html = renderToString(React.createElement(Router, { ssrPath: page.path, ssrContext: {} }, React.createElement(App)));
      const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
      assert(main, 'No main content');
      assert(!html.includes('Something went wrong'), 'Error boundary rendered');
      const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => decode(match[1]));
      assert(ids.length === new Set(ids).size, 'Duplicate ids: ' + ids.filter((id, index) => ids.indexOf(id) !== index).join(', '));
      const anchors = anchorsIn(html);
      for (const anchor of anchors) {
        if (!anchor.href || !anchor.href.startsWith('/') || anchor.href.startsWith('//')) continue;
        const path = barePath(anchor.href.split(/[?#]/)[0]);
        assert(routePaths.has(path) || path === '/projects' || /\.[a-z0-9]+$/i.test(path), 'Unresolved internal link: ' + anchor.href);
      }
      for (const image of imagesIn(html)) {
        await checkAsset(image.src, scope);
        for (const source of (image.srcset || '').split(',')) await checkAsset(source.trim().split(/\s+/)[0], scope);
      }
      const locale = localeFromPath(page.path);
      const prefix = locale === 'en' ? '' : '/' + locale;
      assert(anchors.some(anchor => anchor.href === prefix + '/products'), 'Products navigation drops locale');
      if (page.chapter) {
        const chapter = page.chapter;
        const expectedCount = productItemCount(chapter);
        const bodyImages = imagesIn(main);
        assert(bodyImages.length === expectedCount, 'Product image count differs from item count');
        assert(main.includes('data-world="' + chapter.id + '"'), 'Incorrect initial category');
        const opening = main.match(/<header\b[^>]*class="product-opening"[^>]*>[\s\S]*?<\/header>/)?.[0] || '';
        assert(opening.includes('48'), 'Opening total is not 48');
        const status = main.match(/<p[^>]*data-testid="product-search-count"[^>]*>([\s\S]*?)<\/p>/)?.[1] || '';
        assert(status.replace(/<!--.*?-->/g, '').trim().startsWith(String(expectedCount)), 'Incorrect search count');
        const cards = [...main.matchAll(/<a\b[^>]*data-testid="product-([^"<>]+)"[^>]*>[\s\S]*?<\/a>/g)];
        assert(cards.length === chapter.pieces.length - 1, 'Catalogue card count is incorrect');
        for (const piece of chapter.pieces) {
          assert(anchors.some(anchor => anchor.href === prefix + '/collection/' + piece.room + '/' + piece.slug), 'Missing piece link: ' + piece.slug);
          if (piece.slug === chapter.featuredSlug) continue;
          const card = cards.find(match => match[1] === piece.slug)?.[0];
          const image = imagesIn(card || '')[0];
          const photo = cataloguePhotos[piece.images[0]];
          assert(photo && image, 'Missing catalogue photo metadata/card: ' + piece.slug);
          assert(image.src === photo.src, 'Wrong display photo: ' + piece.slug);
          assert(Number(image.width) === photo.width && Number(image.height) === photo.height, 'Image attributes do not match photo metadata: ' + piece.slug);
          const actual = await actualDimensions(image.src);
          assert(Number(image.width) === actual[0] && Number(image.height) === actual[1], 'Image attributes do not match actual display dimensions: ' + piece.slug);
          assert(image.alt?.trim(), 'Empty catalogue photo alt: ' + piece.slug);
          assert(attrs(card.match(/<a\b[^>]*>/)[0])['aria-label']?.includes(piece.code), 'Card accessible name misses product code: ' + piece.slug);
          report.imageDimensions.push({ scope, slug: piece.slug, src: image.src, width: actual[0], height: actual[1], status: 'passed' });
        }
        for (const accessory of productAccessories[chapter.id]) {
          const article = [...main.matchAll(/<article\b[^>]*data-testid="accessory-([^"<>]+)"[^>]*>[\s\S]*?<\/article>/g)].find(match => match[1] === accessory.id)?.[0];
          assert(article, 'Missing accessory: ' + accessory.id);
          const image = imagesIn(article)[0];
          assert(image.src === accessory.image, 'Accessory image changed: ' + accessory.id);
          const actual = await actualDimensions(image.src);
          assert(Number(image.width) === actual[0] && Number(image.height) === actual[1], 'Accessory image dimensions incorrect: ' + accessory.id);
          if (accessory.kind === 'set-component') {
            const parent = accessoryParent(accessory);
            const expectedHref = prefix + '/collection/' + parent.room + '/' + parent.slug;
            assert(anchorsIn(article).every(anchor => anchor.href === expectedHref), 'Accessory complete-set links are incorrect: ' + accessory.id);
            assert(accessory.retouched && /\/accessories\/extracted\/.*\.png$/.test(image.src), 'Requested extracted PNG is not retained: ' + accessory.id);
            assert(article.includes('data-testid="image-treatment-' + accessory.id + '"') && article.includes(retouchedLabels[locale]), 'Retouched detail label missing: ' + accessory.id);
          } else {
            assert(article.includes(accessory.credit.photographer) && article.includes(accessory.credit.license), 'Reference photo credit missing: ' + accessory.id);
            assert(anchorsIn(article).some(anchor => anchor.href === accessory.credit.source && anchor.rel === 'noopener noreferrer'), 'Reference photo credit link incorrect: ' + accessory.id);
          }
        }
        assert(bodyImages.map(image => image.src).length === new Set(bodyImages.map(image => image.src)).size, 'Repeated product photo in category');
        report.productCategories.push({ scope, category: chapter.id, catalogueCards: cards.length, accessoryCards: productAccessories[chapter.id].length, displayed: expectedCount, status: 'passed' });
      }
      if (page.piece) {
        assert(main.includes('data-testid="img-piece-hero"'), 'Piece detail image missing');
        assert(main.includes(page.piece.code), 'Piece detail code missing');
        report.productDetails.push({ scope, slug: page.piece.slug, status: 'passed' });
      }
      report.pages.push({ scope, locale, imageCount: imagesIn(main).length, uniqueIds: ids.length, status: 'passed' });
    } catch (error) {
      report.pages.push({ scope, status: 'failed', error: error.message });
      report.errors.push({ scope, message: error.message });
    }
  }
} catch (error) {
  report.errors.push({ scope: 'setup', message: error.stack || error.message });
} finally {
  delete globalThis.window;
  await server.close();
  report.assets = [...assetCache].map(([src, exists]) => ({ src, exists }));
  report.result = report.errors.length ? 'failed' : 'passed';
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'server-render-smoke.json'), JSON.stringify(report, null, 2) + '\n');
  await writeFile(resolve(output, 'server-render-smoke.md'), [
    '# Product card structural audit', '',
    'Result: **' + report.result + '**', '',
    '- Page variants rendered: ' + report.pages.length + '.',
    '- Product categories checked: ' + report.productCategories.length + ' (three categories across seven languages).',
    '- Product detail pages checked: ' + report.productDetails.length + '.',
    '- Catalogue card dimension assertions: ' + report.imageDimensions.length + '.',
    '- Local image assets checked: ' + report.assets.length + '.',
    '- Errors: ' + report.errors.length + '.', '',
    'Checks cover duplicate ids, render failures, internal links, catalogue count, actual display image dimensions, image assets, photo alt text, complete-set links, retained extracted PNGs and translated retouch labels.', '',
    report.limits, '',
    ...report.errors.map(error => '- ' + error.scope + ': ' + error.message), '',
  ].join('\n'));
  console.log(JSON.stringify({ result: report.result, pages: report.pages.length, categories: report.productCategories.length, details: report.productDetails.length, dimensions: report.imageDimensions.length, assets: report.assets.length, errors: report.errors }, null, 2));
  if (report.errors.length) process.exitCode = 1;
}

