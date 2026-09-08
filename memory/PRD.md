# UnCopyright — PRD

## Original Problem Statement
Build **UnCopyright**: a jurisdiction-aware legal-tech platform ("From AI Creation History to a Defensible Copyright Claim") that reconstructs how an AI-assisted work was created, separates human/AI contributions, applies jurisdiction-specific copyright rules (India Copyright Act 1957 s.2(d)(vi), US USCO Copyrightability Report 2025, UK CDPA 1988 s.9(3)), maps claimable contributions, and traces every conclusion to evidence and authoritative legal sources. Central workflow: AI-ASSISTED WORK → CREATION HISTORY → CREATION EVENTS → HUMAN/AI CONTRIBUTION → LEGAL ISSUES → JURISDICTION → AUTHORITATIVE LEGAL RULE → FACT→RULE→AUTHORITY→APPLICATION→CONCLUSION → CLAIM MAP → EVIDENCE MAP → EVIDENCE GAPS → LAWYER REVIEW. NOT a chatbot, NOT a filing service, NO human/AI percentage scores.

## User Choices (confirmed)
1. Rule-based analysis engine only (NO LLM).
2. No auth for MVP — single anonymous session.
3. Emergent Object Storage for file uploads (private, authenticated storage).
4. Sarah demo pre-populated sample ("Inspect Sarah Sample") included.
5. PDF export via print stylesheet.

## Architecture
- **Backend** `/app/backend/server.py` (FastAPI, /api prefix) — works CRUD, creation events, file upload/download via Emergent Object Storage, rule-based `/works/{id}/analyze` engine.
- **Legal database** `/app/backend/legal_data.py` — AUTHORITIES (20 records with source_url, last_verified, legal_status), ISSUES (4), JURISDICTIONS (3), ANALYSIS_RULES (20 routing records with questions + required_evidence), deterministic `claim_position()` matrix.
- **Demo fixture** `/app/backend/sarah_demo.py` — Sarah's visual artwork: 5 events, 5 files, read-only demo id `demo-sarah-visual-artwork`.
- **Frontend** `/app/frontend/src/pages/Landing.jsx`, `pages/Workspace.jsx` (9-step state machine), `components/` — WorkflowSidebar, WorkTypeSelector, MaterialUpload, CreationTimeline, ContributionMap (qualitative bands, no %), JurisdictionEngine, LegalAnalysisView (Fact→Rule→Authority→Application→Conclusion drill-down), ComparativeClaimMatrix (🟢🟠🔴 derived from analysis), EvidenceMap, LawyerReview (print/PDF).
- **Design** `/app/design_guidelines.json` — Swiss/Forensic Editorial dark theme, Outfit + IBM Plex Sans + JetBrains Mono, amber accent, corner ticks, no chatbot UI.
- **DB**: MongoDB collections `works`, `creation_events`, `files`, `analysis_results`.

## Implemented (2026-09-07)
- Landing page with hero, jurisdiction pills, dual CTA, scope/exclusions, authority strip.
- Full 9-step workspace: work type (Written/Visual), 6-category evidence upload (object storage verified working), editable creation timeline with multi-issue tagging and KNOWN/INFERRED/UNKNOWN certainty, qualitative contribution map, 3-jurisdiction selector, syllogism analysis, comparative claim matrix, evidence map + gaps, lawyer review dossier with print/PDF.
- Sarah demo: full read-only walkthrough producing 21 conclusions across IN/US/UK, including the jurisdiction differentiator (US AI material = EXCLUDE, India = UNCERTAIN, UK = POTENTIALLY_CLAIMABLE).
- Backend pytest suite `/app/backend/tests/test_uncopyright_api.py` — 13/13 passing.
- Cinematic motion layer (user chose "cinematic & bold"): word-cascade hero with blur reveal, breathing ambient glows, drifting forensic record chips, film grain overlay, scan-line pipeline strip with pulse dots, cursor spotlights on cards, sidebar progress rail with spring checkmarks, timeline connector line draw + staggered event entrance, contribution bars that fill on load, jurisdiction card hover lift, `AnalysisRunOverlay` (IN→US→UK engine scan sequence, ~2.1s) before results, claim-matrix badge cascade, blur-slide step transitions, `prefers-reduced-motion` respected.
- Landing-only cinematic pack (follow-up): `fx/ScrambleText.jsx` decrypt-reveal headline, `fx/EngineTicker.jsx` rolling typewriter "live engine preview" terminal, SVG stroke-drawn shield logo (`LogoMark`), cursor-parallax on drifting chips (springs + motion values), self-cycling pipeline strip (active step lights up every 1.1s), blur+depth scroll reveals on all sections.

- Authority database v2 (2026-09-08, user-supplied 21 records): records 1–20 CURRENT_LAW (verified 2026-09-07; now cites Feist, Zarya of the Dawn, SURYAST, Thaler v. Perlmutter, THJ Systems v Sheridan, EBC v. Modak SCI PDF, Indian statute sections), record 21 `UK-REF-CGW-21` PROPOSED_REFORM (verified 2026-09-08). `find_authority()` hard-filters to CURRENT_LAW so proposed reform can never be an operative rule; ANALYSIS_RULES built from current-law records only (20 rules). Separate informational branch: `/analyze` returns `reform_warnings[]` only when UK + AI_GENERATED_MATERIAL is analysed — never touches claim positions. UI: `ReformPanel` ("⚠ Proposed reform — not current law", government-report source link) in LegalAnalysisView + LawyerReview, per-card "⚠ reform proposed" tag on UK AI-material syllogisms, "reform risk" indicator in claim matrix UK AI cells.

## Test Results
- `/app/test_reports/iteration_1.json`: backend 100% (13/13), all frontend flows pass, no blocking bugs.

## Backlog
- **P1**: "Why this conclusion?" interactive traceability chain view (currently the expanded syllogism card covers Conclusion→Fact→Rule→Authority→Source→Evidence inline); visual before/after comparison for visual works; richer timeline visuals.
- **P2**: Async object-storage client (httpx) for scale; indexed authority lookup; user accounts + workspace isolation; soft-delete UI for files; USCO Form TX / Indian Form XIV disclaimer text generator.

## Notes
- No mocked integrations — object storage is live (EMERGENT_LLM_KEY in backend/.env).
- No authentication by design (MVP choice).
