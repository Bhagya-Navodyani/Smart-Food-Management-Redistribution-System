import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Utensils,
  ClipboardList,
  History,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  AlertTriangle
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const navigationLinks = [
    {
      name: 'Dashboard',
      path: '/organization/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Food Feed',
      path: '/organization/food-feed',
      icon: Utensils,
    },
    {
      name: 'My Requests',
      path: '/organization/my-requests',
      icon: ClipboardList,
    },
    {
      name: 'Donation History',
      path: '/organization/donation-history',
      icon: History,
    },
    {
      name: 'Impact Analytics',
      path: '/organization/impact-analytics',
      icon: BarChart3,
    },
    {
      name: 'Settings',
      path: '/organization/settings',
      icon: Settings,
    },
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-3 py-3 border-b border-slate-700">
            <div className="flex items-center gap-1">
              <img
                src="/uploads/images/Fresh_Track-removebg-preview.png"
                alt="Fresh Track Logo"
                style={{ width: '90px', height: '90px' }}
                className="object-contain flex-shrink-0"
              />
              <div>
                <h1 className="text-lg font-bold leading-tight">
                  <span style={{ color: '#2E9E3E' }}>Fresh</span>{' '}
                  <span style={{ color: '#3BBF5E' }}>Track</span>
                </h1>
                <p className="text-xs leading-tight mt-0.5" style={{ color: '#4AADAD' }}>Smart Food Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsCollapsed(true);
                    }
                  }}
                >
                  <Icon size={20} />
                  <span className="font-medium">{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogoutClick}
              className="flex items-center space-x-3 w-full px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleLogoutCancel}
          />

          {/* Modal Card */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
            style={{ animation: 'scaleIn 0.25s ease-out' }}
          >
            {/* Red accent bar at top */}
            <div className="h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-orange-500" />

            <div className="p-8">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center ring-8 ring-red-50/50">
                  <AlertTriangle size={32} className="text-red-500" />
                </div>
              </div>

              {/* Text */}
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                Confirm Logout
              </h2>
              <p className="text-gray-500 text-center text-sm leading-relaxed mb-8">
                Are you sure you want to log out? You will need to sign in again to access your account.
              </p>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleLogoutCancel}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Sidebar;

