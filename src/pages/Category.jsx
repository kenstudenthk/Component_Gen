import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import ComponentCard from "../components/ComponentCard";
import { getComponents } from "../lib/api";

function slugToTitle(slug) {
  if (!slug) return "Components";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function Category() {
  const { slug } = useParams();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSearch("");
    getComponents(slug)
      .then(setComponents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const filtered = components.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.tags?.toLowerCase().includes(search.toLowerCase())
  );

  const title = slugToTitle(slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        <Link
          to="/library"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          Library
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
            <p className="text-slate-400 text-sm">
              {!loading && !error
                ? `${components.length} component${components.length !== 1 ? "s" : ""} · Click "Copy YAML" then paste into Power Apps Studio.`
                : "Click \u201cCopy YAML\u201d on any card, then paste into Power Apps Studio."}
            </p>
          </div>
          {!loading && !error && components.length > 0 && (
            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Filter components…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          )}
        </div>

        {loading && (
          <p className="text-slate-500 text-sm">Loading components…</p>
        )}
        {error && <p className="text-red-400 text-sm">Error: {error}</p>}
        {!loading && !error && components.length === 0 && (
          <p className="text-slate-500 text-sm">
            No components yet.{" "}
            <Link to="/admin/new" className="text-blue-400 hover:text-blue-300">
              Add one →
            </Link>
          </p>
        )}
        {!loading && !error && components.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((c) => (
                <ComponentCard key={c.id} component={c} />
              ))}
            </div>
            {filtered.length === 0 && search && (
              <p className="text-slate-500 text-sm mt-8 text-center">
                No components match &ldquo;{search}&rdquo;
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
