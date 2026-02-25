import { useState, useEffect } from "react";
import { Copy, Check, Eye, Settings as SettingsIcon } from "lucide-react";
import ComponentPreview from "./ComponentPreview";
import ComponentSettings from "./ComponentSettings";
import { INITIAL_TEMPLATES } from "../lib/templates";
import { generatePowerAppsYAML, parsePowerAppsYAMLToSettings } from "../lib/yaml";

export default function ComponentCard({ component }) {
  const [activeTab, setActiveTab] = useState("Preview");
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Map category slugs to component types expected by Preview/Settings
    const typeMap = {
      "accordions": "accordion",
      "animations": "animation",
      "app-shells": "shell",
      "badges": "badge",
      "button-group": "buttonGroup",
      "buttons": "button",
      "calendars": "calendar",
      "cards": "card",
      "drawers": "drawer",
      "dropdowns": "dropdown",
      "forms": "form",
      "gallery": "gallery",
      "input-fields": "inputField",
      "modals": "modal",
      "navigation": "navigation",
      "sidebars": "sidebar",
      "speed-dial": "speedDial",
      "tabs": "tab",
      "toast": "toast",
      "toggles": "toggle"
    };
    
    const mappedType = typeMap[component.category_slug] || component.category_slug || "button";

    // Try to find default settings in INITIAL_TEMPLATES by name
    let defaultSettings = INITIAL_TEMPLATES[component.name] || 
                          INITIAL_TEMPLATES[component.name.replace(/Classic Button/i, "Classic Button")];
                          
    if (!defaultSettings) {
      // Parse settings from the component's YAML if it exists
      if (component.yaml) {
        defaultSettings = parsePowerAppsYAMLToSettings(component.yaml, mappedType, component.name);
      } else {
        // Fallback with robust default properties based on type
        if (mappedType === "button") {
          defaultSettings = { type: "button", text: component.name, fillColor: "=RGBA(59, 130, 246, 1)", textColor: "=RGBA(255, 255, 255, 1)", radius: 4, width: 160 };
        } else if (mappedType === "badge") {
          defaultSettings = { type: "badge", text: component.name, theme: "success" };
        } else if (mappedType === "form") {
          defaultSettings = { type: "form", title: component.name, subtitle: "Description", fields: [], primaryButtonText: "Submit", secondaryButtonText: "Cancel" };
        } else if (mappedType === "accordion") {
           defaultSettings = { type: "accordion", items: [{ id: "1", title: "Item 1", content: "Details" }] };
        } else if (mappedType === "shell") {
           defaultSettings = { type: "shell", appName: component.name, showSidebar: true, primaryColor: "=RGBA(15, 23, 42, 1)" };
        } else if (mappedType === "drawer") {
           defaultSettings = { type: "drawer", title: component.name, primaryColor: "=RGBA(255, 255, 255, 1)" };
        } else {
           defaultSettings = { type: mappedType, text: component.name };
        }
      }
    }
    
    setSettings({
      ...defaultSettings,
      name: component.name,
      description: component.description,
    });
  }, [component]);

  const handleCopy = async () => {
    const yaml = settings ? generatePowerAppsYAML(settings.name, settings) : component.yaml;
    try {
      await navigator.clipboard.writeText(yaml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = yaml;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tags = component.tags
    ? component.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  if (!settings) return null;

  return (
    <div className="rounded-3xl border border-white/5 bg-[#151515] overflow-hidden flex flex-col shadow-2xl transition-all hover:border-white/10 group">
      {/* Card Header */}
      <div className="p-5 border-b border-white/5 bg-[#1A1A1A]/50 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-bold text-white text-sm truncate" title={component.name}>
            {component.name}
          </h3>
          <p className="text-[10px] text-slate-500 truncate">
            {component.category_slug}
          </p>
        </div>

        {/* Toggle UI */}
        <div className="flex bg-[#0D0D0D] rounded-lg border border-white/5 p-0.5 shrink-0">
          <button
            onClick={() => setActiveTab("Preview")}
            className={`p-1.5 rounded-md transition-all ${
              activeTab === "Preview"
                ? "bg-[#1A1A1A] text-blue-400 shadow-sm border border-white/5"
                : "text-slate-600 hover:text-slate-400"
            }`}
            title="Preview"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => setActiveTab("Edit")}
            className={`p-1.5 rounded-md transition-all ${
              activeTab === "Edit"
                ? "bg-[#1A1A1A] text-blue-400 shadow-sm border border-white/5"
                : "text-slate-600 hover:text-slate-400"
            }`}
            title="Edit"
          >
            <SettingsIcon size={14} />
          </button>
        </div>

        <button
          onClick={handleCopy}
          className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all ${
            copied
              ? "bg-green-500/20 text-green-400 border border-green-500/20"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
          }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy YAML"}
        </button>
      </div>

      {/* Card Content Area */}
      <div className="relative aspect-[4/3] bg-[#0A0A0A]">
        {activeTab === "Preview" ? (
          <div className="h-full overflow-hidden scale-[0.85] origin-center">
            <ComponentPreview settings={settings} />
          </div>
        ) : (
          <div className="h-full bg-[#111111]">
            <ComponentSettings settings={settings} setSettings={setSettings} />
          </div>
        )}
      </div>

      {/* Card Footer (Optional info) */}
      <div className="px-5 py-3 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-[9px] text-slate-600 font-medium">No tags</span>
        )}
      </div>
    </div>
  );
}
