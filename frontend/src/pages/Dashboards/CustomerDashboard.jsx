import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Package, XCircle, Activity } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import AnimatedCard from '../../components/dashboard/AnimatedCard';
import AlertsPanel from '../../components/dashboard/AlertsPanel';
import SuggestionsPanel from '../../components/dashboard/SuggestionsPanel';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import QuickActions from '../../components/dashboard/QuickActions';
import {
  customerActionStats,
  customerFoodItems,
  customerRecentActivity,
  smartAlerts,
  smartSuggestions,
  categoryDistribution,
  expiryTrend
} from '../../data/customerData';

const statusColors = {
  Fresh: '#10b981',
  'Near Expiry': '#f59e0b',
  Expired: '#ef4444'
};

function getStatusCount(status) {
  return customerFoodItems.filter((item) => item.status === status).length;
}

export default function CustomerDashboard() {
  const totalItems = customerFoodItems.length;
  const nearExpiryItems = getStatusCount('Near Expiry');
  const expiredItems = getStatusCount('Expired');
  const wasteReductionScore = 78;

  const ratioData = [
    { name: 'Saved', value: customerActionStats.saved, color: '#10b981' },
    { name: 'Wasted', value: customerActionStats.wasted, color: '#ef4444' }
  ];

  const statusData = [
    { name: 'Fresh', count: getStatusCount('Fresh') },
    { name: 'Near Expiry', count: nearExpiryItems },
    { name: 'Expired', count: expiredItems }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">
      {/* Header */}
      <motion.div className="mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="mt-3 text-lg text-emerald-50">Your intelligent food management center. Track, optimize, and reduce waste.</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-600 bg-opacity-40 backdrop-blur-md border border-white border-opacity-20 rounded-full px-4 py-2">
              <span className="text-sm font-semibold">Waste Reduction Score</span>
              <span className="bg-emerald-900 bg-opacity-50 rounded-full px-3 py-1 text-sm font-bold">{wasteReductionScore}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.section className="mb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatedCard icon={Package} title="Total Items" value={totalItems} color="#3b82f6" delay={0} />
          <AnimatedCard icon={AlertTriangle} title="Near Expiry" value={nearExpiryItems} color="#f59e0b" delay={0.1} />
          <AnimatedCard icon={XCircle} title="Expired" value={expiredItems} color="#ef4444" delay={0.2} />
          <AnimatedCard icon={Activity} title="Recent Activity" value={customerRecentActivity.length} color="#06b6d4" delay={0.3} />
        </div>
      </motion.section>

      {/* Alerts & Suggestions */}
      <motion.div className="grid gap-6 lg:grid-cols-2 mb-8">
        <AlertsPanel alerts={smartAlerts} />
        <SuggestionsPanel suggestions={smartSuggestions} />
      </motion.div>

      {/* Charts */}
      <motion.section className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Saved vs Wasted</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ratioData} dataKey="value" nameKey="name" outerRadius={95} innerRadius={50}>
                  {ratioData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Food Status Overview</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={statusColors[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.section>

      {/* Timeline & Quick Actions */}
      <motion.section className="grid gap-6 lg:grid-cols-2 mb-8">
        <ActivityTimeline activities={customerRecentActivity} />
        <QuickActions />
      </motion.section>

      {/* Quick Navigation */}
      <motion.section className="grid gap-3 md:grid-cols-4">
        <Link to="/customer/food-list" className="rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100">📦 Food List</Link>
        <Link to="/customer/expiry-tracking" className="rounded-lg border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-100">⏰ Expiry Tracking</Link>
        <Link to="/customer/actions" className="rounded-lg border-2 border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100">⚡ Take Action</Link>
        <Link to="/customer/impact" className="rounded-lg border-2 border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 hover:bg-cyan-100">📊 Analytics</Link>
      </motion.section>
    </div>
  );
}
