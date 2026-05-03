import React from 'react';
import { Gift, ClipboardList, TrendingUp, Users } from 'lucide-react';

const OrganizationDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0A1128] bg-gradient-to-br from-[#0A1128] via-[#101B3A] to-[#0A1128] p-6 lg:p-10 relative overflow-hidden font-sans">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      </div>
    </div>
  );
};

export default OrganizationDashboard;
