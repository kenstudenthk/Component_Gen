import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import ComponentCard from "../components/ComponentCard";
import { getComponents } from "../lib/api";

export default function Category() {
  const { slug } = useParams();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getComponents(slug)
      .then(setComponents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const title = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : "Components";

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

        <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
        <p className="text-slate-400 text-sm mb-8">
          Click "Copy YAML" on any card, then paste into Power Apps Studio.
        </p>

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
        {!loading && !error && components.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((c) => (
              <ComponentCard key={c.id} component={c} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
