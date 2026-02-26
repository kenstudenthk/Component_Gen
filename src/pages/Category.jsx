import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Search, X } from "lucide-react";
import Navbar from "../components/Navbar";
import ComponentCard from "../components/ComponentCard";
import { getComponents } from "../lib/api";

export default function Category() {
  const { slug } = useParams();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        if (!cancelled) setLoading(true);
        if (!cancelled) setError(null);
        const data = await getComponents(slug);
        if (!cancelled) setComponents(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : "Components";

  const filteredComponents = searchQuery
    ? components.filter((comp) =>
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.tags?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : components;

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

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
              <p className="text-slate-400 text-sm">
                Click "Copy YAML" on any card, then paste into Power Apps Studio.
              </p>
            </div>
            {!loading && !error && components.length > 0 && (
              <div className="text-sm text-slate-500">
                Showing <span className="font-bold text-blue-400">{filteredComponents.length}</span> of {components.length} {components.length === 1 ? "component" : "components"}
              </div>
            )}
          </div>

          {/* In-Category Search */}
          {!loading && !error && components.length > 0 && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search components in this category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          )}
        </div>

        {loading && (
          <p className="text-slate-500 text-sm">Loading components…</p>
        )}
        {error && (
          <p className="text-red-400 text-sm">Error: {error}</p>
        )}
        {!loading && !error && components.length === 0 && (
          <p className="text-slate-500 text-sm">
            No components yet.{" "}
            <Link to="/admin/new" className="text-blue-400 hover:text-blue-300">
              Add one →
            </Link>
          </p>
        )}
        {!loading && !error && components.length > 0 && filteredComponents.length === 0 && (
          <p className="text-slate-500 text-sm">
            No components found matching "{searchQuery}"
          </p>
        )}
        {!loading && !error && filteredComponents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.map((c) => (
              <ComponentCard key={c.id} component={c} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
