from fastapi import APIRouter
from pydantic import BaseModel, Field, StrictInt

from app.services.understanding_level_store import (
    MAX_UNDERSTANDING_LEVEL,
    MIN_UNDERSTANDING_LEVEL,
    UnderstandingLevelStore,
)

router = APIRouter(prefix="/api/preferences", tags=["preferences"])
understanding_levels = UnderstandingLevelStore()


class UnderstandingLevelUpdate(BaseModel):
    value: StrictInt = Field(
        ge=MIN_UNDERSTANDING_LEVEL,
        le=MAX_UNDERSTANDING_LEVEL,
    )


@router.get("/understanding-level")
def get_understanding_level() -> dict[str, int | None]:
    return {"value": understanding_levels.get()}


@router.put("/understanding-level")
def update_understanding_level(payload: UnderstandingLevelUpdate) -> dict[str, int]:
    return {"value": understanding_levels.set(payload.value)}
