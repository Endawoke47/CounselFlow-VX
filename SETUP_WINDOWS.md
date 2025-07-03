# 🏛️ CounselFlow Setup Guide for Windows

## Quick Setup Instructions

### Step 1: Install Prerequisites

1. **Install Node.js (Required)**
   - Download from: https://nodejs.org/
   - Install version 18.0.0 or later
   - Verify installation: `node --version`

2. **Install Git (Required)**
   - Download from: https://git-scm.com/download/win
   - Choose "Git for Windows" with Git Bash

3. **Install pnpm (Will be installed automatically)**
   - The setup script will install pnpm for you

### Step 2: Run Setup Script

After installing Node.js and Git, run:

```powershell
# In PowerShell
cd "c:\Users\Yadel Y. Endawoke\Desktop\CounselFlow"
bash setup_counselflow.sh
```

### Step 3: Alternative - Manual Setup

If you prefer manual setup, run these commands in PowerShell:

```powershell
# Install pnpm globally
npm install -g pnpm

# Create project directory
mkdir counselflow
cd counselflow

# Initialize the project
npm init -y

# Create Next.js app
npx create-next-app@latest web-app --typescript --tailwind --app --src-dir --import-alias "@/*"

# Navigate to the app
cd web-app

# Start development server
npm run dev
```

## What the Setup Script Creates

🏗️ **Complete Project Structure:**
- Modern Next.js 15 application with React 19
- TypeScript configuration with strict mode
- Tailwind CSS with custom legal design system
- Premium UI components with Radix UI
- 3D animations with Framer Motion and Three.js
- AI integration framework
- Security-first architecture
- Comprehensive development environment

🎯 **10 Core Legal Modules:**
1. 🤖 AI Legal Assistant Hub
2. 📋 Contract Lifecycle Management
3. 🛡️ Risk Dashboard & Compliance
4. ⚖️ Matter Management & Case Intelligence
5. 🔒 Data Protection & Privacy (GDPR/CCPA)
6. ⚡ Intellectual Property Management
7. 🏛️ Corporate Legal Operations
8. 👥 Employment & Labor Law
9. 📊 Legal Analytics & Business Intelligence
10. 🔍 Dispute Resolution & Litigation

🎨 **Premium Legal UI/UX:**
- Futuristic legal interface with glassmorphism design
- Professional color palette (Legal Navy, Blue, Gold)
- 3D legal animations (scales of justice, floating documents)
- Responsive design optimized for legal professionals
- AI-first interaction patterns

🔒 **Enterprise Security:**
- Military-grade encryption configuration
- Zero-trust architecture setup
- Client privilege protection framework
- Comprehensive audit logging
- GDPR/HIPAA compliance ready

## Quick Start After Setup

```bash
# Start development server
cd counselflow/apps/web-app
pnpm dev

# Open in browser
# http://localhost:3000
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Environment Configuration

Update `.env.local` with your API keys:

```env
# AI Services (Required for full functionality)
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# Database (Required for production)
DATABASE_URL="postgresql://postgres:password@localhost:5432/counselflow"

# Security (Required)
JWT_SECRET=your-super-secure-jwt-secret-key-here
ENCRYPTION_KEY=your-32-character-encryption-key
```

## Next Steps

1. 📝 Configure your AI API keys
2. 🎨 Customize the legal branding
3. 🔒 Set up security certificates
4. 🤖 Train legal AI models
5. 📊 Configure analytics
6. 🚀 Deploy to production

## Support

For technical support:
- 📧 Email: support@counselflow.com
- 📚 Documentation: README.md
- 🛠️ Development Guide: DEVELOPMENT.md

---

**Ready to revolutionize legal practice with AI! ⚖️✨**
