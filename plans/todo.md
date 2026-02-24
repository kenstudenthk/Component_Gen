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

## Phase 0: Initial Version Control
- [x] Commit all current unstaged and staged changes to the `main` branch.
- [x] Push changes to the remote repository.

## Phase 1: Preparation
- [x] Read the current structure of `Component/App.jsx` to identify the lines defining `TEMPLATES` and `SIDEBAR_ITEMS`.
- [x] Understand the structure of the JSON returned by the `/api/components` endpoint.

## Phase 2: React State Conversion
- [x] Initialize React `useState` for `templates` using the original `TEMPLATES` object as the default state.
- [x] Initialize React `useState` for `sidebarItems` using the original `SIDEBAR_ITEMS` array as the default state.
- [x] Initialize React `useState` for `isLoadingComponents` (default: `true`) to show loading states.

## Phase 3: Data Fetching Logic
- [x] Create an asynchronous function `fetchComponents()` inside `App`.
- [x] Inside `fetchComponents()`, use `fetch('/api/components')` and parse the JSON response.
- [x] Add a `useEffect` hook that runs once (`[]`) on component mount to trigger `fetchComponents()`.
- [x] Handle fetch errors and ensure `isLoadingComponents` is set to `false` in a `finally` block.

## Phase 4: Data Transformation
- [x] Iterate over the fetched components from the API response.
- [x] For each component, add it to a temporary copy of the `templates` object with the appropriate structure (`type`, `yaml`, `description`).
- [x] Collect the new component names and add them as items to the "Your Libraries" group in a temporary copy of the `sidebarItems` array.
- [x] Call `setTemplates` and `setSidebarItems` with the updated collections.

## Phase 5: UI & Logic Updates
- [x] Update the sidebar rendering map (`sidebarItems.map`) to reference the new state variable instead of the constant.
- [x] Update `handleComponentSelect` to reference the new `templates` state variable instead of the constant.
- [x] Modify the `handleSaveToD1` function to call `fetchComponents()` upon a successful save to immediately refresh the UI.

## Phase 6: Web Details Updates (PowerLibs Buttons)
- [x] Add the "Classic Button" template structure with `Text`, `FillColor`, `TextColor`, `CornerRadius` properties.
- [x] Add the "Classic Icon Button" template structure.
- [x] Add the "Outline Button" template structure.
- [x] Add the "Loading Button with Spinner" template structure.
- [x] Add the "Gradient Button" template structure.
- [x] Add the "Button Raised" template structure.

## Phase 7: Component Card UI Update (Edit/Preview Toggle)
- [x] Remove the global Preview/Settings tab bar.
- [x] Add an "Edit / Preview" segmented control toggle (flipping left/right) onto the component card header.
- [x] Build a dynamic settings panel in "Edit" mode that conditionally renders input fields based on the component's unique properties.
- [x] Implement settings inputs for `type: "form"` (title, subtitle, fields).
- [x] Implement settings inputs for `type: "badge"` (text, theme).
- [x] Implement settings inputs for `type: "accordion"` (items list).
- [x] Implement settings inputs for `type: "shell"` (appName, showSidebar, primaryColor).
- [x] Implement settings inputs for `type: "button"` based on existing properties dynamically (fillColor, textColor, borderColor, gradientStartColor, icon, dropShadow, loadingState, etc.).