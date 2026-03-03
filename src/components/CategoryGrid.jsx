import { Link } from "react-router-dom";
import {
  Square,
  MousePointerClick,
  Tag,
  ChevronDown,
  Layout,
  AppWindow,
  Box,
  Calendar,
  CreditCard,
  PanelLeft,
  ChevronRight,
  Type,
  SquareStack,
  Monitor,
  Layers,
  Bell,
  ToggleLeft,
  Zap,
  Play,
  Image,
} from "lucide-react";

const ICONS = {
  accordions: ChevronDown,
  animations: Play,
  "app-shells": AppWindow,
  badges: Tag,
  "button-group": SquareStack,
  buttons: MousePointerClick,
  calendars: Calendar,
  cards: CreditCard,
  drawers: Box,
  dropdowns: ChevronRight,
  forms: Layout,
  gallery: Image,
  "input-fields": Type,
  modals: Square,
  navigation: Monitor,
  sidebars: PanelLeft,
  "speed-dial": Zap,
  tabs: Layers,
  toast: Bell,
  toggles: ToggleLeft,
};

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => {
        const Icon = ICONS[cat.slug] ?? Square;
        const componentCount = cat.component_count ?? 0;
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
              <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded">
                {componentCount}
              </span>
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
