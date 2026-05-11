import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Camera,
  MapPin,
  Calendar,
  Clock,
  Package,
  Users,
  CheckCircle,
  AlertCircle,
  X,
  Search,
  Heart,
  Trash2
} from 'lucide-react';
import {
  deleteGiveFoodListing,
  getGiveFoodListings,
  saveGiveFoodListings
} from '../../data/giveFoodListings';

const GiveFood = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [myListings, setMyListings] = useState(() => getGiveFoodListings());
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'vegetables',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    description: '',
    pickupLocation: '',
    availableFrom: '',
    availableUntil: '',
    preferredRecipient: 'any',
    images: []
  });

  const recipientTypes = [
    { id: 'any', name: 'Anyone', description: 'Available to all' },
    { id: 'organization', name: 'Organizations', description: 'Food banks, charities' },
    { id: 'seller', name: 'Sellers', description: 'Restaurants, stores' },
    { id: 'individual', name: 'Individuals', description: 'People in need' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'text-green-600 bg-green-50';
      case 'requested': return 'text-yellow-600 bg-yellow-50';
      case 'claimed': return 'text-blue-600 bg-blue-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'requested': return <AlertCircle className="w-4 h-4" />;
      case 'claimed': return <Package className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit the food listing
    console.log('Submitting food listing:', formData);
    const nextListing = {
      id: Date.now(),
      itemName: formData.itemName,
      category: String(formData.category).toUpperCase(),
      quantity: formData.quantity,
      unit: formData.unit,
      expiryDate: formData.expiryDate,
      description: formData.description,
      pickupLocation: formData.pickupLocation,
      availableFrom: formData.availableFrom,
      availableUntil: formData.availableUntil,
      preferredRecipient: formData.preferredRecipient,
      status: 'available',
      views: 0,
      requests: 0,
      images: [],
      listedDate: new Date().toISOString().split('T')[0]
    };

    setMyListings((currentListings) => {
      const nextListings = [nextListing, ...currentListings];
      saveGiveFoodListings(nextListings);
      return nextListings;
    });

    setShowAddModal(false);
    // Reset form
    setFormData({
      itemName: '',
      category: 'vegetables',
      quantity: '',
      unit: 'kg',
      expiryDate: '',
      description: '',
      pickupLocation: '',
      availableFrom: '',
      availableUntil: '',
      preferredRecipient: 'any',
      images: []
    });
  };

  const handleDeleteListing = (listingId) => {
    const confirmDelete = window.confirm('Delete this food listing? This action cannot be undone.');

    if (!confirmDelete) {
      return;
    }

    setMyListings((currentListings) => {
      const nextListings = currentListings.filter((listing) => listing.id !== listingId);
      saveGiveFoodListings(nextListings);
      return nextListings;
    });

    deleteGiveFoodListing(listingId);
  };

  const filteredListings = myListings.filter(listing => {
    const matchesFilter = selectedFilter === 'all' || listing.status === selectedFilter;
    const matchesSearch = listing.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusFilters = [
    { id: 'all', name: 'All', count: 8, color: 'text-gray-900' },
    { id: 'available', name: 'Available', count: 4, color: 'text-green-600' },
    { id: 'requested', name: 'Requested', count: 2, color: 'text-yellow-600' },
    { id: 'claimed', name: 'Claimed', count: 1, color: 'text-blue-600' },
    { id: 'expired', name: 'Expired', count: 1, color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">My Food Listings</h1>
            <p className="text-gray-600">Track and manage your food donations and giveaways.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            List New Item
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-5 gap-4">
          {statusFilters.map((filter) => (
            <div key={filter.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{filter.name}</p>
              <p className={`text-3xl font-bold ${filter.color}`}>{filter.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-4">
            {/* Search Bar - Left Side */}
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-64"
              />
            </div>
            
            {/* Filter Tabs - Right Side */}
            <div className="flex gap-1">
              {statusFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all
                    ${selectedFilter === filter.id
                      ? 'bg-green-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Food Listings */}
      <div className="max-w-7xl mx-auto space-y-4">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
            <div className="flex gap-6">
              {/* Left: Food Image */}
              <div className="flex-shrink-0">
                <img
                  src={listing.images[0]}
                  alt={listing.itemName}
                  className="w-32 h-32 rounded-xl object-cover"
                />
              </div>

              {/* Middle: Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-xl mb-1">{listing.itemName}</h3>
                <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-3">{listing.category}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    <span>{listing.quantity} {listing.unit}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{listing.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Expires {new Date(listing.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Right: Status and Actions */}
              <div className="flex-shrink-0 flex flex-col items-end justify-between">
                <div className="text-right mb-4">
                  <span className={"inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold " + getStatusColor(listing.status)}>
                    {getStatusIcon(listing.status)}
                    {listing.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="text-right mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Listed</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(listing.listedDate).toLocaleDateString()}</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>Views: {listing.views}</span>
                  <span>•</span>
                  <span>Requests: {listing.requests}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteListing(listing.id)}
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/food-details/${listing.id}`)}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm flex items-center gap-2">
                    VIEW DETAILS
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Listing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">List New Food Item</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                    <input
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Fresh Organic Vegetables"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="dairy">Dairy</option>
                      <option value="bakery">Bakery</option>
                      <option value="cooked">Cooked Food</option>
                      <option value="packaged">Packaged</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Describe your food item, condition, and any special notes..."
                  />
                </div>
              </div>

              {/* Quantity & Availability */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Quantity & Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="kg">Kilograms</option>
                      <option value="g">Grams</option>
                      <option value="lbs">Pounds</option>
                      <option value="pieces">Pieces</option>
                      <option value="boxes">Boxes</option>
                      <option value="liters">Liters</option>
                      <option value="ml">Milliliters</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available From *</label>
                    <input
                      type="date"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Until *</label>
                    <input
                      type="date"
                      name="availableUntil"
                      value={formData.availableUntil}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Recipient */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Location & Recipient</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location *</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter pickup address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Recipient</label>
                  <select
                    name="preferredRecipient"
                    value={formData.preferredRecipient}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {recipientTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Photos</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Add photos of your food item</p>
                  <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Choose Files
                  </button>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  List Food Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveFood;
