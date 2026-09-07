"""Legal authorities, issues, and analysis rules database for UnCopyright."""

AUTHORITIES = [
    {"authority_id": "IN-AI-W-01", "jurisdiction": "India", "work_type": "Written", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "For a computer-generated literary work, the author is the person who causes the work to be created.",
     "authority_name": "Copyright Act, 1957", "authority_type": "STATUTE", "authority_reference": "Section 2(d)(vi)",
     "source_url": "https://copyright.gov.in/Copyright_Act_1957/chapter_i.html", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Determine who caused the computer-generated literary work to be created. Do not automatically apply the US human-authorship approach to India."},
    {"authority_id": "IN-AI-V-02", "jurisdiction": "India", "work_type": "Visual", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "For a computer-generated artistic work, the author is the person who causes the work to be created.",
     "authority_name": "Copyright Act, 1957", "authority_type": "STATUTE", "authority_reference": "Section 2(d)(vi)",
     "source_url": "https://copyright.gov.in/Copyright_Act_1957/chapter_i.html", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Determine who caused the computer-generated artistic work to be created."},
    {"authority_id": "IN-H-W-03", "jurisdiction": "India", "work_type": "Written", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Originality requires that the work originate from the author and possess at least a minimal degree of creativity; purely mechanical or trivial inputs are insufficient.",
     "authority_name": "Eastern Book Company v. D.B. Modak", "authority_type": "CASE", "authority_reference": "(2008) 1 SCC 1",
     "source_url": "https://indiankanoon.org/doc/1062099/", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Identify the human-authored expression and assess whether the contribution goes beyond merely mechanical labour."},
    {"authority_id": "IN-H-V-04", "jurisdiction": "India", "work_type": "Visual", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "An artistic work must satisfy the applicable originality requirement; human creative choices may establish protectable authorship where they are sufficiently original.",
     "authority_name": "Eastern Book Company v. D.B. Modak", "authority_type": "CASE", "authority_reference": "(2008) 1 SCC 1",
     "source_url": "https://indiankanoon.org/doc/1062099/", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Identify human expressive artistic choices and distinguish them from purely mechanical or technical processing."},
    {"authority_id": "IN-SA-W-05", "jurisdiction": "India", "work_type": "Written", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Selection, coordination or arrangement may be original where it reflects sufficient creativity; merely mechanical or trivial selection is insufficient.",
     "authority_name": "Eastern Book Company v. D.B. Modak", "authority_type": "CASE", "authority_reference": "(2008) 1 SCC 1",
     "source_url": "https://indiankanoon.org/doc/1062099/", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Examine the human decisions involved in selecting, coordinating and arranging AI-generated material."},
    {"authority_id": "IN-SA-V-06", "jurisdiction": "India", "work_type": "Visual", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Selection, coordination or arrangement may constitute original expression where the human choices demonstrate sufficient creativity.",
     "authority_name": "Eastern Book Company v. D.B. Modak", "authority_type": "CASE", "authority_reference": "(2008) 1 SCC 1",
     "source_url": "https://indiankanoon.org/doc/1062099/", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Assess creative visual selection, coordination and arrangement separately from the underlying AI-generated elements."},
    {"authority_id": "IN-HM-W-07", "jurisdiction": "India", "work_type": "Written", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "Human modifications must satisfy the applicable originality requirement; trivial or purely mechanical modifications are insufficient.",
     "authority_name": "Eastern Book Company v. D.B. Modak", "authority_type": "CASE", "authority_reference": "(2008) 1 SCC 1",
     "source_url": "https://indiankanoon.org/doc/1062099/", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Identify the precise human modifications and determine whether they contain original expression."},
    {"authority_id": "IN-HM-V-08", "jurisdiction": "India", "work_type": "Visual", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "Creative human modifications to an artistic work may contribute to originality, while merely technical or mechanical modifications may not.",
     "authority_name": "Eastern Book Company v. D.B. Modak", "authority_type": "CASE", "authority_reference": "(2008) 1 SCC 1",
     "source_url": "https://indiankanoon.org/doc/1062099/", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Distinguish expressive repainting, restructuring or alteration from technical processing."},
    {"authority_id": "US-AI-W-09", "jurisdiction": "United States", "work_type": "Written", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "Material generated by AI is not protected merely because a human supplied prompts; copyrightability depends on human authorship and the extent of human control over expressive elements.",
     "authority_name": "Copyright and Artificial Intelligence, Part 2: Copyrightability", "authority_type": "GOVERNMENT_GUIDANCE",
     "authority_reference": "U.S. Copyright Office, 2025",
     "source_url": "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Determine whether the human, rather than the AI system, determined the relevant expressive elements."},
    {"authority_id": "US-AI-V-10", "jurisdiction": "United States", "work_type": "Visual", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "Purely AI-generated visual material is not protected as human-authored expression; copyright may nevertheless subsist in sufficiently human-authored elements.",
     "authority_name": "Copyright and Artificial Intelligence, Part 2: Copyrightability", "authority_type": "GOVERNMENT_GUIDANCE",
     "authority_reference": "U.S. Copyright Office, 2025",
     "source_url": "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Separate the AI-generated elements from human-authored visual expression."},
    {"authority_id": "US-H-W-11", "jurisdiction": "United States", "work_type": "Written", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Human authorship is required, but use of AI as an assistive tool does not automatically prevent copyright protection for sufficiently human-authored expression.",
     "authority_name": "Copyright and Artificial Intelligence, Part 2: Copyrightability", "authority_type": "GOVERNMENT_GUIDANCE",
     "authority_reference": "U.S. Copyright Office, 2025",
     "source_url": "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Identify what expressive content was actually determined by the human author."},
    {"authority_id": "US-H-V-12", "jurisdiction": "United States", "work_type": "Visual", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Human-authored visual elements may be protected where the human determines sufficient expressive elements.",
     "authority_name": "Copyright and Artificial Intelligence, Part 2: Copyrightability", "authority_type": "GOVERNMENT_GUIDANCE",
     "authority_reference": "U.S. Copyright Office, 2025",
     "source_url": "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Identify human-determined visual expression rather than relying on the amount of time spent creating the work."},
    {"authority_id": "US-SA-W-13", "jurisdiction": "United States", "work_type": "Written", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Creative human selection, coordination or arrangement of AI-generated material may itself constitute protectable human-authored expression.",
     "authority_name": "Copyright and Artificial Intelligence, Part 2: Copyrightability", "authority_type": "GOVERNMENT_GUIDANCE",
     "authority_reference": "U.S. Copyright Office, 2025",
     "source_url": "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Assess the creativity and specificity of the human selection and arrangement."},
    {"authority_id": "US-SA-V-14", "jurisdiction": "United States", "work_type": "Visual", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Creative human selection, coordination and arrangement of AI-generated visual elements may be protected even where the underlying AI-generated material is not.",
     "authority_name": "Copyright and Artificial Intelligence, Part 2: Copyrightability", "authority_type": "GOVERNMENT_GUIDANCE",
     "authority_reference": "U.S. Copyright Office, 2025",
     "source_url": "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Analyse the human arrangement independently from the AI-generated elements."},
    {"authority_id": "US-HM-W-15", "jurisdiction": "United States", "work_type": "Written", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "Creative human modifications to AI-generated material may be protected to the extent they contain sufficient human-authored expression.",
     "authority_name": "Copyright and Artificial Intelligence, Part 2: Copyrightability / AI Registration Guidance",
     "authority_type": "GOVERNMENT_GUIDANCE", "authority_reference": "2025 Copyrightability Report; 2023 Registration Guidance",
     "source_url": "https://www.copyright.gov/ai/ai_policy_guidance.pdf", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Determine which modifications were human-authored and whether they are sufficiently creative."},
    {"authority_id": "US-HM-V-16", "jurisdiction": "United States", "work_type": "Visual", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "Sufficiently creative human modifications to AI-generated visual material may be protected, while the underlying AI-generated material remains outside the human-authored claim.",
     "authority_name": "Copyright and Artificial Intelligence, Part 2: Copyrightability / AI Registration Guidance",
     "authority_type": "GOVERNMENT_GUIDANCE", "authority_reference": "2025 Copyrightability Report; 2023 Registration Guidance",
     "source_url": "https://www.copyright.gov/ai/ai_policy_guidance.pdf", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Separate protectable human modifications from the underlying AI-generated material."},
    {"authority_id": "UK-AI-17", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "For a computer-generated literary, dramatic, musical or artistic work, where there is no human author, the author is the person by whom the arrangements necessary for the creation of the work are undertaken.",
     "authority_name": "Copyright, Designs and Patents Act 1988", "authority_type": "STATUTE", "authority_reference": "Sections 9(3) and 178",
     "source_url": "https://www.legislation.gov.uk/ukpga/1988/48", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Apply the UK's computer-generated work regime. Do not substitute the US human-authorship rule. The UK Government's 2026 proposal to remove this regime is not current law."},
    {"authority_id": "UK-H-18", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Copyright subsists in original literary, dramatic, musical and artistic works. AI assistance does not automatically remove protection where sufficient human creative contribution exists.",
     "authority_name": "Copyright, Designs and Patents Act 1988", "authority_type": "STATUTE", "authority_reference": "Sections 1, 3 and 4",
     "source_url": "https://www.legislation.gov.uk/ukpga/1988/48", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Identify the human creative choices and analyse originality in the context of the work."},
    {"authority_id": "UK-SA-19", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Originality may arise from sufficiently creative selection or arrangement of material, including where the human author determines the relevant expressive structure.",
     "authority_name": "UK Originality Case Law", "authority_type": "CASE_LAW",
     "authority_reference": "Ladbroke / Designers Guild principles; SAS Institute v World Programming",
     "source_url": "https://www.bailii.org/ew/cases/EWHC/Ch/2010/1829.html", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Analyse whether the human selection or arrangement reflects original creative choices rather than merely mechanical labour."},
    {"authority_id": "UK-HM-20", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "Human expressive modifications can form part of an original copyright work where they satisfy the applicable originality requirement.",
     "authority_name": "Copyright, Designs and Patents Act 1988 and UK Originality Principles",
     "authority_type": "STATUTE_AND_CASE_LAW", "authority_reference": "CDPA 1988; UK originality jurisprudence",
     "source_url": "https://www.legislation.gov.uk/ukpga/1988/48", "legal_status": "CURRENT_LAW", "last_verified": "2026-09-07",
     "application_notes": "Focus on the original human expression contained in the modification, not simply the amount of labour involved."},
]

ISSUES = [
    {"issue_id": "AI_GENERATED_MATERIAL", "issue_name": "AI-generated material",
     "description": "Material produced by an AI system rather than directly created by the human.", "work_types": ["Written", "Visual"]},
    {"issue_id": "HUMAN_CONTRIBUTION", "issue_name": "Human creative contribution",
     "description": "Original expressive contribution made directly by the human creator.", "work_types": ["Written", "Visual"]},
    {"issue_id": "SELECTION_ARRANGEMENT", "issue_name": "Human selection or arrangement",
     "description": "Human selection, coordination, ordering or arrangement of material.", "work_types": ["Written", "Visual"]},
    {"issue_id": "HUMAN_MODIFICATION", "issue_name": "Human modification",
     "description": "Human editing, alteration, repainting, rewriting, restructuring or other modification of AI-generated material.",
     "work_types": ["Written", "Visual"]},
]

JURISDICTIONS = [
    {"code": "IN", "name": "India", "flag": "🇮🇳", "primary_law": "Copyright Act, 1957"},
    {"code": "US", "name": "United States", "flag": "🇺🇸", "primary_law": "USCO Copyrightability Report 2025"},
    {"code": "UK", "name": "United Kingdom", "flag": "🇬🇧", "primary_law": "CDPA 1988 s.9(3)"},
]


def find_authority(jurisdiction: str, work_type: str, issue: str):
    """Return the matching authority record or None."""
    for a in AUTHORITIES:
        if a["jurisdiction"] != jurisdiction:
            continue
        if a["issue"] != issue:
            continue
        if a["work_type"] == "BOTH" or a["work_type"] == work_type:
            return a
    return None


# Deterministic claim position matrix by (issue, jurisdiction, certainty)
def claim_position(issue: str, jurisdiction: str, certainty: str) -> str:
    """Return POTENTIALLY_CLAIMABLE / UNCERTAIN / EXCLUDE deterministically."""
    if issue == "AI_GENERATED_MATERIAL":
        if jurisdiction == "United States":
            return "EXCLUDE"
        if jurisdiction == "India":
            return "UNCERTAIN"
        if jurisdiction == "United Kingdom":
            return "POTENTIALLY_CLAIMABLE" if certainty == "KNOWN" else "UNCERTAIN"
    if issue in ("HUMAN_CONTRIBUTION", "SELECTION_ARRANGEMENT", "HUMAN_MODIFICATION"):
        if certainty == "KNOWN":
            return "POTENTIALLY_CLAIMABLE"
        if certainty == "INFERRED":
            return "UNCERTAIN"
        return "UNCERTAIN"
    return "UNCERTAIN"


def confidence_level(certainty: str, has_evidence: bool) -> str:
    if certainty == "KNOWN" and has_evidence:
        return "HIGH"
    if certainty == "KNOWN" or has_evidence:
        return "MEDIUM"
    return "LOW"


# ─── ANALYSIS RULES (routing: jurisdiction × work_type × issue) ──────────────
_QUESTIONS = {
    "AI_GENERATED_MATERIAL": [
        "Which material was generated by the AI system?",
        "What degree of human control was exercised over the expressive elements?",
        "Does any human-authored expression remain separable from the AI output?",
    ],
    "HUMAN_CONTRIBUTION": [
        "What expressive content was determined directly by the human?",
        "Does the contribution go beyond trivial or mechanical labour?",
        "Which artefacts document the human creative choices?",
    ],
    "SELECTION_ARRANGEMENT": [
        "What did the human select, and from how many alternatives?",
        "Were the selection and arrangement choices creative rather than mechanical?",
        "Is the arrangement documented separately from the underlying material?",
    ],
    "HUMAN_MODIFICATION": [
        "What changes did the human make?",
        "Were the modifications sufficiently expressive?",
        "Which parts remain AI-generated?",
    ],
}

_REQUIRED_EVIDENCE = {
    "AI_GENERATED_MATERIAL": ["AI output files", "prompt logs", "generation parameters"],
    "HUMAN_CONTRIBUTION": ["human drafts", "working files", "timestamped sketches"],
    "SELECTION_ARRANGEMENT": ["full set of alternatives", "selected output", "composition notes"],
    "HUMAN_MODIFICATION": ["original AI output", "edited image", "layer history", "before/after comparison"],
}

ANALYSIS_RULES = [
    {
        "rule_id": f"AR-{a['jurisdiction'].upper().replace(' ', '')}-"
                   + {"Written": "W", "Visual": "V", "BOTH": "B"}[a["work_type"]] + "-"
                   + {"AI_GENERATED_MATERIAL": "AI", "HUMAN_CONTRIBUTION": "H", "SELECTION_ARRANGEMENT": "SA", "HUMAN_MODIFICATION": "HM"}[a["issue"]],
        "jurisdiction": a["jurisdiction"],
        "work_type": a["work_type"],
        "issue": a["issue"],
        "authority_ids": [a["authority_id"]],
        "questions": _QUESTIONS[a["issue"]],
        "required_evidence": _REQUIRED_EVIDENCE[a["issue"]],
    }
    for a in AUTHORITIES
]
