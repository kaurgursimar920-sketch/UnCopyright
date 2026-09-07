"""Pre-populated Sarah sample analysis (Section 39 of spec)."""

SARAH_WORK_ID = "demo-sarah-visual-artwork"

SARAH_WORK = {
    "id": SARAH_WORK_ID,
    "work_type": "Visual",
    "title": "Sarah's Neon Archivist — Cover Artwork",
    "description": "A single-canvas illustration developed through iterative human sketching, AI generation, human selection, and manual repainting.",
    "is_demo": True,
}

SARAH_EVENTS = [
    {
        "creation_event_id": "EV-01",
        "sequence": 1,
        "description": "Sarah drafts an initial pencil sketch establishing composition and pose.",
        "actor": "HUMAN",
        "timestamp": "2026-01-14T10:02:00Z",
        "certainty": "KNOWN",
        "source_files": ["Sketch_01.png"],
        "issues": ["HUMAN_CONTRIBUTION"],
    },
    {
        "creation_event_id": "EV-02",
        "sequence": 2,
        "description": "AI image model generates five stylistic alternatives from Sarah's textual prompt.",
        "actor": "AI",
        "timestamp": "2026-01-14T10:17:00Z",
        "certainty": "KNOWN",
        "source_files": ["AI_Output_01.png", "AI_Output_02.png", "AI_Output_03.png", "AI_Output_04.png", "AI_Output_05.png"],
        "issues": ["AI_GENERATED_MATERIAL"],
    },
    {
        "creation_event_id": "EV-03",
        "sequence": 3,
        "description": "Sarah reviews five outputs and selects Output #3 as the working base.",
        "actor": "HUMAN",
        "timestamp": "2026-01-14T10:23:00Z",
        "certainty": "KNOWN",
        "source_files": ["AI_Output_03.png"],
        "issues": ["SELECTION_ARRANGEMENT"],
    },
    {
        "creation_event_id": "EV-04",
        "sequence": 4,
        "description": "Sarah manually repaints the face — reworking expression, lighting and features.",
        "actor": "HUMAN",
        "timestamp": "2026-01-14T10:31:00Z",
        "certainty": "KNOWN",
        "source_files": ["Repaint_face_before.png", "Repaint_face_after.png"],
        "issues": ["HUMAN_MODIFICATION", "HUMAN_CONTRIBUTION"],
    },
    {
        "creation_event_id": "EV-05",
        "sequence": 5,
        "description": "Sarah rearranges background objects and finalises the composition.",
        "actor": "HUMAN",
        "timestamp": "2026-01-14T10:48:00Z",
        "certainty": "KNOWN",
        "source_files": ["Final_artwork.png"],
        "issues": ["SELECTION_ARRANGEMENT", "HUMAN_MODIFICATION"],
    },
]

SARAH_FILES = [
    {"file_id": "f-01", "file_name": "Sketch_01.png", "file_type": "human_draft", "stage": "initial_sketch",
     "timestamp": "2026-01-14T10:02:00Z", "description": "Sarah's initial pencil sketch."},
    {"file_id": "f-02", "file_name": "AI_Output_03.png", "file_type": "ai_output", "stage": "ai_alternative",
     "timestamp": "2026-01-14T10:17:00Z", "description": "Selected AI output from a set of five."},
    {"file_id": "f-03", "file_name": "Repaint_face_before.png", "file_type": "intermediate", "stage": "pre_edit",
     "timestamp": "2026-01-14T10:31:00Z", "description": "State prior to manual repainting."},
    {"file_id": "f-04", "file_name": "Repaint_face_after.png", "file_type": "intermediate", "stage": "post_edit",
     "timestamp": "2026-01-14T10:32:00Z", "description": "Face fully repainted by Sarah."},
    {"file_id": "f-05", "file_name": "Final_artwork.png", "file_type": "final_work", "stage": "final",
     "timestamp": "2026-01-14T10:48:00Z", "description": "The final illustration."},
]
