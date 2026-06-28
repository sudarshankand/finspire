import subprocess
import time
import webbrowser
from pathlib import Path


ROOT = Path(__file__).parent.resolve()

PYTHON = ROOT / "venv" / "Scripts" / "python.exe"

FRONTEND = ROOT / "frontend"


# Start FastAPI backend

backend_command = (
    f'"{PYTHON}" -m uvicorn api.main:app --reload'
)

subprocess.Popen(
    f'start cmd /k {backend_command}',
    cwd=ROOT,
    shell=True
)


# Wait for backend startup

time.sleep(2)


# Start React frontend

subprocess.Popen(
    'start cmd /k "npm run dev"',
    cwd=FRONTEND,
    shell=True
)


# Open browser automatically

time.sleep(3)

webbrowser.open(
    "http://localhost:5173"
)


print("\nFINSPIRE environment started.\n")
