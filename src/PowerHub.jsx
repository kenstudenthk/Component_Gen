import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Plus, Trash2, Copy, Edit3, Layers, Settings,
  Image as ImageIcon, Sparkles, ChevronRight, FolderPlus,
  Save, X, Layout, Palette, Type, Maximize, ExternalLink,
  CheckCircle2, AlertCircle, Loader2, Hash, Type as TypeIcon,
  Globe, ArrowUpRight
} from 'lucide-react';

// --- API Helpers ---
const fetchGemini = async (apiKey, prompt, systemInstruction = "") => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (e) {
      if (i === 4) throw e;
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
};

const generateImage = async (apiKey, prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
  const payload = {
    instances: { prompt: `UI Component Design for PowerApps: ${prompt}, high quality, clean interface, minimalist, vibrant blue accents` },
    parameters: { sampleCount: 1 }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Status ${response.status}: ${errorText || 'Empty response'}`);
    }

    const result = await response.json();
    if (!result.predictions || result.predictions.length === 0 || !result.predictions[0].bytesBase64Encoded) {
      throw new Error("No image data returned in response");
    }

    return `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
  } catch (e) {
    console.error("Image generation failed", e);
    return null;
  }
};

// --- REST API wrappers ---
const API = '/api';

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  return res.json();
}

