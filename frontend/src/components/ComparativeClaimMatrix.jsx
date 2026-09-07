import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { POSITION_STYLES, ISSUE_LABEL, JURI_META } from "@/lib/api";

export default function ComparativeClaimMatrix({ analysis, onNext }) {
  if (!analysis) return null;
  const juri = analysis.jurisdictions;
  const rows = analysis.claim_map;

  return (
    <div>
      <div className="uc-label mb-3">07 · Comparative claim map</div>
      <h1 className="font-display text-4xl font-black tracking-tight mb-3">One work. Three regimes.</h1>
      <p className="text-slate-400 max-w-3xl mb-8">
        Each row is an (event × issue) pair. Each column is a jurisdiction. Colours are derived from the analysis — never hard-coded.
      </p>

      <div className="uc-card overflow-hidden" data-testid="claim-matrix-table">
        <div className="grid px-5 py-3 border-b border-white/5 bg-white/[0.02]" style={{ gridTemplateColumns: `2fr 3fr repeat(${juri.length}, 1fr)` }}>
          <div className="uc-label">Event</div>
          <div className="uc-label">Issue</div>
          {juri.map((j) => (
            <div key={j} className="uc-label flex items-center gap-2">
              <span>{JURI_META[j].flag}</span>{JURI_META[j].code}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={`${row.creation_event_id}-${row.issue}`} className="grid px-5 py-4 border-b border-white/5 last:border-0 items-center" style={{ gridTemplateColumns: `2fr 3fr repeat(${juri.length}, 1fr)` }}>
            <div className="text-sm">
              <div className="font-mono text-amber-500 font-bold">EV {String(row.event_sequence).padStart(2, "0")}</div>
              <div className="text-slate-400 text-xs mt-0.5 line-clamp-2">{row.event_description}</div>
            </div>
            <div className="text-sm text-slate-200">{ISSUE_LABEL[row.issue]}</div>
            {juri.map((j) => {
              const pos = row.positions[j];
              const s = pos && POSITION_STYLES[pos];
              if (!s) return <div key={j} className="text-slate-700 text-xs">—</div>;
              return (
                <div key={j}>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[0.65rem] font-mono border ${s.badge}`} data-testid={`claim-status-dot-${pos === "POTENTIALLY_CLAIMABLE" ? "green" : pos === "UNCERTAIN" ? "orange" : "red"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {pos === "POTENTIALLY_CLAIMABLE" ? "CLAIM" : pos === "UNCERTAIN" ? "UNCERTAIN" : "EXCLUDE"}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Legend />

      <div className="mt-10">
        <Button onClick={onNext} className="bg-amber-600 hover:bg-amber-500 text-black font-semibold" data-testid="btn-matrix-continue">
          Evidence Map & Gaps <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
      {Object.entries(POSITION_STYLES).map(([k, s]) => (
        <span key={k} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/[0.02] border border-white/5">
          <span className={`w-2 h-2 rounded-full ${s.dot}`} /> {s.label}
        </span>
      ))}
    </div>
  );
}
