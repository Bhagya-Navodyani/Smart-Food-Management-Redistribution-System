import React, { useState } from 'react';
import {
  Heart,
  Clock,
  MapPin,
  Star,
  AlertCircle,
  Filter,
  Search,
  X,
  TrendingUp
} from 'lucide-react';

const SavedItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('expiry');

  const savedItems = [
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
      savedDate: '2024-05-01',
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
      savedDate: '2024-05-02',
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
      savedDate: '2024-05-03',
      category: 'fruits'
    }
  ];

  const sortOptions = [
    { value: 'expiry', label: 'Sort by Expiry' },
    { value: 'discount', label: 'Sort by Discount' },
    { value: 'price', label: 'Sort by Price' },
    { value: 'saved', label: 'Sort by Saved Date' }
  ];

  const filteredAndSortedItems = savedItems
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'expiry':
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        case 'discount':
          return b.discount - a.discount;
        case 'price':
          return a.discountedPrice - b.discountedPrice;
        case 'saved':
          return new Date(b.savedDate) - new Date(a.savedDate);
        default:
          return 0;
      }
    });

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryColor = (days) => {
    if (days <= 2) return 'text-red-600 bg-red-50 border-red-200';
    if (days <= 5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const removeSavedItem = (itemId) => {
    // Logic to remove saved item
    console.log('Removing item:', itemId);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Items</h1>
        <p className="text-gray-600">Your favorite food deals and items you're interested in</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Saved Items</p>
              <p className="text-2xl font-bold text-gray-900">{savedItems.length}</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Potential Savings</p>
              <p className="text-2xl font-bold text-green-600">$45.97</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search saved items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all
                  ${sortBy === option.value
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedItems.map((item) => {
          const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
          
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Image with Actions */}
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
                  onClick={() => removeSavedItem(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors group"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
                </button>
                <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${getExpiryColor(daysUntilExpiry)}`}>
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
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105">
                    Claim Now
                  </button>
                </div>

                {/* Saved Date */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Saved on {new Date(item.savedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAndSortedItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved items found</h3>
          <p className="text-gray-600 mb-4">Start browsing and save items you're interested in!</p>
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Browse Food
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedItems;
