import fs from 'fs';
import { parse } from 'csv-parse/sync';
import yaml from 'js-yaml';

console.log('🚀 PowerApps Component YAML Importer');
console.log('=====================================\n');

// Read CSV file
console.log('📖 Reading CSV file...');
let csvContent;
try {
  csvContent = fs.readFileSync('Powerapps Component YAML.csv', 'utf-8');
} catch (err) {
  console.error('❌ Failed to read CSV file:', err.message);
  process.exit(1);
}

// Parse CSV
console.log('🔍 Parsing CSV content...');
let records;
try {
  records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    bom: true, // Handle BOM in UTF-8 files
  });
} catch (err) {
  console.error('❌ Failed to parse CSV:', err.message);
  process.exit(1);
}

console.log(`✅ Found ${records.length} components in CSV\n`);

// Parse each component
console.log('⚙️  Processing components...');
const components = [];
let successCount = 0;
let errorCount = 0;

for (let index = 0; index < records.length; index++) {
  const row = records[index];
  const name = row.Name?.trim();
  const description = row.Description?.trim() || 'Custom Power Apps component';
  const yamlContent = row.YAML?.trim();

  if (!name || !yamlContent) {
    console.log(`⚠️  Skipping row ${index + 1}: Missing name or YAML`);
    errorCount++;
    continue;
  }

  // Parse YAML to extract CustomProperties
  let customProperties = {};
  let componentName = '';

  try {
    const parsed = yaml.load(yamlContent);

    if (!parsed || !parsed.ComponentDefinitions) {
      console.log(`⚠️  Skipping "${name}": No ComponentDefinitions found`);
      errorCount++;
      continue;
    }

    // Get the component definition (first key in ComponentDefinitions)
    const componentDef = Object.values(parsed.ComponentDefinitions)[0];
    componentName = Object.keys(parsed.ComponentDefinitions)[0];

    if (!componentDef) {
      console.log(`⚠️  Skipping "${name}": Empty ComponentDefinitions`);
      errorCount++;
      continue;
    }

    customProperties = componentDef.CustomProperties || {};
  } catch (err) {
    console.log(`⚠️  Failed to parse YAML for "${name}": ${err.message}`);
    errorCount++;
    continue;
  }

  // Filter only Input properties (editable)
  const inputProperties = {};
  for (const [key, prop] of Object.entries(customProperties)) {
    if (prop.PropertyKind === 'Input') {
      inputProperties[key] = {
        displayName: prop.DisplayName || key,
        description: prop.Description || '',
        dataType: prop.DataType || 'Text',
        default: prop.Default || ''
      };
    }
  }

  components.push({
    id: `comp-custom-${index + 1}`,
    name,
    componentName,
    description,
    yaml: yamlContent,
    customProperties: inputProperties,
    inputPropertyCount: Object.keys(inputProperties).length
  });

  successCount++;

  // Progress indicator
  if (successCount % 100 === 0) {
    console.log(`   Processed ${successCount}/${records.length} components...`);
  }
}

console.log(`\n✅ Successfully processed: ${successCount} components`);
console.log(`⚠️  Skipped/Failed: ${errorCount} components\n`);

// Generate SQL migration
console.log('📝 Generating SQL migration...');

const sqlStatements = components.map(comp => {
  // Escape single quotes in strings
  const yamlEscaped = comp.yaml.replace(/'/g, "''");
  const nameEscaped = comp.name.replace(/'/g, "''");
  const descEscaped = comp.description.replace(/'/g, "''");
  const propsEscaped = JSON.stringify(comp.customProperties).replace(/'/g, "''");

  return `-- ${comp.name} (${comp.inputPropertyCount} editable properties)
INSERT INTO components (id, name, category_slug, description, yaml, tags, component_type, custom_properties, sort_order)
VALUES (
  '${comp.id}',
  '${nameEscaped}',
  'custom-components',
  '${descEscaped}',
  '${yamlEscaped}',
  'custom,imported',
  'definition',
  '${propsEscaped}',
  0
);`;
});

const migrationContent = `-- Migration 008: Import custom components from CSV
-- Generated automatically on ${new Date().toISOString()}
-- Total components: ${components.length}
-- CSV file: Powerapps Component YAML.csv

${sqlStatements.join('\n\n')}
`;

// Write migration file
const migrationPath = 'migrations/008_import_custom_components.sql';
try {
  fs.writeFileSync(migrationPath, migrationContent);
  console.log(`✅ Migration file created: ${migrationPath}`);
} catch (err) {
  console.error('❌ Failed to write migration file:', err.message);
  process.exit(1);
}

// Summary statistics
console.log('\n📊 Summary Statistics:');
console.log('=====================');
console.log(`Total components imported: ${components.length}`);
console.log(`Total skipped: ${errorCount}`);

// Property statistics
const totalProperties = components.reduce((sum, c) => sum + c.inputPropertyCount, 0);
const avgProperties = (totalProperties / components.length).toFixed(1);
console.log(`Total editable properties: ${totalProperties}`);
console.log(`Average properties per component: ${avgProperties}`);

// Top components by property count
console.log('\n🏆 Top 5 components by editable properties:');
const topComponents = [...components]
  .sort((a, b) => b.inputPropertyCount - a.inputPropertyCount)
  .slice(0, 5);

topComponents.forEach((comp, idx) => {
  console.log(`   ${idx + 1}. ${comp.name} (${comp.inputPropertyCount} properties)`);
});

console.log('\n✨ Import script completed successfully!');
console.log('\n📋 Next steps:');
console.log('   1. Review the generated migration file');
console.log('   2. Apply migration 007: npx wrangler d1 migrations apply component-library --local');
console.log('   3. Apply migration 008: npx wrangler d1 migrations apply component-library --local');
console.log('   4. Test the web UI to verify components load correctly\n');
