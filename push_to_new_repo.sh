#!/bin/bash

echo "🚀 Pushing CounselFlow-Vx to GitHub..."

# Push to the new repository
git push -u new-origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to CounselFlow-Vx repository!"
    echo "🔗 Repository URL: https://github.com/Endawoke47/CounselFlow-Vx"
    echo ""
    echo "🎯 What was deployed:"
    echo "   ✅ Military-grade security enhancements"
    echo "   ✅ TypeScript strict mode and comprehensive type definitions"
    echo "   ✅ Performance optimizations with React.memo and lazy loading"
    echo "   ✅ Comprehensive error handling and resilience"
    echo "   ✅ Complete testing infrastructure"
    echo "   ✅ Monitoring and observability systems"
    echo "   ✅ Production-ready deployment configuration"
    echo "   ✅ Complete security and deployment documentation"
    echo ""
    echo "🔐 Security Features:"
    echo "   • Attorney-client privilege cryptographic protection"
    echo "   • Multi-factor authentication"
    echo "   • Comprehensive input validation"
    echo "   • Real-time security monitoring"
    echo "   • Audit logging and compliance"
    echo ""
    echo "⚡ Performance Features:"
    echo "   • Optimized React components"
    echo "   • Lazy loading and code splitting"
    echo "   • Database query optimization"
    echo "   • Real-time monitoring"
else
    echo "❌ Failed to push. Please ensure:"
    echo "   1. Repository 'CounselFlow-Vx' exists on GitHub"
    echo "   2. You have push permissions"
    echo "   3. Your GitHub credentials are configured"
fi