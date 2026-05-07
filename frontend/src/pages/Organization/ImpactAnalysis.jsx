import React, { useState } from 'react';
import { Leaf, Heart, Droplets, TrendingUp, Info, X, ShieldCheck, Globe, Award, Target } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const ImpactAnalysis = () => {
  const [showCategoryInfo, setShowCategoryInfo] = useState(false);
  const [showSummaryInfo, setShowSummaryInfo] = useState(false);

  const stats = [
    {
      title: 'CO2 Emissions Saved',
      value: '4.2 Tons',
      subtext: '+12% from last month',
      icon: Leaf,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    },
    {
      title: 'Meals Provided',
      value: '12,400',
      subtext: 'Equivalent meals saved',
      icon: Heart,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100'
    },
    {
      title: 'Water Saved',
      value: '500,000 L',
      subtext: 'In food production',
      icon: Droplets,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
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
        <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-xl">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{label || payload[0].name}</p>
          <p className="text-gray-900 text-lg font-black">
            {payload[0].value} {payload[0].name === 'amount' ? 'kg' : '%'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Avant-Garde Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Sustainability & Impact Analytics
            </h1>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl font-medium tracking-wide">
            Detailed tracking of food recovery metrics and environmental sustainability contributions.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden group p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300`}
            >
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-gray-400 text-[10px] font-black mb-1 uppercase tracking-widest">{stat.title}</p>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-1.5">
                    {stat.title === 'CO2 Emissions Saved' && (
                      <TrendingUp size={14} className="text-emerald-500" />
                    )}
                    <span className={`text-xs font-bold ${stat.title === 'CO2 Emissions Saved' ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {stat.subtext}
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.iconColor} border border-white shadow-sm`}>
                  <stat.icon size={28} />
                </div>
              </div>
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bgColor} opacity-20 blur-3xl pointer-events-none group-hover:opacity-40 transition-opacity`} />
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Recovery Growth Chart */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">Food Recovery Growth</h3>
                <p className="text-gray-400 text-sm font-medium">Monthly food saved in kilograms</p>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recoveryData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00000005" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Waste Categories Chart */}
          <div className="relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">Waste Categories</h3>
                <p className="text-gray-400 text-sm font-medium">Distribution of recovered food types</p>
              </div>
              <button 
                onClick={() => setShowCategoryInfo(true)}
                className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer group/btn"
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
                    formatter={(value) => <span className="text-gray-600 text-sm font-black ml-2">{value}</span>}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* In-Card Info Overlay */}
            {showCategoryInfo && (
              <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                <button 
                  onClick={() => setShowCategoryInfo(false)}
                  className="absolute top-6 right-6 p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all"
                >
                  <X size={20} />
                </button>
                
                <div className="p-4 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-6">
                  <ShieldCheck size={40} />
                </div>
                
                <h4 className="text-2xl font-black text-gray-900 mb-4">Category Analytics</h4>
                <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-sm">
                  Percentages reflect total weighted contribution to the ecosystem.
                </p>
                
                <div className="flex flex-col items-center gap-2 mb-8">
                  <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                    <Globe size={14} />
                    Verified Environmental Data
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowCategoryInfo(false)}
                  className="px-10 py-4 rounded-xl bg-gray-900 text-white font-black hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                >
                  Close View
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Grid: Leaderboard & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Top Contributing Partners */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Award size={22} />
              </div>
              <h3 className="text-xl font-black text-gray-900">Top Partners</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Green Valley Farms', kg: '2,450 kg', rank: 1, color: 'text-amber-600', bg: 'bg-amber-50' },
                { name: 'Sunrise Bakery', kg: '1,820 kg', rank: 2, color: 'text-gray-500', bg: 'bg-gray-50' },
                { name: 'City Market Stall #12', kg: '1,400 kg', rank: 3, color: 'text-orange-600', bg: 'bg-orange-50' },
                { name: 'Grand Palace Hotel', kg: '950 kg', rank: 4, color: 'text-blue-600', bg: 'bg-blue-50' },
                { name: 'Lanka Rice Mills', kg: '820 kg', rank: 5, color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map((partner, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:border-gray-300 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${partner.bg} ${partner.color} border border-white shadow-sm`}>
                      {i === 0 ? <Award size={20} /> : `#${partner.rank}`}
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-black group-hover:text-emerald-600 transition-colors">{partner.name}</h4>
                      <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Partner Donor</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-black block">{partner.kg}</span>
                    <span className="text-[9px] text-gray-400 uppercase font-black tracking-tighter">Total Contributed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones Timeline */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Target size={22} />
              </div>
              <h3 className="text-xl font-black text-gray-900">Milestones Timeline</h3>
            </div>
            
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-100">
              {[
                { title: '10 Tons Saved', date: 'Jan 2026', desc: 'Major milestone in food recovery effort.', icon: Globe, color: 'bg-emerald-600', shadow: 'shadow-emerald-100' },
                { title: '50 Partners Joined', date: 'March 2026', desc: 'Growing ecosystem of sustainable donors.', icon: ShieldCheck, color: 'bg-blue-600', shadow: 'shadow-blue-100' },
                { title: '100k Meals Provided', date: 'May 2026', desc: 'Significant impact on local food security.', icon: Heart, color: 'bg-rose-600', shadow: 'shadow-rose-100' },
                { title: 'Regional Expansion', date: 'Upcoming', desc: 'Launching in Southern and Western provinces.', icon: TrendingUp, color: 'bg-gray-800', shadow: 'shadow-gray-100', isFuture: true },
              ].map((milestone, i) => (
                <div key={i} className="relative flex items-start gap-6 group">
                  <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full ${milestone.color} flex items-center justify-center shadow-lg ${milestone.shadow} z-10 transition-transform group-hover:scale-110`}>
                    <milestone.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-black ${milestone.isFuture ? 'text-gray-400' : 'text-gray-900'}`}>{milestone.title}</h4>
                      <span className="text-[9px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{milestone.date}</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Analysis Summary */}
        <div className="relative overflow-hidden bg-white border border-gray-200 rounded-3xl shadow-sm p-8 mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowSummaryInfo(true)}
                  className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Info size={18} />
                </button>
                <h2 className="text-xl font-black text-gray-900">Impact Analysis Summary</h2>
              </div>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed max-w-4xl">
              Our advanced tracking system calculates the environmental benefits of your food redistribution efforts. 
              The metrics shown above are derived from real-time data collected through the Fresh Track platform, 
              accounting for greenhouse gas emission avoidance, water conservation in agriculture, and direct food 
              security improvements.
            </p>

            {/* In-Card Methodology Overlay */}
            {showSummaryInfo && (
              <div className="absolute inset-0 z-30 bg-gray-900/95 backdrop-blur-md p-6 flex items-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                <button 
                  onClick={() => setShowSummaryInfo(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
                
                <div className="flex flex-row items-center gap-8 w-full max-w-5xl mx-auto">
                  <div className="flex-shrink-0 p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/20 shadow-lg">
                    <ShieldCheck size={36} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h4 className="text-lg font-black text-white mb-1">Impact Methodology</h4>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-3xl font-medium">
                      Our metrics use global sustainability standards: 
                      <span className="text-emerald-400 font-bold mx-1">CO2 savings</span>, 
                      <span className="text-rose-400 font-bold mx-1">Meals</span> (0.42kg avg), and 
                      <span className="text-blue-400 font-bold mx-1">Water conservation</span>.
                      Calculations are verified against real-time collection data.
                    </p>
                  </div>

                  <button 
                    onClick={() => setShowSummaryInfo(false)}
                    className="flex-shrink-0 px-6 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-black hover:bg-gray-100 transition-all active:scale-95"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalysis;
