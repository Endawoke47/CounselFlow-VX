"""
CounselFlow API - Simplified Working Version
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="CounselFlow Legal Support",
    description="Professional legal support system",
    version="1.0.0",
    docs_url="/docs",  # Standard docs URL
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "CounselFlow Legal Support", "status": "running", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy", "service": "counselflow-api"}

@app.get("/api/health")
def api_health():
    return {"status": "healthy", "api": "v1"}

# Basic analytics endpoint
@app.get("/api/v1/analytics/dashboard")
def get_dashboard_analytics():
    return {
        "realtime": {"active_cases": 24, "active_users": 8, "system_load": 45},
        "trends": [{"date": "2025-07-01", "cases": 24, "revenue": 125000}],
        "risk": {"score": 85, "level": "low", "factors": ["regulatory", "financial"]}
    }

# Basic contracts endpoint
@app.get("/api/v1/contracts")
def get_contracts():
    return {
        "contracts": [
            {"id": "1", "title": "Service Agreement", "status": "active", "value": 50000},
            {"id": "2", "title": "NDA", "status": "pending", "value": 0}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
