import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerSidebar from '../customer/CustomerSidebar';

const CustomerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <CustomerSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
