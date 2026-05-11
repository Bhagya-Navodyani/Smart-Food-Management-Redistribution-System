import React, { useRef, useState } from 'react';
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
  Map
} from 'lucide-react';
import {
  getGiveFoodListings,
  saveGiveFoodListings
} from '../../data/giveFoodListings';
import LocationPicker from '../../components/LocationPicker';

const GiveFood = () => {
  const navigate = useNavigate();
  const defaultListingImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
  const fileInputRef = useRef(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [myListings, setMyListings] = useState(() => getGiveFoodListings());
  const [showLocationPicker, setShowLocationPicker] = useState(false);
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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    } else if (formData.itemName.trim().length < 3) {
      newErrors.itemName = 'Item name must be at least 3 characters';
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (formData.expiryDate < today) {
      newErrors.expiryDate = 'Expiry date must be in the future';
    }

    if (!formData.availableFrom) {
      newErrors.availableFrom = 'Available from date is required';
    } else if (formData.availableFrom < today) {
      newErrors.availableFrom = 'Must be today or later';
    }

    if (!formData.availableUntil) {
      newErrors.availableUntil = 'Available until date is required';
    } else if (formData.availableUntil < formData.availableFrom) {
      newErrors.availableUntil = 'Must be after available from date';
    }

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    } else if (formData.pickupLocation.trim().length < 5) {
      newErrors.pickupLocation = 'Pickup location must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      pickupLocation: location
    });
    if (errors.pickupLocation) {
      setErrors({
        ...errors,
        pickupLocation: ''
      });
    }
  };

  const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    const uploadedImages = [];

    for (const file of imageFiles) {
      if (file.size > 10 * 1024 * 1024) {
        continue;
      }

      try {
        const dataUrl = await readFileAsDataUrl(file);
        uploadedImages.push(dataUrl);
      } catch (error) {
        console.error('Failed to read image file:', error);
      }
    }

    setFormData((currentFormData) => ({
      ...currentFormData,
      images: [...currentFormData.images, ...uploadedImages]
    }));

    event.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const nextListing = {
      id: Date.now(),
      itemName: formData.itemName,
      category: String(formData.category).toUpperCase(),
      quantity: parseFloat(formData.quantity),
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
      images: formData.images.length ? formData.images : [defaultListingImage],
      listedDate: new Date().toISOString().split('T')[0]
    };

    setMyListings((currentListings) => {
      const nextListings = [nextListing, ...currentListings];
      saveGiveFoodListings(nextListings);
      return nextListings;
    });

    setShowAddModal(false);
    setSelectedFilter('all');
    setSearchTerm('');
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

  const filteredListings = myListings.filter(listing => {
    const matchesFilter = selectedFilter === 'all' || listing.status === selectedFilter;
    const matchesSearch = listing.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusFilters = [
    { id: 'all', name: 'All' },
    { id: 'available', name: 'Available' },
    { id: 'requested', name: 'Requested' },
    { id: 'claimed', name: 'Claimed' },
    { id: 'expired', name: 'Expired' }
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
                  src={listing.images[0] || defaultListingImage}
                  alt={listing.itemName}
                  className="w-32 h-32 rounded-xl object-cover"
                />
              </div>

              {/* Middle: Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-xl mb-1">{listing.itemName}</h3>
                <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-3">{listing.category}</p>
                
                {listing.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
                )}

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
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

                <div className="flex items-center gap-6 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <div>
                    <span className="font-medium text-gray-600">Available:</span> {new Date(listing.availableFrom).toLocaleDateString()} - {new Date(listing.availableUntil).toLocaleDateString()}
                  </div>
                  {listing.preferredRecipient && listing.preferredRecipient !== 'any' && (
                    <div>
                      <span className="font-medium text-gray-600">For:</span> {String(listing.preferredRecipient).charAt(0).toUpperCase() + String(listing.preferredRecipient).slice(1)}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Status and Actions */}
              <div className="flex-shrink-0 flex flex-col items-end justify-between min-w-[220px]">
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

                <button
                  onClick={() => navigate(`/food-details/${listing.id}`)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 font-semibold text-sm flex items-center gap-2 group"
                >
                  <span>VIEW DETAILS</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Listing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">List New Food Item</h2>
                <p className="text-sm text-gray-600 mt-1">Share your excess food with those in need</p>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setErrors({});
                }}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded"></div>
                  <h3 className="font-bold text-lg text-gray-900">Basic Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Item Name *</label>
                    <input
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.itemName
                          ? 'border-red-400 focus:ring-red-300 bg-red-50'
                          : 'border-gray-300 focus:ring-green-400 focus:border-green-500'
                      }`}
                      placeholder="e.g., Fresh Organic Vegetables"
                    />
                    {errors.itemName && <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.itemName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all"
                    >
                      <option value="vegetables">🥬 Vegetables</option>
                      <option value="fruits">🍎 Fruits</option>
                      <option value="dairy">🥛 Dairy</option>
                      <option value="bakery">🍞 Bakery</option>
                      <option value="cooked">🍲 Cooked Food</option>
                      <option value="packaged">📦 Packaged</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all resize-none"
                    placeholder="Describe your food item, condition, and any special notes..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Help others understand what you're offering</p>
                </div>
              </div>

              {/* Quantity & Availability */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded"></div>
                  <h3 className="font-bold text-lg text-gray-900">Quantity & Availability</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || parseFloat(value) >= 0) {
                          handleInputChange(e);
                        }
                      }}
                      min="0"
                      max="999999"
                      step="0.1"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.quantity
                          ? 'border-red-400 focus:ring-red-300 bg-red-50'
                          : 'border-gray-300 focus:ring-blue-400 focus:border-blue-500'
                      }`}
                      placeholder="Enter amount"
                    />
                    {errors.quantity && <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.quantity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Unit *</label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
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
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Expiry Date *</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.expiryDate
                          ? 'border-red-400 focus:ring-red-300 bg-red-50'
                          : 'border-gray-300 focus:ring-blue-400 focus:border-blue-500'
                      }`}
                    />
                    {errors.expiryDate && <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.expiryDate}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Available From *</label>
                    <input
                      type="date"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.availableFrom
                          ? 'border-red-400 focus:ring-red-300 bg-red-50'
                          : 'border-gray-300 focus:ring-blue-400 focus:border-blue-500'
                      }`}
                    />
                    {errors.availableFrom && <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.availableFrom}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Available Until *</label>
                    <input
                      type="date"
                      name="availableUntil"
                      value={formData.availableUntil}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.availableUntil
                          ? 'border-red-400 focus:ring-red-300 bg-red-50'
                          : 'border-gray-300 focus:ring-blue-400 focus:border-blue-500'
                      }`}
                    />
                    {errors.availableUntil && <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.availableUntil}</p>}
                  </div>
                </div>
              </div>

              {/* Location & Recipient */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded"></div>
                  <h3 className="font-bold text-lg text-gray-900">Location & Recipient</h3>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Pickup Location *</label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      autoComplete="off"
                      className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.pickupLocation
                          ? 'border-red-400 focus:ring-red-300 bg-red-50'
                          : 'border-gray-300 focus:ring-purple-400 focus:border-purple-500'
                      }`}
                      placeholder="Enter pickup address"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLocationPicker(true)}
                      className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all whitespace-nowrap sm:self-auto self-start"
                      title="Open map to select location"
                    >
                      <Map className="w-4 h-4" />
                      <span>Map</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Use the map button to pick a location visually.</p>
                  {errors.pickupLocation && <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.pickupLocation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Preferred Recipient</label>
                  <select
                    name="preferredRecipient"
                    value={formData.preferredRecipient}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all"
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
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-orange-500 rounded"></div>
                  <h3 className="font-bold text-lg text-gray-900">Photos</h3>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors bg-gray-50 hover:bg-green-50">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium mb-2">Add photos of your food item</p>
                  <p className="text-gray-500 text-sm mb-4">High quality photos help others trust your listing</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all font-medium"
                  >
                    Choose Files
                  </button>
                  <p className="text-xs text-gray-500 mt-3">PNG, JPG up to 10MB each</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {formData.images.map((image, index) => (
                        <div key={`${image}-${index}`} className="rounded-lg overflow-hidden border-2 border-green-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <img src={image} alt={`Uploaded preview ${index + 1}`} className="w-full h-24 object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setErrors({});
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all"
                >
                  List Food Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Location Picker Modal */}
      <LocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onSelectLocation={handleLocationSelect}
        currentLocation={formData.pickupLocation}
      />
    </div>
  );
};

export default GiveFood;
