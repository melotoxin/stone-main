import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Safe structural checks only: this script never launches or drives a browser.
const project = resolve('artifacts/stoneworks');
const output = resolve('output/header-image-refinement');
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
  pages: [], serviceHeaderChecks: {}, redirects: [], metadata: {}, localeChecks: {}, productChecks: {}, homepageReference: {}, imageFraming: {}, assets: {}, errors: [], warnings: [],
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

function jpegSize(buffer) {
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
  throw Error('JPEG has no supported SOF dimensions');
}

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
  const { productAccessories, productItemCount, accessoryParent } = await server.ssrLoadModule('/src/data/product-accessories.ts');
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
        assert(bodyImages.length === productItemCount(chapter), 'A selected catalogue object or accessory is missing or pictured twice');
        const expectedCount = productItemCount(chapter);
        for (const item of productChapters) {
          const tab = main.match(new RegExp('<button[^>]*id="tab-' + item.id + '"[^>]*>'))?.[0];
          assert(tab && attrs(tab)['aria-label'].includes(', ' + productItemCount(item) + ' '), 'Category tab total does not include its accessories: ' + item.id);
        }
        const status = main.match(/<p[^>]*data-testid="product-search-count"[^>]*>([\s\S]*?)<\/p>/)?.[1] || '';
        assert(status.replace(/<!--.*?-->/g, '').trim().startsWith(String(expectedCount)), 'Search status total does not include accessories');
        const accessoryEntries = [...main.matchAll(/<article[^>]*data-testid="accessory-([^"<>]+)"[^>]*>[\s\S]*?<\/article>/g)];
        assert(accessoryEntries.length === productAccessories[category].length, 'Accessory card count is incorrect');
        const accessoryLabels = { en: ['Reference photograph', 'Part of', 'Photo'], es: ['Fotografía de referencia', 'Parte de', 'Foto'], it: ['Fotografia di riferimento', 'Parte di', 'Foto'], fr: ['Photographie de référence', 'Dans', 'Photo'], ar: ['صورة مرجعية', 'جزء من', 'صورة'], ur: ['حوالے کی تصویر', 'اس سیٹ کا حصہ', 'تصویر'], ru: ['Референсная фотография', 'Часть набора', 'Фото'] }[locale];
        for (const accessory of productAccessories[category]) {
          const article = accessoryEntries.find(entry => entry[1] === accessory.id)?.[0];
          assert(article && article.includes(accessory.image), 'Accessory image/card is missing: ' + accessory.id);
          assert(!/STW-[A-Z]+-\d+/.test(article.replace(/<a[^>]*class="product-accessory__set"[^>]*>[\s\S]*?<\/a>/g, '')), 'Accessory exposes an invented stock code: ' + accessory.id);
          const anchorTags = [...article.matchAll(/<a\b[^>]*>/g)].map(entry => attrs(entry[0]));
          if (accessory.kind === 'set-component') {
            const parent = accessoryParent(accessory);
            const setPath = prefix + '/collection/' + parent.room + '/' + parent.slug;
            assert(anchorTags.length >= 4 && anchorTags.every(anchor => anchor.href === setPath), 'Bath component does not consistently link to its genuine complete set: ' + accessory.id);
            assert(article.includes('product-accessory__set') && article.includes('product-accessory__kind'), 'Set component label/link is missing: ' + accessory.id);
            assert(article.includes('product-accessory__kind">' + accessoryLabels[1] + '</p>'), 'Bath component label is not translated: ' + accessory.id);
          } else {
            const credits = anchorTags.filter(anchor => anchor.class === 'product-accessory__credit');
            assert(credits.length === 1 && credits[0].href === accessory.credit.source && credits[0].target === '_blank' && credits[0].rel === 'noopener noreferrer', 'Reference credit/source link is incorrect: ' + accessory.id);
            assert(article.includes(accessory.credit.photographer) && article.includes(accessory.credit.license), 'Visible photograph credit or license is missing: ' + accessory.id);
            assert(article.includes('product-accessory__kind">' + accessoryLabels[0] + '</p>') && article.includes(accessoryLabels[2] + '<!-- -->:'), 'Reference photograph/credit labels are not translated: ' + accessory.id);
            const href = anchorTags.find(anchor => anchor.class === 'product-text-link')?.href;
            assert(href?.startsWith(prefix + '/enquire?'), 'Reference enquiry link drops locale or is missing: ' + accessory.id);
            const params = new URL(href, 'http://localhost:4173').searchParams;
            assert(params.get('brief')?.trim() && params.get('name')?.includes(accessory.title), 'Reference enquiry does not prefill a specific design brief: ' + accessory.id);
          }
        }
        assert(!unexpectedDuplicates.length, 'Repeated photograph in Products');
        assert(!main.includes('/design/spaces/') && !main.includes('/design/enhanced/hero-') && !main.includes('/design/reference/vanity-'), 'Repeated/stock Products hero or ending remains');
        productSelectionChecks.push({ scope, category, catalogueObjects: chapter.pieces.length, accessories: productAccessories[category].length, total: productItemCount(chapter), status: 'passed' });
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


  const servicePages = ['/retailers', '/architects', '/interiors', '/export'];
  const serviceChecks = [];
  for (const locale of ALL_LOCALES) for (const bare of servicePages) for (const query of ['', '?source=header-check&brief=stone%20test']) {
    const path = prefixLocale(bare, locale);
    const prefix = locale === 'en' ? '' : '/' + locale;
    const html = renderToString(React.createElement(Router, { ssrPath: path + query }, React.createElement(App)));
    const header = html.match(/<header\b[^>]*data-testid="service-header"[\s\S]*?<\/header>/)?.[0];
    assert(header, 'Shared service header missing: ' + path + query);
    const headerAnchors = [...header.matchAll(/<a\b[^>]*>/g)].map(match => attrs(match[0]));
    assert(idsIn(html).includes('service-content') && html.includes('id="service-content" tabindex="-1"'), 'Skip target missing or not focusable: ' + path);
    assert(linksIn(html).includes('#service-content'), 'Skip-to-content link missing: ' + path);
    assert(headerAnchors.some(anchor => anchor.href === prefix + '/' || locale !== 'en' && anchor.href === prefix), 'Home brand drops locale: ' + path);
    for (const destination of ['/products', '/retail', '/architects', '/interiors', '/export']) assert(headerAnchors.some(anchor => anchor.href === prefix + destination), 'Header route drops locale/missing: ' + path + ' -> ' + destination);
    const current = headerAnchors.filter(anchor => anchor['aria-current'] === 'page');
    assert(bare === '/retailers' ? current.length === 0 : current.length === 1 && current[0].href === path, 'Header current-page indicator is incorrect: ' + path);
    const kind = bare === '/export' ? 'export' : 'trade';
    const target = kind + '-contact';
    assert(idsIn(html).includes(target), 'Header enquiry target missing: ' + path);
    for (const id of ['link-' + kind + '-contact-nav', 'link-' + kind + '-contact-mobile']) {
      const anchor = headerAnchors.find(anchor => anchor['data-testid'] === id);
      const actual = anchor?.href && new URL(anchor.href, 'http://localhost:4173');
      const expected = new URL(path + query + '#' + target, 'http://localhost:4173');
      assert(actual && actual.pathname === expected.pathname && actual.hash === expected.hash && actual.search === expected.search, 'Current-page enquiry anchor loses route/query/locale: ' + path + query + ', ' + id);
    }
    const menu = [...header.matchAll(/<button\b[^>]*>/g)].map(match => attrs(match[0])).find(button => button['data-testid'] === 'button-service-menu');
    assert(menu && menu['aria-expanded'] === 'false' && menu['aria-controls'] === 'service-menu' && menu['aria-label'], 'Accessible service menu trigger missing: ' + path);
    assert(header.includes('data-testid="header-language-selector"'), 'Explicit service language selector missing: ' + path);
    const ids = idsIn(html);
    assert(new Set(ids).size === ids.length, 'Service route contains duplicate IDs: ' + path);
    serviceChecks.push({ path: path + query, locale, enquiryHref: path + query + '#' + target, headerRoutes: 5, uniqueIds: ids.length, status: 'passed' });
  }
  const serviceCss = await readFile(resolve(project, 'src/styles/service-refinements.css'), 'utf8');
  const headerSource = await readFile(resolve(project, 'src/components/layout/ServiceHeader.tsx'), 'utf8');
  assert(serviceCss.includes('scroll-margin-top: calc(var(--service-header-height) + 20px)'), 'Contact scroll margin ignores measured service header');
  assert(headerSource.includes('new ResizeObserver(measure)') && headerSource.includes("page.style.setProperty('--service-header-height'"), 'Service header height is not measured into page layout');
  report.serviceHeaderChecks = { locales: ALL_LOCALES, routeCases: serviceChecks.length, closedHeaderNavigationAndLocaleQueryAnchorsChecked: true, measuredHeightSourceChecked: true, cases: serviceChecks, limits: 'SSR renders the closed header only. Mobile menu opening, keyboard focus, scroll landing and actual responsive layout require root browser checks.' };

  const allSlugs = productChapters.flatMap(chapter => chapter.pieces.map(piece => piece.slug));
  assert(new Set(allSlugs).size === allSlugs.length && productSlugsSeen.size === allSlugs.length && allSlugs.every(slug => productSlugsSeen.has(slug)), 'Current product objects are not unique and reachable through the category selection');
  const baseline = await readFile(resolve('.local/kitchen-washroom-expansion-backup/products.ts'), 'utf8');
  const baselineChapters = [...baseline.matchAll(/\{\s*id: '(kitchen|washroom|home-decor)',([\s\S]*?)pieces: selectPieces\(\[([\s\S]*?)\]\)/g)].map(match => ({
    id: match[1],
    slugs: [...match[3].matchAll(/'([^']+)'/g)].map(value => value[1]),
    heroImage: match[2].match(/heroImage: '([^']+)'/)?.[1],
    detailImage: match[2].match(/detailImage: '([^']+)'/)?.[1],
    featuredSlug: match[2].match(/featuredSlug: '([^']+)'/)?.[1],
  }));
  const baselineSlugs = baselineChapters.flatMap(chapter => chapter.slugs);
  assert(baselineChapters.length === 3 && baselineSlugs.length === 41 && new Set(baselineSlugs).size === 41, 'The previous 41-object baseline is invalid');
  const categoryGrowth = productChapters.map(chapter => {
    const original = baselineChapters.find(item => item.id === chapter.id);
    assert(original, 'A category is absent from the original baseline: ' + chapter.id);
    const currentSlugs = chapter.pieces.map(piece => piece.slug);
    const retainedInOrder = currentSlugs.filter(slug => original.slugs.includes(slug));
    assert(JSON.stringify(retainedInOrder) === JSON.stringify(original.slugs), 'Original category membership/order changed: ' + chapter.id);
    assert(chapter.pieces.length >= original.slugs.length, 'Category lost objects: ' + chapter.id);
    assert(chapter.heroImage === original.heroImage && chapter.detailImage === original.detailImage && chapter.featuredSlug === original.featuredSlug, 'Featured category imagery/object changed: ' + chapter.id);
    for (const piece of chapter.pieces) {
      const catalogPiece = pieces.find(item => item.slug === piece.slug);
      assert(catalogPiece && ['code', 'title', 'material', 'form', 'note', 'room'].every(key => piece[key] === catalogPiece[key]), 'Product catalogue identity or original description changed: ' + piece.slug);
    }
    return { id: chapter.id, baselineObjects: original.slugs.length, objects: chapter.pieces.length, added: currentSlugs.filter(slug => !original.slugs.includes(slug)) };
  });
  assert(allSlugs.length === baselineSlugs.length && productChapters.every(chapter => JSON.stringify(chapter.pieces.map(piece => piece.slug)) === JSON.stringify(baselineChapters.find(item => item.id === chapter.id).slugs)), 'Original 41 catalogue selections changed');
  const accessories = Object.values(productAccessories).flat();
  assert(accessories.length === 7 && productAccessories.kitchen.length === 3 && productAccessories.washroom.length === 4 && productAccessories['home-decor'].length === 0, 'Expected Kitchen/Washroom additions are absent');
  assert(new Set(accessories.map(item => item.id)).size === 7 && accessories.every(item => !allSlugs.includes(item.id) && !('code' in item)), 'New accessory identities collide or invent stock codes');
  assert(productAccessories.kitchen.every(item => item.kind === 'reference') && productAccessories.washroom.every(item => item.kind === 'set-component'), 'Reference versus set-component status is incorrect');
  const accessoryPhotos = accessories.map(item => imagePath(item.image));
  assert(new Set(accessoryPhotos).size === 7, 'Accessory photographs repeat');
  for (const path of accessoryPhotos) await access(resolve(project, 'public', path.slice(1)));
  const firstImagePaths = productChapters.flatMap(chapter => chapter.pieces.map(piece => imagePath(piece.images[0])));
  assert(new Set(firstImagePaths).size === allSlugs.length, 'Product categories repeat a first photograph');
  for (const path of firstImagePaths) await access(resolve(project, 'public', path.slice(1)));
  const aliasChecks = ['kitchen', 'washroom', 'home-decor', 'bathroom', 'handicrafts', 'unknown'].map(id => ({ hash: '#' + id, resolvesTo: productChapterFromHash('#' + id) ?? null }));
  assert(productChapterFromHash('#bathroom') === 'washroom' && productChapterFromHash('#handicrafts') === 'home-decor' && productChapterFromHash('#unknown') === undefined, 'Category aliases changed');
  report.productChecks = { reachableObjects: productSlugsSeen.size, preservedOriginalObjects: baselineSlugs.length, additionalCatalogueObjects: allSlugs.length - baselineSlugs.length, additionalAccessoryViews: accessories.length, totalDisplayedItems: allSlugs.length + accessories.length, originalCategoryMembershipAndOrderPreserved: true, uniqueFirstPhotographs: firstImagePaths.length, featuredObjectsAndImagesPreserved: true, catalogIdentityAndDescriptionsPreserved: true, categories: categoryGrowth, initialSelectionRenders: productSelectionChecks, aliases: aliasChecks };

  const sitemap = renderSitemapXml('https://thestoneworks.com', '2026-10-06');
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
  const frameCases = [
    { slug: 'bulbous-vessel', source: 'accents-bulbous-vessel', sourceDimensions: [679, 1024], viewport: [0, 0, 660, 859], excludedUI: 'Instagram controls/pricing/contact band below y859; right-edge scroll indicator beyond x660', beforeSha256: '7ee26adc693b13557f0f18115c6f20955f4bb87766c50ae4d69821085d45d8c1' },
    { slug: 'travertine-candlesticks', source: 'accents-travertine-candlesticks', sourceDimensions: [750, 922], viewport: [0, 0, 660, 922], excludedUI: 'Mute control beyond x660; both complete stone candle holders preserved', beforeSha256: '27d680cef3896382c11c44a8abb129585d24fd9231bb9048f467384ac681adad' },
    { slug: 'tapered-vessel', source: 'accents-tapered-vessel', sourceDimensions: [679, 1024], viewport: [0, 0, 660, 837], excludedUI: 'Instagram controls/pricing/contact band begins y838; right-edge indicator beyond x660', beforeSha256: '005f686b4d71cabad919bec5b7dbd40dbe01d07f0e72af0848bac5da787b81f7' },

    { slug: 'round-tray', source: 'accents-round-tray', viewport: [72, 225, 584, 244], excludedUI: 'Upper/lower screenshot text excluded; complete round tray inside approved viewport', beforeSha256: 'ee78a6eb8b47cc1399333d08a031fd8004727d7d70f05d55167e041b2a596925' },
    { slug: 'curved-canisters', source: 'accents-curved-canisters', viewport: [130, 290, 470, 390], excludedUI: 'Screenshot heading/contact/mute elements outside approved object viewport', beforeSha256: '2a6d7121fb7aae31d4fcb5346defc9e0bc68809a1e8c12ca0c72aa004ff2c5b6' },
    { slug: 'pedestal-bowl', source: 'accents-pedestal-bowl', viewport: [78, 136, 570, 283], excludedUI: 'Screenshot text outside approved complete-bowl viewport', beforeSha256: '574fe9d655d38ac24ac484c93cc0837e3afe768fbf6017a4cf451d00f2c3f470' },
  ];
  const framingChecks = [];
  for (const item of frameCases) {
    const framePath = '/gallery/clean/' + item.source + '.svg';
    const sourcePath = '/gallery/' + item.source + '.jpg';
    const source = await readFile(resolve(project, 'public', sourcePath.slice(1)));
    item.sourceDimensions ??= jpegSize(source);
    const frame = await readFile(resolve(project, 'public', framePath.slice(1)), 'utf8');
    const svg = attrs(frame.match(/<svg\b[^>]*>/)?.[0] || '');
    const embedded = attrs(frame.match(/<image\b[^>]*>/)?.[0] || '');
    const uri = embedded.href || embedded['xlink:href'] || '';
    assert(uri.startsWith('data:image/jpeg;base64,'), 'Framed photo does not embed original JPEG: ' + item.slug);
    const decoded = Buffer.from(uri.slice('data:image/jpeg;base64,'.length), 'base64');
    const sha256 = createHash('sha256').update(source).digest('hex');
    assert(decoded.equals(source), 'Embedded JPEG differs from the original photo bytes: ' + item.slug);
    assert(sha256 === item.beforeSha256, 'Original JPEG changed since pre-framing hash: ' + item.slug);
    assert(svg.viewbox === item.viewport.join(' ') && svg.overflow === 'hidden', 'UI-excluding SVG viewport differs from visual inspection: ' + item.slug);
    assert(Number(svg.width) === item.viewport[2] && Number(svg.height) === item.viewport[3], 'Intrinsic SVG viewport dimensions mismatch: ' + item.slug);
    assert(Number(embedded.width) === item.sourceDimensions[0] && Number(embedded.height) === item.sourceDimensions[1], 'Embedded photograph is stretched or cropped before framing: ' + item.slug);
    assert(!/<(?:script|filter|foreignObject)\b/i.test(frame), 'Framing asset includes unsupported raster alteration or active content: ' + item.slug);
    const record = pieces.find(piece => piece.slug === item.slug);
    assert(record?.images[0] === framePath, 'Shared catalogue still exposes the screenshot UI: ' + item.slug);
    framingChecks.push({ slug: item.slug, sourcePath, framePath, sourceDimensions: item.sourceDimensions, viewport: item.viewport, excludedUI: item.excludedUI, sha256, embeddedJpegMatchesOriginalBytes: true, originalMatchesPreFramingHash: true, sharedCatalogMappedToCleanViewport: true });
  }
  report.imageFraming = { method: 'Native SVG viewport embeds exact original JPEG bytes; no raster retouching or regeneration', checks: framingChecks, status: 'passed' };
  const frameRecords = JSON.parse(await readFile(resolve(output, 'bath-photo-views.json'), 'utf8'));
  assert(frameRecords.length === 4 && new Set(frameRecords.map(item => item.id)).size === 4 && productAccessories.washroom.every(accessory => frameRecords.some(item => item.id === accessory.id)), 'Bath image framing manifest is incomplete or duplicates an object');
  const priorBathRecords = JSON.parse(await readFile(resolve('output/kitchen-washroom-expansion/bath-photo-views.json'), 'utf8'));
  for (const item of frameRecords) {
    const original = priorBathRecords.find(record => record.id === item.id);
    assert(original && original.source === item.source && original.originalSha256 === item.originalSha256, 'Bath JPEG or source identity changed since approved original framing: ' + item.id);
  }
  const bathChecks = [];
  for (const item of frameRecords) {
    const accessory = productAccessories.washroom.find(accessory => accessory.id === item.id);
    assert(accessory && accessory.kind === 'set-component', 'Framed bath accessory is not present in data: ' + item.id);
    const parent = accessoryParent(accessory);
    assert(parent.slug === item.source && productChapters.find(chapter => chapter.id === 'washroom').pieces.some(piece => piece.slug === parent.slug), 'Framed view links to a different original set: ' + item.id);
    const source = await readFile(resolve(project, 'public/gallery/st-werkz', item.source + '.jpg'));
    assert(JSON.stringify(jpegSize(source)) === JSON.stringify(item.size), 'Bath framing manifest disagrees with the actual JPEG dimensions: ' + item.id);
    const frame = await readFile(resolve(project, 'public', accessory.image.slice(1)), 'utf8');
    const svg = attrs(frame.match(/<svg\b[^>]*>/)?.[0] || '');
    const embedded = attrs(frame.match(/<image\b[^>]*>/)?.[0] || '');
    const uri = embedded.href || '';
    assert(uri.startsWith('data:image/jpeg;base64,'), 'Bath accessory viewport does not embed source JPEG: ' + item.id);
    assert(Buffer.from(uri.slice('data:image/jpeg;base64,'.length), 'base64').equals(source), 'Bath component photograph was regenerated or retouched: ' + item.id);
    assert(createHash('sha256').update(source).digest('hex') === item.originalSha256, 'Original bath-set JPEG changed: ' + item.id);
    assert(svg.viewbox === item.viewport.join(' ') && svg.overflow === 'hidden', 'Bath component viewport changed: ' + item.id);
    const [x, y, width, height] = item.viewport;
    assert(x >= 0 && y >= 0 && width > 0 && height > 0 && x + width <= item.size[0] && y + height <= item.size[1], 'Bath image viewport lies outside its source bounds: ' + item.id);
    assert(+svg.width === width && +svg.height === height && accessory.width === width && accessory.height === height, 'Bath SVG or data intrinsic dimensions do not match its crop: ' + item.id);
    assert(+embedded.width === item.size[0] && +embedded.height === item.size[1], 'Bath source image is stretched before framing: ' + item.id);
    assert(!/<(?:script|filter|foreignObject)\b/i.test(frame), 'Bath viewport has active content or non-viewport alterations: ' + item.id);

    const clipping = [...frame.matchAll(/<clipPath\b([^>]*)>([\s\S]*?)<\/clipPath>/g)];
    assert(clipping.length >= 1, 'Bath accessory lacks a native object silhouette: ' + item.id);
    assert(clipping.some(clip => /<(?:path|polygon)\b/.test(clip[2]) && /(?:d|points)="[^"]+"/.test(clip[2])), 'Bath clipPath has no nonempty traced geometry: ' + item.id);
    const appliedClip = embedded['clip-path'] || attrs(frame.match(/<g\b[^>]*clip-path=[^>]*>/)?.[0] || '')['clip-path'];
    assert(clipping.some(clip => appliedClip === 'url(#' + attrs('<clipPath ' + clip[1] + '>').id + ')'), 'Bath object clipPath is not applied to the source photograph: ' + item.id);
    assert(!/<(?:rect|text|circle|ellipse|use)\b/i.test(frame), 'Bath SVG inserts extra scene/object geometry: ' + item.id);
    bathChecks.push({ nativeSilhouetteClipPresent: true, id: item.id, parentSlug: parent.slug, viewport: item.viewport, originalSha256: item.originalSha256, embeddedOriginalBytesPreserved: true, withinSourceBounds: true });
  }
  const licensed = JSON.parse(await readFile(resolve('output/kitchen-washroom-expansion/research/licensed-photos.json'), 'utf8')).photos;
  const referenceChecks = [];
  for (const item of productAccessories.kitchen) {
    const record = licensed.find(photo => photo.id === item.id);
    assert(record && record.visuallyVerified && record.modified === false && item.credit.source === record.source && record.license.startsWith(item.credit.license), 'Kitchen reference lacks a visually verified matching licensed source: ' + item.id);
    const bytes = await readFile(resolve(project, 'public', item.image.slice(1)));
    const checksum = createHash('sha256').update(bytes).digest('hex');
    const actualSize = jpegSize(bytes);
    assert(actualSize[0] === item.width && actualSize[1] === item.height, 'Reference intrinsic dimensions mismatch its actual optimized JPEG: ' + item.id);
    assert(Math.abs(item.height - item.width * record.dimensions[1] / record.dimensions[0]) < 1, 'Optimized Kitchen reference changes the source photograph aspect ratio: ' + item.id);
    referenceChecks.push({ id: item.id, photograph: item.image, source: item.credit.source, license: item.credit.license, publicAssetSha256: checksum, fullResolutionSourceSha256: record.sha256, originalDimensions: record.dimensions, publicAssetDimensions: actualSize, originalAspectRatioPreserved: true, status: 'reference, not ST WERKZ stock' });
  }
  report.accessoryChecks = { bathComponents: bathChecks, kitchenReferences: referenceChecks, allSevenLocaleLabelsCreditsAndParentLinksChecked: true, noInventedStockCodes: true, enquiryBriefParameterChecked: true, limits: 'Actual enquiry textarea prefill is verified separately in the browser; source image framing correctness is backed by visual inspection.' };
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
  report.summary = { renderedPages: report.pages.length, passedPages: report.pages.filter(page => page.status === 'passed').length, failedPages: report.pages.filter(page => page.status === 'failed').length, redirects: report.redirects.length, serviceHeaderCases: report.serviceHeaderChecks.routeCases || 0, originalFrames: report.imageFraming.checks?.length || 0, bathSilhouettes: report.accessoryChecks?.bathComponents?.length || 0, errors: report.errors.length, missingAssets: missingAssets.length, nonOriginalBodyImagePaths: nonOriginal.length, unexpectedRepeatedPageVariants: repeats.length };
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'server-render-smoke.json'), JSON.stringify(report, null, 2));
  await writeFile(resolve(output, 'server-render-smoke.md'), '# Structural verification\n\n' + 'This check used React server rendering through the project’s existing Vite dependencies. It did not use a browser.\n\n' + Object.entries(report.summary).map(([key, value]) => '- ' + key + ': ' + value).join('\n') + '\n\n## Practical limits\n\n' + report.limits + '\n\n## Findings\n\n' + (report.errors.length ? report.errors.map(error => '- ' + error.scope + ': ' + error.message).join('\n') : 'No structural failures found.') + '\n');
  console.log(JSON.stringify({ ...report.summary, findings: report.errors }, null, 2));
  if (report.errors.length) process.exitCode = 1;
}
