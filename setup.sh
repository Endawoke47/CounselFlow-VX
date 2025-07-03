#!/bin/bash

echo "🏛️ CounselFlow Setup Script"
echo "=============================="

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

# Check Docker (optional)
if command -v docker &> /dev/null; then
    echo "✅ Docker detected"
    DOCKER_AVAILABLE=true
else
    echo "⚠️ Docker not found - manual setup only"
    DOCKER_AVAILABLE=false
fi

echo "✅ Prerequisites check complete"

# Setup frontend
echo "Setting up frontend..."
cd counselflow-app
pnpm install
echo "✅ Frontend dependencies installed"

# Setup backend
echo "Setting up backend..."
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "✅ Backend dependencies installed"

# Create environment file
cd ..
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file from template"
    echo "⚠️ Please edit .env with your configuration"
fi

# Database setup instructions
echo ""
echo "🗄️ Database Setup Required:"
echo "1. Install PostgreSQL 15+"
echo "2. Create database: createdb counselflow"
echo "3. Update DATABASE_URL in .env file"
echo ""

# AI setup instructions
echo "🤖 AI Integration (Optional):"
echo "1. Get API keys from OpenAI, Anthropic, or Google"
echo "2. Add them to .env file"
echo "3. AI features will be enabled automatically"
echo ""

# Final instructions
if [ "$DOCKER_AVAILABLE" = true ]; then
    echo "🐳 Quick Start with Docker:"
    echo "   docker-compose up -d"
    echo ""
fi

echo "🚀 Manual Start:"
echo "   Frontend: cd counselflow-app && pnpm dev"
echo "   Backend:  cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo ""

echo "📖 Documentation:"
echo "   Frontend: http://localhost:3000"
echo "   API Docs: http://localhost:8000/api/docs"
echo ""

echo "✨ CounselFlow setup complete!"
echo "   Edit .env file with your configuration and start the services."
