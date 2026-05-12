import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const navigate = useNavigate();
  // State for cart items - starting with empty array as requested
  const [cartItems, setCartItems] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  const goToMarketplace = () => {
    // Organizations go to the Food Feed
    navigate('/organization/food-feed');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4 py-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600"
              aria-label="Go back"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-white rounded-full shadow-xl shadow-gray-200/50">
              <div className="absolute inset-0 bg-emerald-50 rounded-full scale-90 animate-pulse opacity-50"></div>
              <ShoppingBag size={64} className="text-emerald-500 relative z-10 md:w-20 md:h-20" strokeWidth={1.5} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Your cart is empty
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                Looks like you haven't added any food items to your request list yet. Start exploring the feed to find available donations!
              </p>
            </div>

            <button
              onClick={goToMarketplace}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Return to Food Feed
              <ArrowRight size={18} />
            </button>

            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
              <div className="p-4 bg-white rounded-xl border border-dashed border-gray-200">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Quick Pickup</p>
                <p className="text-sm text-gray-600">Coordinate fast pickups for urgent food donations.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-dashed border-gray-200">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Community Impact</p>
                <p className="text-sm text-gray-600">Every item you request helps feed those in need.</p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Cart Items List (Placeholder for now) */
          <div className="max-w-4xl w-full">
             <p className="text-center text-gray-400">Cart items will be listed here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
