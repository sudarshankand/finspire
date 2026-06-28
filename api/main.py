from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.company_service import search_companies
from api.sentiment_service import analyze_companies

from backend.startup import ensure_company_data


@asynccontextmanager
async def lifespan(app: FastAPI):
    ensure_company_data()
    yield


app = FastAPI(
    title="FINSPIRE API",
    version="1.0.0",
    lifespan=lifespan
)

# Allow React frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "FINSPIRE API running"
    }


@app.get("/companies")
def get_companies(q: str = ""):
    return search_companies(q)


@app.post("/analyze")
def analyze(data: dict):
    companies = data.get(
        "companies",
        []
    )

    mode = data.get(
        "mode",
        "regular"
    )

    return analyze_companies(
        companies,
        mode
    )
