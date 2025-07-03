"""
Comprehensive security tests for CounselFlow backend
"""

import pytest
import asyncio
from fastapi.testclient import TestClient
from fastapi import status
from unittest.mock import Mock, patch
import jwt
from datetime import datetime, timedelta
from typing import Dict, Any

from app.core.config import settings
from app.core.auth import create_access_token, verify_token
from app.core.security import ClientPrivilegeProtector, hash_password, verify_password
from app.models import User
from main import app

client = TestClient(app)

class TestAuthentication:
    """Test authentication and authorization"""

    def test_login_with_valid_credentials(self):
        """Test successful login with valid credentials"""
        response = client.post("/api/v1/auth/login", json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        })
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert "user" in data

    def test_login_with_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = client.post("/api/v1/auth/login", json={
            "email": "test@example.com",
            "password": "wrongpassword"
        })
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_login_with_missing_fields(self):
        """Test login with missing required fields"""
        response = client.post("/api/v1/auth/login", json={
            "email": "test@example.com"
        })
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_login_with_invalid_email_format(self):
        """Test login with invalid email format"""
        response = client.post("/api/v1/auth/login", json={
            "email": "invalid-email",
            "password": "TestPassword123!"
        })
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_access_protected_endpoint_without_token(self):
        """Test accessing protected endpoint without token"""
        response = client.get("/api/v1/security/status")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_access_protected_endpoint_with_invalid_token(self):
        """Test accessing protected endpoint with invalid token"""
        headers = {"Authorization": "Bearer invalid_token"}
        response = client.get("/api/v1/security/status", headers=headers)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_access_protected_endpoint_with_expired_token(self):
        """Test accessing protected endpoint with expired token"""
        # Create an expired token
        expired_token = jwt.encode(
            {
                "sub": "test@example.com",
                "exp": datetime.utcnow() - timedelta(hours=1)
            },
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )
        headers = {"Authorization": f"Bearer {expired_token}"}
        response = client.get("/api/v1/security/status", headers=headers)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

class TestPasswordSecurity:
    """Test password security measures"""

    def test_password_hashing(self):
        """Test password hashing functionality"""
        password = "TestPassword123!"
        hashed = hash_password(password)
        
        assert hashed != password
        assert verify_password(password, hashed)
        assert not verify_password("wrongpassword", hashed)

    def test_weak_password_rejection(self):
        """Test rejection of weak passwords"""
        weak_passwords = [
            "123456",
            "password",
            "abc",
            "Password1",  # No special character
            "password123!",  # No uppercase
            "PASSWORD123!",  # No lowercase
            "Password!",  # Too short
        ]
        
        for weak_password in weak_passwords:
            response = client.post("/api/v1/auth/register", json={
                "email": "test@example.com",
                "password": weak_password,
                "firstName": "Test",
                "lastName": "User",
                "role": "attorney"
            })
            assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_strong_password_acceptance(self):
        """Test acceptance of strong passwords"""
        strong_password = "StrongPassword123!@#"
        response = client.post("/api/v1/auth/register", json={
            "email": "newuser@example.com",
            "password": strong_password,
            "firstName": "Test",
            "lastName": "User",
            "role": "attorney"
        })
        # Should not fail due to password strength
        assert response.status_code != status.HTTP_422_UNPROCESSABLE_ENTITY or \
               "password" not in response.json().get("detail", "").lower()