// --- Main Application Component ---
export default function PowerHub() {
  const [components, setComponents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]); // [{slug, name}]

  const [activeTab, setActiveTab] = useState('all'); // 'all' or category slug
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiFields, setAiFields] = useState([]);
  const [message, setMessage] = useState(null);
  const [apiKey, setApiKey] = useState('');

  // --- Initialize Settings ---
  useEffect(() => {
    const savedKey = localStorage.getItem('powerapps_gemini_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  // --- Data helpers: map DB fields → UI fields ---
  const mapComponent = (c) => ({
    ...c,
    catalog: c.category_slug,
    previewUrl: c.preview_url,
  });

  // --- Load data on mount ---
  const refreshComponents = async () => {
    const data = await apiFetch('/components');
    setComponents((data ?? []).map(mapComponent));
  };

  const refreshProjects = async () => {
    const data = await apiFetch('/projects');
    setProjects(data ?? []);
  };

  useEffect(() => {
    refreshComponents();
    refreshProjects();
    apiFetch('/categories').then(cats => {
      setCategories((cats ?? []).map(c => ({ slug: c.slug, name: c.name })));
    });
  }, []);

  // --- UI Helpers ---
  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showMessage("YAML copied to clipboard!", "success");
  };

  // --- Core Actions ---
  const handleSaveComponent = async (data) => {
    try {
      const payload = {
        name: data.name,
        category_slug: data.catalog,
        yaml: data.yaml,
        preview_url: data.previewUrl ?? null,
      };

      if (data.id) {
        await apiFetch(`/components/${data.id}`, { method: 'PUT', body: JSON.stringify(payload) });
        showMessage("Component updated", "success");
      } else {
        await apiFetch('/components', { method: 'POST', body: JSON.stringify(payload) });
        showMessage("New component added", "success");
      }
      await refreshComponents();
      setIsAdding(false);
      setIsEditing(false);
    } catch (e) {
      showMessage("Error saving component", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this component?")) return;
    try {
      await apiFetch(`/components/${id}`, { method: 'DELETE' });
      setSelectedComponent(null);
      await refreshComponents();
      showMessage("Component deleted", "success");
    } catch (e) {
      showMessage("Error deleting", "error");
    }
  };

  const handleAddToProject = async (componentId, projectId) => {
    try {
      const proj = projects.find(p => p.id === projectId);
      const updatedIds = Array.from(new Set([...(proj.componentIds || []), componentId]));
      const updated = await apiFetch(`/projects/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify({ componentIds: updatedIds }),
      });
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, componentIds: updated.componentIds } : p));
      showMessage(`Added to ${proj.name}`, "success");
    } catch (e) {
      showMessage("Error adding to project", "error");
    }
  };

  const createNewProject = async (name, url) => {
    try {
      const created = await apiFetch('/projects', {
        method: 'POST',
        body: JSON.stringify({ name, url: url || '' }),
      });
      setProjects(prev => [...prev, created]);
      showMessage("Project created", "success");
      setIsProjectModalOpen(false);
    } catch (e) {
      showMessage("Error creating project", "error");
    }
  };

  const analyzeYAMLForQuickEdit = async (yaml) => {
    if (!apiKey) {
      showMessage("Please configure your Gemini API Key in Settings first.", "error");
      setIsSettingsModalOpen(true);
      return;
    }
    setLoadingAI(true);
    const systemPrompt = "You are a PowerApps YAML analyzer. Extract common editable properties (Width, Height, Fill, Color, Text, Font, Size, X, Y) from the provided YAML. For values, strip out PowerApps syntax like quotes or the '=' prefix (e.g., if value is '=\"Header\"', return 'Header'). Return a JSON array of objects with keys: label, key (the yaml property name), type (number, color, text), and current (value). ONLY return JSON.";
    try {
      const response = await fetchGemini(apiKey, yaml, systemPrompt);
      const cleaned = response.replace(/```json|```/g, "").trim();
      const fields = JSON.parse(cleaned);
      setAiFields(fields);
    } catch (e) {
      console.error(e);
      showMessage("AI Analysis failed", "error");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleUpdateYamlFromAi = async () => {
    if (!selectedComponent || aiFields.length === 0) return;
    if (!apiKey) {
      showMessage("Please configure your Gemini API Key in Settings first.", "error");
      setIsSettingsModalOpen(true);
      return;
    }
    setLoadingAI(true);

    const instruction = `Update the following PowerApps YAML code based on these field changes. Preserve all other logic and properties. Return ONLY the updated YAML code.
    Fields to Update: ${JSON.stringify(aiFields.map(f => ({ key: f.key, newValue: f.current })))}
    Note: For text values, ensure they are wrapped in PowerApps syntax like ="Value" if they were formulas before.`;

    try {
      const updatedYaml = await fetchGemini(apiKey, selectedComponent.yaml, instruction);
      if (updatedYaml) {
        const cleanYaml = updatedYaml.replace(/```yaml|```/g, "").trim();
        await handleSaveComponent({ ...selectedComponent, yaml: cleanYaml });
        setSelectedComponent({ ...selectedComponent, yaml: cleanYaml });
        showMessage("YAML updated from AI adjustments", "success");
      }
    } catch (e) {
      showMessage("Failed to update YAML", "error");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleGeneratePreview = async () => {
    if (!selectedComponent) return;
    if (!apiKey) {
      showMessage("Please configure your Gemini API Key in Settings first.", "error");
      setIsSettingsModalOpen(true);
      return;
    }
    setLoadingAI(true);
    try {
      const img = await generateImage(apiKey, selectedComponent.name + " " + (selectedComponent.catalog || "UI element"));
      if (img) {
        await handleSaveComponent({ ...selectedComponent, previewUrl: img });
        setSelectedComponent({ ...selectedComponent, previewUrl: img });
        showMessage("Preview generated", "success");
      } else {
        showMessage("AI Image failed.", "error");
      }
    } finally {
      setLoadingAI(false);
    }
  };

  const activeProject = useMemo(() =>
    projects.find(p => p.id === selectedProjectId),
    [projects, selectedProjectId]
  );

  const filteredComponents = useMemo(() => {
    return components.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.yaml && c.yaml.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTab = activeTab === 'all' || c.catalog === activeTab;

      let matchesProject = true;
      if (selectedProjectId) {
        matchesProject = activeProject?.componentIds?.includes(c.id);
      }

      return matchesSearch && matchesTab && matchesProject;
    });
  }, [components, searchQuery, activeTab, selectedProjectId, activeProject]);

  const cleanPowerAppsValue = (val) => {
    if (val === null || val === undefined) return "";
    let str = String(val).trim();
    if (str.startsWith('=')) str = str.substring(1).trim();
    if (str.startsWith('"') && str.endsWith('"')) str = str.substring(1, str.length - 1);
    return str;
  };

  const updateAiFieldValue = (key, value) => {
    setAiFields(prev => prev.map(f => f.key === key ? { ...f, current: value } : f));
  };

  // --- Sub-Components ---
  const ComponentModal = ({ component, isOpen, onClose }) => {
    const defaultCatalog = activeTab !== 'all' ? activeTab : (categories[0]?.slug ?? '');
    const [formData, setFormData] = useState(
      component
        ? { ...component }
        : { name: '', catalog: defaultCatalog, yaml: '' }
    );

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Layers className="text-blue-400" size={22} />
              {component ? 'Edit Component' : 'Add New Component'}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className={component ? "grid grid-cols-2 gap-6" : "grid grid-cols-1 gap-6"}>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Component Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  placeholder="e.g. Modern Primary Button"
                />
              </div>
              {component && (
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Catalog</label>
                  <select
                    value={formData.catalog}
                    onChange={e => setFormData({...formData, catalog: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                  >
                    {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">YAML Code</label>
              <textarea
                rows={12}
                value={formData.yaml}
                onChange={e => setFormData({...formData, yaml: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-5 text-emerald-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all leading-relaxed shadow-inner"
                placeholder="- Control: Button&#10;  Name: btnSubmit&#10;  X: 10&#10;  ..."
              />
            </div>
          </div>
          <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
            <button onClick={onClose} className="px-5 py-2 text-slate-400 hover:text-white font-bold transition-colors">Cancel</button>
            <button
              onClick={() => handleSaveComponent(formData)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              <Save size={18} />
              Save Component
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProjectModal = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderPlus className="text-blue-400" size={20} />
              Create Project
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="Internal Dashboard V2"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase">PowerApps URL</label>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="https://make.powerapps.com/apps/..."
              />
            </div>
          </div>
          <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
            <button onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancel</button>
            <button
              onClick={() => onSave(name, url)}
              disabled={!name}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SettingsModal = () => {
    const [tempKey, setTempKey] = useState(apiKey);

    if (!isSettingsModalOpen) return null;

    const handleSaveSettings = () => {
      localStorage.setItem('powerapps_gemini_key', tempKey);
      setApiKey(tempKey);
      setIsSettingsModalOpen(false);
      showMessage("Settings saved securely to your browser.", "success");
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings className="text-blue-400" size={20} />
              Configuration
            </h2>
            <button onClick={() => setIsSettingsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase">Gemini API Key</label>
              <input
                type="password"
                value={tempKey}
                onChange={e => setTempKey(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono text-sm"
                placeholder="AIzaSy..."
              />
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Your API key is required to use the AI Quick Tuning and Image Generation features. It is stored securely in your browser's local storage and is never sent to our servers.
              </p>
            </div>
          </div>
          <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
            <button onClick={() => setIsSettingsModalOpen(false)} className="px-4 py-2 text-slate-400 font-bold">Cancel</button>
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-600/40">
      {/* Toast Messages */}
      {message && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 border animate-in fade-in slide-in-from-bottom-4 duration-300 ${
          message.type === 'error' ? 'bg-red-900/80 border-red-700 text-red-100 backdrop-blur-md' :
          message.type === 'success' ? 'bg-emerald-900/80 border-emerald-700 text-emerald-100 backdrop-blur-md' :
          'bg-blue-900/80 border-blue-700 text-blue-100 backdrop-blur-md'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-bold">{message.text}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 flex flex-col bg-slate-900/50">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg">
              <Layers className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white italic">POWERHUB</h1>
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-bold transition-all shadow-sm"
          >
            <Plus size={18} />
            New Component
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Library</div>
          <button
            onClick={() => { setActiveTab('all'); setSelectedProjectId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all border ${activeTab === 'all' && !selectedProjectId ? 'bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-lg' : 'hover:bg-slate-800 text-slate-400 border-transparent'}`}
          >
            <Layout size={18} />
            All Repository
          </button>
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => { setActiveTab(cat.slug); setSelectedProjectId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all border ${activeTab === cat.slug && !selectedProjectId ? 'bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-lg' : 'hover:bg-slate-800 text-slate-400 border-transparent'}`}
            >
              <ChevronRight size={14} className={`transition-transform duration-300 ${activeTab === cat.slug ? 'rotate-90 text-blue-400' : ''}`} />
              {cat.name}
            </button>
          ))}

          <div className="mt-8 px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Projects</div>
          {projects.map(proj => (
            <button
              key={proj.id}
              onClick={() => { setSelectedProjectId(proj.id); setActiveTab('all'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all border ${selectedProjectId === proj.id ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20 shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-transparent'}`}
            >
              <div className={`w-2 h-2 rounded-full ${selectedProjectId === proj.id ? 'bg-indigo-400' : 'bg-slate-600'}`} />
              <span className="truncate">{proj.name}</span>
              <span className="ml-auto bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full text-[10px] font-bold">{proj.componentIds?.length || 0}</span>
            </button>
          ))}
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-blue-400 hover:bg-blue-600/10 border border-transparent transition-all mt-2"
          >
            <Plus size={16} />
            Create Project
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/20">
           <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-inner ring-1 ring-slate-700">
                PH
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate uppercase tracking-tight">Active User</p>
                <p className="text-[10px] text-slate-500 truncate font-mono">powerhub@local</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex-1 flex items-center gap-4">
             {selectedProjectId && activeProject ? (
               <div className="flex items-center gap-4">
                 <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <FolderPlus size={14} className="text-indigo-400" />
                      {activeProject.name}
                    </h2>
                    <p className="text-[10px] text-slate-500">Project View Filter Active</p>
                 </div>
                 {activeProject.url && (
                   <a
                     href={activeProject.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg"
                   >
                     <ExternalLink size={12} />
                     Open in PowerApps
                   </a>
                 )}
               </div>
             ) : (
               <div className="flex-1 max-w-xl relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search library..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder:text-slate-600"
                  />
               </div>
             )}
          </div>
          <div className="flex items-center gap-4 ml-6">
            {selectedProjectId && (
              <button
                onClick={() => setSelectedProjectId(null)}
                className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase"
              >
                Clear Project Filter
              </button>
            )}
            <button onClick={() => setIsSettingsModalOpen(true)} className="p-2 text-slate-400 hover:text-white transition-colors"><Settings size={20}/></button>
          </div>
        </header>

        {/* Gallery/Editor Browser */}
        <div className="flex-1 overflow-hidden flex">
          {/* Gallery View */}
          <div className={`flex-1 overflow-y-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start transition-all ${selectedComponent ? 'hidden lg:grid' : ''}`}>
            {filteredComponents.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-600">
                <Layout size={64} className="mb-4 opacity-20" />
                <p className="text-lg font-bold">No components found</p>
                {selectedProjectId && <p className="text-xs text-slate-500">Add components to this project using the detail panel.</p>}
              </div>
            ) : (
              filteredComponents.map(comp => (
                <div
                  key={comp.id}
                  onClick={() => { setSelectedComponent(comp); setAiFields([]); }}
                  className={`group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-[300px] ${selectedComponent?.id === comp.id ? 'ring-2 ring-blue-600 border-transparent' : ''}`}
                >
                  <div className="h-44 bg-slate-950 border-b border-slate-800 relative flex items-center justify-center overflow-hidden">
                    {comp.previewUrl ? (
                      <img src={comp.previewUrl} alt={comp.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="text-slate-800 flex flex-col items-center gap-3">
                         <ImageIcon size={32} />
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Preview Missing</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                       <button
                         onClick={(e) => { e.stopPropagation(); copyToClipboard(comp.yaml); }}
                         className="p-1.5 bg-slate-900/80 hover:bg-blue-600 rounded-lg text-white shadow-xl"
                       >
                         <Copy size={14} />
                       </button>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors truncate mb-1">{comp.name}</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{comp.catalog}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-800/50">
                        <span className="text-[10px] font-mono text-emerald-500/60">YAML CODE</span>
                        <ChevronRight size={14} className="text-slate-700" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Active Component Detail View */}
          {selectedComponent && (
            <div className="w-full lg:w-[600px] border-l border-slate-800 bg-slate-900 flex flex-col shadow-2xl relative">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0">
                  <button onClick={() => setSelectedComponent(null)} className="lg:hidden p-2 text-slate-400 hover:text-white"><X size={20} /></button>
                  <h2 className="text-lg font-bold text-white truncate">{selectedComponent.name}</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><Edit3 size={18} /></button>
                  <button onClick={() => handleDelete(selectedComponent.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"><Trash2 size={18} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Visual Snapshot */}
                <div className="p-6 bg-slate-950/30 border-b border-slate-800">
                  <div className="aspect-video w-full rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group shadow-lg">
                    {selectedComponent.previewUrl ? (
                      <img src={selectedComponent.previewUrl} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-slate-700 text-center p-6">
                        <ImageIcon size={48} className="mx-auto mb-2 opacity-10" />
                        <p className="text-sm italic font-medium opacity-40">Add AI context mockup</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <button
                        onClick={handleGeneratePreview}
                        disabled={loadingAI}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-2xl active:scale-95 disabled:opacity-50 transition-all"
                      >
                        {loadingAI ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                        {selectedComponent.previewUrl ? 'Regenerate' : 'Generate Preview'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Assignment Section */}
                <div className="p-6 border-b border-slate-800 bg-slate-800/20">
                  <h3 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-widest mb-4">
                    <FolderPlus size={16} className="text-indigo-400" />
                    Add Component to Project
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projects.map(p => {
                      const isActive = p.componentIds?.includes(selectedComponent.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleAddToProject(selectedComponent.id, p.id)}
                          disabled={isActive}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all border shadow-sm ${
                            isActive
                            ? 'bg-emerald-900/20 border-emerald-800/50 text-emerald-400 cursor-default'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white hover:border-slate-500'
                          }`}
                        >
                          {isActive ? <CheckCircle2 size={14} /> : <Plus size={14} />}
                          <span className="truncate max-w-[120px]">{p.name.toUpperCase()}</span>
                        </button>
                      );
                    })}
                    {projects.length === 0 && (
                      <p className="text-xs text-slate-500 italic">No projects created yet.</p>
                    )}
                  </div>
                </div>

                {/* AI Adjust Panel */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-widest text-slate-400">
                      <Sparkles size={16} className="text-blue-500" />
                      Quick Tuning
                    </h3>
                    {aiFields.length === 0 && !loadingAI && (
                      <button
                        onClick={() => analyzeYAMLForQuickEdit(selectedComponent.yaml)}
                        className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase"
                      >
                        Analyze Code
                      </button>
                    )}
                  </div>

                  {loadingAI && aiFields.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500 bg-slate-800/20 rounded-2xl border border-slate-800 border-dashed">
                      <Loader2 className="animate-spin text-blue-500" size={32} />
                      <p className="text-xs font-bold tracking-tight">AI Analysis in progress...</p>
                    </div>
                  ) : aiFields.length > 0 ? (
                    <div className="space-y-5 bg-slate-800/30 p-6 rounded-[24px] border border-slate-800 shadow-inner">
                      {aiFields.map((field, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center px-1">
                             <div className="flex items-center gap-2">
                               <div className="p-1 bg-slate-900 rounded ring-1 ring-slate-800">
                                 {field.type === 'color' && <Palette size={12} className="text-blue-400" />}
                                 {field.type === 'number' && <Hash size={12} className="text-emerald-400" />}
                                 {field.type === 'text' && <TypeIcon size={12} className="text-amber-400" />}
                               </div>
                               <label className="text-xs font-bold text-slate-400 tracking-tight uppercase">{field.label}</label>
                             </div>
                             <span className="text-[10px] font-mono text-slate-600">{field.key}</span>
                          </div>

                          <div className="relative group">
                            {field.type === 'color' ? (
                              <div className="flex gap-3">
                                 <div className="relative w-10 h-10 shrink-0 group">
                                   <input
                                     type="color"
                                     value={field.current}
                                     onChange={(e) => updateAiFieldValue(field.key, e.target.value)}
                                     className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                                   />
                                   <div className="w-full h-full rounded-xl border border-slate-700 shadow-lg" style={{ backgroundColor: field.current }} />
                                 </div>
                                 <input
                                   type="text"
                                   value={field.current}
                                   onChange={(e) => updateAiFieldValue(field.key, e.target.value)}
                                   className="flex-1 bg-slate-950 text-xs p-3 rounded-xl border border-slate-800 font-mono text-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600/50"
                                 />
                              </div>
                            ) : field.type === 'number' ? (
                              <input
                                type="number"
                                value={cleanPowerAppsValue(field.current)}
                                onChange={(e) => updateAiFieldValue(field.key, e.target.value)}
                                className="w-full bg-slate-950 text-xs p-3 rounded-xl border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-600/50"
                              />
                            ) : (
                              <input
                                type="text"
                                value={cleanPowerAppsValue(field.current)}
                                onChange={(e) => updateAiFieldValue(field.key, e.target.value)}
                                className="w-full bg-slate-950 text-xs p-3 rounded-xl border border-slate-800 text-emerald-400 focus:outline-none focus:ring-1 focus:ring-blue-600/50"
                                placeholder="Value..."
                              />
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-slate-800 mt-2">
                         <button
                           onClick={handleUpdateYamlFromAi}
                           disabled={loadingAI}
                           className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                         >
                           {loadingAI ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                           Update Code Source
                         </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-16 text-center text-slate-700 border-2 border-dashed border-slate-800 rounded-[32px] px-8">
                      <Sparkles size={32} className="mx-auto mb-4 opacity-10" />
                      <p className="text-xs font-bold uppercase tracking-widest mb-1">AI Tuning Engine</p>
                      <p className="text-[11px] leading-relaxed">Extract and tune properties from YAML instantly.</p>
                    </div>
                  )}
                </div>

                {/* YAML Snippet Viewer */}
                <div className="p-6 pt-0 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Raw Source</h3>
                    <button onClick={() => copyToClipboard(selectedComponent.yaml)} className="text-[10px] font-bold text-blue-400 hover:underline uppercase">Copy Snippet</button>
                  </div>
                  <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] font-mono text-emerald-500/70 overflow-x-auto leading-relaxed shadow-inner">
                    {selectedComponent.yaml}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ComponentModal isOpen={isAdding} onClose={() => setIsAdding(false)} />
      {isEditing && selectedComponent && (
        <ComponentModal isOpen={true} component={selectedComponent} onClose={() => setIsEditing(false)} />
      )}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={createNewProject}
      />
      <SettingsModal />

      {/* Custom Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
}


