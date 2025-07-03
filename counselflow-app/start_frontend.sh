#!/bin/bash

echo "🚀 Starting CounselFlow - AI-Native Legal OS"
echo "============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the counselflow-app directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Starting development server..."
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "📊 Backend API docs available at: http://127.0.0.1:8000/docs"
echo ""
echo "✨ Opening CounselFlow Dashboard..."

# Start the development server
npm run dev
