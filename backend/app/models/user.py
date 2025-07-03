"""
User model for authentication and authorization
Imports from the main models module to maintain consistency
"""

from app.models import User, UserRole

# Re-export for backwards compatibility
__all__ = ['User', 'UserRole']
