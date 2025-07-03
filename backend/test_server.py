#!/usr/bin/env python3
"""Simple server test"""

from fastapi import FastAPI
import uvicorn

app = FastAPI(title="CounselFlow Test")

@app.get("/")
def root():
    return {"message": "CounselFlow is running!"}

@app.get("/health")
def health():
    return {"status": "healthy", "service": "CounselFlow"}

if __name__ == "__main__":
    print("🚀 Starting CounselFlow Test Server...")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
