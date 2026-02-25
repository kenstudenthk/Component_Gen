import React, { useState } from "react";
import { Plus, Trash2, Wand2, Loader2, Sparkles } from "lucide-react";
import { callGemini } from "../lib/ai";

export default function ComponentSettings({ settings, setSettings }) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddField = () => {
    setSettings((prev) => ({
      ...prev,
      fields: [
        ...(prev.fields || []),
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
      setError("Failed to generate form.");
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
      Return JSON with primaryColor (RGBA string). Ensure colors are accessible.`;

      const schema = {
        type: "OBJECT",
        properties: {
          primaryColor: { type: "STRING" },
        },
      };

      const result = await callGemini(prompt, "application/json", schema);
      const parsed = JSON.parse(result);

      if (settings.type === "shell") {
        setSettings((prev) => ({ ...prev, primaryColor: parsed.primaryColor }));
      } else if (settings.type === "button") {
        setSettings((prev) => ({ ...prev, fillColor: parsed.primaryColor }));
      }
      setAiPrompt("");
    } catch (err) {
      setError("Style suggestion failed.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8 max-h-[500px] overflow-y-auto custom-scrollbar">
      {/* AI Assistant Section */}
      <section className="bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/10 rounded-xl p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-tight">
            AI Assistant
          </h3>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Describe form or theme..."
            className="flex-1 bg-[#0D0D0D] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-blue-500 outline-none"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <button
            disabled={aiLoading || !aiPrompt}
            onClick={settings.type === "form" ? handleAiGenerateForm : handleAiSuggestStyles}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-slate-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
          >
            {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "✨"}
          </button>
        </div>
        {error && <p className="text-[10px] text-red-400 mt-2">{error}</p>}
      </section>

      {settings.type === "form" && (
        <div className="space-y-6">
          <section className="space-y-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Title</label>
            <input
              type="text"
              value={settings.title || ""}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
            />
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subtitle</label>
            <textarea
              rows={2}
              value={settings.subtitle || ""}
              onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white resize-none"
            />
          </section>
          
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fields</h4>
              <button onClick={handleAddField} className="text-blue-400 hover:text-blue-300 transition-colors">
                <Plus size={14} />
              </button>
            </div>
            {(settings.fields || []).map((field) => (
              <div key={field.id} className="bg-[#1A1A1A] border border-white/5 rounded-lg p-3 flex gap-3 items-end">
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(field.id, "label", e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-white/5 rounded px-2 py-1 text-[10px] text-white"
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={field.placeholder}
                    onChange={(e) => updateField(field.id, "placeholder", e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-white/5 rounded px-2 py-1 text-[10px] text-white"
                    placeholder="Placeholder"
                  />
                </div>
                <button onClick={() => handleRemoveField(field.id)} className="text-slate-600 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </section>
        </div>
      )}

      {settings.type === "button" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Button Text</label>
            <input
              type="text"
              value={settings.text || ""}
              onChange={(e) => setSettings({ ...settings, text: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fill Color</label>
              <input
                type="text"
                value={settings.fillColor || ""}
                onChange={(e) => setSettings({ ...settings, fillColor: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Text Color</label>
              <input
                type="text"
                value={settings.textColor || ""}
                onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Radius (px)</label>
              <input
                type="number"
                value={settings.radius || 0}
                onChange={(e) => setSettings({ ...settings, radius: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Width (px)</label>
              <input
                type="number"
                value={settings.width || 0}
                onChange={(e) => setSettings({ ...settings, width: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
          
          {settings.gradientStartColor !== undefined && (
             <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gradient Start</label>
                  <input type="text" value={settings.gradientStartColor} onChange={(e) => setSettings({...settings, gradientStartColor: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gradient End</label>
                  <input type="text" value={settings.gradientEndColor} onChange={(e) => setSettings({...settings, gradientEndColor: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white" />
                </div>
             </div>
          )}
          
          {settings.borderColor !== undefined && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Border Color</label>
                <input type="text" value={settings.borderColor} onChange={(e) => setSettings({...settings, borderColor: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Thickness</label>
                <input type="number" value={settings.borderThickness} onChange={(e) => setSettings({...settings, borderThickness: parseInt(e.target.value) || 0})} className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white" />
              </div>
            </div>
          )}
        </div>
      )}

      {settings.type === "badge" && (
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Badge Text</label>
          <input
            type="text"
            value={settings.text || ""}
            onChange={(e) => setSettings({ ...settings, text: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
          />
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Theme</label>
          <select
            value={settings.theme || "info"}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
          >
            <option value="success">Success</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      )}

      {settings.type === "inputField" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Label</label>
            <input
              type="text"
              value={settings.label || ""}
              onChange={(e) => setSettings({ ...settings, label: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Placeholder</label>
            <input
              type="text"
              value={settings.placeholder || ""}
              onChange={(e) => setSettings({ ...settings, placeholder: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Helper Text</label>
            <input
              type="text"
              value={settings.helperText || ""}
              onChange={(e) => setSettings({ ...settings, helperText: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
        </div>
      )}

      {settings.type === "toggle" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Label</label>
            <input
              type="text"
              value={settings.label || ""}
              onChange={(e) => setSettings({ ...settings, label: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-[#1A1A1A] border border-white/5 rounded-lg">
            <span className="text-xs font-bold text-slate-300">Default On</span>
            <input 
              type="checkbox" 
              checked={settings.isOn} 
              onChange={(e) => setSettings({ ...settings, isOn: e.target.checked })}
              className="w-4 h-4"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Color</label>
            <input
              type="text"
              value={settings.activeColor || ""}
              onChange={(e) => setSettings({ ...settings, activeColor: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
        </div>
      )}

      {(settings.type === "dropdown" || settings.type === "buttonGroup") && (
        <div className="space-y-6">
          {settings.type === "dropdown" && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Label</label>
              <input
                type="text"
                value={settings.label || ""}
                onChange={(e) => setSettings({ ...settings, label: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          )}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Items</h4>
              <button 
                onClick={() => setSettings({ ...settings, items: [...(settings.items || []), "New Item"] })} 
                className="text-blue-400 hover:text-blue-300"
              >
                <Plus size={14} />
              </button>
            </div>
            {(settings.items || []).map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...settings.items];
                    newItems[idx] = e.target.value;
                    setSettings({ ...settings, items: newItems });
                  }}
                  className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <button 
                  onClick={() => setSettings({ ...settings, items: settings.items.filter((_, i) => i !== idx) })}
                  className="text-slate-600 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {settings.type === "shell" && (
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">App Name</label>
          <input
            type="text"
            value={settings.appName || ""}
            onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
          />
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Primary Color</label>
          <input
            type="text"
            value={settings.primaryColor || ""}
            onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
          />
        </div>
      )}

      {settings.type === "drawer" && (
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Drawer Title</label>
          <input
            type="text"
            value={settings.title || ""}
            onChange={(e) => setSettings({ ...settings, title: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
          />
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Background Color</label>
          <input
            type="text"
            value={settings.primaryColor || ""}
            onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
          />
        </div>
      )}
      
      <div className="h-4"></div>
    </div>
  );
}
