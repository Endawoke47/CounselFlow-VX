"""Task Management API Routes"""
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_tasks():
    return {"tasks": [], "message": "Task management ready"}
