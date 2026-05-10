import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../organization/Sidebar';
import { ClipboardList, CheckCircle2, AlertTriangle, BarChart3 } from 'lucide-react';

const OrganizationLayout = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Food Request",
      message: "Hope Orphanage has requested 20kg of rice from your recent listing.",
      time: "2 mins ago",
      type: "info",
      unread: true,
      icon: ClipboardList
    },
    {
      id: 2,
      title: "Donation Completed",
      message: "Your donation to Community Kitchen was successfully delivered.",
      time: "1 hour ago",
      type: "success",
      unread: true,
      icon: CheckCircle2
    },
    {
      id: 3,
      title: "Security Alert",
      message: "A new login was detected from a Chrome browser on Windows.",
      time: "3 hours ago",
      type: "warning",
      unread: false,
      icon: AlertTriangle
    },
    {
      id: 4,
      title: "Monthly Impact Report",
      message: "Your organization helped save 450kg of food this month!",
      time: "1 day ago",
      type: "success",
      unread: false,
      icon: BarChart3
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar unreadCount={unreadCount} />
      <main className="flex-1 overflow-y-auto pt-0">
        <div className="p-0">
          <Outlet context={{ notifications, setNotifications }} />
        </div>
      </main>
    </div>
  );
};

export default OrganizationLayout;
