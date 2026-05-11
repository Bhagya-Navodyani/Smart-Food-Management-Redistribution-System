import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  MapPin,
  Calendar,
  Clock,
  Package,
  Users,
  CheckCircle,
  AlertCircle,
  Heart,
  Share2,
  Phone,
  Mail,
  Trash2,
  Edit3,
  X
} from 'lucide-react';
import { deleteGiveFoodListing, getGiveFoodListings, updateGiveFoodListing } from '../../data/giveFoodListings';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const updateImageInputRef = useRef(null);

  const listing = getGiveFoodListings().find(item => item.id === parseInt(id));

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Food listing not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'text-green-600 bg-green-50 border-green-200';
      case 'requested': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'claimed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'expired': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'available': return <CheckCircle className="w-5 h-5" />;
      case 'requested': return <AlertCircle className="w-5 h-5" />;
      case 'claimed': return <Package className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const donorName = listing.donorName || 'Food Donor';
  const donorRating = listing.donorRating ?? 0;
  const donorPhone = listing.donorPhone || 'Not available';
  const donorEmail = listing.donorEmail || 'Not available';

  const recipientTypes = [
    { id: 'any', name: 'Anyone' },
    { id: 'organization', name: 'Organizations' },
    { id: 'seller', name: 'Sellers' },
    { id: 'individual', name: 'Individuals / Customers' }
  ];

  const openUpdateModal = () => {
    setEditForm({
      itemName: listing.itemName || '',
      category: listing.category || '',
      quantity: listing.quantity ?? '',
      unit: listing.unit || '',
      expiryDate: listing.expiryDate || '',
      description: listing.description || '',
      pickupLocation: listing.pickupLocation || '',
      availableFrom: listing.availableFrom || '',
      availableUntil: listing.availableUntil || '',
      preferredRecipient: listing.preferredRecipient || 'any',
      status: listing.status || 'available',
      images: Array.isArray(listing.images) ? listing.images : []
    });
    setShowUpdateModal(true);
  };

  const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  };

  const handleUpdateImageUpload = async (event) => {
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

    setEditForm((currentForm) => ({
      ...currentForm,
      images: [...(currentForm.images || []), ...uploadedImages]
    }));

    event.target.value = '';
  };

  const handleRemoveUpdateImage = (indexToRemove) => {
    setEditForm((currentForm) => ({
      ...currentForm,
      images: (currentForm.images || []).filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleUpdateListing = (event) => {
    event.preventDefault();

    updateGiveFoodListing(listing.id, {
      itemName: editForm.itemName,
      category: editForm.category,
      quantity: editForm.quantity,
      unit: editForm.unit,
      expiryDate: editForm.expiryDate,
      description: editForm.description,
      pickupLocation: editForm.pickupLocation,
      availableFrom: editForm.availableFrom,
      availableUntil: editForm.availableUntil,
      preferredRecipient: editForm.preferredRecipient,
      status: editForm.status,
      images: editForm.images && editForm.images.length > 0 ? editForm.images : listing.images
    });

    setShowUpdateModal(false);
    navigate(0);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Delete this food listing? This action cannot be undone.');

    if (!confirmDelete) {
      return;
    }

    deleteGiveFoodListing(listing.id);
    navigate('/customer/give-food');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={listing.images[0]}
                alt={listing.itemName}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Item Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">{listing.category}</p>
                  <h1 className="text-3xl font-bold text-gray-900">{listing.itemName}</h1>
                </div>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-3 rounded-lg transition-colors ${
                    liked
                      ? 'bg-red-50 text-red-500'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border ${getStatusColor(listing.status)}`}>
                {getStatusIcon(listing.status)}
                {listing.status.toUpperCase()}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">Description</h3>
                <p className="text-gray-600 leading-relaxed">{listing.description}</p>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Package className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Quantity</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{listing.quantity} {listing.unit}</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Expires</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{new Date(listing.expiryDate).toLocaleDateString()}</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Available</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{new Date(listing.availableFrom).toLocaleDateString()}</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Views</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{listing.views}</p>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Pickup Location</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-900 font-medium">{listing.pickupLocation}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Available from {new Date(listing.availableFrom).toLocaleDateString()} to {new Date(listing.availableUntil).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Donor Info & Actions */}
          <div className="space-y-6">
            {/* Donor Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Donor Information</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {donorName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{donorName}</p>
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(donorRating) ? 'fill-current' : 'fill-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">{donorRating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <a href={donorPhone === 'Not available' ? undefined : `tel:${donorPhone}`} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{donorPhone}</span>
                </a>
                <a href={donorEmail === 'Not available' ? undefined : `mailto:${donorEmail}`} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{donorEmail}</span>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Engagement</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">{listing.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Requests</span>
                  <span className="font-semibold text-gray-900">{listing.requests}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-semibold text-gray-900">{new Date(listing.listedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Manage Listing</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Update the post or remove it from circulation.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-xl">
                <button
                  onClick={openUpdateModal}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 shadow-sm shadow-green-200 hover:shadow-md hover:shadow-green-200"
                >
                  <Edit3 className="w-4 h-4" strokeWidth={2} />
                  Update Listing
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-3 border border-red-200 bg-red-50/40 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={2} />
                  Delete Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Update Food Listing</h2>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateListing} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    name="itemName"
                    value={editForm.itemName}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <input
                    name="unit"
                    value={editForm.unit}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="available">Available</option>
                    <option value="requested">Requested</option>
                    <option value="claimed">Claimed</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={editForm.expiryDate}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                  <input
                    name="pickupLocation"
                    value={editForm.pickupLocation}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available From</label>
                  <input
                    type="date"
                    name="availableFrom"
                    value={editForm.availableFrom}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Until</label>
                  <input
                    type="date"
                    name="availableUntil"
                    value={editForm.availableUntil}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Recipient</label>
                  <select
                    name="preferredRecipient"
                    value={editForm.preferredRecipient}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {recipientTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">System Info</label>
                  <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-500">
                    Views, requests, listed date, and donor info are managed automatically.
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Listing Photos</label>
                    <p className="text-xs text-gray-500">Add or replace photos for this listing</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateImageInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    <Camera className="w-4 h-4" />
                    Add Photos
                  </button>
                </div>
                <input
                  ref={updateImageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpdateImageUpload}
                  className="hidden"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(editForm.images || []).map((image, index) => (
                    <div key={`${image}-${index}`} className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      <img src={image} alt={`Listing preview ${index + 1}`} className="w-full h-24 object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveUpdateImage(index)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
