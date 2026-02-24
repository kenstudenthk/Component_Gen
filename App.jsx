import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Settings,
  Eye,
  Layout,
  ChevronRight,
  Box,
  Zap,
  AppWindow,
  Layers,
  Check,
  Sun,
  Moon,
  Calendar,
  ExternalLink,
  Code,
  ChevronDown,
  Type,
  Square,
  Wand2,
  Loader2,
  Sparkles,
  Palette,
  Save,
} from "lucide-react";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // Provided by environment

// --- Component Templates ---
const INITIAL_TEMPLATES = {
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

const INITIAL_SIDEBAR_ITEMS = [
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

// --- AI Service ---
const callGemini = async (
  prompt,
  responseMimeType = "text/plain",
  schema = null,
) => {
  const model = "gemini-2.5-flash-preview-09-2025";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: responseMimeType,
    },
  };

  if (schema) {
    payload.generationConfig.responseSchema = schema;
  }

  const fetchWithRetry = async (retries = 5, delay = 1000) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const err = new Error(`HTTP error! status: ${response.status}`);
        err.status = response.status;
        throw err;
      }
      return await response.json();
    } catch (err) {
      const isTransient =
        !err.status || err.status >= 500 || err.status === 429;
      if (retries > 0 && isTransient) {
        await new Promise((res) => setTimeout(res, delay));
        return fetchWithRetry(retries - 1, delay * 2);
      }
      throw err;
    }
  };

  const result = await fetchWithRetry();
  return result.candidates?.[0]?.content?.parts?.[0]?.text;
};

// --- YAML Generation Logic ---
// No version pins — Power Apps will use the current version for the environment
const CONTROL_VERSIONS = {};

const yamlSafeValue = (value) => {
  if (typeof value !== "string") return value;
  if (value.includes(": ") || value.includes(" #") || /^[[\]{},]/.test(value)) {
    return `'${value.replace(/'/g, "''")}'`;
  }
  return value;
};

const yamlControl = (
  indent,
  name,
  controlType,
  properties,
  childrenYaml = "",
  variant = null,
) => {
  const pad = " ".repeat(indent);
  const inner = " ".repeat(indent + 4);
  const propPad = " ".repeat(indent + 6);
  const version = CONTROL_VERSIONS[controlType];
  const controlValue = version ? `${controlType}@${version}` : controlType;

  let yaml = `${pad}- ${name}:\n`;
  yaml += `${inner}Control: ${controlValue}\n`;
  if (variant) yaml += `${inner}Variant: ${variant}\n`;

  const propEntries = Object.entries(properties);
  if (propEntries.length > 0) {
    yaml += `${inner}Properties:\n`;
    for (const [key, value] of propEntries) {
      yaml += `${propPad}${key}: ${yamlSafeValue(value)}\n`;
    }
  }
  if (childrenYaml) {
    yaml += `${inner}Children:\n${childrenYaml}`;
  }
  return yaml;
};

