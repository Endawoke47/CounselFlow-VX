"""
CounselFlow Security Middleware
Integrates military-grade security into FastAPI request/response cycle
"""

from fastapi import Request, Response, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Callable, Optional, Dict, Any
import json
import time
import logging
from datetime import datetime

from app.core.security import (
    ClientPrivilegeProtector,
    EncryptionManager,
    AuditLogger,
    SecurityLevel,
    PrivilegeLevel,
    SecurityContext
)
from app.core.auth import verify_token, get_current_user
from app.core.config import settings

security_logger = logging.getLogger("counselflow.security.middleware")

class SecurityMiddleware(BaseHTTPMiddleware):
    """
    Comprehensive security middleware implementing:
    - Client privilege protection
    - Automatic encryption/decryption
    - Audit logging
    - Request validation
    - Rate limiting
    """
    
    def __init__(self, app, privilege_protector: ClientPrivilegeProtector = None):
        super().__init__(app)
        self.privilege_protector = privilege_protector or ClientPrivilegeProtector()
        self.encryption_manager = EncryptionManager()
        self.audit_logger = AuditLogger()
        
        # Rate limiting storage
        self.request_counts: Dict[str, Dict[str, int]] = {}
        
        # Sensitive endpoints requiring enhanced security
        self.protected_endpoints = {
            "/api/v1/matters",
            "/api/v1/contracts", 
            "/api/v1/disputes",
            "/api/v1/compliance",
            "/api/v1/ai-agents"
        }
        
        # Public endpoints that don't require authentication
        self.public_endpoints = {
            "/api/docs",
            "/api/redoc",
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/health"
        }
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Main middleware processing logic"""
        
        start_time = time.time()
        client_ip = self._get_client_ip(request)
        
        try:
            # 1. Rate limiting check
            if not self._check_rate_limit(client_ip):
                await self._log_security_event(
                    "rate_limit_exceeded",
                    {"client_ip": client_ip, "path": str(request.url.path)}
                )
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Rate limit exceeded"}
                )
            
            # 2. Skip security for public endpoints
            if any(request.url.path.startswith(endpoint) for endpoint in self.public_endpoints):
                response = await call_next(request)
                return response
            
            # 3. Extract and validate authentication
            auth_context = await self._extract_auth_context(request)
            if not auth_context:
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Authentication required"}
                )
            
            # 4. Create security context for protected endpoints
            security_context = None
            if any(request.url.path.startswith(endpoint) for endpoint in self.protected_endpoints):
                security_context = await self._create_security_context(request, auth_context)
                
                # Add security context to request state
                request.state.security_context = security_context
            
            # 5. Decrypt request body if encrypted
            await self._decrypt_request(request, security_context)
            
            # 6. Process request
            response = await call_next(request)
            
            # 7. Encrypt sensitive response data
            if security_context:
                response = await self._encrypt_response(response, security_context)
            
            # 8. Log security audit trail
            await self._log_audit_event(request, response, auth_context, start_time)
            
            return response
            
        except Exception as e:
            security_logger.error(f"Security middleware error: {str(e)}")
            await self._log_security_event(
                "middleware_error",
                {"error": str(e), "client_ip": client_ip, "path": str(request.url.path)}
            )
            return JSONResponse(
                status_code=500,
                content={"detail": "Internal security error"}
            )
    
    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP address from request"""
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "unknown"
    
    def _check_rate_limit(self, client_ip: str) -> bool:
        """Implement rate limiting per client IP"""
        current_minute = int(time.time() // 60)
        
        if client_ip not in self.request_counts:
            self.request_counts[client_ip] = {}
        
        # Clean old entries
        self.request_counts[client_ip] = {
            minute: count for minute, count in self.request_counts[client_ip].items()
            if minute >= current_minute - 5  # Keep last 5 minutes
        }
        
        # Check current minute
        current_count = self.request_counts[client_ip].get(current_minute, 0)
        if current_count >= settings.RATE_LIMIT_PER_MINUTE:
            return False
        
        # Increment counter
        self.request_counts[client_ip][current_minute] = current_count + 1
        return True
    
    async def _extract_auth_context(self, request: Request) -> Optional[Dict[str, Any]]:
        """Extract and validate authentication context"""
        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return None
            
            token = auth_header.split(" ")[1]
            user_data = verify_token(token)
            
            return {
                "user_id": user_data.get("user_id"),
                "email": user_data.get("email"),
                "roles": user_data.get("roles", []),
                "client_access": user_data.get("client_access", [])
            }
            
        except Exception as e:
            security_logger.warning(f"Authentication extraction failed: {str(e)}")
            return None
    
    async def _create_security_context(
        self, 
        request: Request, 
        auth_context: Dict[str, Any]
    ) -> SecurityContext:
        """Create security context for client privilege protection"""
        
        # Extract client_id from request (URL param, body, or default)
        client_id = self._extract_client_id(request, auth_context)
        
        # Determine security and privilege levels
        security_level = self._determine_security_level(request.url.path)
        privilege_level = self._determine_privilege_level(request.url.path, auth_context)
        
        # Create protected context
        context = self.privilege_protector.create_client_context(
            user_id=auth_context["user_id"],
            client_id=client_id,
            security_level=security_level
        )
        
        context.privilege_level = privilege_level
        
        return context
    
    def _extract_client_id(self, request: Request, auth_context: Dict[str, Any]) -> str:
        """Extract client ID from request context"""
        # Try URL parameters first
        client_id = request.query_params.get("client_id")
        if client_id:
            return client_id
        
        # Try path parameters
        path_parts = request.url.path.split("/")
        if "clients" in path_parts:
            try:
                idx = path_parts.index("clients")
                if idx + 1 < len(path_parts):
                    return path_parts[idx + 1]
            except (ValueError, IndexError):
                pass
        
        # Default to first accessible client
        client_access = auth_context.get("client_access", [])
        return client_access[0] if client_access else "default"
    
    def _determine_security_level(self, path: str) -> SecurityLevel:
        """Determine required security level based on endpoint"""
        if any(sensitive in path for sensitive in ["/disputes", "/compliance", "/ai-agents"]):
            return SecurityLevel.MILITARY_GRADE
        elif any(elevated in path for elevated in ["/contracts", "/matters"]):
            return SecurityLevel.ELEVATED
        return SecurityLevel.STANDARD
    
    def _determine_privilege_level(self, path: str, auth_context: Dict[str, Any]) -> PrivilegeLevel:
        """Determine privilege level required for endpoint"""
        roles = auth_context.get("roles", [])
        
        if "attorney" in roles:
            if any(ac in path for ac in ["/disputes", "/matters"]):
                return PrivilegeLevel.ATTORNEY_CLIENT
            elif "/contracts" in path:
                return PrivilegeLevel.WORK_PRODUCT
        
        if any(conf in path for conf in ["/compliance", "/policies"]):
            return PrivilegeLevel.CONFIDENTIAL
        
        return PrivilegeLevel.PUBLIC
    
    async def _decrypt_request(self, request: Request, security_context: Optional[SecurityContext]):
        """Decrypt request body if encrypted"""
        if not security_context:
            return
        
        # Check for encrypted content header
        if request.headers.get("X-Encrypted") == "true":
            try:
                body = await request.body()
                if body:
                    decrypted_data = self.encryption_manager.decrypt_data(
                        body, security_context.client_id
                    )
                    # Replace request body (this is complex in FastAPI, simplified here)
                    request._body = decrypted_data
                    
            except Exception as e:
                security_logger.error(f"Request decryption failed: {str(e)}")
                raise HTTPException(status_code=400, detail="Invalid encrypted data")
    
    async def _encrypt_response(
        self, 
        response: Response, 
        security_context: SecurityContext
    ) -> Response:
        """Encrypt sensitive response data"""
        try:
            # Only encrypt JSON responses containing sensitive data
            if (response.headers.get("content-type", "").startswith("application/json") and
                security_context.privilege_level in [PrivilegeLevel.ATTORNEY_CLIENT, PrivilegeLevel.WORK_PRODUCT]):
                
                # Get response body
                response_body = getattr(response, 'body', None)
                if response_body:
                    encrypted_data = self.encryption_manager.encrypt_data(
                        response_body, security_context.client_id
                    )
                    
                    # Create new encrypted response
                    encrypted_response = Response(
                        content=encrypted_data,
                        status_code=response.status_code,
                        headers=dict(response.headers)
                    )
                    encrypted_response.headers["X-Encrypted"] = "true"
                    return encrypted_response
            
            return response
            
        except Exception as e:
            security_logger.error(f"Response encryption failed: {str(e)}")
            return response
    
    async def _log_audit_event(
        self, 
        request: Request, 
        response: Response, 
        auth_context: Optional[Dict[str, Any]], 
        start_time: float
    ):
        """Log comprehensive audit trail"""
        try:
            audit_data = {
                "timestamp": datetime.utcnow().isoformat(),
                "user_id": auth_context.get("user_id") if auth_context else None,
                "method": request.method,
                "path": str(request.url.path),
                "query_params": dict(request.query_params),
                "status_code": response.status_code,
                "response_time_ms": round((time.time() - start_time) * 1000, 2),
                "client_ip": self._get_client_ip(request),
                "user_agent": request.headers.get("User-Agent"),
                "security_context": getattr(request.state, 'security_context', None) is not None
            }
            
            await self.audit_logger.log_access(audit_data)
            
        except Exception as e:
            security_logger.error(f"Audit logging failed: {str(e)}")
    
    async def _log_security_event(self, event_type: str, data: Dict[str, Any]):
        """Log security-related events"""
        try:
            security_event = {
                "timestamp": datetime.utcnow().isoformat(),
                "event_type": event_type,
                "severity": "HIGH",
                "data": data
            }
            
            await self.audit_logger.log_security_event(security_event)
            
        except Exception as e:
            security_logger.error(f"Security event logging failed: {str(e)}")


class PrivilegeValidationMiddleware(BaseHTTPMiddleware):
    """
    Additional middleware for attorney-client privilege validation
    Ensures proper client access controls
    """
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Validate client access privileges"""
        
        # Skip for public endpoints
        if any(request.url.path.startswith(endpoint) for endpoint in ["/api/docs", "/health"]):
            return await call_next(request)
        
        # Get security context from previous middleware
        security_context = getattr(request.state, 'security_context', None)
        
        if security_context:
            # Validate client access
            if not self._validate_client_access(request, security_context):
                return JSONResponse(
                    status_code=403,
                    content={"detail": "Access denied: Client privilege violation"}
                )
        
        return await call_next(request)
    
    def _validate_client_access(self, request: Request, security_context: SecurityContext) -> bool:
        """Validate user has access to specific client data"""
        # This would integrate with your user permission system
        # For now, return True (implement based on your auth system)
        return True
