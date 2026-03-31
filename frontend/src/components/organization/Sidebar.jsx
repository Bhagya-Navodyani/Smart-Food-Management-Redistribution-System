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
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mobile-toggle"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-icon">
                <Utensils size={24} />
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                  FoodShare
                </h1>
                <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
                  Organization Portal
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsCollapsed(true);
                    }
                  }}
                >
                  <Icon size={20} />
                  <span style={{ fontWeight: 500 }}>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={20} />
              <span style={{ fontWeight: 500 }}>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isCollapsed && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 30,
            display: window.innerWidth >= 1024 ? 'none' : 'block'
          }}
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
