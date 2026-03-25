"""
Integration directory API router.

Provides a static, searchable catalog of available integrations.
"""
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

from app.integrations.directory_manifest import INTEGRATION_DIRECTORY

router = APIRouter()


# ---------------------------------------------------------------------------
# Pydantic schemas
# ---------------------------------------------------------------------------


class IntegrationEntry(BaseModel):
    id: str
    name: str
    description: str
    logo_url: str
    category: str
    docs_url: str


class IntegrationDirectoryResponse(BaseModel):
    integrations: list[IntegrationEntry]
    source: str
    total: int


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@router.get(
    "/integrations/directory",
    response_model=IntegrationDirectoryResponse,
    summary="List integration directory",
    description=(
        "Returns the static integration directory. "
        "Optionally filter by `category` (exact match) or `search` "
        "(case-insensitive substring match against name and description). "
        "Always returns HTTP 200."
    ),
    tags=["integrations"],
)
def list_integration_directory(
    search: Optional[str] = None,
    category: Optional[str] = None,
) -> IntegrationDirectoryResponse:
    results: list[dict] = list(INTEGRATION_DIRECTORY)

    if category is not None:
        results = [e for e in results if e["category"] == category]

    if search is not None:
        term = search.lower()
        results = [
            e
            for e in results
            if term in e["name"].lower() or term in e["description"].lower()
        ]

    return IntegrationDirectoryResponse(
        integrations=[IntegrationEntry(**e) for e in results],
        source="static",
        total=len(results),
    )
