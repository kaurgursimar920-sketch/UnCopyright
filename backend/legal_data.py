"""Legal authorities, issues, and analysis rules database for UnCopyright."""

AUTHORITIES = [
    {"id": 1, "authority_id": "IN-AI-W-01", "jurisdiction": "India", "work_type": "Written", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "Section 2(d)(vi) of the Copyright Act, 1957 provides that, in relation to a computer-generated literary, dramatic, musical or artistic work, the author is the person who causes the work to be created. The provision does not expressly equate the person who causes creation with a person who merely supplies an AI prompt.",
     "authority_name": "Copyright Act, 1957 — Section 2(d)(vi)", "authority_type": "Indian statute",
     "authority_reference": "Copyright Act, 1957, Section 2(d)(vi)",
     "source_url": "https://copyright.gov.in/Copyright_Act_1957/chapter_i.html",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Apply the statutory computer-generated-work rule to relevant AI-generated literary works. Do not automatically apply the US human-authorship approach to India. Do not assume that entering a prompt alone necessarily makes the user the statutory author."},
    {"id": 2, "authority_id": "IN-AI-V-02", "jurisdiction": "India", "work_type": "Visual", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "Section 2(d)(vi) of the Copyright Act, 1957 provides that, in relation to a computer-generated artistic work, the author is the person who causes the work to be created. The provision does not expressly equate the person who causes creation with a person who merely supplies an AI prompt.",
     "authority_name": "Copyright Act, 1957 — Section 2(d)(vi)", "authority_type": "Indian statute",
     "authority_reference": "Copyright Act, 1957, Section 2(d)(vi)",
     "source_url": "https://copyright.gov.in/Copyright_Act_1957/chapter_i.html",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Apply to relevant computer-generated artistic works. The DABUS Copyright Office order may be used as supporting persuasive administrative authority where relevant, but it is not a Supreme Court or High Court judgment and is not binding judicial precedent."},
    {"id": 3, "authority_id": "IN-H-W-03", "jurisdiction": "India", "work_type": "Written", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Copyright subsists in original literary works under Section 13(1)(a) of the Copyright Act, 1957. Human contribution should therefore be assessed by asking whether the relevant human-created expression forms part of an original literary work.",
     "authority_name": "Copyright Act, 1957 — Section 13(1)(a)", "authority_type": "Indian statute",
     "authority_reference": "Copyright Act, 1957, Section 13(1)(a)",
     "source_url": "https://copyright.gov.in/Copyright_Act_1957/chapter_iii.html",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Assess the actual human-created expression supplied by the user. Do not infer human authorship merely because the user operated an AI system."},
    {"id": 4, "authority_id": "IN-H-V-04", "jurisdiction": "India", "work_type": "Visual", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Section 2(c) defines artistic work and Section 13(1)(a) provides copyright protection for original artistic works. Human contribution should be assessed by determining whether the relevant human-created expression is sufficiently original.",
     "authority_name": "Associated Publishers (Madras) Ltd. v. K. Bashyam", "authority_type": "Madras High Court judgment",
     "authority_reference": "Associated Publishers (Madras) Ltd. v. K. Bashyam, judgment dated 22 April 1960",
     "source_url": "https://indiankanoon.org/doc/1837393/",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "The case concerns originality in an artistic work and supports the proposition that limited originality may arise from skill and ingenuity in combining existing material. It is a High Court judgment, not a Supreme Court judgment."},
    {"id": 5, "authority_id": "IN-SA-W-05", "jurisdiction": "India", "work_type": "Written", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Compilations fall within literary works and copyright requires originality. Selection, coordination or arrangement of pre-existing material may be protected where it reflects sufficient skill and judgment rather than merely trivial or mechanical choices.",
     "authority_name": "Eastern Book Company v. D.B. Modak", "authority_type": "Supreme Court of India judgment",
     "authority_reference": "Eastern Book Company v. D.B. Modak, Supreme Court of India, judgment dated 12 December 2007",
     "source_url": "https://api.sci.gov.in/jonew/judis/30019.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Apply to human selection, coordination and arrangement in literary works. Do not extend the case beyond its relevance."},
    {"id": 6, "authority_id": "IN-SA-V-06", "jurisdiction": "India", "work_type": "Visual", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Section 2(c) defines artistic work and Section 13(1)(a) protects original artistic works. Human selection or arrangement of visual elements should be assessed for originality based on the actual creative choices supplied by the human.",
     "authority_name": "Copyright Act, 1957 — Sections 2(c) and 13(1)(a)", "authority_type": "Indian statute",
     "authority_reference": "Copyright Act, 1957, Sections 2(c) and 13(1)(a)",
     "source_url": "https://copyright.gov.in/Copyright_Act_1957/chapter_i.html",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "No case authority should be forced into this entry. Assess the actual human selection or arrangement supplied in the creation history."},
    {"id": 7, "authority_id": "IN-HM-W-07", "jurisdiction": "India", "work_type": "Written", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "The Copyright Act recognises adaptation involving alteration or rearrangement and provides rights concerning adaptations of literary works. Any resulting protection depends on the originality of the human contribution. Trivial or mechanical changes are insufficient.",
     "authority_name": "Eastern Book Company v. D.B. Modak", "authority_type": "Supreme Court of India judgment",
     "authority_reference": "Eastern Book Company v. D.B. Modak, Supreme Court of India, judgment dated 12 December 2007",
     "source_url": "https://api.sci.gov.in/jonew/judis/30019.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Apply to human modifications of AI-generated or pre-existing literary material where the human contribution may constitute original expression."},
    {"id": 8, "authority_id": "IN-HM-V-08", "jurisdiction": "India", "work_type": "Visual", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "The Copyright Act recognises adaptation involving alteration or rearrangement and provides rights concerning adaptations of artistic works. Human modifications should be assessed for original human expression.",
     "authority_name": "Copyright Act, 1957 — Sections 2(a)(v), 13(1)(a) and 14(c)(v)", "authority_type": "Indian statute",
     "authority_reference": "Copyright Act, 1957, Sections 2(a)(v), 13(1)(a) and 14(c)(v)",
     "source_url": "https://copyright.gov.in/Copyright_Act_1957/chapter_iii.html",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Assess whether the human modification contributes original expressive content. Do not assume every technical edit is copyrightable."},
    {"id": 9, "authority_id": "US-AI-W-09", "jurisdiction": "United States", "work_type": "Written", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "Copyright protection under U.S. law requires human authorship. AI-generated material is not protected merely because a person supplied prompts or operated an AI system. Human contributions may be separately protected where they contain sufficient human authorship.",
     "authority_name": "17 U.S.C. §102; Copyright and Artificial Intelligence, Part 2", "authority_type": "U.S. statute and U.S. Copyright Office report",
     "authority_reference": "17 U.S.C. §102; U.S. Copyright Office, Copyright and Artificial Intelligence, Part 2 — Copyrightability",
     "source_url": "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Prompts alone should not automatically be treated as sufficient human authorship. Analyse the human expressive contribution actually established by the evidence."},
    {"id": 10, "authority_id": "US-AI-V-10", "jurisdiction": "United States", "work_type": "Visual", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "AI-generated visual material is not protected merely because a person supplied prompts or operated the system. U.S. copyright protection requires sufficient human authorship in the protected material.",
     "authority_name": "SURYAST; A Recent Entrance to Paradise; Thaler v. Perlmutter", "authority_type": "U.S. Copyright Office Review Board decisions and U.S. Court of Appeals judgment",
     "authority_reference": "SURYAST, U.S. Copyright Office Review Board; A Recent Entrance to Paradise, U.S. Copyright Office Review Board; Thaler v. Perlmutter, U.S. Court of Appeals for the D.C. Circuit",
     "source_url": "https://www.copyright.gov/rulings-filings/review-board/docs/SURYAST.pdf; https://www.copyright.gov/rulings-filings/review-board/docs/a-recent-entrance-to-paradise.pdf; https://www.copyright.gov/ai/docs/court-of-appeals-decision-affirming-refusal-of-registration.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "These authorities support the human-authorship requirement and the distinction between AI-generated material and human-authored contribution. Review Board decisions are administrative decisions, not judicial precedent."},
    {"id": 11, "authority_id": "US-H-W-11", "jurisdiction": "United States", "work_type": "Written", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Human-authored expression in an AI-assisted work may be protected where it contains sufficient human authorship. AI-generated material itself does not become protected merely because it is incorporated into a human-created work.",
     "authority_name": "Zarya of the Dawn; Copyright and Artificial Intelligence, Part 2", "authority_type": "U.S. Copyright Office registration decision and U.S. Copyright Office report",
     "authority_reference": "Zarya of the Dawn, U.S. Copyright Office; Copyright and Artificial Intelligence, Part 2 — Copyrightability",
     "source_url": "https://www.copyright.gov/docs/zarya-of-the-dawn.pdf; https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Use to distinguish human-written expression from AI-generated material in a mixed work."},
    {"id": 12, "authority_id": "US-H-V-12", "jurisdiction": "United States", "work_type": "Visual", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Human visual contributions may receive copyright protection where they contain sufficient human authorship. AI-generated visual material does not become protected merely because a human participated in the overall process.",
     "authority_name": "Zarya of the Dawn; SURYAST; Copyright and Artificial Intelligence, Part 2", "authority_type": "U.S. Copyright Office registration decision, U.S. Copyright Office Review Board decision and U.S. Copyright Office report",
     "authority_reference": "Zarya of the Dawn; SURYAST; Copyright and Artificial Intelligence, Part 2 — Copyrightability",
     "source_url": "https://www.copyright.gov/docs/zarya-of-the-dawn.pdf; https://www.copyright.gov/rulings-filings/review-board/docs/SURYAST.pdf; https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Use Zarya and SURYAST comparatively. Zarya demonstrates protectable human contributions in a mixed AI-assisted work, while SURYAST demonstrates that human involvement may nevertheless be insufficient where the resulting visual expression is generated by AI."},
    {"id": 13, "authority_id": "US-SA-W-13", "jurisdiction": "United States", "work_type": "Written", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Copyright protection may extend to sufficiently original selection, coordination or arrangement of pre-existing or otherwise unprotectable material. The protection extends to the author's original contribution rather than the underlying material itself.",
     "authority_name": "Feist Publications, Inc. v. Rural Telephone Service Co.; 17 U.S.C. §103; Zarya of the Dawn", "authority_type": "U.S. Supreme Court judgment, U.S. statute and U.S. Copyright Office registration decision",
     "authority_reference": "Feist Publications, Inc. v. Rural Telephone Service Co.; 17 U.S.C. §103; Zarya of the Dawn",
     "source_url": "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title17-section103; https://www.copyright.gov/docs/zarya-of-the-dawn.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Assess whether the human selection or arrangement reflects sufficient creative choices. Do not treat mere selection without creativity as automatically protected."},
    {"id": 14, "authority_id": "US-SA-V-14", "jurisdiction": "United States", "work_type": "Visual", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "Human selection, coordination and arrangement of visual material may be protected where the choices contain sufficient creativity. Protection covers the human-authored arrangement rather than unprotectable underlying AI-generated material.",
     "authority_name": "Feist Publications, Inc. v. Rural Telephone Service Co.; 17 U.S.C. §103; Zarya of the Dawn; Copyright and Artificial Intelligence, Part 2", "authority_type": "U.S. Supreme Court judgment, U.S. statute, U.S. Copyright Office registration decision and U.S. Copyright Office report",
     "authority_reference": "Feist Publications, Inc. v. Rural Telephone Service Co.; 17 U.S.C. §103; Zarya of the Dawn; Copyright and Artificial Intelligence, Part 2",
     "source_url": "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title17-section103; https://www.copyright.gov/docs/zarya-of-the-dawn.pdf; https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Do not use SURYAST for this entry merely because it involves visual AI use. The relevant question here is human selection or arrangement."},
    {"id": 15, "authority_id": "US-HM-W-15", "jurisdiction": "United States", "work_type": "Written", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "Copyright in a derivative work extends to the original material contributed by the author and not to pre-existing material. Human edits, adaptations and modifications of AI-generated material may be protected to the extent they contain sufficient human authorship.",
     "authority_name": "17 U.S.C. §103; Copyright and Artificial Intelligence, Part 2; Zarya of the Dawn", "authority_type": "U.S. statute, U.S. Copyright Office report and U.S. Copyright Office registration decision",
     "authority_reference": "17 U.S.C. §103; Copyright and Artificial Intelligence, Part 2 — Copyrightability; Zarya of the Dawn",
     "source_url": "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title17-section103; https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf; https://www.copyright.gov/docs/zarya-of-the-dawn.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Assess the actual human-created modifications. Protection, if any, extends to the human contribution and not automatically to the underlying AI-generated material."},
    {"id": 16, "authority_id": "US-HM-V-16", "jurisdiction": "United States", "work_type": "Visual", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "Human editing, adaptation, enhancement or modification of AI-generated visual material may contribute protectable authorship where the human contribution contains sufficient original expression. Protection extends to the human contribution rather than the underlying AI-generated material.",
     "authority_name": "17 U.S.C. §103; Copyright and Artificial Intelligence, Part 2; Zarya of the Dawn", "authority_type": "U.S. statute, U.S. Copyright Office report and U.S. Copyright Office registration decision",
     "authority_reference": "17 U.S.C. §103; Copyright and Artificial Intelligence, Part 2 — Copyrightability; Zarya of the Dawn",
     "source_url": "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title17-section103; https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf; https://www.copyright.gov/docs/zarya-of-the-dawn.pdf",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Assess whether the modification contains original human expression. Do not use SURYAST as the principal modification authority because that decision concerns the sufficiency of human involvement in generating the image rather than post-generation modification."},
    {"id": 17, "authority_id": "UK-AI-17", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "Under Section 9(3) of the Copyright, Designs and Patents Act 1988, where a literary, dramatic, musical or artistic work is computer-generated in circumstances where there is no human author, the author is deemed to be the person by whom the arrangements necessary for the creation of the work are undertaken. Section 178 defines a computer-generated work.",
     "authority_name": "Copyright, Designs and Patents Act 1988 — Sections 9(3) and 178", "authority_type": "UK statute",
     "authority_reference": "Copyright, Designs and Patents Act 1988, Sections 9(3) and 178",
     "source_url": "https://www.legislation.gov.uk/ukpga/1988/48",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Apply the current statutory computer-generated-work regime where relevant. Do not apply the 2026 proposed reform as current law."},
    {"id": 18, "authority_id": "UK-H-18", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "HUMAN_CONTRIBUTION",
     "rule_statement": "Human-authored works may qualify for copyright protection where they satisfy the applicable originality requirements. UK originality requires the author's own intellectual creation and sufficiently creative choices.",
     "authority_name": "THJ Systems Ltd & Anor v Sheridan & Anor; Copyright and Artificial Intelligence 2026", "authority_type": "England and Wales Court of Appeal judgment and UK Government report",
     "authority_reference": "THJ Systems Ltd & Anor v Sheridan & Anor [2023] EWCA Civ 1354; Report on Copyright and Artificial Intelligence, March 2026",
     "source_url": "https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence/report-on-copyright-and-artificial-intelligence",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Assess the actual human creative choices and expression. The Court of Appeal judgment is a judicial authority; the Government report is a policy/current-law report and should not be treated as equivalent to a court judgment."},
    {"id": 19, "authority_id": "UK-SA-19", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "SELECTION_ARRANGEMENT",
     "rule_statement": "UK copyright may protect original selection or arrangement where the relevant work satisfies the applicable originality requirements. Human selection and arrangement of AI-generated material should therefore be assessed for sufficiently creative human choices.",
     "authority_name": "Copyright, Designs and Patents Act 1988; THJ Systems Ltd & Anor v Sheridan & Anor; Copyright and Artificial Intelligence 2026", "authority_type": "UK statute, England and Wales Court of Appeal judgment and UK Government report",
     "authority_reference": "Copyright, Designs and Patents Act 1988, Sections 1(1)(a), 3 and 4; THJ Systems Ltd & Anor v Sheridan & Anor [2023] EWCA Civ 1354; Report on Copyright and Artificial Intelligence, March 2026",
     "source_url": "https://www.legislation.gov.uk/ukpga/1988/48; https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence/report-on-copyright-and-artificial-intelligence",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Assess the human selection and arrangement itself. Do not assume that the underlying AI-generated material is protected merely because the arrangement is."},
    {"id": 20, "authority_id": "UK-HM-20", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "HUMAN_MODIFICATION",
     "rule_statement": "Human modifications and adaptations may be protected where they contribute sufficient original human expression. The assessment should focus on the human-created expression rather than automatically treating the underlying AI-generated material as protected.",
     "authority_name": "Copyright, Designs and Patents Act 1988; THJ Systems Ltd & Anor v Sheridan & Anor; Copyright and Artificial Intelligence 2026", "authority_type": "UK statute, England and Wales Court of Appeal judgment and UK Government report",
     "authority_reference": "Copyright, Designs and Patents Act 1988, Section 1(1)(a); THJ Systems Ltd & Anor v Sheridan & Anor [2023] EWCA Civ 1354; Report on Copyright and Artificial Intelligence, March 2026",
     "source_url": "https://www.legislation.gov.uk/ukpga/1988/48; https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence/report-on-copyright-and-artificial-intelligence",
     "last_verified": "2026-09-07", "legal_status": "CURRENT_LAW",
     "application_notes": "Assess the originality and expressive nature of the human modification. Do not use Section 9(3) as the substantive rule for human modifications because Section 9(3) concerns computer-generated works where there is no human author."},
    {"id": 21, "authority_id": "UK-REF-CGW-21", "jurisdiction": "United Kingdom", "work_type": "BOTH", "issue": "AI_GENERATED_MATERIAL",
     "rule_statement": "The UK Government proposes removing the specific copyright protection for wholly computer-generated works under Section 9(3) of the Copyright, Designs and Patents Act 1988. This is proposed reform and is not currently law. AI-assisted works containing sufficient human creativity would continue to be assessed under ordinary copyright principles.",
     "authority_name": "Report on Copyright and Artificial Intelligence 2026", "authority_type": "UK Government report / proposed reform",
     "authority_reference": "Report on Copyright and Artificial Intelligence, March 2026, section concerning computer-generated works",
     "source_url": "https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence/report-on-copyright-and-artificial-intelligence",
     "last_verified": "2026-09-08", "legal_status": "PROPOSED_REFORM",
     "application_notes": "DO NOT use this record as the operative legal rule. DO NOT allow it to change the current-law conclusion. Use it only to generate a clearly labelled UK proposed-reform warning where relevant, particularly where the analysis concerns wholly computer-generated material without sufficient human creative contribution. The proposal is not enacted law."},
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
    """Return the matching CURRENT_LAW authority record or None.

    PROPOSED_REFORM and HISTORICAL records can never be returned here —
    only CURRENT_LAW authorities may serve as operative legal rules.
    """
    for a in AUTHORITIES:
        if a.get("legal_status") != "CURRENT_LAW":
            continue
        if a["jurisdiction"] != jurisdiction:
            continue
        if a["issue"] != issue:
            continue
        if a["work_type"] == "BOTH" or a["work_type"] == work_type:
            return a
    return None


def get_reform_authorities(jurisdiction: str, issue: str):
    """Return PROPOSED_REFORM records for a jurisdiction+issue (warning branch only)."""
    return [
        a for a in AUTHORITIES
        if a.get("legal_status") == "PROPOSED_REFORM"
        and a["jurisdiction"] == jurisdiction
        and a["issue"] == issue
    ]


# Deterministic claim position matrix by (issue, jurisdiction, certainty) — current law only.
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
    if a.get("legal_status") == "CURRENT_LAW"
]
