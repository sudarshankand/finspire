from backend.utils.config import IST

from email.utils import parsedate_to_datetime
from datetime import timezone

import hashlib


def to_ist_iso(pub_str: str) -> str:
    try:
        dt = parsedate_to_datetime(pub_str)

        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)

        return dt.astimezone(IST).isoformat()

    except Exception:
        return ""


def row_uid(
    title: str,
    link: str
) -> str:

    t = (title or "").strip()
    l = (link or "").strip()

    return hashlib.sha256(
        f"{t}|{l}".encode("utf-8")
    ).hexdigest()
