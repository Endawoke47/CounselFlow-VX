#!/usr/bin/env python3
"""Quick test of enterprise endpoints"""

import requests
import json

def quick_test():
    base_url = "http://127.0.0.1:8000"
    
    endpoints = [
        "/health",
        "/api/v1/analytics/dashboard", 
        "/api/v1/legal-databases/databases",
        "/api/v1/translation-qa/languages",
        "/api/v1/performance/health"
    ]
    
    print("🧪 Quick Enterprise Endpoint Test")
    print("=" * 40)
    
    for endpoint in endpoints:
        try:
            url = f"{base_url}{endpoint}"
            response = requests.get(url, timeout=3)
            status = "✅" if response.status_code == 200 else f"❌ {response.status_code}"
            print(f"{status} {endpoint}")
        except Exception as e:
            print(f"❌ {endpoint} - {str(e)[:30]}...")
    
    print("\n🚀 Test complete!")

if __name__ == "__main__":
    quick_test()
