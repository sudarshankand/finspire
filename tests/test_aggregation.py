import pandas as pd
from backend.services.aggregation_service import compute_aggregates


def _make_df(rows):
    return pd.DataFrame(rows, columns=["symbol", "title", "score_fused"])


def test_aggregates_mean_score():
    df = _make_df([
        ("TCS", "headline A", 0.4),
        ("TCS", "headline B", 0.6),
    ])
    agg = compute_aggregates(df)
    row = agg[agg["symbol"] == "TCS"].iloc[0]
    assert abs(row["mean_score"] - 0.5) < 1e-9


def test_aggregates_count():
    df = _make_df([
        ("INFY", "h1", 0.1),
        ("INFY", "h2", -0.2),
        ("INFY", "h3", 0.3),
    ])
    agg = compute_aggregates(df)
    assert agg[agg["symbol"] == "INFY"].iloc[0]["n"] == 3


def test_aggregates_multiple_symbols():
    df = _make_df([
        ("TCS",  "h1", 0.5),
        ("INFY", "h2", -0.3),
    ])
    agg = compute_aggregates(df)
    assert len(agg) == 2


def test_aggregates_sorted_descending():
    df = _make_df([
        ("TCS",  "h1", -0.5),
        ("INFY", "h2",  0.5),
    ])
    agg = compute_aggregates(df)
    assert agg.iloc[0]["symbol"] == "INFY"
