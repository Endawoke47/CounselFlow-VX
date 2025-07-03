"""
Enhanced validation utilities for CounselFlow API
Provides comprehensive input validation and sanitization
"""

import re
import html
from typing import Any, Dict, List, Optional, Union
from datetime import datetime, date
from pydantic import BaseModel, validator, Field
from email_validator import validate_email, EmailNotValidError
import bleach
from urllib.parse import urlparse


class ValidationError(Exception):
    """Custom validation error with field-specific details"""
    
    def __init__(self, message: str, field: Optional[str] = None, code: Optional[str] = None):
        self.message = message
        self.field = field
        self.code = code
        super().__init__(message)


class SecurityValidator:
    """Security-focused validation utilities"""
    
    # Regex patterns for validation
    SQL_INJECTION_PATTERNS = [
        r"(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)",
        r"(--|#|/\*|\*/)",
        r"(\b(OR|AND)\s+\d+\s*=\s*\d+)",
        r"(\bUNION\s+SELECT\b)",
        r"(\b(SCRIPT|JAVASCRIPT|VBSCRIPT)\b)",
    ]
    
    XSS_PATTERNS = [
        r"<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>",
        r"javascript:",
        r"on\w+\s*=",
        r"<iframe\b",
        r"<object\b",
        r"<embed\b",
        r"<link\b",
        r"<meta\b.*http-equiv",
    ]
    
    # Safe HTML tags for content
    ALLOWED_HTML_TAGS = [
        'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'
    ]
    
    ALLOWED_HTML_ATTRIBUTES = {
        '*': ['class'],
        'a': ['href', 'title'],
        'img': ['src', 'alt', 'width', 'height'],
    }

    @classmethod
    def sanitize_html(cls, content: str) -> str:
        """Sanitize HTML content to prevent XSS attacks"""
        if not content:
            return ""
        
        # Remove potentially dangerous content
        cleaned = bleach.clean(
            content,
            tags=cls.ALLOWED_HTML_TAGS,
            attributes=cls.ALLOWED_HTML_ATTRIBUTES,
            strip=True
        )
        
        return cleaned

    @classmethod
    def check_sql_injection(cls, value: str) -> bool:
        """Check if string contains potential SQL injection patterns"""
        if not isinstance(value, str):
            return False
            
        value_upper = value.upper()
        for pattern in cls.SQL_INJECTION_PATTERNS:
            if re.search(pattern, value_upper, re.IGNORECASE):
                return True
        return False

    @classmethod
    def check_xss(cls, value: str) -> bool:
        """Check if string contains potential XSS patterns"""
        if not isinstance(value, str):
            return False
            
        for pattern in cls.XSS_PATTERNS:
            if re.search(pattern, value, re.IGNORECASE):
                return True
        return False

    @classmethod
    def validate_safe_string(cls, value: str, field_name: str = "field") -> str:
        """Validate and sanitize string input"""
        if not isinstance(value, str):
            raise ValidationError(f"{field_name} must be a string", field_name, "TYPE_ERROR")
        
        # Check for SQL injection
        if cls.check_sql_injection(value):
            raise ValidationError(
                f"{field_name} contains potentially dangerous content", 
                field_name, 
                "SQL_INJECTION"
            )
        
        # Check for XSS
        if cls.check_xss(value):
            raise ValidationError(
                f"{field_name} contains potentially dangerous content", 
                field_name, 
                "XSS_ATTEMPT"
            )
        
        # HTML escape for safety
        return html.escape(value.strip())

    @classmethod
    def validate_email_address(cls, email: str) -> str:
        """Validate email address format and security"""
        try:
            validated = validate_email(email)
            return validated.email
        except EmailNotValidError as e:
            raise ValidationError(f"Invalid email address: {str(e)}", "email", "INVALID_EMAIL")

    @classmethod
    def validate_url(cls, url: str, allowed_schemes: List[str] = None) -> str:
        """Validate URL format and security"""
        if allowed_schemes is None:
            allowed_schemes = ['http', 'https']
        
        try:
            parsed = urlparse(url)
            if parsed.scheme not in allowed_schemes:
                raise ValidationError(
                    f"URL scheme '{parsed.scheme}' not allowed", 
                    "url", 
                    "INVALID_SCHEME"
                )
            
            # Check for potential XSS in URL
            if cls.check_xss(url):
                raise ValidationError(
                    "URL contains potentially dangerous content", 
                    "url", 
                    "XSS_ATTEMPT"
                )
            
            return url
        except Exception as e:
            raise ValidationError(f"Invalid URL format: {str(e)}", "url", "INVALID_URL")


