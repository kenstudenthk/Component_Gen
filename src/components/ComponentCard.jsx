import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function ComponentCard({ component }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(component.yaml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = component.yaml;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tags = component.tags
    ? component.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-white text-sm">{component.name}</h3>
          {component.description && (
            <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
              {component.description}
            </p>
          )}
        </div>
        <button
          onClick={handleCopy}
          title="Copy YAML"
          className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            copied
              ? "bg-green-500/20 text-green-400"
              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
          }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy YAML"}
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
