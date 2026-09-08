import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { POSITION_STYLES, ISSUE_LABEL, JURI_META, ACTOR_STYLES } from "@/lib/api";

export default function LegalAnalysisView({ analysis, onNext }) {
  const grouped = useMemo(() => {
    if (!analysis) return [];
    const map = new Map();
    for (const r of analysis.results) {
      const k = r.creation_event_id;
      if (!map.has(k)) map.set(k, { event: r, items: [] });
      map.get(k).items.push(r);
    }
    return Array.from(map.values()).sort((a, b) => a.event.event_sequence - b.event.event_sequence);
  }, [analysis]);

  if (!analysis) return <Empty />;

  return (
    <div>
      <div className="uc-label mb-3">06 · Legal syllogism</div>
      <h1 className="font-display text-4xl font-black tracking-tight mb-3">Fact → Rule → Authority → Application → Conclusion.</h1>
      <p className="text-slate-400 max-w-3xl mb-8">
        Every issue is analysed under every selected jurisdiction. {analysis.results.length} conclusions across {analysis.jurisdictions.length} jurisdiction(s).
      </p>

      <div className="space-y-6">
        {grouped.map(({ event, items }, gi) => (
          <motion.div
            key={event.creation_event_id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <EventGroup event={event} items={items} />
          </motion.div>
        ))}
      </div>

      {analysis.reform_warnings?.length > 0 && <ReformPanel warnings={analysis.reform_warnings} />}

      <div className="mt-10">
        <Button onClick={onNext} className="bg-amber-600 hover:bg-amber-500 text-black font-semibold" data-testid="btn-analysis-continue">
          View Claim Matrix <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function EventGroup({ event, items }) {
  return (
    <div className="uc-card p-6 uc-ticks">
      <span className="tl" /><span className="br" />
      <div className="flex items-start gap-5 mb-5 border-b border-white/5 pb-4">
        <div className="shrink-0 w-14 flex flex-col items-center">
          <div className="uc-label text-slate-500">EV</div>
          <div className="font-display text-3xl font-black text-amber-500">{String(event.event_sequence).padStart(2, "0")}</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`px-2 py-0.5 text-[0.7rem] font-mono border rounded ${ACTOR_STYLES[event.event_actor]?.cls}`}>{event.event_actor}</span>
            <span className="uc-label">{event.creation_event_id}</span>
          </div>
          <div className="text-slate-100">{event.event_description}</div>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((r) => <SyllogismCard key={r.analysis_id} r={r} />)}
      </div>
    </div>
  );
}

function SyllogismCard({ r }) {
  const [open, setOpen] = useState(false);
  const pos = POSITION_STYLES[r.claim_position];
  const meta = JURI_META[r.jurisdiction];
  return (
    <div className="border border-white/8 rounded" data-testid={`syllogism-${r.creation_event_id}-${r.issue}-${meta.code}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors text-left">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-xl">{meta.flag}</span>
          <div className="min-w-0">
            <div className="text-sm font-mono text-slate-400 truncate">{ISSUE_LABEL[r.issue]}</div>
            <div className="uc-label truncate">{r.jurisdiction} · {meta.law}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`px-2.5 py-1 rounded text-xs font-mono border ${pos.badge}`} data-testid={`claim-badge-${r.claim_position}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${pos.dot}`} />
            {pos.label}
          </span>
          <span className="uc-cite">CONF · {r.confidence}</span>
          {r.jurisdiction === "United Kingdom" && r.issue === "AI_GENERATED_MATERIAL" && (
            <span
              className="px-2 py-0.5 rounded text-[0.6rem] font-mono border border-amber-500/40 text-amber-400/90 bg-amber-500/[0.06]"
              data-testid="reform-tag"
            >
              ⚠ reform proposed
            </span>
          )}
          {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 p-4 space-y-3">
          <Row label="Fact" testid="legal-syllogism-fact-box">
            <ul className="list-disc list-inside space-y-1 text-slate-200">
              {r.facts.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </Row>
          <Row label="Rule" testid="legal-syllogism-rule-box">
            <p className="text-slate-200">{r.rule}</p>
          </Row>
          <Row label="Authority" testid="legal-syllogism-authority-box">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-mono text-sm text-amber-300">{r.authority.authority_name}</div>
                <div className="uc-label mt-1">{r.authority.authority_type} · {r.authority.authority_reference}</div>
                <div className="text-xs text-slate-500 mt-1">Last verified {r.authority.last_verified} · {r.authority.legal_status.replace("_", " ")}</div>
              </div>
              <a href={r.authority.source_url} target="_blank" rel="noreferrer" className="uc-cite inline-flex items-center gap-1 hover:underline shrink-0">
                View Authority <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </Row>
          <Row label="Application" testid="legal-syllogism-application-box">
            <p className="text-slate-200">{r.application}</p>
          </Row>
          <Row label="Conclusion" testid="legal-syllogism-conclusion-badge">
            <p className="text-slate-100 font-medium">{r.conclusion}</p>
          </Row>
          {r.evidence_gaps.length > 0 && (
            <Row label="Evidence gaps">
              <ul className="text-rose-300 text-sm space-y-1">
                {r.evidence_gaps.map((g, i) => (<li key={i}>⚠ {g}</li>))}
              </ul>
            </Row>
          )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, children, testid }) {
  return (
    <div className="grid grid-cols-12 gap-3" data-testid={testid}>
      <div className="col-span-2 uc-label pt-1">{label}</div>
      <div className="col-span-10 text-sm">{children}</div>
    </div>
  );
}

function Empty() {
  return (
    <div className="uc-card p-10 text-center">
      <p className="text-slate-400">Run the analysis engine to see legal syllogism here.</p>
    </div>
  );
}

function ReformPanel({ warnings }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45 }}
      className="mt-6 uc-card p-5 border-l-2 border-l-amber-500"
      data-testid="reform-warning-panel"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-amber-400">⚠</span>
        <span className="font-mono text-sm text-amber-300 font-semibold uppercase tracking-wider">
          Proposed reform — not current law
        </span>
      </div>
      {warnings.map((w) => (
        <div key={w.authority_id} className="text-sm text-slate-300">
          <p>
            <span className="text-slate-100 font-medium">{w.jurisdiction} proposed reform:</span> {w.message}
          </p>
          <a
            href={w.source_url}
            target="_blank"
            rel="noreferrer"
            className="uc-cite inline-flex items-center gap-1 mt-2 hover:underline"
            data-testid="reform-warning-source-link"
          >
            View proposed reform source — Government report <ExternalLink className="w-3 h-3" />
          </a>
          <div className="text-xs text-slate-500 mt-1.5 font-mono">
            {w.authority_reference} · Last verified {w.last_verified} · Proposed Reform
          </div>
        </div>
      ))}
    </motion.div>
  );
}
