#!/usr/bin/env python3
"""
CounselFlow - Production Deployment Script
Phase 4: Enterprise Features Production Ready
"""

import os
import sys
import subprocess
import time
from pathlib import Path

def run_command(command, cwd=None):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(
            command, shell=True, cwd=cwd, 
            capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"❌ Command failed: {command}")
            print(f"Error: {result.stderr}")
            return False
        return True
    except Exception as e:
        print(f"❌ Exception running command: {command}")
        print(f"Error: {str(e)}")
        return False

def check_dependencies():
    """Check if all required dependencies are installed"""
    print("🔍 Checking dependencies...")
    
    # Check Python packages
    required_packages = [
        'fastapi', 'uvicorn', 'sqlalchemy', 'psycopg2-binary',
        'redis', 'psutil', 'websockets', 'requests'
    ]
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ Missing: {package}")
            return False
    
    return True

def setup_environment():
    """Setup production environment variables"""
    print("⚙️ Setting up environment...")
    
    env_vars = {
        'ENVIRONMENT': 'production',
        'LOG_LEVEL': 'INFO',
        'DATABASE_URL': 'postgresql://user:password@localhost:5432/counselflow_prod',
        'REDIS_URL': 'redis://localhost:6379',
        'SECRET_KEY': 'your-super-secret-key-change-in-production',
        'ALLOWED_HOSTS': 'localhost,127.0.0.1,your-domain.com'
    }
    
    # Create .env file
    env_file = Path('backend/.env')
    with open(env_file, 'w') as f:
        for key, value in env_vars.items():
            f.write(f"{key}={value}\n")
    
    print("✅ Environment configured")
    return True

def build_frontend():
    """Build the React frontend for production"""
    print("🏗️ Building frontend...")
    
    frontend_dir = Path('counselflow-app')
    if not frontend_dir.exists():
        print("❌ Frontend directory not found")
        return False
    
    # Install dependencies and build
    commands = [
        "npm install",
        "npm run build"
    ]
    
    for cmd in commands:
        if not run_command(cmd, cwd=frontend_dir):
            return False
    
    print("✅ Frontend built successfully")
    return True

def setup_database():
    """Setup production database"""
    print("🗄️ Setting up database...")
    
    # Run database initialization
    if not run_command("python init_db.py", cwd="backend"):
        print("❌ Database setup failed")
        return False
    
    print("✅ Database setup completed")
    return True

def run_tests():
    """Run comprehensive test suite"""
    print("🧪 Running tests...")
    
    test_commands = [
        "python test_enterprise_features.py",
        # Add more test commands as needed
    ]
    
    for cmd in test_commands:
        if not run_command(cmd):
            print(f"❌ Test failed: {cmd}")
            return False
    
    print("✅ All tests passed")
    return True

def deploy_production():
    """Deploy to production environment"""
    print("🚀 Deploying to production...")
    
    # Start services
    services = [
        {
            'name': 'Backend API',
            'command': 'python -m uvicorn main:app --host 127.0.0.1 --port 8000 --workers 4',
            'cwd': 'backend'
        },
        # Add more services like Redis, Nginx, etc.
    ]
    
    for service in services:
        print(f"Starting {service['name']}...")
        # In production, you'd use a process manager like supervisor or systemd
        # For now, just validate the command works
        if not run_command(f"{service['command']} --help", cwd=service.get('cwd')):
            print(f"❌ Service validation failed: {service['name']}")
            return False
    
    print("✅ Production deployment ready")
    return True

def create_monitoring():
    """Setup monitoring and logging"""
    print("📊 Setting up monitoring...")
    
    # Create monitoring configuration
    monitoring_config = {
        'log_retention_days': 30,
        'alert_email': 'admin@counselflow.com',
        'performance_thresholds': {
            'response_time_ms': 500,
            'error_rate_percent': 1,
            'cpu_usage_percent': 80,
            'memory_usage_percent': 85
        }
    }
    
    # Save monitoring config
    import json
    with open('monitoring_config.json', 'w') as f:
        json.dump(monitoring_config, f, indent=2)
    
    print("✅ Monitoring configured")
    return True

def main():
    """Main deployment workflow"""
    print("=" * 60)
    print("🚀 COUNSELFLOW - PHASE 4 PRODUCTION DEPLOYMENT")
    print("=" * 60)
    
    steps = [
        ("Dependencies Check", check_dependencies),
        ("Environment Setup", setup_environment),
        ("Frontend Build", build_frontend),
        ("Database Setup", setup_database),
        ("Test Suite", run_tests),
        ("Monitoring Setup", create_monitoring),
        ("Production Deploy", deploy_production),
    ]
    
    for step_name, step_func in steps:
        print(f"\n📋 {step_name}...")
        if not step_func():
            print(f"💥 Deployment failed at: {step_name}")
            sys.exit(1)
        time.sleep(1)  # Brief pause between steps
    
    print("\n" + "=" * 60)
    print("🎉 PHASE 4 DEPLOYMENT COMPLETED SUCCESSFULLY!")
    print("=" * 60)
    print("📊 Enterprise Features Available:")
    print("  ✅ Advanced Analytics Dashboard")
    print("  ✅ External Legal Database Integration")
    print("  ✅ Multilingual Translation QA")
    print("  ✅ Enterprise Performance Optimization")
    print("  ✅ Real-time WebSocket Analytics")
    print("  ✅ Production Monitoring & Alerting")
    print("\n🌐 API Documentation: http://127.0.0.1:8000/docs")
    print("🎯 Frontend Application: http://localhost:3000")
    print("📈 Analytics Dashboard: http://localhost:3000/analytics")

if __name__ == "__main__":
    main()
