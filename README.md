# PowerLibs Component Library

A React web application for creating, previewing, and managing Power Apps Canvas YAML components. Build UI components visually and export them as Power Apps-compatible YAML.

**Live Demo:** [Deployed on Cloudflare Pages]

## Features

- 🎨 **19 Component Categories**: Buttons, forms, badges, accordions, modals, galleries, calendars, and more
- 👁️ **Live Preview**: See components render in real-time as you configure them
- 📋 **YAML Export**: Copy Power Apps-compatible YAML with one click
- 🛠️ **Admin Interface**: Full CRUD operations for component management
- 🚀 **Serverless Backend**: Cloudflare Pages Functions + D1 database
- ⚡ **Fast Development**: Vite HMR for instant frontend updates

## Quick Start

```bash
# Install dependencies
npm install

# Start development servers (both frontend and backend)
npm run dev
```

Open http://localhost:5173 in your browser.

## Tech Stack

- **Frontend**: React 19, React Router, Tailwind CSS 4, Vite 7
- **Backend**: Cloudflare Pages Functions (serverless)
- **Database**: Cloudflare D1 (SQLite at the edge)
- **Deployment**: Cloudflare Pages with automatic CI/CD

## Development Guide

### Architecture

This project uses a **dual-server development setup**:

1. **Vite Dev Server** (port 5173) - Frontend with Hot Module Replacement (HMR)
2. **Wrangler Dev Server** (port 8788) - Backend API with Cloudflare Pages Functions

The Vite dev server proxies all `/api/*` requests to the Wrangler dev server, simulating the production environment.

**Request flow during development:**

```
Browser → http://localhost:5173/api/categories
         ↓ (Vite proxy)
         → http://localhost:8788/api/categories
         ↓ (Wrangler executes Functions)
         → D1 Database Query
         ↓
         ← JSON Response
```

### Available Commands

#### Development

```bash
# Start both servers concurrently (recommended)
npm run dev

# Start only Wrangler (backend API)
npm run dev:wrangler

# Start only Vite (frontend - requires Wrangler running separately)
npm run dev:vite
```

#### Production Preview

```bash
# Build the frontend
npm run build

# Serve built assets with Wrangler (production-like environment)
npm run pages:dev
```

Open http://localhost:8788 to test the production build.

#### Other Commands

```bash
# Lint code
npm run lint

# Preview Vite build (without Cloudflare Functions)
npm run preview

# Run D1 migrations (local)
npx wrangler d1 migrations apply component-library --local

# Run D1 migrations (production)
npx wrangler d1 migrations apply component-library --remote

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

### Project Structure

```
component-gen/
├── src/                        # Frontend source code
│   ├── pages/                  # Route components
│   │   ├── Home.jsx            # Category grid
│   │   ├── Library.jsx         # Full component library
│   │   ├── Category.jsx        # Category-specific components
│   │   └── Admin.jsx           # Admin CRUD interface
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── ComponentCard.jsx
│   │   ├── ComponentPreview.jsx
│   │   ├── ComponentSettings.jsx
│   │   └── YamlViewer.jsx
│   ├── lib/                    # Core logic
│   │   ├── api.js              # API client (fetch wrapper)
│   │   ├── yaml.js             # YAML generation/parsing
│   │   ├── templates.js        # Component templates & defaults
│   │   └── ai.js               # Gemini AI (legacy, unused)
│   └── main.jsx                # React entry point
├── functions/                  # Cloudflare Pages Functions (backend API)
│   └── api/
│       ├── categories.js       # GET /api/categories
│       ├── components/
│       │   ├── index.js        # GET/POST /api/components
│       │   └── [id].js         # GET/PUT/DELETE /api/components/:id
├── migrations/                 # D1 database migrations
│   └── 001_initial.sql         # Schema + seed data
├── dist/                       # Production build output (generated)
├── vite.config.js              # Vite configuration with proxy
├── wrangler.toml               # Cloudflare Pages configuration
└── package.json                # Dependencies and scripts
```

## API Endpoints

All endpoints return JSON:

- `GET /api/categories` - List all component categories
- `GET /api/components` - List all components (optional `?category=slug` filter)
- `GET /api/components/:id` - Get single component
- `POST /api/components` - Create new component (admin)
- `PUT /api/components/:id` - Update component (admin)
- `DELETE /api/components/:id` - Delete component (admin)

## Component Types

Currently supported (19 types):

- **Basic**: `button`, `badge`, `inputField`, `toggle`, `dropdown`
- **Layout**: `form`, `card`, `shell`, `drawer`, `sidebar`
- **Navigation**: `navigation`, `tab`, `buttonGroup`
- **Interactive**: `accordion`, `modal`, `toast`, `speedDial`
- **Advanced**: `gallery`, `calendar`, `animation`

### Adding a New Component Type

To add a new component category, modify these 6 files:

1. **`migrations/001_initial.sql`** - Add category to INSERT INTO categories
2. **`src/lib/templates.js`** - Add default template to INITIAL_TEMPLATES
3. **`src/components/ComponentCard.jsx`** - Update `typeMap` for slug-to-type mapping
4. **`src/components/ComponentPreview.jsx`** - Add rendering logic for the new type
5. **`src/components/ComponentSettings.jsx`** - Add settings form UI
6. **`src/lib/yaml.js`** - Add YAML generation logic in `generatePowerAppsYAML()`

See `CLAUDE.md` for detailed instructions.

## Troubleshooting

### Port Already in Use

```bash
# Kill port 5173 (Vite)
npx kill-port 5173