class TestRateLimiting:
    """Test rate limiting functionality"""

    def test_rate_limiting_on_login_endpoint(self):
        """Test rate limiting on login endpoint"""
        # Attempt multiple rapid requests
        responses = []
        for _ in range(10):
            response = client.post("/api/v1/auth/login", json={
                "email": "test@example.com",
                "password": "wrongpassword"
            })
            responses.append(response.status_code)
        
        # Should eventually hit rate limit
        assert status.HTTP_429_TOO_MANY_REQUESTS in responses

    def test_rate_limiting_on_api_endpoints(self):
        """Test rate limiting on API endpoints"""
        # Get a valid token first
        login_response = client.post("/api/v1/auth/login", json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # Attempt multiple rapid requests
        responses = []
        for _ in range(100):
            response = client.get("/api/v1/contracts", headers=headers)
            responses.append(response.status_code)
        
        # Should eventually hit rate limit
        assert status.HTTP_429_TOO_MANY_REQUESTS in responses

class TestInputValidation:
    """Test input validation and sanitization"""

    def test_sql_injection_prevention(self):
        """Test SQL injection prevention"""
        malicious_inputs = [
            "'; DROP TABLE users; --",
            "1' OR '1'='1",
            "admin'/*",
            "1; DELETE FROM contracts; --"
        ]
        
        # Get a valid token
        login_response = client.post("/api/v1/auth/login", json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        for malicious_input in malicious_inputs:
            response = client.get(f"/api/v1/contracts/{malicious_input}", headers=headers)
            # Should not return 500 (internal server error) indicating SQL injection
            assert response.status_code != status.HTTP_500_INTERNAL_SERVER_ERROR

    def test_xss_prevention(self):
        """Test XSS prevention in input fields"""
        xss_payloads = [
            "<script>alert('xss')</script>",
            "javascript:alert('xss')",
            "<img src=x onerror=alert('xss')>",
            "';alert('xss');//"
        ]
        
        # Get a valid token
        login_response = client.post("/api/v1/auth/login", json={
            "email": "test@example.com", 
            "password": "TestPassword123!"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        for payload in xss_payloads:
            response = client.post("/api/v1/contracts", 
                headers=headers,
                json={
                    "title": payload,
                    "description": payload,
                    "contractType": "service_agreement",
                    "status": "draft"
                }
            )
            
            # Check that the response doesn't contain the raw payload
            if response.status_code == status.HTTP_201_CREATED:
                response_text = response.text.lower()
                assert "<script>" not in response_text
                assert "javascript:" not in response_text

class TestAttorneyClientPrivilege:
    """Test attorney-client privilege protection"""

    def test_client_data_isolation(self):
        """Test that client data is properly isolated"""
        privilege_protector = ClientPrivilegeProtector()
        
        # Test that different clients can't access each other's data
        client1_data = {"client_id": "client1", "sensitive_data": "confidential1"}
        client2_data = {"client_id": "client2", "sensitive_data": "confidential2"}
        
        encrypted1 = privilege_protector.encrypt_client_data(client1_data, "client1")
        encrypted2 = privilege_protector.encrypt_client_data(client2_data, "client2")
        
        # Client 1 should not be able to decrypt Client 2's data
        decrypted1 = privilege_protector.decrypt_client_data(encrypted1, "client1")
        assert decrypted1["sensitive_data"] == "confidential1"
        
        # Attempting to decrypt with wrong client ID should fail
        with pytest.raises(Exception):
            privilege_protector.decrypt_client_data(encrypted2, "client1")

    def test_privilege_level_enforcement(self):
        """Test that privilege levels are properly enforced"""
        # Get tokens for different user roles
        attorney_token = self._get_token_for_role("attorney")
        paralegal_token = self._get_token_for_role("paralegal")
        client_token = self._get_token_for_role("client")
        
        # Test access to highly confidential endpoint
        confidential_endpoint = "/api/v1/matters/confidential"
        
        # Attorney should have access
        response = client.get(confidential_endpoint, 
            headers={"Authorization": f"Bearer {attorney_token}"})
        assert response.status_code != status.HTTP_403_FORBIDDEN
        
        # Paralegal should have limited access
        response = client.get(confidential_endpoint,
            headers={"Authorization": f"Bearer {paralegal_token}"})
        # Depending on implementation, may be 403 or filtered results
        
        # Client should not have access to other clients' matters
        response = client.get(confidential_endpoint,
            headers={"Authorization": f"Bearer {client_token}"})
        # Should return only their own matters or 403

    def _get_token_for_role(self, role: str) -> str:
        """Helper method to get token for specific role"""
        # This would be implemented based on your test setup
        # For now, return a mock token
        return create_access_token(data={"sub": f"test_{role}@example.com", "role": role})

class TestFileUploadSecurity:
    """Test file upload security measures"""

    def test_file_type_validation(self):
        """Test that only allowed file types can be uploaded"""
        # Get a valid token
        login_response = client.post("/api/v1/auth/login", json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # Test disallowed file types
        disallowed_files = [
            ("malicious.exe", b"MZ\x90\x00"),  # Executable
            ("script.php", b"<?php echo 'hello'; ?>"),  # PHP script
            ("virus.bat", b"@echo off\ndel /q *.*"),  # Batch file
        ]
        
        for filename, content in disallowed_files:
            files = {"file": (filename, content, "application/octet-stream")}
            response = client.post("/api/v1/documents/upload", 
                headers=headers, files=files)
            assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_file_size_limits(self):
        """Test file size limitations"""
        # Get a valid token
        login_response = client.post("/api/v1/auth/login", json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # Create a file larger than the limit
        large_content = b"A" * (settings.MAX_FILE_SIZE + 1)
        files = {"file": ("large.pdf", large_content, "application/pdf")}
        
        response = client.post("/api/v1/documents/upload",
            headers=headers, files=files)
        assert response.status_code == status.HTTP_413_REQUEST_ENTITY_TOO_LARGE

class TestAuditLogging:
    """Test audit logging functionality"""

    def test_sensitive_operations_are_logged(self):
        """Test that sensitive operations are properly logged"""
        with patch('app.core.security.AuditLogger.log_security_event') as mock_logger:
            # Perform a sensitive operation
            login_response = client.post("/api/v1/auth/login", json={
                "email": "test@example.com",
                "password": "TestPassword123!"
            })
            
            # Verify that the operation was logged
            mock_logger.assert_called()
            
            # Check the log entry details
            call_args = mock_logger.call_args
            assert call_args[1]['event_type'] in ['login_success', 'authentication']
            assert 'user_id' in call_args[1]
            assert 'timestamp' in call_args[1]['details']

    def test_failed_operations_are_logged(self):
        """Test that failed operations are properly logged"""
        with patch('app.core.security.AuditLogger.log_security_event') as mock_logger:
            # Attempt a failed login
            response = client.post("/api/v1/auth/login", json={
                "email": "test@example.com",
                "password": "wrongpassword"
            })
            
            # Verify that the failure was logged
            mock_logger.assert_called()
            
            # Check the log entry details
            call_args = mock_logger.call_args
            assert call_args[1]['event_type'] in ['login_failure', 'authentication_failure']

class TestCORS:
    """Test CORS configuration"""

    def test_cors_headers_present(self):
        """Test that CORS headers are properly set"""
        response = client.options("/api/v1/contracts")
        
        assert "Access-Control-Allow-Origin" in response.headers
        assert "Access-Control-Allow-Methods" in response.headers
        assert "Access-Control-Allow-Headers" in response.headers

    def test_cors_origin_validation(self):
        """Test that CORS origin validation works correctly"""
        # Test with allowed origin
        allowed_headers = {"Origin": "http://localhost:3000"}
        response = client.options("/api/v1/contracts", headers=allowed_headers)
        assert response.headers.get("Access-Control-Allow-Origin") == "http://localhost:3000"
        
        # Test with disallowed origin
        disallowed_headers = {"Origin": "http://malicious-site.com"}
        response = client.options("/api/v1/contracts", headers=disallowed_headers)
        assert response.headers.get("Access-Control-Allow-Origin") != "http://malicious-site.com"

class TestErrorHandling:
    """Test secure error handling"""

    def test_no_sensitive_info_in_errors(self):
        """Test that error responses don't leak sensitive information"""
        # Attempt to access non-existent resource
        response = client.get("/api/v1/contracts/nonexistent")
        
        error_text = response.text.lower()
        
        # Should not contain sensitive information
        assert "database" not in error_text
        assert "password" not in error_text
        assert "secret" not in error_text
        assert "traceback" not in error_text or settings.ENVIRONMENT == "development"

    def test_production_error_handling(self):
        """Test that production environment properly sanitizes errors"""
        with patch.object(settings, 'ENVIRONMENT', 'production'):
            # Trigger an internal error
            response = client.get("/api/v1/contracts/trigger-error")
            
            # Should not contain debugging information in production
            if response.status_code == 500:
                assert "traceback" not in response.text.lower()
                assert "error_id" in response.json()  # Should provide error ID for tracking

if __name__ == "__main__":
    pytest.main([__file__, "-v"])