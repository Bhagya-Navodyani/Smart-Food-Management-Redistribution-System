import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// User Components
import UserDashboard from './components/user/Dashboard';
import FoodList from './components/user/FoodList';
import AddFood from './components/user/AddFood';
import EditFood from './components/user/EditFood';
import ActivityHistory from './components/user/ActivityHistory';
import UserAnalytics from './components/user/Analytics';
import Marketplace from './components/user/Marketplace';
import UserProfile from './components/user/Profile';

// Admin Components
import AdminDashboard from './components/admin/Dashboard';
import UserManagement from './components/admin/UserManagement';
import ShopManagement from './components/admin/ShopManagement';
import FoodMonitoring from './components/admin/FoodMonitoring';
import SystemAnalytics from './components/admin/SystemAnalytics';
import CategoryManagement from './components/admin/CategoryManagement';

// Layout Components
import UserLayout from './components/layouts/UserLayout';
import AdminLayout from './components/layouts/AdminLayout';
import AuthLayout from './components/layouts/AuthLayout';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/food" element={<FoodList />} />
            <Route path="/user/food/add" element={<AddFood />} />
            <Route path="/user/food/edit/:id" element={<EditFood />} />
            <Route path="/user/activity" element={<ActivityHistory />} />
            <Route path="/user/analytics" element={<UserAnalytics />} />
            <Route path="/user/marketplace" element={<Marketplace />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/shops" element={<ShopManagement />} />
            <Route path="/admin/food" element={<FoodMonitoring />} />
            <Route path="/admin/analytics" element={<SystemAnalytics />} />
            <Route path="/admin/categories" element={<CategoryManagement />} />
          </Route>

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
