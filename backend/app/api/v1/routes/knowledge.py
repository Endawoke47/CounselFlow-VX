"""Knowledge Management API Routes"""
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_knowledge():
    return {"documents": [], "message": "Knowledge management ready"}