// Sanitize user text: # breaks YAML single-line formulas (treated as comment)
// and : can be misread as a YAML key. Strip both characters.
const sanitizeYamlText = (text) =>
  String(text).replace(/#/g, "").replace(/:/g, "-");

const generatePowerAppsYAML = (activeComponentName, settings) => {
  const type = settings.type;

  if (type === "form") {
    const { title, subtitle, fields, primaryButtonText, secondaryButtonText } =
      settings;
    let children = "";
    children += yamlControl(6, "TitleLabel", "Label", {
      Text: `="${sanitizeYamlText(title)}"`,
      Size: "=20",
      FontWeight: "=FontWeight.Bold",
      X: "=40",
      Y: "=40",
    });
    children += yamlControl(6, "SubtitleLabel", "Label", {
      Text: `="${sanitizeYamlText(subtitle)}"`,
      Size: "=12",
      Color: "=RGBA(100, 116, 139, 1)",
      X: "=40",
      Y: "=80",
    });
    fields.forEach((field, index) => {
      const yPos = 130 + index * 90;
      children += yamlControl(6, `Label_${index}`, "Label", {
        Text: `="${sanitizeYamlText(field.label)}"`,
        FontWeight: "=FontWeight.Semibold",
        X: "=40",
        Y: `=${yPos}`,
      });
      children += yamlControl(6, `Input_${index}`, "TextInput", {
        Default: '=""',
        HintText: `="${sanitizeYamlText(field.placeholder)}"`,
        X: "=40",
        Y: `=${yPos + 30}`,
        Width: "=420",
        Height: "=40",
        BorderThickness: "=1",
        BorderColor: "=RGBA(226, 232, 240, 1)",
      });
    });
    const btnY = 150 + fields.length * 90;
    children += yamlControl(6, "BtnPrimary", "Button", {
      Text: `="${sanitizeYamlText(primaryButtonText)}"`,
      X: "=40",
      Y: `=${btnY}`,
      Width: "=200",
      Height: "=40",
      Fill: "=RGBA(59, 130, 246, 1)",
    });
    children += yamlControl(6, "BtnSecondary", "Button", {
      Text: `="${sanitizeYamlText(secondaryButtonText)}"`,
      X: "=260",
      Y: `=${btnY}`,
      Width: "=200",
      Height: "=40",
      Fill: "=RGBA(241, 245, 249, 1)",
      Color: "=RGBA(71, 85, 105, 1)",
    });
    return yamlControl(
      0,
      "Container_Main",
      "GroupContainer",
      {
        Fill: "=RGBA(255, 255, 255, 1)",
        RadiusTopLeft: "=16",
        RadiusTopRight: "=16",
        RadiusBottomLeft: "=16",
        RadiusBottomRight: "=16",
        DropShadow: "=DropShadow.Light",
        Width: "=500",
        Height: `=${btnY + 80}`,
      },
      children,
      "ManualLayout",
    );
  }

  if (type === "button") {
    const props = {
      Text: `="${sanitizeYamlText(settings.text)}"`,
      Fill: `=${settings.fillColor || "RGBA(59, 130, 246, 1)"}`,
      Color: `=${settings.textColor || "RGBA(255, 255, 255, 1)"}`,
      RadiusTopLeft: `=${settings.radius || 4}`,
      RadiusTopRight: `=${settings.radius || 4}`,
      RadiusBottomLeft: `=${settings.radius || 4}`,
      RadiusBottomRight: `=${settings.radius || 4}`,
      Width: `=${settings.width || 160}`,
      Height: "=40",
    };

    if (settings.borderColor) props.BorderColor = `=${settings.borderColor}`;
    if (settings.borderThickness) props.BorderThickness = `=${settings.borderThickness}`;
    if (settings.dropShadow) props.DropShadow = "=DropShadow.Regular";
    
    // For Icons (simple implementation)
    if (settings.icon) {
      // In a real Power App YAML, icons are separate controls, but we'll stick to button properties for now
      // or we could wrap it in a container. For simplicity, we'll keep it as a button.
    }

    return yamlControl(0, "CustomButton", "Button", props);
  }

  if (type === "badge") {
    const colors =
      settings.theme === "success"
        ? "RGBA(34, 197, 94, 0.1)"
        : "RGBA(59, 130, 246, 0.1)";
    const textColors =
      settings.theme === "success"
        ? "RGBA(21, 128, 61, 1)"
        : "RGBA(29, 78, 216, 1)";
    const children = yamlControl(6, "BadgeLabel", "Label", {
      Text: `="${sanitizeYamlText(settings.text).toUpperCase()}"`,
      Color: `=${textColors}`,
      FontWeight: "=FontWeight.Bold",
      Size: "=10",
      Align: "=Align.Center",
      Width: "=120",
      Height: "=32",
    });
    return yamlControl(
      0,
      "BadgeContainer",
      "GroupContainer",
      {
        Fill: `=${colors}`,
        RadiusTopLeft: "=4",
        RadiusTopRight: "=4",
        RadiusBottomLeft: "=4",
        RadiusBottomRight: "=4",
        Width: "=120",
        Height: "=32",
      },
      children,
      "ManualLayout",
    );
  }

  if (type === "accordion") {
    let outerChildren = "";
    settings.items.forEach((item, index) => {
      const grandchild = yamlControl(12, `AccLabel_${index}`, "Label", {
        Text: `="${sanitizeYamlText(item.title)}"`,
        X: "=15",
        Width: "=370",
        VerticalAlign: "=VerticalAlign.Middle",
        Height: "=50",
      });
      outerChildren += yamlControl(
        6,
        `AccItem_${index}`,
        "GroupContainer",
        {
          Y: `=${index * 60}`,
          Width: "=400",
          Height: "=50",
          Fill: "=RGBA(248, 250, 252, 1)",
        },
        grandchild,
        "ManualLayout",
      );
    });
    return yamlControl(
      0,
      "Accordion_Main",
      "GroupContainer",
      {
        Width: "=400",
        Height: `=${settings.items.length * 60}`,
      },
      outerChildren,
      "ManualLayout",
    );
  }

  if (type === "shell") {
    const children = yamlControl(6, "AppTitle", "Label", {
      Text: `="${sanitizeYamlText(settings.appName)}"`,
      Color: "=RGBA(255, 255, 255, 1)",
      X: "=20",
      Y: "=20",
      Size: "=20",
      FontWeight: "=FontWeight.Bold",
    });
    return yamlControl(
      0,
      "AppShell",
      "GroupContainer",
      {
        Fill: `=${settings.primaryColor}`,
        Width: "=1366",
        Height: "=80",
      },
      children,
      "ManualLayout",
    );
  }

  return "# Component YAML logic coming soon";
};

export default function App() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [sidebarItems, setSidebarItems] = useState(INITIAL_SIDEBAR_ITEMS);
  const [activeComponent, setActiveComponent] = useState("Dynamic Form Card");
  const [settings, setSettings] = useState(INITIAL_TEMPLATES["Dynamic Form Card"]);
  const [activeTab, setActiveTab] = useState("Settings");
  const [copied, setCopied] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [error, setError] = useState("");
  const [isLoadingComponents, setIsLoadingComponents] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchComponents = async () => {
    setIsLoadingComponents(true);
    try {
      const response = await fetch("/api/components");
      if (!response.ok) throw new Error("Failed to fetch components");
      const data = await response.json();

      const newTemplates = { ...INITIAL_TEMPLATES };
      const newSidebarItems = JSON.parse(JSON.stringify(INITIAL_SIDEBAR_ITEMS));
      const libGroup = newSidebarItems.find((g) => g.group === "Your Libraries");

      data.forEach((comp) => {
        newTemplates[comp.name] = {
          type: comp.category_slug || "form",
          yaml: comp.yaml,
          description: comp.description,
          isD1: true,
        };
        if (libGroup && !libGroup.items.some((i) => i.label === comp.name)) {
          libGroup.items.push({ label: comp.name, icon: Layers });
        }
      });

      setTemplates(newTemplates);
      setSidebarItems(newSidebarItems);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load components from database.");
    } finally {
      setIsLoadingComponents(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const handleSaveToD1 = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setError("");
    try {
      const yaml = generatePowerAppsYAML(activeComponent, settings);
      
      const payload = {
        name: activeComponent,
        category_slug: settings.type || "uncategorized",
        description: `Generated ${activeComponent} configuration`,
        yaml: yaml,
        tags: [settings.type],
        sort_order: 0
      };

      const response = await fetch('/api/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to save component to D1');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      await fetchComponents(); // Refresh UI
    } catch (err) {
      console.error(err);
      setError("Failed to save component to Cloudflare D1.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleComponentSelect = (label) => {
    if (templates[label]) {
      setActiveComponent(label);
      setSettings(templates[label]);
    } else {
      setActiveComponent(label);
      setSettings({ type: "placeholder", label: label });
    }
    setError("");
    setAiPrompt("");
  };

  const handleAddField = () => {
    setSettings((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          id: Date.now().toString(),
          label: "New Field",
          placeholder: "Enter value...",
        },
      ],
    }));
  };

  const handleRemoveField = (id) => {
    setSettings((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }));
  };

  const updateField = (id, key, value) => {
    setSettings((prev) => ({
      ...prev,
      fields: prev.fields.map((f) =>
        f.id === id ? { ...f, [key]: value } : f,
      ),
    }));
  };

  // --- AI Logic Implementations ---
  const handleAiGenerateForm = async () => {
    if (!aiPrompt) return;
    setAiLoading(true);
    setError("");
    try {
      const prompt = `Generate a Power Apps form structure for: "${aiPrompt}". 
      Return JSON with fields: title, subtitle, and an array of fields (label, placeholder). 
      Limit to 5 fields max. Be concise.`;

      const schema = {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          subtitle: { type: "STRING" },
          fields: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                label: { type: "STRING" },
                placeholder: { type: "STRING" },
              },
            },
          },
        },
      };

      const result = await callGemini(prompt, "application/json", schema);
      const parsed = JSON.parse(result);

      setSettings((prev) => ({
        ...prev,
        title: parsed.title,
        subtitle: parsed.subtitle,
        fields: (parsed.fields ?? []).map((f, i) => ({
          ...f,
          id: `ai-${i}-${Date.now()}`,
        })),
      }));
      setAiPrompt("");
    } catch (err) {
      setError("Failed to generate form. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiSuggestStyles = async () => {
    if (!aiPrompt) return;
    setAiLoading(true);
    setError("");
    try {
      const prompt = `Suggest a professional Power Apps color theme for: "${aiPrompt}". 
      Return JSON with primaryColor (RGBA string) and secondaryColor (RGBA string). 
      Ensure colors are accessible.`;

      const schema = {
        type: "OBJECT",
        properties: {
          primaryColor: { type: "STRING" },
          secondaryColor: { type: "STRING" },
        },
      };

      const result = await callGemini(prompt, "application/json", schema);
      const parsed = JSON.parse(result);

      if (!parsed.primaryColor) {
        throw new Error("AI did not return a valid color.");
      }

      if (settings.type === "shell") {
        setSettings((prev) => ({ ...prev, primaryColor: parsed.primaryColor }));
      } else if (settings.type === "button") {
        setSettings((prev) => ({ ...prev, fillColor: parsed.primaryColor }));
      } else {
        setError(
          "AI color suggestions are not yet supported for this component type.",
        );
      }
      setAiPrompt("");
    } catch (err) {
      setError("Style suggestion failed.");
    } finally {
      setAiLoading(false);
    }
  };

  const copyToClipboard = () => {
    const yaml = generatePowerAppsYAML(activeComponent, settings);
    const textArea = document.createElement("textarea");
    textArea.value = yaml;
    document.body.appendChild(textArea);
    try {
      textArea.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col overflow-y-auto bg-[#0F0F0F]">
        <div className="p-6 flex items-center gap-3 border-b border-white/5 bg-[#0F0F0F]">
          <div className="bg-blue-600 p-2 rounded-lg">
            <AppWindow className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-white tracking-tight">
            Internal Portal
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
        </div>
        <nav className="flex-1 p-4 space-y-6">
          {isLoadingComponents && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            </div>
          )}
          {sidebarItems.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2">
                {group.group}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item, iIdx) => (
                  <li key={iIdx}>
                    <button
                      onClick={() => handleComponentSelect(item.label)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                        activeComponent === item.label
                          ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                          : "hover:bg-white/5 hover:text-white text-slate-400"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-10 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Global Header */}
          <header className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Power Apps Button Components
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
              Interactive buttons for Microsoft Power Apps - gradient, outline, loading, and raised styles. Copy-paste YAML code included.
            </p>
            <p className="text-slate-600 text-sm mt-4 flex items-center gap-2">
              Last updated: Jan 5
            </p>
          </header>

          {/* Component Card */}
          <div className="bg-[#151515] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            {/* Component Action Bar */}
            <div className="p-8 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white">
                  {activeComponent}
                </h2>
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-emerald-500/20 tracking-wider">
                  Free
                </span>
              </div>

              {/* Edit / Preview Toggle */}
              <div className="flex bg-[#0D0D0D] rounded-xl border border-white/5 p-1">
                <button
                  onClick={() => setActiveTab("Preview")}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === "Preview"
                      ? "bg-[#1A1A1A] text-white shadow-sm border border-white/5"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("Settings")}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === "Settings"
                      ? "bg-[#1A1A1A] text-white shadow-sm border border-white/5"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#0D0D0D] rounded-xl border border-white/5 p-1 mr-2">
                  <button className="p-2 text-blue-400">
                    <Sun className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-slate-400">
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  disabled={isSaving}
                  onClick={handleSaveToD1}
                  className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] disabled:bg-[#0D0D0D] text-slate-300 text-sm font-bold px-5 py-2.5 rounded-xl border border-white/5 transition-all"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  ) : (
                    <Save className="w-4 h-4 text-blue-400" />
                  )}
                  {saveSuccess ? "Saved!" : "Save"}
                </button>

                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-slate-300 text-sm font-bold px-5 py-2.5 rounded-xl border border-white/5 transition-all"
                >
                  <Copy className="w-4 h-4 text-blue-400" />
                  {copied ? "Copied!" : "Copy YAML"}
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
              {activeTab === "Settings" ? (
                <div className="p-10 space-y-10">
                  {/* AI Assistant Section */}
                  <section className="bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/10 rounded-2xl p-6 shadow-sm relative overflow-hidden mb-12">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Sparkles className="w-16 h-16" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Wand2 className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                        Gemini AI Assistant
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={
                            settings.type === "form"
                              ? "Describe your form..."
                              : "Describe your theme..."
                          }
                          className="flex-1 bg-[#0D0D0D] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                        />
                        <button
                          disabled={aiLoading || !aiPrompt}
                          onClick={
                            settings.type === "form"
                              ? handleAiGenerateForm
                              : handleAiSuggestStyles
                          }
                          className="bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-slate-600 text-white font-bold px-6 py-3 rounded-xl transition-all"
                        >
                          {aiLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "✨ Generate"
                          )}
                        </button>
                      </div>
                    </div>
                  </section>

                {settings.type === "form" && (
                  <>
                    <section>
                      <h3 className="text-lg font-bold text-white mb-4">
                        Card Header
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Title
                          </label>
                          <input
                            type="text"
                            value={settings.title}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                title: e.target.value,
                              })
                            }
                            className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Subtitle
                          </label>
                          <textarea
                            rows={2}
                            value={settings.subtitle}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                subtitle: e.target.value,
                              })
                            }
                            className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none"
                          />
                        </div>
                      </div>
                    </section>
                    <section>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">
                          Form Fields
                        </h3>
                        <button
                          onClick={handleAddField}
                          className="flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-white/5 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Field
                        </button>
                      </div>
                      <div className="space-y-3">
                        {settings.fields.map((field) => (
                          <div
                            key={field.id}
                            className="bg-[#1A1A1A] border border-white/5 rounded-xl p-4 flex gap-4 items-end"
                          >
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                Label
                              </label>
                              <input
                                type="text"
                                value={field.label}
                                onChange={(e) =>
                                  updateField(field.id, "label", e.target.value)
                                }
                                className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                Placeholder
                              </label>
                              <input
                                type="text"
                                value={field.placeholder}
                                onChange={(e) =>
                                  updateField(
                                    field.id,
                                    "placeholder",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveField(field.id)}
                              className="p-2.5 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                )}

                {settings.type === "button" && (
                  <section className="space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={settings.text}
                          onChange={(e) =>
                            setSettings({ ...settings, text: e.target.value })
                          }
                          className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      
                      {settings.fillColor !== undefined && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Background Color
                          </label>
                          <div className="flex gap-2">
                            <div 
                              className="w-12 h-12 rounded-xl border border-white/10 shrink-0" 
                              style={{ backgroundColor: settings.fillColor }}
                            />
                            <input
                              type="text"
                              value={settings.fillColor}
                              onChange={(e) => setSettings({ ...settings, fillColor: e.target.value })}
                              className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                          </div>
                        </div>
                      )}

                      {settings.gradientStartColor !== undefined && (
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Gradient Start
                            </label>
                            <div className="flex gap-2">
                              <div className="w-12 h-12 rounded-xl border border-white/10 shrink-0" style={{ backgroundColor: settings.gradientStartColor }} />
                              <input
                                type="text"
                                value={settings.gradientStartColor}
                                onChange={(e) => setSettings({ ...settings, gradientStartColor: e.target.value })}
                                className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Gradient End
                            </label>
                            <div className="flex gap-2">
                              <div className="w-12 h-12 rounded-xl border border-white/10 shrink-0" style={{ backgroundColor: settings.gradientEndColor }} />
                              <input
                                type="text"
                                value={settings.gradientEndColor}
                                onChange={(e) => setSettings({ ...settings, gradientEndColor: e.target.value })}
                                className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Text Color
                        </label>
                        <div className="flex gap-2">
                          <div 
                            className="w-12 h-12 rounded-xl border border-white/10 shrink-0" 
                            style={{ backgroundColor: settings.textColor }}
                          />
                          <input
                            type="text"
                            value={settings.textColor}
                            onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                            className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                      </div>

                      {settings.borderColor !== undefined && (
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Border Color
                            </label>
                            <div className="flex gap-2">
                              <div className="w-12 h-12 rounded-xl border border-white/10 shrink-0" style={{ backgroundColor: settings.borderColor }} />
                              <input type="text" value={settings.borderColor} onChange={(e) => setSettings({ ...settings, borderColor: e.target.value })} className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Border Thickness (px)
                            </label>
                            <input type="number" value={settings.borderThickness} onChange={(e) => setSettings({ ...settings, borderThickness: parseInt(e.target.value) || 0 })} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600" />
                          </div>
                        </div>
                      )}
                      
                      {settings.icon !== undefined && (
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Icon Name
                            </label>
                            <input type="text" value={settings.icon} onChange={(e) => setSettings({ ...settings, icon: e.target.value })} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Icon Position
                            </label>
                            <select value={settings.iconPosition} onChange={(e) => setSettings({ ...settings, iconPosition: e.target.value })} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600">
                              <option value="left">Left</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {settings.loadingState !== undefined && (
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 h-full mt-4">
                              <input type="checkbox" checked={settings.loadingState} onChange={(e) => setSettings({ ...settings, loadingState: e.target.checked })} className="rounded bg-[#1A1A1A] border-white/10 w-4 h-4" />
                              Loading State Enabled
                            </label>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Spinner Color
                            </label>
                            <div className="flex gap-2">
                              <div className="w-12 h-12 rounded-xl border border-white/10 shrink-0" style={{ backgroundColor: settings.spinnerColor }} />
                              <input type="text" value={settings.spinnerColor} onChange={(e) => setSettings({ ...settings, spinnerColor: e.target.value })} className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                          </div>
                        </div>
                      )}

                      {settings.dropShadow !== undefined && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <input type="checkbox" checked={settings.dropShadow} onChange={(e) => setSettings({ ...settings, dropShadow: e.target.checked })} className="rounded bg-[#1A1A1A] border-white/10 w-4 h-4" />
                            Drop Shadow Enabled
                          </label>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-6">
                        {settings.width !== undefined && (
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Width (px)
                            </label>
                            <input
                              type="number"
                              value={settings.width}
                              onChange={(e) => setSettings({ ...settings, width: parseInt(e.target.value) || 0 })}
                              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                          </div>
                        )}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Border Radius (px)
                          </label>
                          <input
                            type="number"
                            value={settings.radius}
                            onChange={(e) =>
                              setSettings({ ...settings, radius: parseInt(e.target.value) || 0 })
                            }
                            className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-4 text-slate-500 text-sm font-medium border border-white/5 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2 mt-8">
                      <Plus className="w-4 h-4 rotate-45" />
                      Reset to Default <span className="text-slate-700 ml-1">(Pro only)</span>
                    </button>
                  </section>
                )}

                {settings.type === "shell" && (
                  <section className="space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4">
                      App Shell Config
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          App Name
                        </label>
                        <input
                          type="text"
                          value={settings.appName}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              appName: e.target.value,
                            })
                          }
                          className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Header Color
                        </label>
                        <div className="flex gap-2">
                          <div 
                            className="w-12 h-12 rounded-xl border border-white/10 shrink-0" 
                            style={{ backgroundColor: settings.primaryColor }}
                          />
                          <input
                            type="text"
                            value={settings.primaryColor}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                primaryColor: e.target.value,
                              })
                            }
                            className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                          <input type="checkbox" checked={settings.showSidebar !== false} onChange={(e) => setSettings({ ...settings, showSidebar: e.target.checked })} className="rounded bg-[#1A1A1A] border-white/10 w-4 h-4" />
                          Show Sidebar
                        </label>
                      </div>
                    </div>
                  </section>
                )}

                {settings.type === "badge" && (
                  <section className="space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4">
                      Badge Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Badge Text
                        </label>
                        <input
                          type="text"
                          value={settings.text}
                          onChange={(e) => setSettings({ ...settings, text: e.target.value })}
                          className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Theme
                        </label>
                        <select
                          value={settings.theme}
                          onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                          className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="success">Success</option>
                          <option value="warning">Warning</option>
                          <option value="error">Error</option>
                          <option value="info">Info</option>
                        </select>
                      </div>
                    </div>
                  </section>
                )}

                {settings.type === "accordion" && (
                  <section className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Accordion Items
                      </h3>
                      <button
                        onClick={() => {
                          const newItems = [...(settings.items || []), { id: Date.now().toString(), title: "New Item", content: "Details here" }];
                          setSettings({ ...settings, items: newItems });
                        }}
                        className="flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-white/5 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(settings.items || []).map((item, index) => (
                        <div key={item.id} className="bg-[#1A1A1A] border border-white/5 rounded-xl p-4 flex flex-col gap-4">
                          <div className="flex gap-4 items-end">
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                Title
                              </label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => {
                                  const newItems = [...settings.items];
                                  newItems[index].title = e.target.value;
                                  setSettings({ ...settings, items: newItems });
                                }}
                                className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const newItems = settings.items.filter((i) => i.id !== item.id);
                                setSettings({ ...settings, items: newItems });
                              }}
                              className="p-2.5 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="w-full space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Content
                            </label>
                            <textarea
                              rows={2}
                              value={item.content}
                              onChange={(e) => {
                                const newItems = [...settings.items];
                                newItems[index].content = e.target.value;
                                setSettings({ ...settings, items: newItems });
                              }}
                              className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <div className="h-20"></div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-2xl overflow-hidden p-20 relative">
                <div className="flex-1 flex items-center justify-center w-full">
                  {settings.type === "form" && (
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
                      <div className="mb-8">
                        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                          {settings.title}
                        </h2>
                        <p className="text-slate-500 text-sm">
                          {settings.subtitle}
                        </p>
                      </div>
                      <div className="space-y-6 mb-10">
                        {settings.fields.map((field) => (
                          <div key={field.id} className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">
                              {field.label}
                            </label>
                            <input
                              disabled
                              placeholder={field.placeholder}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <button className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl">
                          {settings.primaryButtonText}
                        </button>
                        <button className="flex-1 bg-slate-100 text-slate-700 font-bold py-3.5 rounded-xl">
                          {settings.secondaryButtonText}
                        </button>
                      </div>
                    </div>
                  )}
                  {settings.type === "button" && (
                    <button
                      style={{
                        backgroundColor: settings.fillColor,
                        background: settings.gradientStartColor ? `linear-gradient(to right, ${settings.gradientStartColor}, ${settings.gradientEndColor})` : settings.fillColor,
                        color: settings.textColor,
                        borderRadius: `${settings.radius}px`,
                        width: settings.width ? `${settings.width}px` : "auto",
                        border: settings.borderColor ? `${settings.borderThickness || 1}px solid ${settings.borderColor}` : "none",
                        boxShadow: settings.dropShadow ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none",
                      }}
                      className="py-3 px-8 font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      {settings.loadingState && <Loader2 className="w-4 h-4 animate-spin" />}
                      {settings.icon && settings.iconPosition === "left" && <Box className="w-4 h-4" />}
                      {settings.text}
                      {settings.icon && settings.iconPosition === "right" && <Box className="w-4 h-4" />}
                    </button>
                  )}
                  {settings.type === "badge" && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        settings.theme === "success" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" :
                        settings.theme === "warning" ? "bg-amber-100 text-amber-700 border border-amber-200" :
                        settings.theme === "error" ? "bg-red-100 text-red-700 border border-red-200" :
                        "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {settings.text}
                    </span>
                  )}
                  {settings.type === "accordion" && (
                    <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      {(settings.items || []).map((item, idx) => (
                        <div key={item.id} className={`border-b border-slate-100 last:border-0`}>
                          <div className="p-4 flex justify-between items-center font-bold text-slate-800 cursor-pointer">
                            {item.title}
                            <ChevronRight className={`w-4 h-4 transition-transform ${idx === 0 ? "rotate-90" : ""}`} />
                          </div>
                          {idx === 0 && (
                            <div className="px-4 pb-4 text-sm text-slate-500">
                              {item.content}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {settings.type === "shell" && (
                    <div className="w-full h-full max-h-[400px] bg-white shadow-xl flex flex-col rounded-lg overflow-hidden border border-slate-200">
                      <header
                        style={{ backgroundColor: settings.primaryColor }}
                        className="h-16 flex items-center px-6 text-white font-bold"
                      >
                        {settings.appName}
                      </header>
                      <div className="flex-1 flex">
                        <aside className="w-16 border-r border-slate-100 bg-slate-50 flex flex-col items-center py-4 gap-4">
                          <div className="w-8 h-8 rounded bg-slate-200"></div>
                          <div className="w-8 h-8 rounded bg-slate-200"></div>
                        </aside>
                        <main className="flex-1 p-6 bg-white">
                          <div className="h-4 w-3/4 bg-slate-100 rounded mb-4"></div>
                          <div className="h-40 w-full bg-slate-50 rounded border border-slate-100"></div>
                        </main>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white border border-slate-100 shadow-sm rounded-full flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-blue-500" /> AI Powered
                  Preview
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
