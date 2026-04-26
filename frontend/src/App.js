import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import OrganizationLayout from './components/layouts/OrganizationLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Organization Routes */}
          <Route element={<OrganizationLayout />}>
            <Route path="/organization/dashboard" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">Organization Dashboard</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">Welcome to the Smart Food Management & Redistribution System Organization Portal.</p></div></div>} />
            <Route path="/organization/food-feed" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">Food Feed</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">View available donations from users/shops.</p></div></div>} />
            <Route path="/organization/my-requests" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">My Requests</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">Track items the organization has claimed.</p></div></div>} />
            <Route path="/organization/donation-history" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">Donation History</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">Past received donations.</p></div></div>} />
            <Route path="/organization/impact-analytics" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">Impact Analytics</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">Visual representation of food saved.</p></div></div>} />
            <Route path="/organization/settings" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1><div className="bg-white rounded-lg shadow p-6"><p className="text-gray-600">Profile and notification management.</p></div></div>} />
          </Route>

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/organization/dashboard" />} />
          <Route path="*" element={<Navigate to="/organization/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
