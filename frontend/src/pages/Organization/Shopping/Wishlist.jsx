import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight, Store } from 'lucide-react';
import {
  getAllMarketplaceItems,
  getWishlistStorage,
  toggleWishlistStorage,
  addMarketplaceItemToCart
} from '../../../data/marketplaceData';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);
  const allProducts = getAllMarketplaceItems();

  useEffect(() => {
    setWishlistIds(getWishlistStorage());
  }, []);

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  const handleRemove = (productId) => {
    const updated = toggleWishlistStorage(productId);
    setWishlistIds(updated);
  };

  const handleAddToCart = (product) => {
    addMarketplaceItemToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" /> My Saved Wishlist
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Saved shop items and discounted food items for future organization requests
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto mt-8">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-400">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Your Wishlist is Empty</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              You haven't saved any marketplace products yet. Explore items listed by shop owners to save them here!
            </p>
            <button
              onClick={() => navigate('/organization/shopping')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 inline-flex items-center gap-2"
            >
              Explore Marketplace <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-44 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-600 transition-colors shadow-md"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div
                      onClick={() => navigate(`/organization/shopping/shop/${product.shopId}`)}
                      className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-1 mb-1"
                    >
                      <Store className="w-3.5 h-3.5" /> {product.shopName}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-emerald-700">
                        LKR {product.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
