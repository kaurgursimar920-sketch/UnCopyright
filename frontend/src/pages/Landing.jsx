import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, FileSearch, ScrollText, ArrowUpRight, Scale, Fingerprint,
  Layers, Milestone, BookOpen, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";

const JURI_PILLS = [
  { flag: "🇮🇳", code: "IN", law: "Copyright Act, 1957 · s.2(d)(vi)" },
  { flag: "🇺🇸", code: "US", law: "USCO Copyrightability Report 2025" },
  { flag: "🇬🇧", code: "UK", law: "CDPA 1988 · s.9(3)" },
];

const PILLARS = [
  {
    icon: Milestone, title: "Creation-first, not verdict-first",
    body: "Reconstruct the actual sequence of human and AI events before any legal question is asked. Every conclusion traces back to a specific event on the record.",
  },
  {
    icon: Scale, title: "Jurisdiction-aware analysis",
    body: "One creation history, three legal engines. India, the United States and the United Kingdom apply different tests — we surface them side by side, not blended.",
  },
  {
    icon: Fingerprint, title: "Evidence-mapped, not vibes-mapped",
    body: "Every fact links to the file that supports it. Missing artefacts surface as explicit evidence gaps with preservation guidance — no invented facts, ever.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startFresh = async () => {
    setLoading(true);
    try {
      // Create empty placeholder work, user picks type on next screen
      navigate("/workspace");
    } finally {
      setLoading(false);
    }
  };

  const openSarah = async () => {
    setLoading(true);
    try {
      const data = await api.demoSarah();
      navigate(`/workspace/${data.work.id}`, { state: { demo: true } });
    } catch (e) {
      toast.error("Could not load sample analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 uc-line-bg relative">
      {/* Nav */}
      <header className="border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/40">
              <ShieldCheck className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-tight">
                Un<span className="text-amber-500">Copyright</span>
              </div>
              <div className="uc-label -mt-0.5">Legal Evidence Workspace</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-mono">
            <a href="#workflow" className="hover:text-amber-400 transition-colors">Workflow</a>
            <a href="#authorities" className="hover:text-amber-400 transition-colors">Authorities</a>
            <a href="#exclusions" className="hover:text-amber-400 transition-colors">Scope</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="uc-label mb-6 flex items-center gap-3" data-testid="landing-hero-eyebrow">
              <span className="inline-block w-8 h-px bg-amber-500" />
              A Legal-Tech Analysis Platform · Not a Chatbot
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight max-w-5xl" data-testid="landing-hero-title">
              From AI Creation History
              <br />
              to a <span className="text-amber-500">Defensible</span> Copyright Claim.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-slate-400 leading-relaxed" data-testid="landing-hero-subtitle">
              UnCopyright reconstructs how an AI-assisted work was actually created, separates human and AI
              contributions event-by-event, and applies the specific copyright rules of India, the United States
              and the United Kingdom — with every conclusion traced back to a statute, precedent, or the file on
              record.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                data-testid="btn-launch-workspace"
                onClick={startFresh}
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-500 text-black font-semibold h-12 px-6 rounded-md shadow-lg shadow-amber-900/40"
              >
                Launch Evidence Workspace
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                data-testid="btn-load-sarah-sample"
                onClick={openSarah}
                disabled={loading}
                variant="outline"
                className="border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-slate-100 h-12 px-6 rounded-md"
              >
                <FileSearch className="w-4 h-4 mr-2" />
                Inspect Sarah Sample — Visual Artwork
              </Button>
            </div>

            <div className="mt-14 flex flex-wrap gap-3" data-testid="jurisdiction-pills">
              {JURI_PILLS.map((j) => (
                <div key={j.code} className="uc-card px-4 py-2.5 flex items-center gap-2.5">
                  <span className="text-xl">{j.flag}</span>
                  <div className="leading-tight">
                    <div className="text-xs font-mono text-slate-500">{j.code}</div>
                    <div className="text-sm text-slate-200">{j.law}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right-side quiet decoration */}
        <div className="absolute top-24 right-0 w-[36rem] h-[36rem] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />
      </section>

      {/* Preview strip — the syllogism */}
      <section className="border-y border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="uc-label mb-5">Every conclusion follows one structure</div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-sm">
            {["Fact", "Rule", "Authority", "Application", "Conclusion"].map((step, i) => (
              <div key={step} className="uc-card px-4 py-4 uc-ticks flex items-center gap-3">
                <span className="tl" /><span className="br" />
                <span className="text-amber-500 font-bold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-slate-200 font-semibold uppercase tracking-wider">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="workflow" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">Four layers, one workflow.</h2>
        <p className="text-slate-400 max-w-2xl mb-12">Creation → Legal → Evidence → Claim. UnCopyright refuses to collapse them into a single "is this copyrighted?" answer.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div key={p.title} className="uc-card p-6 uc-ticks">
              <span className="tl" /><span className="br" />
              <p.icon className="w-6 h-6 text-amber-500 mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scope */}
      <section id="exclusions" className="border-t border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <div className="uc-label mb-3">MVP scope</div>
            <h3 className="font-display text-2xl font-bold mb-6">What UnCopyright analyses</h3>
            <ul className="space-y-3 text-slate-300">
              {["Written works — essays, articles, books, manuscripts","Visual artwork — illustrations, digital artwork, graphics","Three jurisdictions — India · United States · United Kingdom","Four legal issues — AI-generated material, human contribution, selection/arrangement, human modification"].map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="uc-label mb-3">Deliberately excluded</div>
            <h3 className="font-display text-2xl font-bold mb-6">What UnCopyright will not do</h3>
            <ul className="space-y-3 text-slate-400">
              {["Automatic registration or filing","Arbitrary human-vs-AI percentage scores","Guarantees of copyrightability","Generic legal-chatbot answers","Music, video or code analysis (MVP)"].map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Authorities strip */}
      <section id="authorities" className="max-w-7xl mx-auto px-6 py-16">
        <div className="uc-label mb-3">Authority database</div>
        <h3 className="font-display text-2xl font-bold mb-6">Grounded in primary legal sources</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { j: "India", ref: "Copyright Act, 1957 · s.2(d)(vi)", url: "https://copyright.gov.in/Copyright_Act_1957/chapter_i.html" },
            { j: "United States", ref: "USCO — Copyright and AI, Part 2: Copyrightability (2025)", url: "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf" },
            { j: "United Kingdom", ref: "CDPA 1988 · Sections 9(3) & 178", url: "https://www.legislation.gov.uk/ukpga/1988/48" },
          ].map((s) => (
            <a key={s.j} href={s.url} target="_blank" rel="noreferrer" className="uc-card uc-card-hover p-5 group block">
              <div className="uc-label mb-2 flex items-center justify-between">
                <span>{s.j}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="font-mono text-sm text-slate-300">{s.ref}</div>
              <div className="mt-3 text-xs text-slate-500">Last verified 7 September 2026 · Current Law</div>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 text-xs text-slate-500 font-mono flex items-center justify-between">
          <span>UnCopyright · Legal analysis tool. Not legal advice. Not a filing service.</span>
          <span>v0.1 · MVP</span>
        </div>
      </footer>
    </div>
  );
}
