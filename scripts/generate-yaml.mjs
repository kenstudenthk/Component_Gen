// Full YAML Generation Script for PowerLibs Component Library
// Generates real Power Apps YAML for all 84 components

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generatePowerAppsYAML } from '../src/lib/yaml.js';
import { INITIAL_TEMPLATES } from '../src/lib/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 PowerLibs YAML Generator\n');

// ============================================================================
// STEP 1: Parse components from 003_library_content.sql
// ============================================================================

const migrationFile = path.join(__dirname, '../migrations/003_library_content.sql');
const migrationContent = fs.readFileSync(migrationFile, 'utf-8');

// Regex to extract component data
const componentRegex = /INSERT INTO components \(id, name, category_slug, description, yaml, tags, sort_order\)\s+VALUES \('([^']+)', '([^']+)', '([^']+)', '([^']*)', '([^']*)', '(\[\])', (\d+)\);/g;

const components = [];
let match;

while ((match = componentRegex.exec(migrationContent)) !== null) {
  const [_, id, name, category, description, yaml, tags, sortOrder] = match;
  components.push({
    id,
    name,
    category,
    description,
    yaml, // placeholder YAML (will be replaced)
    tags,
    sortOrder: parseInt(sortOrder)
  });
}

console.log(`📊 Parsed ${components.length} components from migration file\n`);

// ============================================================================
// STEP 2: Category to Component Type Mapping
// ============================================================================

const categoryToType = {
  'accordions': 'accordion',
  'animations': 'animation',
  'badges': 'badge',
  'buttons': 'button',
  'button-group': 'buttonGroup',
  'calendars': 'calendar',
  'cards': 'card',
  'drawers': 'drawer',
  'dropdowns': 'dropdown',
  'forms': 'form',
  'gallery': 'gallery',
  'input-fields': 'inputField',
  'modals': 'modal',
  'navigation': 'navigation',
  'app-shells': 'shell',
  'sidebars': 'sidebar',
  'speed-dial': 'speedDial',
  'tabs': 'tab',
  'toast': 'toast',
  'toggles': 'toggle'
};

// ============================================================================
// STEP 3: Variant Detection System
// ============================================================================

function detectVariant(name, type) {
  const lowerName = name.toLowerCase();

  // Button variants
  if (type === 'button') {
    if (lowerName.includes('outline')) return 'outline';
    if (lowerName.includes('gradient')) return 'gradient';
    if (lowerName.includes('loading') || lowerName.includes('spinner')) return 'loading';
    if (lowerName.includes('raised') || lowerName.includes('elevated')) return 'raised';
    if (lowerName.includes('icon')) return 'icon';
    return 'classic'; // default
  }

  // Badge variants
  if (type === 'badge') {
    if (lowerName.includes('outlined') && lowerName.includes('pills')) return 'outlined-pills';
    if (lowerName.includes('pills')) return 'pills';
    if (lowerName.includes('border') || lowerName.includes('outlined')) return 'border';
    return 'simple'; // default
  }

  // Toggle variants
  if (type === 'toggle') {
    if (lowerName.includes('on') && lowerName.includes('off')) return 'on-off';
    if (lowerName.includes('square')) return 'square';
    if (lowerName.includes('lock')) return 'lock';
    if (lowerName.includes('check') || lowerName.includes('x')) return 'check-x';
    if (lowerName.includes('outline')) return 'outline';
    return 'basic'; // default
  }

  // Modal variants
  if (type === 'modal') {
    if (lowerName.includes('input')) return 'input';
    if (lowerName.includes('confirmation') || lowerName.includes('confirm')) return 'confirmation';
    if (lowerName.includes('success')) return 'success';
    if (lowerName.includes('warning')) return 'warning';
    if (lowerName.includes('info')) return 'info';
    if (lowerName.includes('error')) return 'error';
    if (lowerName.includes('form') && lowerName.includes('submit')) return 'form-submit';
    if (lowerName.includes('logout')) return 'logout';
    if (lowerName.includes('unsaved')) return 'unsaved';
    if (lowerName.includes('permission')) return 'permission';
    return 'basic'; // default
  }

  // Tab variants
  if (type === 'tab') {
    if (lowerName.includes('v2')) return 'v2';
    if (lowerName.includes('pill') && lowerName.includes('animated')) return 'animated-pill';
    if (lowerName.includes('pill')) return 'pill';
    if (lowerName.includes('segmented')) return 'segmented';
    if (lowerName.includes('animated') && lowerName.includes('underline')) return 'animated-underline';
    return 'basic'; // default
  }

  // No variants for other types yet
  return 'default';
}

