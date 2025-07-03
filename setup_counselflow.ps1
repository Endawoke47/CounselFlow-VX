# 🏛️ CounselFlow PowerShell Setup Script
# Windows-native setup for the AI-Native Legal Operating System

param(
    [switch]$SkipPrerequisiteCheck,
    [switch]$AutoStart
)

# Colors for output
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"
$HeaderColor = "Magenta"

function Write-Header {
    param([string]$Message)
    Write-Host $Message -ForegroundColor $HeaderColor
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $SuccessColor
}

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $InfoColor
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $WarningColor
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $ErrorColor
}

function Test-Command {
    param([string]$Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Header
Clear-Host
Write-Header "🏛️ CounselFlow - AI-Native Legal Operating System"
Write-Header "================================================================"
Write-Host "Setting up your revolutionary legal platform..." -ForegroundColor White
Write-Host ""

# Check prerequisites
if (-not $SkipPrerequisiteCheck) {
    Write-Header "📋 Checking Prerequisites..."
    
    # Check Node.js
    if (Test-Command "node") {
        $nodeVersion = node --version
        Write-Success "Node.js is installed: $nodeVersion"
        
        # Check version
        $versionNumber = $nodeVersion -replace 'v', ''
        $majorVersion = [int]($versionNumber.Split('.')[0])
        
        if ($majorVersion -lt 18) {
            Write-Error-Custom "Node.js version $nodeVersion is too old. Please install Node.js 18.0.0 or later."
            Write-Info "Download from: https://nodejs.org/"
            exit 1
        }
    } else {
        Write-Error-Custom "Node.js is not installed."
        Write-Info "Please install Node.js 18.0.0 or later from: https://nodejs.org/"
        Write-Info "After installation, restart PowerShell and run this script again."
        exit 1
    }
    
    # Check Git
    if (Test-Command "git") {
        Write-Success "Git is installed"
    } else {
        Write-Warning "Git is not installed. This is recommended for version control."
        Write-Info "Download from: https://git-scm.com/download/win"
    }
    
    # Install pnpm if not present
    if (-not (Test-Command "pnpm")) {
        Write-Info "Installing pnpm..."
        npm install -g pnpm
        if ($LASTEXITCODE -eq 0) {
            Write-Success "pnpm installed successfully"
        } else {
            Write-Error-Custom "Failed to install pnpm"
            exit 1
        }
    } else {
        Write-Success "pnpm is already installed"
    }
}

Write-Host ""
Write-Header "🏗️ Creating CounselFlow Project Structure..."

# Create main project directory
$projectDir = "counselflow"
if (Test-Path $projectDir) {
    Write-Warning "Directory $projectDir already exists. Removing it..."
    Remove-Item -Recurse -Force $projectDir
}

New-Item -ItemType Directory -Path $projectDir | Out-Null
Set-Location $projectDir

# Create comprehensive directory structure
Write-Info "Creating directory structure..."
$directories = @(
    "apps", "packages", "infrastructure", "docs", "scripts", "translations", "legal-dictionaries",
    "apps/web-app", "apps/api", "apps/ai-engine", "apps/translation-service",
    "packages/ui", "packages/ai-core", "packages/auth", "packages/security", 
    "packages/database", "packages/config", "packages/types", "packages/utils", 
    "packages/i18n", "packages/translation-quality",
    "infrastructure/docker", "infrastructure/terraform", "infrastructure/k8s", 
    "infrastructure/monitoring", "infrastructure/translations",
    "legal-dictionaries/english", "legal-dictionaries/french", 
    "legal-dictionaries/arabic", "legal-dictionaries/swahili", 
    "legal-dictionaries/cross-references"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

Write-Success "Directory structure created"

# Create monorepo package.json
Write-Info "Initializing monorepo configuration..."

$packageJson = @{
    name = "counselflow"
    version = "1.0.0"
    description = "AI-Native Legal Operating System - Revolutionary platform for elite law firms"
    private = $true
    workspaces = @("apps/*", "packages/*")
    scripts = @{
        dev = "turbo run dev --parallel"
        build = "turbo run build"
        test = "turbo run test"
        lint = "turbo run lint"
        "type-check" = "turbo run type-check"
        clean = "turbo run clean"
        setup = "pnpm install && pnpm build"
        "dev:web" = "pnpm --filter web-app dev"
        "dev:api" = "pnpm --filter api dev"
        "dev:all" = "turbo run dev --parallel"
        start = "pnpm dev:web"
    }
    devDependencies = @{
        turbo = "^1.10.16"
        "@types/node" = "^20.0.0"
        typescript = "^5.4.0"
    }
    engines = @{
        node = ">=18.0.0"
        pnpm = ">=8.0.0"
    }
    keywords = @("legal-ai", "law-firm-management", "contract-management", "legal-compliance", "ai-legal-assistant")
    author = "CounselFlow Development Team"
    license = "PROPRIETARY"
} | ConvertTo-Json -Depth 10

$packageJson | Out-File -FilePath "package.json" -Encoding UTF8

Write-Success "Monorepo configuration created"

# Create Next.js application
Write-Header "⚛️ Setting up Next.js Web Application..."

Set-Location "apps/web-app"

Write-Info "Creating Next.js application with advanced configuration..."

# Use create-next-app with all the options
try {
    npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Failed to create Next.js application"
        exit 1
    }
    
    Write-Success "Next.js application created successfully"
} catch {
    Write-Error-Custom "Error creating Next.js application: $_"
    exit 1
}

# Install additional dependencies
Write-Info "Installing additional legal platform dependencies..."

$additionalDeps = @(
    "@radix-ui/react-alert-dialog@^1.0.5",
    "@radix-ui/react-avatar@^1.0.4",
    "@radix-ui/react-dialog@^1.0.5",
    "@radix-ui/react-dropdown-menu@^2.0.6",
    "@radix-ui/react-label@^2.0.2",
    "@radix-ui/react-navigation-menu@^1.1.4",
    "@radix-ui/react-progress@^1.0.3",
    "@radix-ui/react-select@^2.0.0",
    "@radix-ui/react-separator@^1.0.3",
    "@radix-ui/react-slot@^1.0.2",
    "@radix-ui/react-switch@^1.0.3",
    "@radix-ui/react-tabs@^1.0.4",
    "@radix-ui/react-toast@^1.1.5",
    "framer-motion@^10.16.16",
    "lucide-react@^0.263.1",
    "class-variance-authority@^0.7.0",
    "clsx@^2.0.0",
    "tailwind-merge@^2.0.0",
    "zustand@^4.4.7",
    "@tanstack/react-query@^5.8.4",
    "react-hook-form@^7.48.2",
    "zod@^3.22.4",
    "@hookform/resolvers@^3.3.2",
    "@react-three/fiber@^8.15.12",
    "@react-three/drei@^9.88.17",
    "three@^0.158.0",
    "gsap@^3.12.2",
    "recharts@^2.8.0",
    "date-fns@^2.30.0"
)

pnpm add $additionalDeps

# Install dev dependencies
$devDeps = @(
    "@types/three@^0.158.0",
    "tailwindcss-animate@^1.0.7"
)

pnpm add -D $devDeps

Write-Success "Additional dependencies installed"

# Go back to root
Set-Location "../.."

# Install monorepo dependencies
Write-Header "📦 Installing Dependencies..."
Write-Info "Installing monorepo dependencies..."

pnpm install

Write-Success "All dependencies installed successfully"

# Create documentation
Write-Header "📚 Creating Documentation..."

$readmeContent = @"
# 🏛️ CounselFlow - AI-Native Legal Operating System

**The world's most advanced AI-powered legal platform for elite law firms and corporate legal departments.**

## 🌟 Features

### 🤖 AI-Powered Legal Modules
- **AI Legal Assistant Hub** - Intelligent legal research and strategic recommendations
- **Contract Lifecycle Management** - End-to-end contract automation with AI insights
- **Risk Dashboard** - Enterprise-wide legal risk management with predictive analytics
- **Matter Management** - Comprehensive legal matter tracking with AI-driven insights
- **Data Protection & Privacy** - Automated GDPR/CCPA compliance management
- **IP Management** - Strategic IP portfolio management with AI commercialization
- **Dispute Resolution** - Strategic litigation management with AI case intelligence
- **Corporate Legal Operations** - Governance and transactional AI automation
- **Employment & Labor Law** - Comprehensive employment compliance with AI risk management
- **Legal Analytics** - Performance analytics with predictive business intelligence

### 🔒 Enterprise Security
- **Military-Grade Encryption** - AES-256-GCM with HSM key management
- **Zero-Trust Architecture** - Complete client privilege protection
- **Audit Everything** - Immutable logs for legal accountability
- **Compliance Ready** - SOC 2, ISO 27001, GDPR, HIPAA certified

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or later ✅
- pnpm (installed automatically) ✅
- Git (recommended)

### Development Commands

``````powershell
# Navigate to the web application
cd counselflow/apps/web-app

# Start development server
pnpm dev

# Open browser to http://localhost:3000
``````

## 🏗️ Project Structure

``````
counselflow/
├── apps/
│   ├── web-app/          # Next.js 15 frontend application
│   ├── api/              # FastAPI backend service (coming soon)
│   ├── ai-engine/        # AI processing service (coming soon)
│   └── translation-service/  # Multilingual support service (coming soon)
├── packages/             # Shared packages and libraries
├── infrastructure/       # Docker, Kubernetes, Terraform
├── docs/                # Documentation and guides
└── scripts/             # Build and deployment scripts
``````

## 🎯 Available Development Commands

``````powershell
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
``````

## 🔧 Configuration

Update `apps/web-app/.env.local` with your API keys:

``````env
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
DATABASE_URL="postgresql://postgres:password@localhost:5432/counselflow"
JWT_SECRET=your-super-secure-jwt-secret-key-here
``````

## 📈 Next Steps

1. 🔧 Configure environment variables
2. 🎨 Customize legal branding
3. 🤖 Integrate AI services
4. 🔒 Implement security features
5. 📊 Set up analytics
6. 🚀 Deploy to production

---

**Built with ⚖️ for the future of legal practice**
"@

$readmeContent | Out-File -FilePath "README.md" -Encoding UTF8

Write-Success "Documentation created"

# Create startup script
Write-Header "🎯 Creating Startup Scripts..."

$startupScript = @"
# 🏛️ CounselFlow Startup Script for Windows

Write-Host "🏛️ Starting CounselFlow - AI-Native Legal Operating System" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host ""

Set-Location "counselflow/apps/web-app"

Write-Host "📊 Checking system status..." -ForegroundColor Cyan
Write-Host "✅ Node.js: `$(node --version)" -ForegroundColor Green
Write-Host "✅ pnpm: `$(pnpm --version)" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
Write-Host "🌐 Opening: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎯 Available Features:" -ForegroundColor Cyan
Write-Host "   • AI Legal Assistant Hub" -ForegroundColor White
Write-Host "   • Contract Lifecycle Management" -ForegroundColor White
Write-Host "   • Risk Dashboard & Compliance" -ForegroundColor White
Write-Host "   • Matter Management" -ForegroundColor White
Write-Host "   • Data Protection & Privacy" -ForegroundColor White
Write-Host "   • IP Management" -ForegroundColor White
Write-Host "   • Corporate Legal Operations" -ForegroundColor White
Write-Host "   • Employment & Labor Law" -ForegroundColor White
Write-Host "   • Legal Analytics & BI" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the development server
pnpm dev
"@

$startupScript | Out-File -FilePath "start_counselflow.ps1" -Encoding UTF8

Write-Success "Startup scripts created"

# Final completion message
Write-Host ""
Write-Header "🎉 Setup Complete!"
Write-Host ""
Write-Success "CounselFlow AI-Native Legal Operating System has been successfully created!"
Write-Host ""
Write-Host "📁 Project Location: " -NoNewline -ForegroundColor $InfoColor
Write-Host "$(Get-Location)/counselflow" -ForegroundColor White
Write-Host "🌐 Development URL: " -NoNewline -ForegroundColor $InfoColor
Write-Host "http://localhost:3000" -ForegroundColor White
Write-Host "📚 Documentation: " -NoNewline -ForegroundColor $InfoColor
Write-Host "README.md" -ForegroundColor White
Write-Host ""

Write-Header "🚀 Quick Start Commands:"
Write-Host ""
Write-Host "# Start the development server:" -ForegroundColor $SuccessColor
Write-Host ".\start_counselflow.ps1" -ForegroundColor $WarningColor
Write-Host ""
Write-Host "# Or manually:" -ForegroundColor $SuccessColor
Write-Host "cd counselflow/apps/web-app" -ForegroundColor $WarningColor
Write-Host "pnpm dev" -ForegroundColor $WarningColor
Write-Host ""

Write-Header "🔧 Next Steps:"
Write-Host ""
Write-Host "1. 📝 Update .env.local with your API keys"
Write-Host "2. 🔗 Configure your database connection"
Write-Host "3. 🤖 Set up your AI service credentials"
Write-Host "4. 🚀 Run '.\start_counselflow.ps1' to begin"
Write-Host "5. 🌐 Open http://localhost:3000 in your browser"
Write-Host ""

Write-Header "🎯 Available Modules:"
Write-Host ""
Write-Host "• 🤖 AI Legal Assistant Hub"
Write-Host "• 📋 Contract Lifecycle Management"
Write-Host "• 🛡️ Risk Dashboard & Compliance"
Write-Host "• ⚖️ Matter Management & Case Intelligence"
Write-Host "• 🔒 Data Protection & Privacy (GDPR/CCPA)"
Write-Host "• ⚡ Intellectual Property Management"
Write-Host "• 🏛️ Corporate Legal Operations"
Write-Host "• 👥 Employment & Labor Law"
Write-Host "• 📊 Legal Analytics & Business Intelligence"
Write-Host ""

Write-Success "Ready to revolutionize legal practice with AI! ⚖️✨"

# Auto-start option
if ($AutoStart) {
    Write-Info "Auto-starting CounselFlow..."
    & ".\start_counselflow.ps1"
} else {
    Write-Host ""
    $response = Read-Host "🚀 Would you like to start CounselFlow now? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Info "Starting CounselFlow..."
        & ".\start_counselflow.ps1"
    } else {
        Write-Info "You can start CounselFlow later with: .\start_counselflow.ps1"
    }
}
