import {
  Box,
  Layout,
  AppWindow,
  Layers,
  ExternalLink,
  Zap,
  Code,
} from "lucide-react";

export const INITIAL_TEMPLATES = {
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
  Buttons: {
    type: "button",
    text: "Click Me",
    fillColor: "RGBA(59, 130, 246, 1)",
    textColor: "RGBA(255, 255, 255, 1)",
    radius: 8,
    width: 160,
  },
  Badge: {
    type: "badge",
    text: "Status: Active",
    theme: "success",
  },
  Accordions: {
    type: "accordion",
    items: [
      {
        id: "1",
        title: "Section 1",
        content: "Details for section one go here.",
      },
      {
        id: "2",
        title: "Section 2",
        content: "Details for section two go here.",
      },
    ],
  },
  "App Shells": {
    type: "shell",
    appName: "Admin Portal",
    showSidebar: true,
    primaryColor: "RGBA(15, 23, 42, 1)",
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
};

export const INITIAL_SIDEBAR_ITEMS = [
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
  {
    group: "Components",
    items: [
      { label: "Accordions", icon: Box },
      { label: "Badge", icon: Box },
      { label: "Buttons", icon: Box },
      { label: "Classic Button", icon: Box },
      { label: "Classic Icon Button", icon: Box },
      { label: "Outline Button", icon: Box },
      { label: "Loading Button", icon: Box },
      { label: "Gradient Button", icon: Box },
      { label: "Button Raised", icon: Box },
      { label: "Dynamic Form Card", icon: Layout },
      { label: "App Shells", icon: AppWindow },
    ],
  },
];