// ============================================================================
// STEP 4: Variant Modifier Functions
// ============================================================================

const variantModifiers = {
  button: {
    classic: (base) => base,
    outline: (base) => ({
      ...base,
      fillColor: 'RGBA(255, 255, 255, 0)', // transparent
      textColor: 'RGBA(59, 130, 246, 1)',
      borderColor: 'RGBA(59, 130, 246, 1)',
      borderThickness: 2
    }),
    gradient: (base) => ({
      ...base,
      gradientStartColor: 'RGBA(124, 58, 237, 1)',
      gradientEndColor: 'RGBA(192, 38, 211, 1)',
      textColor: 'RGBA(255, 255, 255, 1)',
      radius: 8
    }),
    raised: (base) => ({
      ...base,
      fillColor: 'RGBA(59, 130, 246, 1)',
      textColor: 'RGBA(255, 255, 255, 1)',
      dropShadow: true
    }),
    icon: (base) => ({
      ...base,
      icon: 'Settings',
      iconPosition: 'left'
    }),
    loading: (base) => ({
      ...base,
      text: 'Loading...',
      loadingState: false,
      spinnerColor: 'RGBA(255, 255, 255, 1)'
    })
  },

  badge: {
    simple: (base) => base,
    border: (base) => ({
      ...base,
      fillColor: 'RGBA(255, 255, 255, 1)',
      textColor: 'RGBA(59, 130, 246, 1)',
      borderColor: 'RGBA(59, 130, 246, 1)',
      borderThickness: 2
    }),
    pills: (base) => ({
      ...base,
      radius: 16
    }),
    'outlined-pills': (base) => ({
      ...base,
      fillColor: 'RGBA(255, 255, 255, 1)',
      textColor: 'RGBA(59, 130, 246, 1)',
      borderColor: 'RGBA(59, 130, 246, 1)',
      borderThickness: 2,
      radius: 16
    })
  },

  toggle: {
    basic: (base) => base,
    'on-off': (base) => ({
      ...base,
      showLabels: true,
      onLabel: 'ON',
      offLabel: 'OFF'
    }),
    square: (base) => ({
      ...base,
      squareCorners: true
    }),
    lock: (base) => ({
      ...base,
      icon: 'Lock'
    }),
    'check-x': (base) => ({
      ...base,
      checkedIcon: 'Check',
      uncheckedIcon: 'X'
    }),
    outline: (base) => ({
      ...base,
      outlined: true
    })
  },

  modal: {
    basic: (base) => base,
    input: (base) => ({
      ...base,
      hasInput: true,
      inputLabel: 'Enter value',
      inputPlaceholder: 'Type here...'
    }),
    confirmation: (base) => ({
      ...base,
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed?',
      primaryButtonText: 'Yes',
      secondaryButtonText: 'No'
    }),
    success: (base) => ({
      ...base,
      title: 'Success',
      message: 'Operation completed successfully',
      icon: 'CheckCircle',
      iconColor: 'RGBA(34, 197, 94, 1)'
    }),
    warning: (base) => ({
      ...base,
      title: 'Warning',
      message: 'Please review before continuing',
      icon: 'AlertTriangle',
      iconColor: 'RGBA(234, 179, 8, 1)'
    }),
    info: (base) => ({
      ...base,
      title: 'Information',
      message: 'Here is some important information',
      icon: 'Info',
      iconColor: 'RGBA(59, 130, 246, 1)'
    }),
    error: (base) => ({
      ...base,
      title: 'Error',
      message: 'An error occurred',
      icon: 'XCircle',
      iconColor: 'RGBA(239, 68, 68, 1)'
    }),
    'form-submit': (base) => ({
      ...base,
      title: 'Submit Form',
      message: 'Submit your information?',
      primaryButtonText: 'Submit',
      secondaryButtonText: 'Cancel'
    }),
    logout: (base) => ({
      ...base,
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      primaryButtonText: 'Logout',
      secondaryButtonText: 'Cancel'
    }),
    unsaved: (base) => ({
      ...base,
      title: 'Unsaved Changes',
      message: 'You have unsaved changes. What would you like to do?',
      primaryButtonText: 'Save',
      secondaryButtonText: 'Discard',
      tertiaryButtonText: 'Cancel'
    }),
    permission: (base) => ({
      ...base,
      title: 'Permission Request',
      message: 'This app would like to access your data',
      primaryButtonText: 'Grant',
      secondaryButtonText: 'Deny'
    })
  },

  tab: {
    basic: (base) => base,
    v2: (base) => ({
      ...base,
      enhancedStyle: true
    }),
    pill: (base) => ({
      ...base,
      pillStyle: true,
      radius: 16
    }),
    segmented: (base) => ({
      ...base,
      segmentedStyle: true
    }),
    'animated-underline': (base) => ({
      ...base,
      animatedUnderline: true
    }),
    'animated-pill': (base) => ({
      ...base,
      pillStyle: true,
      animated: true,
      radius: 16
    })
  }
};

