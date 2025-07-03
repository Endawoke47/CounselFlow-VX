
# Microservice Deployment Guide

## Overview
This guide explains how to deploy each legal module as an independent microservice. Each service can be deployed separately and customers can choose which modules they need.

## Architecture

### Shared Components
- **Design System**: All UI components are exported from `src/shared/components/`
- **Theme System**: Consistent dark/light mode across all services
- **Authentication**: Shared Supabase auth or custom SSO integration

### Independent Services
Each service has its own:
- Database schema
- API endpoints
- Deployment configuration
- Access control

## Deployment Options

### 1. Container-Based Deployment
Each service can be containerized using Docker:

```dockerfile
# Example Dockerfile for IP Management Service
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:ip-management
EXPOSE 3001
CMD ["npm", "run", "start:ip-management"]
```

### 2. Serverless Deployment
Deploy each service as serverless functions:
- Vercel Functions
- AWS Lambda
- Netlify Functions

### 3. Kubernetes Deployment
Use Kubernetes for orchestrating multiple services:
- Separate pods for each service
- Shared ingress controller
- Service mesh for inter-service communication

## Database Schemas

Each service uses its own database schema:

```sql
-- IP Management Schema
CREATE SCHEMA ip_management;
-- Tables: ip_assets, licenses, patents, trademarks, renewals

-- Matter Management Schema  
CREATE SCHEMA matter_management;
-- Tables: matters, assignments, advice, time_tracking

-- Data Protection Schema
CREATE SCHEMA data_protection;
-- Tables: ropa_entries, risk_assessments, breaches, dsr_requests
```

## Service Communication

### REST APIs
Each service exposes REST endpoints:
- `GET /api/v1/ip/assets` - IP Management
- `GET /api/v1/matters/cases` - Matter Management
- `GET /api/v1/data-protection/ropa` - Data Protection

### Authentication
Shared authentication using:
- Supabase Auth (recommended)
- Auth0
- Custom JWT implementation

## Customer Deployment Examples

### Scenario 1: IP-Only Customer
Deploy only:
- IP Management Service
- User Access Management Service
- Shared Component Library

### Scenario 2: Full Legal Suite
Deploy all services:
- All 7 legal modules
- Shared authentication
- Central dashboard (optional)

### Scenario 3: Custom Integration
Pick and choose:
- Matter Management + IP Management
- Data Protection standalone
- Custom branding and domain

## Configuration

Each service is configured via `microservice.config.ts`:
- Database connections
- Authentication providers
- CORS policies
- Feature flags

## Benefits

1. **Scalability**: Scale services independently based on usage
2. **Cost Efficiency**: Customers pay only for what they use
3. **Technology Flexibility**: Different tech stacks per service
4. **Team Ownership**: Dedicated teams per domain
5. **Deployment Independence**: Update services without affecting others

## Next Steps

1. Set up CI/CD pipelines for each service
2. Create Terraform/CloudFormation templates
3. Implement service discovery
4. Set up monitoring and logging
5. Create customer onboarding automation
