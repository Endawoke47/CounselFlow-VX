import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { Shield, AlertTriangle, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3 } from "lucide-react";

const RiskDashboard = () => {
  const stats = [
    {
      title: "Total Risk Items",
      value: "347",
      change: "+12%",
      trend: "up" as const,
      icon: Shield,
      variant: "default" as const,
    },
    {
      title: "High Priority Risks",
      value: "23",
      change: "-8%",
      trend: "down" as const,
      icon: AlertTriangle,
      variant: "danger" as const,
    },
    {
      title: "Risk Score",
      value: "7.2/10",
      change: "+0.3",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "warning" as const,
    },
    {
      title: "Mitigated This Month",
      value: "15",
      change: "+25%",
      trend: "up" as const,
      icon: TrendingDown,
      variant: "success" as const,
    },
  ];

  const riskItems = [
    { id: 1, name: "Operational Risk Assessment", type: "High Priority", status: "In Review", lastUpdated: "2 hours ago", riskLevel: "High" },
    { id: 2, name: "Compliance Risk Audit", type: "Medium Priority", status: "Completed", lastUpdated: "1 day ago", riskLevel: "Medium" },
    { id: 3, name: "Cybersecurity Risk Analysis", type: "High Priority", status: "In Progress", lastUpdated: "3 hours ago", riskLevel: "High" },
    { id: 4, name: "Financial Risk Review", type: "Low Priority", status: "Pending", lastUpdated: "2 days ago", riskLevel: "Low" },
    { id: 5, name: "Legal Risk Assessment", type: "Medium Priority", status: "In Review", lastUpdated: "5 hours ago", riskLevel: "Medium" },
  ];

  const StatCard = ({ title, value, change, trend, icon: Icon, variant }: any) => {
    const variantStyles = {
      default: 'border-slate-200',
      success: 'border-emerald-200 bg-emerald-50/50',
      warning: 'border-amber-200 bg-amber-50/50',
      danger: 'border-red-200 bg-red-50/50'
    };

    const iconStyles = {
      default: 'text-slate-600',
      success: 'text-emerald-600',
      warning: 'text-amber-600',
      danger: 'text-red-600'
    };

    return (
      <CorporateCard variant="elevated" padding="lg" className={`border-l-4 ${variantStyles[variant]}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Icon className={`w-5 h-5 ${iconStyles[variant]}`} />
              <p className="text-sm font-medium text-slate-600">{title}</p>
            </div>
            <div className="space-y-1">
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
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </CorporateCard>
    );
  };

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-corporate-600 to-corporate-700 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Risk Management Dashboard</h1>
              <p className="text-corporate-100 text-lg">
                Monitor and manage organizational risks across all departments
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <CorporateButton variant="secondary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              Add Risk Item
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </CorporateButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Risk Items */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="Risk Items" 
            subtitle="Monitor and manage all organizational risks"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Risk
                </CorporateButton>
              </div>
            }
          />
          <CorporateCardContent className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search risks..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Risk Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Risk Item</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Risk Level</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Last Updated</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {riskItems.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-600">{item.type}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                          item.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.riskLevel}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'In Progress' || item.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{item.lastUpdated}</td>
                      <td className="py-4">
                        <CorporateButton variant="ghost" size="sm">
                          View
                        </CorporateButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </div>
    </CorporateLayout>
  );
};

export default RiskDashboard;