// ============================================================================
// STEP 5: Get Base Template for Component Type
// ============================================================================

function getBaseTemplate(type) {
  // Type-specific base templates with required structure
  const baseTemplates = {
    'accordion': {
      type: 'accordion',
      items: [
        { id: '1', title: 'Section 1', content: 'Content for section 1' },
        { id: '2', title: 'Section 2', content: 'Content for section 2' }
      ]
    },
    'animation': {
      type: 'animation',
      animationType: 'progress',
      duration: 1000,
      fillColor: 'RGBA(59, 130, 246, 1)'
    },
    'badge': {
      type: 'badge',
      text: 'Badge',
      theme: 'primary',
      fillColor: 'RGBA(59, 130, 246, 1)',
      textColor: 'RGBA(255, 255, 255, 1)',
      radius: 4
    },
    'button': {
      type: 'button',
      text: 'Button',
      fillColor: 'RGBA(59, 130, 246, 1)',
      textColor: 'RGBA(255, 255, 255, 1)',
      radius: 4
    },
    'buttonGroup': {
      type: 'buttonGroup',
      buttons: [
        { id: '1', text: 'Option 1' },
        { id: '2', text: 'Option 2' },
        { id: '3', text: 'Option 3' }
      ],
      orientation: 'horizontal'
    },
    'calendar': {
      type: 'calendar',
      showHeader: true,
      primaryColor: 'RGBA(59, 130, 246, 1)'
    },
    'card': {
      type: 'card',
      title: 'Card Title',
      content: 'Card content goes here',
      fillColor: 'RGBA(255, 255, 255, 1)',
      borderColor: 'RGBA(226, 232, 240, 1)'
    },
    'drawer': {
      type: 'drawer',
      title: 'Drawer',
      position: 'right',
      primaryColor: 'RGBA(30, 41, 59, 1)'
    },
    'dropdown': {
      type: 'dropdown',
      items: [
        { id: '1', label: 'Option 1' },
        { id: '2', label: 'Option 2' },
        { id: '3', label: 'Option 3' }
      ],
      placeholder: 'Select option'
    },
    'form': {
      type: 'form',
      title: 'Form Title',
      subtitle: 'Form subtitle',
      fields: [
        { id: '1', label: 'Field 1', placeholder: 'Enter value' },
        { id: '2', label: 'Field 2', placeholder: 'Enter value' }
      ],
      primaryButtonText: 'Submit',
      secondaryButtonText: 'Cancel'
    },
    'gallery': {
      type: 'gallery',
      items: [
        { id: '1', title: 'Item 1', image: 'placeholder.png' },
        { id: '2', title: 'Item 2', image: 'placeholder.png' },
        { id: '3', title: 'Item 3', image: 'placeholder.png' }
      ],
      columns: 3
    },
    'inputField': {
      type: 'inputField',
      label: 'Input Field',
      placeholder: 'Enter text',
      borderColor: 'RGBA(226, 232, 240, 1)'
    },
    'modal': {
      type: 'modal',
      title: 'Modal Title',
      message: 'Modal message',
      primaryButtonText: 'OK',
      secondaryButtonText: 'Cancel'
    },
    'navigation': {
      type: 'navigation',
      items: [
        { id: '1', label: 'Home', icon: 'Home' },
        { id: '2', label: 'Settings', icon: 'Settings' },
        { id: '3', label: 'Profile', icon: 'User' }
      ],
      primaryColor: 'RGBA(15, 23, 42, 1)'
    },
    'shell': {
      type: 'shell',
      appName: 'App',
      showSidebar: true,
      primaryColor: 'RGBA(15, 23, 42, 1)'
    },
    'sidebar': {
      type: 'sidebar',
      items: [
        { id: '1', label: 'Dashboard', icon: 'LayoutDashboard' },
        { id: '2', label: 'Users', icon: 'Users' },
        { id: '3', label: 'Settings', icon: 'Settings' }
      ],
      primaryColor: 'RGBA(30, 41, 59, 1)'
    },
    'speedDial': {
      type: 'speedDial',
      mainIcon: 'Plus',
      actions: [
        { id: '1', label: 'Action 1', icon: 'Edit' },
        { id: '2', label: 'Action 2', icon: 'Trash' },
        { id: '3', label: 'Action 3', icon: 'Share' }
      ]
    },
    'tab': {
      type: 'tab',
      tabs: [
        { id: '1', label: 'Tab 1' },
        { id: '2', label: 'Tab 2' },
        { id: '3', label: 'Tab 3' }
      ],
      selectedTab: 1
    },
    'toast': {
      type: 'toast',
      message: 'Notification message',
      type: 'info',
      duration: 3000
    },
    'toggle': {
      type: 'toggle',
      defaultValue: false,
      fillColor: 'RGBA(59, 130, 246, 1)'
    }
  };

  // Return deep copy of base template
  const template = baseTemplates[type];
  if (template) {
    return JSON.parse(JSON.stringify(template));
  }

  // Fallback for unknown types
  return {
    type: type,
    text: 'Component',
    fillColor: 'RGBA(59, 130, 246, 1)',
    textColor: 'RGBA(255, 255, 255, 1)',
    radius: 4
  };
}

