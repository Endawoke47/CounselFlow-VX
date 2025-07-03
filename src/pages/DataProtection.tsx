import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { 
  Shield, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Users,
  Target, Activity, Eye, ChevronRight, Star, Timer, Lock, Unlock,
  Layers, Globe, Settings, Database, Network, Calendar, Gauge, BookOpen, Scale, Briefcase, Monitor
} from "lucide-react";

const DataProtection = () => {
  // Advanced data protection analytics
  const complianceMetrics = [
    {
      title: "Privacy Compliance Index",
      value: "98.6%",
      change: "+7.4%",
      trend: "up" as const,
      icon: Shield,
      variant: "success" as const,
      description: "Privacy compliance optimization",
      prediction: "Perfect compliance approaching 99.8%",
    },
    {
      title: "Data Processing Efficiency",
      value: "91.2%",
      change: "+11.7%",
      trend: "up" as const,
      icon: Activity,
      variant: "default" as const,
      description: "Advanced data processing efficiency",
      prediction: "Data flow optimization confirmed",
    },
    {
      title: "Security Threat Alerts",
      value: "3",
      change: "-67.8%",
      trend: "down" as const,
      icon: Shield,
      variant: "warning" as const,
      description: "Real-time threat monitoring",
      prediction: "Threat reduction trajectory active",
    },
    {
      title: "Overall Compliance Score",
      value: "96.8",
      change: "+14.2%",
      trend: "up" as const,
      icon: Target,
      variant: "success" as const,
      description: "Multi-dimensional compliance tracking",
      prediction: "Peak compliance efficiency incoming",
    },
  ];

  // Enhanced demo data with professional data protection elements
  const dataRequests = [
    { 
      id: 1, 
      type: "Data Access Request", 
      subject: "Dr. Alexandra Neo", 
      email: "alex.neo@neuraldyne.com", 
      status: "Processing", 
      priority: "High", 
      submitted: "2 days ago",
      complexity: 92.4,
      processingLevel: 88.7,
      stage: "Phase 3",
      threatLevel: "Medium",
      complianceScore: 94.6,
      dataVolume: "2.3TB",
      jurisdiction: "EU Region",
    },
    { 
      id: 2, 
      type: "Data Deletion Request", 
      subject: "Commander Jane Vex", 
      email: "jane.vex@cyberops.com", 
      status: "Processing", 
      priority: "High", 
      submitted: "1 day ago",
      complexity: 96.1,
      processingLevel: 93.8,
      stage: "Phase 4",
      threatLevel: "High",
      complianceScore: 97.2,
      dataVolume: "5.7TB",
      jurisdiction: "Global Network",
    },
    { 
      id: 3, 
      type: "Data Rectification Request", 
      subject: "Agent Bob Quantum", 
      email: "bob.q@plasmatech.io", 
      status: "Complete", 
      priority: "Medium", 
      submitted: "1 week ago",
      complexity: 87.3,
      processingLevel: 91.5,
      stage: "Phase 4",
      threatLevel: "Low",
      complianceScore: 98.9,
      dataVolume: "1.1TB",
      jurisdiction: "US Division",
    },
    { 
      id: 4, 
      type: "Data Portability Request", 
      subject: "Prof. Alice Cyber", 
      email: "alice.c@quantumlabs.net", 
      status: "Pending", 
      priority: "Standard", 
      submitted: "3 days ago",
      complexity: 89.7,
      processingLevel: 86.2,
      stage: "Phase 2",
      threatLevel: "Medium",
      complianceScore: 92.4,
      dataVolume: "3.8TB",
      jurisdiction: "Asia-Pacific",
    },
    { 
      id: 5, 
      type: "Data Subject Objection", 
      subject: "Director Charlie Plasma", 
      email: "charlie.p@neuralware.com", 
      status: "Review", 
      priority: "High", 
      submitted: "5 hours ago",
      complexity: 94.8,
      processingLevel: 95.3,
      stage: "Phase 3",
      threatLevel: "Critical",
      complianceScore: 96.7,
      dataVolume: "8.2TB",
      jurisdiction: "International",
    },
    { 
      id: 6, 
      type: "Consent Management Request", 
      subject: "Agent Diana Neural", 
      email: "diana.n@cybersec.org", 
      status: "Active", 
      priority: "High", 
      submitted: "12 hours ago",
      complexity: 91.6,
      processingLevel: 89.4,
      stage: "Phase 3",
      threatLevel: "Medium",
      complianceScore: 95.1,
      dataVolume: "4.6TB",
      jurisdiction: "EU Territory",
    },
  ];

  // Analytics Insights for Data Protection
  const analyticsInsights = [
    {
      title: "Compliance Process Optimization",
      description: "Analytics identified 6 process improvements that could boost compliance scores by 12% within one month.",
      confidence: 95.7,
      category: "Optimization",
      icon: Target,
    },
    {
      title: "Security Threat Prediction",
      description: "Advanced algorithms predict 89% reduction in data breach risks with new security protocols.",
      confidence: 92.3,
      category: "Security",
      icon: Shield,
    },
    {
      title: "Data Processing Efficiency",
      description: "Machine learning suggests consolidating 4 data requests for 34% faster processing times.",
      confidence: 88.9,
      category: "Efficiency",
      icon: Activity,
    },
  ];

  const StatCard = ({ title, value, change, trend, icon: Icon, variant, description, prediction }: any) => {
    const variantStyles = {
      default: 'border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100',
      success: 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100',
      warning: 'border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100',
      danger: 'border-red-300 bg-gradient-to-br from-red-50 to-red-100'
    };

    const iconStyles = {
      default: 'text-slate-600',
      success: 'text-emerald-600',
      warning: 'text-amber-600',
      danger: 'text-red-600'
    };

    return (
      <CorporateCard variant="elevated" padding="lg" className={`border-l-4 ${variantStyles[variant]} hover:shadow-xl transition-all duration-300`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-white/60 ${iconStyles[variant]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">{title}</p>
                <p className="text-xs text-slate-500">{description}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {change}
                </span>
              </div>
              <span className="text-xs text-slate-500">neural period</span>
            </div>
            <div className="bg-white/40 rounded-lg p-2">
              <p className="text-xs text-slate-600 font-medium">AI Prediction:</p>
              <p className="text-xs text-slate-500">{prediction}</p>
            </div>
          </div>
        </div>
      </CorporateCard>
    );
  };

  const DataRequestCard = ({ request }: { request: any }) => {
    const statusStyles = {
      'Processing': 'bg-blue-100 text-blue-800',
      'Complete': 'bg-green-100 text-green-800',
      'Pending': 'bg-amber-100 text-amber-800',
      'Review': 'bg-purple-100 text-purple-800',
      'Active': 'bg-cyan-100 text-cyan-800'
    };

    const priorityStyles = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-amber-100 text-amber-800 border-amber-200',
      'Low': 'bg-green-100 text-green-800 border-green-200',
      'Standard': 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const threatStyles = {
      'Low': 'text-green-600',
      'Medium': 'text-amber-600',
      'High': 'text-red-600',
      'Critical': 'text-red-700 font-bold'
    };

    return (
      <tr className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-all duration-200">
        <td className="py-4">
          <div className="space-y-1">
            <p className="font-medium text-slate-900">{request.type}</p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Activity className="w-3 h-3" />
              <span>Complexity: {request.complexity}%</span>
              <span>•</span>
              <span>Processing: {request.processingLevel}%</span>
            </div>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="font-medium text-slate-900">{request.subject}</p>
            <p className="text-sm text-slate-600">{request.email}</p>
            <p className="text-xs text-slate-500">{request.jurisdiction}</p>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[request.status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
              {request.status}
            </span>
            <p className="text-xs text-slate-500">{request.stage}</p>
          </div>
        </td>
        <td className="py-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${priorityStyles[request.priority as keyof typeof priorityStyles] || 'bg-gray-100 text-gray-800'}`}>
            {request.priority}
          </span>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="text-sm text-slate-600">{request.submitted}</p>
            <p className={`text-xs font-medium ${threatStyles[request.threatLevel as keyof typeof threatStyles]}`}>
              {request.threatLevel} Risk
            </p>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">{request.dataVolume}</p>
            <div className="flex items-center space-x-1">
              <Gauge className="w-3 h-3 text-green-600" />
              <span className="text-xs text-slate-600">{request.complianceScore}%</span>
            </div>
          </div>
        </td>
        <td className="py-4">
          <div className="flex space-x-1">
            <CorporateButton variant="ghost" size="sm" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              View Details
            </CorporateButton>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Enhanced Header with Futuristic Design */}
        <div className="bg-gradient-to-r from-slate-900 via-corporate-700 to-green-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">Neural Data Protection Command</h1>
                    <p className="text-slate-200 text-lg">Advanced AI-driven privacy orchestration and quantum compliance management</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>Privacy Neural Activity: 96.8%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Cpu className="w-4 h-4" />
                    <span>Quantum Protection: Active</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Network className="w-4 h-4" />
                    <span>Cyber-Privacy Sync: Online</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <Lock className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-xs font-medium">Privacy Nexus</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <CorporateButton variant="secondary" size="md" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Plus className="w-4 h-4 mr-2" />
                Neural Request Processing
              </CorporateButton>
              <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
                <BarChart3 className="w-4 h-4 mr-2" />
                Quantum Compliance Hub
              </CorporateButton>
              <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
                <Brain className="w-4 h-4 mr-2" />
                AI Privacy Portal
              </CorporateButton>
            </div>
          </div>
        </div>

        {/* Compliance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceMetrics.map((metric, index) => (
            <StatCard key={index} {...metric} />
          ))}
        </div>

        {/* AI Insights Panel */}
        <CorporateCard variant="elevated" padding="none" className="bg-gradient-to-br from-slate-50 to-white">
          <CorporateCardHeader 
            title="Neural Intelligence Center" 
            subtitle="Advanced AI insights and predictive analytics for data protection optimization"
            action={
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-corporate-600" />
                <span className="text-sm font-medium text-corporate-600">AI Active</span>
              </div>
            }
          />
          <CorporateCardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analyticsInsights.map((insight, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-corporate-100 rounded-lg">
                      <insight.icon className="w-5 h-5 text-corporate-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full">
                          {insight.category}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CorporateCardContent>
        </CorporateCard>

        {/* Enhanced Data Requests Management Interface */}
        <CorporateCard variant="elevated" padding="none" className="bg-gradient-to-br from-white to-slate-50">
          <CorporateCardHeader 
            title="Quantum Data Request Matrix" 
            subtitle="Advanced neural data protection with AI-powered privacy compliance and predictive analytics"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Neural Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm" className="bg-gradient-to-r from-corporate-600 to-green-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Process Neural Request
                </CorporateButton>
              </div>
            }
          />
          <CorporateCardContent className="p-6">
            {/* Enhanced Search with AI Features */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Neural search across quantum privacy dimensions..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Brain className="w-4 h-4" />
                    <span>AI Enhanced</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-slate-600">Cyber Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-600">Neural Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-600">Quantum Complete</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="text-slate-600">Pending Review</span>
                </div>
              </div>
            </div>

            {/* Enhanced Data Requests Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50/80">
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Neural Request Type</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Data Subject</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Quantum Status</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Priority</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Temporal Data</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Data Metrics</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quantumDataRequests.map((request) => (
                    <DataRequestCard key={request.id} request={request} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Analytics Footer */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-corporate-600">{quantumDataRequests.length}</p>
                  <p className="text-xs text-slate-600">Active Neural Requests</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-600">25.7TB</p>
                  <p className="text-xs text-slate-600">Total Data Volume</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-purple-600">95.7%</p>
                  <p className="text-xs text-slate-600">Avg Compliance Score</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600">6.4min</p>
                  <p className="text-xs text-slate-600">Avg Neural Response</p>
                </div>
              </div>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </div>
    </CorporateLayout>
  );
};

export default DataProtection;
