from pathlib import Path

root = Path('D:/St werks/stone-main')
source = (root / 'output/kitchen-washroom-expansion/server-render-smoke.mjs').read_text(encoding='utf-8')
source = source.replace("const output = resolve('output/kitchen-washroom-expansion');", "const output = resolve('output/header-image-refinement');")
source = source.replace("pages: [], redirects: [], metadata:", "pages: [], serviceHeaderChecks: {}, redirects: [], metadata:")
source = source.replace("const licensed = JSON.parse(await readFile(resolve(output, 'research/licensed-photos.json'), 'utf8')).photos;", "const licensed = JSON.parse(await readFile(resolve('output/kitchen-washroom-expansion/research/licensed-photos.json'), 'utf8')).photos;")

extra_frames = """
    { slug: 'round-tray', source: 'accents-round-tray', viewport: [72, 225, 584, 244], excludedUI: 'Upper/lower screenshot text excluded; complete round tray inside approved viewport', beforeSha256: 'ee78a6eb8b47cc1399333d08a031fd8004727d7d70f05d55167e041b2a596925' },
    { slug: 'curved-canisters', source: 'accents-curved-canisters', viewport: [130, 290, 470, 390], excludedUI: 'Screenshot heading/contact/mute elements outside approved object viewport', beforeSha256: '2a6d7121fb7aae31d4fcb5346defc9e0bc68809a1e8c12ca0c72aa004ff2c5b6' },
    { slug: 'pedestal-bowl', source: 'accents-pedestal-bowl', viewport: [78, 136, 570, 283], excludedUI: 'Screenshot text outside approved complete-bowl viewport', beforeSha256: '574fe9d655d38ac24ac484c93cc0837e3afe768fbf6017a4cf451d00f2c3f470' },
"""
source = source.replace('  const framingChecks = [];', extra_frames + '  ];\n  const framingChecks = [];')
# Replace the old array terminator once, rather than leave an extra closed array.
source = source.replace("  ];\n" + extra_frames, extra_frames)
source = source.replace("    const source = await readFile(resolve(project, 'public', sourcePath.slice(1)));", "    const source = await readFile(resolve(project, 'public', sourcePath.slice(1)));\n    item.sourceDimensions ??= jpegSize(source);")
source = source.replace("  assert(frameRecords.length === 4, 'Bath image framing manifest is incomplete');", "  assert(frameRecords.length === 4 && new Set(frameRecords.map(item => item.id)).size === 4 && productAccessories.washroom.every(accessory => frameRecords.some(item => item.id === accessory.id)), 'Bath image framing manifest is incomplete or duplicates an object');\n  const priorBathRecords = JSON.parse(await readFile(resolve('output/kitchen-washroom-expansion/bath-photo-views.json'), 'utf8'));\n  for (const item of frameRecords) {\n    const original = priorBathRecords.find(record => record.id === item.id);\n    assert(original && original.source === item.source && original.originalSha256 === item.originalSha256, 'Bath JPEG or source identity changed since approved original framing: ' + item.id);\n  }")

clip_checks = """
    const clipping = [...frame.matchAll(/<clipPath\\b([^>]*)>([\\s\\S]*?)<\\/clipPath>/g)];
    assert(clipping.length >= 1, 'Bath accessory lacks a native object silhouette: ' + item.id);
    assert(clipping.some(clip => /<(?:path|polygon)\\b/.test(clip[2]) && /(?:d|points)=\"[^\"]+\"/.test(clip[2])), 'Bath clipPath has no nonempty traced geometry: ' + item.id);
    const appliedClip = embedded['clip-path'] || attrs(frame.match(/<g\\b[^>]*clip-path=[^>]*>/)?.[0] || '')['clip-path'];
    assert(clipping.some(clip => appliedClip === 'url(#' + attrs('<clipPath ' + clip[1] + '>').id + ')'), 'Bath object clipPath is not applied to the source photograph: ' + item.id);
    assert(!/<(?:rect|text|circle|ellipse|use)\\b/i.test(frame), 'Bath SVG inserts extra scene/object geometry: ' + item.id);
"""
source = source.replace("    bathChecks.push({ id: item.id,", clip_checks + "    bathChecks.push({ nativeSilhouetteClipPresent: true, id: item.id,")

header_checks = """
  const servicePages = ['/retailers', '/architects', '/interiors', '/export'];
  const serviceChecks = [];
  for (const locale of ALL_LOCALES) for (const bare of servicePages) for (const query of ['', '?source=header-check&brief=stone%20test']) {
    const path = prefixLocale(bare, locale);
    const prefix = locale === 'en' ? '' : '/' + locale;
    const html = renderToString(React.createElement(Router, { ssrPath: path + query }, React.createElement(App)));
    const header = html.match(/<header\\b[^>]*data-testid=\"service-header\"[\\s\\S]*?<\\/header>/)?.[0];
    assert(header, 'Shared service header missing: ' + path + query);
    const headerAnchors = [...header.matchAll(/<a\\b[^>]*>/g)].map(match => attrs(match[0]));
    assert(idsIn(html).includes('service-content') && html.includes('id=\"service-content\" tabindex=\"-1\"'), 'Skip target missing or not focusable: ' + path);
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
    const menu = [...header.matchAll(/<button\\b[^>]*>/g)].map(match => attrs(match[0])).find(button => button['data-testid'] === 'button-service-menu');
    assert(menu && menu['aria-expanded'] === 'false' && menu['aria-controls'] === 'service-menu' && menu['aria-label'], 'Accessible service menu trigger missing: ' + path);
    assert(header.includes('data-testid=\"header-language-selector\"'), 'Explicit service language selector missing: ' + path);
    const ids = idsIn(html);
    assert(new Set(ids).size === ids.length, 'Service route contains duplicate IDs: ' + path);
    serviceChecks.push({ path: path + query, locale, enquiryHref: path + query + '#' + target, headerRoutes: 5, uniqueIds: ids.length, status: 'passed' });
  }
  const serviceCss = await readFile(resolve(project, 'src/styles/service-refinements.css'), 'utf8');
  const headerSource = await readFile(resolve(project, 'src/components/layout/ServiceHeader.tsx'), 'utf8');
  assert(serviceCss.includes('scroll-margin-top: calc(var(--service-header-height) + 20px)'), 'Contact scroll margin ignores measured service header');
  assert(headerSource.includes('new ResizeObserver(measure)') && headerSource.includes("page.style.setProperty('--service-header-height'"), 'Service header height is not measured into page layout');
  report.serviceHeaderChecks = { locales: ALL_LOCALES, routeCases: serviceChecks.length, closedHeaderNavigationAndLocaleQueryAnchorsChecked: true, measuredHeightSourceChecked: true, cases: serviceChecks, limits: 'SSR renders the closed header only. Mobile menu opening, keyboard focus, scroll landing and actual responsive layout require root browser checks.' };

"""
source = source.replace('  const allSlugs = productChapters.flatMap', header_checks + '  const allSlugs = productChapters.flatMap')
source = source.replace("redirects: report.redirects.length, errors:", "redirects: report.redirects.length, serviceHeaderCases: report.serviceHeaderChecks.routeCases || 0, originalFrames: report.imageFraming.checks?.length || 0, bathSilhouettes: report.accessoryChecks?.bathComponents?.length || 0, errors:")
(root / 'output/header-image-refinement/server-render-smoke.mjs').write_text(source, encoding='utf-8')
print('Prepared current-request SSR verification without executing it.')
