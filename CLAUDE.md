# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PowerLibs Component Library — A React web application for creating, previewing, and managing Power Apps Canvas YAML components. Users can visually configure UI components (buttons, forms, badges, etc.) and export them as Power Apps-compatible YAML. Deployed on Cloudflare Pages with D1 database backend.

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (Vite + Wrangler with API proxy)
npm run dev

# Start individual servers (if needed)
npm run vite:dev      # Vite only (port 5173)
npm run wrangler:dev  # Wrangler only (port 8788)
npm run pages:dev     # Wrangler with dist (legacy)

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist

# Run D1 migrations
npx wrangler d1 migrations apply component-library --remote

# Generate component YAML
node scripts/generate-yaml.mjs
```

**Note:** `npm run dev` starts both Vite and Wrangler concurrently. Vite proxies `/api/*` requests to Wrangler, enabling fast HMR while maintaining full backend functionality. Both servers must be running for the application to work correctly.

## Architecture

### Frontend (Vite + React)

**Multi-page app with React Router:**
- `/` - Home page with category grid
- `/library` - Full component library view
- `/library/:slug` - Category-specific component list
- `/admin` - Admin CRUD interface
- `/admin/new` - Create new component
- `/admin/edit/:id` - Edit existing component

**Key directories:**
- `src/pages/` - Route components (Home, Library, Category, Admin)
- `src/components/` - Reusable UI components (Navbar, ComponentCard, ComponentPreview, ComponentSettings, YamlViewer)
- `src/lib/` - Core logic modules (api.js, yaml.js, templates.js, ai.js)

### Backend (Cloudflare Pages Functions + D1)

**API endpoints** (`functions/api/`):
- `GET /api/categories` - List all categories
- `GET /api/components?category=slug` - List components (optionally filtered by category)
- `GET /api/components/:id` - Get single component
- `POST /api/components` - Create component
- `PUT /api/components/:id` - Update component
- `DELETE /api/components/:id` - Delete component

**Database** (Cloudflare D1 SQLite):
- `categories` table - Component categories (19 types: buttons, forms, accordions, etc.)
- `components` table - Individual component definitions with YAML

**Migrations**:
- `001_initial.sql` - Schema + 20 categories
- `002_seed_components.sql` - 5 sample components (deprecated)
- `003_library_content.sql` - 84 components (with placeholder YAML)
- `004_update_yaml.sql` - Generated migration (replaces placeholders with real YAML)

## Component Architecture

### Component Types

Each component has a `type` property that determines its preview rendering, settings form, and YAML generation:

**Currently supported (19 types):**
`form`, `button`, `badge`, `accordion`, `shell`, `drawer`, `inputField`, `toggle`, `dropdown`, `buttonGroup`, `card`, `navigation`, `sidebar`, `tab`, `modal`, `toast`, `speedDial`, `gallery`, `calendar`, `animation`

### Data Flow

```
1. User selects component template → loads settings from INITIAL_TEMPLATES (templates.js)
2. User edits settings → immutable state updates via setState
3. Preview updates → ComponentPreview.jsx renders based on settings.type
4. User clicks "Copy YAML" → generatePowerAppsYAML(settings) → clipboard
5. Admin saves → POST/PUT to /api/components → stored in D1 database
```

### Adding a New Component Type

To add a new component category, modify these 6 files:

1. **`migrations/001_initial.sql`** - Add category to INSERT INTO categories
2. **`src/lib/templates.js`** - Add default template to INITIAL_TEMPLATES and sidebar link to INITIAL_SIDEBAR_ITEMS
3. **`src/components/ComponentCard.jsx`** - Update `typeMap` for slug-to-type mapping
4. **`src/components/ComponentPreview.jsx`** - Add rendering logic for `settings.type === "newType"`
5. **`src/components/ComponentSettings.jsx`** - Add settings form UI for the new type
6. **`src/lib/yaml.js`** - Add YAML generation logic in `generatePowerAppsYAML()` and parsing in `parsePowerAppsYAML()`

## Key Modules

### `src/lib/yaml.js`

**Core YAML generation:** `generatePowerAppsYAML(settings)` - Switches on `settings.type` to build Power Apps YAML strings
**Key helpers:**
- `yamlControl(indent, name, type, props, children, variant)` - Generates a single control block
- `yamlSafeValue(value)` - Escapes YAML special characters
- `sanitizeYamlText(text)` - Strips `#` and `:` from user input (breaks YAML formulas)
- `parsePowerAppsYAML(yaml)` - Extracts settings from YAML strings

**Power Apps formula syntax:** All property values use `=` prefix (e.g., `Fill: =RGBA(59, 130, 246, 1)`)

### `src/lib/templates.js`

**INITIAL_TEMPLATES** - Default settings for each component type
**INITIAL_SIDEBAR_ITEMS** - Navigation structure for library categories

### `src/lib/api.js`

REST API client using native `fetch()`. All endpoints return JSON. Base path: `/api`

### `src/lib/ai.js`

Gemini AI integration (currently unused - legacy from original single-file version). Model: `gemini-2.5-flash-preview-09-2025`

## YAML Generation System

The project includes an automated system for generating real Power Apps YAML for all component library entries.

### Overview

**Problem:** Migration file `003_library_content.sql` contains 84 components with placeholder YAML (just comments, not functional YAML). These cannot be previewed or used.

**Solution:** Automated script `scripts/generate-yaml.mjs` that:
- Reads component data from migrations
- Detects visual variants from component names
- Applies variant modifiers to base templates
- Generates real Power Apps YAML using `generatePowerAppsYAML()`
- Outputs migration file with UPDATE statements

### Variant Pattern System

Component names indicate visual variants that need different settings:

**Button variants:**
- "Classic Button" → Base filled button
- "Outline Button" → Transparent fill + border
- "Gradient Button" → Multi-color gradient
- "Loading Button with Spinner" → Loading state + spinner
- "Button Raised" → Drop shadow elevation
- "Classic Icon Button" → With icon

**Badge variants:**
- "Simple Badge" → Filled background
- "Border Badge" → Outlined with border
- "Pills Badge" → High border radius (16px)
- "Outlined Pills Badge" → Pills + border

**Toggle variants:**
- "Toggle" → Basic switch
- "Toggle On/Off" → With text labels
- "Toggle Square" → Square corners
- "Toggle Lock" → Lock icon variant
- "Toggle Check/X" → Checkmark/X icons
- "Toggle Outline" → Outlined style

**Modal variants:**
- "Input Modal" → With text input
- "Confirmation Modal" → Yes/No buttons
- "Success Modal" → Success icon + message
- "Warning Modal V2" → Warning icon + message
- "Info Modal" → Info icon + message
- "Error State Modal" → Error icon + message

### Usage

```bash
# Generate YAML for all components
node scripts/generate-yaml.mjs

# Apply the generated migration
npx wrangler d1 migrations apply component-library --local
npx wrangler d1 migrations apply component-library --remote
```

### Migration Structure

**001_initial.sql** - Schema + 20 categories (creates tables)
**002_seed_components.sql** - 5 sample components with real YAML (deprecated, replaced by 003)
**003_library_content.sql** - 84 components with placeholder YAML (source data)
**004_update_yaml.sql** - Generated migration that updates placeholders with real YAML

### Script Architecture

**Input:** Component data from `003_library_content.sql`
**Processing:**
1. Pattern matching detects variant type from component name
2. Base template loaded from `INITIAL_TEMPLATES` by category
3. Variant modifier applied to base settings
4. `generatePowerAppsYAML()` produces Power Apps YAML
**Output:** SQL migration with UPDATE/INSERT statements

### Adding New Variants

To add a new variant pattern:

1. Add pattern detection in `scripts/generate-yaml.mjs`:
   ```javascript
   if (name.includes('NewVariant')) {
     return 'new-variant';
   }
   ```

2. Add modifier function:
   ```javascript
   variantModifiers.button['new-variant'] = (base) => ({
     ...base,
     newProperty: value
   });
   ```

3. Regenerate YAML: `node scripts/generate-yaml.mjs`
4. Apply migration to update database

## Configuration

**Environment variables:**
- Gemini API key referenced but not actively used (in `ai.js`)

**Cloudflare deployment:**
- `wrangler.toml` - Cloudflare Pages and D1 database bindings
- `database_id` is environment-specific (production ID hardcoded)

**Vite config:**
- `vite.config.js` - Uses `@vitejs/plugin-react` and `@tailwindcss/vite`

**Development server:**
- Unified dev command uses `concurrently` to run Vite and Wrangler simultaneously
- Vite (port 5173) - Frontend with HMR
- Wrangler (port 8788) - Backend API with D1 database simulation
- API proxy: `/api/*` requests automatically forwarded from Vite to Wrangler
- Configuration: `vite.config.js` - Proxy settings in `server.proxy`

## Active Development

**Migration plan:** See `plans/research.md` for the roadmap to implement all 19 PowerLibs component categories. The project is currently in Phase 5 (Galleries, Calendars, Animations). Before implementing new features, check the plan to ensure alignment with the phased rollout.

**Verification checklist:** Track completed categories in `plans/research.md` under "TODO List for Implementation"

## Development Server Troubleshooting

**JSON parsing errors:**
- Symptom: `Error: Unexpected token '<', "<!doctype "... is not valid JSON`
- Cause: Wrangler server not running or proxy misconfigured
- Fix: Ensure `npm run dev` starts both servers, check console for port conflicts

**API requests failing:**
- Symptom: 404 errors for `/api/*` endpoints
- Cause: Wrangler not responding or D1 database not initialized
- Fix: Check Wrangler output, verify database bindings in `wrangler.toml`

**Port conflicts:**
- Symptom: "Port already in use" errors
- Fix: Kill processes on ports 5173 or 8788, or configure different ports

## Deployment

This is a Cloudflare Pages application. The frontend builds to `dist/` and Cloudflare Functions in `functions/` provide the backend API.

**Deploy steps:**
1. Run migrations: `npx wrangler d1 migrations apply component-library --remote`
2. Build: `npm run build`
3. Deploy: `npx wrangler pages deploy dist`

## Notes

- **Immutability**: All state updates use spread operator to create new objects
- **No test framework**: This is a prototype without tests (consider adding Vitest if test coverage becomes needed)
- **No TypeScript**: Pure JavaScript with JSX
- **Legacy code**: `App.jsx` in root is the OLD single-file version (deprecated, do not modify)
- **Submodule**: `everything-claude-code/` is a separate git repository for Claude Code configuration templates
