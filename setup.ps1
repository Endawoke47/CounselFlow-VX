# CounselFlow Windows Setup Script
# PowerShell script for Windows setup

Write-Host "🏛️ CounselFlow Setup Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check pnpm
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm found: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Check Python
try {
    $pythonVersion = python --version
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python is not installed. Please install Python 3.11+ first." -ForegroundColor Red
    exit 1
}

# Check Docker (optional)
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
    $dockerAvailable = $true
} catch {
    Write-Host "⚠️ Docker not found - manual setup only" -ForegroundColor Yellow
    $dockerAvailable = $false
}

Write-Host "✅ Prerequisites check complete" -ForegroundColor Green

# Setup frontend
Write-Host "Setting up frontend..." -ForegroundColor Yellow
Set-Location counselflow-app
pnpm install
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

# Setup backend
Write-Host "Setting up backend..." -ForegroundColor Yellow
Set-Location ..\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

# Create environment file
Set-Location ..
if (!(Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "📝 Created .env file from template" -ForegroundColor Blue
    Write-Host "⚠️ Please edit .env with your configuration" -ForegroundColor Yellow
}

# Database setup instructions
Write-Host ""
Write-Host "🗄️ Database Setup Required:" -ForegroundColor Magenta
Write-Host "1. Install PostgreSQL 15+"
Write-Host "2. Create database: createdb counselflow"
Write-Host "3. Update DATABASE_URL in .env file"
Write-Host ""

# AI setup instructions
Write-Host "🤖 AI Integration (Optional):" -ForegroundColor Magenta
Write-Host "1. Get API keys from OpenAI, Anthropic, or Google"
Write-Host "2. Add them to .env file"
Write-Host "3. AI features will be enabled automatically"
Write-Host ""

# Final instructions
if ($dockerAvailable) {
    Write-Host "🐳 Quick Start with Docker:" -ForegroundColor Cyan
    Write-Host "   docker-compose up -d"
    Write-Host ""
}

Write-Host "🚀 Manual Start:" -ForegroundColor Cyan
Write-Host "   Frontend: cd counselflow-app; pnpm dev"
Write-Host "   Backend:  cd backend; .\venv\Scripts\Activate.ps1; uvicorn main:app --reload"
Write-Host ""

Write-Host "📖 Documentation:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000"
Write-Host "   API Docs: http://localhost:8000/api/docs"
Write-Host ""

Write-Host "✨ CounselFlow setup complete!" -ForegroundColor Green
Write-Host "   Edit .env file with your configuration and start the services." -ForegroundColor Yellow
