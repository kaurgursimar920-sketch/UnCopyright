"""UnCopyright backend — rule-based legal analysis engine."""
from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Query, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import requests
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone

from legal_data import (
    AUTHORITIES, ISSUES, JURISDICTIONS, ANALYSIS_RULES,
    find_authority, get_reform_authorities, claim_position, confidence_level,
)
from sarah_demo import SARAH_WORK, SARAH_EVENTS, SARAH_FILES, SARAH_WORK_ID

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="UnCopyright API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("uncopyright")

# ─── Object Storage ──────────────────────────────────────────────────────────
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "uncopyright"
_storage_key: Optional[str] = None


def init_storage(force: bool = False):
    global _storage_key
    if _storage_key and not force:
        return _storage_key
    if not EMERGENT_KEY:
        logger.warning("EMERGENT_LLM_KEY missing; object storage disabled.")
        return None
    try:
        r = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
        r.raise_for_status()
        _storage_key = r.json()["storage_key"]
        return _storage_key
    except Exception as e:
        logger.error(f"Storage init failed: {e}")
        return None


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    if not key:
        raise HTTPException(500, "Object storage not available")
    r = requests.put(f"{STORAGE_URL}/objects/{path}",
                     headers={"X-Storage-Key": key, "Content-Type": content_type},
                     data=data, timeout=120)
    if r.status_code == 404:
        key = init_storage(force=True)
        r = requests.put(f"{STORAGE_URL}/objects/{path}",
                         headers={"X-Storage-Key": key, "Content-Type": content_type},
                         data=data, timeout=120)
    r.raise_for_status()
    return r.json()


def get_object(path: str):
    key = init_storage()
    if not key:
        raise HTTPException(500, "Object storage not available")
    r = requests.get(f"{STORAGE_URL}/objects/{path}",
                     headers={"X-Storage-Key": key}, timeout=60)
    r.raise_for_status()
    return r.content, r.headers.get("Content-Type", "application/octet-stream")


# ─── Models ──────────────────────────────────────────────────────────────────
class WorkCreate(BaseModel):
    work_type: str  # "Written" | "Visual"
    title: Optional[str] = "Untitled Work"


class CreationEvent(BaseModel):
    creation_event_id: Optional[str] = None
    sequence: int
    description: str
    actor: str  # HUMAN | AI | HYBRID
    timestamp: Optional[str] = None
    certainty: str = "KNOWN"  # KNOWN | INFERRED | UNKNOWN
    source_files: List[str] = []
    issues: List[str] = []


class EventsPayload(BaseModel):
    events: List[CreationEvent]


class AnalyzeRequest(BaseModel):
    jurisdictions: List[str]  # e.g. ["India", "United States", "United Kingdom"]


# ─── Health & Reference ──────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"service": "UnCopyright", "status": "ok"}


@api_router.get("/reference/authorities")
async def get_authorities():
    return AUTHORITIES


@api_router.get("/reference/issues")
async def get_issues():
    return ISSUES


@api_router.get("/reference/jurisdictions")
async def get_jurisdictions():
    return JURISDICTIONS


@api_router.get("/reference/analysis-rules")
async def get_analysis_rules():
    return ANALYSIS_RULES


# ─── Works ───────────────────────────────────────────────────────────────────
@api_router.post("/works")
async def create_work(payload: WorkCreate):
    if payload.work_type not in ("Written", "Visual"):
        raise HTTPException(400, "work_type must be Written or Visual")
    work = {
        "id": str(uuid.uuid4()),
        "work_type": payload.work_type,
        "title": payload.title or "Untitled Work",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "is_demo": False,
    }
    await db.works.insert_one({**work})
    return work


@api_router.get("/works/{work_id}")
async def get_work(work_id: str):
    if work_id == SARAH_WORK_ID:
        return {"work": SARAH_WORK, "events": SARAH_EVENTS, "files": SARAH_FILES}
    work = await db.works.find_one({"id": work_id}, {"_id": 0})
    if not work:
        raise HTTPException(404, "Work not found")
    events = await db.creation_events.find({"work_id": work_id}, {"_id": 0}).sort("sequence", 1).to_list(500)
    files = await db.files.find({"work_id": work_id, "is_deleted": False}, {"_id": 0}).to_list(500)
    return {"work": work, "events": events, "files": files}


