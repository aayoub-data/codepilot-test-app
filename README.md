# codepilot-test-app

A simple FastAPI application used as a test target for the CodePilot autonomous coding agent.

## Setup

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Tests

```bash
pytest tests/ -v
```
