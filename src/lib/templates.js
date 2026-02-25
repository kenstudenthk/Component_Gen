import {
  Box,
  Layout,
  AppWindow,
  Layers,
  ExternalLink,
  Zap,
  Code,
  MousePointer2,
  Calendar,
  Type,
  Square,
  PanelLeft,
  Bell,
  Monitor,
  CheckSquare,
  ChevronDown,
  Play,
  Copy,
} from "lucide-react";

export const INITIAL_TEMPLATES = {
  // --- EXISTING ---
  "Dynamic Form Card": {
    type: "form",
    title: "Deploy to production",
    subtitle: "This will publish your changes live to all users",
    fields: [
      { id: "1", label: "Project name", placeholder: "My awesome project" },
      { id: "2", label: "Environment", placeholder: "Production" },
    ],
    primaryButtonText: "Deploy",
    secondaryButtonText: "Cancel",
  },
  "Classic Button": {
    type: "button",
    text: "Button",
    fillColor: "RGBA(59, 130, 246, 1)",
    textColor: "RGBA(255, 255, 255, 1)",
    radius: 4,
  },
  "Classic Icon Button": {
    type: "button",
    text: "Settings",
    icon: "Settings",
    iconPosition: "left",
    fillColor: "RGBA(59, 130, 246, 1)",
    textColor: "RGBA(255, 255, 255, 1)",
    radius: 4,
  },
  "Outline Button": {
    type: "button",
    text: "Outline",
    fillColor: "RGBA(255, 255, 255, 0)",
    textColor: "RGBA(59, 130, 246, 1)",
    borderColor: "RGBA(59, 130, 246, 1)",
    borderThickness: 2,
    radius: 4,
  },
  "Loading Button": {
    type: "button",
    text: "Submit",
    loadingState: false,
    spinnerColor: "RGBA(255, 255, 255, 1)",
    fillColor: "RGBA(59, 130, 246, 1)",
    textColor: "RGBA(255, 255, 255, 1)",
    radius: 4,
  },
  "Gradient Button": {
    type: "button",
    text: "Premium",
    gradientStartColor: "RGBA(124, 58, 237, 1)",
    gradientEndColor: "RGBA(192, 38, 211, 1)",
    textColor: "RGBA(255, 255, 255, 1)",
    radius: 8,
  },
  "Button Raised": {
    type: "button",
    text: "Elevated",
    fillColor: "RGBA(59, 130, 246, 1)",
    textColor: "RGBA(255, 255, 255, 1)",
    dropShadow: true,
    radius: 4,
  },
  "App Shells": {
    type: "shell",
    appName: "Admin Portal",
    showSidebar: true,
    primaryColor: "RGBA(15, 23, 42, 1)",
  },
  "Drawer Default": {
    type: "drawer",
    title: "Main Menu",
    primaryColor: "RGBA(30, 41, 59, 1)",
  },
  "Badge Success": {
    type: "badge",
    text: "Status: Active",
    theme: "success",
  },
  "Basic Accordion": {
    type: "accordion",
    items: [
      { id: "1", title: "Section 1", content: "Details for section one." },
      { id: "2", title: "Section 2", content: "Details for section two." },
    ],
  },

  // --- NEW CATEGORIES ---
  "Basic Input": {
    type: "inputField",
    label: "Username",
    placeholder: "john_doe",
    helperText: "Enter your unique handle",
  },
  "Toggle Switch": {
    type: "toggle",
    label: "Enable Notifications",
    isOn: true,
    activeColor: "RGBA(34, 197, 94, 1)",
  },
  "Simple Dropdown": {
    type: "dropdown",
    label: "Select Region",
    items: ["North America", "Europe", "Asia"],
  },
  "Primary Button Group": {
    type: "buttonGroup",
    items: ["Day", "Week", "Month"],
    activeItem: "Day",
  },
  "Content Card": {
    type: "card",
    title: "Project Alpha",
    subtitle: "Web Development",
    body: "Comprehensive suite of web components for Power Apps.",
  },
  "Main Navigation": {
    type: "navigation",
    primaryColor: "RGBA(59, 130, 246, 1)",
    items: ["Dashboard", "Users", "Settings"],
  },
  "App Sidebar": {
    type: "sidebar",
    width: 240,
    items: ["Home", "Analytics", "Logs"],
  },
  "Tab Strip": {
    type: "tab",
    items: ["Overview", "Details", "History"],
    activeTab: "Overview",
  },
  "Center Modal": {
    type: "modal",
    title: "Confirm Action",
    body: "Are you sure you want to delete this item?",
  },
  "Success Toast": {
    type: "toast",
    message: "Changes saved successfully",
    theme: "success",
  },
  "Action Speed Dial": {
    type: "speedDial",
    icon: "Plus",
    items: ["Document", "Email", "Event"],
  },
  "Image Gallery": {
    type: "gallery",
    title: "Team Members",
    layout: "grid",
  },
  "Event Calendar": {
    type: "calendar",
    startDay: "Monday",
  },
  "Loading Animation": {
    type: "animation",
    style: "spinner",
    speed: "normal",
  },
};

export const INITIAL_SIDEBAR_ITEMS = [
  {
    group: "Actions & Buttons",
    items: [
      { label: "Buttons", icon: MousePointer2 },
      { label: "Button Group", icon: Copy },
      { label: "Speed Dial", icon: Zap },
    ],
  },
  {
    group: "Forms & Inputs",
    items: [
      { label: "Input Fields", icon: Type },
      { label: "Toggles", icon: CheckSquare },
      { label: "Dropdowns", icon: ChevronDown },
      { label: "Dynamic Form Card", icon: Layout },
    ],
  },
  {
    group: "Navigation & Layout",
    items: [
      { label: "App Shells", icon: AppWindow },
      { label: "Navigation", icon: Monitor },
      { label: "Sidebars", icon: PanelLeft },
      { label: "Tabs", icon: Layers },
      { label: "Drawers", icon: Box },
    ],
  },
  {
    group: "Content & Data",
    items: [
      { label: "Cards", icon: Square },
      { label: "Accordions", icon: Box },
      { label: "Badge", icon: Box },
      { label: "Gallery", icon: Layout },
      { label: "Calendars", icon: Calendar },
    ],
  },
  {
    group: "Feedback & Motion",
    items: [
      { label: "Toast", icon: Bell },
      { label: "Modals", icon: AppWindow },
      { label: "Animations", icon: Play },
    ],
  },
  {
    group: "Other Resources",
    items: [
      { label: "Icons", icon: ExternalLink },
      { label: "Color Palettes", icon: ExternalLink },
    ],
  },
  {
    group: "Tools",
    items: [
      { label: "Logo Generator", icon: Zap },
      { label: "PowerFX Toolkit", icon: Code },
      { label: "Form Builder", icon: Layout },
    ],
  },
  {
    group: "Your Libraries",
    items: [
      { label: "Custom YAML", icon: Layers },
      { label: "Custom SVG", icon: Layers },
    ],
  },
];
