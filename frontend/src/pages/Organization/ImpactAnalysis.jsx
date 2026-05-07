import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Leaf, Droplets, Wind,
  Calendar, Download, Info, ChevronRight,
  Target, Award, Zap, PieChart
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const ImpactAnalysis = () => {
  const [timeRange, setTimeRange] = useState('This Month');

  // Sample data for impact tracking
  const monthlyData = [
    { name: 'Jan', amount: 450, co2: 120 },
    { name: 'Feb', amount: 380, co2: 95 },
    { name: 'Mar', amount: 520, co2: 145 },
    { name: 'Apr', amount: 480, co2: 130 },
    { name: 'May', amount: 610, co2: 170 },
    { name: 'Jun', amount: 550, co2: 155 },
  ];

  const categoryImpact = [
    { name: 'Vegetables', value: 45, color: '#10b981' },
    { name: 'Bakery', value: 25, color: '#f59e0b' },
    { name: 'Cooked Food', value: 20, color: '#3b82f6' },
    { name: 'Fruits', value: 10, color: '#ef4444' },
  ];

  const stats = [
    { label: 'Total Food Saved', value: '12,450 kg', change: '+12%', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'CO2 Emissions Prevented', value: '3,240 kg', change: '+8%', icon: Wind, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Families Supported', value: '850+', change: '+15%', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-xl">
          <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-black text-gray-900">
            {payload[0].value} {payload[0].name === 'amount' ? 'kg Recovered' : 'kg CO2 Prevented'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Sustainability & Impact Analytics</h1>
            <p className="text-gray-500">Track your organization's contribution to zero hunger and climate action.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm">
              {['Month', 'Quarter', 'Year'].map(range => (
                <button 
                  key={range}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${range === 'Month' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="p-3 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-lg active:scale-95">
              <Download size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <TrendingUp size={12} /> {stat.change}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Recovery Trend */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Food Recovery Trend</h3>
                <p className="text-xs text-gray-500 font-medium">Monthly collection weight (kg)</p>
              </div>
              <div className="p-2 rounded-xl bg-gray-50 text-gray-400">
                <BarChart3 size={20} />
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Waste Composition */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Waste Composition</h3>
                <p className="text-xs text-gray-500 font-medium">Breakdown by food category</p>
              </div>
              <div className="p-2 rounded-xl bg-gray-50 text-gray-400">
                <PieChart size={20} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full h-[250px] md:flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={categoryImpact}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {categoryImpact.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 flex-1 w-full">
                {categoryImpact.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-bold text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global Impact Target */}
        <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-100">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Target size={160} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={20} className="text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">2026 Sustainability Target</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-3xl font-black mb-3">50,000 kg Carbon Reduction</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                  We are on a mission to reach 50 metric tons of carbon offset by the end of this year through efficient redistribution and waste management.
                </p>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-[65%] rounded-full shadow-lg shadow-emerald-500/20" />
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span>32,450 kg achieved</span>
                  <span>65% Completion</span>
                </div>
              </div>
              <button className="px-8 py-4 rounded-2xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl whitespace-nowrap active:scale-95">
                View detailed plan <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalysis;
