from backend.utils.company_loader import clean_name, generate_aliases
from api.company_service import search_companies
from backend.services.fetch_service import build_query


def test_clean_name_removes_ltd():
    assert "Ltd" not in clean_name("Tata Consultancy Services Ltd")


def test_clean_name_removes_limited():
    assert "Limited" not in clean_name("Infosys Limited")


def test_clean_name_strips_whitespace():
    result = clean_name("Reliance Industries Ltd")
    assert result == result.strip()


def test_generate_aliases_includes_symbol():
    aliases = generate_aliases("TCS", "Tata Consultancy Services Ltd")
    assert "TCS" in aliases


def test_generate_aliases_includes_full_name():
    aliases = generate_aliases("INFY", "Infosys Limited")
    assert "Infosys Limited" in aliases


def test_generate_aliases_no_duplicates():
    aliases = generate_aliases("TCS", "TCS")
    assert len(aliases) == len(set(aliases))


def test_build_query_quotes_multi_word():
    query = build_query(["Tata Consultancy Services", "TCS"])
    assert '"Tata Consultancy Services"' in query


def test_build_query_no_quotes_single_word():
    query = build_query(["TCS"])
    assert query == "TCS"
