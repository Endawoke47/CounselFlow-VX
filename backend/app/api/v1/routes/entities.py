"""Entity Management API Routes"""
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_entities():
    return {"entities": [], "message": "Entity management ready"}
