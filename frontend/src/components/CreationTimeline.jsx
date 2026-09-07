import { useEffect, useState } from "react";
import { Plus, Trash2, ArrowRight, User, Bot, Combine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ACTOR_STYLES, ISSUE_LABEL } from "@/lib/api";

const ISSUES = ["AI_GENERATED_MATERIAL", "HUMAN_CONTRIBUTION", "SELECTION_ARRANGEMENT", "HUMAN_MODIFICATION"];

export default function CreationTimeline({ work, events, onSave, onNext, readOnly }) {
  const [items, setItems] = useState(events);

  useEffect(() => {
    setItems(events);
  }, [events]);

  const commit = (next) => {
    setItems(next);
    onSave(next);
  };

  const addEvent = () => {
    const seq = items.length + 1;
    commit([...items, {
      creation_event_id: `EV-${String(seq).padStart(2, "0")}`,
      sequence: seq,
      description: "",
      actor: "HUMAN",
      timestamp: new Date().toISOString(),
      certainty: "KNOWN",
      source_files: [],
      issues: ["HUMAN_CONTRIBUTION"],
    }]);
  };

  const removeEvent = (i) => {
    const next = items.filter((_, idx) => idx !== i).map((e, idx) => ({ ...e, sequence: idx + 1 }));
    commit(next);
  };

  const update = (i, patch) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    commit(next);
  };

  return (
    <div>
      <div className="uc-label mb-3">03 · Creation history</div>
      <h1 className="font-display text-4xl font-black tracking-tight mb-3">The chronological record.</h1>
      <p className="text-slate-400 max-w-3xl mb-8">
        Each event captures what happened, who did it, and which legal issues it triggers. A single event can carry multiple issues.
      </p>

      <div className="space-y-4 mb-6" data-testid="timeline-events">
        {items.map((ev, i) => (
          <div key={ev.creation_event_id || i} className="uc-card p-5 uc-ticks" data-testid={`timeline-event-${ev.creation_event_id}`}>
            <span className="tl" /><span className="br" />
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-14 flex flex-col items-center">
                <div className="uc-label text-slate-500">EV</div>
                <div className="font-display text-3xl font-black text-amber-500">{String(ev.sequence).padStart(2, "0")}</div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-3">
                <div className="md:col-span-4">
                  <div className="uc-label mb-1.5">Description</div>
                  <Textarea
                    value={ev.description}
                    onChange={(e) => update(i, { description: e.target.value })}
                    placeholder="e.g. Human manually repainted the face"
                    disabled={readOnly}
                    className="bg-slate-950/50 border-white/10 min-h-[64px]"
                    data-testid={`event-description-${ev.creation_event_id}`}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="uc-label mb-1.5">Actor</div>
                  <Select value={ev.actor} onValueChange={(v) => update(i, { actor: v })} disabled={readOnly}>
                    <SelectTrigger className="bg-slate-950/50 border-white/10" data-testid={`event-actor-${ev.creation_event_id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HUMAN">HUMAN</SelectItem>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="HYBRID">HYBRID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-4">
                  <div className="uc-label mb-1.5">Legal issues (one event → multiple)</div>
                  <div className="flex flex-wrap gap-2">
                    {ISSUES.map((iss) => {
                      const on = ev.issues.includes(iss);
                      return (
                        <button
                          key={iss}
                          disabled={readOnly}
                          onClick={() => update(i, { issues: on ? ev.issues.filter((x) => x !== iss) : [...ev.issues, iss] })}
                          className={`px-2.5 py-1 rounded text-xs font-mono border transition-colors ${
                            on ? "bg-amber-500/15 text-amber-300 border-amber-500/40" : "bg-white/[0.02] text-slate-400 border-white/10 hover:border-white/20"
                          }`}
                          data-testid={`event-issue-${ev.creation_event_id}-${iss}`}
                        >
                          {ISSUE_LABEL[iss]}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="uc-label mb-1.5">Certainty</div>
                  <Select value={ev.certainty} onValueChange={(v) => update(i, { certainty: v })} disabled={readOnly}>
                    <SelectTrigger className="bg-slate-950/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KNOWN">KNOWN — directly supported</SelectItem>
                      <SelectItem value="INFERRED">INFERRED — reasonable inference</SelectItem>
                      <SelectItem value="UNKNOWN">UNKNOWN — no record</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-6">
                  <div className="uc-label mb-1.5">Source files (comma-separated)</div>
                  <Input
                    value={(ev.source_files || []).join(", ")}
                    onChange={(e) => update(i, { source_files: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                    placeholder="Sketch_01.png, AI_Output_03.png"
                    disabled={readOnly}
                    className="bg-slate-950/50 border-white/10 font-mono text-sm"
                  />
                </div>
              </div>
              {!readOnly && (
                <button onClick={() => removeEvent(i)} className="text-slate-600 hover:text-rose-400 transition-colors" data-testid={`event-delete-${ev.creation_event_id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {!readOnly && (
          <Button onClick={addEvent} variant="outline" className="border-white/15 hover:bg-white/[0.05]" data-testid="btn-add-event">
            <Plus className="w-4 h-4 mr-2" /> Add creation event
          </Button>
        )}
        <Button onClick={onNext} className="bg-amber-600 hover:bg-amber-500 text-black font-semibold" data-testid="btn-timeline-continue">
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
