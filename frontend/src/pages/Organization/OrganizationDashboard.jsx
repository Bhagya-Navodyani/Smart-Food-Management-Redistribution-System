import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, ClipboardList, TrendingUp, Users, Calendar, ArrowRight, Award, MapPin, Sparkles, Plus, FileText, Search, ShieldCheck, Globe } from 'lucide-react';
import SriLankaMap from '../../components/organization/SriLankaMap';

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: 'Colombo',
    members: 450,
    foodSaved: '2,450 kg',
    activeRequests: 24,
    status: 'High Activity'
  });

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
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Decorative Light Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[150px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight pb-3 px-1">
              Organization Dashboard
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl font-light tracking-wide px-1">
              Welcome to the Smart Food Management & Redistribution System Organization Portal.
            </p>
          </div>
        </header>

        {/* 4 Premium Summary Cards with modern layout and subtle shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Green theme */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-105 transition-all border border-emerald-100">
                <Gift size={24} />
              </div>
              <div className="opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all text-emerald-600">
                <Gift size={48} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 select-none">Total Food Donations</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-gray-900">128</p>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">↑ +12%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Blue theme */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-105 transition-all border border-blue-100">
                <ClipboardList size={24} />
              </div>
              <div className="opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all text-blue-600">
                <ClipboardList size={48} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 select-none">Active Requests</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-gray-900">12</p>
                <span className="text-xs text-blue-600 font-bold bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">5 pending</span>
              </div>
            </div>
          </div>

          {/* Card 3: Orange theme */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-105 transition-all border border-orange-100">
                <TrendingUp size={24} />
              </div>
              <div className="opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all text-orange-600">
                <TrendingUp size={48} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 select-none">Impact (kg Saved)</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-gray-900">1,450 kg</p>
                <span className="text-xs text-orange-600 font-bold bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded">Goal: 2k</span>
              </div>
            </div>
          </div>

          {/* Card 4: Purple theme */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-105 transition-all border border-purple-100">
                <Users size={24} />
              </div>
              <div className="opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all text-purple-600">
                <Users size={48} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 select-none">Partner Organizations</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-gray-900">8</p>
                <span className="text-xs text-purple-600 font-bold bg-purple-50 border border-purple-100 px-1.5 py-0.5 rounded">4 regions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sri Lanka Regional Impact Map */}
        <div className="p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 relative group flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <MapPin size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-wide">Regional Impact Insights</h2>
                <p className="text-gray-500 text-sm font-light tracking-wider mt-0.5">Interactive distribution analysis by district</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 animate-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="text-emerald-600" size={20} />
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{selectedDistrict.name}</h3>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100 shadow-sm">
                  {selectedDistrict.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 transition-all group/stat">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-blue-500" />
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Members</p>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{selectedDistrict.members}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 transition-all group/stat">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-emerald-500" />
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Saved</p>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900 group-hover:text-emerald-600 transition-colors">{selectedDistrict.foodSaved}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 transition-all group/stat">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList size={16} className="text-orange-500" />
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Requests</p>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900 group-hover:text-orange-600 transition-colors">{selectedDistrict.activeRequests}</p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Resource Utilization</span>
                  <span className="text-xs font-bold text-emerald-600">84%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="w-full h-full max-w-[450px]">
              <SriLankaMap onSelectDistrict={setSelectedDistrict} />
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-gray-100 bg-gray-50/50">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-wide">Recent Activity</h2>
              <p className="text-gray-500 text-xs font-light tracking-wider mt-0.5 uppercase">Latest food rescue mission updates</p>
            </div>
            <button 
              onClick={() => navigate('/organization/my-requests')}
              className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <span>View all activity</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Food Item</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Quantity</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentActivities.map((row) => (
                  <tr key={row.id} className="group hover:bg-gray-50 transition-colors duration-300">
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-emerald-500/60" />
                        <span className="text-gray-700 font-medium text-sm">{row.date}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900">
                      {row.item}
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-gray-900 font-black">{row.quantity}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        row.status === 'Completed' 
                          ? 'border-emerald-100 bg-emerald-50 text-emerald-600' 
                          : 'border-amber-100 bg-amber-50 text-amber-600'
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

        {/* ── Section: Top Donors & Quick Actions ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Top Donors List */}
          <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Award size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-wide">Top Donors</h2>
                <p className="text-gray-500 text-xs font-light tracking-wider mt-0.5 uppercase">Key food rescue partners</p>
              </div>
            </div>

            <div className="space-y-4">
              {topDonors.map((donor, index) => (
                <div 
                  key={donor.name}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200 font-bold text-emerald-600 text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">{donor.name}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">{donor.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">{donor.donations}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">Saved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-wide">Quick Actions</h2>
                  <p className="text-gray-500 text-xs font-light tracking-wider mt-0.5 uppercase">Management shortcuts</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button 
                  onClick={() => navigate('/organization/food-feed')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] text-sm"
                >
                  <Plus size={16} />
                  <span>Browse Food Feed</span>
                </button>
                <button 
                  onClick={() => navigate('/organization/donation-history')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold transition-all text-sm active:scale-[0.98]"
                >
                  <FileText size={16} />
                  <span>Generate Monthly Report</span>
                </button>
                <button 
                  onClick={() => navigate('/organization/settings')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold transition-all text-sm active:scale-[0.98]"
                >
                  <Users size={16} />
                  <span>Find Volunteers</span>
                </button>
              </div>
            </div>

            {/* Monthly Impact Goal Progress Bar */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-gray-500 uppercase tracking-widest text-[10px]">Monthly Impact Goal</span>
                <span className="text-emerald-600 font-black">72%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex relative">
                <div 
                  className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  style={{ width: '72%' }}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-2 flex justify-between font-medium">
                <span>Saved: <strong className="text-gray-900">1,450 kg</strong></span>
                <span>Goal: <strong className="text-gray-900">2,000 kg</strong></span>
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default OrganizationDashboard;
