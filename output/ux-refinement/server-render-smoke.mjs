import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Safe structural checks only: this script never launches or drives a browser.
const project = resolve('artifacts/stoneworks');
const output = resolve('output/ux-refinement');
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
  method: 'Existing Vite SSR transform and React renderToString; no browser or browser automation',
  limits: 'Server rendering does not execute effects, scroll animations, pointer events, form submission or browser history interaction. Synthetic location hashes exercise only initial category selection.',
  pages: [], redirects: [], metadata: {}, localeChecks: {}, productChecks: {}, homepageReference: {}, assets: {}, errors: [], warnings: [],
};
const fail = (scope, message) => report.errors.push({ scope, message });
const assert = (condition, message) => { if (!condition) throw Error(message); };
const decode = value => value.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&#(?:0?39);/g, "'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1].toLowerCase(), decode(match[2])]));
const linksIn = html => [...html.matchAll(/\shref="([^"]+)"/g)].map(match => decode(match[1]));
const imagesIn = html => [...html.matchAll(/<img\b[^>]*>/g)].map(match => attrs(match[0]));
const idsIn = html => [...html.matchAll(/\sid="([^"]+)"/g)].map(match => decode(match[1]));
const barePath = path => path.replace(/^\/(es|it|fr|ar|ur|ru)(?=\/|$)/, '') || '/';
const imagePath = src => src.split(/[?#]/)[0];
const duplicateSources = images => {
  const counts = new Map();
  for (const image of images) counts.set(imagePath(image.src), (counts.get(imagePath(image.src)) || 0) + 1);
  return [...counts].filter(([, count]) => count > 1).map(([src, count]) => ({ src, count }));
};
const checkedAssets = new Map();
const nonOriginalBodyImages = new Map();
const repeatedBodyImages = new Map();
const assetUses = new Map();

async function checkAsset(src, scope) {
  if (!src || src.startsWith('data:') || /^(https?:|blob:)/i.test(src)) return;
  const path = imagePath(decode(src));
  if (!path.startsWith('/')) return;
  if (!assetUses.has(path)) assetUses.set(path, new Set());
  assetUses.get(path).add(scope);
  if (!checkedAssets.has(path)) {
    try { await access(resolve(project, 'public', path.slice(1))); checkedAssets.set(path, true); }
    catch { checkedAssets.set(path, false); }
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const children = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)]));
  return children.flat();
}

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { documentMetaForPath } = await server.ssrLoadModule('/src/lib/page-meta.ts');
  const { indexableRoutes, renderSitemapXml } = await server.ssrLoadModule('/src/lib/seo.ts');
  const { productChapters, productChapterFromHash } = await server.ssrLoadModule('/src/data/products.ts');
  const { pieces, rooms } = await server.ssrLoadModule('/src/data/gallery.ts');
  const { ALL_LOCALES, localeFromPath, prefixLocale, getCatalog } = await server.ssrLoadModule('/src/i18n/index.ts');
  const { absolutePath } = await import(pathToFileURL(resolve(dirname(require.resolve('wouter')), 'paths.js')).href);
  const routes = indexableRoutes();
  const routePaths = new Set(routes.map(route => route.path));
  const resolveInternal = href => {
    if (!href || href.startsWith('#') || /^(?:https?:|mailto:|tel:|data:)/i.test(href)) return true;
    const path = barePath(href.split(/[?#]/)[0]);
    return routePaths.has(path) || path === '/projects' || /\.[a-z0-9]+$/i.test(path);
  };

  const pageCases = routes.map(route => ({ path: route.path, hash: '' }));
  const primaryRoutes = ['/', '/products', '/collection', '/about', '/atelier', '/enquire', '/estimate', '/architects', '/interiors', '/retailers', '/retail', '/export', '/stones'];
  for (const locale of ALL_LOCALES.filter(locale => locale !== 'en')) {
    for (const path of primaryRoutes) pageCases.push({ path: prefixLocale(path, locale), hash: '' });
  }
  for (const locale of ALL_LOCALES) {
    for (const chapter of productChapters) pageCases.push({ path: prefixLocale('/products', locale), hash: '#' + chapter.id });
  }

  const productSlugsSeen = new Set();
  const productSelectionChecks = [];
  for (const { path, hash } of pageCases) {
    const scope = path + hash;
    try {
      if (hash) globalThis.window = { location: { hash, pathname: path, search: '', origin: 'http://localhost:4173' } };
      else delete globalThis.window;
      const context = {};
      const html = renderToString(React.createElement(Router, { ssrPath: path, ssrContext: context }, React.createElement(App)));
      const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
      assert(main, 'No main content rendered');
      assert(!html.includes('Something went wrong'), 'An error boundary rendered');
      const ids = idsIn(html);
      const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      assert(!duplicates.length, 'Duplicate IDs: ' + duplicates.join(', '));
      const links = linksIn(html);
      const unresolved = [...new Set(links.filter(href => !resolveInternal(href)))];
      assert(!unresolved.length, 'Unresolved internal links: ' + unresolved.join(', '));
      const locale = localeFromPath(path);
      const prefix = locale === 'en' ? '' : '/' + locale;
      const navigationLinks = [...html.matchAll(/<a\b[^>]*>/g)].map(match => attrs(match[0])).filter(anchor => !anchor.hreflang).map(anchor => anchor.href).filter(Boolean);
      assert(navigationLinks.includes(prefix + '/products'), 'Products navigation does not preserve the current locale');
      const unexpectedLocale = navigationLinks.filter(href => href.startsWith('/collection') || href.startsWith('/products'));
      if (locale !== 'en') assert(!unexpectedLocale.length, 'Collection or Products navigation drops the locale prefix');

      const bodyImages = imagesIn(main);
      const duplicateImages = duplicateSources(bodyImages);
      // A currently selected photo also appears in the functional product-image chooser.
      const editorialImages = bodyImages.filter(image => !(image.width === '78' && image.height === '78' && image.alt === ''));
      const unexpectedDuplicates = duplicateSources(editorialImages);
      if (unexpectedDuplicates.length) repeatedBodyImages.set(scope, unexpectedDuplicates);
      for (const image of bodyImages) {
        const src = imagePath(image.src || '');
        const permittedReference = barePath(path) === '/' && src === '/design/reference/vanity-1953.webp';
        if (src.startsWith('/') && !/\.(?:jpg|jpeg|svg)$/i.test(src) && !permittedReference) {
          if (!nonOriginalBodyImages.has(src)) nonOriginalBodyImages.set(src, new Set());
          nonOriginalBodyImages.get(src).add(scope);
        }
      }
      for (const image of imagesIn(html)) {
        await checkAsset(image.src, scope);
        for (const entry of (image.srcset || '').split(',')) await checkAsset(entry.trim().split(/\s+/)[0], scope);
      }
      for (const match of html.matchAll(/<(?:video|source)\b[^>]*>/g)) await checkAsset(attrs(match[0]).src, scope);

      const bare = barePath(path);
      const meta = documentMetaForPath(bare, locale);
      assert(meta.path === prefixLocale(bare, locale), 'Canonical path is incorrect');
      assert(meta.title && meta.description && !meta.robots?.includes('noindex'), 'Indexable page metadata is missing or noindex');
      if (meta.image) await checkAsset(meta.image, 'metadata:' + scope);
      if (/^\/collection\/[^/]+\/[^/]+$/.test(bare)) assert(main.includes('data-testid="img-piece-hero"'), 'Product detail route did not render its catalog photograph');
      if (/^\/collection\/[^/]+$/.test(bare)) assert(main.includes('gallery-room'), 'Material room route did not render its catalog room');
      if (bare === '/collection') {
        assert(main.includes('material-atlas') && main.includes('collection-materials'), 'Collections material atlas is missing');
        for (const room of rooms) assert(links.includes(prefix + '/collection/' + room.slug), 'Material detail link missing: ' + room.slug);
        for (const category of ['kitchen', 'washroom', 'home-decor']) assert(links.includes(prefix + '/products#' + category), 'Products category link missing: ' + category);
        assert(!main.includes('/design/spaces/'), 'Stock room-scene gates remain on Collections');
      }
      if (bare === '/') {
        const hero = imagesIn(main).find(image => image['data-testid'] === 'img-hero-stone');
        assert(hero?.src === '/design/reference/vanity-1953.webp', 'Homepage reference hero changed');
        assert(hero.width === '1953' && hero.height === '805', 'Homepage reference hero dimensions changed');
        assert(hero.srcset?.includes('/design/reference/vanity-768.webp 768w') && hero.srcset?.includes('/design/reference/vanity-1440.webp 1440w') && hero.srcset?.includes('/design/reference/vanity-1953.webp 1953w'), 'Homepage reference hero responsive assets changed');
        for (const category of ['kitchen', 'washroom', 'home-decor']) assert(links.includes(prefix + '/products#' + category), 'Homepage category link missing: ' + category);
      }
      if (bare === '/products') {
        const category = productChapterFromHash(hash) || 'kitchen';
        const chapter = productChapters.find(item => item.id === category);
        assert(main.includes('data-world="' + category + '"'), 'Initial/reload category selection is incorrect');
        assert([...main.matchAll(/data-world=/g)].length === 1, 'Products mounts more than one featured category');
        for (const item of productChapters) assert(main.includes('id="tab-' + item.id + '"'), 'Category tab missing: ' + item.id);
        for (const piece of chapter.pieces) {
          assert(links.includes(prefix + '/collection/' + piece.room + '/' + piece.slug), 'Product link missing: ' + piece.slug);
          if (locale === 'en' && hash) productSlugsSeen.add(piece.slug);
        }
        assert(bodyImages.length === chapter.pieces.length, 'A selected object is missing or pictured twice');
        assert(!unexpectedDuplicates.length, 'Repeated photograph in Products');
        assert(!main.includes('/design/spaces/') && !main.includes('/design/enhanced/hero-') && !main.includes('/design/reference/vanity-'), 'Repeated/stock Products hero or ending remains');
        productSelectionChecks.push({ scope, category, objects: chapter.pieces.length, status: 'passed' });
      }
      report.pages.push({ scope, status: 'passed', locale, uniqueIds: ids.length, internalLinks: links.filter(href => href.startsWith('/')).length, bodyImages: bodyImages.length, repeatedBodySources: duplicateImages, allowedThumbnailRepeats: duplicateImages.length !== unexpectedDuplicates.length });
    } catch (error) {
      fail(scope, error.message);
      report.pages.push({ scope, status: 'failed', error: error.message });
    } finally { delete globalThis.window; }
  }

  for (const locale of ALL_LOCALES) {
    const path = prefixLocale('/projects', locale);
    const context = {};
    renderToString(React.createElement(Router, { ssrPath: path, ssrContext: context }, React.createElement(App)));
    const target = context.redirectTo && absolutePath(context.redirectTo, locale === 'en' ? '' : '/' + locale);
    if (target !== prefixLocale('/products', locale)) fail(path, 'Projects redirect does not preserve locale');
    report.redirects.push({ path, target, status: target === prefixLocale('/products', locale) ? 'passed' : 'failed' });
  }

  const allSlugs = productChapters.flatMap(chapter => chapter.pieces.map(piece => piece.slug));
  assert(allSlugs.length === 22 && new Set(allSlugs).size === 22 && productSlugsSeen.size === 22, 'The 22 original product objects are not all reachable through the category selection');
  const baseline = await readFile(resolve('.local/ux-refinement-backup/artifacts/stoneworks/src/data/products.ts'), 'utf8');
  const baselineSlugs = [...baseline.matchAll(/pieces: selectPieces\(\[([\s\S]*?)\]\)/g)].flatMap(match => [...match[1].matchAll(/'([^']+)'/g)].map(value => value[1]));
  assert(JSON.stringify(allSlugs) === JSON.stringify(baselineSlugs), 'Original category catalog membership/order changed');
  const aliasChecks = ['kitchen', 'washroom', 'home-decor', 'bathroom', 'handicrafts', 'unknown'].map(id => ({ hash: '#' + id, resolvesTo: productChapterFromHash('#' + id) ?? null }));
  assert(productChapterFromHash('#bathroom') === 'washroom' && productChapterFromHash('#handicrafts') === 'home-decor' && productChapterFromHash('#unknown') === undefined, 'Category aliases changed');
  report.productChecks = { reachableObjects: productSlugsSeen.size, unchangedCatalogMembership: true, categories: productChapters.map(chapter => ({ id: chapter.id, objects: chapter.pieces.length })), initialSelectionRenders: productSelectionChecks, aliases: aliasChecks };

  const sitemap = renderSitemapXml('https://thestoneworks.com', '2026-10-05');
  let canonicalChecks = 0;
  for (const route of routes) for (const locale of ALL_LOCALES) {
    const path = prefixLocale(route.path, locale);
    const meta = documentMetaForPath(route.path, locale);
    assert(meta.path === path && meta.title && meta.description && !meta.robots?.includes('noindex'), 'Metadata failed: ' + path);
    assert(sitemap.includes('<loc>https://thestoneworks.com' + path + '</loc>'), 'Sitemap route missing: ' + path);
    canonicalChecks++;
  }
  report.metadata = { canonicalChecks, sitemapEntries: [...sitemap.matchAll(/<loc>/g)].length, status: 'passed' };
  const provider = await readFile(resolve(project, 'src/i18n/I18nProvider.tsx'), 'utf8');
  assert(localeFromPath('/') === 'en' && localeFromPath('/products') === 'en' && localeFromPath('/collection') === 'en', 'Unprefixed pages do not default to English');
  assert(provider.includes('const locale = localeFromPath(location)') && !provider.includes('suggestLocaleFromBrowser') && !provider.includes('window.location.replace'), 'Language is selected automatically instead of from the explicit route');
  assert(getCatalog('en').luxuryHome.heroLines[0].includes('Bring'), 'English homepage catalog is unavailable');
  report.localeChecks = { locales: ALL_LOCALES, unprefixedDefault: 'English', explicitRouteSelection: true, navigationChecked: true, status: 'passed' };

  for (const file of (await walk(resolve(project, 'src/styles'))).filter(file => file.endsWith('.css'))) {
    const css = await readFile(file, 'utf8');
    for (const match of css.matchAll(/url\(\s*['"]?(\/[^)'"\s]+)['"]?\s*\)/g)) await checkAsset(match[1], 'css:' + file.slice(project.length + 1));
  }
  for (const path of ['/design/reference/marble-light.webp', '/design/reference/marble-dark.webp']) await checkAsset(path, 'MarbleButton texture');
  const heroBytes = await readFile(resolve(project, 'public/design/reference/vanity-1953.webp'));
  report.homepageReference = { image: '/design/reference/vanity-1953.webp', dimensions: '1953 × 805', sha256: createHash('sha256').update(heroBytes).digest('hex'), responsiveVariants: [768, 1440, 1953], preservedByRenderedPathAndDimensions: true };
} catch (error) {
  fail('global', error?.stack || String(error));
} finally {
  delete globalThis.window;
  await server.close();
  const missingAssets = [...checkedAssets].filter(([, exists]) => !exists).map(([src]) => ({ src, uses: [...assetUses.get(src)] }));
  const nonOriginal = [...nonOriginalBodyImages].map(([src, scopes]) => ({ src, pages: [...scopes] }));
  const repeats = [...repeatedBodyImages].map(([scope, images]) => ({ scope, images }));
  if (missingAssets.length) fail('assets', 'Missing local assets: ' + missingAssets.map(item => item.src).join(', '));
  if (nonOriginal.length) fail('body imagery', 'Non-original JPEG body image paths remain: ' + nonOriginal.map(item => item.src).join(', '));
  if (repeats.length) fail('repeated imagery', 'Unexpected repeated photographs remain on ' + repeats.length + ' rendered page variants');
  report.assets = { checkedUniquePaths: checkedAssets.size, missingAssets, nonOriginalBodyImages: nonOriginal, unexpectedBodyRepeats: repeats, allowedExceptions: ['Exact homepage reference hero', 'SVG brand/decorative assets', 'MarbleButton texture backgrounds', 'Current product photograph repeated in a functional image-selection thumbnail'] };
  report.summary = { renderedPages: report.pages.length, passedPages: report.pages.filter(page => page.status === 'passed').length, failedPages: report.pages.filter(page => page.status === 'failed').length, redirects: report.redirects.length, errors: report.errors.length, missingAssets: missingAssets.length, nonOriginalBodyImagePaths: nonOriginal.length, unexpectedRepeatedPageVariants: repeats.length };
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'server-render-smoke.json'), JSON.stringify(report, null, 2));
  await writeFile(resolve(output, 'server-render-smoke.md'), '# Structural verification\n\n' + 'This check used React server rendering through the project’s existing Vite dependencies. It did not use a browser.\n\n' + Object.entries(report.summary).map(([key, value]) => '- ' + key + ': ' + value).join('\n') + '\n\n## Practical limits\n\n' + report.limits + '\n\n## Findings\n\n' + (report.errors.length ? report.errors.map(error => '- ' + error.scope + ': ' + error.message).join('\n') : 'No structural failures found.') + '\n');
  console.log(JSON.stringify({ ...report.summary, findings: report.errors }, null, 2));
  if (report.errors.length) process.exitCode = 1;
}
