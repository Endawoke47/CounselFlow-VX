"""
User Management Routes for CounselFlow Legal Support
Enhanced with privilege validation and comprehensive user operations
"""

from fastapi import APIRouter, Depends, HTTPException, status, Request, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import logging

from app.core.database import get_db
from app.core.auth import get_current_user, require_security_clearance
from app.core.security import AuditLogger, SecurityLevel
from app.models import User, UserRole
from app.schemas.auth import UserResponse, UserUpdate, UserCreate

logger = logging.getLogger("counselflow.users")
audit_logger = AuditLogger()

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=List[UserResponse])
async def list_users(
    request: Request,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    role: Optional[str] = Query(None),
    is_active: Optional[bool] = Query(None),
    current_user: User = Depends(require_security_clearance(SecurityLevel.STANDARD)),
    db: Session = Depends(get_db)
):
    """
    List users with filtering and pagination
    Requires standard security clearance
    """
    try:
        query = db.query(User)
        
        # Apply filters
        if role:
            query = query.filter(User.role == role)
        if is_active is not None:
            query = query.filter(User.is_active == is_active)
        
        # Apply pagination
        users = query.offset(skip).limit(limit).all()
        
        # Log user list access
        await audit_logger.log_data_access({
            "event_type": "user_list_accessed",
            "accessed_by": current_user.id,
            "ip_address": request.client.host,
            "filters": {"role": role, "is_active": is_active},
            "count": len(users),
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return [
            UserResponse(
                id=user.id,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                role=user.role,
                is_active=user.is_active,
                created_at=user.created_at,
                updated_at=user.updated_at,
                last_login_at=user.last_login_at,
                mfa_enabled=user.mfa_enabled
            )
            for user in users
        ]
        
    except Exception as e:
        logger.error(f"Error listing users: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve users"
        )


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: str,
    request: Request,
    current_user: User = Depends(require_security_clearance(SecurityLevel.STANDARD)),
    db: Session = Depends(get_db)
):
    """
    Get user by ID
    Requires standard security clearance
    """
    try:
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Log user access
        await audit_logger.log_data_access({
            "event_type": "user_accessed",
            "user_id": user_id,
            "accessed_by": current_user.id,
            "ip_address": request.client.host,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return UserResponse(
            id=user.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            role=user.role,
            is_active=user.is_active,
            created_at=user.created_at,
            updated_at=user.updated_at,
            last_login_at=user.last_login_at,
            mfa_enabled=user.mfa_enabled
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve user"
        )


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    request: Request,
    current_user: User = Depends(require_security_clearance(SecurityLevel.ELEVATED)),
    db: Session = Depends(get_db)
):
    """
    Update user information
    Requires enhanced security clearance
    """
    try:
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Update user fields
        update_data = user_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            if hasattr(user, field):
                setattr(user, field, value)
        
        user.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(user)
        
        # Log user update
        await audit_logger.log_data_change({
            "event_type": "user_updated",
            "user_id": user_id,
            "updated_by": current_user.id,
            "changes": update_data,
            "ip_address": request.client.host,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return UserResponse(
            id=user.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            role=user.role,
            is_active=user.is_active,
            created_at=user.created_at,
            updated_at=user.updated_at,
            last_login_at=user.last_login_at,
            mfa_enabled=user.mfa_enabled
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user"
        )


@router.post("/{user_id}/deactivate")
async def deactivate_user(
    user_id: str,
    request: Request,
    current_user: User = Depends(require_security_clearance(SecurityLevel.MILITARY_GRADE)),
    db: Session = Depends(get_db)
):
    """
    Deactivate user account
    Requires military-grade security clearance
    """
    try:
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        if user.id == current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot deactivate your own account"
            )
        
        user.is_active = False
        user.updated_at = datetime.utcnow()
        db.commit()
        
        # Log user deactivation
        await audit_logger.log_security_event({
            "event_type": "user_deactivated",
            "user_id": user_id,
            "deactivated_by": current_user.id,
            "ip_address": request.client.host,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return {"message": "User deactivated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deactivating user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to deactivate user"
        )


@router.post("/{user_id}/activate")
async def activate_user(
    user_id: str,
    request: Request,
    current_user: User = Depends(require_security_clearance(SecurityLevel.MILITARY_GRADE)),
    db: Session = Depends(get_db)
):
    """
    Activate user account
    Requires military-grade security clearance
    """
    try:
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user.is_active = True
        user.updated_at = datetime.utcnow()
        db.commit()
        
        # Log user activation
        await audit_logger.log_security_event({
            "event_type": "user_activated",
            "user_id": user_id,
            "activated_by": current_user.id,
            "ip_address": request.client.host,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return {"message": "User activated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error activating user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to activate user"
        )
