import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  CheckCircle, Clock, AlertCircle, XCircle, Info 
} from 'lucide-react';

const DonationCalendar = ({ donations, onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    const lower = dateStr.toLowerCase();
    const now = new Date();
    if (lower.includes('today')) return now;
    if (lower.includes('yesterday')) {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return d;
    }
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const donationsByDate = donations.reduce((acc, donation) => {
    const d = normalizeDate(donation.date || donation.requestDate);
    if (d) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(donation);
    }
    return acc;
  }, {});

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Completed': return 'from-emerald-500 to-emerald-600 shadow-emerald-200 text-white border-emerald-400';
      case 'Approved': return 'from-blue-500 to-blue-600 shadow-blue-200 text-white border-blue-400';
      case 'Pending': return 'from-amber-500 to-amber-600 shadow-amber-200 text-white border-amber-400';
      case 'Awaiting Confirmation': return 'from-violet-500 to-violet-600 shadow-violet-200 text-white border-violet-400';
      case 'Cancelled':
      case 'Rejected': return 'from-rose-500 to-rose-600 shadow-rose-200 text-white border-rose-400';
      default: return 'from-gray-400 to-gray-500 shadow-gray-200 text-white border-gray-300';
    }
  };

  const getPriorityStatus = (dayDonations) => {
    if (dayDonations.some(d => d.status === 'Completed')) return 'Completed';
    if (dayDonations.some(d => d.status === 'Approved')) return 'Approved';
    if (dayDonations.some(d => d.status === 'Pending')) return 'Pending';
    if (dayDonations.some(d => d.status === 'Awaiting Confirmation')) return 'Awaiting Confirmation';
    if (dayDonations.some(d => d.status === 'Cancelled' || d.status === 'Rejected')) return 'Cancelled';
    return null;
  };

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 md:h-12" />);
  }

  for (let day = 1; day <= totalDays; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayDonations = donationsByDate[dateKey] || [];
    const priorityStatus = getPriorityStatus(dayDonations);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

    days.push(
      <motion.button
        key={day}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dayDonations.length > 0 && onDayClick(dayDonations, dateKey)}
        className={`
          relative h-10 md:h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border
          ${dayDonations.length > 0 ? 'cursor-pointer' : 'cursor-default'}
          ${priorityStatus 
            ? `bg-gradient-to-br ${getStatusStyles(priorityStatus)} shadow-md` 
            : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50 hover:border-gray-200'}
          ${isToday && !priorityStatus ? 'ring-2 ring-emerald-500/30 border-emerald-500 bg-emerald-50/50 text-emerald-700' : ''}
        `}
      >
        <span className={`text-xs md:text-sm font-black tracking-tight ${priorityStatus ? 'text-white' : ''}`}>
          {day}
        </span>
        {dayDonations.length > 1 && (
          <div className="absolute top-1 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black/10 text-[8px] font-black text-white">
            {dayDonations.length}
          </div>
        )}
        {isToday && (
          <div className={`absolute bottom-1 w-4 h-0.5 rounded-full ${priorityStatus ? 'bg-white/60' : 'bg-emerald-500'}`} />
        )}
      </motion.button>
    );
  }

  const legendItems = [
    { label: 'Completed', color: 'bg-emerald-500', icon: CheckCircle },
    { label: 'Approved', color: 'bg-blue-500', icon: Clock },
    { label: 'Pending', color: 'bg-amber-500', icon: AlertCircle },
    { label: 'Awaiting', color: 'bg-violet-500', icon: Clock },
    { label: 'Cancelled', color: 'bg-rose-500', icon: XCircle },
  ];

  return (
    <div className="group relative bg-white border border-gray-200 rounded-3xl p-5 md:p-6 shadow-sm transition-all duration-500 hover:shadow-md">
      <div className="relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <CalendarIcon className="text-emerald-500 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                Donation Progress
              </h2>
              <p className="text-gray-500 text-xs font-medium tracking-wide uppercase">Collection Insights</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100">
            <button 
              onClick={prevMonth} 
              className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all active:scale-90 text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="px-4 min-w-[120px] text-center">
              <span className="text-gray-900 font-black uppercase tracking-widest text-[10px] md:text-xs">
                {monthName} {year}
              </span>
            </div>
            <button 
              onClick={nextMonth} 
              className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all active:scale-90 text-gray-400 hover:text-gray-600"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </header>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6 p-1">
          {legendItems.map((item) => (
            <div 
              key={item.label} 
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-[10px] text-gray-600 font-bold tracking-tight uppercase">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest pb-3">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>

      {/* Info bar */}
      <div className="mt-6 flex items-center justify-between px-1 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
          <Info size={12} className="text-emerald-500/60" />
          Click highlighted days for detailed records
        </div>
        <div className="h-1 w-20 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-emerald-500/20" />
        </div>
      </div>
    </div>
  );
};

export default DonationCalendar;
