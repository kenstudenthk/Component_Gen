import { Link } from "react-router-dom";
import {
  AlignJustify,
  AppWindow,
  Bell,
  Calendar,
  ChevronDown,
  Copy,
  Image,
  Layout,
  Layers,
  Menu,
  Monitor,
  MousePointer2,
  PanelLeft,
  Play,
  Sliders,
  Square,
  Tag,
  ToggleLeft,
  Type,
  Zap,
} from "lucide-react";

const ICONS = {
  accordions: ChevronDown,
  animations: Play,
  "app-shells": Monitor,
  badges: Tag,
  "button-group": Copy,
  buttons: MousePointer2,
  calendars: Calendar,
  cards: Square,
  drawers: PanelLeft,
  dropdowns: Sliders,
  forms: Layout,
  gallery: Image,
  "input-fields": Type,
  modals: Layers,
  navigation: Menu,
  sidebars: AppWindow,
  "speed-dial": Zap,
  tabs: AlignJustify,
  toast: Bell,
  toggles: ToggleLeft,
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Icon size={18} />
                </div>
                <h2 className="font-semibold text-white">{cat.name}</h2>
              </div>
              {Number(cat.component_count) > 0 && (
                <span className="text-xs font-semibold text-slate-500 bg-slate-800 group-hover:bg-slate-700 px-2 py-0.5 rounded-full transition-colors">
                  {cat.component_count}
                </span>
              )}
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
