"""
Minimal CounselFlow API for debugging
"""

from fastapi import FastAPI

# Initialize FastAPI app
app = FastAPI(
    title="CounselFlow Legal Support - Debug Mode",
    description="Debug version to isolate import issues",
    version="1.0.0-debug"
)

@app.get("/")
def root():
    return {"message": "CounselFlow Debug Server Running"}

@app.get("/health")
def health():
    return {"status": "ok", "timestamp": "2025-07-01"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
