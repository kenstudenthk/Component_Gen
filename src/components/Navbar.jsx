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
    <header className="border-b border-slate-800 bg-[#0f1115]">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <Layers size={18} className="text-blue-400" />
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
