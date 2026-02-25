import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import CategoryGrid from "../components/CategoryGrid";
import { getCategories } from "../lib/api";

export default function Library() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = categories.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">
              Component Library
            </h1>
            <p className="text-slate-400 text-sm">
              {categories.length > 0
                ? `${categories.length} categories · ${categories.reduce((s, c) => s + (c.component_count || 0), 0)} components`
                : "Select a category to browse components."}
            </p>
          </div>
          {!loading && !error && categories.length > 0 && (
            <div className="relative w-full sm:w-72">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          )}
        </div>

        {loading && (
          <p className="text-slate-500 text-sm">Loading categories…</p>
        )}
        {error && <p className="text-red-400 text-sm">Error: {error}</p>}
        {!loading && !error && (
          <>
            <CategoryGrid categories={filtered} />
            {filtered.length === 0 && search && (
              <p className="text-slate-500 text-sm mt-8 text-center">
                No categories match &ldquo;{search}&rdquo;
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
