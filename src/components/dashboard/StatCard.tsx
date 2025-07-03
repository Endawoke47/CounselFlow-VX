import React from "react";
import type { DashboardStat } from "@/services/api/index";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface StatCardProps {
  stat: DashboardStat;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  // Enhanced blue-glassmorphic color palette
  const colorClasses = {
    blue: "from-blue-900/80 via-blue-800/60 to-blue-700/80 border-blue-300/30 text-blue-50",
    green: "from-green-900/80 via-green-800/60 to-green-700/80 border-green-300/30 text-green-50",
    red: "from-red-900/80 via-red-800/60 to-red-700/80 border-red-300/30 text-red-50",
    purple: "from-purple-900/80 via-purple-800/60 to-purple-700/80 border-purple-300/30 text-purple-50"
  };

  return (
    <div
      className={`glass backdrop-blur-xl bg-gradient-to-br ${colorClasses[stat.color]} border border-solid shadow-xl shadow-blue-900/10 rounded-2xl p-7 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-700/20 cursor-pointer group opacity-0 tab-fade-in relative overflow-hidden`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
      tabIndex={0}
      aria-label={stat.label}
    >
      {/* Animated glass shine */}
      <span className="absolute inset-0 pointer-events-none animate-glass-shine" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold opacity-80 tracking-wide drop-shadow-sm">
            {stat.label}
          </p>
          <p className="text-4xl font-extrabold mt-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
            {stat.value}
          </p>
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-300 ${stat.trend === 'up' ? 'bg-green-700/30 text-green-100' : 'bg-red-700/30 text-red-100'}`}>
          {stat.trend === 'up' ? (
            <FiTrendingUp className="text-green-300 animate-bounce-up" />
          ) : (
            <FiTrendingDown className="text-red-300 animate-bounce-down" />
          )}
          {stat.change}
        </div>
      </div>
    </div>
  );
};

// Add glass shine and icon bounce animations via Tailwind (add to tailwind.config if not present):
// .animate-glass-shine { background: linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.15) 80%, transparent 100%); animation: glass-shine 2.5s infinite linear; }
// @keyframes glass-shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
// .animate-bounce-up { animation: bounce-up 1.2s infinite alternate; }
// .animate-bounce-down { animation: bounce-down 1.2s infinite alternate; }
// @keyframes bounce-up { 0% { transform: translateY(0); } 100% { transform: translateY(-6px); } }
// @keyframes bounce-down { 0% { transform: translateY(0); } 100% { transform: translateY(6px); } }
