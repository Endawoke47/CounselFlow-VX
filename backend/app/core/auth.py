"""
Enhanced Authentication System for CounselFlow
Military-grade authentication with multi-factor authentication
"""

import jwt
import bcrypt
import secrets
import qrcode
import pyotp
import io
import base64
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError

from app.core.config import settings
from app.core.database import get_db
from app.models import User, UserRole, AuditLog
from app.core.security import ClientPrivilegeProtector, SecurityLevel

security = HTTPBearer()

class AuthenticationError(Exception):
    """Custom authentication exception"""
    pass

class AuthenticationService:
    """
    Comprehensive authentication service with military-grade security
    """
    
    def __init__(self):
        self.secret_key = settings.SECRET_KEY
        self.algorithm = "HS256"
        self.access_token_expire_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
        self.refresh_token_expire_days = 7
        self.privilege_protector = ClientPrivilegeProtector()
    
    def hash_password(self, password: str) -> str:
        """Hash password using bcrypt with salt"""
        salt = bcrypt.gensalt(rounds=12)
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify password against hash"""
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    
    def create_access_token(self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        
        to_encode.update({
            "exp": expire,
            "iat": datetime.utcnow(),
            "type": "access",
            "jti": secrets.token_urlsafe(32)  # JWT ID for token blacklisting
        })
        
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
    
    def create_refresh_token(self, user_id: str) -> str:
        """Create JWT refresh token"""
        to_encode = {
            "user_id": user_id,
            "exp": datetime.utcnow() + timedelta(days=self.refresh_token_expire_days),
            "iat": datetime.utcnow(),
            "type": "refresh",
            "jti": secrets.token_urlsafe(32)
        }
        
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
    
    def verify_token(self, token: str) -> Dict[str, Any]:
        """Verify and decode JWT token"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            
            # Check token type
            if payload.get("type") != "access":
                raise AuthenticationError("Invalid token type")
            
            # Check expiration
            if datetime.utcnow() > datetime.fromtimestamp(payload.get("exp", 0)):
                raise AuthenticationError("Token expired")
            
            return payload
            
        except jwt.InvalidTokenError as e:
            raise AuthenticationError(f"Invalid token: {str(e)}")
    
    def generate_mfa_secret(self) -> str:
        """Generate MFA secret for TOTP"""
        return pyotp.random_base32()
    
    def generate_mfa_qr_code(self, user_email: str, secret: str) -> str:
        """Generate QR code for MFA setup"""
        totp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
            name=user_email,
            issuer_name="CounselFlow Legal Support"
        )
        
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(totp_uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        
        return base64.b64encode(buffered.getvalue()).decode()
    
    def verify_mfa_code(self, secret: str, code: str) -> bool:
        """Verify MFA TOTP code"""
        totp = pyotp.TOTP(secret)
        return totp.verify(code, valid_window=1)  # Allow 30-second window
    
    async def register_user(
        self, 
        email: str, 
        password: str, 
        first_name: str, 
        last_name: str,
        role: UserRole,
        db: Session,
        firm_id: Optional[str] = None
    ) -> User:
        """Register new user with validation"""
        
        # Validate email (allow local domains for testing)
        try:
            valid = validate_email(email, check_deliverability=False)
            email = valid.email
        except EmailNotValidError:
            raise AuthenticationError("Invalid email format")
        
        # Check if user exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            raise AuthenticationError("User already exists")
        
        # Validate password strength
        if not self._validate_password_strength(password):
            raise AuthenticationError("Password does not meet security requirements")
        
        # Create user
        hashed_password = self.hash_password(password)
        
        user = User(
            email=email,
            hashed_password=hashed_password,
            first_name=first_name,
            last_name=last_name,
            role=role.value,
            firm_id=firm_id,
            security_clearance_level="standard"
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Log registration
        await self._log_auth_event(
            "user_registered",
            user.id,
            {"email": email, "role": role.value},
            db
        )
        
        return user
    
    async def authenticate_user(
        self, 
        email: str, 
        password: str, 
        mfa_code: Optional[str],
        db: Session,
        ip_address: Optional[str] = None
    ) -> Dict[str, Any]:
        """Authenticate user with optional MFA"""
        
        # Get user
        user = db.query(User).filter(User.email == email).first()
        if not user:
            await self._log_auth_event(
                "login_failed",
                None,
                {"email": email, "reason": "user_not_found", "ip": ip_address},
                db
            )
            raise AuthenticationError("Invalid credentials")
        
        # Check if user is active
        if not user.is_active:
            await self._log_auth_event(
                "login_failed",
                str(user.id),
                {"email": email, "reason": "account_disabled", "ip": ip_address},
                db
            )
            raise AuthenticationError("Account disabled")
        
        # Verify password
        if not self.verify_password(password, user.hashed_password):
            await self._log_auth_event(
                "login_failed",
                str(user.id),
                {"email": email, "reason": "invalid_password", "ip": ip_address},
                db
            )
            raise AuthenticationError("Invalid credentials")
        
        # Check MFA if enabled
        if user.mfa_enabled:
            if not mfa_code:
                raise AuthenticationError("MFA code required")
            
            # This would retrieve the user's MFA secret from secure storage
            # For now, we'll assume it's stored in user metadata
            mfa_secret = user.metadata.get("mfa_secret") if user.metadata else None
            if not mfa_secret or not self.verify_mfa_code(mfa_secret, mfa_code):
                await self._log_auth_event(
                    "login_failed",
                    str(user.id),
                    {"email": email, "reason": "invalid_mfa", "ip": ip_address},
                    db
                )
                raise AuthenticationError("Invalid MFA code")
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
        
        # Generate tokens
        access_token_data = {
            "user_id": str(user.id),
            "email": user.email,
            "role": user.role,
            "security_clearance": user.security_clearance_level,
            "firm_id": str(user.firm_id) if user.firm_id else None
        }
        
        access_token = self.create_access_token(access_token_data)
        refresh_token = self.create_refresh_token(str(user.id))
        
        # Log successful login
        await self._log_auth_event(
            "login_success",
            str(user.id),
            {"email": email, "ip": ip_address},
            db
        )
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "id": str(user.id),
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role,
                "firm_id": str(user.firm_id) if user.firm_id else None
            }
        }
    
    async def refresh_access_token(self, refresh_token: str, db: Session) -> str:
        """Generate new access token from refresh token"""
        try:
            payload = jwt.decode(refresh_token, self.secret_key, algorithms=[self.algorithm])
            
            if payload.get("type") != "refresh":
                raise AuthenticationError("Invalid token type")
            
            user_id = payload.get("user_id")
            user = db.query(User).filter(User.id == user_id).first()
            
            if not user or not user.is_active:
                raise AuthenticationError("User not found or inactive")
            
            # Create new access token
            access_token_data = {
                "user_id": str(user.id),
                "email": user.email,
                "role": user.role,
                "security_clearance": user.security_clearance_level,
                "firm_id": str(user.firm_id) if user.firm_id else None
            }
            
            return self.create_access_token(access_token_data)
            
        except jwt.InvalidTokenError:
            raise AuthenticationError("Invalid refresh token")
    
    async def setup_mfa(self, user: User, db: Session) -> Dict[str, Any]:
        """Setup MFA for user and return QR code"""
        try:
            # Generate secret key for TOTP
            secret_key = pyotp.random_base32()
            
            # Create TOTP object
            totp = pyotp.TOTP(secret_key)
            
            # Generate QR code URL
            provisioning_uri = totp.provisioning_uri(
                name=user.email,
                issuer_name="CounselFlow Legal Support"
            )
            
            # Generate QR code
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(provisioning_uri)
            qr.make(fit=True)
            
            img = qr.make_image(fill_color="black", back_color="white")
            img_buffer = io.BytesIO()
            img.save(img_buffer, format='PNG')
            img_buffer.seek(0)
            
            qr_code_data = base64.b64encode(img_buffer.getvalue()).decode()
            
            # Generate backup codes
            backup_codes = [secrets.token_hex(4).upper() for _ in range(10)]
            
            # Store secret (temporarily) - will be confirmed when MFA is verified
            user.mfa_secret = secret_key
            user.mfa_backup_codes = ",".join(backup_codes)
            db.commit()
            
            return {
                "secret_key": secret_key,
                "qr_code_url": f"data:image/png;base64,{qr_code_data}",
                "backup_codes": backup_codes
            }
            
        except Exception as e:
            raise AuthenticationError(f"MFA setup failed: {str(e)}")
    
    async def verify_and_enable_mfa(self, user: User, token: str, db: Session) -> bool:
        """Verify MFA token and enable MFA for user"""
        try:
            if not user.mfa_secret:
                raise AuthenticationError("MFA not set up")
            
            totp = pyotp.TOTP(user.mfa_secret)
            
            if totp.verify(token):
                user.mfa_enabled = True
                db.commit()
                
                await self._log_auth_event(
                    "mfa_enabled",
                    str(user.id),
                    {"email": user.email},
                    db
                )
                
                return True
            else:
                return False
                
        except Exception as e:
            raise AuthenticationError(f"MFA verification failed: {str(e)}")
    
    async def change_password(
        self, 
        user: User, 
        current_password: str, 
        new_password: str, 
        db: Session
    ) -> bool:
        """Change user password with validation"""
        try:
            # Verify current password
            if not self.verify_password(current_password, user.hashed_password):
                return False
            
            # Validate new password strength
            if not self._validate_password_strength(new_password):
                raise AuthenticationError("New password does not meet security requirements")
            
            # Update password
            user.hashed_password = self.hash_password(new_password)
            user.password_changed_at = datetime.utcnow()
            db.commit()
            
            await self._log_auth_event(
                "password_changed",
                str(user.id),
                {"email": user.email},
                db
            )
            
            return True
            
        except Exception as e:
            raise AuthenticationError(f"Password change failed: {str(e)}")

    def _validate_password_strength(self, password: str) -> bool:
        """Validate password meets security requirements"""
        if len(password) < 12:
            return False
        
        has_upper = any(c.isupper() for c in password)
        has_lower = any(c.islower() for c in password)
        has_digit = any(c.isdigit() for c in password)
        has_special = any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password)
        
        return all([has_upper, has_lower, has_digit, has_special])
    
    async def _log_auth_event(
        self, 
        event_type: str, 
        user_id: Optional[str], 
        details: Dict[str, Any], 
        db: Session
    ):
        """Log authentication events for audit trail"""
        audit_log = AuditLog(
            event_type=event_type,
            event_category="authentication",
            user_id=user_id,
            action=event_type,
            details=details,
            timestamp=datetime.utcnow()
        )
        
        db.add(audit_log)
        db.commit()

