import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { 
  Shield, TrendingUp, TrendingDown, Clock, Award, Search, Filter, Plus, BarChart3,
  Brain, Zap, Target, Cpu, Activity, Eye, ChevronRight, Star, Rocket, Timer,
  Users, Layers, Globe, Settings, Database, Network, Bot, AlertTriangle, Calendar,
  Lock, Unlock, Gauge, BookOpen, Scale, Briefcase, Monitor, HardDrive, Wifi, Gem
} from "lucide-react";

const IPManagement = () => {
  // Advanced AI-driven IP analytics
  const neuralMetrics = [
    {
      title: "Neural IP Portfolio Index",
      value: "97.4%",
      change: "+16.8%",
      trend: "up" as const,
      icon: Brain,
      variant: "success" as const,
      description: "AI-powered IP portfolio optimization",
      prediction: "Peak innovation efficiency at 99.2%",
    },
    {
      title: "Quantum Patent Velocity",
      value: "89.6%",
      change: "+12.3%",
      trend: "up" as const,
      icon: Zap,
      variant: "default" as const,
      description: "Advanced patent filing acceleration",
      prediction: "Patent flow optimization trending",
    },
    {
      title: "Cyber IP Threats",
      value: "14",
      change: "-28.7%",
      trend: "down" as const,
      icon: Shield,
      variant: "warning" as const,
      description: "IP security threat monitoring",
      prediction: "Threat mitigation successful",
    },
    {
      title: "Plasma Innovation Score",
      value: "94.1",
      change: "+31.4%",
      trend: "up" as const,
      icon: Target,
      variant: "success" as const,
      description: "Multi-dimensional innovation tracking",
      prediction: "Innovation surge confirmed",
    },
  ];

  // Enhanced demo data with futuristic IP assets
  const quantumIPAssets = [
    { 
      id: 1, 
      title: "Neural AI-Powered Legal Quantum Algorithm", 
      type: "Plasma Patent", 
      status: "Quantum Granted", 
      filingDate: "2023-03-15", 
      expiryDate: "2043-03-15", 
      jurisdiction: "Global Quantum Zone",
      aiComplexity: 96.7,
      neuralActivity: 94.3,
      quantumStage: "Phase 4",
      threatLevel: "Critical-Secure",
      innovationScore: 9.4,
      marketValue: "$2.8M",
      licensingPotential: "Ultra-High",
    },
    { 
      id: 2, 
      title: "CounselFlow Neural Nexus™", 
      type: "Cyber Trademark", 
      status: "Neural Registered", 
      filingDate: "2023-01-10", 
      expiryDate: "2033-01-10", 
      jurisdiction: "Omni-Dimensional",
      aiComplexity: 87.2,
      neuralActivity: 91.8,
      quantumStage: "Phase 3",
      threatLevel: "Medium",
      innovationScore: 8.7,
      marketValue: "$5.6M",
      licensingPotential: "High",
    },
    { 
      id: 3, 
      title: "Quantum Document Automation Matrix", 
      type: "Neural Patent", 
      status: "Cyber Pending", 
      filingDate: "2024-02-20", 
      expiryDate: "TBD - Quantum Processing", 
      jurisdiction: "US Cyber Division",
      aiComplexity: 93.1,
      neuralActivity: 88.6,
      quantumStage: "Phase 2",
      threatLevel: "High",
      innovationScore: 9.1,
      marketValue: "$1.9M",
      licensingPotential: "Very High",
    },
    { 
      id: 4, 
      title: "Plasma Legal Analytics Neural Engine", 
      type: "Quantum Copyright", 
      status: "Plasma Registered", 
      filingDate: "2023-06-05", 
      expiryDate: "Life + Quantum Extension", 
      jurisdiction: "EU Neural Territory",
      aiComplexity: 98.4,
      neuralActivity: 96.2,
      quantumStage: "Phase 4",
      threatLevel: "Low",
      innovationScore: 9.8,
      marketValue: "$4.2M",
      licensingPotential: "Ultra-High",
    },
    { 
      id: 5, 
      title: "Smart Contract Neural Templates - Plasma Edition", 
      type: "Cyber Trade Secret", 
      status: "Neural Protected", 
      filingDate: "2023-08-12", 
      expiryDate: "Quantum Indefinite", 
      jurisdiction: "Internal Neural Network",
      aiComplexity: 91.7,
      neuralActivity: 85.3,
      quantumStage: "Phase 3",
      threatLevel: "Medium",
      innovationScore: 8.9,
      marketValue: "$3.1M",
      licensingPotential: "High",
    },
    { 
      id: 6, 
      title: "Blockchain Legal Framework - Quantum Protocol", 
      type: "Plasma Patent", 
      status: "Neural Active", 
      filingDate: "2024-01-08", 
      expiryDate: "2044-01-08", 
      jurisdiction: "Global Cyber Network",
      aiComplexity: 95.3,
      neuralActivity: 92.7,
      quantumStage: "Phase 4",
      threatLevel: "Critical-Secure",
      innovationScore: 9.6,
      marketValue: "$6.7M",
      licensingPotential: "Ultra-High",
    },
  ];

  // AI Insights for IP Management
  const businessInsights = [
    {
      title: "Neural Patent Clustering",
      description: "AI identified 4 patent applications that could be bundled for 47% faster approval rates.",
      confidence: 94.8,
      category: "Optimization",
      icon: Brain,
    },
    {
      title: "Quantum Market Analysis",
      description: "Advanced algorithms predict $2.3M additional licensing revenue from emerging neural markets.",
      confidence: 89.2,
      category: "Revenue",
      icon: TrendingUp,
    },
    {
      title: "Cyber Threat Assessment",
      description: "Machine learning detected 3 potential IP infringement risks requiring immediate neural analysis.",
      confidence: 96.1,
      category: "Security",
      icon: Shield,
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
              <span className="text-xs text-slate-500">neural cycle</span>
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

  const IPAssetCard = ({ asset }: { asset: any }) => {
    const statusStyles = {
      'Quantum Granted': 'bg-green-100 text-green-800',
      'Neural Registered': 'bg-blue-100 text-blue-800',
      'Cyber Pending': 'bg-amber-100 text-amber-800',
      'Plasma Registered': 'bg-purple-100 text-purple-800',
      'Neural Protected': 'bg-indigo-100 text-indigo-800',
      'Neural Active': 'bg-cyan-100 text-cyan-800'
    };

    const typeStyles = {
      'Plasma Patent': 'bg-purple-100 text-purple-800 border-purple-200',
      'Cyber Trademark': 'bg-green-100 text-green-800 border-green-200',
      'Neural Patent': 'bg-blue-100 text-blue-800 border-blue-200',
      'Quantum Copyright': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Cyber Trade Secret': 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const threatStyles = {
      'Low': 'text-green-600',
      'Medium': 'text-amber-600',
      'High': 'text-red-600',
      'Critical-Secure': 'text-purple-600 font-bold'
    };

    const potentialStyles = {
      'Ultra-High': 'bg-purple-100 text-purple-800',
      'Very High': 'bg-blue-100 text-blue-800',
      'High': 'bg-green-100 text-green-800',
      'Medium': 'bg-amber-100 text-amber-800'
    };

    return (
      <tr className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-all duration-200">
        <td className="py-4">
          <div className="space-y-1">
            <p className="font-medium text-slate-900">{asset.title}</p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Brain className="w-3 h-3" />
              <span>AI Complexity: {asset.aiComplexity}%</span>
              <span>•</span>
              <span>Neural: {asset.neuralActivity}%</span>
            </div>
          </div>
        </td>
        <td className="py-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${typeStyles[asset.type as keyof typeof typeStyles] || 'bg-gray-100 text-gray-800'}`}>
            {asset.type}
          </span>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[asset.status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
              {asset.status}
            </span>
            <p className="text-xs text-slate-500">{asset.quantumStage}</p>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="text-sm text-slate-600">{asset.filingDate}</p>
            <p className="text-xs text-slate-500">{asset.expiryDate}</p>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="text-sm text-slate-600">{asset.jurisdiction}</p>
            <p className={`text-xs font-medium ${threatStyles[asset.threatLevel as keyof typeof threatStyles]}`}>
              {asset.threatLevel}
            </p>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">{asset.marketValue}</p>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${potentialStyles[asset.licensingPotential as keyof typeof potentialStyles]}`}>
              {asset.licensingPotential}
            </span>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-amber-500" />
              <span className="text-sm font-medium text-slate-700">{asset.innovationScore}/10</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                style={{ width: `${asset.innovationScore * 10}%` }}
              />
            </div>
          </div>
        </td>
        <td className="py-4">
          <div className="flex space-x-1">
            <CorporateButton variant="ghost" size="sm" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              Neural View
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
        <div className="bg-gradient-to-r from-slate-900 via-corporate-700 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Gem className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">Neural IP Command</h1>
                    <p className="text-slate-200 text-lg">Advanced AI-driven intellectual property orchestration and quantum innovation management</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>IP Neural Activity: 94.7%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Cpu className="w-4 h-4" />
                    <span>Quantum Innovation: Active</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Network className="w-4 h-4" />
                    <span>Cyber-IP Sync: Online</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <Shield className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-xs font-medium">IP Nexus</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <CorporateButton variant="secondary" size="md" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Plus className="w-4 h-4 mr-2" />
                Neural IP Creation
              </CorporateButton>
              <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
                <BarChart3 className="w-4 h-4 mr-2" />
                Quantum Portfolio
              </CorporateButton>
              <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
                <Brain className="w-4 h-4 mr-2" />
                AI Innovation Hub
              </CorporateButton>
            </div>
          </div>
        </div>

        {/* Neural Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neuralMetrics.map((metric, index) => (
            <StatCard key={index} {...metric} />
          ))}
        </div>

        {/* AI Insights Panel */}
        <CorporateCard variant="elevated" padding="none" className="bg-gradient-to-br from-slate-50 to-white">
          <CorporateCardHeader 
            title="Neural Intelligence Center" 
            subtitle="Advanced AI insights and predictive analytics for IP optimization"
            action={
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-corporate-600" />
                <span className="text-sm font-medium text-corporate-600">AI Active</span>
              </div>
            }
          />
          <CorporateCardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businessInsights.map((insight, index) => (
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

        {/* Enhanced IP Assets Management Interface */}
        <CorporateCard variant="elevated" padding="none" className="bg-gradient-to-br from-white to-slate-50">
          <CorporateCardHeader 
            title="Quantum IP Portfolio Matrix" 
            subtitle="Advanced neural IP management with AI-powered innovation tracking and predictive analytics"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Neural Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm" className="bg-gradient-to-r from-corporate-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Neural IP
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
                  placeholder="Neural search across quantum IP dimensions..."
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
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-600">Plasma Patents</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-slate-600">Cyber Trademarks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-600">Neural Assets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                  <span className="text-slate-600">Quantum Rights</span>
                </div>
              </div>
            </div>

            {/* Enhanced IP Assets Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50/80">
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Neural IP Asset</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Type</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Quantum Status</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Temporal Data</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Jurisdiction</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Market Data</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Innovation</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quantumIPAssets.map((asset) => (
                    <IPAssetCard key={asset.id} asset={asset} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Analytics Footer */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-corporate-600">{quantumIPAssets.length}</p>
                  <p className="text-xs text-slate-600">Active Neural IPs</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-600">$23.3M</p>
                  <p className="text-xs text-slate-600">Portfolio Value</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-purple-600">9.1/10</p>
                  <p className="text-xs text-slate-600">Avg Innovation Score</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600">94.7%</p>
                  <p className="text-xs text-slate-600">Neural Efficiency</p>
                </div>
              </div>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </div>
    </CorporateLayout>
  );
};

export default IPManagement;
