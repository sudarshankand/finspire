from pathlib import Path
from datetime import datetime, timedelta

from backend.utils.update_companies import update_companies

COMPANIES_CSV = Path("data/companies.csv")


def ensure_company_data():
    if not COMPANIES_CSV.exists():
        print("companies.csv missing. Downloading...")
        update_companies()
        return

    modified = datetime.fromtimestamp(
        COMPANIES_CSV.stat().st_mtime
    )

    age = datetime.now() - modified

    if age > timedelta(hours=24):
        print("companies.csv outdated. Updating...")
        update_companies()

    else:
        print("companies.csv already up to date.")
