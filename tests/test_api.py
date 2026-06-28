import pandas as pd
import pytest
from fastapi.testclient import TestClient

import api.company_service as cs
from backend.startup import ensure_company_data


@pytest.fixture(scope="module")
def client():
    # Patch company data so startup doesn't hit the network
    import api.company_service as _cs
    _cs._df_cache = pd.DataFrame({
        "symbol": ["TCS"],
        "name":   ["Tata Consultancy Services Ltd"],
    })
    from api.main import app
    with TestClient(app) as c:
        yield c
    _cs._df_cache = None


def test_root(client):
    resp = client.get("/")
    assert resp.status_code == 200
    assert "message" in resp.json()


def test_health(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert "finbert_loaded" in data


def test_companies_empty_query(client):
    resp = client.get("/companies", params={"q": ""})
    assert resp.status_code == 200
    assert resp.json() == []


def test_companies_search(client):
    resp = client.get("/companies", params={"q": "TCS"})
    assert resp.status_code == 200
    results = resp.json()
    assert any(r["symbol"] == "TCS" for r in results)
