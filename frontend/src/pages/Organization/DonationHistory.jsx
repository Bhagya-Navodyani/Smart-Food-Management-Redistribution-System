import React, { useState, useMemo } from 'react';
import { 
  History, Search, Filter, Download, Calendar, 
  MapPin, Package, ChevronRight, FileText, 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2,
  AlertCircle, Building2, User, X, Leaf
} from 'lucide-react';
import DonationCalendar from '../../components/dashboard/DonationCalendar';

const DonationHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Completed');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    range: 'This Month', // 'This Month', 'Last 3 Months', 'Year to Date', 'Custom'
    includeAll: false,
    startDate: '',
    endDate: ''
  });
  const itemsPerPage = 8;

  const historyData = [
    { id: 'DON-2026-001', date: '2026-05-03', time: '02:30 PM', item: 'Fresh Organic Tomatoes', quantity: '45 kg', donor: 'Grand Palace Hotel', location: 'Colombo 03', category: 'Vegetable Scraps', status: 'Completed', impact: 'High' },
    { id: 'DON-2026-002', date: '2026-05-02', time: '11:15 AM', item: 'Whole Wheat Bread', quantity: '30 loaves', donor: 'Sunrise Bakery', location: 'Kadawatha', category: 'Bakery Items', status: 'Cancelled', impact: 'None' },
    { id: 'DON-2026-003', date: '2026-05-01', time: '09:45 AM', item: 'Mixed Veg Scraps', quantity: '120 kg', donor: 'City Market Stall #12', location: 'Peliyagoda', category: 'Vegetable Scraps', status: 'Completed', impact: 'Critical' },
    { id: 'DON-2026-004', date: '2026-04-28', time: '04:20 PM', item: 'Cooked Fried Rice', quantity: '25 kg', donor: 'Grand Palace Hotel', location: 'Colombo 03', category: 'Cooked Leftovers', status: 'Completed', impact: 'Medium' },
    { id: 'DON-2026-005', date: '2026-04-25', time: '10:00 AM', item: 'Fresh Fruit Mix', quantity: '55 kg', donor: 'Keells Super', location: 'Nugegoda', category: 'Spoiled Fruits', status: 'Completed', impact: 'High' },
    { id: 'DON-2026-006', date: '2026-04-22', time: '01:10 PM', item: 'Brown Rice Bags', quantity: '80 kg', donor: 'Main Street Grocers', location: 'Pettah', category: 'Grains & Rice', status: 'Completed', impact: 'Critical' },
    { id: 'DON-2026-007', date: '2026-04-20', time: '11:30 AM', item: 'Daily Pastry Batch', quantity: '15 kg', donor: 'Sunrise Bakery', location: 'Kadawatha', category: 'Bakery Items', status: 'Completed', impact: 'Medium' },
    { id: 'DON-2026-008', date: '2026-04-18', time: '03:45 PM', item: 'Potato Peels', quantity: '65 kg', donor: 'Grand Palace Hotel', location: 'Colombo 03', category: 'Vegetable Scraps', status: 'Completed', impact: 'High' },
  ];

  // Filtering logic
  const filteredHistory = useMemo(() => {
    return historyData.filter(item => {
      const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.donor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = item.status === 'Completed';
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm]);

  const sortedHistory = [...filteredHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Vegetable Scraps': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Spoiled Fruits': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Bakery Items': return 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100';
      case 'Cooked Leftovers': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Grains & Rice': return 'bg-sky-50 text-sky-600 border-sky-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.head.appendChild(script);
    });
  };

  const loadImageAsBase64 = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (err) => resolve(null);
    });
  };

  const handleExportPDF = async () => {
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js');

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'pt', 'a4');

      // Filter data for export based on config
      let exportData = [...historyData];
      
      // 1. Filter by status
      if (!exportConfig.includeAll) {
        exportData = exportData.filter(item => item.status === 'Completed');
      }

      // 2. Filter by date range
      const now = new Date();
      if (exportConfig.range === 'This Month') {
        exportData = exportData.filter(item => {
          const d = new Date(item.date);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
      } else if (exportConfig.range === 'Last 3 Months') {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        exportData = exportData.filter(item => new Date(item.date) >= threeMonthsAgo);
      } else if (exportConfig.range === 'Year to Date') {
        exportData = exportData.filter(item => new Date(item.date).getFullYear() === now.getFullYear());
      } else if (exportConfig.range === 'Custom' && exportConfig.startDate && exportConfig.endDate) {
        const start = new Date(exportConfig.startDate);
        const end = new Date(exportConfig.endDate);
        exportData = exportData.filter(item => {
          const d = new Date(item.date);
          return d >= start && d <= end;
        });
      }

      const primaryColor = [16, 119, 78]; 
      const textColor = [33, 43, 54]; 
      const secondaryTextColor = [99, 115, 129]; 

      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 595.28, 140, 'F');

      let logoData = null;
      try {
        logoData = await loadImageAsBase64('/uploads/images/Fresh_Track-removebg-preview.png');
      } catch (err) {
        console.error('Logo failed to load', err);
      }

      if (logoData) {
        doc.addImage(logoData, 'PNG', 40, 32, 50, 50);
      }

      doc.setFont('times', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Fresh Track', logoData ? 102 : 40, 58);

      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
      doc.text('Smart Food Management & Redistribution System', logoData ? 102 : 40, 75);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text('DONATION HISTORY REPORT', 40, 115);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
      doc.text('REPORT ID:', 380, 48);
      doc.text('DATE:', 380, 62);
      doc.text('RANGE:', 380, 76);

      const uniqueId = 'FT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(uniqueId, 470, 48);
      doc.text(new Date().toLocaleDateString(), 470, 62);
      doc.text(exportConfig.range === 'Custom' ? `${exportConfig.startDate} to ${exportConfig.endDate}` : exportConfig.range, 470, 76);

      doc.setDrawColor(224, 224, 224);
      doc.setLineWidth(1);
      doc.line(40, 140, 555.28, 140);

      const tableHeaders = [['Date', 'Item Name', 'Donor', 'Quantity', 'Status']];
      const tableRows = exportData.map(row => [
        row.date,
        row.item,
        row.donor,
        row.quantity,
        row.status
      ]);

      doc.autoTable({
        head: tableHeaders,
        body: tableRows,
        startY: 160,
        margin: { left: 40, right: 40 },
        theme: 'striped',
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10,
          halign: 'left'
        },
        bodyStyles: {
          textColor: textColor,
          fontSize: 9,
          halign: 'left'
        },
        alternateRowStyles: {
          fillColor: [250, 251, 252]
        },
        didDrawPage: (data) => {
          const str = 'Page ' + doc.internal.getNumberOfPages();
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
          
          doc.text('Thank you for contributing to reducing food waste.', 40, doc.internal.pageSize.height - 30);
          doc.text(str, doc.internal.pageSize.width - 80, doc.internal.pageSize.height - 30);
        }
      });

      doc.save(`Donation_History_${exportConfig.range.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
      setIsExportModalOpen(false);
    } catch (err) {
      console.error('Error generating PDF report:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative overflow-hidden font-sans">
      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Donation History
            </h1>
            <p className="text-gray-500">View and manage your organization's food rescue records.</p>
          </div>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95"
          >
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </header>

        {/* Calendar Widget Integration */}
        <div className="mb-12">
          <DonationCalendar requests={historyData} />
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search completed items, IDs or donors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-emerald-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <th className="p-5">Transaction Details</th>
                  <th className="p-5">Donor & Location</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((row) => (
                  <tr key={row.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 mb-1">{row.item}</span>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                          <span className="px-1.5 py-0.5 rounded bg-gray-100">{row.id}</span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {row.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                          <Building2 size={14} className="text-gray-400" /> {row.donor}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin size={14} className="text-gray-400" /> {row.location}
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold border ${getCategoryBadge(row.category)}`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className={`flex items-center gap-1.5 text-xs font-bold ${row.status === 'Completed' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {row.status === 'Completed' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                        {row.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button 
                        onClick={() => setSelectedTransaction(row)}
                        className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-gray-100 hover:border-emerald-200 group/btn shadow-sm active:scale-95"
                      >
                        <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing <span className="font-bold text-gray-900">{indexOfFirstItem + 1}</span> to <span className="font-bold text-gray-900">{Math.min(indexOfLastItem, sortedHistory.length)}</span> of <span className="font-bold text-gray-900">{sortedHistory.length}</span> entries
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedTransaction(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-gray-100">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                  <FileText className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Transaction Details</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">ID: {selectedTransaction.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTransaction(null)} className="p-2 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Item Info */}
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2 block">Item Name</label>
                    <h4 className="text-2xl font-black text-gray-900 leading-tight">{selectedTransaction.item}</h4>
                    <span className="inline-flex mt-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                      {selectedTransaction.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[9px] uppercase tracking-widest font-black text-gray-400 mb-1">Quantity</p>
                      <p className="text-sm font-black text-gray-900 flex items-center gap-2">
                        <Package size={16} className="text-emerald-600" />
                        {selectedTransaction.quantity}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[9px] uppercase tracking-widest font-black text-gray-400 mb-1">Date</p>
                      <p className="text-sm font-black text-gray-900 flex items-center gap-2">
                        <Calendar size={16} className="text-blue-600" />
                        {selectedTransaction.date}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-gray-900 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                      <Leaf size={64} />
                    </div>
                    <p className="text-[9px] uppercase tracking-widest font-black text-emerald-400 mb-2">Sustainability Impact</p>
                    <h5 className="text-lg font-black mb-1">~{parseFloat(selectedTransaction.quantity) * 2.5}kg CO2 Offset</h5>
                    <p className="text-[10px] text-gray-400 font-medium">Prevented methane emissions by diverting organic waste from landfills.</p>
                  </div>
                </div>

                {/* Right Side: Donor & Location */}
                <div className="space-y-6">
                  <div className="p-6 rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-emerald-600">
                      <Building2 size={20} />
                      <h5 className="text-sm font-black uppercase tracking-widest">Donor Information</h5>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Organization</p>
                        <p className="text-sm font-black text-gray-900">{selectedTransaction.donor}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                        <p className="text-sm font-bold text-gray-700 flex items-center gap-1.5 mt-1">
                          <MapPin size={14} className="text-gray-400" />
                          {selectedTransaction.location}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-gray-50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                          <User size={18} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Contact Person</p>
                          <p className="text-xs font-black text-gray-900">Manager - {selectedTransaction.donor}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">Collection Status</p>
                      <p className="text-xs font-black text-emerald-700">Verified & Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setSelectedTransaction(null)}
                className="px-8 py-3 rounded-2xl bg-gray-900 text-white font-black text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-gray-200"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Configuration Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsExportModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-gray-100">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                  <FileText className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Export Settings</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Customize your report</p>
                </div>
              </div>
              <button onClick={() => setIsExportModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Range Selection */}
              <div>
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4 block">Time Range</label>
                <div className="grid grid-cols-2 gap-3">
                  {['This Month', 'Last 3 Months', 'Year to Date', 'Custom'].map(range => (
                    <button
                      key={range}
                      onClick={() => setExportConfig({...exportConfig, range})}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${
                        exportConfig.range === range 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' 
                          : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Date Pickers */}
              {exportConfig.range === 'Custom' && (
                <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-2 block">Start Date</label>
                    <input 
                      type="date" 
                      value={exportConfig.startDate}
                      onChange={(e) => setExportConfig({...exportConfig, startDate: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-700 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-2 block">End Date</label>
                    <input 
                      type="date" 
                      value={exportConfig.endDate}
                      onChange={(e) => setExportConfig({...exportConfig, endDate: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-700 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Inclusion Settings */}
              <div>
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4 block">Data Inclusion</label>
                <div className="space-y-3">
                  <button
                    onClick={() => setExportConfig({...exportConfig, includeAll: false})}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      !exportConfig.includeAll 
                        ? 'bg-white border-emerald-500 shadow-sm' 
                        : 'bg-gray-50 border-transparent text-gray-400'
                    }`}
                  >
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900">Completed Only</p>
                      <p className="text-[10px] font-medium text-gray-500">Only successful donations</p>
                    </div>
                    {!exportConfig.includeAll && <CheckCircle2 className="text-emerald-500" size={20} />}
                  </button>
                  <button
                    onClick={() => setExportConfig({...exportConfig, includeAll: true})}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      exportConfig.includeAll 
                        ? 'bg-white border-emerald-500 shadow-sm' 
                        : 'bg-gray-50 border-transparent text-gray-400'
                    }`}
                  >
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900">Include All Records</p>
                      <p className="text-[10px] font-medium text-gray-500">Include cancelled/rejected items</p>
                    </div>
                    {exportConfig.includeAll && <CheckCircle2 className="text-emerald-500" size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
              <button 
                onClick={() => setIsExportModalOpen(false)}
                className="flex-1 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-black text-sm hover:bg-gray-50 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={handleExportPDF}
                className="flex-[1.5] py-4 rounded-2xl bg-gray-900 text-white font-black text-sm hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