@api_router.put("/works/{work_id}/events")
async def set_events(work_id: str, payload: EventsPayload):
    work = await db.works.find_one({"id": work_id})
    if not work:
        raise HTTPException(404, "Work not found")
    await db.creation_events.delete_many({"work_id": work_id})
    docs = []
    for ev in payload.events:
        d = ev.model_dump()
        d["creation_event_id"] = d["creation_event_id"] or f"EV-{ev.sequence:02d}"
        d["work_id"] = work_id
        docs.append(d)
    if docs:
        await db.creation_events.insert_many(docs)
    return {"count": len(docs), "events": [{k: v for k, v in d.items() if k != "_id"} for d in docs]}


# ─── File upload ─────────────────────────────────────────────────────────────
@api_router.post("/works/{work_id}/files")
async def upload_file(work_id: str, file: UploadFile = File(...), stage: str = "other", description: str = ""):
    work = await db.works.find_one({"id": work_id})
    if not work:
        raise HTTPException(404, "Work not found")
    ext = file.filename.split(".")[-1] if "." in file.filename else "bin"
    path = f"{APP_NAME}/works/{work_id}/{uuid.uuid4()}.{ext}"
    data = await file.read()
    result = put_object(path, data, file.content_type or "application/octet-stream")
    record = {
        "file_id": str(uuid.uuid4()),
        "work_id": work_id,
        "storage_path": result["path"],
        "file_name": file.filename,
        "content_type": file.content_type,
        "size": result.get("size", len(data)),
        "stage": stage,
        "description": description,
        "is_deleted": False,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    await db.files.insert_one({**record})
    return {k: v for k, v in record.items()}


@api_router.get("/files/download")
async def download_file(path: str = Query(...)):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(404, "File not found")
    data, content_type = get_object(path)
    return Response(content=data, media_type=record.get("content_type") or content_type)


# ─── Analysis Engine ─────────────────────────────────────────────────────────
def _make_facts(event: dict) -> List[str]:
    facts = [event["description"]]
    if event.get("source_files"):
        facts.append(f"Source files on record: {', '.join(event['source_files'])}.")
    certainty = event.get("certainty", "KNOWN")
    if certainty == "INFERRED":
        facts.append("Certainty: INFERRED — this event is a reasonable inference from the record, not directly established.")
    elif certainty == "UNKNOWN":
        facts.append("Certainty: UNKNOWN — the record does not establish this event; it is not treated as an established fact or a definite human contribution.")
    return facts


def _application_text(issue: str, jurisdiction: str, event: dict) -> str:
    actor = event.get("actor", "HUMAN")
    desc = event["description"].rstrip(".").lower()
    if issue == "AI_GENERATED_MATERIAL":
        if jurisdiction == "United States":
            return f"The material produced by the AI system in this event is not treated as human-authored expression. The human input ({desc}) is analysed separately to determine whether any expressive elements were actually determined by the human."
        if jurisdiction == "India":
            return f"Under s.2(d)(vi), the analysis identifies the person who caused the computer-generated work to be created. The record ({desc}) is examined to establish whether the human directed enough of the creative process to qualify."
        return f"Under CDPA 1988 s.9(3), the author of a computer-generated work is the person by whom the arrangements necessary for its creation were undertaken. This event ({desc}) is assessed against that standard."
    if issue == "HUMAN_CONTRIBUTION":
        return f"The human input ({desc}) is examined for originality — whether it originates with the author and reflects at least a minimal degree of creative choice."
    if issue == "SELECTION_ARRANGEMENT":
        return f"The event is assessed as an act of human selection/arrangement. The question is whether the choices made ({desc}) reflect sufficient creativity to be protectable, independently of the underlying material."
    if issue == "HUMAN_MODIFICATION":
        return f"The modification ({desc}) is examined to determine whether the human alterations contain sufficient original expression, distinct from the underlying AI output."
    return "The applicable rule is compared against the facts on record."


def _conclusion_text(issue: str, position: str) -> str:
    if position == "POTENTIALLY_CLAIMABLE":
        return "On the current record, this contribution is potentially claimable as human-authored expression."
    if position == "UNCERTAIN":
        return "The record raises material uncertainty; further evidence or legal review is required before a claim position can be settled."
    return "This element should be excluded from the human-authored copyright claim on the current record."


def _evidence_gaps(event: dict, issue: str) -> List[str]:
    gaps = []
    if event.get("prompt_missing"):
        gaps.append("The original AI prompt and generation details were not provided by the creator.")
    if not event.get("source_files"):
        gaps.append("No source files attached to this event.")
    if event.get("certainty") == "INFERRED":
        gaps.append("Event is INFERRED rather than KNOWN — direct documentation is missing.")
    if issue == "HUMAN_MODIFICATION" and len(event.get("source_files", [])) < 2:
        gaps.append("Before/after artefacts (pre-edit and post-edit) not both on record.")
    if issue == "AI_GENERATED_MATERIAL" and not any("prompt" in (f or "").lower() for f in event.get("source_files", [])):
        gaps.append("The original AI prompt and generation details were not provided by the creator.")
    return gaps


@api_router.post("/works/{work_id}/analyze")
async def analyze(work_id: str, req: AnalyzeRequest):
    # Fetch work and events (support demo)
    if work_id == SARAH_WORK_ID:
        work = SARAH_WORK
        events = SARAH_EVENTS
    else:
        work = await db.works.find_one({"id": work_id}, {"_id": 0})
        if not work:
            raise HTTPException(404, "Work not found")
        events = await db.creation_events.find({"work_id": work_id}, {"_id": 0}).sort("sequence", 1).to_list(500)

    if not events:
        raise HTTPException(400, "No creation events on record; add events before running analysis.")

    valid_j = {j["name"] for j in JURISDICTIONS}
    jurisdictions = [j for j in req.jurisdictions if j in valid_j]
    if not jurisdictions:
        raise HTTPException(400, "Select at least one supported jurisdiction.")

    results = []
    for event in events:
        for issue in event.get("issues", []):
            for jur in jurisdictions:
                authority = find_authority(jur, work["work_type"], issue)
                if not authority:
                    continue
                pos = claim_position(issue, jur, event.get("certainty", "KNOWN"))
                has_ev = bool(event.get("source_files"))
                conf = confidence_level(event.get("certainty", "KNOWN"), has_ev)
                results.append({
                    "analysis_id": str(uuid.uuid4()),
                    "work_id": work_id,
                    "creation_event_id": event["creation_event_id"],
                    "event_sequence": event["sequence"],
                    "event_description": event["description"],
                    "event_actor": event["actor"],
                    "event_certainty": event.get("certainty", "KNOWN"),
                    "jurisdiction": jur,
                    "issue": issue,
                    "authority_id": authority["authority_id"],
                    "authority": authority,
                    "facts": _make_facts(event),
                    "rule": authority["rule_statement"],
                    "application": _application_text(issue, jur, event),
                    "conclusion": _conclusion_text(issue, pos),
                    "claim_position": pos,
                    "supporting_evidence": event.get("source_files", []),
                    "evidence_gaps": _evidence_gaps(event, issue),
                    "confidence": conf,
                })

    # Persist unless demo
    if work_id != SARAH_WORK_ID:
        await db.analysis_results.delete_many({"work_id": work_id})
        if results:
            await db.analysis_results.insert_many([{**r} for r in results])

    # Build claim map: per (event, issue) → { jurisdiction: position }
    claim_map = {}
    for r in results:
        key = f"{r['creation_event_id']}:{r['issue']}"
        claim_map.setdefault(key, {
            "creation_event_id": r["creation_event_id"],
            "event_sequence": r["event_sequence"],
            "event_description": r["event_description"],
            "issue": r["issue"],
            "positions": {},
        })["positions"][r["jurisdiction"]] = r["claim_position"]

    # Separate informational branch: PROPOSED_REFORM warnings never feed the decision path.
    reform_warnings = []
    if "United Kingdom" in jurisdictions and any(
        r["jurisdiction"] == "United Kingdom" and r["issue"] == "AI_GENERATED_MATERIAL" for r in results
    ):
        for ra in get_reform_authorities("United Kingdom", "AI_GENERATED_MATERIAL"):
            reform_warnings.append({
                "jurisdiction": "United Kingdom",
                "authority_id": ra["authority_id"],
                "legal_status": ra["legal_status"],
                "authority_name": ra["authority_name"],
                "authority_reference": ra["authority_reference"],
                "source_url": ra["source_url"],
                "last_verified": ra["last_verified"],
                "message": "The UK Government has proposed removing the specific statutory protection for wholly computer-generated works (CDPA 1988 s.9(3)). This proposal is not currently law and does not alter the current-law assessment above.",
            })

    return {
        "work": work,
        "events": events,
        "jurisdictions": jurisdictions,
        "results": results,
        "claim_map": list(claim_map.values()),
        "reform_warnings": reform_warnings,
    }


@api_router.get("/demo/sarah")
async def demo_sarah():
    return {"work": SARAH_WORK, "events": SARAH_EVENTS, "files": SARAH_FILES}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def _startup():
    try:
        k = init_storage()
        logger.info("Storage init %s", "ok" if k else "skipped")
    except Exception as e:
        logger.error("Startup storage init failed: %s", e)


@app.on_event("shutdown")
async def _shutdown():
    client.close()
