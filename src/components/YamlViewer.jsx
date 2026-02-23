import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function YamlViewer({ yaml }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yaml);
    } catch {
      const el = document.createElement("textarea");
      el.value = yaml;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          YAML
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
            copied
              ? "bg-green-500/20 text-green-400"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-auto p-4 text-xs text-slate-300 leading-relaxed max-h-96 whitespace-pre">
        {yaml}
      </pre>
    </div>
  );
}
