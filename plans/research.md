# PowerLibs-Style Component Library — Improvement Plan

**Reference:** https://www.powerlibs.com/library
**Goal:** Easy edit → instant preview → copy & paste YAML. Clean, distinct components per category.
**Date Updated:** 2026-02-27

**Status:**
- ✅ Phase 0: Database Cleanup - COMPLETED
- ✅ Phase 1: Component Library Content (87 components) - COMPLETED
- 🔄 Phase 2: UI/UX Improvements - IN PROGRESS
- ⬜ Phase 3: Admin Workflow Improvements - NOT STARTED

---

## Current State Assessment

### What Works Well (Keep As-Is)
- ✅ Real-time instant preview (better than PowerLibs — they show "No preview available")
- ✅ Type-specific editing forms for all 19 component types
- ✅ YAML generation + one-click clipboard copy
- ✅ All 19 category types already implemented in preview/settings/YAML
- ✅ Cloudflare Pages + D1 deployment

### Critical Issues Found

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 1 | 🔴 BUG | `comp-shell-default` uses category slug `shells` — doesn't exist, should be `app-shells` | `migrations/002_seed_components.sql` line 246 |
| 2 | 🔴 DUPLICATES | Production D1 has many identical-looking entries: `ButtonStart_5`, `ButtonStart_9`, `ButtonStart_12`, `ButtonStart_13` — all same visual effect | Remote DB |
| 3 | 🟡 CONTENT | Only 5 seed components across 4 categories. 15 out of 19 categories are empty | Local seed |
| 4 | 🟡 UX | Library page has no search, no filter, no component count per category | UI |
| 5 | 🟡 ADMIN | Creating components requires writing raw YAML manually — no visual builder | Admin UI |

---

## Design Philosophy: What Makes a "Distinct" Component

**The Problem (what to avoid):**
The production DB has `ButtonStart_5`, `ButtonStart_9`, `ButtonStart_12`, `ButtonStart_13` — all render as the same red-outlined box. Different names, identical visual result. This is the "duplicate" problem.

**The Rule:**
Each component entry must have a **visually distinct effect** from others in the same category. A user looking at the preview should immediately see what makes it different.

**Reference: PowerLibs' 8 Buttons (all genuinely different effects):**
1. Classic Button — solid fill, rounded, no extras
2. Outline Button — transparent fill, visible border only
3. Icon Button — icon beside the text label
4. Loading Spinner Button — animated spinner while action runs
5. Gradient Button — fill is a multi-color gradient
6. Raised Button — solid fill + strong drop shadow elevation
7. Ghost Button — no fill, no border, text only
8. Destructive Button — red/danger color for delete/warning actions

**Composite Components:**
Some components combine multiple types for real-world use cases:
- Login Card = Card + Form + Button
- Confirmation Modal = Modal + Button Group
- Settings Sidebar = Sidebar + Toggle list
- Data Table + Filter = Gallery + Dropdown

---

## ✅ Phase 0: Database Cleanup (COMPLETED)

### ✅ 0A. Fix the `shells` Bug
- ✅ Fixed: `migrations/002_seed_components.sql` changed `'shells'` → `'app-shells'` on line 246
- ✅ Migration re-applied locally, app-shells category loads correctly

### ✅ 0B. Clean Production Duplicate Entries
- ✅ Audited remote D1 database for duplicates
- ✅ Deleted auto-generated entries matching patterns `ButtonStart_N`, `btnS...`, `Classic/Button - btnS...`

### ✅ 0C. Cleanup Result
- ✅ Only intentional, manually curated entries remain

---

## ✅ Phase 1: Component Library Content (COMPLETED)

### Target: ~87 distinct components across 19 categories
No tiers — all components are free.
Each entry = genuinely different visual effect. Some entries are composites (combine multiple types).

---

### Buttons (8 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Classic Button | Solid fill, rounded corners |
| Outline Button | Transparent fill, border only |
| Icon + Text Button | Icon on left side of label |
| Loading State Button | Spinner replaces content while loading |
| Gradient Button | Left-to-right color gradient fill |
| Raised Button | Solid fill + strong drop shadow |
| Ghost Button | Text only, no fill, no border |
| Destructive Button | Red/danger color for delete actions |

