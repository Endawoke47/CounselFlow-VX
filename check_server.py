#!/usr/bin/env python3
"""
Simple server health check script
"""
import requests
import sys

try:
    print("Testing server connection...")
    resp = requests.get("http://127.0.0.1:8000/health", timeout=5)
    print(f"✅ Server responding! Status: {resp.status_code}")
    if resp.status_code == 200:
        print(f"Response: {resp.json()}")
    else:
        print(f"Response text: {resp.text}")
except requests.exceptions.ConnectionError:
    print("❌ Connection failed - server not running or not accessible")
    sys.exit(1)
except requests.exceptions.Timeout:
    print("❌ Request timed out - server may be overloaded")
    sys.exit(1)
except Exception as e:
    print(f"❌ Unexpected error: {e}")
    sys.exit(1)
