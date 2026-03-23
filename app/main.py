from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="CodePilot Test App", version="0.1.0")

# In-memory store
items: dict[int, dict] = {}
_next_id = 1


class ItemCreate(BaseModel):
    name: str
    description: str = ""


class Item(BaseModel):
    id: int
    name: str
    description: str


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/items", response_model=list[Item])
async def list_items():
    return list(items.values())


@app.post("/items", response_model=Item, status_code=201)
async def create_item(payload: ItemCreate):
    global _next_id
    item = {"id": _next_id, "name": payload.name, "description": payload.description}
    items[_next_id] = item
    _next_id += 1
    return item


@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]
