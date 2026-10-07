import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Local data checks only. No browser, freight requests, form submission or email.
const project = resolve('artifacts/stoneworks');
const require = createRequire(resolve(project, 'package.json'));
const { createServer, transformWithEsbuild } = await import(pathToFileURL(require.resolve('vite')).href);
const saved = await readFile(resolve('.local/products-expansion-backup/type-errors/estimate.ts'), 'utf8');
const baselineSource = saved.replace("'./gallery'", "'/src/data/gallery'")
  .replace("'./knowledge'", "'/src/data/knowledge'");
const baselineCode = (await transformWithEsbuild(baselineSource, 'estimate-before-audit.ts', { loader: 'ts' })).code;
const virtualId = '\0estimate-before-audit';
const server = await createServer({
  configFile: false, root: project,
  server: { middlewareMode: true }, appType: 'custom',
  resolve: { alias: { '@': resolve(project, 'src') } },
  optimizeDeps: { noDiscovery: true, include: [] },
  plugins: [{
    name: 'saved-estimate-regression-baseline',
    resolveId: id => id === 'virtual:estimate-before-audit' ? virtualId : undefined,
    load: id => id === virtualId ? baselineCode : undefined,
  }],
});

try {
  const current = await server.ssrLoadModule('/src/data/estimate.ts');
  const previous = await server.ssrLoadModule('virtual:estimate-before-audit');
  const { pieces } = await server.ssrLoadModule('/src/data/gallery.ts');
  const { desks, stoneIndexes } = await server.ssrLoadModule('/src/i18n/catalogs/desks.ts');
  const { shippingCopy } = await server.ssrLoadModule('/src/i18n/catalogs/shipping.ts');
  const piece = slug => {
    const item = pieces.find(entry => entry.slug === slug);
    assert(item, `Missing catalogue fixture: ${slug}`);
    return item;
  };
  const cases = {
    'pill-travertine-dining': 'dining-table',
    'nero-oval-wood-dining': 'dining-table',
    'nero-xframe-dining': 'dining-table',
    'travertine-square-pedestal': 'dining-table',
    'linear-travertine-coffee': 'coffee-table',
    'cream-oval-plinth-table': 'coffee-table',
    'travertine-tripod-coffee': 'coffee-table',
    'sage-onyx-brass-table': 'side-table',
    'travertine-block-side': 'side-table',
    'travertine-cone-pedestal': 'side-table',
    'travertine-cube-table': 'side-table',
    'travertine-c-table': 'side-table',
    'vessel-sink': 'sink',
    'copper-vein-basin': 'sink',
    'hotel-reception': 'counter',
    'onyx-waterfall': 'counter',
    'honey-quartzite-slab': 'slab',
    'portoro-gold-lot': 'slab',
    'onyx-sphere-bowl': 'object',
    'sage-onyx-pear-bowl': 'object',
    'coral-canister': 'object',
    'portoro-cylinder-cup': 'object',
    'portoro-bookends': 'object',
    'desk-suite': 'object',
    'scalloped-valet': 'object',
  };
  for (const [slug, commission] of Object.entries(cases)) {
    assert.equal(current.draftFromPiece(piece(slug)).commission, commission, `${slug} commission`);
  }

  const presetBlock = saved.match(/const SLUG_COMMISSION:[\s\S]*?= \{([\s\S]*?)\n\};/)[1];
  const presetSlugs = [...presetBlock.matchAll(/'([^']+)':/g)].map(match => match[1]);
  for (const slug of presetSlugs) {
    assert.deepEqual(current.draftFromPiece(piece(slug)), previous.draftFromPiece(piece(slug)), `${slug} preset unchanged`);
  }

  let rateChecks = 0;
  for (const { id: commission } of current.commissions) {
    assert.deepEqual(current.defaultDraft(commission), previous.defaultDraft(commission));
    for (const { id: stone } of current.stones) {
      for (const { id: finish } of current.finishes) {
        const draft = { ...current.defaultDraft(commission), stone, finish };
        assert.deepEqual(current.computeEstimate(draft), previous.computeEstimate(draft), `${commission}/${stone}/${finish} numerical range unchanged`);
        assert.deepEqual(current.convertDraftUnit(draft, 'in'), previous.convertDraftUnit(draft, 'in'), 'Unit conversion unchanged');
        rateChecks++;
      }
    }
  }

  const locales = Object.keys(desks);
  for (const locale of locales) {
    for (const key of ['calcKicker', 'calcTitleBefore', 'calcTitleEm', 'calcBody']) assert(desks[locale][key]?.trim(), `${locale} export ${key}`);
    for (const key of ['pageTitle', 'filterNatural', 'filterGranite', 'filterTravertine', 'swatchKind', 'projectKind', 'emptyCategory']) assert(stoneIndexes[locale][key]?.trim(), `${locale} material ${key}`);
    for (const family of ['marble', 'onyx', 'natural', 'granite', 'travertine']) assert(stoneIndexes[locale].families[family]?.trim(), `${locale} family ${family}`);
    assert(shippingCopy[locale].cbmEach?.trim(), `${locale} freight crate volume label`);
    assert(stoneIndexes[locale].projectAlt('Test').includes('Test'), `${locale} project image alt`);
  }
  const report = {
    passed: true, objectClassificationCases: Object.keys(cases).length,
    unchangedPiecePresets: presetSlugs.length, unchangedRateAndConversionCases: rateChecks,
    completeLocales: locales,
    note: 'Estimates remain indicative; no numeric rates or dimensions were changed.',
  };
  await writeFile(resolve('output/products-expansion/estimate-regression.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally {
  await server.close();
}