### Forms (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Contact Form | Title + subtitle + 2 inputs + 2 action buttons |
| Login Form | Email + password + single submit |
| Registration Form | 3+ labeled fields with validation area |
| Search Bar | Single input + search icon button inline |
| **[Composite] Form Modal** | Form wrapped inside a modal overlay |

### Input Fields (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Text Input | Basic single-line input |
| Password Input | Masked characters + show/hide toggle |
| Labeled Input | Floating/stacked label above input |
| Input with Icon | Icon embedded inside left side |
| Multi-line Text Area | Taller, multi-row resizable input |

### Toggles (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Classic Toggle | Pill-shaped on/off switch |
| Square Toggle | Rectangular on/off switch |
| Toggle with Inline Label | Toggle + descriptive text beside it |
| Toggle with Check/X | Shows ✓ or ✗ instead of color indicator |
| **[Composite] Toggle Settings Group** | 2–3 labeled toggles stacked vertically |

### Dropdowns (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Basic Dropdown | Standard select box |
| Searchable Dropdown | Text filter input inside the list |
| Multi-select Dropdown | Multiple selections shown as chips |
| User Profile Dropdown | Avatar + name + action items |
| **[Composite] Nav Dropdown** | Dropdown embedded in a navigation bar |

### Button Groups (3 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Segmented Control | 2–3 options, one active at a time, joined |
| Icon Button Row | Row of icon-only square buttons |
| **[Composite] Toolbar** | Button group + icons + divider separator |

### Cards (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Info Card | Title + description + optional icon |
| Stats Card | Large metric number + label + trend indicator |
| Profile Card | Avatar + name + role + action button |
| Image Card | Top image area + content body below |
| **[Composite] Action Card** | Card with embedded Button Group at bottom |

### Navigation (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Top Navigation Bar | Full-width horizontal bar with links |
| Breadcrumb | Path trail: Home → Category → Page |
| Pagination | Previous / 1 2 3 / Next number controls |
| Bottom Tab Bar | Mobile-style icon tabs at bottom |
| **[Composite] Nav + Search** | Navigation bar with embedded search input |

### Sidebars (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Wide Sidebar | Full nav with icons + text labels |
| Narrow Sidebar | Icon-only collapsed version |
| Sidebar with Brand Header | Logo/brand area at top |
| Sidebar with Dividers | Grouped sections with separator lines |
| **[Composite] Settings Sidebar** | Sidebar with a toggle list for settings |

### Tabs (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Basic Tab Bar | Simple underline on active tab |
| Pill Tabs | Active tab has pill/capsule background |
| Segmented Tabs | All tabs inside a shared rounded container |
| Icon Tabs | Icon displayed above each tab label |
| Animated Underline Tabs | Sliding underline bar animation between tabs |

### Modals (6 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Simple Modal | Title + message + close button |
| Confirmation Modal | Title + message + Yes/No buttons |
| Warning Modal | Amber/red styling + warning icon |
| Success Modal | Green styling + checkmark icon |
| **[Composite] Form Modal** | Modal with input fields inside |
| **[Composite] Image Preview Modal** | Modal with large image display area |

### Toast Notifications (5 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Success Toast | Green left border + check icon |
| Error Toast | Red left border + X icon |
| Warning Toast | Amber left border + warning icon |
| Info Toast | Blue left border + info icon |
| Toast with Timer Bar | Progress bar showing auto-dismiss countdown |

### Speed Dial (3 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Corner FAB | Single floating action button, bottom-right |
| Expandable Speed Dial | Expands to reveal 3–4 sub-action buttons |
| **[Composite] FAB + Labels** | Each sub-action has a tooltip label |

### Badges (4 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Status Badge | Pill: Active / Inactive / Pending |
| Notification Count | Number bubble (e.g., "3 unread") |
| Outlined Badge | Border only, no fill |
| Icon + Label Badge | Small icon beside badge text |

### Accordions (4 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Basic Accordion | Plus/minus toggle, one section at a time |
| FAQ Accordion | Question list with expand/collapse answers |
| Card Accordion | Each section styled with card border |
| **[Composite] Settings Accordion** | Accordion with a toggle embedded per section |

### App Shells (4 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Top Nav Shell | Header bar + main content area below |
| Sidebar + Content Shell | Left sidebar + right content layout |
| Sidebar + Header Shell | Both sidebar and top nav header |
| Mobile App Shell | Bottom tab bar + scrollable content area |

