import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ACTOR_STYLES, ISSUE_LABEL } from "@/lib/api";

// Qualitative bands - NO PERCENTAGES
const BANDS = {
  HUMAN: { human: 5, ai: 0, label: "Independent Human Origin" },
  HYBRID: { human: 3, ai: 3, label: "Human-Directed Iteration" },
  AI: { human: 0, ai: 5, label: "Predominantly AI-Generated" },
};

export default function ContributionMap({ events, onNext }) {
  const rows = events.map((ev) => {
    const band = BANDS[ev.actor] || BANDS.HUMAN;
    return { ...ev, band };
  });

  return (
    <div>
      <div className="uc-label mb-3">04 · Contribution map</div>
      <h1 className="font-display text-4xl font-black tracking-tight mb-3">Qualitative, event-by-event.</h1>
      <p className="text-slate-400 max-w-3xl mb-8">
        UnCopyright refuses to compress creation into a single "72% human" figure. Instead, each creation event is qualitatively banded, tied to its actor, and linked to the issues it triggers.
      </p>

      <div className="uc-card p-0 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="col-span-1 uc-label">EV</div>
          <div className="col-span-5 uc-label">Component / Event</div>
          <div className="col-span-2 uc-label">Actor</div>
          <div className="col-span-4 uc-label">Qualitative band</div>
        </div>
        {rows.map((ev, ri) => {
          const actor = ACTOR_STYLES[ev.actor] || ACTOR_STYLES.HUMAN;
          return (
            <motion.div
              key={ev.creation_event_id}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: ri * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 sm:px-6 py-5 border-b border-white/5 last:border-0"
              data-testid={`contribution-row-${ev.creation_event_id}`}
            >
              <div className="md:col-span-1 font-mono text-amber-500 font-bold">{String(ev.sequence).padStart(2, "0")}</div>
              <div className="md:col-span-5">
                <div className="text-slate-200 text-sm mb-1">{ev.description}</div>
                <div className="flex flex-wrap gap-1.5">
                  {(ev.issues || []).map((iss) => (
                    <span key={iss} className="uc-cite">{ISSUE_LABEL[iss]}</span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <span className={`px-2 py-0.5 text-xs font-mono border rounded ${actor.cls}`}>{actor.label}</span>
              </div>
              <div className="md:col-span-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={`h${i}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 + ri * 0.07 + i * 0.05 }}
                      className={`h-2 w-6 rounded-sm origin-left ${i < ev.band.human ? "bg-blue-500" : "bg-white/[0.05]"}`}
                    />
                  ))}
                  <span className="text-[0.65rem] font-mono uppercase tracking-wider text-blue-400 ml-2">Human</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={`a${i}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.35 + ri * 0.07 + i * 0.05 }}
                      className={`h-2 w-6 rounded-sm origin-left ${i < ev.band.ai ? "bg-violet-500" : "bg-white/[0.05]"}`}
                    />
                  ))}
                  <span className="text-[0.65rem] font-mono uppercase tracking-wider text-violet-400 ml-2">AI</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">{ev.band.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8">
        <Button onClick={onNext} className="bg-amber-600 hover:bg-amber-500 text-black font-semibold" data-testid="btn-contribution-continue">
          Select Jurisdictions <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
