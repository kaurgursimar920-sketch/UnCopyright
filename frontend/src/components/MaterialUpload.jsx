import { useRef, useState } from "react";
import axios from "axios";
import { UploadCloud, FileCheck2, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API } from "@/lib/api";
import { toast } from "sonner";

const STAGES = [
  { key: "final_work", label: "Final Work", required: true, hint: "The finished piece as it stands today." },
  { key: "human_draft", label: "Human Drafts / Sketches", hint: "Beat sheets, sketches, handwritten notes, earlier versions." },
  { key: "ai_output", label: "AI Outputs", hint: "Raw AI-generated material — including alternatives you didn't pick." },
  { key: "prompt_log", label: "Prompts & Instructions", hint: "Prompt logs, generation parameters, seeds." },
  { key: "edit_log", label: "Editing History", hint: "Version snapshots, layer files, before/after captures." },
  { key: "other", label: "Other Evidence", hint: "Anything else that documents the creative process." },
];

export default function MaterialUpload({ work, files, onUploaded, onNext, readOnly = false }) {
  const [uploading, setUploading] = useState(false);

  if (readOnly) {
    return (
      <div>
        <div className="uc-label mb-3">02 · Evidence ingestion</div>
        <h1 className="font-display text-4xl font-black tracking-tight mb-3">Sample evidence record.</h1>
        <p className="text-slate-400 max-w-3xl mb-8">
          This is a pre-populated demo record. The artefacts below correspond to the evidence referenced by Sara's
          creation history. Uploads are disabled in the Sara sample.
        </p>

        <div className="uc-card p-5" data-testid="sample-evidence-record">
          <div className="flex items-center justify-between mb-4">
            <span className="uc-label">Sample evidence · {files.length} files on record</span>
            <span
              className="px-2.5 py-1 rounded text-xs font-mono border border-amber-500/40 text-amber-300 bg-amber-500/[0.06]"
              data-testid="evidence-locked-badge"
            >
              ✓ Sample evidence uploaded by Sara
            </span>
          </div>
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={f.file_id || i} className="flex items-center gap-3 text-sm bg-white/[0.02] rounded px-3 py-2 border border-white/5">
                <FileCheck2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-mono text-slate-200 flex-1 truncate">{f.file_name}</span>
                <span className="text-xs text-slate-500 font-mono hidden md:block truncate max-w-[38%]">{f.description}</span>
                <span className="uc-cite shrink-0">{f.stage}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            data-testid="btn-upload-continue"
            onClick={onNext}
            className="bg-amber-600 hover:bg-amber-500 text-black font-semibold"
          >
            Continue to Creation History <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <span className="text-xs text-slate-500 font-mono">
            Demo record — sample evidence cannot be uploaded, deleted, replaced or modified.
          </span>
        </div>
      </div>
    );
  }

  const uploadFor = async (stage, fileList) => {
    if (!work?.id) { toast.error("No workspace"); return; }
    setUploading(true);
    try {
      for (const f of fileList) {
        const fd = new FormData();
        fd.append("file", f);
        const r = await axios.post(`${API}/works/${work.id}/files?stage=${stage}&description=${encodeURIComponent(f.name)}`, fd);
        onUploaded(r.data);
      }
      toast.success(`Uploaded ${fileList.length} file(s)`);
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="uc-label mb-3">02 · Evidence ingestion</div>
      <h1 className="font-display text-4xl font-black tracking-tight mb-3">Bring your creation record.</h1>
      <p className="text-slate-400 max-w-3xl mb-2">
        Upload the artefacts that document how the work was made. The Final Work is required; everything else is optional but strengthens the eventual claim.
      </p>
      <p className="text-xs font-mono text-slate-500 mb-8" data-testid="upload-disclaimer">
        Uploading files can take a moment — thanks for your patience.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {STAGES.map((s) => (
          <UploadCard
            key={s.key}
            stage={s}
            files={files.filter((f) => f.stage === s.key)}
            onUpload={(fl) => uploadFor(s.key, fl)}
            uploading={uploading}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Button
          data-testid="btn-upload-continue"
          onClick={onNext}
          className="bg-amber-600 hover:bg-amber-500 text-black font-semibold"
        >
          Continue to Creation History <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <span className="text-xs text-slate-500 font-mono">You can always come back and add more evidence.</span>
      </div>
    </div>
  );
}

function UploadCard({ stage, files, onUpload, uploading }) {
  const ref = useRef();
  return (
    <div className="uc-card p-5" data-testid={`upload-card-${stage.key}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold">{stage.label}</h3>
            {stage.required && <span className="uc-cite">REQUIRED</span>}
          </div>
          <p className="text-xs text-slate-500 mt-1">{stage.hint}</p>
        </div>
      </div>

      <input
        ref={ref}
        type="file"
        multiple
        data-testid={`upload-${stage.key}-input`}
        className="hidden"
        onChange={(e) => e.target.files?.length && onUpload(Array.from(e.target.files))}
      />
      <button
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="w-full border border-dashed border-white/15 rounded p-4 flex items-center justify-center gap-2 hover:bg-white/[0.03] hover:border-amber-500/40 transition-colors text-sm text-slate-400"
      >
        <UploadCloud className="w-4 h-4" /> Click to upload
      </button>

      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f) => (
            <li key={f.file_id} className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/[0.02] rounded px-2.5 py-1.5 border border-white/5">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate flex-1">{f.file_name}</span>
              <span className="text-slate-500">{Math.round((f.size || 0) / 1024)} kb</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
