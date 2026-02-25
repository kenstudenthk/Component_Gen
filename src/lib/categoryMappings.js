import { INITIAL_TEMPLATES } from "./templates";

export const CATEGORY_SLUGS = [
  "accordions", "animations", "app-shells", "badges", "button-group",
  "buttons", "calendars", "cards", "drawers", "dropdowns",
  "forms", "gallery", "input-fields", "modals", "navigation",
  "sidebars", "speed-dial", "tabs", "toast", "toggles",
];

export const SLUG_TO_TYPE = {
  "accordions": "accordion", "animations": "animation", "app-shells": "shell",
  "badges": "badge", "button-group": "buttonGroup", "buttons": "button",
  "calendars": "calendar", "cards": "card", "drawers": "drawer",
  "dropdowns": "dropdown", "forms": "form", "gallery": "gallery",
  "input-fields": "inputField", "modals": "modal", "navigation": "navigation",
  "sidebars": "sidebar", "speed-dial": "speedDial", "tabs": "tab",
  "toast": "toast", "toggles": "toggle",
};

export const TYPE_DEFAULTS = {
  accordion: "Basic Accordion", animation: "Loading Animation", shell: "App Shells",
  badge: "Badge Success", buttonGroup: "Primary Button Group", button: "Classic Button",
  calendar: "Event Calendar", card: "Content Card", drawer: "Drawer Default",
  dropdown: "Simple Dropdown", form: "Dynamic Form Card", gallery: "Image Gallery",
  inputField: "Basic Input", modal: "Center Modal", navigation: "Main Navigation",
  sidebar: "App Sidebar", speedDial: "Action Speed Dial", tab: "Tab Strip",
  toast: "Success Toast", toggle: "Toggle Switch",
};

export function defaultSettings(slug) {
  const type = SLUG_TO_TYPE[slug] || "button";
  return INITIAL_TEMPLATES[TYPE_DEFAULTS[type]] || { type, text: "Component" };
}

export function slugLabel(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
