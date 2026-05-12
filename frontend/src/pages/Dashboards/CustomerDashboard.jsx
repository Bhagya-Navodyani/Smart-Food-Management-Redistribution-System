import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
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
  const navigate = useNavigate();
  const [animateStats, setAnimateStats] = useState(false);
  const [foodSearch, setFoodSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const handleFoodSearch = (event) => {
    event.preventDefault();
    const query = foodSearch.trim();
    const params = new URLSearchParams();

    if (query) params.set('search', query);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);

    const queryString = params.toString();
    navigate(queryString ? `/customer/browse-food?${queryString}` : '/customer/browse-food');
  };

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
      link: '/customer/browse-food',
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
      {/* Search & Filter Strip */}
      <div className="max-w-7xl mx-auto mb-8">
        <form
          onSubmit={handleFoodSearch}
          className="rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-4 sm:p-5"
        >
          <div className="flex flex-col xl:flex-row gap-4 xl:gap-5 items-stretch xl:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
                placeholder="Search for food items..."
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="flex flex-wrap gap-3 xl:gap-4 justify-start xl:justify-end">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'vegetables', label: 'Vegetables' },
                { id: 'fruits', label: 'Fruits' },
                { id: 'dairy', label: 'Dairy' },
                { id: 'bakery', label: 'Bakery' },
              ].map((category) => {
                const isActive = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`h-14 rounded-full px-6 text-base font-semibold transition-all duration-200 ${isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mr-1">Quick:</span>
            {[
              { id: 'all', label: 'All Items' },
              { id: 'vegetables', label: 'Vegetables' },
              { id: 'fruits', label: 'Fruits' },
              { id: 'dairy', label: 'Dairy' },
              { id: 'bakery', label: 'Bakery' },
            ].map((category) => {
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${isActive
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </form>
      </div>

      {/* High-Visibility Status Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* RED Card: Items Expiring Today */}
          <Link to="/customer/orders" className="group">
            <div className="bg-red-500 rounded-xl p-8 hover:bg-red-600 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-semibold text-white mb-2">3</div>
                <p className="text-sm md:text-base font-semibold text-white mb-1 tracking-tight">Items Expiring Today</p>
                <p className="text-red-100 text-xs font-normal">Act now to save food!</p>
              </div>
            </div>
          </Link>

          {/* GREEN Card: Total Items Saved */}
          <Link to="/customer/impact" className="group">
            <div className="bg-green-500 rounded-xl p-8 hover:bg-green-600 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-semibold text-white mb-2">247</div>
                <p className="text-sm md:text-base font-semibold text-white mb-1 tracking-tight">Total Items Saved</p>
                <p className="text-green-100 text-xs font-normal">Great job helping!</p>
              </div>
            </div>
          </Link>

          {/* BLUE Card: New Items in Marketplace */}
          <Link to="/customer/browse-food" className="group">
            <div className="bg-blue-500 rounded-xl p-8 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-semibold text-white mb-2">12</div>
                <p className="text-sm md:text-base font-semibold text-white mb-1 tracking-tight">New Deals Available</p>
                <p className="text-blue-100 text-xs font-normal">Save money now!</p>
              </div>
            </div>
          </Link>
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
                    <p className="text-xl md:text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.18em]">{stat.title}</p>
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
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2 tracking-tight">
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
                          <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base">{action.title}</h3>
                          <p className="text-xs md:text-sm text-gray-500">{action.description}</p>
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
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2 tracking-tight">
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
                    <h3 className="font-medium text-gray-900 text-sm md:text-base">{activity.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{activity.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[11px] md:text-xs text-gray-400 font-medium">{activity.time}</span>
                      <span className="text-[11px] md:text-xs font-semibold text-green-600">{activity.impact}</span>
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
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2 tracking-tight">
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
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{tip.title}</h3>
                        <p className="text-[11px] md:text-xs text-gray-500">{tip.description}</p>
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
            <h3 className="text-sm md:text-base font-semibold mb-4 tracking-tight">Monthly Savings Goal</h3>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2 font-medium">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-white rounded-full h-3 transition-all duration-500" style={{width: '75%'}}></div>
              </div>
            </div>
            <p className="text-xs text-white/90 font-normal">Great job! You've saved $892 this month. Just $108 more to reach your goal!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
