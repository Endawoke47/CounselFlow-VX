"""Vendor/Outsourcing Management API Routes"""
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_vendors():
    return {"vendors": [], "message": "Vendor management ready"}
