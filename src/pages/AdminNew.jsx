import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import YamlViewer from "../components/YamlViewer";
import { createComponent } from "../lib/api";

const CATEGORY_SLUGS = ["buttons", "forms", "badges", "accordions", "shells"];

const EMPTY_FORM = {
  name: "",
  category_slug: "buttons",
  description: "",
  yaml: "",
  tags: "",
};

export default function AdminNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.yaml.trim()) {
      setError("Name and YAML are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createComponent(form);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-10">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          Admin
        </Link>

        <h1 className="text-2xl font-bold text-white mb-8">New Component</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-300">
              Name <span className="text-red-400">*</span>
            </span>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Primary Button"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </label>

          {/* Category */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-300">Category</span>
            <select
              value={form.category_slug}
              onChange={set("category_slug")}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              {CATEGORY_SLUGS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </label>

          {/* Description */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-300">Description</span>
            <input
              type="text"
              value={form.description}
              onChange={set("description")}
              placeholder="Short description"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </label>

          {/* Tags */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-300">Tags</span>
            <input
              type="text"
              value={form.tags}
              onChange={set("tags")}
              placeholder="Comma-separated, e.g. primary, filled"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </label>

          {/* YAML */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-300">
              YAML <span className="text-red-400">*</span>
            </span>
            <textarea
              value={form.yaml}
              onChange={set("yaml")}
              placeholder="Paste Power Apps Canvas YAML here…"
              rows={12}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-y"
            />
          </label>

          {/* Preview */}
          {form.yaml.trim() && (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-300">Preview</span>
              <YamlViewer yaml={form.yaml} />
            </div>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
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
