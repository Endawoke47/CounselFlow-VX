import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { 
  CheckSquare, Clock, AlertTriangle, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Calendar,
  Brain, Zap, Target, Cpu, Activity, Shield, Eye, ChevronRight, Star, Award, Rocket, Timer,
  Users, FileText, Layers, Globe, Settings, Database, Network, Bot
} from "lucide-react";

const TaskManagement = () => {
  // Advanced AI-driven analytics data
  const aiMetrics = [
    {
      title: "Neural Task Optimization",
      value: "97.3%",
      change: "+12.4%",
      trend: "up" as const,
      icon: Brain,
      variant: "success" as const,
      description: "AI-driven task prioritization efficiency",
      prediction: "Expected 99.1% by Q2",
    },
    {
      title: "Quantum Completion Rate",
      value: "89.7%",
      change: "+8.2%",
      trend: "up" as const,
      icon: Zap,
      variant: "default" as const,
      description: "Advanced completion analytics",
      prediction: "Target: 92% this quarter",
    },
    {
      title: "Cyber Threat Tasks",
      value: "23",
      change: "-15.3%",
      trend: "down" as const,
      icon: Shield,
      variant: "warning" as const,
      description: "Security-related task load",
      prediction: "Decreasing trend confirmed",
    },
    {
      title: "Plasma Efficiency Index",
      value: "94.8",
      change: "+23.1%",
      trend: "up" as const,
      icon: Target,
      variant: "success" as const,
      description: "Multi-dimensional task performance",
      prediction: "Peak efficiency approaching",
    },
  ];

  // Enhanced demo data with futuristic elements
  const enhancedTasks = [
    { 
      id: 1, 
      title: "Quantum Contract Analysis - NeuralCorp AI Division", 
      assignee: "Dr. Sarah Vex", 
      priority: "Plasma",
      status: "Neural Processing", 
      dueDate: "2024-01-15", 
      category: "Quantum Legal",
      aiConfidence: 94.7,
      complexity: "Multi-dimensional",
      threatLevel: "Low",
      neuralActivity: 87.3,
      quantumStage: "Phase 3",
    },
    { 
      id: 2, 
      title: "Cyber-Securities Board Nexus Preparation", 
      assignee: "Commander Chen-X7", 
      priority: "Neural",
      status: "Quantum Sync", 
      dueDate: "2024-01-18", 
      category: "Corporate Matrix",
      aiConfidence: 92.1,
      complexity: "Advanced",
      threatLevel: "Medium",
      neuralActivity: 91.2,
      quantumStage: "Phase 2",
    },
    { 
      id: 3, 
      title: "Plasma IP Patent - Dimensional Portal Tech", 
      assignee: "Prof. Emily Neo", 
      priority: "Quantum",
      status: "Completed", 
      dueDate: "2024-01-12", 
      category: "Dimensional IP",
      aiConfidence: 99.8,
      complexity: "Quantum-level",
      threatLevel: "Critical",
      neuralActivity: 96.7,
      quantumStage: "Phase 4",
    },
    { 
      id: 4, 
      title: "Neural Compliance Audit - AI Ethics Protocol", 
      assignee: "Advisor Wilson-AI", 
      priority: "Cyber",
      status: "Neural Processing", 
      dueDate: "2024-01-20", 
      category: "AI Compliance",
      aiConfidence: 88.3,
      complexity: "Neural-complex",
      threatLevel: "High",
      neuralActivity: 82.9,
      quantumStage: "Phase 2",
    },
    { 
      id: 5, 
      title: "Quantum Vendor Agreement - Fusion Energy Corp", 
      assignee: "Agent Lisa Nyx", 
      priority: "Standard",
      status: "Cyber Review", 
      dueDate: "2024-01-25", 
      category: "Quantum Procurement",
      aiConfidence: 91.5,
      complexity: "Standard",
      threatLevel: "Low",
      neuralActivity: 75.4,
      quantumStage: "Phase 1",
    },
    { 
      id: 6, 
      title: "Plasma Merger Analysis - TechNova Acquisition", 
      assignee: "Director Kate Zephyr", 
      priority: "Plasma",
      status: "Neural Processing", 
      dueDate: "2024-01-22", 
      category: "M&A Neural",
      aiConfidence: 96.2,
      complexity: "Multi-dimensional",
      threatLevel: "Medium",
      neuralActivity: 93.8,
      quantumStage: "Phase 3",
    },
  ];

  // AI Insights Data
  const businessInsights = [
    {
      title: "Neural Productivity Surge",
      description: "AI algorithms predict 34% efficiency increase in Q2 based on current task completion patterns.",
      confidence: 92.7,
      category: "Performance",
      icon: Rocket,
    },
    {
      title: "Quantum Bottleneck Detection",
      description: "Advanced analytics identified potential delays in cyber-security review processes.",
      confidence: 87.3,
      category: "Risk",
      icon: AlertTriangle,
    },
    {
      title: "Plasma Resource Optimization",
      description: "Machine learning suggests redistributing 3 high-priority tasks for optimal neural flow.",
      confidence: 94.1,
      category: "Optimization",
      icon: Settings,
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

  const TaskCard = ({ task }: { task: any }) => {
    const priorityStyles = {
      'Plasma': 'bg-purple-100 text-purple-800 border-purple-200',
      'Quantum': 'bg-blue-100 text-blue-800 border-blue-200',
      'Neural': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Cyber': 'bg-green-100 text-green-800 border-green-200',
      'Standard': 'bg-gray-100 text-gray-800 border-gray-200',
    };

    const statusStyles = {
      'Completed': 'bg-emerald-100 text-emerald-800',
      'Neural Processing': 'bg-blue-100 text-blue-800',
      'Quantum Sync': 'bg-purple-100 text-purple-800',
      'Cyber Review': 'bg-green-100 text-green-800',
      'Pending': 'bg-gray-100 text-gray-800'
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
            <p className="font-medium text-slate-900">{task.title}</p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Brain className="w-3 h-3" />
              <span>AI Confidence: {task.aiConfidence}%</span>
              <span>•</span>
              <span>Neural: {task.neuralActivity}%</span>
            </div>
          </div>
        </td>
        <td className="py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-corporate-100 to-corporate-200 rounded-full flex items-center justify-center border-2 border-corporate-300">
              <span className="text-xs font-bold text-corporate-700">
                {task.assignee.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">{task.assignee}</p>
              <p className="text-xs text-slate-500">{task.quantumStage}</p>
            </div>
          </div>
        </td>
        <td className="py-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800 border">
            {task.category}
          </span>
        </td>
        <td className="py-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${priorityStyles[task.priority as keyof typeof priorityStyles] || 'bg-gray-100 text-gray-800'}`}>
            {task.priority}
          </span>
        </td>
        <td className="py-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[task.status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
            {task.status}
          </span>
        </td>
        <td className="py-4">
          <div className="space-y-1">
            <p className="text-sm text-slate-600">{task.dueDate}</p>
            <p className={`text-xs font-medium ${threatStyles[task.threatLevel as keyof typeof threatStyles]}`}>
              {task.threatLevel} Threat
            </p>
          </div>
        </td>
        <td className="py-4">
          <div className="flex space-x-1">
            <CorporateButton variant="ghost" size="sm" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              Analyze
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
                    <CheckSquare className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">Neural Task Command</h1>
                    <p className="text-slate-200 text-lg">Advanced AI-driven task orchestration and quantum analytics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>Neural Activity: 94.3%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Cpu className="w-4 h-4" />
                    <span>Quantum Processing: Active</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Network className="w-4 h-4" />
                    <span>Cyber-Neural Sync: Online</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <Brain className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-xs font-medium">AI Nexus</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <CorporateButton variant="secondary" size="md" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Plus className="w-4 h-4 mr-2" />
                Neural Task Creation
              </CorporateButton>
              <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
                <Calendar className="w-4 h-4 mr-2" />
                Quantum Calendar
              </CorporateButton>
              <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics Portal
              </CorporateButton>
            </div>
          </div>
        </div>

        {/* AI-Driven Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiMetrics.map((metric, index) => (
            <StatCard key={index} {...metric} />
          ))}
        </div>

        {/* AI Insights Panel */}
        <CorporateCard variant="elevated" padding="none" className="bg-gradient-to-br from-slate-50 to-white">
          <CorporateCardHeader 
            title="Neural Intelligence Center" 
            subtitle="Advanced AI insights and predictive analytics for task optimization"
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

        {/* Enhanced Tasks Management Interface */}
        <CorporateCard variant="elevated" padding="none" className="bg-gradient-to-br from-white to-slate-50">
          <CorporateCardHeader 
            title="Quantum Task Matrix" 
            subtitle="Advanced neural task management with AI-powered insights and predictive analytics"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Neural Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm" className="bg-gradient-to-r from-corporate-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Neural Task
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
                  placeholder="Neural search across quantum task dimensions..."
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
                  <span className="text-slate-600">Plasma Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-600">Quantum Tasks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                  <span className="text-slate-600">Neural Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-slate-600">Cyber Security</span>
                </div>
              </div>
            </div>

            {/* Enhanced Tasks Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50/80">
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Neural Task Matrix</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Quantum Agent</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Category</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Priority Level</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Neural Status</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Temporal Data</th>
                    <th className="text-left pb-4 pt-3 px-2 text-sm font-bold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enhancedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Analytics Footer */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-corporate-600">{enhancedTasks.length}</p>
                  <p className="text-xs text-slate-600">Active Neural Tasks</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-600">94.7%</p>
                  <p className="text-xs text-slate-600">AI Optimization</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600">87.3%</p>
                  <p className="text-xs text-slate-600">Quantum Efficiency</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-purple-600">12.4min</p>
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

export default TaskManagement;
