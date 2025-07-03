#!/usr/bin/env python3
"""
CounselFlow - Service Status Checker
Quick verification of all Phase 4 enterprise services
"""

import requests
import time
import json
from datetime import datetime

def check_service_status():
    """Check the status of all CounselFlow services"""
    print("🔍 COUNSELFLOW SERVICES STATUS CHECK")
    print("=" * 50)
    print(f"⏰ Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    services = [
        {"name": "Backend API Health", "url": "http://127.0.0.1:8000/health"},
        {"name": "Analytics Dashboard", "url": "http://127.0.0.1:8000/api/v1/analytics/dashboard"},
        {"name": "Legal Databases", "url": "http://127.0.0.1:8000/api/v1/legal-databases/databases"},
        {"name": "Translation QA", "url": "http://127.0.0.1:8000/api/v1/translation-qa/languages"},
        {"name": "Performance Monitor", "url": "http://127.0.0.1:8000/api/v1/performance/health"},
    ]
    
    results = []
    
    for service in services:
        try:
            print(f"🔍 Checking {service['name']}...")
            response = requests.get(service['url'], timeout=10)
            
            if response.status_code == 200:
                status = "✅ ONLINE"
                details = f"Response time: {response.elapsed.total_seconds():.3f}s"
            else:
                status = f"⚠️ ISSUES (Status: {response.status_code})"
                details = f"HTTP {response.status_code}"
                
        except requests.exceptions.ConnectionError:
            status = "❌ OFFLINE"
            details = "Connection refused - service not running"
        except requests.exceptions.Timeout:
            status = "⏰ TIMEOUT"
            details = "Request timed out after 10s"
        except Exception as e:
            status = "❌ ERROR"
            details = str(e)
        
        results.append({
            "service": service['name'],
            "status": status,
            "details": details
        })
        
        print(f"   {status} - {details}")
        time.sleep(0.5)  # Brief delay between checks
    
    print("\n" + "=" * 50)
    print("📊 SUMMARY")
    print("=" * 50)
    
    online_count = len([r for r in results if "✅" in r["status"]])
    total_count = len(results)
    
    print(f"🟢 Services Online: {online_count}/{total_count}")
    print(f"📈 System Health: {(online_count/total_count)*100:.1f}%")
    
    if online_count == total_count:
        print("\n🎉 ALL SYSTEMS OPERATIONAL!")
        print("✅ CounselFlow Phase 4 Enterprise Features Ready")
        print("🌐 API Documentation: http://127.0.0.1:8000/docs")
        print("📊 Admin Dashboard: http://127.0.0.1:8000/admin")
    else:
        print(f"\n⚠️ {total_count - online_count} service(s) need attention")
        print("💡 Run 'python main.py' in backend/ to start missing services")
    
    return results

def test_specific_features():
    """Test specific enterprise features"""
    print("\n🧪 TESTING ENTERPRISE FEATURES")
    print("=" * 50)
    
    # Test analytics endpoint
    try:
        print("📊 Testing Analytics Dashboard...")
        response = requests.post("http://127.0.0.1:8000/api/v1/analytics/dashboard", 
                               json={"timeframe": "30d"}, timeout=5)
        if response.status_code == 200:
            print("   ✅ Analytics API working")
        else:
            print(f"   ⚠️ Analytics returned {response.status_code}")
    except Exception as e:
        print(f"   ❌ Analytics error: {str(e)[:50]}...")
    
    # Test legal database search
    try:
        print("🔍 Testing Legal Database Search...")
        response = requests.post("http://127.0.0.1:8000/api/v1/legal-databases/search",
                               json={"query": "contract law", "databases": ["westlaw"]}, timeout=5)
        if response.status_code == 200:
            print("   ✅ Legal DB search working")
        else:
            print(f"   ⚠️ Legal DB returned {response.status_code}")
    except Exception as e:
        print(f"   ❌ Legal DB error: {str(e)[:50]}...")
    
    # Test translation QA
    try:
        print("🌐 Testing Translation QA...")
        response = requests.post("http://127.0.0.1:8000/api/v1/translation-qa/validate",
                               json={"original_text": "Legal contract", "translated_text": "Contrato legal", 
                                   "source_language": "en", "target_language": "es"}, timeout=5)
        if response.status_code == 200:
            print("   ✅ Translation QA working")
        else:
            print(f"   ⚠️ Translation QA returned {response.status_code}")
    except Exception as e:
        print(f"   ❌ Translation QA error: {str(e)[:50]}...")

if __name__ == "__main__":
    print("🚀 Starting CounselFlow Status Check...\n")
    
    # Give services time to start if just launched
    print("⏳ Waiting for services to initialize...")
    time.sleep(3)
    
    # Check service status
    results = check_service_status()
    
    # Test specific features
    test_specific_features()
    
    print("\n" + "=" * 50)
    print("✨ Status check complete!")
    print("🔗 For detailed API docs: http://127.0.0.1:8000/docs")
