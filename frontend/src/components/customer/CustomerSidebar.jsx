import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBasket,
  Package,
  Heart,
  TrendingUp,
  User,
  Settings,
  ListChecks,
  AlertTriangle,
  HandHeart,
  Zap,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';

const CustomerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationGroups = [
    {
      name: 'Dashboard',
      path: '/customer/dashboard',
      icon: LayoutDashboard,
      group: null
    },
    {
      groupName: 'Food Management',
      icon: ListChecks,
      items: [
        { name: 'My Food Items', path: '/customer/food-list' },
        { name: 'Track Expiry', path: '/customer/expiry-tracking' }
      ]
    },
    {
      groupName: 'Actions & Impact',
      icon: Zap,
      items: [
        { name: 'Action Panel', path: '/customer/actions' },
        { name: 'Donations', path: '/customer/donations' },
        { name: 'Analytics', path: '/customer/impact' }
      ]
    },
    {
      groupName: 'Shopping',
      icon: ShoppingBasket,
      items: [
        { name: 'Marketplace', path: '/customer/marketplace' },
        { name: 'My Orders', path: '/customer/orders' },
        { name: 'Saved Items', path: '/customer/saved' }
      ]
    },
    {
      groupName: 'Account',
      icon: User,
      items: [
        { name: 'Profile', path: '/customer/profile' },
        { name: 'Settings', path: '/customer/settings' }
      ]
    }
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <ShoppingBasket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Customer</h1>
                <p className="text-sm text-gray-500">Portal</p>
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
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigationGroups.map((item, index) => {
            // Single item (Dashboard)
            if (!item.groupName) {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-green-50 text-green-600 border-l-4 border-green-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            }

            // Group items
            const GroupIcon = item.icon;
            const isGroupExpanded = expandedGroup === index;
            const isGroupActive = item.items.some((subItem) => location.pathname === subItem.path);

            return (
              <div key={item.groupName}>
                <button
                  onClick={() => setExpandedGroup(isGroupExpanded ? null : index)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isGroupActive
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GroupIcon className="w-5 h-5" />
                    <span className="font-medium">{item.groupName}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isGroupExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isGroupExpanded && (
                  <div className="ml-2 mt-1 space-y-1 border-l border-gray-200 pl-3">
                    {item.items.map((subItem) => {
                      const isActive = location.pathname === subItem.path;
                      return (
                        <button
                          key={subItem.path}
                          onClick={() => navigate(subItem.path)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                            isActive
                              ? 'text-green-600 font-medium bg-green-50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <span>{subItem.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
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
