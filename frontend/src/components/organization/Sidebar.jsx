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
  ChevronDown,
  ChevronRight,
  User,
  Shield,
  Bell,
  ShoppingCart,
  Heart,
  Package
} from 'lucide-react';

const Sidebar = ({ unreadCount }) => {
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
      name: 'Shopping',
      path: '/organization/shopping',
      icon: ShoppingCart,
      subItems: [
        { name: 'Marketplace', path: '/organization/shopping', icon: LayoutDashboard },
        { name: 'Wishlist', path: '/organization/shopping/wishlist', icon: Heart },
        { name: 'Cart', path: '/organization/shopping/cart', icon: ShoppingCart },
        { name: 'My Orders', path: '/organization/shopping/orders', icon: Package },
      ]
    },
    {
      name: 'Settings',
      path: '/organization/settings',
      icon: Settings,
      subItems: [
        { name: 'Profile', path: '/organization/settings/profile', icon: User },
        { name: 'Security', path: '/organization/settings/security', icon: Shield },
        { name: 'Notifications', path: '/organization/settings/notifications', icon: Bell, badge: unreadCount },
      ]
    },
  ];

  const [expandedItems, setExpandedItems] = useState(['Settings']);

  const toggleExpand = (name) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white text-gray-900 border border-gray-200 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 text-gray-900 transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-3 py-3 border-b border-gray-100">
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
          <nav className="flex-1 p-4 space-y-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              const hasSubItems = link.subItems && link.subItems.length > 0;
              const isExpanded = expandedItems.includes(link.name);

              return (
                <div key={link.path} className="space-y-1">
                  {hasSubItems ? (
                    <button
                      onClick={() => toggleExpand(link.name)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                        ${window.location.pathname.startsWith(link.path)
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="font-medium">{link.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && link.name === 'Settings' && !isExpanded && (
                          <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                            {unreadCount}
                          </span>
                        )}
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </button>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => `
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
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
                      <Icon size={20} />
                      <span className="font-medium">{link.name}</span>
                    </NavLink>
                  )}

                  {hasSubItems && isExpanded && (
                    <div className="ml-4 pl-4 border-l border-gray-100 space-y-1 mt-1">
                      {link.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            end
                            className={({ isActive }) => `
                              flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200
                              ${isActive
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100'
                                : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 text-sm'
                              }
                            `}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                setIsCollapsed(true);
                              }
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <SubIcon size={16} />
                              <span className="font-medium">{subItem.name}</span>
                            </div>
                            {subItem.badge > 0 && (
                              <span className={`
                                flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold
                                ${window.location.pathname === subItem.path 
                                  ? 'bg-white text-emerald-600' 
                                  : 'bg-emerald-500 text-white shadow-sm'
                                }
                              `}>
                                {subItem.badge}
                              </span>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogoutClick}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
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