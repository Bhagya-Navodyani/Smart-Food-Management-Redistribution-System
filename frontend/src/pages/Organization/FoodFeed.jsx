import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Clock, ShieldCheck, Package, Filter,
  ChevronDown, Truck, Leaf, X, Store, SlidersHorizontal,
  CheckCircle, AlertTriangle
} from 'lucide-react';

/* ── Realistic Sample Data ── */
const initialFeedData = [
  { id: 1, name: 'Hotel Buffet Leftovers', category: 'Cooked Leftovers', source: 'Hotel', quantity: '45kg', collectBefore: 'Before 10:00 PM', distance: '12km away', safe: true, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=480&q=80', donor: 'Grand Palace Hotel', posted: '25 min ago' },
  { id: 2, name: 'Cabbage & Carrot Trimmings', category: 'Vegetable Scraps', source: 'Market Stall', quantity: '30kg', collectBefore: 'Before 6:00 PM', distance: '5km away', safe: true, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=480&q=80', donor: 'City Market Stall #12', posted: '40 min ago' },
  { id: 3, name: 'Day-Old Bread & Pastries', category: 'Bakery Items', source: 'Bakery', quantity: '20kg', collectBefore: 'Before 8:00 PM', distance: '8km away', safe: true, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=480&q=80', donor: 'Sunrise Bakery', posted: '1 hr ago' },
  { id: 4, name: 'Overripe Banana Bunches', category: 'Spoiled Fruits', source: 'Supermarket', quantity: '15kg', collectBefore: 'Before 5:00 PM', distance: '3km away', safe: true, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=480&q=80', donor: 'Fresh Mart Supermarket', posted: '2 hrs ago' },
  { id: 5, name: 'Rice Bran & Broken Grains', category: 'Grains & Rice', source: 'Supermarket', quantity: '60kg', collectBefore: 'Before 4:00 PM', distance: '18km away', safe: true, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=480&q=80', donor: 'Lanka Rice Mills', posted: '3 hrs ago' },
  { id: 6, name: 'Leftover Rice & Curry', category: 'Cooked Leftovers', source: 'Home', quantity: '8kg', collectBefore: 'Before 9:00 PM', distance: '2km away', safe: true, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80', donor: 'Mrs. Perera (Household)', posted: '45 min ago' },
  { id: 7, name: 'Fruit Pulp & Peels', category: 'Spoiled Fruits', source: 'Cafe / Juice Bar', quantity: '25kg', collectBefore: 'Before 3:00 PM', distance: '10km away', safe: true, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=480&q=80', donor: 'Tropical Juice Bar', posted: '1.5 hrs ago' },
  { id: 8, name: 'Unsold Rolls & Patties', category: 'Short Eats & Snacks', source: 'Bakery', quantity: '12kg', collectBefore: 'Before 7:00 PM', distance: '6km away', safe: true, image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=480&q=80', donor: 'Cool Spot Bakery', posted: '55 min ago' },
  { id: 9, name: 'Raw Potato & Onion Peels', category: 'Raw / Uncooked', source: 'Restaurant', quantity: '22kg', collectBefore: 'Before 11:00 PM', distance: '7km away', safe: true, image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=480&q=80', donor: 'Spice Garden Restaurant', posted: '30 min ago' },
  { id: 10, name: 'Mixed Household Kitchen Waste', category: 'Mixed Waste', source: 'Home', quantity: '5kg', collectBefore: 'Before 6:30 PM', distance: '1km away', safe: true, image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=480&q=80', donor: 'Mr. Silva (Household)', posted: '15 min ago' },
  { id: 11, name: 'Bruised Mangoes & Papayas', category: 'Spoiled Fruits', source: 'Market Stall', quantity: '18kg', collectBefore: 'Before 4:30 PM', distance: '9km away', safe: true, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=480&q=80', donor: 'Pettah Fruit Vendor', posted: '1 hr ago' },
  { id: 12, name: 'Wilted Lettuce & Spinach', category: 'Spoiled Vegetables', source: 'Supermarket', quantity: '10kg', collectBefore: 'Before 5:00 PM', distance: '4km away', safe: true, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=480&q=80', donor: 'Keells Super', posted: '50 min ago' },
];

const WASTE_TYPES = [
  'All Types',
  'Cooked Leftovers',
  'Raw / Uncooked',
  'Spoiled Fruits',
  'Spoiled Vegetables',
  'Vegetable Scraps',
  'Short Eats & Snacks',
  'Bakery Items',
  'Grains & Rice',
  'Mixed Waste',
];

const SOURCE_TYPES = [
  'All Sources',
  'Home',
  'Hotel',
  'Restaurant',
  'Bakery',
  'Supermarket',
  'Market Stall',
  'Cafe / Juice Bar',
];

const DISTANCES = ['Any Distance', '< 5 km', '< 10 km', '< 20 km'];

/* ── Category badge colour map ── */
const categoryStyle = {
  'Cooked Leftovers':    'bg-amber-50 text-amber-600 border-amber-100',
  'Raw / Uncooked':      'bg-orange-50 text-orange-600 border-orange-100',
  'Spoiled Fruits':      'bg-rose-50 text-rose-600 border-rose-100',
  'Spoiled Vegetables':  'bg-lime-50 text-lime-600 border-lime-100',
  'Vegetable Scraps':    'bg-emerald-50 text-emerald-600 border-emerald-100',
  'Short Eats & Snacks': 'bg-yellow-50 text-yellow-600 border-yellow-100',
  'Bakery Items':        'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
  'Grains & Rice':       'bg-sky-50 text-sky-600 border-sky-100',
  'Mixed Waste':         'bg-gray-50 text-gray-600 border-gray-100',
};

/* ── Source badge colour map ── */
const sourceStyle = {
  Home:              'bg-teal-50 text-teal-600 border-teal-100',
  Hotel:             'bg-indigo-50 text-indigo-600 border-indigo-100',
  Restaurant:        'bg-purple-50 text-purple-600 border-purple-100',
  Bakery:            'bg-pink-50 text-pink-600 border-pink-100',
  Supermarket:       'bg-blue-50 text-blue-600 border-blue-100',
  'Market Stall':    'bg-orange-50 text-orange-600 border-orange-100',
  'Cafe / Juice Bar':'bg-cyan-50 text-cyan-600 border-cyan-100',
};

/* ── Component ── */
const FoodFeed = () => {
  const navigate = useNavigate();
  const [feedItems, setFeedItems] = useState(() => {
    const saved = localStorage.getItem('foodFeedItemsData');
    return saved ? JSON.parse(saved) : initialFeedData;
  });

  // Process restored requests queue
  useEffect(() => {
    const restored = localStorage.getItem('restoredRequestsQueue');
    if (restored) {
      const parsed = JSON.parse(restored);
      if (parsed.length > 0) {
        setFeedItems(prev => {
          const existingIds = new Set(prev.map(i => i.id));
          const trulyNew = parsed.filter(i => !existingIds.has(i.id));
          return [...trulyNew, ...prev];
        });
      }
      localStorage.removeItem('restoredRequestsQueue');
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('foodFeedItemsData', JSON.stringify(feedItems));
  }, [feedItems]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Types');
  const [activeSource, setActiveSource] = useState('All Sources');
  const [activeDistance, setActiveDistance] = useState('Any Distance');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory, activeSource, activeDistance]);

  /* Client-side filtering */
  const filtered = feedItems.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(q)
      || item.donor.toLowerCase().includes(q)
      || item.category.toLowerCase().includes(q)
      || item.source.toLowerCase().includes(q);
    const matchCat = activeCategory === 'All Types' || item.category === activeCategory;
    const matchSrc = activeSource === 'All Sources' || item.source === activeSource;
    let matchDist = true;
    if (activeDistance !== 'Any Distance') {
      const km = parseInt(item.distance);
      if (activeDistance === '< 5 km')  matchDist = km < 5;
      if (activeDistance === '< 10 km') matchDist = km < 10;
      if (activeDistance === '< 20 km') matchDist = km < 20;
    }
    return matchSearch && matchCat && matchSrc && matchDist;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* ── Decorative Light Elements ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-50 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-50 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ────────────── Header ────────────── */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
              <Leaf size={26} className="text-emerald-500" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              Available Animal Feed Surplus
            </h1>
          </div>
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl ml-[52px]">
            Browse surplus food items from local restaurants, markets & vendors — request a
            pickup and help reduce waste while feeding animals in need.
          </p>

          {/* ── Stats Row ── */}
          <div className="flex flex-wrap gap-4 mt-6 ml-[52px]">
            {[
              { label: 'Items Available', value: feedItems.length, color: 'emerald' },
              { label: 'Total Quantity', value: '248 kg', color: 'cyan' },
              { label: 'Active Donors', value: '6', color: 'violet' },
            ].map((s) => (
              <div
                key={s.label}
                className={`
                  flex items-center gap-3 px-5 py-2.5 rounded-xl
                  bg-white border border-gray-200
                  shadow-sm
                `}
              >
                <span className={`text-${s.color}-600 text-xl font-black`}>{s.value}</span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ────────────── Search & Filter Bar ────────────── */}
        <div className="mb-8">
          {/* ── Row 1: Search + Dropdowns ── */}
          <div
            className="
              flex flex-col lg:flex-row gap-3 p-4 rounded-2xl
              bg-white border border-gray-200
              shadow-sm
            "
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="food-feed-search"
                type="text"
                placeholder="Search items, donors, categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full pl-11 pr-4 py-3 rounded-xl
                  bg-gray-50 border border-gray-200
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                  transition-all duration-300
                "
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Waste Type Dropdown */}
            <div className="relative min-w-[200px]">
              <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                id="food-feed-category"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="
                  w-full pl-10 pr-10 py-3 rounded-xl appearance-none cursor-pointer
                  bg-gray-50 border border-gray-200 text-gray-700 font-medium
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                  transition-all duration-300
                "
              >
                {WASTE_TYPES.map((c) => (
                  <option key={c} value={c} className="bg-white text-gray-900">{c}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Source Type Dropdown */}
            <div className="relative min-w-[180px]">
              <Store size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                id="food-feed-source"
                value={activeSource}
                onChange={(e) => setActiveSource(e.target.value)}
                className="
                  w-full pl-10 pr-10 py-3 rounded-xl appearance-none cursor-pointer
                  bg-gray-50 border border-gray-200 text-gray-700 font-medium
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                  transition-all duration-300
                "
              >
                {SOURCE_TYPES.map((s) => (
                  <option key={s} value={s} className="bg-white text-gray-900">{s}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Distance Dropdown */}
            <div className="relative min-w-[160px]">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                id="food-feed-distance"
                value={activeDistance}
                onChange={(e) => setActiveDistance(e.target.value)}
                className="
                  w-full pl-10 pr-10 py-3 rounded-xl appearance-none cursor-pointer
                  bg-gray-50 border border-gray-200 text-gray-700 font-medium
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                  transition-all duration-300
                "
              >
                {DISTANCES.map((d) => (
                  <option key={d} value={d} className="bg-white text-gray-900">{d}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* ── Row 2: Quick-filter tag buttons ── */}
          <div className="flex flex-wrap items-center gap-2 mt-3 px-1">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mr-1">Quick:</span>
            {['Cooked Leftovers', 'Spoiled Fruits', 'Bakery Items', 'Vegetable Scraps', 'Short Eats & Snacks', 'Raw / Uncooked'].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveCategory(activeCategory === tag ? 'All Types' : tag)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200
                  ${activeCategory === tag
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50'}
                `}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* ── Active Filter Pills ── */}
          {(activeCategory !== 'All Types' || activeSource !== 'All Sources' || activeDistance !== 'Any Distance' || search) && (
            <div className="flex flex-wrap items-center gap-2 mt-3 px-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mr-1">Active:</span>
              {search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs text-emerald-600 font-medium">
                  "{search}"
                  <button onClick={() => setSearch('')} className="hover:text-emerald-800 transition"><X size={12} /></button>
                </span>
              )}
              {activeCategory !== 'All Types' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs text-blue-600 font-medium">
                  {activeCategory}
                  <button onClick={() => setActiveCategory('All Types')} className="hover:text-blue-800 transition"><X size={12} /></button>
                </span>
              )}
              <button
                onClick={() => { setSearch(''); setActiveCategory('All Types'); setActiveSource('All Sources'); setActiveDistance('Any Distance'); }}
                className="text-xs text-gray-400 hover:text-red-500 underline transition font-bold ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 font-medium">
            Showing <span className="text-gray-900 font-bold">{filtered.length}</span> of{' '}
            <span className="text-gray-900 font-bold">{feedItems.length}</span> items
          </p>
        </div>

        {/* ────────────── Feed Cards Grid ────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-gray-200 rounded-3xl shadow-sm">
            <div className="p-5 rounded-full bg-gray-50 border border-gray-100 mb-6">
              <Search size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 max-w-sm font-medium">
              Try adjusting your search or filter criteria to discover available surplus.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {currentItems.map((item, idx) => (
              <div
                key={item.id}
                className="
                  group relative rounded-2xl overflow-hidden
                  bg-white border border-gray-200
                  shadow-sm hover:shadow-xl hover:border-emerald-200
                  transition-all duration-500 ease-out
                  hover:-translate-y-1
                  flex flex-col h-full
                "
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-transparent to-gray-900/60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {/* Category Badge */}
                    <span
                      className={`
                        px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider
                        border backdrop-blur-md shadow-sm
                        ${categoryStyle[item.category] || 'bg-white/90 text-gray-600 border-gray-200'}
                      `}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Posted time */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] text-gray-900 font-black shadow-sm">
                    {item.posted}
                  </span>

                  {/* Donor name at bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border border-emerald-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-white">{item.donor.charAt(0)}</span>
                    </div>
                    <p className="text-xs text-white truncate font-bold drop-shadow-md">
                      {item.donor}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-gray-900 mb-4 leading-snug group-hover:text-emerald-600 transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="p-1.5 rounded-lg bg-blue-50">
                        <Package size={14} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Qty</p>
                        <p className="text-xs text-gray-900 font-bold">{item.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="p-1.5 rounded-lg bg-amber-50">
                        <Clock size={14} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Collect</p>
                        <p className="text-xs text-gray-900 font-bold">{item.collectBefore.replace('Before ', '')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="p-1.5 rounded-lg bg-indigo-50">
                        <MapPin size={14} className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Dist</p>
                        <p className="text-xs text-gray-900 font-bold">{item.distance}</p>
                      </div>
                    </div>

                    {item.safe && (
                      <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="p-1.5 rounded-lg bg-emerald-100">
                          <ShieldCheck size={14} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-[9px] text-emerald-600/60 uppercase font-black tracking-widest">Safe</p>
                          <p className="text-[10px] text-emerald-700 font-black">Certified</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    id={`request-pickup-${item.id}`}
                    onClick={() => {
                      setSelectedItem(item);
                      setPickupConfirmed(false);
                      setIsModalOpen(true);
                    }}
                    className="
                      w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                      bg-gray-900 text-white font-bold text-sm
                      shadow-lg shadow-gray-200
                      hover:bg-emerald-600 hover:shadow-emerald-100
                      active:scale-[0.97]
                      transition-all duration-300 mt-auto
                    "
                  >
                    <Truck size={16} />
                    Request Pickup
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'}`}
            >
              Previous
            </button>
            <span className="text-gray-500 text-sm font-bold">
              Page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ── Pickup Request Modal ── */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => !pickupConfirmed && setIsModalOpen(false)}
          />
          
          <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-black text-gray-900">
                {pickupConfirmed ? 'Pickup Confirmed!' : 'Confirm Request'}
              </h3>
              {!pickupConfirmed && (
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-8 text-center">
              {pickupConfirmed ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6 border border-emerald-100">
                    <CheckCircle size={40} className="text-emerald-500" />
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-2">Success!</h4>
                  <p className="text-gray-500 text-sm mb-8 font-medium">
                    {selectedItem.donor} has been notified.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setTimeout(() => {
                        setSelectedItem(null);
                        navigate('/organization/my-requests');
                      }, 150);
                    }}
                    className="w-full px-4 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
                  >
                    Go to My Collections
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
                      <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-xl font-black text-gray-900 leading-tight mb-1">{selectedItem.name}</h4>
                    <p className="text-gray-500 text-sm mb-4">From: <span className="text-emerald-600 font-bold">{selectedItem.donor}</span></p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-bold border border-gray-100">{selectedItem.quantity}</span>
                      <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-bold border border-gray-100">{selectedItem.distance}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 flex gap-3 items-start text-left">
                    <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-amber-700 font-bold text-sm mb-1">Commitment Required</h5>
                      <p className="text-amber-600 text-xs leading-relaxed font-medium">
                        Please collect before {selectedItem.collectBefore.toLowerCase()}.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const queue = JSON.parse(localStorage.getItem('newRequestsQueue') || '[]');
                        queue.push({
                          id: Date.now(),
                          name: selectedItem.name,
                          category: selectedItem.category,
                          quantity: selectedItem.quantity,
                          status: 'Pending',
                          requestDate: 'Just now',
                          pickupTime: selectedItem.collectBefore,
                          donor: selectedItem.donor,
                          donorType: selectedItem.source,
                          address: 'Pickup Address (Awaiting Details)',
                          image: selectedItem.image,
                          location: selectedItem.distance,
                          contact: 'System Generated'
                        });
                        localStorage.setItem('newRequestsQueue', JSON.stringify(queue));

                        setFeedItems(prev => prev.filter(item => item.id !== selectedItem.id));
                        setPickupConfirmed(true);
                      }}
                      className="flex-1 px-4 py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                    >
                      Confirm
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Page-scoped Animations ── */}
      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .grid > div {
          animation: cardFadeIn 0.5s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default FoodFeed;