# Kill port 8788 (Wrangler)
npx kill-port 8788
```

### API Returns HTML Instead of JSON

**Symptom**: `Error: Unexpected token '<', "<!doctype "... is not valid JSON`

**Cause**: Wrangler dev server is not running

**Fix**: Always use `npm run dev` to start both servers

### D1 Database Errors

```bash
# Apply migrations to local database
npx wrangler d1 migrations apply component-library --local

# If still failing, reset local database
rm -rf .wrangler
npm run dev
```

### Changes Not Reflected

- **Frontend changes**: Vite HMR should update instantly (Ctrl+Shift+R to hard refresh)
- **Backend changes**: Wrangler auto-restarts when Functions files change
- If not, restart `npm run dev` manually

## Deployment

### Prerequisites

1. Cloudflare account with Pages enabled
2. Wrangler CLI authenticated: `npx wrangler login`
3. D1 database created and configured in `wrangler.toml`

### Deploy Steps

```bash
# 1. Run migrations to production database
npx wrangler d1 migrations apply component-library --remote

# 2. Build the frontend
npm run build

# 3. Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

Your site will be available at `https://<project-name>.pages.dev`

### Environment Variables

No environment variables required. The project uses Cloudflare D1 bindings configured in `wrangler.toml`.

## Development vs Production

| Aspect | Development (`npm run dev`) | Production (Cloudflare Pages) |
|--------|----------------------------|------------------------------|
| Servers | Vite (5173) + Wrangler (8788) | Single Cloudflare edge server |
| Routing | Vite proxy to Wrangler | Direct routing to Functions |
| HMR | ✅ Instant updates | ❌ Requires rebuild |
| Database | Local D1 in `.wrangler/state/` | Remote D1 (production) |
| CDN | ❌ Local only | ✅ Global edge network |

## Hot Tips

### Fast Iteration

1. Keep `npm run dev` running in the background
2. Edit React components → see changes instantly
3. Edit Functions → Wrangler auto-restarts in ~1 second
4. Edit templates in `src/lib/templates.js` → changes reflect immediately

### Testing Production Build

Before deploying:

```bash
npm run build
npm run pages:dev
```

Visit http://localhost:8788 to verify everything works with built assets.

### Debugging API Calls

Open browser DevTools → Network tab:

- Filter by "Fetch/XHR"
- Look for requests to `/api/*`
- Check response status and payload
- Verify JSON responses (not HTML)

## Project Status

**Current Phase**: Phase 5 - Galleries, Calendars, and Animations

See `plans/research.md` for the complete implementation roadmap and progress tracking.

## Contributing

This is a PowerLibs internal tool. For contributions:

1. Check `plans/research.md` for current phase and priorities
2. Follow patterns in `CLAUDE.md` for component implementation
3. Test locally with `npm run dev`
4. Test production build with `npm run build && npm run pages:dev`
5. Deploy to Cloudflare Pages

## Resources

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Cloudflare D1 Database](https://developers.cloudflare.com/d1/)
- [Vite Proxy Configuration](https://vite.dev/config/server-options.html#server-proxy)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Power Apps Canvas Components](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/component-library)

## License

Proprietary - PowerLibs Internal Tool

---

**Need help?** Check `CLAUDE.md` for project-specific guidance and architecture details.
