# Implementation Plan: Component Card UI Update

## Overview
Update the Component Builder UI to use an "Edit / Preview" toggle that flips the view left and right on each component card, rather than a global tab bar. Additionally, audit all components to ensure the "Edit" panel dynamically shows the correct property inputs based on the component selected.

## Component Audit & Required Edit Properties
We have 11 components spanning 5 types (`form`, `badge`, `accordion`, `shell`, `button`). The new buttons are all `type: "button"` but have unique properties. The UI must conditionally render the correct inputs based on what properties exist in the `settings` object.

1. **Dynamic Form Card** (`type: form`): Title, Subtitle, Fields (Label, Placeholder)
2. **Badge** (`type: badge`): Text, Theme (dropdown)
3. **Accordions** (`type: accordion`): Items list (Title, Content)
4. **App Shells** (`type: shell`): App Name, Show Sidebar (toggle), Primary Color
5. **Buttons** (`type: button`): Text, Fill Color, Text Color, Radius, Width
6. **Classic Button** (`type: button`): Text, Fill Color, Text Color, Radius
7. **Classic Icon Button** (`type: button`): Text, Icon (text input or dropdown), Icon Position (left/right dropdown), Fill Color, Text Color, Radius
8. **Outline Button** (`type: button`): Text, Fill Color (transparent), Text Color, Border Color, Border Thickness (number), Radius
9. **Loading Button** (`type: button`): Text, Loading State (toggle), Spinner Color, Fill Color, Text Color, Radius
10. **Gradient Button** (`type: button`): Text, Gradient Start Color, Gradient End Color, Text Color, Radius
11. **Button Raised** (`type: button`): Text, Fill Color, Text Color, Drop Shadow (toggle), Radius

## Implementation Steps

### Phase 1: Card Layout & Toggle "Flip"
1. Remove the global "Preview / Settings" tabs from the main view.
2. Inside the main component card, add a segmented control (pill toggle) with "Preview" on the left and "Edit" on the right. 
3. Clicking the toggle changes the active state and flips the content area between the rendered React component and the property settings editor.

### Phase 2: Dynamic Settings UI
4. Update the settings render logic to iterate over the `settings` object or use conditional blocks to display the correct inputs for the active component.
   - For `type: "button"`, we will dynamically check for properties: e.g., if `gradientStartColor` exists, render gradient color pickers. If `borderColor` exists, render border settings. If `icon` exists, render icon settings.
5. Apply the dark-themed styling (`bg-[#1A1A1A]`, `border-white/5`) and layout to all inputs to match the unified design language.

### Phase 3: Maintain Existing Functionality
6. Ensure the AI Assistant, Save to Library, and Copy YAML buttons remain functional within the new card layout.