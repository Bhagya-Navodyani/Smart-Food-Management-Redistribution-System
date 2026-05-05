import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, ClipboardList, TrendingUp, Users, Calendar, ArrowRight, Award, MapPin, Sparkles, Plus, FileText, Search } from 'lucide-react';

const OrganizationDashboard = () => {
  const navigate = useNavigate();

  const recentActivities = [
    { id: 1, date: '2026-05-03', item: 'Fresh Organic Tomatoes', quantity: '45 kg', status: 'Completed' },
    { id: 2, date: '2026-05-02', item: 'Whole Wheat Bread', quantity: '30 loaves', status: 'Pending' },
    { id: 3, date: '2026-05-01', item: 'Mixed Vegetable Scraps', quantity: '120 kg', status: 'Completed' },
    { id: 4, date: '2026-04-28', item: 'Cooked Fried Rice Leftovers', quantity: '25 kg', status: 'Pending' },
    { id: 5, date: '2026-04-25', item: 'Fresh Apples & Bananas', quantity: '55 kg', status: 'Completed' }
  ];

  const regionalDistribution = [
    { name: 'Colombo', percentage: 40, color: 'bg-emerald-500' },
    { name: 'Kandy', percentage: 25, color: 'bg-blue-500' },
    { name: 'Galle', percentage: 20, color: 'bg-orange-500' },
    { name: 'Gampaha', percentage: 15, color: 'bg-fuchsia-500' }
  ];

  const topDonors = [
    { name: 'Grand Palace Hotel', category: 'Hotel / Restaurant', donations: '850 kg' },
    { name: 'Keells Super', category: 'Supermarket', donations: '620 kg' },
    { name: 'Sunrise Bakery', category: 'Local Bakery', donations: '340 kg' },
    { name: 'City Market Stall #12', category: 'Market Vendor', donations: '290 kg' }
  ];

  return (
    <div className="min-h-screen bg-[#0A1128] bg-gradient-to-br from-[#0A1128] via-[#101B3A] to-[#0A1128] -m-6 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Avant-Garde Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300 tracking-tight drop-shadow-sm leading-tight pb-3 px-1">
              Organization Dashboard
            </h1>
            <p className="text-blue-200/60 text-lg max-w-2xl font-light tracking-wide px-1">
              Welcome to the Smart Food Management & Redistribution System Organization Portal.
            </p>
          </div>
        </header>

        {/* 4 Premium Summary Cards with modern layout and subtle shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Green theme */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] hover:border-emerald-500/40 hover:bg-white/[0.06] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl group-hover:scale-105 transition-all">
                <Gift size={24} />
              </div>
              <div className="opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all text-emerald-400">
                <Gift size={48} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-blue-200/50 uppercase tracking-widest mb-2 select-none">Total Food Donations</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-white">128</p>
                <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">↑ +12%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Blue theme */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] hover:border-blue-500/40 hover:bg-white/[0.06] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl group-hover:scale-105 transition-all">
                <ClipboardList size={24} />
              </div>
              <div className="opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all text-blue-400">
                <ClipboardList size={48} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-blue-200/50 uppercase tracking-widest mb-2 select-none">Active Requests</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-white">12</p>
                <span className="text-xs text-blue-400 font-medium bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded">5 pending</span>
              </div>
            </div>
          </div>

          {/* Card 3: Orange theme */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] hover:border-orange-500/40 hover:bg-white/[0.06] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-xl group-hover:scale-105 transition-all">
                <TrendingUp size={24} />
              </div>
              <div className="opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all text-orange-400">
                <TrendingUp size={48} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-blue-200/50 uppercase tracking-widest mb-2 select-none">Impact (kg Saved)</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-white">1,450 kg</p>
                <span className="text-xs text-orange-400 font-medium bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded">Goal: 2k</span>
              </div>
            </div>
          </div>

          {/* Card 4: Purple theme */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] hover:border-fuchsia-500/40 hover:bg-white/[0.06] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-400 rounded-xl group-hover:scale-105 transition-all">
                <Users size={24} />
              </div>
              <div className="opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all text-fuchsia-400">
                <Users size={48} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-blue-200/50 uppercase tracking-widest mb-2 select-none">Partner Organizations</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-white">8</p>
                <span className="text-xs text-fuchsia-400 font-medium bg-fuchsia-500/10 border border-fuchsia-500/20 px-1.5 py-0.5 rounded">4 regions</span>
              </div>
            </div>
          </div>
        </div>

        {/* 'Recent Activity' Table Section */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.05] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 hover:border-white/[0.08] mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-white/[0.05] bg-white/[0.01]">
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">Recent Activity</h2>
              <p className="text-blue-200/50 text-xs font-light tracking-wider mt-0.5">Overview of latest claimed food donations</p>
            </div>
            <button 
              onClick={() => navigate('/organization/my-requests')}
              className="flex items-center gap-2 text-xs font-semibold text-blue-300/60 hover:text-blue-300 transition-colors select-none bg-transparent outline-none focus:outline-none"
            >
              <span>View all activity</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.03] bg-white/[0.01]">
                  <th className="p-4 text-xs font-semibold text-blue-200/50 uppercase tracking-widest">Date</th>
                  <th className="p-4 text-xs font-semibold text-blue-200/50 uppercase tracking-widest">Food Item</th>
                  <th className="p-4 text-xs font-semibold text-blue-200/50 uppercase tracking-widest text-right">Quantity</th>
                  <th className="p-4 text-xs font-semibold text-blue-200/50 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {recentActivities.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-white/[0.02] transition-colors duration-300 group"
                  >
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                        <span className="text-blue-100/80 font-medium text-sm">{row.date}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                      {row.item}
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-blue-100 font-bold">{row.quantity}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md ${
                        row.status === 'Completed' 
                          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                          : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Section: Distribution by Region, Top Donors & Quick Actions ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Distribution by Region */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] hover:border-white/[0.08] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.05]">
              <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                <MapPin size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">Distribution by Region</h2>
                <p className="text-blue-200/50 text-xs font-light tracking-wider mt-0.5">Where food surplus is distributed</p>
              </div>
            </div>

            <div className="space-y-6">
              {regionalDistribution.map((region) => (
                <div key={region.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-blue-100/90">{region.name}</span>
                    <span className="text-white font-bold">{region.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/[0.05] rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${region.color}`}
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Donors List */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] hover:border-white/[0.08] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.05]">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                <Award size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">Top Donors</h2>
                <p className="text-blue-200/50 text-xs font-light tracking-wider mt-0.5">Key partners in waste reduction</p>
              </div>
            </div>

            <div className="space-y-4">
              {topDonors.map((donor, index) => (
                <div 
                  key={donor.name}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 font-bold text-emerald-300 text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{donor.name}</h4>
                      <p className="text-[11px] text-blue-200/50 mt-0.5">{donor.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-300">{donor.donations}</p>
                    <p className="text-[10px] text-blue-200/40 mt-0.5 uppercase tracking-wider">Saved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] hover:border-white/[0.08] transition-all duration-300 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.05]">
                <div className="p-2.5 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-400">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-wide">Quick Actions</h2>
                  <p className="text-blue-200/50 text-xs font-light tracking-wider mt-0.5">Management shortcuts</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button 
                  onClick={() => navigate('/organization/food-feed')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-500 hover:to-emerald-500 hover:shadow-lg hover:shadow-emerald-900/30 transition-all active:scale-[0.98] border border-emerald-500/20 text-sm"
                >
                  <Plus size={16} />
                  <span>Browse Food Feed</span>
                </button>
                <button 
                  onClick={() => navigate('/organization/donation-history')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.12] text-white font-bold transition-all text-sm active:scale-[0.98]"
                >
                  <FileText size={16} />
                  <span>Generate Monthly Report</span>
                </button>
                <button 
                  onClick={() => navigate('/organization/settings')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.12] text-white font-bold transition-all text-sm active:scale-[0.98]"
                >
                  <Users size={16} />
                  <span>Find Volunteers</span>
                </button>
              </div>
            </div>

            {/* Monthly Impact Goal Progress Bar */}
            <div className="border-t border-white/[0.05] pt-4">
              <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                <span className="text-blue-200/70 select-none">Monthly Impact Goal</span>
                <span className="text-emerald-400 font-bold select-none">72%</span>
              </div>
              <div className="w-full h-2.5 bg-white/[0.05] rounded-full overflow-hidden flex relative">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 animate-pulse transition-all duration-1000 ease-out"
                  style={{ width: '72%' }}
                />
              </div>
              <p className="text-[11px] text-blue-200/40 mt-1.5 flex justify-between">
                <span>Saved: <strong className="text-white">1,450 kg</strong></span>
                <span>Goal: <strong className="text-white">2,000 kg</strong></span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrganizationDashboard;
