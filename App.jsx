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

const apiKey = ""; // Provided by environment

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
    <div className="flex h-screen bg-[#0f1115] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col overflow-y-auto">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-[#16191e]">
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
                          : "hover:bg-slate-800 hover:text-white text-slate-400"
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
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="px-8 py-6 border-b border-slate-800 bg-[#16191e]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Power Apps Component Builder
              </h1>
              <p className="text-slate-500 text-sm">
                Design professional Canvas components with Gemini AI ✨
              </p>
            </div>
          </div>
          <div className="bg-[#1c2128] rounded-xl border border-slate-800 flex items-center justify-between p-2 pl-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-white text-sm">
                {activeComponent}
              </span>
              <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-emerald-500/20">
                Free
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400">
                <Sun className="w-4 h-4" />
              </button>
              <button
                disabled={isSaving}
                onClick={handleSaveToD1}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-lg border border-indigo-500/20 transition-all active:scale-95"
              >
                {saveSuccess ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saveSuccess ? "Saved!" : isSaving ? "Saving..." : "Save to Library"}
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-[#2d333b] hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-lg border border-slate-700 transition-all active:scale-95"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy YAML"}
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-[#16191e] border-b border-slate-800 px-8 flex gap-6">
            <button
              onClick={() => setActiveTab("Preview")}
              className={`py-3 px-1 text-sm font-semibold border-b-2 transition-all ${activeTab === "Preview" ? "border-blue-500 text-white" : "border-transparent text-slate-500"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("Settings")}
              className={`py-3 px-1 text-sm font-semibold border-b-2 transition-all ${activeTab === "Settings" ? "border-blue-500 text-white" : "border-transparent text-slate-500"}`}
            >
              Settings
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#0d1014] p-8">
            {activeTab === "Settings" ? (
              <div className="max-w-3xl mx-auto space-y-10">
                {/* AI Assistant Section */}
                <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-blue-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-16 h-16" />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Wand2 className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      Gemini Assistant
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                      {settings.type === "form"
                        ? "Describe your form and Gemini will generate the fields for you."
                        : "Describe your app's mood and Gemini will suggest a professional color palette."}
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={
                          settings.type === "form"
                            ? "e.g. Employee onboarding form..."
                            : "e.g. Minimalist corporate dashboard..."
                        }
                        className="flex-1 bg-[#0d1014] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            settings.type === "form"
                              ? handleAiGenerateForm()
                              : handleAiSuggestStyles();
                          }
                        }}
                      />
                      <button
                        disabled={aiLoading || !aiPrompt}
                        onClick={
                          settings.type === "form"
                            ? handleAiGenerateForm
                            : handleAiSuggestStyles
                        }
                        className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold px-6 py-2 rounded-xl transition-all flex items-center gap-2"
                      >
                        {aiLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "✨ Generate"
                        )}
                      </button>
                    </div>
                    {error && <p className="text-xs text-red-400">{error}</p>}
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
                          <label className="text-xs font-bold text-slate-500 uppercase">
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
                            className="w-full bg-[#1c2128] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">
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
                            className="w-full bg-[#1c2128] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
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
                          className="flex items-center gap-1.5 bg-[#1c2128] hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Field
                        </button>
                      </div>
                      <div className="space-y-3">
                        {settings.fields.map((field) => (
                          <div
                            key={field.id}
                            className="bg-[#16191e] border border-slate-800 rounded-xl p-4 flex gap-4 items-end"
                          >
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-bold text-slate-500 uppercase">
                                Label
                              </label>
                              <input
                                type="text"
                                value={field.label}
                                onChange={(e) =>
                                  updateField(field.id, "label", e.target.value)
                                }
                                className="w-full bg-[#1c2128] border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-bold text-slate-500 uppercase">
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
                                className="w-full bg-[#1c2128] border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                  <section className="space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4">
                      Button Properties
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={settings.text}
                          onChange={(e) =>
                            setSettings({ ...settings, text: e.target.value })
                          }
                          className="w-full bg-[#1c2128] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">
                          Fill Color
                        </label>
                        <input
                          type="text"
                          value={settings.fillColor}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              fillColor: e.target.value,
                            })
                          }
                          className="w-full bg-[#1c2128] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                      </div>
                    </div>
                  </section>
                )}

                {settings.type === "shell" && (
                  <section className="space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4">
                      App Shell Config
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">
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
                          className="w-full bg-[#1c2128] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">
                          Header Color
                        </label>
                        <input
                          type="text"
                          value={settings.primaryColor}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              primaryColor: e.target.value,
                            })
                          }
                          className="w-full bg-[#1c2128] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                      </div>
                    </div>
                  </section>
                )}

                <div className="h-20"></div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-4 border-dashed border-slate-200 min-h-[500px] overflow-hidden p-10">
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
                      color: settings.textColor,
                      borderRadius: `${settings.radius}px`,
                      width: `${settings.width}px`,
                    }}
                    className="py-2.5 font-bold shadow-lg"
                  >
                    {settings.text}
                  </button>
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
                <div className="mt-8 px-6 py-3 bg-white border border-slate-200 shadow-sm rounded-full flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
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
