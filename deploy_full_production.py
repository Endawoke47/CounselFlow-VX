#!/usr/bin/env python3
"""
CounselFlow - Production Deployment Orchestrator
Complete production deployment with monitoring and health checks
"""

import os
import sys
import subprocess
import time
import json
import requests
from pathlib import Path
from datetime import datetime

class ProductionDeployer:
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.deployment_log = []
        
    def log(self, message, level="INFO"):
        """Log deployment steps"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] {level}: {message}"
        print(log_entry)
        self.deployment_log.append(log_entry)
        
    def run_command(self, command, cwd=None, timeout=300):
        """Execute shell command with error handling"""
        try:
            self.log(f"Executing: {command}")
            result = subprocess.run(
                command, shell=True, cwd=cwd or self.project_root,
                capture_output=True, text=True, timeout=timeout
            )
            if result.returncode == 0:
                self.log(f"✅ Command successful: {command}")
                return True, result.stdout
            else:
                self.log(f"❌ Command failed: {command}", "ERROR")
                self.log(f"Error output: {result.stderr}", "ERROR")
                return False, result.stderr
        except subprocess.TimeoutExpired:
            self.log(f"⏰ Command timed out: {command}", "ERROR")
            return False, "Command timeout"
        except Exception as e:
            self.log(f"💥 Command exception: {command} - {str(e)}", "ERROR")
            return False, str(e)
    
    def validate_environment(self):
        """Validate deployment environment"""
        self.log("🔍 Validating deployment environment...")
        
        # Check required files
        required_files = [
            "docker-compose.production.yml",
            "Dockerfile.production", 
            ".env.production",
            "backend/main.py",
            "backend/requirements.txt"
        ]
        
        for file_path in required_files:
            if not (self.project_root / file_path).exists():
                self.log(f"❌ Missing required file: {file_path}", "ERROR")
                return False
                
        self.log("✅ Environment validation passed")
        return True
    
    def build_containers(self):
        """Build Docker containers"""
        self.log("🏗️ Building Docker containers...")
        
        # Build backend
        success, output = self.run_command(
            "docker build -f Dockerfile.production -t counselflow-backend .",
            timeout=600
        )
        if not success:
            return False
            
        # Build frontend (if Dockerfile exists)
        frontend_dockerfile = self.project_root / "counselflow-app" / "Dockerfile"
        if frontend_dockerfile.exists():
            success, output = self.run_command(
                "docker build -t counselflow-frontend ./counselflow-app",
                timeout=600
            )
            if not success:
                return False
                
        self.log("✅ Container builds completed")
        return True
    
    def deploy_services(self):
        """Deploy services using Docker Compose"""
        self.log("🚀 Deploying services...")
        
        # Stop existing services
        self.run_command("docker-compose -f docker-compose.production.yml down")
        
        # Start new services
        success, output = self.run_command(
            "docker-compose -f docker-compose.production.yml up -d",
            timeout=300
        )
        
        if success:
            self.log("✅ Services deployed successfully")
            return True
        else:
            self.log("❌ Service deployment failed", "ERROR")
            return False
    
    def wait_for_services(self):
        """Wait for services to be healthy"""
        self.log("⏳ Waiting for services to be healthy...")
        
        services = [
            {"name": "Database", "url": "postgresql://localhost:5432", "timeout": 60},
            {"name": "Redis", "url": "redis://localhost:6379", "timeout": 30},
            {"name": "Backend API", "url": "http://localhost:8000/health", "timeout": 90}
        ]
        
        for service in services:
            self.log(f"🔍 Checking {service['name']}...")
            
            if service['name'] == 'Backend API':
                # HTTP health check
                for attempt in range(service['timeout']):
                    try:
                        response = requests.get(service['url'], timeout=5)
                        if response.status_code == 200:
                            self.log(f"✅ {service['name']} is healthy")
                            break
                    except:
                        pass
                    time.sleep(1)
                else:
                    self.log(f"❌ {service['name']} health check failed", "ERROR")
                    return False
            else:
                # Service startup wait
                time.sleep(service['timeout'])
                self.log(f"✅ {service['name']} startup time elapsed")
        
        return True
    
    def run_health_checks(self):
        """Run comprehensive health checks"""
        self.log("🏥 Running health checks...")
        
        endpoints = [
            "/health",
            "/api/v1/analytics/dashboard",
            "/api/v1/legal-databases/databases", 
            "/api/v1/translation-qa/languages",
            "/api/v1/performance/health"
        ]
        
        base_url = "http://localhost:8000"
        healthy_endpoints = 0
        
        for endpoint in endpoints:
            try:
                response = requests.get(f"{base_url}{endpoint}", timeout=10)
                if response.status_code == 200:
                    self.log(f"✅ {endpoint} - OK")
                    healthy_endpoints += 1
                else:
                    self.log(f"⚠️ {endpoint} - Status {response.status_code}", "WARNING")
            except Exception as e:
                self.log(f"❌ {endpoint} - Error: {str(e)}", "ERROR")
        
        health_percentage = (healthy_endpoints / len(endpoints)) * 100
        self.log(f"📊 Health Check Results: {healthy_endpoints}/{len(endpoints)} ({health_percentage:.1f}%)")
        
        return health_percentage >= 80  # 80% threshold
    
    def setup_monitoring(self):
        """Setup monitoring and alerting"""
        self.log("📊 Setting up monitoring...")
        
        # Check if monitoring services are running
        try:
            prometheus_response = requests.get("http://localhost:9090", timeout=5)
            if prometheus_response.status_code == 200:
                self.log("✅ Prometheus monitoring is running")
        except:
            self.log("⚠️ Prometheus not accessible", "WARNING")
            
        try:
            grafana_response = requests.get("http://localhost:3000", timeout=5)
            if grafana_response.status_code == 200:
                self.log("✅ Grafana dashboard is running")
        except:
            self.log("⚠️ Grafana not accessible", "WARNING")
        
        return True
    
    def create_deployment_report(self):
        """Create deployment report"""
        report = {
            "deployment_time": datetime.now().isoformat(),
            "status": "SUCCESS",
            "services": {
                "backend": "http://localhost:8000",
                "frontend": "http://localhost:80", 
                "database": "localhost:5432",
                "redis": "localhost:6379",
                "prometheus": "http://localhost:9090",
                "grafana": "http://localhost:3000"
            },
            "endpoints": {
                "api_docs": "http://localhost:8000/docs",
                "health_check": "http://localhost:8000/health",
                "analytics": "http://localhost:8000/api/v1/analytics/dashboard"
            },
            "logs": self.deployment_log
        }
        
        report_file = self.project_root / "deployment_report.json"
        with open(report_file, 'w') as f:
            json.dump(report, f, indent=2)
        
        self.log(f"📋 Deployment report saved: {report_file}")
        return report
    
    def deploy(self):
        """Main deployment workflow"""
        self.log("🚀 Starting CounselFlow Production Deployment")
        self.log("=" * 60)
        
        try:
            # Deployment steps
            steps = [
                ("Environment Validation", self.validate_environment),
                ("Container Build", self.build_containers),
                ("Service Deployment", self.deploy_services),
                ("Service Health Wait", self.wait_for_services),
                ("Health Checks", self.run_health_checks),
                ("Monitoring Setup", self.setup_monitoring)
            ]
            
            for step_name, step_func in steps:
                self.log(f"\n📋 Step: {step_name}")
                if not step_func():
                    self.log(f"💥 Deployment failed at step: {step_name}", "ERROR")
                    return False
                    
            # Success!
            self.log("\n" + "=" * 60)
            self.log("🎉 DEPLOYMENT SUCCESSFUL!")
            self.log("=" * 60)
            
            # Create report
            report = self.create_deployment_report()
            
            # Display access information
            self.log("\n🌐 Service Access URLs:")
            self.log("• API Documentation: http://localhost:8000/docs")
            self.log("• Health Check: http://localhost:8000/health") 
            self.log("• Analytics Dashboard: http://localhost:8000/api/v1/analytics/dashboard")
            self.log("• Prometheus Monitoring: http://localhost:9090")
            self.log("• Grafana Dashboard: http://localhost:3000")
            
            self.log("\n🔧 Management Commands:")
            self.log("• View logs: docker-compose -f docker-compose.production.yml logs")
            self.log("• Stop services: docker-compose -f docker-compose.production.yml down")
            self.log("• Restart services: docker-compose -f docker-compose.production.yml restart")
            
            return True
            
        except Exception as e:
            self.log(f"💥 Deployment failed with exception: {str(e)}", "ERROR")
            return False

def main():
    """Main entry point"""
    print("🚀 CounselFlow Production Deployment")
    print("=" * 60)
    
    deployer = ProductionDeployer()
    success = deployer.deploy()
    
    if success:
        print("\n✅ Deployment completed successfully!")
        sys.exit(0)
    else:
        print("\n❌ Deployment failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
