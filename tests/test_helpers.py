from backend.utils.helpers import row_uid, to_ist_iso


def test_row_uid_deterministic():
    uid1 = row_uid("TCS profits rise", "https://example.com/1")
    uid2 = row_uid("TCS profits rise", "https://example.com/1")
    assert uid1 == uid2


def test_row_uid_unique():
    uid1 = row_uid("Title A", "https://example.com/1")
    uid2 = row_uid("Title B", "https://example.com/2")
    assert uid1 != uid2


def test_row_uid_empty_strings():
    uid = row_uid("", "")
    assert isinstance(uid, str) and len(uid) == 64


def test_to_ist_iso_valid():
    rfc_date = "Mon, 01 Jan 2024 12:00:00 +0000"
    result = to_ist_iso(rfc_date)
    assert "2024" in result
    assert "+05:30" in result


def test_to_ist_iso_invalid():
    assert to_ist_iso("not-a-date") == ""
    assert to_ist_iso("") == ""
