import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CategoryGrid from "../components/CategoryGrid";
import { getCategories } from "../lib/api";

export default function Library() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-1">Component Library</h1>
        <p className="text-slate-400 text-sm mb-8">
          Select a category to browse components.
        </p>

        {loading && (
          <p className="text-slate-500 text-sm">Loading categories…</p>
        )}
        {error && (
          <p className="text-red-400 text-sm">Error: {error}</p>
        )}
        {!loading && !error && (
          <CategoryGrid categories={categories} />
        )}
      </main>
    </div>
  );
}
