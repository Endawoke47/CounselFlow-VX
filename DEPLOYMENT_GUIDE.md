# CounselFlow - Production Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying CounselFlow to a production environment with enterprise-grade security, performance, and reliability.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Security Configuration](#security-configuration)
4. [Database Setup](#database-setup)
5. [Redis Configuration](#redis-configuration)
6. [Backend Deployment](#backend-deployment)
7. [Frontend Deployment](#frontend-deployment)
8. [SSL/TLS Configuration](#ssltls-configuration)
9. [Monitoring Setup](#monitoring-setup)
10. [Backup and Recovery](#backup-and-recovery)
11. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **Operating System**: Ubuntu 20.04 LTS or CentOS 8+ (recommended)
- **CPU**: Minimum 4 cores, recommended 8+ cores
- **RAM**: Minimum 8GB, recommended 16GB+
- **Storage**: Minimum 100GB SSD, recommended 500GB+ SSD
- **Network**: Static IP address with proper firewall configuration

### Required Software

- Docker Engine 20.10+
- Docker Compose 2.0+
- Nginx 1.18+
- PostgreSQL 15+
- Redis 6+
- Git 2.30+

### Domain and SSL

- Registered domain name
- SSL certificate (Let's Encrypt recommended)
- DNS configuration pointing to your server

## Environment Setup

### 1. Server Preparation

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Create Application User

```bash
# Create dedicated user for CounselFlow
sudo useradd -m -s /bin/bash counselflow
sudo usermod -aG docker counselflow

# Switch to application user
sudo su - counselflow
```

### 3. Clone Repository

```bash
# Clone the repository
git clone https://github.com/Endawoke47/CounselFlow-V1.git
cd CounselFlow-V1

# Checkout production branch (if applicable)
git checkout main
```

## Security Configuration

### 1. Generate Secure Keys

```bash
# Generate strong secret keys
openssl rand -hex 32  # For SECRET_KEY
openssl rand -hex 32  # For JWT_SECRET_KEY
openssl rand -base64 32  # For ENCRYPTION_KEY

# Generate database password
openssl rand -base64 24
```

### 2. Configure Environment Variables

Create production environment file:

```bash
cp .env.production.template .env.production
```

Edit `.env.production` with your secure values:

```bash
# Application Settings
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=WARNING

# Database Configuration
DATABASE_NAME=counselflow_prod
DATABASE_USER=counselflow_prod
DATABASE_PASSWORD=YOUR_SECURE_DB_PASSWORD
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_URL=postgresql://counselflow_prod:YOUR_SECURE_DB_PASSWORD@database:5432/counselflow_prod

# Redis Configuration
REDIS_PASSWORD=YOUR_SECURE_REDIS_PASSWORD
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://:YOUR_SECURE_REDIS_PASSWORD@redis:6379/0

# Security Settings
SECRET_KEY=YOUR_32_CHAR_SECRET_KEY
JWT_SECRET_KEY=YOUR_32_CHAR_JWT_KEY
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
JWT_REFRESH_TOKEN_EXPIRE_DAYS=1
ENCRYPTION_KEY=YOUR_BASE64_ENCRYPTION_KEY

# CORS Configuration
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
CORS_ALLOW_CREDENTIALS=true

# API Keys (if using AI services)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# Email Configuration
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-email-password
SMTP_TLS=true

# Frontend URLs
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Security
RATE_LIMIT_ENABLED=true
RATE_LIMIT_REQUESTS_PER_MINUTE=30
MAX_FILE_SIZE=52428800
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,png,jpg,jpeg

# SSL Configuration
SSL_ENABLED=true
SSL_CERT_PATH=/etc/ssl/certs/your-domain.crt
SSL_KEY_PATH=/etc/ssl/private/your-domain.key

# Monitoring
PROMETHEUS_ENABLED=true
HEALTH_CHECK_ENABLED=true
SENTRY_DSN=your-sentry-dsn-if-using
```

### 3. Set File Permissions

```bash
# Secure environment file
chmod 600 .env.production
chown counselflow:counselflow .env.production

# Create required directories
mkdir -p logs uploads ssl
chmod 755 logs uploads
chmod 700 ssl
```

## Database Setup

### 1. PostgreSQL Installation (if not using Docker)

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres createuser counselflow_prod
sudo -u postgres createdb counselflow_prod -O counselflow_prod
sudo -u postgres psql -c "ALTER USER counselflow_prod PASSWORD 'YOUR_SECURE_DB_PASSWORD';"

# Configure PostgreSQL
sudo nano /etc/postgresql/*/main/postgresql.conf
# Set: max_connections = 200
# Set: shared_buffers = 256MB
# Set: effective_cache_size = 1GB

sudo systemctl restart postgresql
```

### 2. Database Security

```bash
# Configure pg_hba.conf for security
sudo nano /etc/postgresql/*/main/pg_hba.conf
# Ensure only necessary connections are allowed
# Use md5 authentication method

# Enable SSL in PostgreSQL
sudo -u postgres psql -c "ALTER SYSTEM SET ssl = on;"
sudo systemctl restart postgresql
```

## Redis Configuration

### 1. Redis Installation (if not using Docker)

```bash
# Install Redis
sudo apt install -y redis-server

# Configure Redis for production
sudo nano /etc/redis/redis.conf
# Set: requirepass YOUR_SECURE_REDIS_PASSWORD
# Set: maxmemory 1gb
# Set: maxmemory-policy allkeys-lru
# Set: bind 127.0.0.1

sudo systemctl restart redis
```

## Backend Deployment

### 1. Build and Deploy with Docker

```bash
# Build production image
docker-compose -f docker-compose.production.yml build

# Start services
docker-compose -f docker-compose.production.yml up -d

# Check service status
docker-compose -f docker-compose.production.yml ps

# View logs
docker-compose -f docker-compose.production.yml logs -f backend
```

### 2. Database Migration

```bash
# Run database initialization
docker-compose -f docker-compose.production.yml exec backend python init_db.py

# Verify database connection
docker-compose -f docker-compose.production.yml exec backend python -c "
from app.core.database import engine
from sqlalchemy import text
with engine.connect() as conn:
    result = conn.execute(text('SELECT 1'))
    print('Database connection successful')
"
```

### 3. Health Check Verification

```bash
# Test backend health
curl http://localhost:8000/health

# Test detailed health check
curl http://localhost:8000/health/detailed

# Test database health
curl http://localhost:8000/health/db
```

## Frontend Deployment

### 1. Build Frontend

```bash
# Navigate to frontend directory
cd counselflow-app

# Install dependencies
npm ci --production

# Build for production
npm run build

# Verify build
ls -la build/
```

### 2. Nginx Configuration

Create Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/counselflow
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.your-domain.com";

    # Frontend
    location / {
        root /home/counselflow/CounselFlow-V1/counselflow-app/build;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Caching for static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API Proxy
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffer settings
        proxy_buffering on;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }

    # Health checks
    location /health {
        proxy_pass http://localhost:8000;
        access_log off;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    location /api/ {
        limit_req zone=api burst=20 nodelay;
    }

    # File upload limits
    client_max_body_size 50M;
    
    # Logging
    access_log /var/log/nginx/counselflow_access.log;
    error_log /var/log/nginx/counselflow_error.log;
}
```

### 3. Enable Nginx Site

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/counselflow /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## SSL/TLS Configuration

### 1. Obtain SSL Certificate

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

### 2. Configure Auto-renewal

```bash
# Add cron job for auto-renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

## Monitoring Setup

### 1. Prometheus Configuration

Create monitoring directory:

```bash
mkdir -p monitoring
cd monitoring
```

Create `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'counselflow-backend'
    static_configs:
      - targets: ['backend:8000']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093
```

Create `alert_rules.yml`:

```yaml
groups:
  - name: counselflow.rules
    rules:
      - alert: HighErrorRate
        expr: rate(counselflow_errors_total[5m]) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: High error rate detected
          description: "Error rate is {{ $value }} errors per second"

      - alert: HighMemoryUsage
        expr: counselflow_memory_usage_bytes / (1024*1024*1024) > 12
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: High memory usage
          description: "Memory usage is {{ $value }}GB"

      - alert: DatabaseConnectionFailure
        expr: counselflow_database_connections == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Database connection failure
          description: "No active database connections"
```

### 2. Start Monitoring Stack

```bash
# Start monitoring services
docker-compose -f docker-compose.production.yml --profile monitoring up -d

# Access Grafana (port 3001)
# Default login: admin/admin
echo "Grafana available at: https://your-domain.com:3001"
```

## Backup and Recovery

### 1. Database Backup

Create backup script:

```bash
#!/bin/bash
# backup_database.sh

BACKUP_DIR="/home/counselflow/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_NAME="counselflow_prod"
DB_USER="counselflow_prod"

mkdir -p $BACKUP_DIR

# Create database backup
docker-compose -f docker-compose.production.yml exec -T database pg_dump -U $DB_USER -d $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Remove old backups (keep last 30 days)
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +30 -delete

echo "Database backup completed: db_backup_$DATE.sql.gz"
```

### 2. Application Backup

```bash
#!/bin/bash
# backup_application.sh

BACKUP_DIR="/home/counselflow/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
APP_DIR="/home/counselflow/CounselFlow-V1"

mkdir -p $BACKUP_DIR

# Backup application files (excluding node_modules and logs)
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz \
    --exclude='node_modules' \
    --exclude='logs' \
    --exclude='.git' \
    -C $APP_DIR .

echo "Application backup completed: app_backup_$DATE.tar.gz"
```

### 3. Automated Backups

```bash
# Make scripts executable
chmod +x backup_database.sh backup_application.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * /home/counselflow/backup_database.sh") | crontab -
(crontab -l 2>/dev/null; echo "0 3 * * 0 /home/counselflow/backup_application.sh") | crontab -
```

## Security Hardening

### 1. Firewall Configuration

```bash
# Enable UFW
sudo ufw enable

# Allow SSH (adjust port if needed)
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow monitoring (if external access needed)
sudo ufw allow 9090/tcp  # Prometheus
sudo ufw allow 3001/tcp  # Grafana

# Check status
sudo ufw status
```

### 2. Fail2Ban Setup

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Configure for Nginx
sudo nano /etc/fail2ban/jail.local
```

Add configuration:

```ini
[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/counselflow_error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/counselflow_error.log
maxretry = 10
findtime = 600
bantime = 7200
```

### 3. System Updates

```bash
# Enable automatic security updates
sudo apt install -y unattended-upgrades

# Configure automatic updates
sudo dpkg-reconfigure -plow unattended-upgrades
```

## Performance Optimization

### 1. Database Tuning

```sql
-- Connect to PostgreSQL and run these optimizations
-- Adjust based on your server specifications

-- Memory settings (for 16GB RAM server)
ALTER SYSTEM SET shared_buffers = '4GB';
ALTER SYSTEM SET effective_cache_size = '12GB';
ALTER SYSTEM SET maintenance_work_mem = '512MB';
ALTER SYSTEM SET work_mem = '32MB';

-- Connection settings
ALTER SYSTEM SET max_connections = 200;

-- WAL settings
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;

-- Query optimization
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET effective_io_concurrency = 200;

-- Restart PostgreSQL to apply changes
```

### 2. Redis Tuning

Edit Redis configuration:

```bash
# /etc/redis/redis.conf or in Docker environment
maxmemory 2gb
maxmemory-policy allkeys-lru
tcp-keepalive 300
timeout 0
```

### 3. Nginx Optimization

Add to Nginx configuration:

```nginx
# Worker processes
worker_processes auto;
worker_connections 1024;

# Gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

# Buffer sizes
client_body_buffer_size 128k;
client_header_buffer_size 1k;
large_client_header_buffers 4 4k;
output_buffers 1 32k;
postpone_output 1460;
```

## Troubleshooting

### Common Issues

1. **Service Won't Start**
   ```bash
   # Check Docker logs
   docker-compose -f docker-compose.production.yml logs backend
   
   # Check system resources
   df -h
   free -h
   top
   ```

2. **Database Connection Issues**
   ```bash
   # Test database connection
   docker-compose -f docker-compose.production.yml exec database psql -U counselflow_prod -d counselflow_prod -c "SELECT 1;"
   
   # Check database logs
   docker-compose -f docker-compose.production.yml logs database
   ```

3. **High Memory Usage**
   ```bash
   # Check memory usage by service
   docker stats
   
   # Restart services if needed
   docker-compose -f docker-compose.production.yml restart backend
   ```

4. **SSL Certificate Issues**
   ```bash
   # Check certificate status
   sudo certbot certificates
   
   # Renew certificate manually
   sudo certbot renew
   
   # Test SSL configuration
   openssl s_client -connect your-domain.com:443
   ```

### Health Check Commands

```bash
# Backend health
curl https://your-domain.com/health

# Detailed system health
curl https://your-domain.com/health/detailed

# Database health
curl https://your-domain.com/health/db

# Check all Docker services
docker-compose -f docker-compose.production.yml ps

# Check system resources
htop
iostat 1
```

### Log Locations

- **Nginx Logs**: `/var/log/nginx/`
- **Application Logs**: `./logs/`
- **Docker Logs**: `docker-compose logs [service]`
- **System Logs**: `/var/log/syslog`

## Maintenance

### Regular Maintenance Tasks

1. **Weekly**
   - Check system updates
   - Review application logs
   - Monitor disk space
   - Verify backups

2. **Monthly**
   - Update Docker images
   - Review security alerts
   - Performance analysis
   - Certificate renewal check

3. **Quarterly**
   - Full security audit
   - Performance optimization review
   - Backup recovery testing
   - Documentation updates

For support and additional guidance, refer to the [troubleshooting documentation](TROUBLESHOOTING.md) or contact the development team.