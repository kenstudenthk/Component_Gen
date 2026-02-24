import { Link, useLocation } from "react-router-dom";
import { Layers, Settings } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();

  const navLink = (to, label) => {
    const active = pathname === to || pathname.startsWith(to + "/");
    return (
      <Link
        to={to}
        className={`text-sm font-medium transition-colors ${
          active ? "text-white" : "text-slate-400 hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="border-b border-white/5 bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 text-white font-bold tracking-tight">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Layers size={18} className="text-white" />
          </div>
          PowerLibs
        </Link>
        <nav className="flex items-center gap-6">
          {navLink("/library", "Library")}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <Settings size={14} />
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
