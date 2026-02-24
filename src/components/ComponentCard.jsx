import { useState, useEffect } from "react";
import { Copy, Check, Eye, Settings as SettingsIcon } from "lucide-react";
import ComponentPreview from "./ComponentPreview";
import ComponentSettings from "./ComponentSettings";
import { INITIAL_TEMPLATES } from "../lib/templates";
import { generatePowerAppsYAML } from "../lib/yaml";

export default function ComponentCard({ component }) {
  const [activeTab, setActiveTab] = useState("Preview");
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Try to find default settings in INITIAL_TEMPLATES by name
    const defaultSettings = INITIAL_TEMPLATES[component.name] || 
                            INITIAL_TEMPLATES[component.name.replace(/Classic Button/i, "Classic Button")] || 
                            { type: component.category_slug || "button", text: component.name };
    
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
