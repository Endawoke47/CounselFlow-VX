import React, { useState } from 'react'
import { CorporateLayout } from "@/components/corporate/CorporateLayout"
import { CorporateCard } from "@/components/corporate/CorporateCard"
import { CorporateButton } from "@/components/corporate/CorporateButton"
import { DollarSign, TrendingUp, TrendingDown, Users, PieChart, Search, Filter, Plus, BarChart3, Brain, Sparkles, Zap, Target, Activity, Eye, Settings } from "lucide-react"

const OutsourcedMattersSpend = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    {
      title: "Quantum Legal Spend",
      value: "$12.4M",
      change: "+45%",
      trend: "up" as const,
      icon: DollarSign,
      variant: "default" as const,
    },
    {
      title: "AI-Verified Vendors",
      value: "87",
      change: "+23",
      trend: "up" as const,
      icon: Users,
      variant: "success" as const,
    },
    {
      title: "Neural Cost Optimization",
      value: "$145K",
      change: "-32%",
      trend: "down" as const,
      icon: Brain,
      variant: "success" as const,
    },
    {
      title: "Budget Variance",
      value: "+12%",
      change: "+5%",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "warning" as const,
    },
  ];

  const matters = [
    { id: 1, matter: "Contract Dispute - TechCorp", vendor: "Smith & Associates", spend: "$125,000", budget: "$100,000", status: "Active", variance: "+25%" },
    { id: 2, matter: "Employment Law Case", vendor: "Legal Partners LLC", spend: "$85,000", budget: "$90,000", status: "Completed", variance: "-6%" },
    { id: 3, matter: "IP Litigation", vendor: "Intellectual Law Firm", spend: "$200,000", budget: "$180,000", status: "Active", variance: "+11%" },
    { id: 4, matter: "Merger & Acquisition", vendor: "Corporate Law Group", spend: "$450,000", budget: "$400,000", status: "Active", variance: "+13%" },
    { id: 5, matter: "Regulatory Compliance", vendor: "Compliance Experts", spend: "$75,000", budget: "$80,000", status: "Completed", variance: "-6%" },
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
                <span className="text-sm text-slate-500">vs last quarter</span>
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
              <h1 className="text-3xl font-bold mb-2">Outsourced Matters & Spend</h1>
              <p className="text-corporate-100 text-lg">
                Track external legal spend and vendor performance across all matters
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <CorporateButton variant="secondary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              Add Matter
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Spend Report
            </CorporateButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Matters and Spend */}
        <CorporateCard variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Outsourced Matters</h2>
              <p className="text-sm text-slate-600">Track spend and performance of external legal matters</p>
            </div>
            <div className="flex space-x-2">
              <CorporateButton variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </CorporateButton>
              <CorporateButton variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Matter
              </CorporateButton>
            </div>
          </div>
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search matters or vendors..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Matters Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Matter</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Vendor</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actual Spend</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Budget</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Variance</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {matters.map((matter) => (
                    <tr key={matter.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{matter.matter}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-slate-600">{matter.vendor}</p>
                      </td>
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{matter.spend}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-slate-600">{matter.budget}</p>
                      </td>
                      <td className="py-4">
                        <span className={`text-sm font-medium ${
                          matter.variance.startsWith('+') ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {matter.variance}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          matter.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {matter.status}
                        </span>
                      </td>
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
          </div>
        </CorporateCard>
      </div>
    </CorporateLayout>
  );
};

export default OutsourcedMattersSpend;
