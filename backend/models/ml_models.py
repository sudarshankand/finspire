from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

_vader = None
_finbert = None


def _load_finbert_pipeline():
    try:
        from transformers import pipeline

        return pipeline(
            "text-classification",
            model="ProsusAI/finbert",
            top_k=None,
            truncation=True
        )

    except Exception:
        return None


def get_vader():
    global _vader

    if _vader is None:
        _vader = SentimentIntensityAnalyzer()

    return _vader


def get_finbert():
    global _finbert

    if _finbert is None:
        _finbert = _load_finbert_pipeline()

    return _finbert
