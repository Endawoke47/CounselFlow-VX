"""Dispute Resolution API Routes"""
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_disputes():
    return {"disputes": [], "message": "Dispute resolution ready"}
