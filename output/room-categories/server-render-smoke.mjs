import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const project = resolve('artifacts/stoneworks');
const require = createRequire(resolve(project, 'package.json'));
const { createServer } = await import(pathToFileURL(require.resolve('vite')).href);
const React = require('react');
const { renderToString } = require('react-dom/server');
const { Router } = await import(pathToFileURL(require.resolve('wouter')).href);
const server = await createServer({
  configFile: false,
  root: project,
  server: { middlewareMode: true },
  appType: 'custom',
  resolve: { alias: { '@': resolve(project, 'src') }, dedupe: ['react', 'react-dom'] },
  esbuild: { jsx: 'automatic' },
  optimizeDeps: { noDiscovery: true, include: [] },
});
const report = { method: 'Read-only React server render through existing Vite transform, without a browser', pages: [], redirects: [], metadata: {}, errors: [] };
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const decode = value => value.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
const idsIn = html => [...html.matchAll(/\sid="([^"]+)"/g)].map(match => decode(match[1]));
const linksIn = html => [...html.matchAll(/\shref="([^"]+)"/g)].map(match => decode(match[1]));

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { documentMetaForPath } = await server.ssrLoadModule('/src/lib/page-meta.ts');
  const { indexableRoutes, renderSitemapXml } = await server.ssrLoadModule('/src/lib/seo.ts');
  const { productChapters } = await server.ssrLoadModule('/src/data/products.ts');
  const { roomScenes, productSpaceFromHash } = await server.ssrLoadModule('/src/data/room-scenes.ts');
  const { pieces, rooms } = await server.ssrLoadModule('/src/data/gallery.ts');
  const { absolutePath } = await import(pathToFileURL(resolve(dirname(require.resolve('wouter')), 'paths.js')).href);
  const appSource = await readFile(resolve(project, 'src/App.tsx'), 'utf8');
  assert(appSource.includes('<Route path="/products" component={ProductsPage} />'), 'Products route is missing');
  assert(appSource.includes('<Route path="/projects"><Redirect to="/products" replace /></Route>'), 'Projects redirect route changed');
  const routes = new Set(indexableRoutes().map(route => route.path));
  routes.add('/projects');
  const stripLocale = path => path.replace(/^\/(es|it|fr|ar|ur|ru)(?=\/|$)/, '') || '/';
  const isPageLink = href => href.startsWith('/') && !href.startsWith('//') && !/\.[a-z0-9]+(?:[?#]|$)/i.test(href);

  const samplePiece = pieces.find(piece => piece.slug === 'banded-onyx-vase');
  assert(samplePiece, 'Representative catalog piece is missing');
  for (const path of ['/products', '/es/products', '/ar/products', '/', '/about', '/collection', `/collection/${samplePiece.room}/${samplePiece.slug}`, '/architects', '/es/architects', '/ar/architects', '/atelier']) {
    const context = {};
    const html = renderToString(React.createElement(Router, { ssrPath: path, ssrContext: context }, React.createElement(App)));
    assert(html.includes('<main'), `No main content rendered for ${path}`);
    assert(!html.includes('Something went wrong'), `Error boundary appeared for ${path}`);
    const ids = idsIn(html);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    assert(duplicateIds.length === 0, `Duplicate IDs in ${path}: ${duplicateIds.join(', ')}`);
    const links = linksIn(html).filter(isPageLink);
    const unresolved = [...new Set(links.filter(href => !routes.has(stripLocale(href.split(/[?#]/)[0]))))];
    assert(unresolved.length === 0, `Unresolved page links in ${path}: ${unresolved.join(', ')}`);
    const locale = path.match(/^\/(es|it|fr|ar|ur|ru)(?=\/|$)/)?.[1];
    const prefix = locale ? `/${locale}` : '';
    if (html.includes('luxury-nav')) assert(links.includes(`${prefix}/products`), `Products navigation missing for ${path}`);
    if (html.includes('link-trade-brand')) {
      assert(html.includes('data-testid="link-trade-products"') && html.includes('data-testid="link-trade-products-mobile"'), `Trade Products link missing from a header variant for ${path}`);
      assert(links.filter(href => href === `${prefix}/products`).length >= 2, `Trade header Products links lost the locale prefix for ${path}`);
    }
    if (path.endsWith('/products')) {
      assert(html.includes('products-title'), `Product page title missing for ${path}`);
      for (const chapter of productChapters) {
        assert(html.includes(`data-world="${chapter.id}"`), `Product story chapter missing: ${chapter.id}`);
        assert(html.includes(`id="tab-${chapter.id}"`), `Product category tab missing: ${chapter.id}`);
        const featured = pieces.find(piece => piece.slug === chapter.featuredSlug);
        assert(featured && links.includes(`${prefix}/collection/${featured.room}/${featured.slug}`), `Featured product link missing: ${chapter.id}`);
      }
      for (const scene of roomScenes) {
        assert(html.includes(scene.image) && linksIn(html).includes(scene.credit.sourceUrl), `Room photo or credit missing: ${scene.id}`);
      }
      assert(html.includes('Room inspiration'), `Inspiration photography is not clearly identified for ${path}`);
    }
    if (path === '/collection') {
      for (const scene of roomScenes) assert(links.includes(`/products#${scene.id}`), `Collection category gate missing: ${scene.id}`);
      for (const room of rooms) assert(links.includes(`/collection/${room.slug}`), `Material collection link lost: ${room.slug}`);
      assert(html.includes('collection-materials') && html.includes('collection-spaces'), 'Collections space/material hierarchy missing');
    }
    if (path === '/') {
      assert(html.includes('/design/reference/vanity-1953.webp'), 'Reference homepage hero changed');
      for (const scene of roomScenes) assert(links.includes(`/products#${scene.id}`), `Homepage category teaser missing: ${scene.id}`);
    }
    report.pages.push({ path, status: 'passed', uniqueIds: ids.length, resolvedPageLinks: links.length, htmlBytes: Buffer.byteLength(html), productsNavigation: links.includes(`${prefix}/products`) ? 'present' : 'preserved separate legacy trade header', note: 'Effects, pointer events and scroll motion do not run during server rendering.' });
  }

  for (const path of ['/projects', '/es/projects', '/ru/projects']) {
    const context = {};
    const html = renderToString(React.createElement(Router, { ssrPath: path, ssrContext: context }, React.createElement(App)));
    assert(context.redirectTo === '/products', `Redirect not matched for ${path}`);
    const base = path.replace(/\/projects$/, '');
    const resolvedRedirect = absolutePath(context.redirectTo, base);
    assert(resolvedRedirect === path.replace(/\/projects$/, '/products'), `Locale prefix lost for ${path}`);
    report.redirects.push({ path, relativeTarget: context.redirectTo, resolvedTarget: resolvedRedirect, htmlBytes: Buffer.byteLength(html), status: 'passed' });
  }

  const meta = documentMetaForPath('/products', 'en');
  assert(meta.path === '/products', 'Products canonical path is incorrect');
  assert(!meta.robots?.includes('noindex'), 'Product page is accidentally noindex');
  assert(meta.title.includes('Products') && meta.description.includes('kitchen accessories') && meta.description.includes('washroom accessories') && meta.description.includes('room & home decor accessories'), 'Product metadata omits its categories');
  assert(documentMetaForPath('/products', 'es').path === '/es/products', 'Localized product canonical is incorrect');
  const sitemap = renderSitemapXml('https://thestoneworks.com', '2026-10-04');
  assert(sitemap.includes('<loc>https://thestoneworks.com/products</loc>') && sitemap.includes('<loc>https://thestoneworks.com/es/products</loc>'), 'Product sitemap entries are missing');
  report.metadata = { title: meta.title, path: meta.path, structuredDataType: meta.jsonLd['@type'], localizedCanonical: '/es/products', sitemap: 'passed', status: 'passed' };
  assert(productSpaceFromHash('#bathroom') === 'washroom' && productSpaceFromHash('#handicrafts') === 'home-decor', 'Legacy category links no longer resolve');
  assert(productSpaceFromHash('#kitchen') === 'kitchen' && productSpaceFromHash('#washroom') === 'washroom' && productSpaceFromHash('#home-decor') === 'home-decor' && productSpaceFromHash('#unknown') === undefined, 'Category hash mapping changed');
  const slugs = productChapters.flatMap(chapter => chapter.pieces.map(piece => piece.slug));
  assert(new Set(slugs).size === 22 && slugs.length === 22, 'Original 22 actual products were lost or duplicated');
  report.deepLinks = { current: ['kitchen', 'washroom', 'home-decor'], legacyAliases: ['bathroom → washroom', 'handicrafts → home-decor'], status: 'passed' };

  for (const scene of roomScenes) {
    const variants = scene.srcSet.split(',').map(item => item.trim().split(' ')[0]);
    for (const image of variants) await readFile(resolve(project, 'public', image.slice(1)));
    assert(scene.credit.sourceUrl.startsWith('https://www.pexels.com/photo/') && scene.credit.licenseUrl === 'https://www.pexels.com/license/', `Missing source/license for ${scene.id}`);
  }
  report.sceneAssets = { photos: roomScenes.length, variants: 9, licensing: 'Pexels free-use license, source credits present', status: 'passed' };

  for (const chapter of productChapters) {
    assert(rooms.some(room => room.slug === chapter.pieces[0].room), `Unknown collection room in ${chapter.id}`);
    for (const image of [chapter.heroImage, chapter.detailImage, ...chapter.pieces.flatMap(piece => piece.images)]) {
      await readFile(resolve(project, 'public', image.slice(1)));
    }
  }
  report.categoryAssets = { categories: productChapters.map(chapter => ({ id: chapter.id, pieces: chapter.pieces.length })), status: 'passed' };
} catch (error) {
  report.errors.push(error?.stack || String(error));
  process.exitCode = 1;
} finally {
  await server.close();
  await mkdir(resolve('output/room-categories'), { recursive: true });
  await writeFile(resolve('output/room-categories/server-render-smoke.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
