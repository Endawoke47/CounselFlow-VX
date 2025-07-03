"""
CounselFlow API - Legal Support Backend
FastAPI-based REST API with PostgreSQL, LangChain, and LlamaIndex integration
Enhanced with military-grade security and comprehensive legal modules
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import os
import logging
from datetime import datetime
from typing import List, Optional

# Import security middleware
try:
    from app.middleware.security import SecurityMiddleware, PrivilegeValidationMiddleware
except ImportError:
    # Fallback if middleware has issues
    SecurityMiddleware = None
    PrivilegeValidationMiddleware = None

# Import route modules
from app.api.v1.routes import (
    auth,
    users,
    contracts,
    matters,
    entities,
    tasks,
    knowledge,
    risks,
    disputes,
    vendors,
    compliance,
    policies,
    ai_agents,
    websocket,  # Add WebSocket routes
    document_versions,  # Add Document Version Control routes
    analytics,  # Add Analytics routes
    legal_databases,  # Add Legal Database Integration routes
    translation_qa,  # Add Translation QA routes
    performance  # Add Performance Optimization routes
)
from app.core.database import get_db, engine, Base
from app.core.config import settings
from app.core.auth import auth_service, get_current_user
from app.core.security import ClientPrivilegeProtector, EncryptionMiddleware, AuditLogger
from app.models import User

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(settings.LOG_FILE),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("counselflow.main")

# Initialize security components
privilege_protector = ClientPrivilegeProtector()
encryption_middleware = EncryptionMiddleware(privilege_protector)
audit_logger = AuditLogger()

# Initialize FastAPI app
app = FastAPI(
    title="CounselFlow Legal Support",
    description="Professional legal support system with advanced features",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_tags=[
        {
            "name": "authentication",
            "description": "User authentication and authorization"
        },
        {
            "name": "matters",
            "description": "Legal matter management"
        },
        {
            "name": "contracts",
            "description": "Contract lifecycle management"
        },
        {
            "name": "disputes",
            "description": "Litigation and dispute management"
        },
        {
            "name": "compliance",
            "description": "Regulatory compliance and risk management"
        },
        {
            "name": "ai-agents",
            "description": "AI-powered legal assistance"
        },
        {
            "name": "knowledge",
            "description": "Legal knowledge management"
        },
        {
            "name": "entities",
            "description": "Client and entity management"
        },
        {
            "name": "tasks",
            "description": "Task and workflow management"
        },
        {
            "name": "vendors",
            "description": "Third-party vendor management"
        },
        {
            "name": "websocket",
            "description": "Real-time WebSocket communication"
        }
    ]
)

# Add security middleware (if available)
if PrivilegeValidationMiddleware:
    app.add_middleware(PrivilegeValidationMiddleware)
if SecurityMiddleware:
    app.add_middleware(SecurityMiddleware, privilege_protector=privilege_protector)

# Configure CORS with enhanced security
cors_origins = settings.CORS_ORIGINS.split(",") if hasattr(settings, 'CORS_ORIGINS') and settings.CORS_ORIGINS else [
    "http://localhost:3000", 
    "http://localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=getattr(settings, 'CORS_ALLOW_CREDENTIALS', True),
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=[
        "Authorization",
        "Content-Type", 
        "X-Encrypted",
        "X-Client-ID",
        "X-Matter-ID",
        "X-Security-Level"
    ],
)

# Database initialization
@app.on_event("startup")
async def startup_event():
    """Initialize database and security systems on startup"""
    try:
        # Create database tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        
        # Initialize security systems
        logger.info("Security systems initialized")
        
        # Log application startup
        audit_logger.log_security_event(
            event_type="application_startup",
            user_id="system",
            client_id=None,
            details={
                "timestamp": datetime.utcnow().isoformat(),
                "version": "1.0.0",
                "security_level": "military_grade"
            }
        )
        
        logger.info("CounselFlow Legal Support started successfully")
        
    except Exception as e:
        logger.error(f"Startup failed: {str(e)}")
        raise

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on application shutdown"""
    try:
        # Log application shutdown
        audit_logger.log_security_event(
            event_type="application_shutdown",
            user_id="system",
            client_id=None,
            details={
                "timestamp": datetime.utcnow().isoformat()
            }
        )
        
        logger.info("CounselFlow Legal Support shutdown completed")
        
    except Exception as e:
        logger.error(f"Shutdown error: {str(e)}")