class BusinessValidator:
    """Business logic validation utilities"""
    
    @staticmethod
    def validate_contract_dates(start_date: Union[str, date], end_date: Union[str, date]) -> bool:
        """Validate contract date ranges"""
        if isinstance(start_date, str):
            start_date = datetime.fromisoformat(start_date).date()
        if isinstance(end_date, str):
            end_date = datetime.fromisoformat(end_date).date()
        
        if start_date >= end_date:
            raise ValidationError(
                "Contract end date must be after start date", 
                "end_date", 
                "INVALID_DATE_RANGE"
            )
        
        return True

    @staticmethod
    def validate_monetary_value(value: Union[int, float], min_value: float = 0) -> float:
        """Validate monetary values"""
        if not isinstance(value, (int, float)):
            raise ValidationError("Value must be a number", "value", "TYPE_ERROR")
        
        if value < min_value:
            raise ValidationError(
                f"Value must be at least {min_value}", 
                "value", 
                "VALUE_TOO_LOW"
            )
        
        # Check for reasonable upper bound (adjust as needed)
        if value > 1_000_000_000:  # 1 billion
            raise ValidationError(
                "Value exceeds maximum allowed amount", 
                "value", 
                "VALUE_TOO_HIGH"
            )
        
        return float(value)

    @staticmethod
    def validate_phone_number(phone: str) -> str:
        """Validate phone number format"""
        # Remove common separators
        clean_phone = re.sub(r'[^\d+]', '', phone)
        
        # Basic validation - adjust regex as needed for your requirements
        phone_pattern = r'^\+?[1-9]\d{7,14}$'
        
        if not re.match(phone_pattern, clean_phone):
            raise ValidationError(
                "Invalid phone number format", 
                "phone", 
                "INVALID_PHONE"
            )
        
        return clean_phone

    @staticmethod
    def validate_jurisdiction_code(jurisdiction: str) -> str:
        """Validate jurisdiction code format"""
        # Example: US-NY, UK, EU-DE, etc.
        jurisdiction_pattern = r'^[A-Z]{2}(-[A-Z]{2})?$'
        
        if not re.match(jurisdiction_pattern, jurisdiction.upper()):
            raise ValidationError(
                "Invalid jurisdiction code format", 
                "jurisdiction", 
                "INVALID_JURISDICTION"
            )
        
        return jurisdiction.upper()


# Pydantic validators for common use cases
class BaseValidatedModel(BaseModel):
    """Base model with common validation rules"""
    
    class Config:
        # Enable validation on assignment
        validate_assignment = True
        # Use enum values instead of names
        use_enum_values = True
        # Allow extra fields but warn
        extra = "forbid"

    @validator('*', pre=True)
    def validate_string_fields(cls, v, field):
        """Pre-validator for all string fields"""
        if isinstance(v, str) and field.name not in ['password', 'token']:
            # Apply security validation to most string fields
            return SecurityValidator.validate_safe_string(v, field.name)
        return v


class EmailValidationModel(BaseValidatedModel):
    """Model for email validation"""
    email: str = Field(..., min_length=5, max_length=254)
    
    @validator('email')
    def validate_email(cls, v):
        return SecurityValidator.validate_email_address(v)


