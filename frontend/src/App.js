import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout Components
import OrganizationLayout from './components/layouts/OrganizationLayout';
import PublicLayout from './components/layouts/PublicLayout';

// Organization pages
import FoodFeed from './pages/Organization/FoodFeed';
import MyRequests from './pages/Organization/MyRequests';
import DonationHistory from './pages/Organization/DonationHistory';

// Auth pages
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Home';
import CustomerDashboard from './pages/Dashboards/CustomerDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import FoodSellerDashboard from './pages/Dashboards/FoodSellerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Organization Routes - NO Navbar/Footer, only Sidebar */}
          <Route element={<OrganizationLayout />}>
            <Route path="/organization/dashboard" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">Organization Dashboard</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">Welcome to the Smart Food Management & Redistribution System Organization Portal.</p></div></div>} />
            <Route path="/organization/food-feed" element={<FoodFeed />} />
            <Route path="/organization/my-requests" element={<MyRequests />} />
            <Route path="/organization/donation-history" element={<DonationHistory />} />
            <Route path="/organization/impact-analytics" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">Impact Analytics</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">Visual representation of food saved.</p></div></div>} />
            <Route path="/organization/settings" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">Profile and notification management.</p></div></div>} />
          </Route>

          {/* Public Routes - WITH Navbar and Footer */}
          <Route element={<PublicLayout />}>
            {/* Auth Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Role Dashboards */}
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/foodsellers/dashboard" element={<FoodSellerDashboard />} />

            {/* Default / Home */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
