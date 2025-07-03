"""
Simple test script for CounselFlow API endpoints
"""
import requests
import json
import sys

BASE_URL = "http://localhost:8000"
TIMEOUT = 5  # 5 second timeout for all requests

def check_api_availability():
    """Pre-check if API is available before running tests"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=3)
        if response.status_code == 200:
            print("✅ API is available and responding")
            return True
        else:
            print(f"❌ API returned status {response.status_code}")
            return False
    except requests.exceptions.Timeout:
        print("❌ API timeout - server may not be running")
        return False
    except requests.exceptions.ConnectionError:
        print("❌ Connection refused - backend server is not running")
        print("💡 Start the backend with: uvicorn main:app --reload")
        return False
    except Exception as e:
        print(f"❌ Failed to reach API: {e}")
        return False

def test_health_endpoint():
    """Test the health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=TIMEOUT)
        print(f"Health Check: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except requests.exceptions.Timeout:
        print(f"Health check timeout after {TIMEOUT} seconds")
        return False
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_user_registration():
    """Test user registration"""
    try:
        import time
        unique_email = f"admin.{int(time.time())}@counselflow.com"
        
        user_data = {
            "email": unique_email,
            "password": "CounselFlow123!",
            "confirm_password": "CounselFlow123!",
            "first_name": "Admin",
            "last_name": "User",
            "role": "admin"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/v1/auth/register",
            json=user_data,
            headers={"Content-Type": "application/json"},
            timeout=TIMEOUT
        )
        
        print(f"Registration: {response.status_code}")
        if response.status_code == 201:
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"Registration failed: {e}")
        return False

def test_user_login():
    """Test user login"""
    try:
        login_data = {
            "email": "admin@counselflow.com",
            "password": "CounselFlow123!"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/v1/auth/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=TIMEOUT
        )
        
        print(f"Login: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Login successful! Token received.")
            return result.get("access_token")
        else:
            print(f"Error: {response.text}")
            return None
    except Exception as e:
        print(f"Login failed: {e}")
        return None

def test_protected_endpoint(token):
    """Test a protected endpoint"""
    try:
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(
            f"{BASE_URL}/api/v1/security/status",
            headers=headers,
            timeout=TIMEOUT
        )
        
        print(f"Security Status: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"Protected endpoint test failed: {e}")
        return False

if __name__ == "__main__":
    print("=== CounselFlow API Test Suite ===")
    
    # Pre-check: Verify API availability
    print("\n🔍 Checking API availability...")
    if not check_api_availability():
        print("\n❌ API is not available. Please start the backend server first.")
        print("💡 Run: uvicorn main:app --reload")
        sys.exit(1)
    
    # Test 1: Health Check
    print("\n1. Testing Health Endpoint...")
    if not test_health_endpoint():
        print("❌ Health check failed!")
        exit(1)
    print("✅ Health check passed!")
    
    # Test 2: User Registration
    print("\n2. Testing User Registration...")
    if not test_user_registration():
        print("❌ User registration failed!")
        exit(1)
    print("✅ User registration passed!")
    
    # Test 3: User Login
    print("\n3. Testing User Login...")
    token = test_user_login()
    if not token:
        print("❌ User login failed!")
        exit(1)
    print("✅ User login passed!")
    
    # Test 4: Protected Endpoint
    print("\n4. Testing Protected Endpoint...")
    if not test_protected_endpoint(token):
        print("❌ Protected endpoint test failed!")
        exit(1)
    print("✅ Protected endpoint test passed!")
    
    print("\n🎉 All tests passed! CounselFlow API is working correctly.")
