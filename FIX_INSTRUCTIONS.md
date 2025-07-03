# 🔧 CounselFlow Fix Instructions - Step by Step

## Problem Analysis:
1. **Backend**: `/docs` shows "Not Found" because docs are at `/api/docs` OR server has import issues
2. **Frontend**: Shows "Internal Server Error" due to Tailwind CSS and component issues

## 🚀 SOLUTION: Clean Restart

### Step 1: Fix Backend
1. **Stop current server** (Ctrl+C in backend terminal)
2. **Start simple server**:
   ```bash
   cd "c:\Users\Yadel Y. Endawoke\Desktop\CounselFlow\backend"
   python main_simple.py
   ```
3. **Test**: Open http://127.0.0.1:8000/docs (should show FastAPI docs)

### Step 2: Fix Frontend  
1. **Open new terminal**
2. **Navigate to frontend**:
   ```bash
   cd "c:\Users\Yadel Y. Endawoke\Desktop\CounselFlow\counselflow-app"
   ```
3. **Clear cache and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   npm run dev
   ```
4. **Test**: Open http://localhost:3000 (should show clean CounselFlow page)

### Alternative: Manual Steps

#### Backend Manual Start:
```bash
# Terminal 1 - Backend
cd backend
uvicorn main_simple:app --reload --host 127.0.0.1 --port 8000
```

#### Frontend Manual Start:
```bash
# Terminal 2 - Frontend  
cd counselflow-app
npm run dev
```

### 🎯 Expected Results:
- **Backend**: http://127.0.0.1:8000/docs → FastAPI documentation page
- **Frontend**: http://localhost:3000 → Clean CounselFlow welcome page
- **Health**: http://127.0.0.1:8000/health → {"status": "healthy"}

### 🔍 Debug URLs:
- Backend root: http://127.0.0.1:8000/
- Backend docs: http://127.0.0.1:8000/docs  
- Backend health: http://127.0.0.1:8000/health
- Frontend: http://localhost:3000

### 🆘 If Still Not Working:
1. **Check if ports are in use**:
   ```bash
   netstat -ano | findstr :8000
   netstat -ano | findstr :3000
   ```
2. **Kill existing processes** if found
3. **Try different ports**:
   - Backend: `uvicorn main_simple:app --port 8001`
   - Frontend: `npm run dev -- --port 3001`

**Once both are running, we can switch back to the full Dashboard with all enterprise features!** 🚀
