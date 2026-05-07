import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Package, CheckCircle, Search, X, ChevronDown, Filter, Download, Clock, MapPin, Building, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import DonationCalendar from '../../components/dashboard/DonationCalendar';

const DonationHistory = () => {
  const [allRequests, setAllRequests] = useState(() => {
    const saved = localStorage.getItem('myRequestsData');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep data in sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('myRequestsData');
      if (saved) setAllRequests(JSON.parse(saved));
    };

    window.addEventListener('storage', handleStorageChange);
    // Also poll occasionally or on focus for same-tab updates
    const interval = setInterval(handleStorageChange, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const historyData = useMemo(() => {
    const myCompletedRequests = allRequests.filter(r => r.status === 'Completed').map(r => ({
      id: r.id,
      date: r.requestDate || 'Today',
      donor: r.donor || 'N/A',
      category: r.category || 'N/A',
      quantity: r.quantity || '0kg',
      status: 'Completed'
    }));

    const dummyData = [
      { id: 'd1', date: '2026-05-01', donor: 'Green Valley Farms', category: 'Vegetable Scraps', quantity: '45kg', status: 'Completed' },
      { id: 'd2', date: '2026-04-28', donor: 'City Market Stall #12', category: 'Spoiled Fruits', quantity: '20kg', status: 'Completed' },
      { id: 'd3', date: '2026-04-25', donor: 'Sunrise Bakery', category: 'Bakery Items', quantity: '15kg', status: 'Completed' },
      { id: 'd4', date: '2026-04-20', donor: 'Grand Palace Hotel', category: 'Cooked Leftovers', quantity: '60kg', status: 'Completed' },
      { id: 'd5', date: '2026-04-15', donor: 'Lanka Rice Mills', category: 'Grains & Rice', quantity: '120kg', status: 'Completed' },
    ];

    return [...myCompletedRequests, ...dummyData];
  }, [allRequests]);

  const [selectedDayDonations, setSelectedDayDonations] = useState(null);
  const [selectedDateLabel, setSelectedDateLabel] = useState('');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [weightFilter, setWeightFilter] = useState('All Weights');
  const [sortOrder, setSortOrder] = useState('Date (Newest First)');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = useMemo(() => ['All Categories', ...Array.from(new Set(historyData.map(item => item.category)))], [historyData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, weightFilter, sortOrder]);

  const parseWeight = (qStr) => {
    if (!qStr) return 0;
    const clean = qStr.replace(/[^\d.]/g, '');
    return parseFloat(clean) || 0;
  };

  const filteredHistory = historyData.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = 
      item.donor.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.date.toLowerCase().includes(q);

    const matchCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;

    const w = parseWeight(item.quantity);
    let matchWeight = true;
    if (weightFilter === '< 25 kg') matchWeight = w < 25;
    else if (weightFilter === '25 - 50 kg') matchWeight = w >= 25 && w <= 50;
    else if (weightFilter === '51 - 100 kg') matchWeight = w > 50 && w <= 100;
    else if (weightFilter === '> 100 kg') matchWeight = w > 100;

    return matchSearch && matchCategory && matchWeight;
  });

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const lower = dateStr.toLowerCase().trim();
    const now = new Date();

    if (lower.includes('today')) {
      return now;
    }

    if (lower.includes('yesterday')) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    }

    if (lower.includes('just now')) {
      return now;
    }

    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? now : parsed;
  };

  // Sort logic
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortOrder === 'Date (Newest First)') {
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    } else if (sortOrder === 'Date (Oldest First)') {
      return parseDate(a.date).getTime() - parseDate(b.date).getTime();
    } else if (sortOrder === 'Weight (High to Low)') {
      return parseWeight(b.quantity) - parseWeight(a.quantity);
    } else if (sortOrder === 'Weight (Low to High)') {
      return parseWeight(a.quantity) - parseWeight(b.quantity);
    }
    return 0;
  });

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

      // Corporate green branding colors
      const primaryColor = [16, 119, 78]; 
      const textColor = [33, 43, 54]; 
      const secondaryTextColor = [99, 115, 129]; 

      // Branding Box Background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 595.28, 140, 'F');

      // Load logo image
      let logoData = null;
      try {
        logoData = await loadImageAsBase64('/uploads/images/Fresh_Track-removebg-preview.png');
      } catch (err) {
        console.error('Logo failed to load', err);
      }

      if (logoData) {
        doc.addImage(logoData, 'PNG', 40, 32, 50, 50);
      }

      // Title - with elegant Times-Bold font
      doc.setFont('times', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Fresh Track', logoData ? 102 : 40, 58);

      // Tagline
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
      doc.text('Smart Food Management & Redistribution System', logoData ? 102 : 40, 75);

      // Report Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text('DONATION HISTORY REPORT', 40, 115);

      // Metadata
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
      doc.text('REPORT ID:', 380, 48);
      doc.text('DATE:', 380, 62);
      doc.text('ORGANIZATION:', 380, 76);

      const uniqueId = 'FT-REP-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(uniqueId, 470, 48);
      doc.text(new Date().toLocaleDateString(), 470, 62);
      doc.text('Fresh Track Organization', 470, 76);

      // Divider line
      doc.setDrawColor(224, 224, 224);
      doc.setLineWidth(1);
      doc.line(40, 140, 555.28, 140);

      // Extract ONLY completed records currently visible in table
      const tableHeaders = [['Date', 'Donor Name', 'Food Category', 'Quantity', 'Status']];
      const tableRows = currentItems.map(row => [
        row.date,
        row.donor,
        row.category,
        row.quantity,
        row.status
      ]);

      // Draw autoTable
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

      doc.save(`Donation_History_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('Error generating PDF report:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[150px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
              Donation History
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl font-medium tracking-wide">
              View and manage your completed food redistribution records.
            </p>
          </div>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-95"
          >
            <Download size={20} />
            <span>Download Report</span>
          </button>
        </header>

        {/* Calendar Section */}
        <div className="mb-12">
          <DonationCalendar 
            donations={allRequests} 
            onDayClick={(dayDonations, dateKey) => {
              setSelectedDayDonations(dayDonations);
              setSelectedDateLabel(dateKey);
            }} 
          />
        </div>

        {/* Filters Section */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search history..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none font-medium"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full text-gray-400 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="flex gap-4">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-700 font-bold outline-none cursor-pointer hover:bg-white transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Donor</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Category</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Quantity</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentItems.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="text-gray-500 font-bold text-sm">{row.date}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-black border border-emerald-100">
                          {row.donor[0]}
                        </div>
                        <span className="text-gray-900 font-black text-sm">{row.donor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-gray-900 font-black">{row.quantity}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <CheckCircle size={12} />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mb-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-white disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <span className="text-gray-400 font-black text-xs uppercase tracking-widest">
              Page <span className="text-gray-900">{currentPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-white disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal Section */}
      {selectedDayDonations && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setSelectedDayDonations(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900">Activities on {selectedDateLabel}</h3>
                <p className="text-gray-500 text-sm font-medium">{selectedDayDonations.length} records found</p>
              </div>
              <button 
                onClick={() => setSelectedDayDonations(null)}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
              {selectedDayDonations.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                      {item.status}
                    </span>
                    <span className="text-xs font-bold text-gray-400">{item.pickupTime || item.date}</span>
                  </div>
                  <h4 className="text-lg font-black text-gray-900 mb-2">{item.name || item.category}</h4>
                  <div className="flex gap-4 text-xs font-bold text-gray-500">
                    <div className="flex items-center gap-1"><Building size={14}/> {item.donor}</div>
                    <div className="flex items-center gap-1"><Package size={14}/> {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setSelectedDayDonations(null)}
                className="px-8 py-3 rounded-xl bg-gray-900 text-white font-black hover:bg-gray-800 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
