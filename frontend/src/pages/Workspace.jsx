import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import WorkflowSidebar from "@/components/WorkflowSidebar";
import AnalysisRunOverlay from "@/components/AnalysisRunOverlay";
import WorkTypeSelector from "@/components/WorkTypeSelector";
import MaterialUpload from "@/components/MaterialUpload";
import CreationTimeline from "@/components/CreationTimeline";
import ContributionMap from "@/components/ContributionMap";
import JurisdictionEngine from "@/components/JurisdictionEngine";
import LegalAnalysisView from "@/components/LegalAnalysisView";
import ComparativeClaimMatrix from "@/components/ComparativeClaimMatrix";
import EvidenceMap from "@/components/EvidenceMap";
import LawyerReview from "@/components/LawyerReview";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ChevronRight, Loader2, Menu } from "lucide-react";

const STEP_ORDER = ["type", "upload", "history", "contribution", "jurisdiction", "analysis", "matrix", "evidence", "review"];

export default function Workspace() {
  const { workId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [work, setWork] = useState(null);
  const [events, setEvents] = useState([]);
  const [files, setFiles] = useState([]);
  const [jurisdictions, setJurisdictions] = useState(["India", "United States", "United Kingdom"]);
  const [analysis, setAnalysis] = useState(null);
  const [step, setStep] = useState(workId ? "history" : "type");
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isDemo = !!work?.is_demo;

  useEffect(() => {
    if (!workId) return;
    (async () => {
      try {
        const data = await api.getWork(workId);
        setWork(data.work);
        setEvents(data.events || []);
        setFiles(data.files || []);
        if (data.work?.is_demo) setStep("type");
        else if (data.events?.length) setStep("history");
      } catch (e) {
        toast.error("Could not load work");
      }
    })();
  }, [workId]);

  const completed = STEP_ORDER.slice(0, STEP_ORDER.indexOf(step));

  const onPickType = async (workType) => {
    setBusy(true);
    try {
      const w = await api.createWork({ work_type: workType, title: `New ${workType} Work` });
      setWork(w);
      navigate(`/workspace/${w.id}`, { replace: true });
      setStep("upload");
    } catch (e) {
      toast.error("Could not create workspace");
    } finally {
      setBusy(false);
    }
  };

  const saveEvents = async (nextEvents) => {
    setEvents(nextEvents);
    if (isDemo) return;
    try {
      await api.setEvents(work.id, nextEvents);
    } catch (e) {
      toast.error("Failed to save events");
    }
  };

  const runAnalysis = async () => {
    if (!events.length) { toast.error("Add at least one creation event"); return; }
    if (!jurisdictions.length) { toast.error("Select at least one jurisdiction"); return; }
    setBusy(true);
    setScanning(true);
    const minDelay = new Promise((r) => setTimeout(r, 2100));
    try {
      const [data] = await Promise.all([api.analyze(work.id, jurisdictions), minDelay]);
      setAnalysis(data);
      setScanning(false);
      setStep("analysis");
      toast.success(`Analysis complete — ${data.results.length} conclusions across ${data.jurisdictions.length} jurisdictions.`);
    } catch (e) {
      setScanning(false);
      toast.error(e?.response?.data?.detail || "Analysis failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex">
      <div className="uc-grain" />
      <div className="hidden md:flex">
        <WorkflowSidebar activeStep={step} completed={completed} onNavigate={setStep} />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              <WorkflowSidebar
                activeStep={step}
                completed={completed}
                idSuffix="-mobile"
                onNavigate={(k) => { setStep(k); setMenuOpen(false); }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scanning && <AnalysisRunOverlay jurisdictions={jurisdictions} />}
      </AnimatePresence>

      <main className="flex-1 overflow-x-hidden">
        <TopBar work={work} step={step} isDemo={isDemo} onMenu={() => setMenuOpen(true)} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 uc-line-bg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === "type" && (
                <WorkTypeSelector
                  onPick={onPickType}
                  busy={busy}
                  locked={isDemo}
                  selectedType={work?.work_type}
                  onNext={() => setStep("upload")}
                />
              )}
              {step === "upload" && (
                <MaterialUpload
                  work={work}
                  files={files}
                  onUploaded={(f) => setFiles((prev) => [...prev, f])}
                  onNext={() => setStep("history")}
                  readOnly={isDemo}
                />
              )}
              {step === "history" && (
                <CreationTimeline
                  work={work}
                  events={events}
                  files={files}
                  onSave={saveEvents}
                  onNext={() => setStep("contribution")}
                  readOnly={isDemo}
                />
              )}
              {step === "contribution" && (
                <ContributionMap events={events} onNext={() => setStep("jurisdiction")} />
              )}
              {step === "jurisdiction" && (
                <JurisdictionEngine
                  selected={jurisdictions}
                  onChange={setJurisdictions}
                  onNext={runAnalysis}
                  busy={busy}
                />
              )}
              {step === "analysis" && (
                <LegalAnalysisView analysis={analysis} onNext={() => setStep("matrix")} />
              )}
              {step === "matrix" && (
                <ComparativeClaimMatrix analysis={analysis} onNext={() => setStep("evidence")} />
              )}
              {step === "evidence" && (
                <EvidenceMap analysis={analysis} files={files} onNext={() => setStep("review")} />
              )}
              {step === "review" && (
                <LawyerReview analysis={analysis} work={work} events={events} jurisdictions={jurisdictions} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function TopBar({ work, step, isDemo, onMenu }) {
  return (
    <div className="border-b border-white/5 bg-[#0a0d15]/80 backdrop-blur uc-no-print sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-3">
        <button
          onClick={onMenu}
          className="md:hidden shrink-0 w-9 h-9 rounded border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300"
          data-testid="mobile-menu-button"
          aria-label="Open workflow menu"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 text-sm min-w-0 flex-wrap">
          <span className="uc-label">Workspace</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="font-mono text-slate-300 truncate max-w-[38vw] sm:max-w-none">{work?.title || "New analysis"}</span>
          {work?.work_type && (
            <span className="uc-cite">{work.work_type.toUpperCase()}</span>
          )}
          {isDemo && (
            <span className="ml-2 px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-widest rounded border border-amber-500/40 text-amber-400 bg-amber-500/5">
              Sample · Sara
            </span>
          )}
        </div>
        <div className="uc-label">{step}</div>
      </div>
    </div>
  );
}
