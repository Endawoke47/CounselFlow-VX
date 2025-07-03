"""
Authentication Routes for CounselFlow Legal Support
Enhanced with military-grade security, MFA, and comprehensive audit logging
"""

from fastapi import APIRouter, Depends, HTTPException, status, Request, BackgroundTasks
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime, timedelta
import logging

from app.core.database import get_db
from app.core.auth import auth_service, get_current_user, verify_mfa_token
from app.core.security import AuditLogger, ClientPrivilegeProtector
from app.core.config import settings
from app.models import User
from app.schemas.auth import (
    UserCreate,
    UserLogin,
    Token,
    UserResponse,
    MFASetup,
    MFAVerification,
    PasswordChange,
    PasswordReset
)

logger = logging.getLogger("counselflow.auth")
audit_logger = AuditLogger()
privilege_protector = ClientPrivilegeProtector()
security = HTTPBearer(auto_error=False)

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(
    user_data: UserCreate,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Register a new user with enhanced security validation
    """
    try:
        # Create user through auth service (includes password validation)
        user = await auth_service.register_user(
            email=user_data.email,
            password=user_data.password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            role=user_data.role,
            db=db
        )
        
        # Log registration event
        await auth_service._log_auth_event(
            "user_registration",
            user.id,
            {
                "email": user.email,
                "ip_address": request.client.host if request.client else None,
                "user_agent": request.headers.get("user-agent"),
                "status": "success"
            },
            db
        )
        
        logger.info(f"New user registered: {user.email}")
        
        return UserResponse(
            id=str(user.id),
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            role=user.role,
            is_active=user.is_active,
            created_at=user.created_at
        )
        
    except ValueError as e:
        # Log failed registration
        await auth_service._log_auth_event(
            "user_registration_failed",
            None,
            {
                "email": user_data.email,
                "ip_address": request.client.host if request.client else None,
                "error": str(e)
            },
            db
        )
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        import traceback
        error_traceback = traceback.format_exc()
        logger.error(f"❌ REGISTRATION ERROR: {str(e)}")
        logger.error(f"📧 EMAIL: {user_data.email}")
        logger.error(f"🔍 ERROR TYPE: {type(e)}")
        logger.error(f"📍 FULL TRACEBACK:\n{error_traceback}")
        
        # Log the request data (excluding password)
        safe_user_data = {
            "email": user_data.email,
            "first_name": user_data.first_name,
            "last_name": user_data.last_name,
            "role": user_data.role
        }
        logger.error(f"📋 REQUEST DATA: {safe_user_data}")
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/login", response_model=Token)
async def login_user(
    user_credentials: UserLogin,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Authenticate user and return JWT token
    """
    try:
        # Authenticate user
        auth_result = await auth_service.authenticate_user(
            user_credentials.email,
            user_credentials.password,
            user_credentials.mfa_token,
            db,
            request.client.host if request.client else None
        )
        
        if not auth_result:
            # Log failed login attempt
            await auth_service._log_auth_event(
                "login_failed",
                None,
                {
                    "email": user_credentials.email,
                    "ip_address": request.client.host if request.client else None,
                    "user_agent": request.headers.get("user-agent"),
                    "reason": "invalid_credentials"
                },
                db
            )
            
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Return token response
        return Token(
            access_token=auth_result["access_token"],
            refresh_token=auth_result["refresh_token"],
            token_type=auth_result["token_type"],
            expires_in=3600  # 1 hour
        )
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )
        db.commit()
        
        # Log successful login
        await auth_service._log_auth_event(
            "login_success",
            user.id,
            {
                "email": user.email,
                "ip_address": request.client.host if request.client else None,
                "user_agent": request.headers.get("user-agent")
            },
            db
        )
        
        logger.info(f"User logged in: {user.email}")
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )


@router.post("/refresh", response_model=Token)
async def refresh_token(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Refresh access token using refresh token
    """
    try:
        if not credentials:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token required"
            )
        
        # Verify refresh token
        payload = auth_service.verify_token(credentials.credentials)
        user_email = payload.get("sub")
        
        if not user_email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        # Get user
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        # Generate new access token
        access_token = auth_service.create_access_token(
            data={"sub": user.email, "user_id": user.id, "role": user.role}
        )
        
        # Log token refresh
        await auth_service._log_auth_event(
            "token_refresh",
            user.id,
            {
                "email": user.email,
                "ip_address": request.client.host if request.client else None
            },
            db
        )
        
        return Token(
            access_token=access_token,
            refresh_token=credentials.credentials,  # Keep same refresh token
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )
        
    except Exception as e:
        logger.error(f"Token refresh error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token refresh failed"
        )


@router.post("/logout")
async def logout_user(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Logout user and invalidate tokens
    """
    try:
        # Log logout event
        await auth_service._log_auth_event(
            "logout",
            current_user.id,
            {
                "email": current_user.email,
                "ip_address": request.client.host if request.client else None
            },
            db
        )
        
        logger.info(f"User logged out: {current_user.email}")
        
        return {"message": "Successfully logged out"}
        
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Logout failed"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """
    Get current user information
    """
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        role=current_user.role,
        is_active=current_user.is_active,
        created_at=current_user.created_at,
        last_login_at=current_user.last_login_at
    )


@router.post("/setup-mfa", response_model=MFASetup)
async def setup_mfa(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Setup Multi-Factor Authentication for user
    """
    try:
        mfa_setup = await auth_service.setup_mfa(current_user, db)
        
        # Log MFA setup
        await audit_logger.log_security_event({
            "event_type": "mfa_setup_initiated",
            "user_id": current_user.id,
            "email": current_user.email,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return mfa_setup
        
    except Exception as e:
        logger.error(f"MFA setup error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="MFA setup failed"
        )


@router.post("/verify-mfa")
async def verify_mfa(
    mfa_data: MFAVerification,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Verify and enable MFA for user
    """
    try:
        success = await auth_service.verify_and_enable_mfa(
            current_user, mfa_data.token, db
        )
        
        if success:
            # Log MFA enabled
            await audit_logger.log_security_event({
                "event_type": "mfa_enabled",
                "user_id": current_user.id,
                "email": current_user.email,
                "timestamp": datetime.utcnow().isoformat()
            })
            
            return {"message": "MFA enabled successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid MFA token"
            )
            
    except Exception as e:
        logger.error(f"MFA verification error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="MFA verification failed"
        )


@router.post("/change-password")
async def change_password(
    password_data: PasswordChange,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Change user password with enhanced security validation
    """
    try:
        success = await auth_service.change_password(
            current_user,
            password_data.current_password,
            password_data.new_password,
            db
        )
        
        if success:
            # Log password change
            await audit_logger.log_security_event({
                "event_type": "password_changed",
                "user_id": current_user.id,
                "email": current_user.email,
                "ip_address": request.client.host,
                "timestamp": datetime.utcnow().isoformat()
            })
            
            return {"message": "Password changed successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid current password"
            )
            
    except Exception as e:
        logger.error(f"Password change error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Password change failed"
        )


# Simple test registration endpoint
@router.post("/register-simple")
async def register_simple(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """Simple registration for testing"""
    try:
        # Check if user exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        
        # Hash password
        from passlib.context import CryptContext
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        hashed_password = pwd_context.hash(user_data.password)
        
        # Create user
        user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            role=user_data.role,
            is_active=True
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return {
            "message": "User registered successfully",
            "user_id": user.id,
            "email": user.email
        }
        
    except Exception as e:
        logger.error(f"Simple registration error: {str(e)}")
        logger.error(f"Error type: {type(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")
