import { Link } from "react-router-dom";
import { Square, MousePointerClick, Tag, ChevronDown, Layout } from "lucide-react";

const ICONS = {
  buttons: MousePointerClick,
  forms: Square,
  badges: Tag,
  accordions: ChevronDown,
  shells: Layout,
};

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => {
        const Icon = ICONS[cat.slug] ?? Square;
        return (
          <Link
            key={cat.id}
            to={`/library/${cat.slug}`}
            className="group rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500/50 hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <Icon size={18} />
              </div>
              <h2 className="font-semibold text-white">{cat.name}</h2>
            </div>
            {cat.description && (
              <p className="text-sm text-slate-400 leading-relaxed">
                {cat.description}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
