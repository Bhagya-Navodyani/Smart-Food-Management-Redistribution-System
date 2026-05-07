import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Info, Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  // Helper to parse dates from the donation data
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

  // Group donations by date (YYYY-MM-DD)
  const donationsByDate = donations.reduce((acc, donation) => {
    const d = normalizeDate(donation.date || donation.requestDate);
    if (d) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(donation);
    }
    return acc;
  }, {});

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500';
      case 'Approved': return 'bg-blue-500';
      case 'Pending': return 'bg-amber-500';
      case 'Awaiting Confirmation': return 'bg-violet-500';
      case 'Cancelled':
      case 'Rejected': return 'bg-rose-500';
      default: return 'bg-slate-400';
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

  // Empty cells for the start of the month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-14 md:h-20" />);
  }

  // Actual days
  for (let day = 1; day <= totalDays; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayDonations = donationsByDate[dateKey] || [];
    const priorityStatus = getPriorityStatus(dayDonations);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

    days.push(
      <motion.button
        key={day}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dayDonations.length > 0 && onDayClick(dayDonations, dateKey)}
        className={`
          relative h-14 md:h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300
          ${dayDonations.length > 0 ? 'cursor-pointer' : 'cursor-default'}
          ${priorityStatus ? `${getStatusColor(priorityStatus)} text-white shadow-lg` : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'}
          ${isToday && !priorityStatus ? 'border-2 border-blue-500/50' : ''}
        `}
      >
        <span className={`text-sm md:text-lg font-bold ${priorityStatus ? 'text-white' : ''}`}>
          {day}
        </span>
        {dayDonations.length > 1 && (
          <span className="absolute top-1 right-2 text-[10px] bg-black/20 rounded-full px-1.5 font-bold">
            {dayDonations.length}
          </span>
        )}
        {isToday && !priorityStatus && (
          <div className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full" />
        )}
      </motion.button>
    );
  }

  const legend = [
    { label: 'Completed', color: 'bg-emerald-500', icon: CheckCircle },
    { label: 'Approved', color: 'bg-blue-500', icon: Clock },
    { label: 'Pending', color: 'bg-amber-500', icon: AlertCircle },
    { label: 'Awaiting', color: 'bg-violet-500', icon: Clock },
    { label: 'Cancelled', color: 'bg-rose-500', icon: XCircle },
  ];

  return (
    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="text-emerald-400" />
            Donation Progress
          </h2>
          <p className="text-slate-400 text-sm mt-1">Track your daily collection activities</p>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/50 p-1.5 rounded-2xl border border-white/10">
          <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300">
            <ChevronLeft size={20} />
          </button>
          <span className="text-white font-bold min-w-[120px] text-center uppercase tracking-widest text-sm">
            {monthName} {year}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold w-full mb-1">Status Legend</span>
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-xs text-slate-300 font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest pb-2">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default DonationCalendar;