### Drawers (4 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Bottom Drawer | Slides up from bottom of screen |
| Right Drawer | Slides in from right side |
| Left Nav Drawer | Full-height navigation drawer from left |
| **[Composite] Form Drawer** | Drawer containing an input form |

### Gallery / Data Lists (4 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Data Grid | Table-style rows and columns |
| Card Grid | 3-column responsive card grid |
| List View | Vertical rows: icon + title + detail + action |
| **[Composite] Gallery + Filter Bar** | Grid with dropdown filter control above |

### Calendars (3 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Month Calendar | Full month grid with date cells |
| Week View | 7-column week layout |
| Event Calendar | Month grid with colored event dot indicators |

### Animations (3 components)
| Name | Distinct Visual Effect |
|------|----------------------|
| Loading Spinner | Circular rotating spinner overlay |
| Skeleton Loader | Grey placeholder blocks while content loads |
| Progress Bar | Horizontal fill bar showing % complete |

---

**Total: ~87 distinct components across 19 categories**

---

## Phase 2: UI/UX Improvements (~2–3 days)

### Library Homepage
- Add component count per category card (e.g., "8 components")
- Add icons for all 19 categories (several are currently missing)
- Sort by `sort_order` from the DB

### Category Page
- Show category name and description at top
- Display "Showing X of Y" count
- In-category search bar (filter by component name)
- Empty state for categories with no components yet

### Component Card
- Ensure all 87 components render visible previews (no blank white boxes)
- Show component description below name
- Show category as a tag chip on the card

### Global Search
- Add search bar to `/library` page
- Searches by component name and tags
- Shows results grouped by category
- PowerLibs has no search — this is a competitive advantage

---

## Phase 3: Admin Workflow Improvements (~2–3 days)

### Visual Builder (Replace Raw YAML Entry)
**Problem:** The production DB duplicates (`ButtonStart_N`) were created by pasting raw YAML from Power Apps. This creates ugly auto-named entries.

**Solution — New Admin Create/Edit flow:**
1. Select component type from dropdown (button, form, card, etc.)
2. Visual settings form appears (reuses existing `ComponentSettings` component)
3. Live preview shows result in real time (reuses existing `ComponentPreview`)
4. YAML is auto-generated — admin never types YAML manually
5. Admin only fills in: name, description, tags, category

### Template Picker
- When creating, offer "Start from template" selector
- Preloads settings form with a named starting point
- Prevents creating blank/invisible components

### Duplicate Detection
- Before saving, check if same category already has a component with identical YAML
- Show warning: "A similar component may already exist: [Name]. Are you sure?"

---

## Phase 4: Migration Files Plan

| File | Purpose | Status |
|------|---------|--------|
| `migrations/001_initial.sql` | Schema + 19 category definitions | ✅ Done |
| `migrations/002_seed_components.sql` | Fix `shells` → `app-shells` bug; keep 4 clean components | 🔴 Fix needed |
| `migrations/003_library_content.sql` | NEW: Insert all 87 curated components | ⬜ To create |

**Production DB cleanup SQL (run before 003):**
```sql
DELETE FROM components WHERE name LIKE 'Button - Button%';
DELETE FROM components WHERE name LIKE 'Classic/Button%';
-- Add similar patterns for other auto-generated entries
```

---

## Implementation Priority

| Priority | Phase | Task | Effort |
|----------|-------|------|--------|
| P0 | 0A | Fix `shells` → `app-shells` bug | 30 min |
| P0 | 0B | Clean production DB duplicates | 1 hour |
| P1 | 3 | Visual builder in Admin (no raw YAML) | 2 days |
| P1 | 1 | Write 87 curated components seed file | 3 days |
| P2 | 2 | Library page polish + card previews | 1 day |
| P2 | 2D | Global search bar | 1 day |
| P3 | 3B–D | Template picker + duplicate detection | 1 day |

**Total: ~9–10 days**

---

## Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Tiers (FREE/PRO/ULTRA) | None | All components free, no auth needed |
| Duplicates rule | 1 per distinct visual effect | Same look = same component, edit the settings |
| Composite components | Yes | Combine types for real-world use cases |
| Admin YAML typing | Remove | Replace with visual builder form |
| Search | Add | Global + per-category — PowerLibs has neither |
| Preview | Keep | Real-time preview is better than PowerLibs |
