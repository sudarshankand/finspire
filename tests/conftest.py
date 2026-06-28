import pandas as pd
import pytest


@pytest.fixture()
def sample_companies_df():
    return pd.DataFrame({
        "symbol": ["TCS", "INFY", "RELIANCE"],
        "name":   ["Tata Consultancy Services Ltd", "Infosys Limited", "Reliance Industries Ltd"],
    })


@pytest.fixture()
def fake_finbert():
    """Returns a mock FinBERT pipeline that assigns positive to anything."""
    def _pipeline(texts, truncation=True):
        return [
            [
                {"label": "positive", "score": 0.8},
                {"label": "negative", "score": 0.1},
                {"label": "neutral",  "score": 0.1},
            ]
            for _ in texts
        ]
    return _pipeline
