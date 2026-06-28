from backend.models.ml_models import (
    get_vader,
    get_finbert,
)

from backend.services.fetch_service import (
    fetch_headlines_for_symbol
)

from backend.services.sentiment_service import (
    score_vader,
    finbert_scores_batch,
)

from backend.utils.company_loader import (
    generate_aliases
)

from backend.utils.config import (
    W_F,
    W_V,
)


def label_for_score(score: float):

    if score >= 0.15:
        return "Positive"

    if score <= -0.15:
        return "Negative"

    return "Neutral"


def analyze_companies(companies, mode="regular"):

    vader = get_vader()

    finbert = get_finbert()

    LIMITS = {
        "fast": 15,
        "regular": 25,
        "deep": 50
    }

    headline_limit = LIMITS.get(
        mode,
        25
    )

    results = []

    for company in companies:

        symbol = company["symbol"]

        name = company["name"]

        aliases = generate_aliases(
            symbol,
            name
        )

        headlines = fetch_headlines_for_symbol(
            symbol=symbol,
            aliases=aliases,
            limit=headline_limit,
            polite_sleep=0.2
        )

        titles = [
            h["title"]
            for h in headlines
        ]

        finbert_scores = finbert_scores_batch(
            titles,
            finbert
        )

        analyzed_headlines = []

        fused_scores = []

        for headline, finbert_score in zip(
            headlines,
            finbert_scores
        ):

            vader_score = score_vader(
                headline["title"],
                vader
            )

            if finbert_score is None:

                fused = vader_score

            else:

                fused = (
                    W_F * finbert_score +
                    W_V * vader_score
                )

            label = label_for_score(fused)

            fused_scores.append(fused)

            analyzed_headlines.append({
                "title": headline["title"],
                "link": headline["link"],
                "source": headline["source"],
                "published_dt": headline["published_dt"],

                "score": round(fused, 3),

                "label": label,
            })

        overall_score = (
            sum(fused_scores) / len(fused_scores)
            if fused_scores else 0
        )

        overall_label = label_for_score(
            overall_score
        )

        results.append({
            "symbol": symbol,

            "name": name,

            "score": round(overall_score, 3),

            "label": overall_label,

            "headline_count": len(headlines),

            "headlines": analyzed_headlines,
        })

    return results
