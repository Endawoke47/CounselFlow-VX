import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { 
  TrendingUp, DollarSign, FileText, Clock, TrendingDown, Search, Filter, Plus, BarChart3, Briefcase,
  Activity, Eye, ChevronRight, Users, Calendar, PieChart, LineChart, Database, Target
} from "lucide-react";

const Dealflow = () => {
  // Professional dealflow analytics
  const dealMetrics = [
    {
      title: "Deal Velocity",
      value: "94.7%",
      change: "+28.4%",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "success" as const,
      description: "Deal flow processing efficiency",
      prediction: "Velocity improvements through automation",
    },
    {
      title: "Total Deal Value",
      value: "$47.8M",
      change: "+42.6%",
      trend: "up" as const,
      icon: DollarSign,
      variant: "default" as const,
      description: "Aggregate deal portfolio value",
      prediction: "Portfolio value expected to grow 15% this quarter",
    },
    {
      title: "Success Rate",
      value: "89.3%",
      change: "+15.7%",
      trend: "up" as const,
      icon: BarChart3,
      variant: "success" as const,
      description: "Deal closure success rate",
      prediction: "Success rate trending upward with improved processes",
    },
    {
      title: "Average Duration",
      value: "67.2d",
      change: "-23.8%",
      trend: "down" as const,
      icon: Clock,
      variant: "success" as const,
      description: "Average deal closure time",
      prediction: "Closure time efficiency optimized",
    },
  ];

  // Enhanced demo deal data with professional fields
  const deals = [
    { 
      id: 1, 
      name: "TechCorp Acquisition", 
      type: "M&A", 
      value: "$12.4M", 
      stage: "Due Diligence", 
      probability: "96.7%", 
      expectedClose: "2025-02-15", 
      lead: "Sarah Johnson",
      confidence: "98.9%",
      dealScore: "A+",
      riskLevel: "Low",
      insights: "High-value acquisition with strong synergies"
    },
    { 
      id: 2, 
      name: "StartupX Investment", 
      type: "Investment", 
      value: "$8.7M", 
      stage: "Negotiation", 
      probability: "89.4%", 
      expectedClose: "2025-01-30", 
      lead: "Michael Chen",
      confidence: "94.2%",
      dealScore: "A",
      riskLevel: "Low",
      insights: "High-growth potential with strong fundamentals"
    },
    { 
      id: 3, 
      name: "FinancePartners JV", 
      type: "Joint Venture", 
      value: "$15.8M", 
      stage: "Legal Review", 
      probability: "97.1%", 
      expectedClose: "2025-02-28", 
      lead: "Emily Davis",
      confidence: "99.3%",
      dealScore: "A+",
      riskLevel: "Very Low",
      insights: "Strategic partnership with excellent prospects"
    },
    { 
      id: 4, 
      name: "RetailCo Asset Deal", 
      type: "Asset Purchase", 
      value: "$6.9M", 
      stage: "Documentation", 
      probability: "82.8%", 
      expectedClose: "2025-03-15", 
      lead: "Robert Wilson",
      confidence: "91.7%",
      dealScore: "B+",
      riskLevel: "Medium",
      insights: "Asset optimization with good return potential"
    },
    { 
      id: 5, 
      name: "CloudSoft Licensing", 
      type: "Licensing", 
      value: "$3.4M", 
      stage: "Initial Review", 
      probability: "73.6%", 
      expectedClose: "2025-04-01", 
      lead: "Lisa Anderson",
      confidence: "87.5%",
      dealScore: "B",
      riskLevel: "Medium",
      insights: "Licensing opportunity with moderate risk"
    },
    {
      id: 6,
      name: "BioTech Merger",
      type: "Merger",
      value: "$22.1M",
      stage: "Analysis",
      probability: "94.8%",
      expectedClose: "2025-03-30",
      lead: "Dr. Amanda Foster",
      confidence: "97.6%",
      dealScore: "A+",
      riskLevel: "Low",
      insights: "High-impact merger with excellent synergies"
    }
  ];

  // Professional StatCard component with analytics
  interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    variant: 'default' | 'success' | 'warning' | 'danger';
    description: string;
    prediction?: string;
  }

  const StatCard = ({ title, value, change, trend, icon: Icon, variant, description, prediction }: StatCardProps) => {
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
                <Target className="w-3 h-3 text-slate-400" />
                <p className="text-xs text-slate-600 font-medium">Prediction:</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">{prediction || "Positive outlook based on current trends"}</p>
            </div>
          </div>
        </div>
      </CorporateCard>
    );
  };

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Professional Header */}
        <div className="relative bg-gradient-to-r from-corporate-600 via-corporate-700 to-corporate-800 rounded-2xl p-8 text-white overflow-hidden">
          {/* Background Effects */}
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
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Dealflow Management
                  </h1>
                  <p className="text-corporate-100 text-lg flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-cyan-300" />
                    <span>Advanced deal intelligence & transaction optimization</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-green-200">System Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <LineChart className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-200">Real-time Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-200">Advanced Analytics</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Briefcase className="w-16 h-16 text-white" />
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
              Add New Deal
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics Dashboard
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
              <PieChart className="w-4 h-4 mr-2" />
              Performance Reports
            </CorporateButton>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealMetrics.map((metric, index) => (
            <StatCard key={index} {...metric} />
          ))}
        </div>

        {/* Advanced Deal Pipeline */}
        <CorporateCard variant="elevated" padding="none" className="shadow-2xl border-slate-200">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-corporate-500 to-corporate-600 rounded-lg">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Deal Pipeline</h3>
                  <p className="text-sm text-slate-600">Advanced deal intelligence & transaction tracking</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm" className="border-slate-200 hover:bg-slate-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="ghost" size="sm" className="border-slate-200 hover:bg-slate-50">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </CorporateButton>
                <CorporateButton variant="primary" size="sm" className="bg-gradient-to-r from-corporate-600 to-corporate-700 hover:from-corporate-700 hover:to-corporate-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Deal
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
                    placeholder="Search deals with advanced filtering..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent bg-white shadow-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <CorporateButton variant="ghost" size="sm" className="border-slate-200">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Sort
                  </CorporateButton>
                  <CorporateButton variant="ghost" size="sm" className="border-slate-200">
                    <PieChart className="w-4 h-4 mr-2" />
                    View Options
                  </CorporateButton>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Showing {deals.length} active deals with confidence scores</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span>Real-time sync active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span>Advanced analytics enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Deal Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Deal Name</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Type</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Value</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Stage</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Confidence</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Probability</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Expected Close</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Lead</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 border-b border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {deals.map((deal) => (
                    <tr key={deal.id} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100/50 transition-all duration-200">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-corporate-100 to-corporate-200 rounded-lg">
                            <Briefcase className="w-4 h-4 text-corporate-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{deal.name}</p>
                            <p className="text-xs text-slate-500">Score: {deal.dealScore}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-corporate-100 to-corporate-200 text-corporate-800 border border-corporate-200">
                          {deal.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-lg font-bold text-slate-900">{deal.value}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                          {deal.stage}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                              style={{ width: deal.confidence }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-slate-700">{deal.confidence}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              style={{ width: deal.probability }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-slate-700">{deal.probability}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{deal.expectedClose}</td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-slate-700">{deal.lead}</p>
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
            
            {/* Analytics Footer */}
            <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-corporate-600" />
                    <span className="text-slate-700">Processing complete</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LineChart className="w-4 h-4 text-yellow-600" />
                    <span className="text-slate-700">Real-time sync active</span>
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

export default Dealflow;
