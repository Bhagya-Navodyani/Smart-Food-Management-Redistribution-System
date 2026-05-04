import React, { useState, useEffect } from 'react';
import { Calendar, Package, CheckCircle, Search, X, ChevronDown, Filter, Download } from 'lucide-react';

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

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [weightFilter, setWeightFilter] = useState('All Weights');
  const [sortOrder, setSortOrder] = useState('Date (Newest First)');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = ['All Categories', ...Array.from(new Set(historyData.map(item => item.category)))];

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
      case 'Vegetable Scraps': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Spoiled Fruits': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Bakery Items': return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30';
      case 'Cooked Leftovers': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Grains & Rice': return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
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
    <div className="min-h-screen bg-[#0A1128] bg-gradient-to-br from-[#0A1128] via-[#101B3A] to-[#0A1128] -m-6 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Avant-Garde Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300 tracking-tight drop-shadow-sm mb-3">
              Donation History
            </h1>
            <p className="text-blue-200/60 text-lg max-w-2xl font-light tracking-wide">
              View completed food collections and history.
            </p>
          </div>

          <button
            id="download-report-btn"
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold tracking-wide shadow-lg shadow-emerald-900/40 hover:from-green-500 hover:to-emerald-600 hover:shadow-emerald-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 border border-emerald-400/20"
          >
            <Download size={18} />
            <span>Download Report</span>
          </button>
        </header>

        {/* Glassmorphic Search & Advanced Filters */}
        <div className="flex flex-col gap-4 mb-8 p-5 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]">
          {/* Row 1: Search and Main Selects */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50" />
              <input
                id="donor-search"
                type="text"
                placeholder="Search by Donor, Category, or Date..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/[0.04] border border-white/20 backdrop-blur-md text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300 text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative min-w-[200px]">
              <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50 pointer-events-none" />
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl appearance-none cursor-pointer bg-white/[0.04] border border-white/20 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-300 text-sm select-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#101B3A] text-white">
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/50 pointer-events-none" />
            </div>

            {/* Weight Dropdown */}
            <div className="relative min-w-[180px]">
              <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50 pointer-events-none" />
              <select
                id="weight-filter"
                value={weightFilter}
                onChange={(e) => setWeightFilter(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl appearance-none cursor-pointer bg-white/[0.04] border border-white/20 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-300 text-sm select-none"
              >
                {['All Weights', '< 25 kg', '25 - 50 kg', '51 - 100 kg', '> 100 kg'].map((w) => (
                  <option key={w} value={w} className="bg-[#101B3A] text-white">
                    {w}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/50 pointer-events-none" />
            </div>

            {/* Sorting Dropdown */}
            <div className="relative min-w-[180px]">
              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50 pointer-events-none" />
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl appearance-none cursor-pointer bg-white/[0.04] border border-white/20 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-300 text-sm select-none"
              >
                {['Date (Newest First)', 'Date (Oldest First)', 'Weight (High to Low)', 'Weight (Low to High)'].map((s) => (
                  <option key={s} value={s} className="bg-[#101B3A] text-white">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/50 pointer-events-none" />
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-1 px-1">
            <span className="text-[10px] text-blue-300/40 uppercase tracking-wider font-bold mr-1">Categories:</span>
            {categories.slice(1).map((tag) => (
              <button
                key={tag}
                onClick={() => setCategoryFilter(categoryFilter === tag ? 'All Categories' : tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  categoryFilter === tag
                    ? 'bg-blue-500/20 border-blue-400/40 text-blue-300 shadow-sm shadow-blue-900/20'
                    : 'bg-white/[0.03] border-white/[0.08] text-blue-200/50 hover:bg-white/[0.08] hover:text-blue-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Active Filter Pills */}
          {(categoryFilter !== 'All Categories' || weightFilter !== 'All Weights' || search) && (
            <div className="flex flex-wrap items-center gap-2 mt-1 px-1 border-t border-white/[0.05] pt-3">
              <span className="text-[10px] text-blue-300/40 uppercase tracking-wider font-bold mr-1">Active:</span>
              {search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-blue-200">
                  "{search}"
                  <button onClick={() => setSearch('')} className="hover:text-white transition"><X size={12} /></button>
                </span>
              )}
              {categoryFilter !== 'All Categories' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs text-blue-300">
                  {categoryFilter}
                  <button onClick={() => setCategoryFilter('All Categories')} className="hover:text-white transition"><X size={12} /></button>
                </span>
              )}
              {weightFilter !== 'All Weights' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300">
                  {weightFilter}
                  <button onClick={() => setWeightFilter('All Weights')} className="hover:text-white transition"><X size={12} /></button>
                </span>
              )}
              <button
                onClick={() => { setSearch(''); setCategoryFilter('All Categories'); setWeightFilter('All Weights'); }}
                className="text-xs text-blue-300/40 hover:text-red-400 underline transition ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-sm text-blue-200/50">
            Showing <span className="text-white font-semibold">{currentItems.length}</span> of{' '}
            <span className="text-white font-semibold">{sortedHistory.length}</span> completed donations
          </p>
        </div>

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
                {currentItems.map((row) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentPage === 1
                  ? 'bg-white/[0.02] text-slate-500 border border-white/[0.03] cursor-not-allowed'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] hover:border-white/[0.15] active:scale-95'
              }`}
            >
              Previous
            </button>
            <span className="text-blue-200/50 text-sm font-medium">
              Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span>
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentPage === totalPages
                  ? 'bg-white/[0.02] text-slate-500 border border-white/[0.03] cursor-not-allowed'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] hover:border-white/[0.15] active:scale-95'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
