import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ShoppingBag, 
  ArrowRight, 
  Trash2, 
  Plus, 
  Minus, 
  Truck,
  Info,
  AlertCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const navigate = useNavigate();
  
  // State for items being removed confirmation
  const [itemToDelete, setItemToDelete] = useState(null);

  // Mock initial data for demonstration
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Red Apples",
      store: "Green Valley Farm",
      price: 450,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bccb?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      id: 2,
      name: "Fresh Whole Milk",
      store: "Daily Dairy",
      price: 280,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1563636619-e910ef4a8b9b?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      store: "The Artisan Bakery",
      price: 350,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200&h=200",
    }
  ]);

  const SHIPPING_THRESHOLD = 2000; // Free shipping above 2000 LKR

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const progressPercentage = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(SHIPPING_THRESHOLD - subtotal, 0);

  const handleBack = () => {
    navigate(-1);
  };

  const goToMarketplace = () => {
    navigate('/organization/shopping');
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const initiateRemove = (item) => {
    setItemToDelete(item);
  };

  const confirmRemove = () => {
    if (itemToDelete) {
      setCartItems(prev => prev.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4 py-4 md:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
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
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl w-full mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-white rounded-full shadow-xl shadow-gray-200/50">
                <div className="absolute inset-0 bg-emerald-50 rounded-full scale-90 animate-pulse opacity-50"></div>
                <ShoppingBag size={64} className="text-emerald-500 relative z-10 md:w-20 md:h-20" strokeWidth={1.5} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto leading-relaxed">
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
            </motion.div>
          ) : (
            /* Cart Items List */
            <div className="space-y-6">
              {/* Free Shipping Alert */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-emerald-100 overflow-hidden relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {remainingForFreeShipping > 0 
                        ? `Add LKR ${remainingForFreeShipping.toLocaleString()} more for Free Shipping!`
                        : "You've unlocked Free Shipping!"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Standard delivery usually takes 24-48 hours.
                    </p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs font-semibold text-gray-400">
                  <span>LKR 0</span>
                  <span>LKR {SHIPPING_THRESHOLD.toLocaleString()}</span>
                </div>
              </motion.div>

              {/* Items List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="group bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                    >
                      {/* Product Image */}
                      <div className="relative w-full md:w-32 h-40 md:h-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-grow text-center md:text-left space-y-1 w-full">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
                              <span className="font-medium text-emerald-600">{item.store}</span>
                            </p>
                          </div>
                          <div className="hidden md:block text-right">
                            <p className="text-sm text-gray-400 font-medium">Unit Price</p>
                            <p className="font-bold text-gray-900">LKR {item.price.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 mt-4 border-t border-gray-50">
                          {/* Quantity Selector */}
                          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-white hover:text-emerald-600 rounded-lg transition-all duration-200 disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} strokeWidth={2.5} />
                            </button>
                            <span className="w-12 text-center font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-white hover:text-emerald-600 rounded-lg transition-all duration-200"
                            >
                              <Plus size={16} strokeWidth={2.5} />
                            </button>
                          </div>

                          {/* Price and Delete */}
                          <div className="flex items-center gap-6">
                            <div className="text-center md:text-right">
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total</p>
                              <p className="text-xl font-black text-gray-900">
                                LKR {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                            <button 
                              onClick={() => initiateRemove(item)}
                              className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                              title="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <motion.div 
                layout
                className="bg-emerald-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl shadow-emerald-200 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-32 -mt-32 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800 rounded-full -ml-32 -mb-32 opacity-20 blur-3xl"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-emerald-100/80 font-medium">Subtotal</span>
                    <span className="text-xl font-bold">LKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-emerald-100/80 font-medium">Delivery Fee</span>
                    <span className="font-bold">
                      {remainingForFreeShipping === 0 ? "FREE" : "LKR 250.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Total Amount</p>
                      <p className="text-3xl md:text-4xl font-black">
                        LKR {(subtotal + (remainingForFreeShipping === 0 ? 0 : 250)).toLocaleString()}
                      </p>
                    </div>
                    <button className="px-8 py-4 bg-white text-emerald-900 font-black rounded-2xl hover:bg-emerald-50 transition-all duration-300 shadow-xl active:scale-95 flex items-center gap-2">
                      Checkout
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setItemToDelete(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
            >
              <div className="h-2 bg-red-500 w-full" />
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center ring-8 ring-red-50/50">
                    <AlertCircle size={32} className="text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  Remove from Cart?
                </h3>
                <p className="text-gray-500 text-center text-sm leading-relaxed mb-8">
                  Are you sure you want to remove <span className="font-bold text-gray-700">"{itemToDelete.name}"</span> from your shopping cart?
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setItemToDelete(null)}
                    className="flex-1 px-6 py-3 border-2 border-gray-100 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    Keep
                  </button>
                  <button 
                    onClick={confirmRemove}
                    className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setItemToDelete(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Info Banner */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-center gap-4 text-xs md:text-sm text-gray-500 z-40">
        <div className="flex items-center gap-1">
          <Info size={14} className="text-emerald-500" />
          <span>Secure Checkout</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <span>24/7 Support</span>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <span>Community Trust</span>
      </div>
    </div>
  );
};

export default Cart;
