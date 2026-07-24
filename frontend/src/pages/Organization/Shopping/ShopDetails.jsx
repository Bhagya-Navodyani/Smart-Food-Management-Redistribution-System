import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Store,
  MapPin,
  Mail,
  Clock,
  Star,
  BadgeCheck,
  Search,
  ShoppingCart,
  Heart,
  Eye,
  X,
  TrendingDown,
  Sparkles,
  Award,
  Package,
  PhoneCall
} from 'lucide-react';
import {
  getShopById,
  getItemsByShopId,
  getWishlistStorage,
  toggleWishlistStorage,
  addMarketplaceItemToCart
} from '../../../data/marketplaceData';

const ShopDetails = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const shop = getShopById(shopId);
  const shopProducts = getItemsByShopId(shop.id);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlist, setWishlist] = useState(getWishlistStorage());
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

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

  const filteredProducts = useMemo(() => {
    return shopProducts.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [shopProducts, searchTerm, selectedCategory]);

  // Extract unique categories for this shop
  const categories = ['all', ...Array.from(new Set(shopProducts.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/organization/shopping')}
            className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-emerald-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Back to Marketplace
          </button>
          <div className="text-xs font-semibold text-gray-400">
            Shop Storefront / {shop.name}
          </div>
        </div>
      </div>

      {/* Shop Hero Banner */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={shop.coverImage}
            alt={shop.name}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 pb-8 z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Logo Avatar */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white flex-shrink-0">
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Shop Title Info */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                    {shop.name}
                  </h1>
                  {shop.verified && (
                    <span className="bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4" /> Verified Partner
                    </span>
                  )}
                </div>

                <p className="text-emerald-300 font-semibold text-sm sm:text-base flex items-center gap-2">
                  <Store className="w-4 h-4" /> Managed by {shop.ownerName} ({shop.role})
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-400" /> {shop.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {shop.rating} ({shop.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-emerald-400" /> {shop.openingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${shop.phone}`}
                className="flex-1 md:flex-initial px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4" /> Call Shop Owner
              </a>
              <a
                href={`mailto:${shop.email}`}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-colors"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Bio & Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> About {shop.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {shop.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {shop.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-100 flex-shrink-0">
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 text-center">
              <div className="text-2xl font-black text-emerald-600">{shop.totalDonatedKg} kg</div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">Food Saved / Donated</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 text-center">
              <div className="text-2xl font-black text-emerald-600">{shopProducts.length}</div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">Products Listed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              All Products from {shop.name}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Browse and request surplus stock directly from this store</p>
          </div>

          {/* Search inside shop */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search in this shop..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-100'
                }`}
              >
                {cat === 'all' ? 'All Shop Items' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No items found for this shop query</h3>
            <p className="text-sm text-gray-500 mt-1">Try resetting search terms.</p>
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

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute inset-x-4 bottom-3 bg-white/95 text-gray-900 text-xs font-bold py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center justify-center gap-1.5 hover:bg-emerald-600 hover:text-white"
                    >
                      <Eye className="w-4 h-4" /> Quick Details
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-600 transition-colors line-clamp-1 mb-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-md font-semibold">
                          {product.category}
                        </span>
                        <span className="font-medium text-emerald-700">
                          {product.quantity}
                        </span>
                      </div>
                    </div>

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
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden relative">
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
            </div>

            <div className="p-6">
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

export default ShopDetails;