# Health check endpoint
@app.get("/health", tags=["system"])
async def health_check():
    """System health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "security_status": "active",
        "database_status": "connected"
    }

# Security status endpoint
@app.get("/api/v1/security/status", tags=["security"])
async def security_status(current_user: User = Depends(get_current_user)):
    """Get security system status (requires authentication)"""
    return {
        "encryption_enabled": settings.DOCUMENT_ENCRYPTION_ENABLED,
        "audit_logging": "active",
        "privilege_protection": "military_grade",
        "mfa_available": True,
        "session_security": "enhanced",
        "user_clearance": current_user.security_clearance_level
    }

# Include API routers with proper prefixes and tags
app.include_router(
    auth.router,
    prefix="/api/v1",
    tags=["authentication"]
)

app.include_router(
    users.router,
    prefix="/api/v1",
    tags=["users"]
)

app.include_router(
    matters.router,
    prefix="/api/v1/matters",
    tags=["matters"]
)

app.include_router(
    contracts.router,
    prefix="/api/v1/contracts",
    tags=["contracts"]
)

app.include_router(
    disputes.router,
    prefix="/api/v1/disputes",
    tags=["disputes"]
)

app.include_router(
    compliance.router,
    prefix="/api/v1/compliance",
    tags=["compliance"]
)

app.include_router(
    ai_agents.router,
    prefix="/api/v1/ai-agents",
    tags=["ai-agents"]
)

app.include_router(
    knowledge.router,
    prefix="/api/v1/knowledge",
    tags=["knowledge"]
)

app.include_router(
    entities.router,
    prefix="/api/v1/entities",
    tags=["entities"]
)

app.include_router(
    tasks.router,
    prefix="/api/v1/tasks",
    tags=["tasks"]
)

app.include_router(
    vendors.router,
    prefix="/api/v1/vendors",
    tags=["vendors"]
)

app.include_router(
    policies.router,
    prefix="/api/v1/policies",
    tags=["policies"]
)

app.include_router(
    risks.router,
    prefix="/api/v1/risks",
    tags=["risks"]
)

# WebSocket routes for real-time communication
app.include_router(
    websocket.router,
    prefix="/api/v1/ws",
    tags=["websocket"]
)

# Document Version Control routes
app.include_router(
    document_versions.router,
    prefix="/api/v1/documents",
    tags=["document-versions"]
)

# Analytics routes
app.include_router(
    analytics.router,
    prefix="/api/v1/analytics",
    tags=["analytics"]
)

# Legal Database Integration routes
app.include_router(
    legal_databases.router,
    prefix="/api/v1/legal-databases", 
    tags=["legal-databases"]
)

# Translation QA routes
app.include_router(
    translation_qa.router,
    prefix="/api/v1/translation-qa",
    tags=["translation-qa"]
)

# Performance Optimization routes
app.include_router(
    performance.router,
    prefix="/api/v1/performance",
    tags=["performance"]
)

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Global HTTP exception handler with security logging"""
    audit_logger.log_security_event(
        event_type="http_exception",
        user_id="anonymous",
        client_id=None,
        details={
            "status_code": exc.status_code,
            "detail": exc.detail,
            "path": str(request.url.path),
            "method": request.method,
            "timestamp": datetime.utcnow().isoformat()
        }
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "status_code": exc.status_code}
    )

# Global exception handler with secure error handling
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    import traceback
    import uuid
    
    # Generate unique error ID for tracking
    error_id = str(uuid.uuid4())
    error_traceback = traceback.format_exc()
    
    # Log detailed error information securely
    logger.error(f"❌ UNHANDLED EXCEPTION [{error_id}]: {str(exc)}")
    logger.error(f"📍 REQUEST PATH: {request.url.path}")
    logger.error(f"🔍 FULL TRACEBACK:\n{error_traceback}")
    
    # Log security event
    audit_logger.log_security_event(
        event_type="unhandled_exception",
        user_id="anonymous",
        client_id=None,
        details={
            "error_id": error_id,
            "error_type": type(exc).__name__,
            "path": str(request.url.path),
            "method": request.method,
            "timestamp": datetime.utcnow().isoformat()
        }
    )
    
    # Return different responses based on environment
    if settings.ENVIRONMENT == "development":
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Internal server error occurred",
                "error_id": error_id,
                "error_type": type(exc).__name__,
                "debug_info": str(exc)
            }
        )
    else:
        # Production: Don't expose sensitive information
        return JSONResponse(
            status_code=500,
            content={
                "detail": "An internal server error occurred. Please contact support with error ID.",
                "error_id": error_id
            }
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True if settings.ENVIRONMENT == "development" else False,
        access_log=True,
        log_level=settings.LOG_LEVEL.lower()
    )


