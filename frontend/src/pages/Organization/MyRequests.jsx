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
  Pending: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', icon: Clock3 },
  Approved: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', icon: Truck },
  'Awaiting Confirmation': { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600', icon: Clock },
  Completed: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', icon: CheckCircle },
  Rejected: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', icon: XCircle },
  Cancelled: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', icon: XCircle }
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

  const handleDeleteConfirm = () => {
    if (!reqToDelete) return;
    
    setRequests(prev => prev.map(r => 
      r.id === reqToDelete.id ? { ...r, status: 'Cancelled' } : r
    ));

    const queue = JSON.parse(localStorage.getItem('restoredRequestsQueue') || '[]');
    queue.push({
      id: reqToDelete.id,
      name: reqToDelete.name,
      category: reqToDelete.category,
      source: reqToDelete.donorType || 'Home',
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

  // Calculate stats
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length;
  const completedCount = requests.filter(r => r.status === 'Completed').length;

  const tabColors = {
    All: 'bg-gray-900 text-white shadow-lg',
    Pending: 'bg-amber-50 text-amber-600 border border-amber-200',
    Approved: 'bg-blue-50 text-blue-600 border border-blue-200',
    Awaiting: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
    Completed: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    Cancelled: 'bg-red-50 text-red-600 border border-red-200'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">My Requests</h1>
            <p className="text-gray-500">Track and manage your pickup requests.</p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm min-w-[120px]">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Pending</p>
              <p className="text-2xl font-black text-amber-600">{pendingCount}</p>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm min-w-[120px]">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Approved</p>
              <p className="text-2xl font-black text-blue-600">{approvedCount}</p>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm min-w-[120px]">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Completed</p>
              <p className="text-2xl font-black text-emerald-600">{completedCount}</p>
            </div>
          </div>
        </header>

        {/* Tabs & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
            {['All', 'Pending', 'Approved', 'Awaiting', 'Completed', 'Cancelled'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === tab 
                  ? tabColors[tab] 
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm self-end md:self-auto">
            <button 
              onClick={() => setViewFormat('list')}
              className={`p-2.5 rounded-xl transition-all duration-300 ${viewFormat === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
              title="List View"
            >
              <LayoutList size={20} />
            </button>
            <button 
              onClick={() => setViewFormat('table')}
              className={`p-2.5 rounded-xl transition-all duration-300 ${viewFormat === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
              title="Table View"
            >
              <Table size={20} />
            </button>
          </div>
        </div>

        {/* ────────────── Requests List ────────────── */}
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-gray-200 rounded-3xl shadow-sm">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
              <Inbox size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Requests Found</h3>
            <p className="text-gray-500">You don't have any {activeTab.toLowerCase()} requests at the moment.</p>
          </div>
        ) : viewFormat === 'table' ? (
          /* Table View */
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400">
                    <th className="p-6 font-bold">Item Name</th>
                    <th className="p-6 font-bold">Donor</th>
                    <th className="p-6 font-bold">Details</th>
                    <th className="p-6 font-bold">Status</th>
                    <th className="p-6 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.map((req) => {
                    const status = statusStyles[req.status] || statusStyles.Pending;
                    const StatusIcon = status.icon;
                    return (
                      <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                              <img src={req.image} alt={req.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{req.name}</p>
                              <p className="text-xs text-gray-500">{req.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-sm font-bold text-gray-700">{req.donor}</td>
                        <td className="p-6">
                          <div className="flex flex-col gap-1 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1.5"><Package size={14} /> {req.quantity}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> {req.location}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${status.bg} ${status.text} border ${status.border}`}>
                            <StatusIcon size={12} /> {req.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <button 
                            onClick={() => { setSelectedRequest(req); setShowConfirmCollect(false); }}
                            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                          >
                            View
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
          /* List View */
          <div className="grid grid-cols-1 gap-4">
            {filteredRequests.map((req) => {
              const status = statusStyles[req.status] || statusStyles.Pending;
              const StatusIcon = status.icon;
              return (
                <div key={req.id} className="group bg-white p-2 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-5 p-5 md:p-6">
                    {/* Food Image */}
                    <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={req.image} alt={req.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center pr-4">
                      <div className="mb-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{req.name}</h3>
                        <p className="text-emerald-600 font-bold text-xs uppercase tracking-wide">{req.category}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5"><Package size={14} className="text-gray-400" /> {req.quantity}</span>
                        <span className="flex items-center gap-1.5"><Building size={14} className="text-gray-400" /> {req.donor}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" /> {req.location}</span>
                      </div>
                    </div>

                    {/* Actions/Info Right Side */}
                    <div className="flex flex-col justify-between items-center md:pl-6 md:border-l border-gray-100 min-w-[220px] mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0">
                      <div className="w-full flex flex-col items-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 ${status.bg} ${status.text} border ${status.border} w-full justify-center`}>
                          <StatusIcon size={14} /> {req.status}
                        </span>
                        
                        <div className="flex flex-col items-center text-center">
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">
                            {req.status === 'Completed' ? 'Collected At' : 'Collect By'}
                          </p>
                          <p className="text-sm font-black text-gray-800 flex items-center gap-1.5">
                            <Clock3 size={14} className="text-gray-400" /> 
                            {req.pickupTime.replace('Before ', '').replace('Completed at ', '')}
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => { setSelectedRequest(req); setShowConfirmCollect(false); }}
                        className="w-full mt-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                      >
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => { setSelectedRequest(null); setShowConfirmCollect(false); }}
          />
          <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info size={20} className="text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Request Details</h3>
              </div>
              <button onClick={() => { setSelectedRequest(null); setShowConfirmCollect(false); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Summary Area */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                  <img src={selectedRequest.image} alt={selectedRequest.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusStyles[selectedRequest.status]?.bg} ${statusStyles[selectedRequest.status]?.text} border ${statusStyles[selectedRequest.status]?.border}`}>
                      {selectedRequest.status}
                    </span>
                    <span className="text-[11px] text-gray-400 font-bold">{selectedRequest.requestDate}</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-1">{selectedRequest.name}</h2>
                  <p className="text-emerald-600 font-bold text-sm mb-4">{selectedRequest.category}</p>
                  
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Quantity</p>
                      <p className="font-bold text-gray-700 flex items-center gap-1.5"><Package size={14} className="text-gray-400" /> {selectedRequest.quantity}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Time Limit</p>
                      <p className="font-bold text-gray-700 flex items-center gap-1.5"><Clock3 size={14} className="text-gray-400" /> {selectedRequest.pickupTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor & Location Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3 text-blue-600">
                    <Building size={16} />
                    <h4 className="font-bold text-sm">Donor Information</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Name</p>
                      <p className="text-sm font-bold text-gray-700">{selectedRequest.donor}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Phone</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-emerald-600">{selectedRequest.contact}</p>
                        <Phone size={14} className="text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3 text-rose-500">
                    <MapPin size={16} />
                    <h4 className="font-bold text-sm">Pickup Location</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Distance</p>
                      <p className="text-sm font-bold text-gray-700">{selectedRequest.location}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Address</p>
                      <p className="text-sm font-medium text-gray-600 leading-tight">{selectedRequest.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-end gap-3">
                {showConfirmCollect ? (
                  <div className="w-full flex items-center justify-between bg-amber-50 border border-amber-200 p-4 rounded-2xl animate-in slide-in-from-bottom-2 duration-300">
                    <p className="text-amber-800 text-sm font-bold">Have you physically collected this item?</p>
                    <div className="flex gap-2">
                      <button onClick={() => setShowConfirmCollect(false)} className="px-4 py-2 rounded-xl bg-white border border-amber-200 text-gray-700 text-sm font-bold hover:bg-gray-50">Cancel</button>
                      <button 
                        onClick={() => {
                          setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'Awaiting Confirmation', pickupTime: 'Waiting for donor confirmation' } : r));
                          setShowConfirmCollect(false);
                          setSelectedRequest(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedRequest.status === 'Pending' && (
                      <button 
                        onClick={() => { setReqToDelete(selectedRequest); setSelectedRequest(null); }}
                        className="px-6 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 flex items-center gap-2 mr-auto"
                      >
                        <Trash2 size={16} /> Cancel Request
                      </button>
                    )}
                    <button 
                      onClick={() => { setSelectedRequest(null); setShowConfirmCollect(false); }}
                      className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                    >
                      Close
                    </button>
                    {selectedRequest.status === 'Approved' && (
                      <button 
                        onClick={() => setShowConfirmCollect(true)}
                        className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-2"
                      >
                        <CheckCircle size={16} /> Mark as Collected
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {reqToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setReqToDelete(null)} />
          <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <Trash2 size={36} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Request?</h3>
            <p className="text-gray-500 text-sm mb-8">This item will be returned to the feed for others to claim.</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setReqToDelete(null)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200">No, Keep</button>
              <button onClick={handleDeleteConfirm} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
