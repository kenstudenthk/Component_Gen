# Implementation Plan: Load Components from Cloudflare D1 & Button Library Analysis

## 0. Tech Stack / Language Decision
*To answer your question about the language:* We are **not** changing the language or rebuilding the entire web app from scratch. We will continue using your exact current stack to implement these new features seamlessly:
- **Frontend**: React (JavaScript/JSX) styled with Tailwind CSS (already set up via Vite).
- **Backend API**: Cloudflare Pages Functions (JavaScript) to connect to your existing Cloudflare D1 SQLite database.

---

## 1. Cloudflare D1 Implementation Plan

### Objective
Update the React frontend in `Component/App.jsx` to fetch and load saved component templates from the Cloudflare D1 database on startup, replacing the currently hardcoded static components in the sidebar and template list.

### Steps
1. **Convert Static Data to React State**
   - Convert `TEMPLATES` and `SIDEBAR_ITEMS` into React state variables (`useState`).

2. **Implement Data Fetching**
   - Add a `useEffect` hook in `App.jsx` that runs on mount.
   - Perform a `fetch` `GET` request to `/api/components` to retrieve D1 database records.

3. **Transform and Update State**
   - Parse the JSON response.
   - Map retrieved components into the `TEMPLATES` structure (e.g., dynamically adding items with their `yaml` and `category_slug`).
   - Update `sidebarItems` to include fetched components under "Your Libraries" or "Saved Components".

4. **Update UI Components**
   - Ensure the sidebar navigation correctly maps over the new `sidebarItems` state.
   - Ensure the main content area correctly references the new `templates` state.

---

## 2. PowerLibs Buttons Key Points (For Web Details)

Based on the [PowerLibs Buttons Library](https://www.powerlibs.com/library/buttons), here are the key button variants and the properties needed to build them in our component generator. These should be pasted into the web app details to support dynamic generation:

### Button Types & Required Properties:

1. **Classic Button**
   - **Characteristics**: A standard solid-fill button.
   - **Key Properties**: `Text`, `FillColor`, `TextColor`, `CornerRadius`, `Width`, `Height`

2. **Classic Icon Button**
   - **Characteristics**: A standard button that includes an icon alongside the text.
   - **Key Properties**: `Text`, `Icon`, `IconPosition` (Left/Right), `FillColor`, `TextColor`, `CornerRadius`

3. **Outline Button**
   - **Characteristics**: Transparent background with a visible border matching the text color.
   - **Key Properties**: `Text`, `BorderColor`, `BorderThickness`, `TextColor`, `CornerRadius`, `FillColor` (Set to Transparent)

4. **Loading Button with Spinner**
   - **Characteristics**: A button that can display a loading spinner, replacing or accompanying the text during an action.
   - **Key Properties**: `Text`, `LoadingState` (Boolean), `SpinnerColor`, `FillColor`, `TextColor`, `CornerRadius`

5. **Gradient Button**
   - **Characteristics**: A button with a CSS-like gradient background instead of a solid color.
   - **Key Properties**: `Text`, `GradientStartColor`, `GradientEndColor`, `TextColor`, `CornerRadius`

6. **Button Raised**
   - **Characteristics**: A button with a distinct drop-shadow to give it a 3D, elevated appearance on the page.
   - **Key Properties**: `Text`, `FillColor`, `TextColor`, `DropShadow` (Light/Medium/Heavy), `CornerRadius`

### Next Steps for the UI:
To support these in the component generator, we need to update our `TEMPLATES` list to include these distinct button types. The settings panel should be configured to dynamically display inputs for the specific properties (like a border thickness slider for the Outline Button or a color picker for gradients) based on the active button type.