import React, { useState, useEffect } from 'react';
import { 
  Package, Clock, MapPin, CheckCircle, Clock3, XCircle, 
  ChevronRight, Inbox, Truck, Trash2, Calendar,
  LayoutList, Table, X, Phone, Building, FileText, Info
} from 'lucide-react';

/* ── Sample Request Data ── */
const sampleRequests = [
  { 
    id: 101, 
    name: 'Hotel Buffet Leftovers', 
    category: 'Cooked Leftovers', 
    quantity: '45kg', 
    status: 'Pending', // 'Pending', 'Approved', 'Completed', 'Rejected'
    requestDate: 'Today, 10:30 AM',
    pickupTime: 'Before 10:00 PM',
    donor: 'Grand Palace Hotel', 
    donorType: 'Hotel / Restaurant',
    address: 'No 45, Galle Road, Colombo 03',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=480&q=80',
    location: '12km away',
    contact: '+94 77 123 4567'
  },
  { 
    id: 102, 
    name: 'Day-Old Bread & Pastries', 
    category: 'Bakery Items', 
    quantity: '20kg', 
    status: 'Approved',
    requestDate: 'Today, 09:15 AM',
    pickupTime: 'Before 8:00 PM',
    donor: 'Sunrise Bakery', 
    donorType: 'Bakery',
    address: '12/A, Kandy Road, Kadawatha',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=480&q=80',
    location: '8km away',
    contact: '+94 71 987 6543'
  },
  { 
    id: 103, 
    name: 'Cabbage & Carrot Trimmings', 
    category: 'Vegetable Scraps', 
    quantity: '30kg', 
    status: 'Completed',
    requestDate: 'Yesterday, 04:00 PM',
    pickupTime: 'Completed at 5:30 PM',
    donor: 'City Market Stall #12', 
    donorType: 'Market Vendor',
    address: 'Stall 12, Manning Market, Peliyagoda',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=480&q=80',
    location: '5km away',
    contact: '+94 75 555 5555'
  }
];

const statusStyles = {
  Pending: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: Clock3 },
  Approved: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: Truck },
  'Awaiting Confirmation': { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', icon: Clock },
  Completed: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: CheckCircle },
  Rejected: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', icon: XCircle },
  Cancelled: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', icon: XCircle }
};

