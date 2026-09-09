import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API });

export const api = {
  authorities: () => client.get("/reference/authorities").then((r) => r.data),
  issues: () => client.get("/reference/issues").then((r) => r.data),
  jurisdictions: () => client.get("/reference/jurisdictions").then((r) => r.data),
  createWork: (payload) => client.post("/works", payload).then((r) => r.data),
  getWork: (id) => client.get(`/works/${id}`).then((r) => r.data),
  setEvents: (id, events) => client.put(`/works/${id}/events`, { events }).then((r) => r.data),
  analyze: (id, jurisdictions) => client.post(`/works/${id}/analyze`, { jurisdictions }).then((r) => r.data),
  demoSarah: () => client.get("/demo/sarah").then((r) => r.data),
};

export const ISSUE_LABEL = {
  AI_GENERATED_MATERIAL: "AI-generated material",
  HUMAN_CONTRIBUTION: "Human creative contribution",
  SELECTION_ARRANGEMENT: "Human selection or arrangement",
  HUMAN_MODIFICATION: "Human modification",
};

export const POSITION_STYLES = {
  POTENTIALLY_CLAIMABLE: {
    label: "Potentially Claimable",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    ring: "shadow-[0_0_0_1px_rgba(16,185,129,0.35)]",
  },
  UNCERTAIN: {
    label: "Uncertain",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    ring: "shadow-[0_0_0_1px_rgba(245,158,11,0.35)]",
  },
  EXCLUDE: {
    label: "Exclude from Claim",
    dot: "bg-rose-500",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    ring: "shadow-[0_0_0_1px_rgba(239,68,68,0.35)]",
  },
};

export const ACTOR_STYLES = {
  HUMAN: { label: "HUMAN", cls: "bg-blue-500/10 text-blue-300 border-blue-500/30" },
  AI:    { label: "AI",    cls: "bg-violet-500/10 text-violet-300 border-violet-500/30" },
  HYBRID:{ label: "HYBRID",cls: "bg-pink-500/10 text-pink-300 border-pink-500/30" },
};

export const CERTAINTY_STYLES = {
  KNOWN:   { label: "KNOWN — directly supported",   cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  INFERRED:{ label: "INFERRED — reasonable inference", cls: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  UNKNOWN: { label: "UNKNOWN — no record",          cls: "bg-rose-500/10 text-rose-400 border-rose-500/30" },
};

export const JURI_META = {
  "India":          { code: "IN", flag: "🇮🇳", law: "Copyright Act, 1957" },
  "United States":  { code: "US", flag: "🇺🇸", law: "USCO Copyrightability Report (2025)" },
  "United Kingdom": { code: "UK", flag: "🇬🇧", law: "CDPA 1988 s.9(3)" },
};
