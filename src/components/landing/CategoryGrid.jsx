import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  MousePointer2,
  LayoutTemplate,
  Shield,
  CalendarDays,
  Square,
  ArrowRightToLine,
  ChevronDown,
  Image as ImageIcon,
  LayoutGrid,
  MessageSquare,
  Menu,
  PanelLeftClose,
  PlusCircle,
  Layout,
  Bell,
  ToggleLeft,
  TextCursorInput,
  Boxes,
} from "lucide-react";
import { getCategories } from "../../lib/api";

const SLUG_TO_ICON = {
  accordions: ChevronDown,
  animations: LayoutGrid,
  "app-shells": LayoutTemplate,
  badges: Shield,
  "button-group": Layers,
  buttons: MousePointer2,
  calendars: CalendarDays,
  cards: Square,
  drawers: ArrowRightToLine,
  dropdowns: ChevronDown,
  forms: Layout,
  gallery: ImageIcon,
  "input-fields": TextCursorInput,
  modals: MessageSquare,
  navigation: Menu,
  sidebars: PanelLeftClose,
  "speed-dial": PlusCircle,
  tabs: Boxes,
  toast: Bell,
  toggles: ToggleLeft,
};

export function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl border border-white/10 bg-white/5"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => {
            const Icon = SLUG_TO_ICON[cat.slug] ?? Square;
            const count = cat.component_count ?? 0;
            return (
              <Link
                key={cat.slug}
                to={`/library/${cat.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-blue-500/50 hover:bg-white/10"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Icon className="size-5" />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-white uppercase">
                    {cat.name}
                  </h3>
                  <p className="mb-4 text-sm text-slate-400 line-clamp-2">
                    {cat.description}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    {count} Components
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
