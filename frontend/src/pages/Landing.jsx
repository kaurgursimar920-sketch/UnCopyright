import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FileSearch, ArrowUpRight, Scale, Fingerprint,
  Milestone, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import ScrambleText from "@/components/fx/ScrambleText";
import EngineTicker from "@/components/fx/EngineTicker";

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

const CHIPS = [
  { t: "EV-02 · AI · 10:17:00Z", cls: "top-[13%] right-[5%]", drift: "uc-drift", depth: 26 },
  { t: "CDPA 1988 · s.9(3)", cls: "top-[29%] right-[18%]", drift: "uc-drift-slow", depth: 14 },
  { t: "SELECTION_ARRANGEMENT", cls: "top-[46%] right-[4%]", drift: "uc-drift", depth: 34 },
  { t: "POTENTIALLY_CLAIMABLE", cls: "top-[62%] right-[15%]", drift: "uc-drift-slow", depth: 20 },
  { t: "s.2(d)(vi) · CA 1957", cls: "top-[78%] right-[7%]", drift: "uc-drift", depth: 42 },
];

const PIPELINE = ["Fact", "Rule", "Authority", "Application", "Conclusion"];

function LogoMark({ size = "w-9 h-9", iconSize = "w-5 h-5" }) {
  return (
    <div className={`${size} rounded bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/40`}>
      <motion.svg viewBox="0 0 24 24" className={iconSize} fill="none" stroke="black" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M9 12l2 2 4-4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.15 }}
        />
      </motion.svg>
    </div>
  );
}

function spot(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
}

