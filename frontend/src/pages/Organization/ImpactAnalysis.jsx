import React, { useState } from 'react';
import { Leaf, Heart, Droplets, TrendingUp, Info, X, ShieldCheck, Globe } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const ImpactAnalysis = () => {
  const [showCategoryInfo, setShowCategoryInfo] = useState(false);

  const stats = [
    {
      title: 'CO2 Emissions Saved',
      value: '4.2 Tons',
      subtext: '+12% from last month',
      icon: Leaf,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      title: 'Meals Provided',
      value: '12,400',
      subtext: 'Equivalent meals saved',
      icon: Heart,
      iconColor: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20'
    },
    {
      title: 'Water Saved',
      value: '500,000 L',
      subtext: 'In food production',
      icon: Droplets,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    }
  ];

  const recoveryData = [
    { month: 'Jan', amount: 400 },
    { month: 'Feb', amount: 700 },
    { month: 'Mar', amount: 600 },
    { month: 'Apr', amount: 850 },
    { month: 'May', amount: 1100 },
    { month: 'Jun', amount: 950 },
    { month: 'Jul', amount: 1300 },
    { month: 'Aug', amount: 1200 },
    { month: 'Sep', amount: 1600 },
    { month: 'Oct', amount: 1800 },
    { month: 'Nov', amount: 2100 },
    { month: 'Dec', amount: 2400 },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 40, color: '#34d399' },
    { name: 'Grains', value: 30, color: '#60a5fa' },
    { name: 'Cooked Food', value: 20, color: '#fbbf24' },
    { name: 'Fruits', value: 10, color: '#f87171' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
          <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest mb-1">{label || payload[0].name}</p>
          <p className="text-white text-lg font-bold">
            {payload[0].value} {payload[0].name === 'amount' ? 'kg Recovered' : '% Share'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0A1128] bg-gradient-to-br from-[#0A1128] via-[#101B3A] to-[#0A1128] -m-6 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Avant-Garde Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300 tracking-tight drop-shadow-sm">
              Sustainability & Impact Analytics
            </h1>
          </div>
          <p className="text-blue-200/60 text-lg max-w-2xl font-light tracking-wide">
            Detailed tracking of food recovery metrics and environmental sustainability contributions.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden group p-6 bg-white/[0.03] backdrop-blur-2xl border ${stat.borderColor} rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/[0.05] transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-200/50 text-sm font-medium mb-1 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-1.5">
                    {stat.title === 'CO2 Emissions Saved' && (
                      <TrendingUp size={14} className="text-emerald-400" />
                    )}
                    <span className={`text-xs font-medium ${stat.title === 'CO2 Emissions Saved' ? 'text-emerald-400' : 'text-blue-200/40'}`}>
                      {stat.subtext}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.iconColor}`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-current opacity-[0.03] blur-3xl pointer-events-none group-hover:opacity-[0.05] transition-opacity" />
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Recovery Growth Chart */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Food Recovery Growth</h3>
                <p className="text-blue-200/40 text-sm">Monthly food saved in kilograms</p>
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recoveryData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b860', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    hide 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Waste Categories Chart */}
          <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Waste Categories</h3>
                <p className="text-blue-200/40 text-sm">Distribution of recovered food types</p>
              </div>
              <button 
                onClick={() => setShowCategoryInfo(true)}
                className="p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer group/btn"
              >
                <Info size={20} className="group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
            <div className="h-[300px] w-full flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="middle" 
                    align="right" 
                    layout="vertical"
                    formatter={(value) => <span className="text-blue-200/70 text-sm font-medium ml-2">{value}</span>}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* In-Card Info Prompt */}
            {showCategoryInfo && (
              <div className="absolute inset-0 z-30 bg-[#0f172a]/95 backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                <button 
                  onClick={() => setShowCategoryInfo(false)}
                  className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
                
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                  <ShieldCheck size={32} />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4">Waste Category Classification</h4>
                <p className="text-slate-300 leading-relaxed mb-8 max-w-sm">
                  These categories are determined by analyzing donation entries. 
                  Percentages reflect the total weight (kg) of food recovered this year.
                </p>
                
                <div className="flex flex-col items-center gap-2 mb-8">
                  <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                    <Globe size={14} />
                    Verified Real-time Data
                  </div>
                  <span className="text-slate-500 text-[10px] uppercase tracking-widest">Updated daily</span>
                </div>
                
                <button 
                  onClick={() => setShowCategoryInfo(false)}
                  className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  Close Detail
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.05] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Info size={18} />
                </div>
                <h2 className="text-xl font-bold text-white">Impact Analysis Summary</h2>
              </div>
            </div>
            <p className="text-blue-100/80 leading-relaxed max-w-4xl">
              Our advanced tracking system calculates the environmental benefits of your food redistribution efforts. 
              The metrics shown above are derived from real-time data collected through the Fresh Track platform, 
              accounting for greenhouse gas emission avoidance, water conservation in agriculture, and direct food 
              security improvements.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalysis;
