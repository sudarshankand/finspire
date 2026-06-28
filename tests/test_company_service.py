import pandas as pd
import pytest
import api.company_service as cs


@pytest.fixture(autouse=True)
def reset_cache():
    """Clear in-module DF cache between tests."""
    cs._df_cache = None
    yield
    cs._df_cache = None


def test_search_returns_matches(sample_companies_df, monkeypatch):
    monkeypatch.setattr(cs, "_df_cache", sample_companies_df)
    results = search_companies("TCS")
    assert any(r["symbol"] == "TCS" for r in results)


def test_search_case_insensitive(sample_companies_df, monkeypatch):
    monkeypatch.setattr(cs, "_df_cache", sample_companies_df)
    results = search_companies("tcs")
    assert any(r["symbol"] == "TCS" for r in results)


def test_search_by_name(sample_companies_df, monkeypatch):
    monkeypatch.setattr(cs, "_df_cache", sample_companies_df)
    results = search_companies("infosys")
    assert any(r["symbol"] == "INFY" for r in results)


def test_search_empty_query(sample_companies_df, monkeypatch):
    monkeypatch.setattr(cs, "_df_cache", sample_companies_df)
    assert search_companies("") == []


def test_search_no_match(sample_companies_df, monkeypatch):
    monkeypatch.setattr(cs, "_df_cache", sample_companies_df)
    assert search_companies("ZZZNOMATCH") == []


def test_search_result_schema(sample_companies_df, monkeypatch):
    monkeypatch.setattr(cs, "_df_cache", sample_companies_df)
    results = search_companies("TCS")
    assert all("symbol" in r and "name" in r for r in results)
