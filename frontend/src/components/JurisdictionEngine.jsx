import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2, ExternalLink } from "lucide-react";
import { JURI_META } from "@/lib/api";

const JURISDICTIONS = [
  {
    name: "India",
    summary: "Copyright Act, 1957 — Section 2(d)(vi) treats the author of a computer-generated work as the person who causes it to be created. Originality follows the 'modicum of creativity' test from Eastern Book Co. v. D.B. Modak.",
    url: "https://copyright.gov.in/Copyright_Act_1957/chapter_i.html",
  },
  {
    name: "United States",
    summary: "USCO Copyrightability Report (2025) — human authorship is required; AI-generated material is not protected merely because a human supplied prompts. Sufficiently human-authored elements can still be claimed.",
    url: "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
  },
  {
    name: "United Kingdom",
    summary: "CDPA 1988 s.9(3) — for computer-generated works with no human author, authorship goes to the person by whom the arrangements necessary for creation were undertaken. Any 2026 reform proposals remain proposed, not current law.",
    url: "https://www.legislation.gov.uk/ukpga/1988/48",
  },
];

export default function JurisdictionEngine({ selected, onChange, onNext, busy }) {
  const toggle = (name) => {
    onChange(selected.includes(name) ? selected.filter((x) => x !== name) : [...selected, name]);
  };

  return (
    <div>
      <div className="uc-label mb-3">05 · Jurisdiction engine</div>
      <h1 className="font-display text-4xl font-black tracking-tight mb-3">Which laws should apply?</h1>
      <p className="text-slate-400 max-w-3xl mb-8">
        The same creation history is analysed separately under each selected jurisdiction. Different regimes reach different conclusions on the same facts — that is the point.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {JURISDICTIONS.map((j) => {
          const meta = JURI_META[j.name];
          const on = selected.includes(j.name);
          return (
            <label
              key={j.name}
              data-testid={`jurisdiction-checkbox-${meta.code.toLowerCase()}`}
              className={`uc-card uc-card-hover p-5 cursor-pointer transition-all block ${on ? "border-amber-500/50 bg-amber-500/[0.03]" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{meta.flag}</span>
                  <div>
                    <div className="font-display text-lg font-bold">{j.name}</div>
                    <div className="uc-label">{meta.code}</div>
                  </div>
                </div>
                <Checkbox checked={on} onCheckedChange={() => toggle(j.name)} className="border-white/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 mt-1" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">{j.summary}</p>
              <a href={j.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs font-mono text-amber-500 hover:underline inline-flex items-center gap-1">
                Primary source <ExternalLink className="w-3 h-3" />
              </a>
            </label>
          );
        })}
      </div>

      <div className="mt-10">
        <Button
          data-testid="btn-run-analysis"
          onClick={onNext}
          disabled={busy || selected.length === 0}
          className="bg-amber-600 hover:bg-amber-500 text-black font-semibold h-11 px-6"
        >
          {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Running analysis</> : <>Run legal analysis <ArrowRight className="w-4 h-4 ml-2" /></>}
        </Button>
      </div>
    </div>
  );
}