# Global authentication service instance
auth_service = AuthenticationService()

def verify_mfa_token(user: User, token: str) -> bool:
    """Standalone function to verify MFA token"""
    try:
        if not user.mfa_secret or not user.mfa_enabled:
            return False
        
        totp = pyotp.TOTP(user.mfa_secret)
        return totp.verify(token)
    except Exception:
        return False

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Dependency to get current authenticated user"""
    try:
        token = credentials.credentials
        payload = auth_service.verify_token(token)
        
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )
        
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Inactive user"
            )
        
        return user
        
    except AuthenticationError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )

def require_role(allowed_roles: List[UserRole]):
    """Dependency factory for role-based access control"""
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_role = UserRole(current_user.role)
        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    
    return role_checker

def require_security_clearance(min_level: SecurityLevel):
    """Dependency factory for security clearance requirements"""
    def clearance_checker(current_user: User = Depends(get_current_user)) -> User:
        user_clearance = SecurityLevel(current_user.security_clearance_level)
        required_clearance = min_level
        
        # Define clearance hierarchy
        clearance_levels = {
            SecurityLevel.STANDARD: 1,
            SecurityLevel.ELEVATED: 2,
            SecurityLevel.MILITARY_GRADE: 3
        }
        
        if clearance_levels[user_clearance] < clearance_levels[required_clearance]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient security clearance"
            )
        
        return current_user
    
    return clearance_checker

def check_permissions(user_permissions: List[str], required_permission: str) -> bool:
    """
    Check if user has the required permission
    """
    return required_permission in user_permissions or "admin" in user_permissions

# Legacy compatibility functions
def verify_token(token: str) -> Dict[str, Any]:
    """Legacy function for token verification"""
    return auth_service.verify_token(token)

def get_current_user_legacy(token: str, db: Session) -> User:
    """Legacy function for getting current user"""
    payload = verify_token(token)
    user_id = payload.get("user_id")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )
    
    return user
