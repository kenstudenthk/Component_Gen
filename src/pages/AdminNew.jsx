import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Code, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import ComponentPreview from "../components/ComponentPreview";
import ComponentSettings from "../components/ComponentSettings";
import { INITIAL_TEMPLATES } from "../lib/templates";
import { generatePowerAppsYAML } from "../lib/yaml";
import { createComponent } from "../lib/api";

const CATEGORY_SLUGS = [
  "accordions", "animations", "app-shells", "badges", "button-group",
  "buttons", "calendars", "cards", "drawers", "dropdowns",
  "forms", "gallery", "input-fields", "modals", "navigation",
  "sidebars", "speed-dial", "tabs", "toast", "toggles",
];

const SLUG_TO_TYPE = {
  "accordions": "accordion", "animations": "animation", "app-shells": "shell",
  "badges": "badge", "button-group": "buttonGroup", "buttons": "button",
  "calendars": "calendar", "cards": "card", "drawers": "drawer",
  "dropdowns": "dropdown", "forms": "form", "gallery": "gallery",
  "input-fields": "inputField", "modals": "modal", "navigation": "navigation",
  "sidebars": "sidebar", "speed-dial": "speedDial", "tabs": "tab",
  "toast": "toast", "toggles": "toggle",
};

const TYPE_DEFAULTS = {
  accordion: "Basic Accordion", animation: "Loading Animation", shell: "App Shells",
  badge: "Badge Success", buttonGroup: "Primary Button Group", button: "Classic Button",
  calendar: "Event Calendar", card: "Content Card", drawer: "Drawer Default",
  dropdown: "Simple Dropdown", form: "Dynamic Form Card", gallery: "Image Gallery",
  inputField: "Basic Input", modal: "Center Modal", navigation: "Main Navigation",
  sidebar: "App Sidebar", speedDial: "Action Speed Dial", tab: "Tab Strip",
  toast: "Success Toast", toggle: "Toggle Switch",
};

function defaultSettings(slug) {
  const type = SLUG_TO_TYPE[slug] || "button";
  return INITIAL_TEMPLATES[TYPE_DEFAULTS[type]] || { type, text: "Component" };
}

function slugLabel(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function AdminNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", category_slug: "buttons", description: "", tags: "" });
  const [settings, setSettings] = useState(defaultSettings("buttons"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showYaml, setShowYaml] = useState(false);

  const setField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleCategoryChange = (e) => {
    const slug = e.target.value;
    setForm((f) => ({ ...f, category_slug: slug }));
    setSettings(defaultSettings(slug));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    const yaml = generatePowerAppsYAML(form.name, settings);
    if (!yaml || yaml.startsWith("#")) {
      setError("Could not generate YAML for this component type.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createComponent({ ...form, yaml });
      navigate("/admin");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const generatedYaml = generatePowerAppsYAML(form.name || "Component", settings);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          Admin
        </Link>

        <h1 className="text-2xl font-bold text-white mb-8">New Component</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Metadata row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Name <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                value={form.name}
                onChange={setField("name")}
                placeholder="e.g. Primary Button"
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Category
              </span>
              <select
                value={form.category_slug}
                onChange={handleCategoryChange}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                {CATEGORY_SLUGS.map((s) => (
                  <option key={s} value={s}>{slugLabel(s)}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Description
              </span>
              <input
                type="text"
                value={form.description}
                onChange={setField("description")}
                placeholder="Short description"
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tags
              </span>
              <input
                type="text"
                value={form.tags}
                onChange={setField("tags")}
                placeholder="primary, filled, action"
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </label>
          </div>

          {/* Visual builder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950">
              <div className="px-4 pt-4 pb-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Settings
                </p>
              </div>
              <ComponentSettings settings={settings} setSettings={setSettings} />
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950">
              <div className="px-4 pt-4 pb-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Preview
                </p>
              </div>
              <div className="p-4">
                <ComponentPreview settings={settings} />
              </div>
            </div>
          </div>

          {/* Generated YAML (collapsible) */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowYaml((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Code size={13} />
                Generated YAML
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${showYaml ? "rotate-180" : ""}`}
              />
            </button>
            {showYaml && (
              <pre className="px-4 pb-4 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre">
                {generatedYaml}
              </pre>
            )}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Component"}
            </button>
            <Link
              to="/admin"
              className="rounded-xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
