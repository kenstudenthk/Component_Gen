import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Navbar from "../components/Navbar";
import CategoryGrid from "../components/CategoryGrid";
import { getCategories } from "../lib/api";

export default function Library() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredCategories = searchQuery
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-1">Component Library</h1>
        <p className="text-slate-400 text-sm mb-6">
          Select a category to browse components.
        </p>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search categories..."
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

        {loading && (
          <p className="text-slate-500 text-sm">Loading categories…</p>
        )}
        {error && (
          <p className="text-red-400 text-sm">Error: {error}</p>
        )}
        {!loading && !error && filteredCategories.length === 0 && (
          <p className="text-slate-500 text-sm">
            No categories found matching "{searchQuery}"
          </p>
        )}
        {!loading && !error && filteredCategories.length > 0 && (
          <>
            {searchQuery && (
              <p className="text-slate-400 text-sm mb-4">
                Found <span className="font-bold text-blue-400">{filteredCategories.length}</span> {filteredCategories.length === 1 ? "category" : "categories"}
              </p>
            )}
            <CategoryGrid categories={filteredCategories} />
          </>
        )}
      </main>
    </div>
  );
}
