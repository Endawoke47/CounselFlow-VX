"""Regulatory Compliance API Routes"""
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_compliance():
    return {"frameworks": [], "message": "Compliance management ready"}
