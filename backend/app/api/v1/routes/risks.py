"""Risk Management API Routes"""
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_risks():
    return {"risks": [], "message": "Risk management ready"}
