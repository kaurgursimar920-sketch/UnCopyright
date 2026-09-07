import { ShieldCheck, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  const progress = Math.min(1, Math.max(0, completed.length / STEPS.length));
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
        <div className="relative">
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-white/[0.06]" />
          <motion.div
            className="absolute left-[23px] top-2 w-px bg-gradient-to-b from-amber-500 via-amber-500/70 to-emerald-500/60"
            initial={{ height: 0 }}
            animate={{ height: `${(progress * 100).toFixed(1)}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          {STEPS.map((step, i) => {
            const isActive = step.key === activeStep;
            const isDone = completed.includes(step.key);
            return (
              <button
                key={step.key}
                onClick={() => onNavigate?.(step.key)}
                data-testid={`sidebar-step-${step.key}`}
                className={`relative w-full text-left px-3 py-2.5 rounded flex items-center gap-3 group transition-colors ${
                  isActive ? "bg-amber-500/10 border border-amber-500/30" : "border border-transparent hover:bg-white/[0.03]"
                }`}
              >
                <motion.span
                  key={isDone ? "done" : "todo"}
                  initial={isDone ? { scale: 0.3, rotate: -40 } : false}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 15 }}
                  className={`w-6 h-6 rounded flex items-center justify-center text-[0.65rem] font-mono font-bold ${
                    isActive ? "bg-amber-500 text-black" : isDone ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/[0.04] text-slate-500 border border-white/10"
                  }`}
                >
                  {isDone ? "✓" : String(i + 1).padStart(2, "0")}
                </motion.span>
                <span className={`text-sm ${isActive ? "text-amber-100 font-semibold" : "text-slate-300"}`}>
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/5 text-[0.65rem] font-mono text-slate-600 leading-relaxed">
        Not legal advice. Sources verified 7 Sep 2026.
      </div>
    </aside>
  );
}
