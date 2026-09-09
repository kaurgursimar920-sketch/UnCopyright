"""UnCopyright backend API tests."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://uncopyright-ai.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"
DEMO_ID = "demo-sarah-visual-artwork"


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# Health
def test_root(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"
    assert data.get("service") == "UnCopyright"


# Reference data
def test_authorities(s):
    r = s.get(f"{API}/reference/authorities")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list) and len(data) == 21
    statuses = {a["legal_status"] for a in data}
    assert "CURRENT_LAW" in statuses and "PROPOSED_REFORM" in statuses
    assert all("authority_id" in a and "rule_statement" in a for a in data)


def test_issues(s):
    r = s.get(f"{API}/reference/issues")
    assert r.status_code == 200
    assert len(r.json()) == 4


def test_jurisdictions(s):
    r = s.get(f"{API}/reference/jurisdictions")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 3
    names = {j["name"] for j in data}
    assert names == {"India", "United States", "United Kingdom"}


def test_analysis_rules(s):
    r = s.get(f"{API}/reference/analysis-rules")
    assert r.status_code == 200
    assert len(r.json()) == 20


# Sarah demo
def test_demo_sarah(s):
    r = s.get(f"{API}/demo/sarah")
    assert r.status_code == 200
    data = r.json()
    assert data["work"]["id"] == DEMO_ID
    assert len(data["events"]) == 8
    assert len(data["files"]) == 9


def test_get_work_demo(s):
    r = s.get(f"{API}/works/{DEMO_ID}")
    assert r.status_code == 200
    data = r.json()
    assert data["work"]["id"] == DEMO_ID
    assert len(data["events"]) == 8


# Works CRUD
def test_create_work(s):
    r = s.post(f"{API}/works", json={"work_type": "Visual", "title": "TEST_Work"})
    assert r.status_code == 200
    data = r.json()
    assert "id" in data
    assert data["work_type"] == "Visual"
    assert data["title"] == "TEST_Work"
    # verify persistence
    r2 = s.get(f"{API}/works/{data['id']}")
    assert r2.status_code == 200
    assert r2.json()["work"]["id"] == data["id"]


def test_create_work_invalid_type(s):
    r = s.post(f"{API}/works", json={"work_type": "Audio"})
    assert r.status_code == 400


# Analysis on demo
def test_analyze_demo_39_results(s):
    r = s.post(f"{API}/works/{DEMO_ID}/analyze",
               json={"jurisdictions": ["India", "United States", "United Kingdom"]})
    assert r.status_code == 200
    data = r.json()
    assert len(data["results"]) == 39
    # jurisdictional differentiator on EV-002 (AI_GENERATED_MATERIAL)
    ev02 = [x for x in data["results"] if x["creation_event_id"] == "EV-002"]
    positions = {x["jurisdiction"]: x["claim_position"] for x in ev02}
    assert positions["United States"] == "EXCLUDE"
    assert positions["India"] == "UNCERTAIN"
    assert positions["United Kingdom"] == "POTENTIALLY_CLAIMABLE"
    # claim_map present
    assert isinstance(data.get("claim_map"), list) and len(data["claim_map"]) == 13
    # reform warning present for UK AI material, with exact creator-missing gap on EV-005
    assert len(data.get("reform_warnings", [])) == 1
    ev05 = [x for x in data["results"] if x["creation_event_id"] == "EV-005"]
    assert any("not provided by the creator" in g for x in ev05 for g in x["evidence_gaps"])


def test_analyze_events_flow(s):
    # Create work, set events, analyze
    w = s.post(f"{API}/works", json={"work_type": "Written", "title": "TEST_flow"}).json()
    wid = w["id"]
    events = [{
        "sequence": 1,
        "description": "Human wrote outline",
        "actor": "HUMAN",
        "certainty": "KNOWN",
        "source_files": ["outline.txt"],
        "issues": ["HUMAN_CONTRIBUTION"],
    }]
    r = s.put(f"{API}/works/{wid}/events", json={"events": events})
    assert r.status_code == 200
    assert r.json()["count"] == 1
    r2 = s.post(f"{API}/works/{wid}/analyze",
                json={"jurisdictions": ["India", "United States", "United Kingdom"]})
    assert r2.status_code == 200
    assert len(r2.json()["results"]) == 3


def test_analyze_no_events(s):
    w = s.post(f"{API}/works", json={"work_type": "Visual", "title": "TEST_empty"}).json()
    r = s.post(f"{API}/works/{w['id']}/analyze", json={"jurisdictions": ["India"]})
    assert r.status_code == 400


def test_analyze_invalid_jurisdiction(s):
    r = s.post(f"{API}/works/{DEMO_ID}/analyze", json={"jurisdictions": ["Mars"]})
    assert r.status_code == 400
