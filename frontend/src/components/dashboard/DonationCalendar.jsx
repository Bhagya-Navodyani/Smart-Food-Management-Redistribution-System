import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  CheckCircle, Clock, AlertCircle, XCircle, Info, Package
} from 'lucide-react';

const DonationCalendar = ({ requests = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayDonations, setSelectedDayDonations] = useState(null);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500 shadow-emerald-200';
      case 'Approved': return 'bg-blue-500 shadow-blue-200';
      case 'Pending': return 'bg-amber-500 shadow-amber-200';
      case 'Awaiting Confirmation': return 'bg-purple-500 shadow-purple-200';
      case 'Cancelled':
      case 'Rejected': return 'bg-red-500 shadow-red-200';
      default: return 'bg-gray-200';
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = startDayOfMonth(year, month);

  // Group requests by date
  const requestsByDate = requests.reduce((acc, req) => {
    const date = new Date(req.date); // Use 'date' instead of 'requestDate'
    if (!isNaN(date)) {
      const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (!acc[dateString]) acc[dateString] = [];
      acc[dateString].push(req);
    }
    return acc;
  }, {});

  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-12 md:h-16" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateKey = `${year}-${month}-${d}`;
    const dayRequests = requestsByDate[dateKey] || [];
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

    days.push(
      <div 
        key={d}
        className="h-12 md:h-16 relative flex flex-col items-center justify-center group cursor-pointer"
        onClick={() => dayRequests.length > 0 && setSelectedDayDonations(dayRequests)}
      >
        <div className={`
          z-10 w-8 h-8 flex items-center justify-center text-xs font-black rounded-xl transition-all duration-300
          ${isToday ? 'bg-gray-900 text-white' : 'text-gray-900 group-hover:bg-gray-100'}
        `}>
          {d}
        </div>
        
        {dayRequests.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-12 h-12 rounded-2xl opacity-30 ${getStatusColor(dayRequests[0].status)}`}
            />
            <div className="absolute bottom-1.5 flex gap-1">
              {dayRequests.slice(0, 3).map((req, idx) => (
                <div key={idx} className={`w-2.5 h-2.5 rounded-sm ${getStatusColor(req.status)} shadow-sm`} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CalendarIcon size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">{monthNames[month]} {year}</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Activity Overview</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-900">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-900">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px relative">
        {days}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-50 flex flex-wrap gap-4 justify-center">
        {[
          { label: 'Completed', color: 'bg-emerald-500' },
          { label: 'Approved', color: 'bg-blue-500' },
          { label: 'Pending', color: 'bg-amber-500' },
          { label: 'Cancelled', color: 'bg-red-500' }
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${item.color} shadow-sm`} />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Day Details Modal */}
      <AnimatePresence>
        {selectedDayDonations && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDayDonations(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                    <CalendarIcon className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900">Day Activity</h3>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                      {new Date(selectedDayDonations[0].date).toLocaleDateString(undefined, { dateStyle: 'full' })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedDayDonations(null)}
                  className="p-2 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-900"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
                {selectedDayDonations.map((req, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{req.item}</h4>
                        <p className="text-xs text-gray-500">{req.id}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(req.status)} text-white shadow-lg`}>
                        {req.status}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Clock size={14} className="text-gray-400" /> {req.time}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Package size={14} className="text-gray-400" /> {req.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <button 
                  onClick={() => setSelectedDayDonations(null)}
                  className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-95"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationCalendar;
