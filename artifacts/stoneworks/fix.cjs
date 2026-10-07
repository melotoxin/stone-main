const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'i18n', 'catalogs');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'en.ts' && f !== 'types.ts' && f !== 'shipping.ts' && f !== 'desks.ts');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace room keys
  content = content.replace(/dining: \{/g, 'marble: {');
  content = content.replace(/living: \{/g, 'onyx: {');
  content = content.replace(/accents: \{/g, 'limestone: {');
  content = content.replace(/interiors: \{/g, 'tiles: {');
  content = content.replace(/surfaces: \{/g, 'slabs: {');

  // Since handicrafts is missing, we can just duplicate slabs
  content = content.replace(/slabs: \{([\s\S]*?)\},/g, 'slabs: {$1},\n    handicrafts: {$1},');

  fs.writeFileSync(filePath, content);
});

console.log('Fixed translations');
