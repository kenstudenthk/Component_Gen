# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This is a React-based Power Apps Component Builder that generates YAML configurations for Microsoft Power Apps Canvas components. The application uses Google's Gemini AI API to provide intelligent form generation and styling suggestions.

## Architecture

### Single-File Application
The entire application is contained in `App.jsx` - a monolithic React component. This design choice prioritizes simplicity and ease of deployment over modularity.

### Core Subsystems

**Component Templates System** (`TEMPLATES` object)
Defines pre-built configurations for different component types: Dynamic Form Cards, Buttons, Badges, Accordions, and App Shells. Each template contains type-specific properties that drive both the preview rendering and YAML generation.

**YAML Generator** (`generatePowerAppsYAML` function)
Transforms JavaScript settings objects into Power Apps YAML format. The generator builds component hierarchies with proper indentation and Power Apps formula syntax (e.g., `=RGBA(...)`, `=Parent.Width`).

**AI Integration** (`callGemini` function)
Uses Google Gemini 2.5 Flash with structured output (JSON schema) for two capabilities:
- Form generation: Converts natural language descriptions into structured form fields
- Style suggestion: Recommends accessible color palettes based on theme descriptions

Implements exponential backoff retry logic (5 retries, starting at 1s delay) for API resilience.

**State Management**
Single-component state using React hooks:
- `activeComponent`: Currently selected component type
- `settings`: Dynamic configuration object matching the active component's schema
- `activeTab`: UI mode toggle (Settings vs Preview)
- `aiLoading`: AI operation status
- `aiPrompt`: User input for AI features

### Data Flow
1. User selects component from sidebar → loads corresponding TEMPLATE
2. User modifies settings → updates `settings` state
3. Settings feed into:
   - Preview renderer (conditional JSX based on `settings.type`)
   - YAML generator (invoked on copy action)
4. AI operations modify settings directly via state setters

## Development

### Running the Application
This appears to be a standalone React component designed for embedding. There is no package.json or build configuration visible, suggesting it may be:
- Integrated into a larger application
- Deployed via a platform like CodeSandbox, StackBlitz, or similar
- Bundled externally

If you need to run this locally, you'll need to create a build setup (e.g., Vite, Create React App) and ensure:
- React 18+ is installed
- `lucide-react` icon library is available
- Tailwind CSS is configured (the component uses utility classes extensively)

### API Key Management
The Gemini API key is defined at the top of the file as `const apiKey = ""`. 

**IMPORTANT**: 
- Never commit API keys to version control
- When deploying, inject the API key via environment variables
- For local development, use a `.env` file (add to `.gitignore`)

### Component Type System
When adding new component types:
1. Add template to `TEMPLATES` object with a unique `type` field
2. Implement YAML generation logic in `generatePowerAppsYAML`
3. Add preview rendering in the Preview tab conditional block
4. Add settings UI in the Settings tab conditional block
5. Update `SIDEBAR_ITEMS` with appropriate icon and label

### YAML Generation Guidelines
Power Apps YAML follows a strict hierarchy:
- Controls are nested using `Children:` arrays
- Properties use Power Apps formula syntax with `=` prefix
- RGBA colors must be formatted as `RGBA(r, g, b, a)`
- Positioning uses absolute coordinates (`X`, `Y`)
- All indentation must be exactly 2 spaces

### AI Schema Design
When modifying AI features, ensure JSON schemas are well-defined:
- Use `type: "OBJECT"` for structured responses
- Define all expected properties explicitly
- Use `type: "ARRAY"` for collections with `items` definition
- Keep prompts concise but precise - the model responds better to clear constraints

### Styling System
The application uses a dark theme with specific color palette:
- Background: `#0f1115` (main), `#16191e` (elevated surfaces)
- Borders: `slate-800`
- Text: `slate-300` (body), `white` (headings)
- Accent: `blue-600` and variants

All styling is inline Tailwind - there are no external stylesheets.

## Code Patterns

### State Updates for Form Components
Form field modifications use immutability patterns:
```javascript
setSettings(prev => ({
  ...prev,
  fields: prev.fields.map(f => f.id === id ? { ...f, [key]: value } : f)
}))
```

### AI Error Handling
All AI functions follow the pattern:
1. Set loading state
2. Clear previous errors
3. Try AI call with structured schema
4. Parse and apply results
5. Catch and display user-friendly error
6. Always reset loading state in finally block

### Clipboard API
Uses legacy `document.execCommand('copy')` for maximum compatibility. Modern Clipboard API may be preferred for newer browsers.
