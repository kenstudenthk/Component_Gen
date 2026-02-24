import { Link } from "react-router-dom";
import { ArrowRight, Layers } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 mb-6">
          <Layers size={28} className="text-blue-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Power Apps Component Library
        </h1>
        <p className="max-w-xl text-slate-400 text-lg leading-relaxed mb-8">
          Browse production-ready Power Apps Canvas components. Copy the YAML
          and paste directly into Power Apps Studio.
        </p>
        <Link
          to="/library"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          Browse Library
          <ArrowRight size={16} />
        </Link>
      </main>
    </div>
  );
}
