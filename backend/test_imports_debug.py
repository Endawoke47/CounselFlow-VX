#!/usr/bin/env python3

"""
Test script to isolate import issues in CounselFlow backend
"""

print("🔍 Testing CounselFlow imports...")

try:
    print("✅ Testing basic FastAPI import...")
    from fastapi import FastAPI
    print("✅ FastAPI imported successfully")
except Exception as e:
    print(f"❌ FastAPI import failed: {e}")
    exit(1)

try:
    print("✅ Testing app.core imports...")
    from app.core.database import get_db, engine, Base
    print("✅ Database imports successful")
except Exception as e:
    print(f"❌ Database import failed: {e}")

try:
    print("✅ Testing app.core.config...")
    from app.core.config import settings
    print("✅ Config import successful")
except Exception as e:
    print(f"❌ Config import failed: {e}")

try:
    print("✅ Testing app.core.auth...")
    from app.core.auth import auth_service, get_current_user
    print("✅ Auth import successful")
except Exception as e:
    print(f"❌ Auth import failed: {e}")

try:
    print("✅ Testing app.models...")
    from app.models import User
    print("✅ Models import successful")
except Exception as e:
    print(f"❌ Models import failed: {e}")

print("\n🧪 Testing route imports...")

routes_to_test = [
    "auth", "users", "contracts", "matters", "entities", "tasks", 
    "knowledge", "risks", "disputes", "vendors", "compliance", 
    "policies", "ai_agents", "websocket", "document_versions",
    "analytics", "legal_databases", "translation_qa", "performance"
]

failed_routes = []
for route in routes_to_test:
    try:
        exec(f"from app.api.v1.routes import {route}")
        print(f"✅ {route} imported successfully")
    except Exception as e:
        print(f"❌ {route} import failed: {e}")
        failed_routes.append((route, str(e)))

if failed_routes:
    print(f"\n💥 Failed route imports: {len(failed_routes)}")
    for route, error in failed_routes:
        print(f"   - {route}: {error}")
else:
    print(f"\n🎉 All {len(routes_to_test)} route imports successful!")

print("\n🏁 Import test complete.")
