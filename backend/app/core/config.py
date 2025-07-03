"""
Core configuration settings for CounselFlow API
"""

import os
from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    PROJECT_NAME: str = "CounselFlow"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Modular Legal Support"
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")
    DEBUG: bool = Field(default=True, env="DEBUG")
    
    # Security - CRITICAL: Must be set via environment variables in production
    SECRET_KEY: str = Field(env="SECRET_KEY")
    JWT_SECRET_KEY: str = Field(env="JWT_SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30, env="JWT_ACCESS_TOKEN_EXPIRE_MINUTES")
    
    # CORS Configuration
    CORS_ORIGINS: str = Field(default="http://localhost:3000,http://localhost:3001", env="CORS_ORIGINS")
    CORS_ALLOW_CREDENTIALS: bool = Field(default=True, env="CORS_ALLOW_CREDENTIALS")
    
    # Enhanced Security Settings
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=7, env="REFRESH_TOKEN_EXPIRE_DAYS")
    PASSWORD_MIN_LENGTH: int = Field(default=12, env="PASSWORD_MIN_LENGTH")
    PASSWORD_REQUIRE_SPECIAL: bool = Field(default=True, env="PASSWORD_REQUIRE_SPECIAL")
    MFA_ISSUER_NAME: str = Field(default="CounselFlow Legal Support", env="MFA_ISSUER_NAME")
    
    # Session Security
    SESSION_TIMEOUT_MINUTES: int = Field(default=60, env="SESSION_TIMEOUT_MINUTES")
    MAX_LOGIN_ATTEMPTS: int = Field(default=5, env="MAX_LOGIN_ATTEMPTS")
    LOCKOUT_DURATION_MINUTES: int = Field(default=30, env="LOCKOUT_DURATION_MINUTES")
    
    # Encryption Settings
    ENCRYPTION_ALGORITHM: str = Field(default="AES-256-GCM", env="ENCRYPTION_ALGORITHM")
    CLIENT_ISOLATION_ENABLED: bool = Field(default=True, env="CLIENT_ISOLATION_ENABLED")
    PRIVILEGE_PROTECTION_LEVEL: str = Field(default="military_grade", env="PRIVILEGE_PROTECTION_LEVEL")
    
    # Database - CRITICAL: Must be set via environment variables
    DATABASE_URL: str = Field(env="DATABASE_URL")
    DATABASE_HOST: str = Field(default="localhost", env="DATABASE_HOST")
    DATABASE_PORT: int = Field(default=5432, env="DATABASE_PORT")
    DATABASE_NAME: str = Field(env="DATABASE_NAME")
    DATABASE_USER: str = Field(env="DATABASE_USER")
    DATABASE_PASSWORD: str = Field(env="DATABASE_PASSWORD")
    
    # Redis (for caching and sessions) - CRITICAL: Must be set via environment variables
    REDIS_URL: str = Field(env="REDIS_URL")
    REDIS_HOST: str = Field(default="localhost", env="REDIS_HOST")
    REDIS_PORT: int = Field(default=6379, env="REDIS_PORT")
    REDIS_PASSWORD: Optional[str] = Field(default=None, env="REDIS_PASSWORD")
    
    # AI Services
    OPENAI_API_KEY: Optional[str] = Field(default=None, env="OPENAI_API_KEY")
    ANTHROPIC_API_KEY: Optional[str] = Field(default=None, env="ANTHROPIC_API_KEY")
    GEMINI_API_KEY: Optional[str] = Field(default=None, env="GEMINI_API_KEY")
    
    # LangChain Settings
    LANGCHAIN_TRACING_V2: bool = Field(default=False, env="LANGCHAIN_TRACING_V2")
    LANGCHAIN_API_KEY: Optional[str] = Field(default=None, env="LANGCHAIN_API_KEY")
    
    # LlamaIndex Settings
    LLAMA_INDEX_CACHE_DIR: str = Field(default="./cache", env="LLAMA_INDEX_CACHE_DIR")
    
    # File Storage
    UPLOAD_FOLDER: str = Field(default="./uploads", env="UPLOAD_FOLDER")
    MAX_UPLOAD_SIZE: int = Field(default=50 * 1024 * 1024, env="MAX_UPLOAD_SIZE")  # 50MB
    ALLOWED_EXTENSIONS: List[str] = [
        "pdf", "doc", "docx", "txt", "csv", "xlsx", "xls", "ppt", "pptx"
    ]
    
    # Email Configuration
    SMTP_HOST: Optional[str] = Field(default=None, env="SMTP_HOST")
    SMTP_PORT: int = Field(default=587, env="SMTP_PORT")
    SMTP_USERNAME: Optional[str] = Field(default=None, env="SMTP_USERNAME")
    SMTP_PASSWORD: Optional[str] = Field(default=None, env="SMTP_PASSWORD")
    SMTP_USE_TLS: bool = Field(default=True, env="SMTP_USE_TLS")
    
    # Logging
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    LOG_FILE: str = Field(default="counselflow.log", env="LOG_FILE")
    
    # Rate Limiting and Security
    RATE_LIMIT_ENABLED: bool = Field(default=True, env="RATE_LIMIT_ENABLED")
    RATE_LIMIT_REQUESTS_PER_MINUTE: int = Field(default=60, env="RATE_LIMIT_REQUESTS_PER_MINUTE")
    
    # File Upload Security
    MAX_FILE_SIZE: int = Field(default=10485760, env="MAX_FILE_SIZE")  # 10MB default
    ALLOWED_FILE_TYPES: str = Field(default="pdf,doc,docx,txt,png,jpg,jpeg", env="ALLOWED_FILE_TYPES")
    UPLOAD_PATH: str = Field(default="./uploads", env="UPLOAD_PATH")
    
    # SSL/TLS Configuration
    SSL_ENABLED: bool = Field(default=False, env="SSL_ENABLED")
    SSL_CERT_PATH: Optional[str] = Field(default=None, env="SSL_CERT_PATH")
    SSL_KEY_PATH: Optional[str] = Field(default=None, env="SSL_KEY_PATH")
    
    # Monitoring and Health Checks
    PROMETHEUS_ENABLED: bool = Field(default=True, env="PROMETHEUS_ENABLED")
    HEALTH_CHECK_ENABLED: bool = Field(default=True, env="HEALTH_CHECK_ENABLED")
    SENTRY_DSN: Optional[str] = Field(default=None, env="SENTRY_DSN")
    
    # Compliance & Audit
    AUDIT_LOG_RETENTION_DAYS: int = Field(default=2555, env="AUDIT_LOG_RETENTION_DAYS")  # 7 years
    ENCRYPTION_KEY: Optional[str] = Field(default=None, env="ENCRYPTION_KEY")
    
    # Jurisdictions supported
    SUPPORTED_JURISDICTIONS: List[str] = [
        "US-NY", "US-CA", "US-FL", "US-TX", "US-IL",
        "UK", "EU-DE", "EU-FR", "CA-ON", "AU-NSW"
    ]
    
    # Languages supported
    SUPPORTED_LANGUAGES: List[str] = ["en", "fr", "es", "de"]
    
    # Document Security
    DOCUMENT_ENCRYPTION_ENABLED: bool = Field(default=True, env="DOCUMENT_ENCRYPTION_ENABLED")
    
    # Azure OpenAI
    AZURE_OPENAI_ENDPOINT: Optional[str] = Field(default=None, env="AZURE_OPENAI_ENDPOINT")
    AZURE_OPENAI_KEY: Optional[str] = Field(default=None, env="AZURE_OPENAI_KEY")
    
    # LangChain Cache
    LANGCHAIN_CACHE_DIR: str = Field(default="./cache/langchain", env="LANGCHAIN_CACHE_DIR")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

    def validate_production_settings(self) -> None:
        """Validate that all critical settings are provided for production"""
        if self.ENVIRONMENT == "production":
            required_fields = [
                "SECRET_KEY",
                "JWT_SECRET_KEY", 
                "DATABASE_URL",
                "DATABASE_NAME",
                "DATABASE_USER",
                "DATABASE_PASSWORD",
                "REDIS_URL"
            ]
            
            missing_fields = []
            for field in required_fields:
                value = getattr(self, field, None)
                if not value or (isinstance(value, str) and "CHANGE_THIS" in value.upper()):
                    missing_fields.append(field)
            
            if missing_fields:
                raise ValueError(
                    f"Missing or invalid production configuration for: {', '.join(missing_fields)}. "
                    f"These must be set via environment variables for production deployment."
                )
            
            # Validate security key lengths
            if len(self.SECRET_KEY) < 32:
                raise ValueError("SECRET_KEY must be at least 32 characters long for production")
            
            if len(self.JWT_SECRET_KEY) < 32:
                raise ValueError("JWT_SECRET_KEY must be at least 32 characters long for production")

    @property
    def allowed_file_types_list(self) -> List[str]:
        """Return allowed file types as a list"""
        return [ext.strip() for ext in self.ALLOWED_FILE_TYPES.split(",")]

    @property
    def cors_origins_list(self) -> List[str]:
        """Return CORS origins as a list"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


# Global settings instance
settings = Settings()

# Validate production settings if in production environment
if settings.ENVIRONMENT == "production":
    settings.validate_production_settings()
