# CounselFlow - AI-Native Legal Operating System

🏛️ **Enterprise-grade AI-powered legal technology platform with advanced analytics and modern UI/UX**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)

CounselFlow is a comprehensive, AI-native legal operating system featuring advanced analytics, intelligent automation, and a modern, responsive interface. Built for enterprise legal departments and law firms seeking cutting-edge technology solutions.

## ✨ Key Features

### 🤖 AI-Powered Intelligence
- **Advanced AI Legal Assistant** with natural language processing
- **Intelligent Document Automation** with smart templates
- **Legal Research Integration** with multiple database sources
- **Multilingual Translation & QA** for global operations
- **Predictive Analytics** for case outcomes and risk assessment

### 📊 Advanced Analytics Dashboard
- **Real-time Performance Metrics** and KPI tracking
- **Interactive Data Visualizations** with modern charts
- **Custom Report Generation** with export capabilities
- **Trend Analysis** and predictive insights
- **Resource Utilization** monitoring and optimization

### 🏢 Enterprise Features
- **Case Management** with workflow automation
- **Document Repository** with AI-powered search
- **Team Collaboration** tools and communication
- **Compliance Monitoring** across multiple jurisdictions
- **Risk Assessment** and mitigation strategies
- **Client Portal** with secure access

### 🎨 Modern UI/UX
- **Responsive Design** optimized for all devices
- **Dark/Light Theme** support
- **Professional Interface** with intuitive navigation
- **Real-time Updates** and notifications
- **Accessibility Compliant** (WCAG 2.1)
- **Mobile-First** approach

## 🛠️ Technology Stack

### Frontend Architecture
- **Next.js 14** with App Router and TypeScript
- **React 18** with modern hooks and server components
- **Custom UI Components** with professional design system
- **Responsive Layout** with mobile-first approach
- **Real-time Updates** via WebSocket connections

### Backend Architecture
- **FastAPI** with async/await and automatic OpenAPI docs
- **SQLAlchemy 2.0** with async ORM and migrations
- **Redis** for caching, sessions, and background tasks
- **Celery** for distributed task processing
- **JWT Authentication** with role-based access control

### AI & Machine Learning
- **OpenAI GPT-4** integration for intelligent assistance
- **LangChain** for document processing and analysis
- **Vector Databases** for semantic search capabilities
- **Natural Language Processing** for legal document understanding
- **Machine Learning Models** for predictive analytics

### Infrastructure & DevOps
- **Docker** containerization with multi-stage builds
- **PostgreSQL** with advanced indexing and partitioning
- **Prometheus & Grafana** for monitoring and alerting
- **Nginx** reverse proxy with SSL termination
- **Environment-based Configuration** for different deployments

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+** with pip
- **Node.js 18+** with npm or yarn
- **PostgreSQL 15+** database server
- **Redis 6+** for caching
- **Git** for version control

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/counselflow.git
   cd counselflow
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your database and API keys
   ```

4. **Database Initialization**
   ```bash
   python init_db.py
   ```

5. **Start Backend Server**
   ```bash
   python main.py
   # Server will start at http://localhost:8000
   # API documentation: http://localhost:8000/docs
   ```

6. **Frontend Setup (New Terminal)**
   ```bash
   cd counselflow-app
   npm install
   npm run dev
   # Frontend will start at http://localhost:3000
   ```

### Production Deployment

#### Docker Compose (Recommended)
```bash
# Copy production environment
cp .env.production.template .env.production
# Edit .env.production with your production values

