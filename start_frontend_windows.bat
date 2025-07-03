@echo off
title CounselFlow - AI-Native Legal OS

echo.
echo ================================
echo 🚀 Starting CounselFlow Frontend
echo ================================
echo.

cd /d "c:\Users\Yadel Y. Endawoke\Desktop\CounselFlow\counselflow-app"

echo 📦 Installing dependencies...
call npm install

echo.
echo 🔧 Starting development server...
echo 🌐 Frontend will be available at: http://localhost:3000
echo 📊 Backend API docs available at: http://127.0.0.1:8000/docs
echo.
echo ✨ Opening CounselFlow Dashboard...
echo.

REM Start the development server
call npm run dev

pause
