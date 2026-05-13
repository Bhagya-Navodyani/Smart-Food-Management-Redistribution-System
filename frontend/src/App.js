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
import Cart from './pages/Organization/Cart';
import ShoppingDashboard from './pages/Organization/Shopping/ShoppingDashboard';

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
import MyOrders from './pages/Customer/MyOrders';
import Impact from './pages/Customer/Impact';
import Settings from './pages/Customer/Settings';
import GiveFood from './pages/Customer/GiveFood';

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
            <Route path="/organization/settings/:tab" element={<OrganizationSettings />} />
            <Route path="/organization/cart" element={<Cart />} />
            <Route path="/organization/shopping" element={<ShoppingDashboard />} />
            <Route path="/organization/shopping/cart" element={<Cart />} />
          </Route>

          {/* Customer Routes - WITH Sidebar Navigation */}
          <Route element={<CustomerLayout />}>
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/browse-food" element={<BrowseFood />} />
            <Route path="/customer/food-list" element={<FoodList />} />
            <Route path="/customer/marketplace" element={<BrowseFood />} />
            <Route path="/customer/orders" element={<MyOrders />} />
            <Route path="/customer/give-food" element={<GiveFood />} />
            <Route path="/customer/impact" element={<Impact />} />
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
