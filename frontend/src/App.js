import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout Components
import OrganizationLayout from './components/layouts/OrganizationLayout';
import CustomerLayout from './components/layouts/CustomerLayout';
import PublicLayout from './components/layouts/PublicLayout';

// Organization pages
import FoodFeed from './pages/Organization/FoodFeed';
import MyRequests from './pages/Organization/MyRequests';
import DonationHistory from './pages/Organization/DonationHistory';
import OrganizationDashboard from './pages/Organization/OrganizationDashboard';
import ImpactAnalysis from './pages/Organization/ImpactAnalysis';
import OrganizationSettings from './pages/Organization/OrganizationSettings';

// Auth pages
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Home';
import CustomerDashboard from './pages/Dashboards/CustomerDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import FoodSellerDashboard from './pages/Dashboards/FoodSellerDashboard';

// Customer pages
import BrowseFood from './pages/Customer/BrowseFood';
import FoodList from './pages/Customer/FoodList';
import ExpiryTracking from './pages/Customer/ExpiryTracking';
import ActionPanel from './pages/Customer/ActionPanel';
import MyOrders from './pages/Customer/MyOrders';
import SavedItems from './pages/Customer/SavedItems';
import SchedulePickup from './pages/Customer/SchedulePickup';
import Impact from './pages/Customer/Impact';
import Profile from './pages/Customer/Profile';
import Settings from './pages/Customer/Settings';
import GiveFood from './pages/Customer/GiveFood';
import CreateListing from './pages/Customer/CreateListing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Organization Routes - NO Navbar/Footer, only Sidebar */}
          <Route element={<OrganizationLayout />}>
            <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
            <Route path="/organization/food-feed" element={<FoodFeed />} />
            <Route path="/organization/my-requests" element={<MyRequests />} />
            <Route path="/organization/donation-history" element={<DonationHistory />} />
            <Route path="/organization/impact-analytics" element={<ImpactAnalysis />} />
            <Route path="/organization/settings" element={<OrganizationSettings />} />
          </Route>

          {/* Customer Routes - WITH Sidebar Navigation */}
          <Route element={<CustomerLayout />}>
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/browse-food" element={<BrowseFood />} />
            <Route path="/customer/food-list" element={<FoodList />} />
            <Route path="/customer/expiry-tracking" element={<ExpiryTracking />} />
            <Route path="/customer/actions" element={<ActionPanel />} />
            <Route path="/customer/create-listing" element={<CreateListing />} />
            <Route path="/customer/marketplace" element={<BrowseFood />} />
            <Route path="/customer/orders" element={<MyOrders />} />
            <Route path="/customer/saved" element={<SavedItems />} />
            <Route path="/customer/give-food" element={<GiveFood />} />
            <Route path="/customer/schedule" element={<SchedulePickup />} />
            <Route path="/customer/impact" element={<Impact />} />
            <Route path="/customer/profile" element={<Profile />} />
            <Route path="/customer/settings" element={<Settings />} />
          </Route>

          {/* Public Routes - WITH Navbar and Footer */}
          <Route element={<PublicLayout />}>
            {/* Auth Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Role Dashboards */}
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
