@echo off
echo 🏛️ Starting CounselFlow - AI-Native Legal Operating System
echo ============================================================
echo.

cd /d "%~dp0"
echo Current directory: %CD%
echo.

echo 📊 Checking system status...
node --version
npm --version
echo.

echo 🚀 Starting CounselFlow development server...
echo 🌐 Opening: http://localhost:3000
echo.
echo 🎯 CounselFlow Features:
echo    • AI Legal Assistant Hub
echo    • Contract Lifecycle Management
echo    • Risk Dashboard ^& Compliance
echo    • Matter Management
echo    • Data Protection ^& Privacy
echo    • IP Management
echo    • Corporate Legal Operations
echo    • Employment ^& Labor Law
echo    • Legal Analytics ^& BI
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:3000
npx next dev

pause
