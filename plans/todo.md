# ⚠️ IMPORTANT: PLEASE APPROVE THIS PLAN FIRST ⚠️
**I cannot run `git commit` or `git push` while we are in "Plan Mode".** 
To allow me to commit these files to the main branch, **you must approve this plan**. Once you approve, the very first thing I will do is commit the plan and the current code to `main`!

---

# Rules
1. Mark a task as done (`[x]`) when completed.
2. Must follow the `research.md` to complete the task.
3. Please say "Done Done Done" for every task finish.
4. Please clear context after finish a task.

---

# Project To-Do List

**Last Updated:** 2026-02-27

## ✅ Completed Phases

### Phase 0: Database Cleanup
- [x] Fix shells → app-shells bug in migrations/002_seed_components.sql
- [x] Clean production DB duplicates (ButtonStart_N patterns)
- [x] Verify app-shells category loads

### Phase 1: Component Library Content
- [x] Create migrations/003_library_content.sql
- [x] Add 87 distinct components across 19 categories:
  - [x] Buttons (8), Forms (5), Input Fields (5)
  - [x] Toggles (5), Dropdowns (5), Button Groups (3)
  - [x] Cards (5), Navigation (5), Sidebars (5)
  - [x] Tabs (5), Modals (6), Toasts (5)
  - [x] Speed Dial (3), Badges (4), Accordions (4)
  - [x] App Shells (4), Drawers (4), Galleries (4)
  - [x] Calendars (3), Animations (3)
- [x] Verify all components render in preview
- [x] Verify YAML generation works for all types

### Legacy Phases (From Original Todo)
- [x] Phase 0: Initial Version Control
- [x] Phase 1-6: Data fetching, state management, PowerLibs buttons
- [x] Phase 7: Component Card UI Update (partial - see remaining work below)

---

## 🔄 Phase 2: UI/UX Improvements (IN PROGRESS)

### Task 1: Remove Global Tabs ⬜
- [ ] Remove global "Preview / Settings" tab bar from main view
- [ ] Prepare codebase for per-card toggles
- **Files:** `src/pages/Home.jsx` or main app component

### Task 2: Add Card-Level Edit/Preview Toggle ⬜
- [ ] Add segmented control toggle to ComponentCard.jsx
- [ ] Implement "Preview" (left) / "Edit" (right) toggle
- [ ] Add flip behavior between preview and settings
- [ ] Apply dark theme styling (`bg-[#1A1A1A]`, `border-white/5`)
- **Files:** `src/components/ComponentCard.jsx`

### Task 3: Dynamic Settings Panel ⬜
- [ ] Update ComponentSettings.jsx for conditional rendering
- [ ] For `type: "button"`: Check for gradient, border, icon, shadow, loading properties
- [ ] Render appropriate inputs dynamically
- [ ] Maintain dark theme across all input types
- **Files:** `src/components/ComponentSettings.jsx`

### Task 4: Sidebar Navigation Updates ⬜
- [ ] Update INITIAL_SIDEBAR_ITEMS structure
- [ ] Add section headers/dividers for organization
- [ ] Ensure all 19 categories displayed properly
- **Files:** `src/lib/templates.js`

### Task 5: Library Page Enhancements ✅
- [x] Add component count per category card (real count from DB via API JOIN)
- [x] Add icons for all 19 categories (SLUG_TO_ICON mapping)
- [x] Sort categories by `sort_order` from DB (API returns sorted)
- [x] Add "Showing X of Y" count on category pages
- [x] Fix broken slugs (badge→badges, drawer→drawers, navigation-bars→navigation)
- [x] Dynamic loading instead of hardcoded CLONE_CATEGORIES
- **Files:** `src/components/landing/CategoryGrid.jsx`, `src/pages/Category.jsx`, `functions/api/categories.js`

### Task 6: Search Functionality ✅
- [x] Add global search bar to `/library` page (with debounce 300ms)
- [x] Implement search by component name and tags (API `?search=` param)
- [x] Show results grouped by category
- [x] Add in-category search filter on Category page
- **Files:** `src/pages/Library.jsx`, `src/lib/api.js`, `functions/api/components.js`

---

## ⬜ Phase 3: Admin Workflow Improvements (NOT STARTED)
- [ ] Visual builder for admin (replace raw YAML entry)
- [ ] Template picker when creating components
- [ ] Duplicate detection before saving