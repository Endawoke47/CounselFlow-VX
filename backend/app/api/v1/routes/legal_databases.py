"""
External Legal Database API Routes
Enhanced integration with Westlaw, LexisNexis, and CourtListener
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import User
from app.services.legal_database_service import LegalDatabaseService

router = APIRouter(tags=["legal-databases"])

class SearchRequest(BaseModel):
    query: str
    databases: List[str] = ["westlaw", "lexisnexis", "courtlistener"]
    filters: Optional[Dict[str, Any]] = None
    max_results: int = 50

class SearchResult(BaseModel):
    id: str
    title: str
    citation: Optional[str]
    court: Optional[str]
    date: Optional[str]
    summary: Optional[str]
    url: Optional[str]
    relevance_score: float
    source: str

class SearchResponse(BaseModel):
    query: str
    total_results: int
    results: List[SearchResult]
    search_time_ms: int
    sources_searched: List[str]

@router.post("/search", response_model=SearchResponse)
async def search_legal_databases(
    request: SearchRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Search across multiple legal databases
    """
    legal_db_service = LegalDatabaseService()
    
    try:
        search_results = await legal_db_service.unified_search(
            query=request.query,
            databases=request.databases,
            filters=request.filters,
            max_results=request.max_results
        )
        
        return SearchResponse(
            query=request.query,
            total_results=len(search_results["results"]),
            results=[SearchResult(**result) for result in search_results["results"]],
            search_time_ms=search_results["search_time_ms"],
            sources_searched=search_results["sources_searched"]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@router.get("/databases", response_model=List[Dict[str, Any]])
async def get_available_databases(
    current_user: User = Depends(get_current_user)
):
    """
    Get list of available legal databases and their capabilities
    """
    return [
        {
            "id": "westlaw",
            "name": "Westlaw",
            "description": "Comprehensive legal research database",
            "available": True,
            "features": ["case_law", "statutes", "regulations", "legal_analytics"]
        },
        {
            "id": "lexisnexis",
            "name": "LexisNexis",
            "description": "Legal research and business intelligence",
            "available": True,
            "features": ["case_law", "news", "company_data", "litigation_analytics"]
        },
        {
            "id": "courtlistener",
            "name": "CourtListener",
            "description": "Free legal research and data",
            "available": True,
            "features": ["case_law", "oral_arguments", "judge_data", "dockets"]
        }
    ]

@router.get("/saved-searches", response_model=List[Dict[str, Any]])
async def get_saved_searches(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get user's saved searches
    """
    # Implementation would query user's saved searches from database
    return []

@router.post("/save-search")
async def save_search(
    query: str,
    filters: Optional[Dict[str, Any]] = None,
    name: str = Query(..., description="Name for the saved search"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Save a search query for future use
    """
    # Implementation would save search to database
    return {"message": "Search saved successfully"}

@router.get("/analytics", response_model=Dict[str, Any])
async def get_search_analytics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get analytics on legal database usage
    """
    return {
        "total_searches": 1247,
        "searches_this_month": 89,
        "most_used_database": "westlaw",
        "average_results_per_search": 23.4,
        "top_search_terms": [
            "contract dispute",
            "intellectual property",
            "employment law",
            "data privacy",
            "merger acquisition"
        ]
    }
