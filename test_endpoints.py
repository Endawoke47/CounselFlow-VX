#!/usr/bin/env python3
"""
Test multiple endpoints to debug server connectivity
"""
import requests
import sys

endpoints = [
    "http://127.0.0.1:8000/",
    "http://127.0.0.1:8000/health", 
    "http://localhost:8000/health",
    "http://0.0.0.0:8000/health"
]

for url in endpoints:
    try:
        print(f"Testing {url}...")
        resp = requests.get(url, timeout=3)
        print(f"✅ SUCCESS: {url} - Status: {resp.status_code}")
        break
    except requests.exceptions.ConnectionError:
        print(f"❌ Connection failed: {url}")
    except requests.exceptions.Timeout:
        print(f"❌ Timeout: {url}")
    except Exception as e:
        print(f"❌ Error on {url}: {e}")

print("Endpoint testing complete.")
