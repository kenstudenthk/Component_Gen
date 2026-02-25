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
