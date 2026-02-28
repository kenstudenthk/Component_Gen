import { Link } from "react-router-dom";
import { 
  Layers, MousePointer2, LayoutTemplate, Shield, 
  CalendarDays, Square, ArrowRightToLine, ChevronDown, 
  Image as ImageIcon, LayoutGrid, MessageSquare, Menu, 
  PanelLeftClose, PlusCircle, Layout, Bell, ToggleLeft, TextCursorInput 
} from "lucide-react";

const CLONE_CATEGORIES = [
  { slug: "accordions", name: "ACCORDIONS", description: "Collapsible content sections and lists", count: 3, free: 1, icon: ChevronDown },
  { slug: "animations", name: "ANIMATIONS", description: "Animated components and visual effects", count: 5, icon: LayoutGrid },
  { slug: "app-shells", name: "APP SHELLS", description: "Complete app layouts and shell templates", count: 6, icon: LayoutTemplate },
  { slug: "badge", name: "BADGE", description: "Status badges, labels, and notification indicators", count: 4, icon: Shield },
  { slug: "buttons", name: "BUTTONS", description: "Interactive buttons with various styles", count: 6, free: 2, icon: MousePointer2 },
  { slug: "button-group", name: "BUTTON GROUP", description: "Grouped buttons and button collections", count: 1, icon: Layers },
  { slug: "calendars", name: "CALENDARS", description: "Date pickers, time pickers, and calendar components", count: 3, icon: CalendarDays },
  { slug: "cards", name: "CARDS", description: "Profile cards and content containers", count: 4, free: 1, icon: Square },
  { slug: "drawer", name: "DRAWER", description: "Slide-out panels and side drawers", count: 2, free: 2, icon: ArrowRightToLine },
  { slug: "dropdowns", name: "DROPDOWNS", description: "Dropdown menus and selection components", count: 8, free: 1, isNew: 1, icon: ChevronDown },
  { slug: "gallery", name: "GALLERY", description: "Image galleries, carousels, and media displays", count: 3, isNew: 1, icon: ImageIcon },
  { slug: "modals", name: "MODALS", description: "Modal dialogs, confirmations, and overlays", count: 11, free: 1, isNew: 1, icon: MessageSquare },
  { slug: "navigation-bars", name: "NAVIGATION BARS", description: "Navigation bars, menus, and app headers", count: 5, icon: Menu },
  { slug: "sidebars", name: "SIDEBARS", description: "Navigation sidebars and menus", count: 7, free: 1, isNew: 2, icon: PanelLeftClose },
  { slug: "speed-dial", name: "SPEED DIAL", description: "Floating action buttons with quick access menus", count: 3, icon: PlusCircle },
  { slug: "tabs", name: "TABS", description: "Tab bars and navigation components", count: 6, free: 1, icon: Layout },
  { slug: "toast", name: "TOAST", description: "Toast notifications and user alerts", count: 5, free: 1, icon: Bell },
  { slug: "toggles", name: "TOGGLES", description: "Toggle switches, checkboxes, and on/off controls", count: 6, free: 1, icon: ToggleLeft },
  { slug: "input-fields", name: "INPUT FIELDS", description: "Text inputs, search fields, and data entry components", count: 2, free: 1, icon: TextCursorInput },
];

export function CategoryGrid({ activeFilter }) {
  // Currently shows all CLONE_CATEGORIES regardless of activeFilter
  // Future: add filtering logic when Full Apps/Tools data exists

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CLONE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
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
                  <div className="flex flex-col gap-1 items-end">
                    {cat.free && (
                      <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                        +{cat.free} Free
                      </span>
                    )}
                    {cat.isNew && (
                      <span className="inline-flex items-center rounded bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                        {cat.isNew} New
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-white">{cat.name}</h3>
                  <p className="mb-4 text-sm text-slate-400 line-clamp-2">{cat.description}</p>
                  <p className="text-xs font-medium text-slate-500">{cat.count} Components</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}