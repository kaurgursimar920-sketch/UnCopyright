import { FileText, ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const OPTIONS = [
  {
    key: "Written", icon: FileText, testid: "work-type-written-card",
    title: "Written Work",
    body: "Essays, articles, books, manuscripts, reports and other written outputs where AI may have generated prose, alternatives, or edits.",
    examples: ["Novellas & short fiction", "Long-form articles & essays", "Reports & memoranda", "Book chapters"],
  },
  {
    key: "Visual", icon: ImageIcon, testid: "work-type-visual-card",
    title: "Visual Artwork",
    body: "Illustrations, digital artwork, concept art, graphics — cases involving generative image models, human sketching, selection, and repainting.",
    examples: ["Cover artwork & illustrations", "Concept & character art", "Graphic design & posters", "Editorial illustrations"],
  },
];

export default function WorkTypeSelector({ onPick, busy, locked = false, selectedType = null, onNext }) {
  return (
    <div>
      <div className="uc-label mb-3">01 · Work type & scope</div>
      <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight mb-3" data-testid="workspace-step-title">
        What are you analysing?
      </h1>
      <p className="text-slate-400 max-w-2xl mb-10">
        UnCopyright's MVP supports two work types. The choice determines which authorities and legal tests the engine applies for each jurisdiction.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {OPTIONS.map((o) => {
          const isSel = locked && selectedType === o.key;
          return (
          <button
            key={o.key}
            data-testid={o.testid}
            onClick={() => !locked && onPick(o.key)}
            disabled={busy || locked}
            className={`uc-card uc-ticks p-8 text-left group transition-all ${
              locked
                ? isSel
                  ? "border-amber-500/50 bg-amber-500/[0.04] cursor-not-allowed"
                  : "opacity-40 cursor-not-allowed"
                : "uc-card-hover disabled:opacity-50"
            }`}
          >
            <span className="tl" /><span className="br" />
            <div className="flex items-start justify-between mb-6">
              <div className="w-11 h-11 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <o.icon className="w-5 h-5 text-amber-500" />
              </div>
              {locked ? (
                <span className="text-xs font-mono text-amber-500/80 border border-amber-500/30 rounded px-1.5 py-0.5">
                  {isSel ? "SELECTED · LOCKED" : "LOCKED"}
                </span>
              ) : (
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              )}
            </div>
            <div className="uc-label mb-2">MVP · Fully supported</div>
            <h3 className="font-display text-2xl font-bold mb-3">{o.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">{o.body}</p>
            <ul className="space-y-1.5">
              {o.examples.map((ex) => (
                <li key={ex} className="text-xs font-mono text-slate-500 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  {ex}
                </li>
              ))}
            </ul>
          </button>
          );
        })}
      </div>

      {locked && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className="px-2.5 py-1 rounded text-xs font-mono border border-amber-500/40 text-amber-300 bg-amber-500/[0.06]"
            data-testid="work-type-locked-badge"
          >
            ✓ Visual Artwork — locked · sample record
          </span>
          <Button
            onClick={onNext}
            className="bg-amber-600 hover:bg-amber-500 text-black font-semibold"
            data-testid="btn-worktype-continue"
          >
            Continue to Evidence <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
