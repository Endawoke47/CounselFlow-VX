# 🚀 CounselFlow Startup Guide

## Current Status
- ✅ **Backend Server**: Running on http://127.0.0.1:8000
- ⏳ **Frontend Server**: Needs to be started on http://localhost:3000

## How to Start CounselFlow

### Step 1: Start the Frontend
Open a **new PowerShell/Command Prompt** window and run:

```bash
cd "c:\Users\Yadel Y. Endawoke\Desktop\CounselFlow\counselflow-app"
npm run dev
```

OR double-click the batch file:
```
c:\Users\Yadel Y. Endawoke\Desktop\CounselFlow\start_frontend_windows.bat
```

### Step 2: Access CounselFlow
Once both servers are running:

🌐 **Main CounselFlow Dashboard**: http://localhost:3000
📊 **Backend API Documentation**: http://127.0.0.1:8000/docs

## What You'll See

### CounselFlow Dashboard Features:
- **Advanced Analytics Dashboard** - Real-time legal analytics
- **Contract Lifecycle Management** - AI-powered contract analysis
- **Matter Management** - Comprehensive case tracking
- **Risk Dashboard** - Risk assessment and monitoring
- **AI Legal Assistant Hub** - Intelligent legal assistance
- **Compliance Monitoring** - Regulatory compliance tracking
- **Document Management** - Version control and collaboration
- **External Legal Databases** - LexisNexis and Westlaw integration
- **Workflow Automation** - Streamlined legal processes

### Key Modules Available:
1. 📄 **Contract Management** - Create, analyze, and manage contracts
2. ⚖️ **Matter Management** - Track cases and legal matters
3. 🛡️ **Risk Dashboard** - Monitor and assess legal risks
4. 🔒 **Data Protection** - Privacy and compliance management
5. 💡 **IP Management** - Intellectual property tracking
6. 🤝 **Dispute Resolution** - Manage legal disputes
7. 💰 **Spend Management** - Track outsourcing costs
8. 📋 **Regulatory Compliance** - Ensure regulatory adherence
9. 📚 **Policy Management** - Manage internal policies
10. 🤖 **AI Assistant** - Intelligent legal support
11. 📊 **Advanced Analytics** - Comprehensive reporting
12. 📁 **Document Control** - Version and access management
13. 📱 **Mobile Optimization** - Mobile-responsive interface
14. 🌐 **External Databases** - Legal research integration
15. ⚙️ **Workflow Automation** - Process automation

## Troubleshooting

### Frontend Not Loading?
1. Make sure Node.js is installed: `node --version`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Backend Issues?
The backend is already running. If you need to restart:
```bash
cd backend
uvicorn main:app --reload
```

### White Screen?
- Updated page.tsx to show Dashboard instead of loading screen
- Make sure both frontend and backend are running
- Check browser console for any errors

## What's New in Phase 4
- ✅ Advanced Analytics Dashboard with real-time data
- ✅ External Legal Database Integration (LexisNexis, Westlaw)
- ✅ Multilingual Testing and QA
- ✅ Enterprise Performance Optimization
- ✅ Production Deployment Ready
- ✅ Comprehensive Monitoring and Alerting
- ✅ Full Documentation Suite

**🎉 CounselFlow is now production-ready with enterprise features!**
