from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from backend.services.sentiment_service import (
    score_vader,
    finbert_scores_batch,
    label_for_score,
)


def test_score_vader_positive():
    analyzer = SentimentIntensityAnalyzer()
    score = score_vader("Fantastic record profits! Huge growth!", analyzer)
    assert score > 0


def test_score_vader_negative():
    analyzer = SentimentIntensityAnalyzer()
    score = score_vader("Terrible crash, massive losses, bankruptcy fears", analyzer)
    assert score < 0


def test_score_vader_empty():
    analyzer = SentimentIntensityAnalyzer()
    assert score_vader("", analyzer) == 0.0


def test_label_for_score():
    assert label_for_score(0.2, 0.15, -0.15) == "Positive"
    assert label_for_score(-0.2, 0.15, -0.15) == "Negative"
    assert label_for_score(0.0, 0.15, -0.15) == "Neutral"


def test_finbert_scores_batch_with_mock(fake_finbert):
    texts = ["TCS beats estimates", "Market crash feared"]
    scores = finbert_scores_batch(texts, fake_finbert)
    assert len(scores) == 2
    # mock always returns positive → p_pos - p_neg = 0.8 - 0.1 = 0.7
    assert all(s is not None for s in scores)
    assert all(abs(s) <= 1.0 for s in scores)


def test_finbert_scores_batch_none_pipeline():
    scores = finbert_scores_batch(["some text"], None)
    assert scores == [None]


def test_finbert_scores_batch_empty_texts(fake_finbert):
    assert finbert_scores_batch([], fake_finbert) == []
