import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../organization/Sidebar';

const OrganizationLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pt-0">
        <div className="p-0"> {/* Removed extra padding to allow full-width headers */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default OrganizationLayout;
