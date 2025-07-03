import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { 
  BookOpen, FileText, Users, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Star,
  Brain, Zap, Target, Cpu, Activity, Eye, ChevronRight, Rocket, Timer, Database, 
  Layers, Globe, Settings, Network, Bot, Calendar, Gauge, Scale, Briefcase, Monitor, Lightbulb
} from "lucide-react";

const KnowledgeManagement = () => {
  // Advanced AI-driven knowledge analytics
  const neuralMetrics = [
    {
      title: "Neural Knowledge Index",
      value: "97.8%",
      change: "+18.4%",
      trend: "up" as const,
      icon: Brain,
      variant: "success" as const,
      description: "AI-powered knowledge optimization",
      prediction: "Knowledge efficiency approaching 99.1%",
    },
    {
      title: "Quantum Content Velocity",
      value: "92.6%",
      change: "+14.7%",
      trend: "up" as const,
      icon: Zap,
      variant: "default" as const,
      description: "Advanced content discovery acceleration",
      prediction: "Content flow optimization confirmed",
    },
    {
      title: "Cyber Learning Acceleration",
      value: "89.3%",
      change: "+21.2%",
      trend: "up" as const,
      icon: Rocket,
      variant: "success" as const,
      description: "Real-time learning enhancement",
      prediction: "Learning velocity surge detected",
    },
    {
      title: "Plasma Intelligence Score",
      value: "95.4",
      change: "+16.8%",
      trend: "up" as const,
      icon: Target,
      variant: "success" as const,
      description: "Multi-dimensional intelligence tracking",
      prediction: "Peak intelligence efficiency incoming",
    },
  ];

  // Enhanced demo data with futuristic knowledge elements
  const quantumDocuments = [
    { 
      id: 1, 
      title: "Neural Employment Law - Plasma Best Practices", 
      category: "Quantum Legal Guides", 
      author: "Dr. Sarah Neural-X", 
      lastUpdated: "2 neural cycles ago", 
      views: 2847, 
      rating: 4.96,
      aiComplexity: 94.7,
      neuralActivity: 91.8,
      quantumStage: "Phase 4",
      knowledgeDepth: "Ultra-Deep",
      intelligenceLevel: 9.6,
      downloadCount: 1456,
      jurisdiction: "Global Neural Network",
      contributorLevel: "Quantum Expert",
    },
    { 
      id: 2, 
      title: "Quantum Contract Negotiation - Neural Strategies Matrix", 
      category: "Cyber Templates", 
      author: "Commander Chen-Z9", 
      lastUpdated: "1 plasma week ago", 
      views: 4289, 
      rating: 4.98,
      aiComplexity: 96.3,
      neuralActivity: 94.2,
      quantumStage: "Phase 4",
      knowledgeDepth: "Quantum-Level",
      intelligenceLevel: 9.8,
      downloadCount: 2178,
      jurisdiction: "Inter-Dimensional Legal",
      contributorLevel: "Plasma Master",
    },
    { 
      id: 3, 
      title: "Cyber Data Privacy - Quantum Compliance Neural Framework", 
      category: "Neural Compliance", 
      author: "Prof. Emily Quantum", 
      lastUpdated: "3 cyber days ago", 
      views: 3201, 
      rating: 4.92,
      aiComplexity: 98.1,
      neuralActivity: 96.7,
      quantumStage: "Phase 4",
      knowledgeDepth: "Multi-Dimensional",
      intelligenceLevel: 9.9,
      downloadCount: 1789,
      jurisdiction: "EU Cyber Territory",
      contributorLevel: "Neural Sage",
    },
    { 
      id: 4, 
      title: "Plasma IP Protection - Quantum Shield Guidelines", 
      category: "Cyber Legal Guides", 
      author: "Director Wilson-AI", 
      lastUpdated: "5 quantum days ago", 
      views: 2134, 
      rating: 4.87,
      aiComplexity: 92.8,
      neuralActivity: 89.5,
      quantumStage: "Phase 3",
      knowledgeDepth: "Advanced",
      intelligenceLevel: 9.2,
      downloadCount: 1267,
      jurisdiction: "US Neural Division",
      contributorLevel: "Cyber Expert",
    },
    { 
      id: 5, 
      title: "Neural M&A Playbook - Quantum Acquisition Matrix", 
      category: "Plasma Procedures", 
      author: "Agent Lisa Nexus", 
      lastUpdated: "1 neural day ago", 
      views: 1798, 
      rating: 4.94,
      aiComplexity: 95.6,
      neuralActivity: 92.1,
      quantumStage: "Phase 4",
      knowledgeDepth: "Ultra-Deep",
      intelligenceLevel: 9.7,
      downloadCount: 987,
      jurisdiction: "Global Cyber Network",
      contributorLevel: "Quantum Master",
    },
    { 
      id: 6, 
      title: "Cyber Litigation Strategy - Neural Warfare Protocols", 
      category: "Quantum Procedures", 
      author: "Captain Kate Vortex", 
      lastUpdated: "4 plasma hours ago", 
      views: 3567, 
      rating: 4.99,
      aiComplexity: 97.9,
      neuralActivity: 95.8,
      quantumStage: "Phase 4",
      knowledgeDepth: "Quantum-Level",
      intelligenceLevel: 9.9,
      downloadCount: 2345,
      jurisdiction: "Inter-Galactic Legal",
      contributorLevel: "Plasma Legend",
    },
  ];

  // AI Insights for Knowledge Management
  const businessInsights = [
    {
      title: "Neural Content Clustering",
      description: "AI identified 7 knowledge gaps that could be filled to increase team efficiency by 28%.",
      confidence: 94.2,
      category: "Optimization",
      icon: Brain,
    },
    {
      title: "Quantum Learning Patterns",
      description: "Advanced algorithms predict 67% faster knowledge acquisition with personalized neural paths.",
      confidence: 91.8,
      category: "Learning",
      icon: Lightbulb,
    },
    {
      title: "Plasma Knowledge Flow",
      description: "Machine learning suggests restructuring 4 document categories for 43% better discoverability.",
      confidence: 88.6,
      category: "Structure",
      icon: Database,
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

  const DocumentCard = ({ document }: { document: any }) => {
    const categoryStyles = {
      'Quantum Legal Guides': 'bg-purple-100 text-purple-800 border-purple-200',
      'Cyber Templates': 'bg-green-100 text-green-800 border-green-200',
      'Neural Compliance': 'bg-blue-100 text-blue-800 border-blue-200',
      'Cyber Legal Guides': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Plasma Procedures': 'bg-pink-100 text-pink-800 border-pink-200',
      'Quantum Procedures': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };

    const depthStyles = {
      'Ultra-Deep': 'bg-purple-100 text-purple-800',
      'Quantum-Level': 'bg-blue-100 text-blue-800',
      'Multi-Dimensional': 'bg-indigo-100 text-indigo-800',
      'Advanced': 'bg-green-100 text-green-800'
    };

    const contributorStyles = {
      'Plasma Legend': 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800',
      'Plasma Master': 'bg-purple-100 text-purple-800',
      'Quantum Master': 'bg-blue-100 text-blue-800',
      'Neural Sage': 'bg-indigo-100 text-indigo-800',
      'Quantum Expert': 'bg-cyan-100 text-cyan-800',
      'Cyber Expert': 'bg-green-100 text-green-800'
    };

    return (
      <tr className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-all duration-200">
        <td className="py-4">
          <div className="space-y-1">
            <p className="font-medium text-slate-900">{document.title}</p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Brain className="w-3 h-3" />
              <span>AI Complexity: {document.aiComplexity}%</span>
              <span>•</span>
              <span>Neural: {document.neuralActivity}%</span>
            </div>
          </div>
        </td>
        <td className="py-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${categoryStyles[document.category as keyof typeof categoryStyles] || 'bg-gray-100 text-gray-800'}`}>
            {document.category}
          </span>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="font-medium text-slate-900">{document.author}</p>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${contributorStyles[document.contributorLevel as keyof typeof contributorStyles]}`}>
              {document.contributorLevel}
            </span>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="text-sm text-slate-600">{document.lastUpdated}</p>
            <p className="text-xs text-slate-500">{document.quantumStage}</p>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">{document.views.toLocaleString()} views</p>
            <p className="text-xs text-slate-600">{document.downloadCount} downloads</p>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-amber-500 fill-current" />
              <span className="text-sm font-medium text-slate-700">{document.rating}</span>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${depthStyles[document.knowledgeDepth as keyof typeof depthStyles]}`}>
              {document.knowledgeDepth}
            </span>
          </div>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Lightbulb className="w-3 h-3 text-purple-500" />
              <span className="text-sm font-medium text-slate-700">{document.intelligenceLevel}/10</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${document.intelligenceLevel * 10}%` }}
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
        <div className="bg-gradient-to-r from-slate-900 via-corporate-700 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">Neural Knowledge Command</h1>
                    <p className="text-slate-200 text-lg">Advanced AI-driven knowledge orchestration and quantum intelligence management</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>Knowledge Neural Activity: 97.8%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Cpu className="w-4 h-4" />
                    <span>Quantum Learning: Active</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Network className="w-4 h-4" />
                    <span>Cyber-Knowledge Sync: Online</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <Database className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-xs font-medium">Knowledge Nexus</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <CorporateButton variant="secondary" size="md" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Plus className="w-4 h-4 mr-2" />
                Neural Knowledge Creation
              </CorporateButton>
              <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
                <BarChart3 className="w-4 h-4 mr-2" />
                Quantum Intelligence Hub
              </CorporateButton>
              <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
                <Brain className="w-4 h-4 mr-2" />
                AI Learning Portal
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
            subtitle="Advanced AI insights and predictive analytics for knowledge optimization"
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

        {/* Enhanced Knowledge Management Interface */}
        <CorporateCard variant="elevated" padding="none" className="bg-gradient-to-br from-white to-slate-50">
          <CorporateCardHeader 
            title="Quantum Knowledge Matrix" 
            subtitle="Advanced neural knowledge management with AI-powered intelligence tracking and predictive analytics"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Neural Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm" className="bg-gradient-to-r from-corporate-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Neural Knowledge
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
                  placeholder="Neural search across quantum knowledge dimensions..."
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
                  <span className="text-slate-600">Quantum Guides</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-slate-600">Cyber Templates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-600">Neural Compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-slate-600">Plasma Procedures</span>
                </div>
              </div>
            </div>

            {/* Enhanced Documents Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50/80">
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Neural Document</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Category</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Quantum Author</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Temporal Data</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Engagement</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Rating</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Intelligence</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quantumDocuments.map((document) => (
                    <DocumentCard key={document.id} document={document} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Analytics Footer */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-corporate-600">{quantumDocuments.length}</p>
                  <p className="text-xs text-slate-600">Active Neural Documents</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-600">16.1K</p>
                  <p className="text-xs text-slate-600">Total Quantum Views</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-purple-600">4.94</p>
                  <p className="text-xs text-slate-600">Avg Neural Rating</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600">9.6/10</p>
                  <p className="text-xs text-slate-600">Intelligence Level</p>
                </div>
              </div>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </div>
    </CorporateLayout>
  );
};

export default KnowledgeManagement;
