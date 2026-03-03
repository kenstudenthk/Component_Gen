const fs = require('fs');

const data = require('../powerlibs_data.json');

const slugMap = {
  'Accordions': 'accordions',
  'Animations': 'animations',
  'Badge': 'badges',
  'Buttons': 'buttons',
  'Button Group': 'button-group',
  'Calendars': 'calendars',
  'Cards': 'cards',
  'Drawer': 'drawers',
  'Dropdowns': 'dropdowns',
  'Gallery': 'gallery',
  'Modals': 'modals',
  'Navigation Bars': 'navigation',
  'Sidebars': 'sidebars',
  'Speed Dial': 'speed-dial',
  'Tabs': 'tabs',
  'Toast': 'toast',
  'Toggles': 'toggles',
  'Input Fields': 'input-fields'
};

let sql = `-- Migration: Seed PowerLibs Components
-- Generated from powerlibs_data.json

`;

let componentCount = 0;

for (const [categoryName, components] of Object.entries(data)) {
  const slug = slugMap[categoryName];
  if (!slug) {
    console.warn(`No slug mapping for category: ${categoryName}`);
    continue;
  }

  sql += `-- Category: ${categoryName}
`;
  
  components.forEach((comp, idx) => {
    componentCount++;
    const id = `comp-${slug}-${idx + 1}-${Date.now()}`;
    // Escape single quotes for SQL
    const name = comp.name.replace(/'/g, "''");
    const status = comp.status;
    const yaml = `# Default YAML structure for ${name} (${status})
type: component
name: ${name}
status: ${status}`;
    
    sql += `INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) 
`;
    sql += `VALUES ('${id}', '${name}', '${slug}', '${status} component', '${yaml}', '[]', ${idx});
`;
  });
  
  sql += `
`;
}

fs.writeFileSync('migrations/003_library_content.sql', sql);
console.log(`Successfully generated migrations/003_library_content.sql with ${componentCount} components.`);
