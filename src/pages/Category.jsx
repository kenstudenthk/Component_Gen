import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Search, X } from "lucide-react";
import Navbar from "../components/Navbar";
import ComponentCard from "../components/ComponentCard";
import { getComponents, getCategories } from "../lib/api";

export default function Category() {
  const { slug } = useParams();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setFilterText('');

    Promise.all([
      getComponents(slug),
      getCategories(),
    ])
      .then(([comps, cats]) => {
        setComponents(comps);
        const cat = cats.find((c) => c.slug === slug);
        if (cat) {
          setCategoryName(cat.name);
          setCategoryDesc(cat.description ?? '');
        } else {
          const formatted = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
          setCategoryName(formatted);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const filtered = useMemo(() => {
    if (!filterText.trim()) return components;
    const q = filterText.toLowerCase();
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.tags && c.tags.toLowerCase().includes(q))
    );
  }, [components, filterText]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        <Link
          to="/library"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          Library
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
            {categoryName || slug}
          </h1>
          {categoryDesc && (
            <p className="text-slate-400 text-sm mb-1">{categoryDesc}</p>
          )}
          {!loading && !error && (
            <p className="text-slate-500 text-xs">
              {filterText
                ? `Showing ${filtered.length} of ${components.length} components`
                : `${components.length} component${components.length !== 1 ? 's' : ''}`}
            </p>
          )}
        </div>

        {/* In-category search */}
        {!loading && !error && components.length > 3 && (
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter components…"
              className="w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-8 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
            />
            {filterText && (
              <button
                onClick={() => setFilterText('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-3xl border border-white/5 bg-[#151515]" />
            ))}
          </div>
        )}
        {error && (
          <p className="text-red-400 text-sm">Error: {error}</p>
        )}
        {!loading && !error && components.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 text-sm mb-2">No components in this category yet.</p>
            <Link to="/admin/new" className="text-blue-400 hover:text-blue-300 text-sm">
              Add one →
            </Link>
          </div>
        )}
        {!loading && !error && components.length > 0 && filtered.length === 0 && (
          <p className="text-slate-500 text-sm py-8 text-center">
            No components match "{filterText}"
          </p>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <ComponentCard key={c.id} component={c} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
