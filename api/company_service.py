import pandas as pd


COMPANIES_CSV = "data/companies.csv"

_df_cache = None


def get_dataframe():

    global _df_cache

    if _df_cache is None:

        df = pd.read_csv(COMPANIES_CSV)

        df = df.fillna("")

        df["symbol"] = df["symbol"].astype(str)
        df["name"] = df["name"].astype(str)

        _df_cache = df

    return _df_cache


def search_companies(query: str, limit: int = 15):

    df = get_dataframe()

    query = query.lower().strip()

    if not query:
        return []

    mask = (
        df["symbol"].str.lower().str.contains(query) |
        df["name"].str.lower().str.contains(query)
    )

    filtered = df[mask].head(limit)

    companies = []

    for _, row in filtered.iterrows():

        companies.append({
            "symbol": row["symbol"],
            "name": row["name"],
        })

    return companies
