import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Store,
  Clock,
  Heart,
  ShoppingCart,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  X,
  PackageCheck,
  BadgeCheck,
  TrendingDown,
  Sparkles,
  MapPin
} from 'lucide-react';
import {
  getAllMarketplaceItems,
  getAllShops,
  getWishlistStorage,
  toggleWishlistStorage,
  addMarketplaceItemToCart
} from '../../../data/marketplaceData';

const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'Fruits', name: 'Fruits' },
  { id: 'Vegetables', name: 'Vegetables' },
  { id: 'Bakery', name: 'Bakery' },
  { id: 'Dairy', name: 'Dairy' },
  { id: 'Groceries', name: 'Groceries' },
];

const Marketplace = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedShopId, setSelectedShopId] = useState('all');
  const [sortBy, setSortBy] = useState('discount');

  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const products = getAllMarketplaceItems();
  const shops = getAllShops();

  useEffect(() => {
    setWishlist(getWishlistStorage());
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleWishlistToggle = (e, productId) => {
    e.stopPropagation();
    const updated = toggleWishlistStorage(productId);
    setWishlist(updated);
    if (updated.includes(productId)) {
      showToast('Added item to Wishlist ❤️');
    } else {
      showToast('Removed item from Wishlist');
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addMarketplaceItemToCart(product, 1);
    showToast(`Added ${product.name} to Cart 🛒`);
  };

  const handleShopClick = (e, shopId) => {
    e.stopPropagation();
    navigate(`/organization/shopping/shop/${shopId}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' || item.status === selectedStatus;

      const matchesShop =
        selectedShopId === 'all' || item.shopId === selectedShopId;

      return matchesSearch && matchesCategory && matchesStatus && matchesShop;
    }).sort((a, b) => {
      if (sortBy === 'discount') return b.discount - a.discount;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(a.expiryDate) - new Date(b.expiryDate);
    });
  }, [products, searchTerm, selectedCategory, selectedStatus, selectedShopId, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 font-sans pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600/60 backdrop-blur-md text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/30">
                <Store className="w-4 h-4 text-emerald-300" />
                Organization Wholesale & Surplus Marketplace
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Shop Items Listed by Verified Shop Owners
              </h1>
              <p className="mt-3 text-emerald-100 text-base lg:text-lg leading-relaxed">
                Procure discounted near-expiry groceries, fresh farm produce, and surplus bakery items directly from registered shops. Click any shop name to view their full storefront!
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-300">{shops.length}</div>
                <div className="text-xs font-medium text-emerald-100 mt-1">Verified Shops</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">{products.length}</div>
                <div className="text-xs font-medium text-emerald-100 mt-1">Active Items</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-black text-rose-300">Up to 60%</div>
                <div className="text-xs font-medium text-emerald-100 mt-1">Discounts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-emerald-100/80 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search food items or shop name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold text-gray-700"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Shop Owner Filter */}
            <div>
              <select
                value={selectedShopId}
                onChange={(e) => setSelectedShopId(e.target.value)}
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold text-gray-700"
              >
                <option value="all">🏬 All Shop Owners</option>
                {shops.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.ownerName})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold text-gray-700"
              >
                <option value="discount">🔥 Best Discounts First</option>
                <option value="price-low">💵 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="expiry">⏳ Nearest Expiry</option>
              </select>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Categories:
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Available Marketplace Products
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} items
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Click shop name on any card to browse all items by that shop owner</p>
          </div>
          
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedStatus('all');
              setSelectedShopId('all');
              setSortBy('discount');
            }}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 underline"
          >
            Reset Filters
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <PackageCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No marketplace items match your query</h3>
            <p className="text-sm text-gray-500 mt-1">Try searching with a different term or resetting category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const isNearExpiry = product.status === 'Near Expiry';

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group relative"
                >
                  {/* Image Header */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-red-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        {product.discount}% OFF
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleWishlistToggle(e, product.id)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                        isWishlisted
                          ? 'bg-rose-50 text-rose-500'
                          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-rose-500'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Expiry Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
                          isNearExpiry
                            ? 'bg-amber-500/90 text-white'
                            : 'bg-emerald-600/90 text-white'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {isNearExpiry ? `Near Expiry (${product.expiryDate})` : 'Fresh Stock'}
                      </span>
                    </div>

                    {/* Quick View Button on Hover */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute inset-x-4 bottom-3 bg-white/95 text-gray-900 text-xs font-bold py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center justify-center gap-1.5 hover:bg-emerald-600 hover:text-white"
                    >
                      <Eye className="w-4 h-4" /> Quick Details
                    </button>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* CLICKABLE SHOP NAME SECTION */}
                      <div
                        onClick={(e) => handleShopClick(e, product.shopId)}
                        className="group/shop flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 cursor-pointer transition-colors mb-3"
                        title="Click to view shop storefront & all items"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={product.shopLogo}
                            alt={product.shopName}
                            className="w-6 h-6 rounded-full object-cover border border-emerald-400 flex-shrink-0"
                          />
                          <span className="text-xs font-bold text-gray-800 group-hover/shop:text-emerald-700 truncate">
                            {product.shopName}
                          </span>
                        </div>
                        <BadgeCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />
                      </div>

                      {/* Item Name */}
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-600 transition-colors line-clamp-1 mb-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {product.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-md font-semibold">
                          {product.category}
                        </span>
                        <span className="font-medium text-emerald-700">
                          {product.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Footer / Price & Add to Cart */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-emerald-700">
                            LKR {product.price.toLocaleString()}
                          </span>
                        </div>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            LKR {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center gap-1.5"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden relative animate-scaleUp">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 bg-gray-100">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {quickViewProduct.category}
              </div>
            </div>

            <div className="p-6">
              {/* Shop Owner Info Banner */}
              <div
                onClick={(e) => {
                  setQuickViewProduct(null);
                  handleShopClick(e, quickViewProduct.shopId);
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 cursor-pointer border border-emerald-200 transition-colors mb-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={quickViewProduct.shopLogo}
                    alt={quickViewProduct.shopName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                      {quickViewProduct.shopName}
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {quickViewProduct.shopAddress}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  View Shop <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {quickViewProduct.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {quickViewProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block font-semibold">Available Stock</span>
                  <span className="font-bold text-gray-800">{quickViewProduct.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-semibold">Expiry Date</span>
                  <span className="font-bold text-amber-600">{quickViewProduct.expiryDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-black text-emerald-700">
                    LKR {quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      LKR {quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    handleAddToCart(e, quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 flex items-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
