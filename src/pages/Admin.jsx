import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { getComponents, deleteComponent } from "../lib/api";

export default function Admin() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = () => {
    setLoading(true);
    getComponents()
      .then(setComponents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    setDeletingId(id);
    try {
      await deleteComponent(id);
      setComponents((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      alert("Delete failed: " + e.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Manage all components.
            </p>
          </div>
          <Link
            to="/admin/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            <Plus size={15} />
            New Component
          </Link>
        </div>

        {loading && <p className="text-slate-500 text-sm">Loading…</p>}
        {error && <p className="text-red-400 text-sm">Error: {error}</p>}

        {!loading && !error && components.length === 0 && (
          <p className="text-slate-500 text-sm">No components yet.</p>
        )}

        {!loading && !error && components.length > 0 && (
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Category</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Tags</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {components.map((c) => (
                  <tr key={c.id} className="bg-slate-900 hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-slate-400">{c.category_slug}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{c.tags || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/edit/${c.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                          <Pencil size={13} />
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id, c.name)}
                          disabled={deletingId === c.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
