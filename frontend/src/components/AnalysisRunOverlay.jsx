import { motion } from "framer-motion";
import { JURI_META } from "@/lib/api";

const STAGES = [
  "RECONSTRUCTING CREATION EVENTS",
  "ROUTING ISSUES × JURISDICTIONS",
  "RETRIEVING AUTHORITIES",
  "APPLYING FACT → RULE → CONCLUSION",
];

export default function AnalysisRunOverlay({ jurisdictions = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e]/90 backdrop-blur-sm"
      data-testid="analysis-run-overlay"
    >
      <div className="w-[34rem] max-w-[90vw]">
        <div className="uc-label mb-4 text-center">UnCopyright Analysis Engine</div>
        <div className="uc-card uc-ticks p-8 relative overflow-hidden">
          <span className="tl" /><span className="br" />
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "linear" }}
          />
          <div className="space-y-3 mb-8">
            {jurisdictions.map((j, i) => (
              <motion.div
                key={j}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.45, duration: 0.4 }}
                className="flex items-center gap-3 font-mono text-sm"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.45, type: "spring", stiffness: 320, damping: 16 }}
                  className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[0.6rem] flex items-center justify-center"
                >
                  ✓
                </motion.span>
                <span className="text-lg">{JURI_META[j]?.flag}</span>
                <span className="text-slate-200">{j}</span>
                <span className="uc-label ml-auto">{JURI_META[j]?.code} ENGINE APPLIED</span>
              </motion.div>
            ))}
          </div>
          <div className="space-y-1.5">
            {STAGES.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.45] }}
                transition={{ delay: 0.15 + i * 0.3, duration: 0.6 }}
                className="font-mono text-[0.65rem] tracking-[0.2em] text-amber-500/80"
              >
                ▸ {s}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
