# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Power Apps Canvas YAML Generator — a single-file React application (`App.jsx`) that lets users visually configure UI components and export them as Power Apps Canvas YAML. Includes a Gemini AI assistant for form generation and color palette suggestions.

## Architecture

**Single-file app**: The entire application lives in `App.jsx` (~520 lines). There is no build system, package manager, or test framework in this repo. The file is designed to be embedded in an external host (CodeSandbox, StackBlitz, or a larger app).

**Key sections in App.jsx:**
- **TEMPLATES** (line ~30): Static object defining 5 component types (`form`, `button`, `badge`, `accordion`, `shell`), each with a `type` discriminator
- **SIDEBAR_ITEMS** (line ~70): Navigation structure grouped into Components, Tools, Other Resources, Your Libraries
- **callGemini()** (line ~84): REST client for Google Gemini API with exponential backoff retry (5 retries, 1s→2s→4s→...)
- **generatePowerAppsYAML()** (line ~122): Pure function that switches on `settings.type` to build Power Apps YAML strings. Property values use `=` prefix (Power Apps formula syntax)
- **App component** (line ~166): All UI state managed via `useState` hooks

**Data flow:**
```
Sidebar click → loads TEMPLATE into settings state
Settings edits → immutable state updates (spread operator)
"Copy YAML" → generatePowerAppsYAML(activeComponent, settings) → clipboard
AI prompt → callGemini() → parse JSON → setSettings()
```

## Dependencies (provided by host environment)

- React 18+
- `lucide-react` (icons)
- Tailwind CSS (utility classes, dark theme)

## Environment Variables

The Gemini API key is referenced at line 27 as `const apiKey = ""`. This must be populated at deploy time — never commit the actual key.

- AI model: `gemini-2.5-flash-preview-09-2025`
- API endpoint: `generativelanguage.googleapis.com/v1beta`

## Component Types

Each component type has a distinct settings shape and YAML output format:

| Type | Template Key | AI Action |
|------|-------------|-----------|
| `form` | Dynamic Form Card | Generate form fields from description |
| `button` | Buttons | Suggest color palette |
| `badge` | Badge | Suggest color palette |
| `accordion` | Accordions | Suggest color palette |
| `shell` | App Shells | Suggest color palette |

## Key Patterns

- **YAML output uses absolute positioning** — all coordinates (X, Y) are hardcoded pixel values
- **Power Apps formula syntax** — property values are prefixed with `=` (e.g., `Fill: =RGBA(59, 130, 246, 1)`)
- **AI responses use structured JSON schema** — `responseSchema` in `generationConfig` constrains Gemini output
- **Clipboard uses legacy `document.execCommand('copy')`** — not the modern Clipboard API

## Component/ Subdirectory

This is a separate git repository (submodule) containing only a stub README. It is not part of the main application.
