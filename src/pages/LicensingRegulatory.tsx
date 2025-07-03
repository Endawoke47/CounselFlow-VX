import { CorporateLayout } from "@/components/corporate/CorporateLayout";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { 
  Shield, FileText, Clock, AlertTriangle, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Award, 
  Brain, Sparkles, Zap, Target, Cpu, Activity, Eye, ChevronRight, Star, Rocket, Timer, Database,
  Users, Layers, Globe, Settings, Network, Bot, Calendar, Gauge, BookOpen, Scale, Briefcase, Monitor
} from "lucide-react";

const LicensingRegulatory = () => {
  // Advanced AI-driven licensing analytics
  const neuralMetrics = [
    {
      title: "Neural Compliance Matrix",
      value: "98.7%",
      change: "+15.4%",
      trend: "up" as const,
      icon: Brain,
      variant: "success" as const,
      description: "AI-powered regulatory compliance optimization",
      prediction: "Perfect compliance approaching 99.8%",
    },
    {
      title: "Quantum License Velocity",
      value: "94.2%",
      change: "+22.1%",
      trend: "up" as const,
      icon: Zap,
      variant: "default" as const,
      description: "Advanced license processing acceleration",
      prediction: "License flow optimization confirmed",
    },
    {
      title: "Cyber Regulatory Threats",
      value: "7",
      change: "-41.7%",
      trend: "down" as const,
      icon: Shield,
      variant: "warning" as const,
      description: "Real-time regulatory threat monitoring",
      prediction: "Threat mitigation trajectory active",
    },
    {
      title: "Plasma Authority Score",
      value: "96.9",
      change: "+18.3%",
      trend: "up" as const,
      icon: Target,
      variant: "success" as const,
      description: "Multi-dimensional authority relationship tracking",
      prediction: "Authority engagement optimization success",
    },
  ];

  // Enhanced demo license data with more sophisticated fields
  const advancedLicenses = [
    { 
      id: 1, 
      name: "Quantum Financial Services License", 
      authority: "FCA Neural Division", 
      status: "Neural Active", 
      issueDate: "2024-01-15", 
      expiryDate: "2027-01-15", 
      jurisdiction: "UK Quantum Zone", 
      riskLevel: "Ultra-Low",
      aiConfidence: "99.7%",
      complianceScore: "A++",
      renewalProbability: "97.3%"
    },
    { 
      id: 2, 
      name: "Cyber Data Processing License", 
      authority: "ICO AI Bureau", 
      status: "Quantum Renewal", 
      issueDate: "2023-06-10", 
      expiryDate: "2025-06-10", 
      jurisdiction: "UK Digital Realm", 
      riskLevel: "Low",
      aiConfidence: "94.2%",
      complianceScore: "A+",
      renewalProbability: "89.6%"
    },
    { 
      id: 3, 
      name: "Neural Professional Services", 
      authority: "SRA Quantum Hub", 
      status: "Plasma Active", 
      issueDate: "2024-03-20", 
      expiryDate: "2028-03-20", 
      jurisdiction: "England & Wales Neural", 
      riskLevel: "Minimal",
      aiConfidence: "98.9%",
      complianceScore: "S-Tier",
      renewalProbability: "99.1%"
    },
    { 
      id: 4, 
      name: "Quantum Export Authorization", 
      authority: "HMRC Cyber Division", 
      status: "AI Renewal", 
      issueDate: "2023-11-05", 
      expiryDate: "2025-11-05", 
      jurisdiction: "UK Global Network", 
      riskLevel: "Medium",
      aiConfidence: "87.4%",
      complianceScore: "A",
      renewalProbability: "78.3%"
    },
    { 
      id: 5, 
      name: "Plasma Broadcasting License", 
      authority: "Ofcom Neural Network", 
      status: "Quantum Review", 
      issueDate: "2024-08-12", 
      expiryDate: "2026-08-12", 
      jurisdiction: "UK Broadcast Matrix", 
      riskLevel: "Low-Medium",
      aiConfidence: "91.8%",
      complianceScore: "A+",
      renewalProbability: "84.7%"
    },
    {
      id: 6,
      name: "Neural AI Research Permit",
      authority: "DSIT Quantum Labs",
      status: "Plasma Active",
      issueDate: "2024-02-28",
      expiryDate: "2027-02-28",
      jurisdiction: "UK Innovation Zone",
      riskLevel: "Ultra-Low",
      aiConfidence: "99.9%",
      complianceScore: "S-Tier",
      renewalProbability: "99.8%"
    }
  ];

  // Enhanced StatCard component with neural analytics
  const NeuralStatCard = ({ title, value, change, trend, icon: Icon, variant, description, prediction }: any) => {
    const variantStyles = {
      default: 'border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100',
      success: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100',
      warning: 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100',
      danger: 'border-red-200 bg-gradient-to-br from-red-50 to-red-100'
    };

    const iconStyles = {
      default: 'text-slate-600',
      success: 'text-emerald-600',
      warning: 'text-amber-600',
      danger: 'text-red-600'
    };

    const glowStyles = {
      default: 'shadow-slate-200/50',
      success: 'shadow-emerald-200/50',
      warning: 'shadow-amber-200/50',
      danger: 'shadow-red-200/50'
    };

    return (
      <CorporateCard variant="elevated" padding="lg" className={`border-l-4 ${variantStyles[variant]} shadow-lg ${glowStyles[variant]} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-white/60 ${iconStyles[variant]}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">{title}</p>
                <p className="text-xs text-slate-500">{description}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-slate-900">{value}</p>
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
            </div>
            
            <div className="p-2 bg-white/40 rounded-lg border border-slate-200/50">
              <div className="flex items-center space-x-2">
                <Cpu className="w-3 h-3 text-slate-400" />
                <p className="text-xs text-slate-600 font-medium">AI Prediction:</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">{prediction}</p>
            </div>
          </div>
        </div>
      </CorporateCard>
    );
  };

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Enhanced Neural Header */}
        <div className="relative bg-gradient-to-r from-corporate-600 via-corporate-700 to-corporate-800 rounded-2xl p-8 text-white overflow-hidden">
          {/* Neural Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Neural Licensing & Regulatory
                  </h1>
                  <p className="text-corporate-100 text-lg flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-cyan-300" />
                    <span>AI-powered regulatory compliance and licensing management</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-green-200">Neural Engine Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-200">Quantum Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-200">Plasma Analytics</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Activity className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-8 flex flex-wrap gap-4">
            <CorporateButton variant="secondary" size="md" className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Neural License
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Quantum Analytics
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
              <Brain className="w-4 h-4 mr-2" />
              AI Compliance
            </CorporateButton>
          </div>
        </div>

        {/* Neural Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neuralMetrics.map((metric, index) => (
            <NeuralStatCard key={index} {...metric} />
          ))}
        </div>

        {/* Advanced Neural License Registry */}
        <CorporateCard variant="elevated" padding="none" className="shadow-2xl border-slate-200">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-corporate-500 to-corporate-600 rounded-lg">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Neural License Registry</h3>
                  <p className="text-sm text-slate-600">AI-powered licensing intelligence & quantum compliance tracking</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm" className="border-slate-200 hover:bg-slate-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Neural Filter
                </CorporateButton>
                <CorporateButton variant="ghost" size="sm" className="border-slate-200 hover:bg-slate-50">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  AI Analytics
                </CorporateButton>
                <CorporateButton variant="primary" size="sm" className="bg-gradient-to-r from-corporate-600 to-corporate-700 hover:from-corporate-700 hover:to-corporate-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add License
                </CorporateButton>
              </div>
            </div>
          </div>
          <div className="p-6">
            {/* Enhanced Search & Controls */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search neural licenses with AI..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent bg-white shadow-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <CorporateButton variant="ghost" size="sm" className="border-slate-200">
                    <Brain className="w-4 h-4 mr-2" />
                    AI Sort
                  </CorporateButton>
                  <CorporateButton variant="ghost" size="sm" className="border-slate-200">
                    <Zap className="w-4 h-4 mr-2" />
                    Quantum View
                  </CorporateButton>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Showing {advancedLicenses.length} neural licenses with AI confidence scores</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span>Real-time sync active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span>Plasma analytics enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Licenses Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">License Name</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Authority</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">AI Confidence</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Issue Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Expiry Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Jurisdiction</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Risk Level</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {advancedLicenses.map((license) => (
                    <tr key={license.id} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100/50 transition-all duration-200">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-corporate-100 to-corporate-200 rounded-lg">
                            <Award className="w-4 h-4 text-corporate-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{license.name}</p>
                            <p className="text-xs text-slate-500">Score: {license.complianceScore}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-slate-700">{license.authority}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          license.status.includes('Active') ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          license.status.includes('Renewal') || license.status.includes('Review') ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {license.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                              style={{ width: license.aiConfidence }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-slate-700">{license.aiConfidence}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{license.issueDate}</td>
                      <td className="p-4 text-sm text-slate-600">{license.expiryDate}</td>
                      <td className="p-4 text-sm text-slate-600">{license.jurisdiction}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          license.riskLevel.includes('Ultra-Low') || license.riskLevel === 'Minimal' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          license.riskLevel.includes('Low') ? 'bg-green-100 text-green-800 border-green-200' :
                          license.riskLevel.includes('Medium') ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {license.riskLevel}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <CorporateButton variant="ghost" size="sm" className="text-corporate-600 hover:bg-corporate-50">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </CorporateButton>
                          <CorporateButton variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-50">
                            <ChevronRight className="w-4 h-4" />
                          </CorporateButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Neural Analytics Footer */}
            <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-corporate-600" />
                    <span className="text-slate-700">Neural processing complete</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="text-slate-700">Quantum sync active</span>
                  </div>
                </div>
                <div className="text-slate-600">
                  Last updated: <span className="font-medium">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </CorporateCard>
      </div>
    </CorporateLayout>
  );
};

export default LicensingRegulatory;
