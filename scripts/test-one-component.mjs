// Test script: Generate YAML for ONE component to validate the workflow
import { generatePowerAppsYAML } from '../src/lib/yaml.js';
import { INITIAL_TEMPLATES } from '../src/lib/templates.js';

console.log('🧪 Testing YAML generation for Classic Button...\n');

// Get the template for Classic Button
const componentName = 'Classic Button';
const settings = INITIAL_TEMPLATES[componentName];

if (!settings) {
  console.error('❌ Template not found for:', componentName);
  process.exit(1);
}

console.log('📋 Settings:', JSON.stringify(settings, null, 2));
console.log('\n');

// Generate YAML
try {
  const yaml = generatePowerAppsYAML(componentName, settings);
  console.log('✅ Generated YAML:\n');
  console.log(yaml);
  console.log('\n');

  // Create SQL UPDATE statement
  const componentId = 'comp-buttons-1-1772260068350';
  const escapedYaml = yaml.replace(/'/g, "''"); // Escape single quotes for SQL

  const sql = `-- Test Migration: Update Classic Button with real YAML
UPDATE components
SET yaml = '${escapedYaml}'
WHERE id = '${componentId}';`;

  console.log('📝 SQL Migration:\n');
  console.log(sql);
  console.log('\n');

  // Write migration file
  import('fs').then(fs => {
    fs.writeFileSync(
      'migrations/004_test_one_component.sql',
      sql
    );
    console.log('✅ Migration file created: migrations/004_test_one_component.sql');
    console.log('\n');
    console.log('📌 Next steps:');
    console.log('1. npx wrangler d1 migrations apply component-library --local');
    console.log('2. npm run dev');
    console.log('3. Visit http://localhost:5173/library/buttons');
    console.log('4. Check if "Classic Button" renders without errors');
  });

} catch (error) {
  console.error('❌ Error generating YAML:', error);
  process.exit(1);
}
