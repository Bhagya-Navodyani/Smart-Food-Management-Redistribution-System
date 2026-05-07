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
  AlertTriangle,
  Building2
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
    navigate('/signin');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white text-gray-900 border border-gray-200 rounded-xl shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 text-gray-900 transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-black leading-tight text-gray-900">
                  <span className="text-emerald-600">Fresh</span> Track
                </h1>
                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">Organization</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                      : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'
                    }
                  `}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsCollapsed(true);
                    }
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-emerald-600'} />
                      <span className="font-bold text-sm">{link.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={handleLogoutClick}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 font-bold text-sm"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {!isCollapsed && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={handleLogoutCancel} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-2">Confirm Logout</h2>
              <p className="text-gray-500 text-sm mb-8 font-medium">Are you sure you want to log out of your organization account?</p>
              <div className="flex gap-3">
                <button onClick={handleLogoutCancel} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all">Cancel</button>
                <button onClick={handleLogoutConfirm} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all">Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
