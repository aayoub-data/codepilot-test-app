import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app, items


@pytest.fixture(autouse=True)
def reset_store():
    """Clear in-memory store between tests."""
    items.clear()
    import app.main as m
    m._next_id = 1
    yield
    items.clear()


@pytest.mark.anyio
async def test_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


@pytest.mark.anyio
async def test_create_and_get_item():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.post("/items", json={"name": "Widget", "description": "A test widget"})
        assert resp.status_code == 201
        data = resp.json()
        assert data["name"] == "Widget"
        assert data["id"] == 1

        resp = await ac.get(f"/items/{data['id']}")
        assert resp.status_code == 200
        assert resp.json()["name"] == "Widget"


@pytest.mark.anyio
async def test_list_items():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        await ac.post("/items", json={"name": "A"})
        await ac.post("/items", json={"name": "B"})
        resp = await ac.get("/items")
        assert resp.status_code == 200
        assert len(resp.json()) == 2


@pytest.mark.anyio
async def test_item_not_found():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.get("/items/999")
        assert resp.status_code == 404