class PasswordValidationModel(BaseValidatedModel):
    """Model for password validation"""
    password: str = Field(..., min_length=12, max_length=128)
    
    @validator('password')
    def validate_password_strength(cls, v):
        """Validate password meets security requirements"""
        if len(v) < 12:
            raise ValueError("Password must be at least 12 characters long")
        
        # Check for required character types
        has_upper = bool(re.search(r'[A-Z]', v))
        has_lower = bool(re.search(r'[a-z]', v))
        has_digit = bool(re.search(r'\d', v))
        has_special = bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', v))
        
        if not all([has_upper, has_lower, has_digit, has_special]):
            raise ValueError(
                "Password must contain uppercase letters, lowercase letters, "
                "digits, and special characters"
            )
        
        # Check for common weak patterns
        weak_patterns = [
            r'(.)\1{3,}',  # Repeated characters
            r'1234|abcd|qwer',  # Sequential characters
            r'password|admin|user',  # Common words
        ]
        
        for pattern in weak_patterns:
            if re.search(pattern, v.lower()):
                raise ValueError("Password contains weak patterns")
        
        return v


class URLValidationModel(BaseValidatedModel):
    """Model for URL validation"""
    url: str = Field(..., max_length=2048)
    
    @validator('url')
    def validate_url(cls, v):
        return SecurityValidator.validate_url(v)


class FileUploadValidationModel(BaseValidatedModel):
    """Model for file upload validation"""
    filename: str = Field(..., max_length=255)
    content_type: str = Field(..., max_length=100)
    size: int = Field(..., gt=0)
    
    @validator('filename')
    def validate_filename(cls, v):
        """Validate filename security"""
        # Remove path traversal attempts
        v = v.replace('..', '').replace('/', '').replace('\\', '')
        
        # Check for dangerous extensions
        dangerous_extensions = [
            '.exe', '.bat', '.com', '.cmd', '.scr', '.pif', '.vbs', '.js',
            '.jar', '.php', '.py', '.rb', '.pl', '.sh', '.ps1'
        ]
        
        file_ext = '.' + v.split('.')[-1].lower() if '.' in v else ''
        if file_ext in dangerous_extensions:
            raise ValueError(f"File type '{file_ext}' not allowed")
        
        return SecurityValidator.validate_safe_string(v, 'filename')
    
    @validator('content_type')
    def validate_content_type(cls, v):
        """Validate MIME type"""
        allowed_types = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'image/jpeg',
            'image/png',
            'image/gif'
        ]
        
        if v not in allowed_types:
            raise ValueError(f"Content type '{v}' not allowed")
        
        return v
    
    @validator('size')
    def validate_file_size(cls, v):
        """Validate file size"""
        max_size = 50 * 1024 * 1024  # 50MB
        
        if v > max_size:
            raise ValueError(f"File size exceeds maximum allowed size of {max_size} bytes")
        
        return v


# Utility functions for validation
def validate_request_data(data: Dict[str, Any], model_class: type) -> BaseValidatedModel:
    """Validate request data using specified Pydantic model"""
    try:
        return model_class(**data)
    except ValueError as e:
        raise ValidationError(str(e), code="VALIDATION_ERROR")


def sanitize_search_query(query: str) -> str:
    """Sanitize search query to prevent injection attacks"""
    if not query:
        return ""
    
    # Remove dangerous characters and patterns
    query = re.sub(r'[<>"\']', '', query)
    query = re.sub(r'(script|javascript|vbscript)', '', query, flags=re.IGNORECASE)
    
    # Limit length
    if len(query) > 100:
        query = query[:100]
    
    return query.strip()


def validate_pagination_params(page: int, limit: int) -> tuple[int, int]:
    """Validate pagination parameters"""
    if page < 1:
        raise ValidationError("Page number must be positive", "page", "INVALID_PAGE")
    
    if limit < 1 or limit > 100:
        raise ValidationError("Limit must be between 1 and 100", "limit", "INVALID_LIMIT")
    
    return page, limit