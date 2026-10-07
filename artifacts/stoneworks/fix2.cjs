const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'i18n', 'catalogs');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'en.ts' && f !== 'types.ts' && f !== 'shipping.ts' && f !== 'desks.ts');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Since we blindly replaced interiors with tiles, and it broke staticMeta, let's restore staticMeta keys.
  // Actually, the staticMeta keys were: home, collection, atelier, about, enquire, estimate, retailers, retail, architects, interiors, export, stones.
  // Wait, these keys are for "PageMetaCopy".
  // Let's just fix the `interiors:` key in PageMetaCopy. The only place it appeared was in `about:` or `pages: { ... }`.
  content = content.replace(/tiles: \{(\s*title:)/g, 'interiors: {$1');

  // Let's also fix the duplicate slabs issue
  content = content.replace(/handicrafts: \{([\s\S]*?)\},/g, ''); // clear first
  content = content.replace(/slabs: \{([\s\S]*?)\},/g, 'slabs: {$1},\n      handicrafts: {$1},'); // re-add

  fs.writeFileSync(filePath, content);
});

console.log('Fixed translations');
