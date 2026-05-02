import React, { useState } from 'react';
import { Calendar, Package, CheckCircle } from 'lucide-react';

const DonationHistory = () => {
  const [historyData] = useState(() => {
    const saved = localStorage.getItem('myRequestsData');
    const myCompletedRequests = saved ? JSON.parse(saved).filter(r => r.status === 'Completed').map(r => ({
      id: r.id,
      date: r.requestDate || 'Today',
      donor: r.donor || 'N/A',
      category: r.category || 'N/A',
      quantity: r.quantity || '0kg',
      status: 'Completed'
    })) : [];

    const dummyData = [
      { id: 'd1', date: '2026-05-01', donor: 'Green Valley Farms', category: 'Vegetable Scraps', quantity: '45kg', status: 'Completed' },
      { id: 'd2', date: '2026-04-28', donor: 'City Market Stall #12', category: 'Spoiled Fruits', quantity: '20kg', status: 'Completed' },
      { id: 'd3', date: '2026-04-25', donor: 'Sunrise Bakery', category: 'Bakery Items', quantity: '15kg', status: 'Completed' },
      { id: 'd4', date: '2026-04-20', donor: 'Grand Palace Hotel', category: 'Cooked Leftovers', quantity: '60kg', status: 'Completed' },
      { id: 'd5', date: '2026-04-15', donor: 'Lanka Rice Mills', category: 'Grains & Rice', quantity: '120kg', status: 'Completed' },
    ];

    return [...myCompletedRequests, ...dummyData];
  });

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Vegetable Scraps': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Spoiled Fruits': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Bakery Items': return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30';
      case 'Cooked Leftovers': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Grains & Rice': return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1128] bg-gradient-to-br from-[#0A1128] via-[#101B3A] to-[#0A1128] -m-6 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Avant-Garde Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300 tracking-tight drop-shadow-sm mb-3">
            Donation History
          </h1>
          <p className="text-blue-200/60 text-lg max-w-2xl font-light tracking-wide">
            View completed food collections and history.
          </p>
        </header>

        {/* Glassmorphism Table Container */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.05] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 hover:border-white/[0.08]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                  <th className="p-5 text-xs font-semibold text-blue-200/50 uppercase tracking-widest">Date</th>
                  <th className="p-5 text-xs font-semibold text-blue-200/50 uppercase tracking-widest">Donor Name</th>
                  <th className="p-5 text-xs font-semibold text-blue-200/50 uppercase tracking-widest">Food Category</th>
                  <th className="p-5 text-xs font-semibold text-blue-200/50 uppercase tracking-widest text-right">Quantity</th>
                  <th className="p-5 text-xs font-semibold text-blue-200/50 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {historyData.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-white/[0.02] transition-colors duration-300 group"
                  >
                    <td className="p-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                        <span className="text-blue-100/80 font-medium text-sm">{row.date}</span>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                      {row.donor}
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md ${getCategoryBadge(row.category)}`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Package size={14} className="text-emerald-400/50" />
                        <span className="text-blue-100 font-bold">{row.quantity}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 backdrop-blur-md">
                        <CheckCircle size={12} className="text-emerald-400" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