// ============================================================================
// STEP 6: Generate YAML for Each Component
// ============================================================================

console.log('⚙️  Generating YAML for all components...\n');

const results = [];
let successCount = 0;
let errorCount = 0;

for (const component of components) {
  try {
    // Determine component type from category
    const type = categoryToType[component.category];

    if (!type) {
      console.warn(`⚠️  Unknown category: ${component.category} for ${component.name}`);
      errorCount++;
      continue;
    }

    // Detect variant
    const variant = detectVariant(component.name, type);

    // Get base template
    let settings = getBaseTemplate(type);

    // Apply variant modifier if exists
    if (variantModifiers[type] && variantModifiers[type][variant]) {
      settings = variantModifiers[type][variant](settings);
    }

    // Generate YAML
    const yaml = generatePowerAppsYAML(component.name, settings);

    results.push({
      id: component.id,
      name: component.name,
      category: component.category,
      type: type,
      variant: variant,
      yaml: yaml
    });

    successCount++;
    console.log(`✅ ${component.name} (${type}:${variant})`);

  } catch (error) {
    console.error(`❌ Error generating YAML for ${component.name}:`, error.message);
    errorCount++;
  }
}

console.log(`\n📊 Results: ${successCount} success, ${errorCount} errors\n`);

// ============================================================================
// STEP 7: Generate SQL Migration File
// ============================================================================

console.log('📝 Generating SQL migration file...\n');

let migration = `-- Migration: Update all components with real Power Apps YAML
-- Generated automatically by scripts/generate-yaml.mjs
-- Date: ${new Date().toISOString()}

`;

for (const result of results) {
  // Escape single quotes for SQL
  const escapedYaml = result.yaml.replace(/'/g, "''");

  migration += `-- ${result.name} (${result.type}:${result.variant})\n`;
  migration += `UPDATE components\n`;
  migration += `SET yaml = '${escapedYaml}'\n`;
  migration += `WHERE id = '${result.id}';\n\n`;
}

// Write migration file
const outputPath = path.join(__dirname, '../migrations/004_update_yaml.sql');
fs.writeFileSync(outputPath, migration);

console.log(`✅ Migration file created: migrations/004_update_yaml.sql\n`);
console.log(`📌 Next steps:`);
console.log(`1. npx wrangler d1 migrations apply component-library --local`);
console.log(`2. npm run dev`);
console.log(`3. Visit http://localhost:5173/library`);
console.log(`4. Test each category to verify components render correctly`);
console.log(`\n🎉 YAML generation complete!\n`);
