import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          {/* A simple placeholder logo using a div or SVG */}
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500 text-white font-bold">
            P
          </div>
          <span className="font-bold tracking-tight text-white text-xl">POWERLIBS</span>
        </Link>

        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center size-9 rounded-md border border-white/10 bg-transparent text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <Sun className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}