export default function Landing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pipeStep, setPipeStep] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 18 });
  const sy = useSpring(my, { stiffness: 45, damping: 18 });
  const chipX = [
    useTransform(sx, (v) => v * CHIPS[0].depth),
    useTransform(sx, (v) => v * CHIPS[1].depth),
    useTransform(sx, (v) => v * CHIPS[2].depth),
    useTransform(sx, (v) => v * CHIPS[3].depth),
    useTransform(sx, (v) => v * CHIPS[4].depth),
  ];
  const chipY = [
    useTransform(sy, (v) => v * CHIPS[0].depth),
    useTransform(sy, (v) => v * CHIPS[1].depth),
    useTransform(sy, (v) => v * CHIPS[2].depth),
    useTransform(sy, (v) => v * CHIPS[3].depth),
    useTransform(sy, (v) => v * CHIPS[4].depth),
  ];

  useEffect(() => {
    const t = setInterval(() => setPipeStep((s) => (s + 1) % PIPELINE.length), 1100);
    return () => clearInterval(t);
  }, []);

  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

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
      <div className="uc-grain" />
      {/* Nav */}
      <header className="border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark />
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
      <section className="relative overflow-hidden" onMouseMove={onHeroMove}>
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="uc-label mb-6 flex items-center gap-3"
              data-testid="landing-hero-eyebrow"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block w-8 h-px bg-amber-500 origin-left"
              />
              A Legal-Tech Analysis Platform · Not a Chatbot
            </motion.div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight max-w-5xl" data-testid="landing-hero-title">
              <ScrambleText text="From AI Creation History" delay={250} duration={1000} />
              <br />
              <ScrambleText text="to a" delay={900} duration={350} />{" "}
              <ScrambleText text="Defensible" delay={1150} duration={650} className="text-amber-500" />{" "}
              <ScrambleText text="Copyright Claim." delay={1550} duration={900} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.1, duration: 0.7 }}
              className="mt-8 max-w-2xl text-lg text-slate-400 leading-relaxed"
              data-testid="landing-hero-subtitle"
            >
              UnCopyright reconstructs how an AI-assisted work was actually created, separates human and AI
              contributions event-by-event, and applies the specific copyright rules of India, the United States
              and the United Kingdom — with every conclusion traced back to a statute, precedent, or the file on
              record.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.35, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                data-testid="btn-launch-workspace"
                onClick={startFresh}
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-500 text-black font-semibold h-12 px-6 rounded-md shadow-lg shadow-amber-900/40 uc-pulse"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="mt-8"
            >
              <EngineTicker />
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-3" data-testid="jurisdiction-pills">
              {JURI_PILLS.map((j, i) => (
                <motion.div
                  key={j.code}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 + i * 0.12, duration: 0.5 }}
                  onMouseMove={spot}
                  className="uc-card uc-spot-target px-4 py-2.5 flex items-center gap-2.5"
                >
                  <span className="text-xl">{j.flag}</span>
                  <div className="leading-tight">
                    <div className="text-xs font-mono text-slate-500">{j.code}</div>
                    <div className="text-sm text-slate-200">{j.law}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Ambient breathing glows */}
        <div className="absolute top-24 right-0 w-[36rem] h-[36rem] rounded-full bg-amber-600/[0.07] blur-[130px] pointer-events-none uc-breathe" />
        <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-blue-700/[0.05] blur-[130px] pointer-events-none uc-breathe" style={{ animationDelay: "2.5s" }} />

        {/* Drifting forensic record chips with cursor parallax */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden>
          {CHIPS.map((c, i) => (
            <motion.div key={c.t} className={`absolute ${c.cls}`} style={{ x: chipX[i], y: chipY[i] }}>
              <div className={`${c.drift} px-3 py-1.5 rounded border border-white/10 bg-white/[0.02] backdrop-blur-sm font-mono text-[0.62rem] tracking-[0.18em] text-slate-500`}>
                {c.t}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Preview strip — the syllogism, self-assembling */}
      <section className="border-y border-white/5 bg-slate-950/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="uc-label mb-5"
          >
            Every conclusion follows one structure
          </motion.div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-sm">
              {PIPELINE.map((step, i) => {
                const active = i === pipeStep;
                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`uc-card px-4 py-4 uc-ticks flex items-center gap-3 transition-colors duration-300 ${
                      active ? "border-amber-500/50 bg-amber-500/[0.05]" : ""
                    }`}
                  >
                    <span className="tl" /><span className="br" />
                    <span className={`font-bold transition-colors duration-300 ${active ? "text-amber-400" : "text-amber-500/50"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-semibold uppercase tracking-wider transition-colors duration-300 ${active ? "text-amber-100" : "text-slate-300"}`}>
                      {step}
                    </span>
                    <span
                      className={`ml-auto w-1.5 h-1.5 rounded-full transition-colors duration-300 ${active ? "bg-amber-400" : "bg-amber-500/40"}`}
                      style={{ animation: `uc-pulse-dot 2.2s ${i * 0.35}s infinite` }}
                    />
                  </motion.div>
                );
              })}
            </div>
            <div className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-amber-500/[0.08] to-transparent uc-scanx pointer-events-none hidden md:block" />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="workflow" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">Four layers, one workflow.</h2>
          <p className="text-slate-400 max-w-2xl mb-12">Creation → Legal → Evidence → Claim. UnCopyright refuses to collapse them into a single "is this copyrighted?" answer.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.13, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={spot}
              className="uc-card p-6 uc-ticks uc-spot-target transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="tl" /><span className="br" />
              <p.icon className="w-6 h-6 text-amber-500 mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Scope */}
      <section id="exclusions" className="border-t border-white/5 bg-slate-950/40">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10"
        >
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
        </motion.div>
      </section>

      {/* Authorities strip */}
      <section id="authorities" className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <div className="uc-label mb-3">Authority database</div>
          <h3 className="font-display text-2xl font-bold mb-6">Grounded in primary legal sources</h3>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { j: "India", ref: "Copyright Act, 1957 · s.2(d)(vi)", url: "https://copyright.gov.in/Copyright_Act_1957/chapter_i.html" },
            { j: "United States", ref: "USCO — Copyright and AI, Part 2: Copyrightability (2025)", url: "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf" },
            { j: "United Kingdom", ref: "CDPA 1988 · Sections 9(3) & 178", url: "https://www.legislation.gov.uk/ukpga/1988/48" },
          ].map((s, i) => (
            <motion.a
              key={s.j}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseMove={spot}
              className="uc-card uc-card-hover uc-spot-target p-5 group block"
            >
              <div className="uc-label mb-2 flex items-center justify-between">
                <span>{s.j}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="font-mono text-sm text-slate-300">{s.ref}</div>
              <div className="mt-3 text-xs text-slate-500">Last verified 7 September 2026 · Current Law</div>
            </motion.a>
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
