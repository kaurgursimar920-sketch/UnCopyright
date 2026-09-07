import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, Link2 } from "lucide-react";
import { ISSUE_LABEL } from "@/lib/api";

export default function EvidenceMap({ analysis, onNext }) {
  if (!analysis) return null;

  const gaps = analysis.results.filter((r) => r.evidence_gaps.length > 0);

  return (
    <div>
      <div className="uc-label mb-3">08 · Evidence audit & gaps</div>
      <h1 className="font-display text-4xl font-black tracking-tight mb-3">What supports each conclusion?</h1>
      <p className="text-slate-400 max-w-3xl mb-8">
        Every claim is only as strong as the artefacts backing it. Below, each conclusion links to the source files on record, and any missing evidence surfaces as a preservation task.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="uc-label mb-3">Claim → Evidence</h2>
          <div className="space-y-3">
            {analysis.results.map((r) => (
              <div key={r.analysis_id} className="uc-card p-4" data-testid="evidence-map-link-btn">
                <div className="flex items-start gap-2 mb-2">
                  <Link2 className="w-3.5 h-3.5 text-amber-500 mt-1 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm text-slate-200">{r.conclusion}</div>
                    <div className="uc-label mt-1">EV {String(r.event_sequence).padStart(2, "0")} · {ISSUE_LABEL[r.issue]} · {r.jurisdiction}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-5">
                  {r.supporting_evidence.length ? r.supporting_evidence.map((f) => (
                    <span key={f} className="uc-cite">{f}</span>
                  )) : <span className="text-xs text-rose-400 font-mono">no artefacts</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="uc-label mb-3">Evidence gaps ({gaps.length})</h2>
          <div className="space-y-3">
            {gaps.length === 0 ? (
              <div className="uc-card p-4 text-sm text-slate-400">No gaps identified on the current record.</div>
            ) : gaps.map((r) => (
              <div key={r.analysis_id} className="uc-card p-4 border-l-2 border-l-amber-500" data-testid="evidence-gap-item">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="uc-label mb-1.5">EV {String(r.event_sequence).padStart(2, "0")} · {ISSUE_LABEL[r.issue]} · {r.jurisdiction}</div>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {r.evidence_gaps.map((g, i) => <li key={i}>• {g}</li>)}
                    </ul>
                    <div className="mt-2 text-xs text-slate-500 italic">
                      Suggested preservation: retain original AI outputs, intermediate versions, prompt logs and time-stamped exports for this event.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Button onClick={onNext} className="bg-amber-600 hover:bg-amber-500 text-black font-semibold" data-testid="btn-evidence-continue">
          Lawyer Review <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
