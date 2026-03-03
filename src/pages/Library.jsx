import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { CategoryGrid } from "../components/landing/CategoryGrid";
import { Footer } from "../components/landing/Footer";
import ComponentCard from "../components/ComponentCard";
import { getCategories, searchComponents } from "../lib/api";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Library() {
  const [activeFilter, setActiveFilter] = useState("Categories");
  const [totalComponents, setTotalComponents] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    getCategories()
      .then((cats) => {
        const total = cats.reduce(
          (sum, c) => sum + (c.component_count ?? 0),
          0,
        );
        setTotalComponents(total);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    setSearchLoading(true);
    searchComponents(debouncedQuery)
      .then(setSearchResults)
      .catch(console.error)
      .finally(() => setSearchLoading(false));
  }, [debouncedQuery]);

  // Group search results by category
  const groupedResults = searchResults.reduce((acc, comp) => {
    const key = comp.category_slug;
    if (!acc[key]) acc[key] = [];
    acc[key].push(comp);
    return acc;
  }, {});

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] font-sans text-white">
      <Header />
      <main className="flex-1">
        <Hero
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          totalComponents={totalComponents}
        />

        {/* Global Search Bar */}
        <div className="mx-auto max-w-2xl px-6 pb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components by name or tag…"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/8 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {isSearching ? (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            {searchLoading ? (
              <p className="text-slate-500 text-sm text-center py-12">
                Searching…
              </p>
            ) : searchResults.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-12">
                No components found for "{searchQuery}"
              </p>
            ) : (
              <>
                <p className="text-slate-400 text-sm mb-8">
                  {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} for "
                  <span className="text-white font-medium">{searchQuery}</span>"
                </p>
                {Object.entries(groupedResults).map(([slug, comps]) => (
                  <div key={slug} className="mb-12">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                      {slug.replace(/-/g, " ")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {comps.map((c) => (
                        <ComponentCard key={c.id} component={c} />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </section>
        ) : (
          <CategoryGrid activeFilter={activeFilter} />
        )}
      </main>
      <Footer />
    </div>
  );
}
