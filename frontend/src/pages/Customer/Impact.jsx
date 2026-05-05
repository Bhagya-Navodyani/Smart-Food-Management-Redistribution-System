import React, { useState } from 'react';
import {
  TrendingUp,
  Sprout,
  Users,
  Heart,
  Award,
  Target,
  Calendar,
  TreePine,
  Droplets,
  Recycle,
  Package
} from 'lucide-react';

const Impact = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const impactStats = [
    {
      title: 'Food Saved',
      value: '247kg',
      unit: 'kilograms',
      change: '+12%',
      icon: Package,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      description: 'Equivalent to 494 meals'
    },
    {
      title: 'Money Saved',
      value: '$892',
      unit: 'dollars',
      change: '+8%',
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      description: 'Through smart food choices'
    },
    {
      title: 'CO₂ Reduced',
      value: '423kg',
      unit: 'kilograms',
      change: '+18%',
      icon: TreePine,
      color: 'from-emerald-400 to-green-500',
      bgColor: 'bg-emerald-50',
      description: 'Like planting 21 trees'
    },
    {
      title: 'People Helped',
      value: '156',
      unit: 'people',
      change: '+15%',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      description: 'Through food sharing'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Eco Warrior',
      description: 'Saved over 200kg of food',
      icon: Sprout,
      progress: 100,
      target: 200,
      current: 247,
      color: 'bg-green-500',
      unlocked: true
    },
    {
      id: 2,
      title: 'Super Saver',
      description: 'Saved over $500 through discounts',
      icon: TrendingUp,
      progress: 100,
      target: 500,
      current: 892,
      color: 'bg-blue-500',
      unlocked: true
    },
    {
      id: 3,
      title: 'Community Hero',
      description: 'Helped over 100 people',
      icon: Heart,
      progress: 100,
      target: 100,
      current: 156,
      color: 'bg-red-500',
      unlocked: true
    },
    {
      id: 4,
      title: 'Green Champion',
      description: 'Reduce 500kg CO₂ emissions',
      icon: TreePine,
      progress: 85,
      target: 500,
      current: 423,
      color: 'bg-emerald-500',
      unlocked: false
    }
  ];

  const monthlyData = [
    { month: 'Jan', foodSaved: 45, moneySaved: 120, co2Reduced: 80 },
    { month: 'Feb', foodSaved: 52, moneySaved: 145, co2Reduced: 92 },
    { month: 'Mar', foodSaved: 38, moneySaved: 98, co2Reduced: 68 },
    { month: 'Apr', foodSaved: 61, moneySaved: 178, co2Reduced: 110 },
    { month: 'May', foodSaved: 51, moneySaved: 151, co2Reduced: 93 }
  ];

  const environmentalFacts = [
    {
      icon: Droplets,
      title: 'Water Saved',
      value: '15,000L',
      description: 'By reducing food waste'
    },
    {
      icon: Recycle,
      title: 'Waste Diverted',
      value: '85%',
      description: 'From landfills'
    },
    {
      icon: TreePine,
      title: 'Trees Equivalent',
      value: '21',
      description: 'CO₂ absorption'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Impact</h1>
        <p className="text-gray-600">Track your contribution to reducing food waste and helping the environment</p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {impactStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          
          return (
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Monthly Progress</h2>
              <div className="flex gap-2">
                {['month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${selectedPeriod === period
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Simple Bar Chart Representation */}
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm text-gray-600">{data.month}</div>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(data.foodSaved / 70) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        {data.foodSaved}kg
                      </span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(data.moneySaved / 200) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        ${data.moneySaved}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Food Saved (kg)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Money Saved ($)</span>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Environmental Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {environmentalFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{fact.value}</p>
                    <p className="text-sm font-medium text-gray-700 mb-1">{fact.title}</p>
                    <p className="text-xs text-gray-500">{fact.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${achievement.unlocked ? achievement.color : 'bg-gray-200'} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${achievement.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {achievement.current}/{achievement.target}
                        </p>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <div className="mt-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Unlocked
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Monthly Goals
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Food Saved</span>
                  <span>51/60kg</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Money Saved</span>
                  <span>$151/$200</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-white/90 mt-4">
              Keep going! You're doing great this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
