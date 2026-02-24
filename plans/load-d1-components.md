# Implementation Plan: Load Components from Cloudflare D1

## Objective
Update the React frontend in `Component/App.jsx` to fetch and load saved component templates from the Cloudflare D1 database on startup, replacing the currently hardcoded static components in the sidebar and template list.

## Steps

### 1. Convert Static Data to React State
- Inside the main `App` component in `Component/App.jsx`, convert the static `TEMPLATES` object and `SIDEBAR_ITEMS` array into React state variables using `useState`.
  - Initial state for `templates` can be the existing hardcoded `TEMPLATES` to serve as a fallback or base.
  - Initial state for `sidebarItems` can be the existing hardcoded `SIDEBAR_ITEMS`.

### 2. Implement Data Fetching
- Add a new `useEffect` hook in `App.jsx` that runs once when the component mounts.
- Inside the hook, perform a `fetch` `GET` request to `/api/components` to retrieve the saved components from the D1 database.
- Add error handling and a loading state (`isLoadingComponents`) to manage the UI during the fetch.

### 3. Transform and Update State
- Parse the JSON response from the API.
- Map the retrieved components into the `TEMPLATES` structure. For example, if a component named "Custom Button" is fetched, add it to the `templates` state object.
- Update the `sidebarItems` state to include the newly fetched components. The fetched components should likely be added to the "Your Libraries" group or a new "Saved Components" group in the sidebar.
- Set the `templates` and `sidebarItems` state variables with the combined (static + fetched) data.

### 4. Update UI Components
- Ensure the sidebar navigation correctly maps over the new `sidebarItems` state variable instead of the static constant.
- Ensure the main content area and `handleComponentSelect` function correctly reference the new `templates` state variable instead of the static constant.
- Optional: Add a loading indicator in the sidebar while components are being fetched from the database.

## Verification
- Run the local development server.
- Verify that the app loads without errors.
- Create a new component and save it to D1.
- Refresh the page and verify that the newly saved component appears in the sidebar and its settings load correctly when selected.