# Deploy with monitoring
docker-compose -f docker-compose.production.yml up -d
```

#### Manual Production Setup
```bash
# Run the automated deployment script
python deploy_full_production.py
```

## 📱 Screenshots

### Advanced Analytics Dashboard
- Real-time metrics and performance indicators
- Interactive charts and data visualizations
- Customizable reporting and insights

### AI Legal Assistant Hub
- Natural language legal queries
- Document analysis and summarization
- Intelligent recommendations and guidance

### Modern Responsive Interface
- Professional design with dark/light themes
- Mobile-optimized for on-the-go access
- Intuitive navigation and user experience

## 🏗️ Project Structure

```
counselflow/
├── backend/                    # FastAPI backend application
│   ├── app/
│   │   ├── api/v1/routes/     # API endpoint routes
│   │   ├── services/          # Business logic services
│   │   ├── models/            # Database models
│   │   ├── schemas/           # Pydantic schemas
│   │   └── core/              # Core configuration
│   ├── main.py                # Application entry point
│   ├── requirements.txt       # Python dependencies
│   └── init_db.py            # Database initialization
├── counselflow-app/           # Next.js frontend application
│   ├── src/
│   │   ├── app/               # Next.js app router pages
│   │   ├── components/        # React components
│   │   │   ├── ui/           # UI component library
│   │   │   └── modules/      # Feature modules
│   │   └── lib/              # Utility functions
│   ├── package.json          # Node.js dependencies
│   └── next.config.js        # Next.js configuration
├── monitoring/               # Prometheus & Grafana setup
├── docs/                    # Documentation files
├── docker-compose.yml       # Development environment
├── docker-compose.production.yml  # Production environment
└── .env.example            # Environment template
```

## 🔧 API Documentation

### Core Endpoints

#### Authentication
- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/me` - Current user profile

#### Analytics
- `GET /api/v1/analytics/dashboard` - Dashboard metrics
- `GET /api/v1/analytics/performance` - Performance data
- `GET /api/v1/analytics/reports` - Custom reports

#### Legal Databases
- `GET /api/v1/legal-databases/search` - Legal research
- `GET /api/v1/legal-databases/cases` - Case law lookup
- `GET /api/v1/legal-databases/statutes` - Statute search

#### AI Assistant
- `POST /api/v1/ai/chat` - Natural language queries
- `POST /api/v1/ai/analyze` - Document analysis
- `GET /api/v1/ai/suggestions` - AI recommendations

### Interactive API Documentation
Visit `http://localhost:8000/docs` when running the backend server for full interactive API documentation with request/response examples.

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest test_enterprise_features.py -v
python check_services.py
```

### Frontend Tests
```bash
cd counselflow-app
npm run test
npm run test:e2e
```

### Integration Tests
```bash
python quick_test.py
python launch_demo.py
```

## 📊 Monitoring & Observability

### Health Checks
- `GET /health` - Application health status
- `GET /health/db` - Database connectivity
- `GET /health/redis` - Redis connectivity

### Metrics Collection
- **Prometheus** metrics at `/metrics`
- **Grafana** dashboards for visualization
- **Custom alerts** for system monitoring
- **Performance tracking** with detailed analytics

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Role-Based Access Control** (RBAC)
- **Input Validation** and sanitization
- **SQL Injection** protection
- **XSS Protection** headers
- **CORS Configuration** for secure API access
- **Rate Limiting** on API endpoints
- **Audit Logging** for compliance

## 🌍 Multilingual Support

- **Real-time Translation** for global teams
- **Legal Document Translation** with context awareness
- **Multi-language UI** support
- **Localized Legal Content** by jurisdiction

## 📖 Documentation

- [**User Manual**](USER_MANUAL.md) - End-user guide
- [**API Documentation**](PHASE4_DOCUMENTATION.md) - Technical reference
- [**Deployment Guide**](PRODUCTION_DEPLOYMENT_GUIDE.md) - Production setup
- [**Troubleshooting**](FIX_INSTRUCTIONS.md) - Common issues and solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- 📧 Email: support@counselflow.com
- 💬 Issues: [GitHub Issues](https://github.com/yourusername/counselflow/issues)
- 📚 Documentation: [Wiki](https://github.com/yourusername/counselflow/wiki)

## 🚀 Roadmap

### Phase 5 - Advanced Features (Planned)
- [ ] Advanced ML models for legal prediction
- [ ] Blockchain integration for smart contracts
- [ ] Voice-to-text legal dictation
- [ ] Advanced workflow automation
- [ ] Third-party integrations (Salesforce, Microsoft 365)

### Phase 6 - Enterprise Scale (Planned)
- [ ] Multi-tenant architecture
- [ ] Advanced analytics and BI
- [ ] Enterprise SSO integration
- [ ] Advanced compliance features
- [ ] White-label solutions

---

**Built with ❤️ for the legal technology community**

*Transforming legal operations with AI-powered innovation*
