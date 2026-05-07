import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Gift, ClipboardList, TrendingUp, Users, Calendar, 
  ArrowRight, Award, MapPin, Sparkles, Plus, 
  FileText, Search, ShieldCheck, Globe, ChevronRight
} from 'lucide-react';
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

  const topDonors = [
    { name: 'Grand Palace Hotel', category: 'Hotel / Restaurant', donations: '850 kg' },
    { name: 'Keells Super', category: 'Supermarket', donations: '620 kg' },
    { name: 'Sunrise Bakery', category: 'Local Bakery', donations: '340 kg' },
    { name: 'City Market Stall #12', category: 'Market Vendor', donations: '290 kg' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] -z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              Organization Dashboard
            </h1>
            <p className="text-gray-500 font-medium">Welcome back to the Fresh Track management portal.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/organization/food-feed')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
            >
              <Plus size={18} />
              <span>Browse Feed</span>
            </button>
          </div>
        </header>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Donations', value: '128', trend: '↑ +12%', icon: Gift, color: 'emerald' },
            { label: 'Active Requests', value: '12', trend: '5 pending', icon: ClipboardList, color: 'blue' },
            { label: 'Impact (kg Saved)', value: '1,450', trend: 'Goal: 2k', icon: TrendingUp, color: 'amber' },
            { label: 'Partner Orgs', value: '8', trend: '4 regions', icon: Users, color: 'purple' }
          ].map((stat, idx) => (
            <div key={idx} className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 border border-${stat.color}-100`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</h3>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Sri Lanka Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 p-8 bg-white border border-gray-200 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Regional Impact</h2>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-0.5">District Insights</p>
                  </div>
                </div>

                <div className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Globe className="text-emerald-600" size={20} />
                      <h3 className="text-xl font-black text-gray-900">{selectedDistrict.name}</h3>
                    </div>
                    <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100">
                      {selectedDistrict.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { icon: Users, label: 'Members', value: selectedDistrict.members, color: 'blue' },
                      { icon: TrendingUp, label: 'Food Saved', value: selectedDistrict.foodSaved, color: 'emerald' },
                      { icon: ClipboardList, label: 'Requests', value: selectedDistrict.activeRequests, color: 'amber' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <item.icon size={16} className={`text-${item.color}-500`} />
                          <span className="text-xs font-bold text-gray-500">{item.label}</span>
                        </div>
                        <span className="text-sm font-black text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resource Utilization</span>
                    <span className="text-xs font-black text-emerald-600">84%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50 rounded-[2rem] border border-gray-100">
                <div className="w-full h-full max-w-[400px]">
                  <SriLankaMap onSelectDistrict={setSelectedDistrict} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-6">
            <div className="p-8 bg-white border border-gray-200 rounded-[2.5rem] shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Quick Actions</h2>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Shortcuts</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: FileText, label: 'Monthly Report', path: '/organization/donation-history', color: 'gray' },
                  { icon: ClipboardList, label: 'Manage Requests', path: '/organization/my-requests', color: 'gray' },
                  { icon: ShieldCheck, label: 'Audit Trail', path: '/organization/impact-analytics', color: 'gray' }
                ].map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-white group-hover:text-emerald-600 transition-colors">
                        <action.icon size={18} />
                      </div>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-700">{action.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-emerald-600 translate-x-0 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="p-6 rounded-3xl bg-gray-900 text-white relative overflow-hidden group cursor-pointer" onClick={() => navigate('/organization/food-feed')}>
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp size={80} />
                  </div>
                  <h4 className="text-lg font-black mb-1">Increase Impact</h4>
                  <p className="text-xs text-gray-400 font-medium mb-4">You have 12 active requests. Browse more food to save.</p>
                  <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
                    Explore Now <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-[2.5rem] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Activity</h2>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Latest claimed items</p>
              </div>
              <button 
                onClick={() => navigate('/organization/my-requests')}
                className="text-xs font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 uppercase tracking-widest"
              >
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-50">
                  {recentActivities.map((row) => (
                    <tr key={row.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            <ClipboardList size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900">{row.item}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{row.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <span className="text-sm font-black text-gray-900">{row.quantity}</span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quantity</p>
                      </td>
                      <td className="p-6 text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          row.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
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

          {/* Top Donors */}
          <div className="p-8 bg-white border border-gray-200 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Award size={22} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Top Donors</h2>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Key Partners</p>
              </div>
            </div>

            <div className="space-y-4">
              {topDonors.map((donor, index) => (
                <div 
                  key={donor.name}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-100 font-black text-emerald-600 text-xs shadow-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 leading-tight">{donor.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{donor.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-600">{donor.donations}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
