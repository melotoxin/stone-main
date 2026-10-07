from pathlib import Path

source = Path('output/product-overlay-audit/server-render-smoke.mjs').read_text(encoding='utf-8')
source = source.replace("const output = resolve('output/product-overlay-audit');", "const output = resolve('output/kitchen-washroom-expansion');")
source = source.replace("const { pieces, rooms } = await server.ssrLoadModule('/src/data/gallery.ts');", "const { pieces, rooms } = await server.ssrLoadModule('/src/data/gallery.ts');\n  const { productAccessories, productItemCount, accessoryParent } = await server.ssrLoadModule('/src/data/product-accessories.ts');")
source = source.replace("assert(bodyImages.length === chapter.pieces.length, 'A selected object is missing or pictured twice');", """assert(bodyImages.length === productItemCount(chapter), 'A selected catalogue object or accessory is missing or pictured twice');
        const expectedCount = productItemCount(chapter);
        for (const item of productChapters) {
          const tab = main.match(new RegExp('<button[^>]*id="tab-' + item.id + '"[^>]*>'))?.[0];
          assert(tab && attrs(tab)['aria-label'].includes(', ' + productItemCount(item) + ' '), 'Category tab total does not include its accessories: ' + item.id);
        }
        const status = main.match(/<p[^>]*data-testid="product-search-count"[^>]*>([\\s\\S]*?)<\\/p>/)?.[1] || '';
        assert(status.replace(/<!--.*?-->/g, '').trim().startsWith(String(expectedCount)), 'Search status total does not include accessories');
        const accessoryEntries = [...main.matchAll(/<article[^>]*data-testid="accessory-([^"<>]+)"[^>]*>[\\s\\S]*?<\\/article>/g)];
        assert(accessoryEntries.length === productAccessories[category].length, 'Accessory card count is incorrect');
        const accessoryLabels = { en: ['Reference photograph', 'Part of', 'Photo'], es: ['Fotografía de referencia', 'Parte de', 'Foto'], it: ['Fotografia di riferimento', 'Parte di', 'Foto'], fr: ['Photographie de référence', 'Dans', 'Photo'], ar: ['صورة مرجعية', 'جزء من', 'صورة'], ur: ['حوالے کی تصویر', 'اس سیٹ کا حصہ', 'تصویر'], ru: ['Референсная фотография', 'Часть набора', 'Фото'] }[locale];
        for (const accessory of productAccessories[category]) {
          const article = accessoryEntries.find(entry => entry[1] === accessory.id)?.[0];
          assert(article && article.includes(accessory.image), 'Accessory image/card is missing: ' + accessory.id);
          assert(!/STW-[A-Z]+-\\d+/.test(article.replace(/<a[^>]*class="product-accessory__set"[^>]*>[\\s\\S]*?<\\/a>/g, '')), 'Accessory exposes an invented stock code: ' + accessory.id);
          const anchorTags = [...article.matchAll(/<a\\b[^>]*>/g)].map(entry => attrs(entry[0]));
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
        }""")
source = source.replace("productSelectionChecks.push({ scope, category, objects: chapter.pieces.length, status: 'passed' });", "productSelectionChecks.push({ scope, category, catalogueObjects: chapter.pieces.length, accessories: productAccessories[category].length, total: productItemCount(chapter), status: 'passed' });")
source = source.replace(".local/product-image-fix-backup/products-before-42.ts", ".local/kitchen-washroom-expansion-backup/products.ts")
source = source.replace("baselineSlugs.length === 34 && new Set(baselineSlugs).size === 34, 'The previous 34-object baseline is invalid'", "baselineSlugs.length === 41 && new Set(baselineSlugs).size === 41, 'The previous 41-object baseline is invalid'")
source = source.replace("assert(allSlugs.length === baselineSlugs.length + 7, 'The seven requested additional catalogue records are not present');", """assert(allSlugs.length === baselineSlugs.length && productChapters.every(chapter => JSON.stringify(chapter.pieces.map(piece => piece.slug)) === JSON.stringify(baselineChapters.find(item => item.id === chapter.id).slugs)), 'Original 41 catalogue selections changed');
  const accessories = Object.values(productAccessories).flat();
  assert(accessories.length === 7 && productAccessories.kitchen.length === 3 && productAccessories.washroom.length === 4 && productAccessories['home-decor'].length === 0, 'Expected Kitchen/Washroom additions are absent');
  assert(new Set(accessories.map(item => item.id)).size === 7 && accessories.every(item => !allSlugs.includes(item.id) && !('code' in item)), 'New accessory identities collide or invent stock codes');
  assert(productAccessories.kitchen.every(item => item.kind === 'reference') && productAccessories.washroom.every(item => item.kind === 'set-component'), 'Reference versus set-component status is incorrect');
  const accessoryPhotos = accessories.map(item => imagePath(item.image));
  assert(new Set(accessoryPhotos).size === 7, 'Accessory photographs repeat');
  for (const path of accessoryPhotos) await access(resolve(project, 'public', path.slice(1)));""")
