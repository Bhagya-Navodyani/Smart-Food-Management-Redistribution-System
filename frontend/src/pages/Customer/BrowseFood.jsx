import React, { useState } from 'react';
import {
  Search,
  Filter,
  Clock,
  MapPin,
  Star,
  Heart,
  ShoppingCart,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const BrowseFood = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedItems, setSavedItems] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Items', color: 'bg-gray-100' },
    { id: 'vegetables', name: 'Vegetables', color: 'bg-green-100' },
    { id: 'fruits', name: 'Fruits', color: 'bg-red-100' },
    { id: 'dairy', name: 'Dairy', color: 'bg-blue-100' },
    { id: 'bakery', name: 'Bakery', color: 'bg-yellow-100' },
  ];

  const foodItems = [
    {
      id: 1,
      name: 'Fresh Organic Vegetables',
      store: 'Green Market',
      originalPrice: 24.99,
      discountedPrice: 12.99,
      discount: 48,
      expiryDate: '2024-05-08',
      quantity: '5kg',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      distance: '0.5 km',
      description: 'Fresh organic vegetables including carrots, broccoli, and spinach',
      category: 'vegetables'
    },
    {
      id: 2,
      name: 'Artisan Bread Collection',
      store: 'City Bakery',
      originalPrice: 18.99,
      discountedPrice: 8.99,
      discount: 53,
      expiryDate: '2024-05-05',
      quantity: '6 pieces',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      distance: '0.8 km',
      description: 'Freshly baked sourdough, whole wheat, and rye bread',
      category: 'bakery'
    },
    {
      id: 3,
      name: 'Mixed Fruits Basket',
      store: 'Fruit Paradise',
      originalPrice: 32.99,
      discountedPrice: 16.99,
      discount: 48,
      expiryDate: '2024-05-07',
      quantity: '3kg',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
      distance: '1.2 km',
      description: 'Seasonal fruits including apples, oranges, and bananas',
      category: 'fruits'
    },
    {
      id: 4,
      name: 'Dairy Products Pack',
      store: 'Fresh Dairy Co.',
      originalPrice: 28.99,
      discountedPrice: 14.99,
      discount: 48,
      expiryDate: '2024-05-06',
      quantity: '2L milk + 500g cheese',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
      rating: 4.6,
      distance: '0.3 km',
      description: 'Fresh milk and artisanal cheese from local farms',
      category: 'dairy'
    },
  ];

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSave = (itemId) => {
    setSavedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryColor = (days) => {
    if (days <= 2) return 'text-red-600 bg-red-50';
    if (days <= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Food</h1>
        <p className="text-gray-600">Find amazing deals on fresh food near you</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-4 py-2 rounded-full font-medium transition-all
                  ${selectedCategory === cat.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
          const isSaved = savedItems.has(item.id);
          
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Image with Discount Badge */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {item.discount}% OFF
                </div>
                <button
                  onClick={() => toggleSave(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                  />
                </button>
                <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getExpiryColor(daysUntilExpiry)}`}>
                  <Clock className="w-3 h-3 inline mr-1" />
                  {daysUntilExpiry} days left
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.store}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {item.distance}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {item.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-green-600">${item.discountedPrice}</span>
                      <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.quantity}</p>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Claim
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseFood;
