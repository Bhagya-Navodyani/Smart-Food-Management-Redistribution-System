import React, { useState, useEffect } from 'react';
import { 
  Search, Sliders, ShoppingCart, ChevronRight, 
  Clock, Flame, Apple, Coffee, IceCream, 
  Milk, Beef, Leaf, Star, Percent, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShoppingDashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(3); // Mock cart count

  // Handle scroll for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'All', icon: Leaf },
    { name: 'Fresh Produce', icon: Apple },
    { name: 'Bakery', icon: Coffee },
    { name: 'Dairy', icon: Milk },
    { name: 'Frozen', icon: IceCream },
    { name: 'Meat & Poultry', icon: Beef },
  ];

  const flashDeals = [
    { id: 1, name: 'Premium Avocados', price: '$4.99', discount: '30% OFF', time: '02:45:12', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=300&auto=format&fit=crop' },
    { id: 2, name: 'Organic Sourdough', price: '$3.50', discount: '50% OFF', time: '05:12:45', image: 'https://images.unsplash.com/photo-1585478259715-876a2171fca4?q=80&w=300&auto=format&fit=crop' },
    { id: 3, name: 'Grass-fed Milk 2L', price: '$2.99', discount: '25% OFF', time: '01:20:05', image: 'https://images.unsplash.com/photo-1550583724-1255818c053b?q=80&w=300&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      {/* Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-xl py-3' : 'bg-transparent py-5'
        } ${isScrolled ? 'px-6 lg:px-12' : 'px-6 lg:px-12'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Search Bar Container */}
          <div className="flex-1 max-w-2xl relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
            </div>
            <input 
              type="text"
              placeholder="Search for fresh food, bakery items..."
              className="w-full bg-white border-2 border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50/50 transition-all outline-none shadow-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="p-3.5 bg-white border-2 border-gray-100 rounded-2xl text-gray-600 hover:text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50 transition-all shadow-sm">
              <Sliders size={20} />
            </button>
            <button 
              onClick={() => navigate('/organization/cart')}
              className="relative p-3.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content (with top padding for sticky header) */}
      <main className="pt-28 px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* Hero & Flash Deals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Hero Banner */}
          <div className="lg:col-span-8 relative rounded-[2.5rem] overflow-hidden group h-[400px] lg:h-[500px] shadow-2xl">
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop" 
              alt="Weekend Sale" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/40 to-transparent flex flex-col justify-center p-12">
              <div className="max-w-md">
                <span className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-100 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                  Limited Time Offer
                </span>
                <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
                  Weekend <br /> 
                  <span className="text-emerald-400">Mega Sale!</span>
                </h1>
                <p className="text-emerald-50/80 text-lg font-medium mb-10 leading-relaxed">
                  Up to 50% off on all fresh produce and bakery items. Support your community with high-quality surplus food.
                </p>
                <button className="px-8 py-4 bg-white text-emerald-900 font-black rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl active:scale-95 group/btn">
                  Shop Now
                  <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute top-8 right-8">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex flex-col items-center justify-center rotate-12">
                <span className="text-white font-black text-2xl">50%</span>
                <span className="text-white/60 text-[8px] font-bold uppercase tracking-widest">OFF</span>
              </div>
            </div>
          </div>

          {/* Flash Deals Vertical Stack */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="text-orange-500" size={24} />
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Flash Deals</h2>
              </div>
              <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline">View All</button>
            </div>
            
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {flashDeals.map((deal) => (
                <div key={deal.id} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all flex gap-4 group cursor-pointer">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-black text-gray-900 leading-tight">{deal.name}</h4>
                        <span className="bg-orange-50 text-orange-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                          {deal.discount}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-orange-500 mb-2">
                        <Clock size={12} />
                        <span className="text-[10px] font-black tracking-widest">{deal.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-black text-emerald-600">{deal.price}</span>
                      <button className="p-2 bg-gray-50 text-gray-400 hover:bg-emerald-600 hover:text-white rounded-xl transition-all">
                        <Star size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Promo Card */}
            <div className="mt-auto p-6 bg-gray-900 rounded-[2rem] text-white relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <Percent size={120} />
              </div>
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Exclusive</p>
              <h3 className="text-xl font-black mb-4 leading-tight">First Order <br /> Special!</h3>
              <button className="text-xs font-black bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl transition-all flex items-center gap-2">
                Claim Coupon <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border-2 ${
                  selectedCategory === cat.name
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100 scale-105'
                    : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-200 hover:text-emerald-600'
                }`}
              >
                <cat.icon size={18} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {selectedCategory === 'All' ? 'Available Items' : selectedCategory}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-400">Sort by:</span>
            <select className="bg-transparent text-sm font-black text-gray-900 outline-none cursor-pointer">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid of Items (Placeholder) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-4 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4 relative">
                <div className="absolute top-3 right-3 z-10">
                  <button className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                    <Star size={16} />
                  </button>
                </div>
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              </div>
              <div className="px-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Fresh Produce</span>
                </div>
                <h4 className="font-black text-gray-900 mb-2 truncate">Organic Product Name</h4>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-gray-900">$12.50</span>
                  <button className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black">
          <ShoppingCart size={20} />
          View Cart
          <span className="bg-emerald-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        </button>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default ShoppingDashboard;
