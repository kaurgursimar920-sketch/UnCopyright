import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Printer, Scale, ExternalLink } from "lucide-react";
import { POSITION_STYLES, ISSUE_LABEL, JURI_META, ACTOR_STYLES } from "@/lib/api";

export default function LawyerReview({ analysis, work, events, jurisdictions }) {
  const handlePrint = () => window.print();

  if (!analysis) return null;

  const gapCount = analysis.results.reduce((s, r) => s + r.evidence_gaps.length, 0);

  return (
    <div className="uc-print-page">
      <div className="uc-label mb-3">09 · Lawyer review dossier</div>
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-4xl font-black tracking-tight mb-2">Copyright Analysis Memorandum</h1>
          <p className="text-slate-400">{work?.title} · {work?.work_type} · Prepared {new Date().toLocaleDateString()}</p>
        </div>
        <Button onClick={handlePrint} className="bg-amber-600 hover:bg-amber-500 text-black font-semibold uc-no-print" data-testid="btn-export-pdf-dossier">
          <Printer className="w-4 h-4 mr-2" /> Export PDF / Print
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="uc-card p-6 mb-6"
      >
        <h2 className="font-display text-xl font-bold mb-2 flex items-center gap-2"><Scale className="w-5 h-5 text-amber-500" /> Executive summary</h2>
        <p className="text-slate-300 leading-relaxed">
          This memorandum analyses <span className="text-amber-400">{events.length} creation event(s)</span> under
          <span className="text-amber-400"> {jurisdictions.length} jurisdiction(s)</span>, producing
          <span className="text-amber-400"> {analysis.results.length} conclusions</span> and flagging
          <span className="text-amber-400"> {gapCount} evidence gap(s)</span>. Every conclusion is traceable to a primary authority.
        </p>
        <p className="text-xs text-slate-500 mt-3 italic">
          This document is an analytical memorandum. It is not legal advice, does not constitute an attorney-client relationship, and does not effect any copyright registration or filing. Consult a qualified copyright lawyer for advice and filings.
        </p>
      </motion.div>

      <Section title="1 · Creation history">
        {events.map((ev) => (
          <div key={ev.creation_event_id} className="flex gap-4 py-2 border-b border-white/5 last:border-0">
            <span className="font-mono text-amber-500 font-bold">EV {String(ev.sequence).padStart(2, "0")}</span>
            <span className={`px-2 py-0.5 text-[0.65rem] font-mono border rounded self-start ${ACTOR_STYLES[ev.actor]?.cls}`}>{ev.actor}</span>
            <span className="text-slate-200 text-sm flex-1">{ev.description}</span>
            <span className="uc-cite">{ev.certainty}</span>
          </div>
        ))}
      </Section>

      <Section title="2 · Jurisdiction-by-jurisdiction analysis">
        {jurisdictions.map((j) => {
          const meta = JURI_META[j];
          const items = analysis.results.filter((r) => r.jurisdiction === j);
          return (
            <div key={j} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{meta.flag}</span>
                <h3 className="font-display font-bold text-lg">{j}</h3>
                <span className="uc-cite">{meta.law}</span>
              </div>
              <div className="space-y-2">
                {items.map((r) => {
                  const s = POSITION_STYLES[r.claim_position];
                  return (
                    <div key={r.analysis_id} className="border border-white/8 rounded p-3">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="text-sm">
                          <span className="text-slate-100 font-medium">EV {String(r.event_sequence).padStart(2, "0")} · {ISSUE_LABEL[r.issue]}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[0.65rem] font-mono border ${s.badge}`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${s.dot}`} />{s.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{r.conclusion}</p>
                      <div className="flex items-center gap-2 text-[0.7rem] font-mono text-slate-500">
                        <a href={r.authority.source_url} target="_blank" rel="noreferrer" className="text-amber-500 hover:underline inline-flex items-center gap-1">
                          {r.authority.authority_reference} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        · CONF {r.confidence}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Section>

      {analysis.reform_warnings?.length > 0 && (
        <Section title="⚠ Proposed reform — not current law">
          {analysis.reform_warnings.map((w) => (
            <div key={w.authority_id} className="text-sm text-slate-300" data-testid="reform-warning-panel">
              <p>
                <span className="text-slate-100 font-medium">{w.jurisdiction} proposed reform:</span> {w.message}
              </p>
              <a href={w.source_url} target="_blank" rel="noreferrer" className="uc-cite inline-flex items-center gap-1 mt-2 hover:underline">
                View proposed reform source — Government report <ExternalLink className="w-3 h-3" />
              </a>
              <div className="text-xs text-slate-500 mt-1.5 font-mono">
                {w.authority_reference} · Last verified {w.last_verified} · Proposed Reform
              </div>
            </div>
          ))}
        </Section>
      )}

      <Section title="3 · Registration / filing handoff">
        <p className="text-sm text-slate-300 leading-relaxed">
          This platform does not file or complete copyright registration. Consult a qualified copyright lawyer or authorised filing professional regarding registration, filing requirements and applicable disclosures. Where the analysis returned an
          <span className="text-rose-400 font-medium"> EXCLUDE</span> position, the corresponding AI-generated material should typically be disclaimed in any registration filing.
        </p>
      </Section>

      <div className="mt-10 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono flex items-center justify-between">
        <span>UnCopyright · Legal Evidence Workspace</span>
        <span>Authorities last verified 7 September 2026</span>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="uc-card p-6 mb-6 uc-print-page"
    >
      <h2 className="font-display text-xl font-bold mb-4 border-b border-white/5 pb-3">{title}</h2>
      {children}
    </motion.div>
  );
}