const MyRequests = () => {
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('myRequestsData');
    return saved ? JSON.parse(saved) : sampleRequests;
  });

  // Process any incoming requests from the Food Feed queue
  useEffect(() => {
    const queue = localStorage.getItem('newRequestsQueue');
    if (queue) {
      const parsedQueue = JSON.parse(queue);
      if (parsedQueue.length > 0) {
        setRequests(prev => {
          // Avoid duplicates if strict mode double-fires
          const existingIds = new Set(prev.map(r => r.id));
          const trulyNew = parsedQueue.filter(r => !existingIds.has(r.id));
          return [...trulyNew, ...prev];
        });
      }
      localStorage.removeItem('newRequestsQueue');
    }
  }, []);

  // Sync back to localStorage whenever requests change
  useEffect(() => {
    localStorage.setItem('myRequestsData', JSON.stringify(requests));
  }, [requests]);
  const [activeTab, setActiveTab] = useState('All');
  const [viewFormat, setViewFormat] = useState('list'); // 'list' or 'table'
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirmCollect, setShowConfirmCollect] = useState(false);
  const [reqToDelete, setReqToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, viewFormat]);

  const handleDeleteConfirm = () => {
    if (!reqToDelete) return;
    
    // Mark as Cancelled in MyRequests instead of deleting it
    setRequests(prev => prev.map(r => 
      r.id === reqToDelete.id ? { ...r, status: 'Cancelled' } : r
    ));

    // Send to restored queue for Food Feed
    const queue = JSON.parse(localStorage.getItem('restoredRequestsQueue') || '[]');
    queue.push({
      id: reqToDelete.id,
      name: reqToDelete.name,
      category: reqToDelete.category,
      source: reqToDelete.donorType || 'Home', // Fallback
      quantity: reqToDelete.quantity,
      collectBefore: reqToDelete.pickupTime,
      distance: reqToDelete.location,
      safe: true,
      image: reqToDelete.image,
      donor: reqToDelete.donor,
      posted: 'Just restored'
    });
    localStorage.setItem('restoredRequestsQueue', JSON.stringify(queue));

    setReqToDelete(null);
  };

  // Filter requests based on tab
  const filteredRequests = requests.filter(req => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Awaiting') return req.status === 'Awaiting Confirmation';
    return req.status === activeTab;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Calculate stats
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length;
  const completedCount = requests.filter(r => r.status === 'Completed').length;

  const tabColors = {
    All: 'bg-slate-600 text-white shadow-lg shadow-black/20',
    Pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-900/20',
    Approved: 'bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-900/20',
    Awaiting: 'bg-violet-500/20 text-violet-400 border border-violet-500/40 shadow-lg shadow-violet-900/20',
    Completed: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-900/20',
    Cancelled: 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-lg shadow-red-900/20'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -m-6 p-6 lg:p-10">
      {/* Decorative Blurs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 shadow-xl">
                <Package size={26} className="text-emerald-400" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                My Requests
              </h1>
            </div>
            <p className="text-slate-400 text-base max-w-2xl ml-[52px]">
              Track the status of your pickup requests and view your collection history.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-3">
            <div className="px-4 py-3 rounded-xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 backdrop-blur-md">
              <p className="text-xs text-amber-200/70 mb-1 font-medium">Pending</p>
              <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-md">
              <p className="text-xs text-blue-200/70 mb-1 font-medium">Approved</p>
              <p className="text-2xl font-bold text-blue-400">{approvedCount}</p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20 backdrop-blur-md">
              <p className="text-xs text-emerald-200/70 mb-1 font-medium">Completed</p>
              <p className="text-2xl font-bold text-emerald-400">{completedCount}</p>
            </div>
          </div>
        </header>

        {/* Tabs & Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex p-1.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 w-fit backdrop-blur-xl shadow-inner overflow-x-auto max-w-full">
            {['All', 'Pending', 'Approved', 'Awaiting', 'Completed', 'Cancelled'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex-shrink-0
                  ${activeTab === tab 
                    ? tabColors[tab]
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-slate-800/50 border border-slate-700/50 p-1 rounded-xl backdrop-blur-sm">
            <button 
              onClick={() => setViewFormat('list')}
              className={`p-2 rounded-lg transition-colors ${viewFormat === 'list' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              title="List View"
            >
              <LayoutList size={18} />
            </button>
            <button 
              onClick={() => setViewFormat('table')}
              className={`p-2 rounded-lg transition-colors ${viewFormat === 'table' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              title="Table View"
            >
              <Table size={18} />
            </button>
          </div>
        </div>

        {/* ────────────── Requests List ────────────── */}
        {filteredRequests.length === 0 ? (
          /* Empty State UI */
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-3xl bg-white/[0.02] border border-white/[0.05] border-dashed backdrop-blur-sm">
            <div className="w-24 h-24 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-6 shadow-xl">
              <Inbox size={40} className="text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Requests Found</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              {activeTab === 'All' 
                ? "You haven't made any pickup requests yet. Head over to the Food Feed to find available surplus food in your area."
                : `You don't have any ${activeTab.toLowerCase()} requests at the moment.`}
            </p>
            {activeTab !== 'All' ? (
              <button
                onClick={() => setActiveTab('All')}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700"
              >
                View All Requests
              </button>
            ) : (
              <a 
                href="/organization/food-feed"
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30"
              >
                Browse Food Feed
              </a>
            )}
          </div>
        ) : viewFormat === 'table' ? (
          /* ────────────── Table View ────────────── */
          <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl animate-in fade-in duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-white/[0.08] text-xs uppercase tracking-wider text-slate-400">
                    <th className="p-4 font-semibold whitespace-nowrap rounded-tl-2xl">Item Name</th>
                    <th className="p-4 font-semibold whitespace-nowrap">Donor</th>
                    <th className="p-4 font-semibold whitespace-nowrap">Quantity / Distance</th>
                    <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                    <th className="p-4 font-semibold text-right whitespace-nowrap rounded-tr-2xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {currentItems.map((req, idx) => {
                    const StatusIcon = statusStyles[req.status].icon;
                    return (
                      <tr 
                        key={req.id} 
                        className="hover:bg-white/[0.02] transition-colors animate-in slide-in-from-bottom-2 fade-in duration-300 fill-mode-both"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700 bg-slate-800">
                              <img src={req.image} alt={req.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-white text-sm">{req.name}</p>
                              <p className="text-xs text-slate-400">{req.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-300 font-medium">
                          {req.donor}
                          <p className="text-xs text-slate-500 font-normal mt-0.5">{req.requestDate}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1.5 text-xs text-slate-400">
                            <span className="flex items-center gap-1.5"><Package size={12} className="text-emerald-500/70" /> {req.quantity}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-blue-500/70" /> {req.location}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusStyles[req.status].bg} ${statusStyles[req.status].border} ${statusStyles[req.status].text}`}>
                            <StatusIcon size={12} /> {req.status}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-1.5">
                            {req.status === 'Completed' ? 'Collected:' : 'Collect By:'} <span className="font-semibold text-slate-400">{req.pickupTime.replace('Before ', '')}</span>
                          </p>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => { setSelectedRequest(req); setShowConfirmCollect(false); }}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-colors border border-white/[0.1]"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ────────────── List View ────────────── */
          <div className="flex flex-col gap-4">
            {currentItems.map((req, idx) => {
              const StatusIcon = statusStyles[req.status].icon;
              return (
                <div 
                  key={req.id}
                  className="
                    group flex flex-col md:flex-row gap-5 p-4 rounded-2xl
                    bg-white/[0.04] border border-white/[0.08]
                    backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/[0.15]
                    transition-all duration-300
                    animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both
                  "
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative w-full md:w-48 h-48 md:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                    <img src={req.image} alt={req.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                    {/* Status Badge (Mobile) */}
                    <div className="absolute top-2 left-2 md:hidden">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${statusStyles[req.status].bg} ${statusStyles[req.status].border} ${statusStyles[req.status].text}`}>
                        <StatusIcon size={12} /> {req.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center pr-4">
                    <div className="mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{req.name}</h3>
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-4">
                      Donor: <span className="text-slate-300 font-medium">{req.donor}</span>
                    </p>

                    <div className="flex flex-wrap gap-4 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Package size={14} className="text-slate-500" />
                        <span className="text-slate-300">{req.quantity}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin size={14} className="text-slate-500" />
                        <span className="text-slate-300">{req.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar size={14} className="text-slate-500" />
                        <span className="text-slate-300">{req.requestDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions/Info Right Side */}
                  {/* Actions/Info Right Side */}
                  <div className="flex flex-col justify-between items-center md:pl-6 md:border-l border-white/[0.08] w-full md:w-[220px] flex-shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0">
                    <div className="w-full flex flex-col items-center gap-3 mb-4 md:mb-0">
                      {/* Status Badge (Desktop) */}
                      <span className={`hidden md:flex justify-center items-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border w-full ${statusStyles[req.status].bg} ${statusStyles[req.status].border} ${statusStyles[req.status].text}`}>
                        <StatusIcon size={14} className="flex-shrink-0" /> 
                        <span className="truncate">{req.status}</span>
                      </span>
                      
                      <div className="text-center w-full">
                        <p className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold mb-1">
                          {req.status === 'Completed' ? 'Collected At' : 'Collect By'}
                        </p>
                        <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white">
                          <Clock size={16} className="text-emerald-500 flex-shrink-0" />
                          <span className="truncate">{req.pickupTime}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => { setSelectedRequest(req); setShowConfirmCollect(false); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white text-sm font-medium transition-colors border border-white/[0.1]"
                    >
                      View Details
                      <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentPage === 1 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]'}`}
            >
              Previous
            </button>
            <span className="text-slate-400 text-sm font-medium">
              Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentPage === totalPages ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ────────────── View Details Modal ────────────── */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => { setSelectedRequest(null); setShowConfirmCollect(false); }}
          />
          
          <div className="relative w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/80 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <FileText size={20} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Request Details
                </h3>
              </div>
              <button 
                onClick={() => { setSelectedRequest(null); setShowConfirmCollect(false); }}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Top Section - Status & Basics */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-48 h-40 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700 bg-slate-800">
                  <img src={selectedRequest.image} alt={selectedRequest.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusStyles[selectedRequest.status].bg} ${statusStyles[selectedRequest.status].border} ${statusStyles[selectedRequest.status].text}`}>
                      {React.createElement(statusStyles[selectedRequest.status].icon, { size: 12 })}
                      {selectedRequest.status}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {selectedRequest.requestDate}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedRequest.name}</h2>
                  <p className="text-emerald-400 font-medium text-sm mb-4">{selectedRequest.category}</p>
                  
                  <div className="flex gap-4">
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2 flex-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Quantity</p>
                      <p className="font-bold text-white flex items-center gap-2"><Package size={14} className="text-emerald-500"/> {selectedRequest.quantity}</p>
                    </div>
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2 flex-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">{selectedRequest.status === 'Completed' ? 'Collected At' : 'Collect By'}</p>
                      <p className="font-bold text-white flex items-center gap-2"><Clock3 size={14} className="text-emerald-500"/> {selectedRequest.pickupTime.replace('Before ', '').replace('Completed at ', '')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Donor Details Card */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
                    <Building size={18} className="text-blue-400" />
                    <h4 className="font-bold text-white">Donor Information</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Donor Name</p>
                      <p className="text-sm font-semibold text-slate-200">{selectedRequest.donor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Donor Type</p>
                      <p className="text-sm font-medium text-slate-300">{selectedRequest.donorType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Contact Number</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-emerald-400">{selectedRequest.contact}</p>
                        <button className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Call Donor">
                          <Phone size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Details Card */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
                    <MapPin size={18} className="text-rose-400" />
                    <h4 className="font-bold text-white">Pickup Location</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Distance</p>
                      <p className="text-sm font-semibold text-slate-200">{selectedRequest.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Exact Address</p>
                      <p className="text-sm font-medium text-slate-300 leading-relaxed">{selectedRequest.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer inside Modal */}
              <div className="mt-6 pt-6 border-t border-slate-700 flex flex-wrap justify-end gap-3">
                {showConfirmCollect ? (
                  <div className="w-full flex items-center justify-between bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl animate-in fade-in zoom-in-95">
                    <p className="text-amber-400 text-sm font-medium">Are you sure you have physically collected this item?</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowConfirmCollect(false)}
                        className="px-4 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'Awaiting Confirmation', pickupTime: 'Waiting for donor confirmation' } : r));
                          setShowConfirmCollect(false);
                          setSelectedRequest(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors"
                      >
                        Confirm Collection
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedRequest.status === 'Pending' && (
                      <button 
                        onClick={() => { setReqToDelete(selectedRequest); setSelectedRequest(null); }}
                        className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-colors flex items-center gap-2 border border-red-500/20 mr-auto"
                      >
                        <Trash2 size={16} /> Cancel Request
                      </button>
                    )}
                    <button 
                      onClick={() => { setSelectedRequest(null); setShowConfirmCollect(false); }}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-600 text-white font-medium hover:bg-slate-700 transition-colors"
                    >
                      Close
                    </button>
                    {selectedRequest.status === 'Approved' && (
                      <>
                        <button className="px-6 py-2.5 rounded-xl bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors flex items-center gap-2">
                          <MapPin size={16} className="text-emerald-400" /> Get Directions
                        </button>
                        <button 
                          onClick={() => setShowConfirmCollect(true)}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                        >
                          <CheckCircle size={16} /> Mark as Collected
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────── Cancel Confirmation Modal ────────────── */}
      {reqToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setReqToDelete(null)}
          />
          
          <div className="relative w-full max-w-sm bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                <Trash2 size={32} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cancel Request?</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Are you sure you want to cancel the pickup request for <span className="text-white font-semibold">{reqToDelete.name}</span>? This item will be returned to the Food Feed for others to claim.
              </p>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setReqToDelete(null)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-colors"
                >
                  Keep Request
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition-colors shadow-lg shadow-red-900/20"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