source = source.replace("additionalObjects: allSlugs.length - baselineSlugs.length,", "additionalCatalogueObjects: allSlugs.length - baselineSlugs.length, additionalAccessoryViews: accessories.length, totalDisplayedItems: allSlugs.length + accessories.length,")
needle = "  const heroBytes = await readFile(resolve(project, 'public/design/reference/vanity-1953.webp'));"
insert = """  const frameRecords = JSON.parse(await readFile(resolve(output, 'bath-photo-views.json'), 'utf8'));
  assert(frameRecords.length === 4, 'Bath image framing manifest is incomplete');
  const bathChecks = [];
  for (const item of frameRecords) {
    const accessory = productAccessories.washroom.find(accessory => accessory.id === item.id);
    assert(accessory && accessory.kind === 'set-component', 'Framed bath accessory is not present in data: ' + item.id);
    const parent = accessoryParent(accessory);
    assert(parent.slug === item.source && productChapters.find(chapter => chapter.id === 'washroom').pieces.some(piece => piece.slug === parent.slug), 'Framed view links to a different original set: ' + item.id);
    const source = await readFile(resolve(project, 'public/gallery/st-werkz', item.source + '.jpg'));
    assert(JSON.stringify(jpegSize(source)) === JSON.stringify(item.size), 'Bath framing manifest disagrees with the actual JPEG dimensions: ' + item.id);
    const frame = await readFile(resolve(project, 'public', accessory.image.slice(1)), 'utf8');
    const svg = attrs(frame.match(/<svg\\b[^>]*>/)?.[0] || '');
    const embedded = attrs(frame.match(/<image\\b[^>]*>/)?.[0] || '');
    const uri = embedded.href || '';
    assert(uri.startsWith('data:image/jpeg;base64,'), 'Bath accessory viewport does not embed source JPEG: ' + item.id);
    assert(Buffer.from(uri.slice('data:image/jpeg;base64,'.length), 'base64').equals(source), 'Bath component photograph was regenerated or retouched: ' + item.id);
    assert(createHash('sha256').update(source).digest('hex') === item.originalSha256, 'Original bath-set JPEG changed: ' + item.id);
    assert(svg.viewbox === item.viewport.join(' ') && svg.overflow === 'hidden', 'Bath component viewport changed: ' + item.id);
    const [x, y, width, height] = item.viewport;
    assert(x >= 0 && y >= 0 && width > 0 && height > 0 && x + width <= item.size[0] && y + height <= item.size[1], 'Bath image viewport lies outside its source bounds: ' + item.id);
    assert(+svg.width === width && +svg.height === height && accessory.width === width && accessory.height === height, 'Bath SVG or data intrinsic dimensions do not match its crop: ' + item.id);
    assert(+embedded.width === item.size[0] && +embedded.height === item.size[1], 'Bath source image is stretched before framing: ' + item.id);
    assert(!/<(?:script|filter|foreignObject)\\b/i.test(frame), 'Bath viewport has active content or non-viewport alterations: ' + item.id);
    bathChecks.push({ id: item.id, parentSlug: parent.slug, viewport: item.viewport, originalSha256: item.originalSha256, embeddedOriginalBytesPreserved: true, withinSourceBounds: true });
  }
  const licensed = JSON.parse(await readFile(resolve(output, 'research/licensed-photos.json'), 'utf8')).photos;
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
"""
source = source.replace(needle, insert + needle)
source = source.replace('async function checkAsset(src, scope) {', '''function jpegSize(buffer) {
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

async function checkAsset(src, scope) {''')
Path('output/kitchen-washroom-expansion/server-render-smoke.mjs').write_text(source, encoding='utf-8')
print('Prepared Kitchen/Washroom structural check. Awaiting final source and seven accessory records before running.')
