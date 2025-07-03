"""Policy Management API Routes"""
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_policies():
    return {"policies": [], "message": "Policy management ready"}
