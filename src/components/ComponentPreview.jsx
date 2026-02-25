import React from "react";
import { Loader2, ChevronRight, Box, Sparkles } from "lucide-react";

export default function ComponentPreview({ settings }) {
  return (
    <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl overflow-hidden p-10 relative shadow-inner border border-slate-100">
      <div className="flex-1 flex items-center justify-center w-full">
        {settings.type === "form" && (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 scale-90">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight mb-1">
                {settings.title}
              </h2>
              <p className="text-slate-500 text-xs">
                {settings.subtitle}
              </p>
            </div>
            <div className="space-y-4 mb-8">
              {(settings.fields || []).map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <input
                    disabled
                    placeholder={field.placeholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg">
                {settings.primaryButtonText}
              </button>
              <button className="flex-1 bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-lg">
                {settings.secondaryButtonText}
              </button>
            </div>
          </div>
        )}
        
        {settings.type === "button" && (
          <button
            style={{
              backgroundColor: settings.fillColor,
              background: settings.gradientStartColor ? `linear-gradient(to right, ${settings.gradientStartColor}, ${settings.gradientEndColor})` : settings.fillColor,
              color: settings.textColor,
              borderRadius: `${settings.radius}px`,
              width: settings.width ? `${settings.width}px` : "auto",
              border: settings.borderColor ? `${settings.borderThickness || 1}px solid ${settings.borderColor}` : "none",
              boxShadow: settings.dropShadow ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none",
            }}
            className="py-3 px-8 font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {settings.loadingState && <Loader2 className="w-4 h-4 animate-spin" />}
            {settings.icon && (settings.iconPosition === "left" || !settings.iconPosition) && <Box className="w-4 h-4" />}
            {settings.text}
            {settings.icon && settings.iconPosition === "right" && <Box className="w-4 h-4" />}
          </button>
        )}
        
        {settings.type === "badge" && (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              settings.theme === "success" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" :
              settings.theme === "warning" ? "bg-amber-100 text-amber-700 border border-amber-200" :
              settings.theme === "error" ? "bg-red-100 text-red-700 border border-red-200" :
              "bg-blue-100 text-blue-700 border border-blue-200"
            }`}
          >
            {settings.text}
          </span>
        )}

        {settings.type === "inputField" && (
          <div className="w-full max-w-xs space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              {settings.label}
            </label>
            <input
              disabled
              placeholder={settings.placeholder}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow-sm"
            />
            {settings.helperText && (
              <p className="text-[9px] text-slate-400 italic">{settings.helperText}</p>
            )}
          </div>
        )}

        {settings.type === "toggle" && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">{settings.label}</span>
            <div 
              style={{ backgroundColor: settings.isOn ? (settings.activeColor || "#22c55e") : "#e2e8f0" }}
              className="w-10 h-5 rounded-full relative transition-colors cursor-not-allowed"
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings.isOn ? "left-5.5" : "left-0.5"}`} />
            </div>
          </div>
        )}

        {settings.type === "dropdown" && (
          <div className="w-full max-w-xs space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              {settings.label}
            </label>
            <div className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow-sm flex justify-between items-center text-slate-500">
              {settings.items?.[0] || "Select..."}
              <ChevronDown size={14} />
            </div>
          </div>
        )}

        {settings.type === "buttonGroup" && (
          <div className="flex border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            {(settings.items || ["Item 1", "Item 2"]).map((item, idx) => (
              <div 
                key={idx}
                className={`px-4 py-2 text-xs font-bold border-r border-slate-200 last:border-0 ${
                  settings.activeItem === item ? "bg-blue-600 text-white" : "bg-white text-slate-600"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {settings.type === "card" && (
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{settings.title}</h3>
            <p className="text-blue-500 text-xs font-bold mb-4 uppercase tracking-wider">{settings.subtitle}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{settings.body}</p>
            <div className="mt-6 flex justify-end">
              <button className="text-blue-600 font-bold text-xs uppercase tracking-widest">Read More</button>
            </div>
          </div>
        )}

        {settings.type === "navigation" && (
          <div className="w-full h-16 rounded-xl overflow-hidden shadow-lg flex items-center px-6 gap-8 border border-slate-100" style={{ backgroundColor: settings.primaryColor || "#3b82f6" }}>
            <div className="w-8 h-8 bg-white/20 rounded-lg" />
            <nav className="flex gap-6">
              {(settings.items || ["Home", "Docs"]).map((item, idx) => (
                <span key={idx} className="text-white text-xs font-bold opacity-80 hover:opacity-100 cursor-pointer">{item}</span>
              ))}
            </nav>
          </div>
        )}

        {settings.type === "sidebar" && (
          <div className="w-full h-full max-h-[300px] flex rounded-xl overflow-hidden border border-slate-100 shadow-lg">
            <aside className="h-full bg-slate-900 flex flex-col p-4 gap-4" style={{ width: `${settings.width || 180}px` }}>
              <div className="w-full h-8 bg-white/10 rounded mb-2" />
              {(settings.items || ["Menu 1", "Menu 2"]).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white/60 text-xs font-medium px-2 py-1">
                  <div className="w-3 h-3 bg-white/20 rounded-full" />
                  {item}
                </div>
              ))}
            </aside>
            <main className="flex-1 bg-slate-50 p-6">
              <div className="h-4 w-1/2 bg-slate-200 rounded mb-4" />
              <div className="h-24 w-full bg-slate-200 rounded opacity-50" />
            </main>
          </div>
        )}

        {settings.type === "tab" && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="flex border-b border-slate-100">
              {(settings.items || ["Tab 1", "Tab 2"]).map((item, idx) => (
                <div 
                  key={idx}
                  className={`px-6 py-4 text-xs font-bold relative transition-colors ${
                    settings.activeTab === item ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  {item}
                  {settings.activeTab === item && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 mx-4" />
                  )}
                </div>
              ))}
            </div>
            <div className="p-8">
              <div className="h-4 w-3/4 bg-slate-100 rounded mb-3" />
              <div className="h-4 w-1/2 bg-slate-50 rounded" />
            </div>
          </div>
        )}

        {settings.type === "modal" && (
          <div className="w-full h-full min-h-[300px] flex items-center justify-center relative bg-slate-900/10 rounded-xl overflow-hidden">
            <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 relative z-10 scale-90">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{settings.title}</h3>
              <p className="text-slate-500 text-xs mb-6">{settings.body}</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white text-[10px] font-bold py-2 rounded-lg">Confirm</button>
                <button className="flex-1 bg-slate-100 text-slate-700 text-[10px] font-bold py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {settings.type === "toast" && (
          <div className="w-full h-full flex flex-col items-center justify-start p-8">
            <div className={`w-full max-w-[300px] rounded-xl shadow-lg border p-4 flex items-center gap-3 transition-all ${
              settings.theme === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" :
              settings.theme === "error" ? "bg-red-50 border-red-100 text-red-800" :
              "bg-blue-50 border-blue-100 text-blue-800"
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                settings.theme === "success" ? "bg-emerald-500" :
                settings.theme === "error" ? "bg-red-500" :
                "bg-blue-500"
              }`} />
              <span className="text-xs font-bold">{settings.message}</span>
            </div>
          </div>
        )}

        {settings.type === "speedDial" && (
          <div className="w-full h-full flex items-end justify-end p-10 relative">
            <div className="flex flex-col items-end gap-3 mb-16 mr-2">
              {(settings.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="bg-white border border-slate-200 text-[9px] font-bold px-2 py-1 rounded shadow-sm text-slate-600 whitespace-nowrap">
                    {item}
                  </span>
                  <div className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-blue-600">
                    <Box size={14} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-14 h-14 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-transform hover:rotate-45 active:scale-90 absolute bottom-10 right-10">
              <Plus size={24} />
            </button>
          </div>
        )}

        {settings.type === "gallery" && (
          <div className="w-full h-full p-6 bg-slate-50 flex flex-col gap-4 overflow-hidden rounded-xl">
            <h4 className="text-xs font-bold text-slate-900">{settings.title}</h4>
            <div className={`grid gap-3 ${settings.layout === "list" ? "grid-cols-1" : "grid-cols-2"}`}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-3 flex gap-3 shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center text-slate-300">
                    <Layers size={20} />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2 w-3/4 bg-slate-200 rounded" />
                    <div className="h-1.5 w-1/2 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {settings.type === "calendar" && (
          <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-bold text-slate-900">February 2026</span>
              <div className="flex gap-2 text-slate-400"><ChevronRight size={12} className="rotate-180" /><ChevronRight size={12} /></div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <span key={d} className="text-[8px] font-bold text-slate-400">{d}</span>
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className={`h-6 flex items-center justify-center text-[9px] font-medium rounded-md ${i === 14 ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-50"}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        {settings.type === "animation" && (
          <div className="w-full h-full flex items-center justify-center p-10 bg-slate-900/5 rounded-xl border border-dashed border-slate-200">
            <div className="flex flex-col items-center gap-6">
              <div className={`w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin ${settings.speed === "fast" ? "duration-300" : (settings.speed === "slow" ? "duration-1000" : "duration-700")}`} />
              <div className="flex gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading Components...</span>
            </div>
          </div>
        )}
        
        {settings.type === "accordion" && (
          <div className="w-full max-w-xs bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm scale-90">
            {(settings.items || []).map((item, idx) => (
              <div key={item.id} className={`border-b border-slate-100 last:border-0`}>
                <div className="p-3 flex justify-between items-center font-bold text-slate-800 text-xs cursor-pointer">
                  {item.title}
                  <ChevronRight className={`w-3 h-3 transition-transform ${idx === 0 ? "rotate-90" : ""}`} />
                </div>
                {idx === 0 && (
                  <div className="px-3 pb-3 text-[10px] text-slate-500">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {settings.type === "shell" && (
          <div className="w-full h-full max-h-[300px] bg-white shadow-xl flex flex-col rounded-lg overflow-hidden border border-slate-200 scale-90">
            <header
              style={{ backgroundColor: settings.primaryColor }}
              className="h-12 flex items-center px-4 text-white text-xs font-bold"
            >
              {settings.appName}
            </header>
            <div className="flex-1 flex">
              {settings.showSidebar !== false && (
                <aside className="w-12 border-r border-slate-100 bg-slate-50 flex flex-col items-center py-3 gap-3">
                  <div className="w-6 h-6 rounded bg-slate-200"></div>
                  <div className="w-6 h-6 rounded bg-slate-200"></div>
                </aside>
              )}
              <main className="flex-1 p-4 bg-white">
                <div className="h-3 w-3/4 bg-slate-100 rounded mb-3"></div>
                <div className="h-24 w-full bg-slate-50 rounded border border-slate-100"></div>
              </main>
            </div>
          </div>
        )}

        {settings.type === "drawer" && (
          <div className="w-full h-full max-h-[300px] bg-slate-100 shadow-inner flex overflow-hidden rounded-lg border border-slate-200 scale-90 relative">
            {/* Background app content mock */}
            <div className="flex-1 p-4 opacity-50">
              <div className="h-3 w-1/2 bg-slate-300 rounded mb-4"></div>
              <div className="h-24 w-full bg-slate-200 rounded"></div>
            </div>
            
            {/* Drawer Panel */}
            <div 
              style={{ backgroundColor: settings.primaryColor }}
              className="w-48 h-full shadow-2xl flex flex-col absolute top-0 right-0 border-l border-slate-200/20"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-white text-xs font-bold">{settings.title}</span>
                <div className="w-4 h-4 rounded-full bg-white/20"></div>
              </div>
              <div className="flex-1 p-4 flex flex-col gap-3">
                <div className="h-6 w-full bg-white/10 rounded flex items-center px-2">
                  <div className="w-3 h-3 rounded-full bg-white/20 mr-2"></div>
                  <div className="h-1.5 w-1/2 bg-white/20 rounded"></div>
                </div>
                <div className="h-6 w-full bg-white/5 rounded flex items-center px-2">
                  <div className="w-3 h-3 rounded-full bg-white/20 mr-2"></div>
                  <div className="h-1.5 w-2/3 bg-white/20 rounded"></div>
                </div>
                <div className="h-6 w-full bg-white/5 rounded flex items-center px-2">
                  <div className="w-3 h-3 rounded-full bg-white/20 mr-2"></div>
                  <div className="h-1.5 w-1/3 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white border border-slate-100 shadow-sm rounded-full flex items-center gap-2 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
        <Sparkles className="w-2.5 h-2.5 text-blue-500" /> AI Powered Preview
      </div>
    </div>
  );
}
