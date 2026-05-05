import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Package,
  Heart,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Calendar,
  MapPin,
  Star,
  Lightbulb,
  Target,
  Award,
  Sprout
} from 'lucide-react';

export default function CustomerDashboard() {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const stats = [
    {
      title: 'Food Saved',
      value: '247kg',
      change: '+12%',
      icon: Package,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80'
    },
    {
      title: 'Money Saved',
      value: '$892',
      change: '+8%',
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80'
    },
    {
      title: 'People Helped',
      value: '156',
      change: '+15%',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100&q=80'
    },
    {
      title: 'CO₂ Reduced',
      value: '423kg',
      change: '+18%',
      icon: Sprout,
      color: 'from-emerald-400 to-green-500',
      bgColor: 'bg-emerald-50',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=100&q=80'
    }
  ];

  const quickActions = [
    {
      title: 'Browse Food',
      description: 'Find discounted food near you',
      icon: Target,
      color: 'bg-green-500',
      link: '/marketplace',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80'
    },
    {
      title: 'My Orders',
      description: 'Track your food orders',
      icon: Package,
      color: 'bg-blue-500',
      link: '/customer/orders',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=200&q=80'
    },
    {
      title: 'Saved Items',
      description: 'View your saved food deals',
      icon: Heart,
      color: 'bg-red-500',
      link: '/customer/saved',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=200&q=80'
    },
    {
      title: 'Schedule Pickup',
      description: 'Book your pickup times',
      icon: Calendar,
      color: 'bg-purple-500',
      link: '/customer/schedule',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'saved',
      title: 'Claimed food deal',
      description: '50% off vegetables from Green Market',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=60&q=60',
      impact: '+$12 saved'
    },
    {
      id: 2,
      type: 'claimed',
      title: 'Picked up order',
      description: 'Artisan bread from City Bakery',
      time: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=60&q=60',
      impact: '+$8 saved'
    },
    {
      id: 3,
      type: 'saved',
      title: 'New food available',
      description: 'Fresh fruits basket 48% off',
      time: '1 day ago',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=60&q=60',
      impact: 'Limited time'
    },
    {
      id: 4,
      type: 'expired',
      title: 'Deal expiring soon',
      description: 'Dairy products - 2 days left',
      time: '2 days ago',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=60&q=60',
      impact: 'Act fast'
    }
  ];

  const tips = [
    {
      icon: Lightbulb,
      title: 'Best Time to Shop',
      description: 'Visit stores in the evening for best discounts',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80'
    },
    {
      icon: Heart,
      title: 'Share with Friends',
      description: 'Tell friends about great deals to help everyone save',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80'
    },
    {
      icon: Sprout,
      title: 'Reduce Waste',
      description: 'Plan meals to use all food before expiry',
      image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=200&q=80'
    }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'saved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'claimed': return <Target className="w-4 h-4 text-blue-500" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Dashboard</h1>
              <p className="text-gray-600">Find great food deals and reduce waste in your community</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome back!</p>
              <p className="text-lg font-semibold text-green-600">Smart Saver</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            
            return (
              <div key={index} className={`${stat.bgColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src={stat.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} to={action.link} className="group">
                    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-green-300">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 ${action.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 h-20 rounded-lg overflow-hidden">
                        <img 
                          src={action.image} 
                          alt={action.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="relative">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className="text-xs font-medium text-green-600">{activity.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips & Insights */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Smart Tips
            </h2>
            <div className="space-y-4">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h3>
                        <p className="text-xs text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                    <div className="mt-2 h-24 rounded-lg overflow-hidden">
                      <img 
                        src={tip.image} 
                        alt={tip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Monthly Savings Goal</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-white rounded-full h-3 transition-all duration-500" style={{width: '75%'}}></div>
              </div>
            </div>
            <p className="text-sm text-white/90">Great job! You've saved $892 this month. Just $108 more to reach your goal!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
