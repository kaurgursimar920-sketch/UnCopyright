import { ShieldCheck, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  { key: "type", label: "Work Type" },
  { key: "upload", label: "Evidence Ingestion" },
  { key: "history", label: "Creation History" },
  { key: "contribution", label: "Contribution Map" },
  { key: "jurisdiction", label: "Jurisdiction Engine" },
  { key: "analysis", label: "Legal Syllogism" },
  { key: "matrix", label: "Claim Matrix" },
  { key: "evidence", label: "Evidence & Gaps" },
  { key: "review", label: "Lawyer Review" },
];

export default function WorkflowSidebar({ activeStep, completed = [], onNavigate }) {
  return (
    <aside className="w-72 shrink-0 border-r border-white/5 bg-[#0a0d15] flex flex-col uc-no-print">
      <div className="p-5 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2.5 group" data-testid="sidebar-home-link">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display font-bold text-sm tracking-tight">
              Un<span className="text-amber-500">Copyright</span>
            </div>
            <div className="uc-label text-[0.55rem]">Evidence Workspace</div>
          </div>
        </Link>
      </div>

      <div className="p-4 border-b border-white/5">
        <Link to="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-500 font-mono transition-colors">
          <ChevronLeft className="w-3 h-3" /> back to overview
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <div className="uc-label px-2 mb-3">Analysis</div>
        {STEPS.map((step, i) => {
          const isActive = step.key === activeStep;
          const isDone = completed.includes(step.key);
          return (
            <button
              key={step.key}
              onClick={() => onNavigate?.(step.key)}
              data-testid={`sidebar-step-${step.key}`}
              className={`w-full text-left px-3 py-2.5 rounded flex items-center gap-3 group transition-colors ${
                isActive ? "bg-amber-500/10 border border-amber-500/30" : "border border-transparent hover:bg-white/[0.03]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded flex items-center justify-center text-[0.65rem] font-mono font-bold ${
                  isActive ? "bg-amber-500 text-black" : isDone ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/[0.04] text-slate-500 border border-white/10"
                }`}
              >
                {isDone ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              <span className={`text-sm ${isActive ? "text-amber-100 font-semibold" : "text-slate-300"}`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 text-[0.65rem] font-mono text-slate-600 leading-relaxed">
        Not legal advice. Sources verified 7 Sep 2026.
      </div>
    </aside>
  );
}
