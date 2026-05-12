import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Clock,
  MapPin,
  Star,
  Heart,
  ShoppingCart,
  CheckCircle,
  SlidersHorizontal,
  Layers,
  TrendingUp
} from 'lucide-react';
import { getVisibleGiveFoodListings, updateGiveFoodListing } from '../../data/giveFoodListings';

const CATEGORY_OPTIONS = [
  { id: 'all', name: 'All Items' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'cooked-food', name: 'Cooked Food' },
  { id: 'packaged', name: 'Packaged' }
];

const STATUS_OPTIONS = [
  { id: 'all', name: 'All Status' },
  { id: 'available', name: 'Available' },
  { id: 'requested', name: 'Requested' },
  { id: 'claimed', name: 'Claimed' },
  { id: 'expired', name: 'Expired' }
];

const normalizeCategory = (categoryValue) => {
  const lowered = String(categoryValue || '').toLowerCase();
  if (lowered.includes('vegetable')) return 'vegetables';
  if (lowered.includes('fruit')) return 'fruits';
  if (lowered.includes('dairy') || lowered.includes('egg')) return 'dairy';
  if (lowered.includes('bakery') || lowered.includes('bread')) return 'bakery';
  if (lowered.includes('cooked')) return 'cooked-food';
  if (lowered.includes('packaged')) return 'packaged';
  return 'all';
};

const parseNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const BrowseFood = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [savedItems, setSavedItems] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('savedFoodItemIds') || '[]'));
    } catch {
      return new Set();
    }
  });
  const [claimedItems, setClaimedItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('customerClaimedOrders') || '[]');
      return new Set(stored.map((order) => order.sourceItemId));
    } catch {
      return new Set();
    }
  });
  const [sortBy, setSortBy] = useState('newest');
  const [maxDistance, setMaxDistance] = useState(20);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const incomingSearch = searchParams.get('search') || '';
    const incomingCategory = searchParams.get('category') || 'all';

    setSearchTerm(incomingSearch);
    setSelectedCategory(incomingCategory);
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('savedFoodItemIds', JSON.stringify([...savedItems]));
  }, [savedItems]);

  useEffect(() => {
    if (!toast) return undefined;
    const timerId = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(timerId);
  }, [toast]);

  const marketplaceItems = getVisibleGiveFoodListings('Customer').map((listing) => {
    const categoryId = normalizeCategory(listing.category);
    const basePrice = parseNumber(listing.retailPrice, parseNumber(listing.wholesalePrice, 0));
    const computedOriginalPrice = basePrice > 0 ? Number((basePrice * 1.3).toFixed(2)) : 0;
    const distanceKm = Number((((listing.id % 16) + 2) / 2).toFixed(1));
    const rating = Number((4 + ((listing.requests || 0) % 10) / 10).toFixed(1));

    return {
      id: listing.id,
      sourceId: listing.id,
      name: listing.itemName,
      category: categoryId,
      categoryLabel: listing.category,
      recipient: listing.preferredRecipient || 'any',
      recipientLabel: listing.preferredRecipient || 'any',
      status: String(listing.status || 'available').toLowerCase(),
      store: listing.donorName || 'Community Donor',
      originalPrice: computedOriginalPrice,
      discountedPrice: basePrice,
      discount: basePrice > 0 ? Math.round(((computedOriginalPrice - basePrice) / computedOriginalPrice) * 100) : 0,
      expiryDate: listing.expiryDate,
      quantity: `${listing.quantity} ${listing.unit}`,
      image: listing.images?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      rating,
      distance: `${distanceKm} km`,
      distanceValue: distanceKm,
      description: listing.description,
      pickupLocation: listing.pickupLocation,
      listedDate: listing.listedDate,
      requests: listing.requests || 0
    };
  });

  const filteredItems = marketplaceItems.filter((item) => {
    const loweredSearch = searchTerm.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(loweredSearch)
      || item.store.toLowerCase().includes(loweredSearch)
      || item.description.toLowerCase().includes(loweredSearch)
      || item.categoryLabel.toLowerCase().includes(loweredSearch);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const withinDistance = item.distanceValue <= maxDistance;
    const matchesSaved = !favoritesOnly || savedItems.has(item.id);
    return matchesSearch && matchesCategory && matchesStatus && withinDistance && matchesSaved;
  });

  const sortedItems = [...filteredItems].sort((first, second) => {
    if (sortBy === 'price-low') return first.discountedPrice - second.discountedPrice;
    if (sortBy === 'price-high') return second.discountedPrice - first.discountedPrice;
    if (sortBy === 'distance') return first.distanceValue - second.distanceValue;
    if (sortBy === 'rating') return second.rating - first.rating;
    if (sortBy === 'discount') return second.discount - first.discount;
    return new Date(second.listedDate) - new Date(first.listedDate);
  });

  const toggleSave = (itemId) => {
    setSavedItems((currentSavedItems) => {
      const nextSaved = new Set(currentSavedItems);
      if (nextSaved.has(itemId)) nextSaved.delete(itemId);
      else nextSaved.add(itemId);
      return nextSaved;
    });
  };

  const handleClaim = (item) => {
    if (item.status === 'expired') {
      setToast('This listing is expired');
      return;
    }

    if (claimedItems.has(item.id) || item.status === 'claimed') {
      navigate('/customer/orders');
      return;
    }

    let storedOrders = [];
    const rawStoredOrders = localStorage.getItem('customerClaimedOrders');

    if (rawStoredOrders) {
      try {
        const parsedOrders = JSON.parse(rawStoredOrders);
        storedOrders = Array.isArray(parsedOrders) ? parsedOrders : [];
      } catch {
        storedOrders = [];
      }
    }

    if (storedOrders.some((order) => order.sourceItemId === item.id)) {
      setClaimedItems(new Set(storedOrders.map((order) => order.sourceItemId)));
      navigate('/customer/orders');
      return;
    }

    const createdAt = new Date();
    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 1);

    const newOrder = {
      id: `ORD-${createdAt.getTime()}`,
      sourceItemId: item.id,
      storeName: item.store,
      items: [{ name: item.name, quantity: item.quantity, price: item.discountedPrice }],
      status: 'processing',
      orderDate: createdAt.toISOString().slice(0, 10),
      deliveryDate: deliveryDate.toISOString().slice(0, 10),
      totalAmount: item.discountedPrice,
      savings: Number((item.originalPrice - item.discountedPrice).toFixed(2)),
      image: item.image,
      rating: 0,
      address: item.pickupLocation,
      trackingNumber: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    localStorage.setItem('customerClaimedOrders', JSON.stringify([newOrder, ...storedOrders]));
    updateGiveFoodListing(item.sourceId, {
      status: 'claimed',
      requests: parseNumber(item.requests, 0) + 1
    });
    setClaimedItems((currentClaimed) => new Set([...currentClaimed, item.id]));
    setToast(`Claimed ${item.name}`);
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const diffTime = new Date(expiryDate) - new Date();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryColor = (days) => {
    if (days <= 2) return 'text-red-600 bg-red-50';
    if (days <= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('newest');
    setMaxDistance(20);
    setFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">Browse Food</h1>
          <p className="mt-2 text-base lg:text-lg text-gray-600 max-w-3xl">Food on this page is loaded from Give Food listings stored in local data. Customers only see listings available to their role.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 mb-8">
          <div className="flex flex-col xl:flex-row gap-3 items-stretch">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items, donor names, descriptions..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full h-12 pl-12 pr-4 border border-gray-200 rounded-xl bg-gray-50/70 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400"
              />
            </div>

            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="h-12 px-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 min-w-[150px]">
              {CATEGORY_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
            </select>

            <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)} className="h-12 px-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 min-w-[140px]">
              {STATUS_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
            </select>

            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="h-12 px-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 min-w-[160px]">
              <option value="newest">Newest</option>
              <option value="discount">Best discount</option>
              <option value="distance">Nearest</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
            </select>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
                <SlidersHorizontal className="w-4 h-4" />
                Refine Results
              </span>
              <label className="text-sm text-gray-500">Distance: <span className="font-semibold text-gray-800">{maxDistance} km</span></label>
              <input type="range" min="1" max="20" value={maxDistance} onChange={(event) => setMaxDistance(Number(event.target.value))} className="w-40 accent-emerald-500" />
              <button
                type="button"
                onClick={() => setFavoritesOnly((currentValue) => !currentValue)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${favoritesOnly ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-gray-200 text-gray-600'}`}
              >
                Saved only
              </button>
            </div>

            <button type="button" onClick={clearAllFilters} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Reset Filters</button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-900">{sortedItems.length}</span> matched listings</p>
          <p className="text-xs font-semibold text-gray-400">Data source: Give Food listings</p>
        </div>

        {sortedItems.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
            <Layers className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900">No listings match your filters</h3>
            <p className="text-sm text-gray-500 mt-1">Try resetting filters or widening the distance.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => {
              const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
              const isSaved = savedItems.has(item.id);
              const isClaimed = claimedItems.has(item.id) || item.status === 'claimed';
              const isExpired = item.status === 'expired' || daysUntilExpiry < 0;

              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {item.discount > 0 && <div className="absolute top-3 left-3 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">{item.discount}% OFF</div>}
                    <button
                      onClick={() => toggleSave(item.id)}
                      aria-label={isSaved ? 'Unsave item' : 'Save item'}
                      aria-pressed={isSaved}
                      className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                    <div className={`absolute bottom-3 left-3 px-2.5 py-1.5 rounded-full text-xs font-medium shadow-sm ${getExpiryColor(daysUntilExpiry)}`}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {daysUntilExpiry < 0 ? 'Expired' : daysUntilExpiry === 0 ? 'Expires today' : `${daysUntilExpiry} days left`}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{item.store}</p>
                    <p className="text-xs text-gray-400 mb-3 truncate">{item.pickupLocation}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{item.distance}</div>
                      <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{item.rating}</div>
                      <div className="inline-flex items-center gap-1 text-emerald-700"><TrendingUp className="w-4 h-4" />{item.status}</div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        {item.discountedPrice > 0 ? (
                          <>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-green-600">${item.discountedPrice.toFixed(2)}</span>
                              {item.originalPrice > 0 && <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>}
                            </div>
                            <p className="text-sm text-gray-500">{item.quantity}</p>
                          </>
                        ) : (
                          <>
                            <span className="text-2xl font-bold text-emerald-600">Free</span>
                            <p className="text-sm text-gray-500">{item.quantity}</p>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => handleClaim(item)}
                        disabled={isExpired}
                        className={`px-4 py-2 text-white rounded-lg transition-all flex items-center gap-2 ${isExpired ? 'bg-gray-300 cursor-not-allowed' : isClaimed ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
                      >
                        {isClaimed ? <CheckCircle className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                        {isExpired ? 'Expired' : isClaimed ? 'View Order' : 'Claim'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {toast && <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-gray-900 text-white px-4 py-3 shadow-xl text-sm font-semibold">{toast}</div>}
      </div>
    </div>
  );
};

export default BrowseFood;
