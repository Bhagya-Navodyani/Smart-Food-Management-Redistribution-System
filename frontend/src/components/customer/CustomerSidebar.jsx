import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Refrigerator,
  Search,
  Heart,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

const CustomerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationLinks = [
    {
      name: 'Home',
      path: '/customer/dashboard',
      icon: Home,
    },
    {
      name: 'My Kitchen',
      path: '/customer/orders',
      icon: Refrigerator,
    },
    {
      name: 'Find Food',
      path: '/customer/browse-food',
      icon: Search,
    },
    {
      name: 'Give Food',
      path: '/customer/give-food',
      icon: Heart,
    },
    {
      name: 'My Impact',
      path: '/customer/impact',
      icon: BarChart3,
    },
    {
      name: 'Settings',
      path: '/customer/settings',
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/signin');
  };

  return (
    <>
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0 flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Food Portal</h1>
                <p className="text-sm text-gray-600">Simple & Easy</p>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-green-50 text-gray-900 border-l-4 border-green-600 font-bold'
                    : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900 font-medium'
                  }
                `}
              >
                <Icon className="w-6 h-6" />
                <span className="text-lg">{link.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            className="w-full flex items-center gap-4 px-4 py-4 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors font-medium"
          >
            <HelpCircle className="w-6 h-6" />
            <span className="text-lg">Help</span>
          </button>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-4 px-4 py-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-lg">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(false)}
        />
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sign Out</h3>
                <p className="text-sm text-gray-600">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerSidebar;
