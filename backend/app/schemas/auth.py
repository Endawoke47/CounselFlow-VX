"""
Pydantic schemas for authentication and user management
Enhanced with security validation and comprehensive data models
"""

from pydantic import BaseModel, EmailStr, validator, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    """User role enumeration"""
    ADMIN = "admin"
    PARTNER = "partner"
    ASSOCIATE = "associate"
    PARALEGAL = "paralegal"
    CLIENT = "client"
    VIEWER = "viewer"


class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    role: UserRole = UserRole.ASSOCIATE


class UserCreate(UserBase):
    """User creation schema with password validation"""
    password: str = Field(..., min_length=8, max_length=128)
    confirm_password: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v
    
    @validator('password')
    def validate_password_strength(cls, v):
        """Enhanced password validation"""
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one digit')
        
        if not any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in v):
            raise ValueError('Password must contain at least one special character')
        
        return v


class UserLogin(BaseModel):
    """User login schema"""
    email: EmailStr
    password: str
    mfa_token: Optional[str] = None


class UserResponse(UserBase):
    """User response schema (excluding sensitive data)"""
    id: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_login_at: Optional[datetime] = None
    mfa_enabled: bool = False
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    """JWT token response schema"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class TokenData(BaseModel):
    """Token payload data"""
    email: Optional[str] = None
    user_id: Optional[str] = None
    role: Optional[str] = None


class MFASetup(BaseModel):
    """MFA setup response schema"""
    secret_key: str
    qr_code_url: str
    backup_codes: list[str]


class MFAVerification(BaseModel):
    """MFA verification schema"""
    token: str = Field(..., min_length=6, max_length=6)


class PasswordChange(BaseModel):
    """Password change schema"""
    current_password: str
    new_password: str = Field(..., min_length=8, max_length=128)
    confirm_new_password: str
    
    @validator('confirm_new_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'new_password' in values and v != values['new_password']:
            raise ValueError('New passwords do not match')
        return v
    
    @validator('new_password')
    def validate_password_strength(cls, v):
        """Enhanced password validation"""
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one digit')
        
        if not any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in v):
            raise ValueError('Password must contain at least one special character')
        
        return v


class PasswordReset(BaseModel):
    """Password reset request schema"""
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    """Password reset confirmation schema"""
    token: str
    new_password: str = Field(..., min_length=8, max_length=128)
    confirm_new_password: str
    
    @validator('confirm_new_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'new_password' in values and v != values['new_password']:
            raise ValueError('Passwords do not match')
        return v


class UserUpdate(BaseModel):
    """User update schema"""
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    role: Optional[UserRole] = None


class SecurityEvent(BaseModel):
    """Security event schema for audit logging"""
    event_type: str
    user_id: Optional[str] = None
    email: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    timestamp: datetime


class APIResponse(BaseModel):
    """Standard API response schema"""
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None
    errors: Optional[list[str]] = None
