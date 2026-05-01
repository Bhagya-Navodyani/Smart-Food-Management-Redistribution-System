import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  Package,
  Filter,
  ChevronDown,
  Truck,
  Leaf,
  X,
} from 'lucide-react';

/* ── Sample Data ── */
const feedData = [
  {
    id: 1,
    name: 'Hotel Buffet Leftovers',
    category: 'Cooked Food',
    quantity: '45kg',
    collectBefore: 'Before 10:00 PM',
    distance: '12km away',
    safe: true,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=480&q=80',
    donor: 'Grand Palace Hotel',
    posted: '25 min ago',
  },
  {
    id: 2,
    name: 'Fresh Vegetable Scraps',
    category: 'Vegetable',
    quantity: '30kg',
    collectBefore: 'Before 6:00 PM',
    distance: '5km away',
    safe: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=480&q=80',
    donor: 'City Market Stall #12',
    posted: '40 min ago',
  },
  {
    id: 3,
    name: 'Bakery Surplus Bread',
    category: 'Grains',
    quantity: '20kg',
    collectBefore: 'Before 8:00 PM',
    distance: '8km away',
    safe: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=480&q=80',
    donor: 'Sunrise Bakery',
    posted: '1 hr ago',
  },
  {
    id: 4,
    name: 'Overripe Banana Bunches',
    category: 'Fruits',
    quantity: '15kg',
    collectBefore: 'Before 5:00 PM',
    distance: '3km away',
    safe: true,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=480&q=80',
    donor: 'Fresh Mart Supermarket',
    posted: '2 hrs ago',
  },
  {
    id: 5,
    name: 'Rice Mill By-products',
    category: 'Grains',
    quantity: '60kg',
    collectBefore: 'Before 4:00 PM',
    distance: '18km away',
    safe: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=480&q=80',
    donor: 'Lanka Rice Mills',
    posted: '3 hrs ago',
  },
  {
    id: 6,
    name: 'Restaurant Kitchen Waste',
    category: 'Cooked Food',
    quantity: '35kg',
    collectBefore: 'Before 11:00 PM',
    distance: '7km away',
    safe: true,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80',
    donor: 'Spice Garden Restaurant',
    posted: '45 min ago',
  },
  {
    id: 7,
    name: 'Fruit Pulp & Peels',
    category: 'Fruits',
    quantity: '25kg',
    collectBefore: 'Before 3:00 PM',
    distance: '10km away',
    safe: true,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=480&q=80',
    donor: 'Tropical Juice Bar',
    posted: '1.5 hrs ago',
  },
  {
    id: 8,
    name: 'Cabbage & Carrot Trimmings',
    category: 'Vegetable',
    quantity: '18kg',
    collectBefore: 'Before 7:00 PM',
    distance: '6km away',
    safe: true,
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=480&q=80',
    donor: 'Green Leaf Salad Bar',
    posted: '55 min ago',
  },
];

const CATEGORIES = ['All', 'Vegetable', 'Cooked Food', 'Fruits', 'Grains'];
const DISTANCES = ['Any Distance', '< 5 km', '< 10 km', '< 20 km'];

/* ── Category badge colour map ── */
const categoryStyle = {
  'Cooked Food': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  Vegetable:     'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
  Fruits:        'bg-rose-500/20 text-rose-300 border-rose-400/30',
  Grains:        'bg-sky-500/20 text-sky-300 border-sky-400/30',
};

/* ── Component ── */
const FoodFeed = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDistance, setActiveDistance] = useState('Any Distance');
  const [showFilters, setShowFilters] = useState(false);

  /* Simple client-side filtering */
  const filtered = feedData.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat  = activeCategory === 'All' || item.category === activeCategory;
    let matchDist = true;
    if (activeDistance !== 'Any Distance') {
      const km = parseInt(item.distance);
      if (activeDistance === '< 5 km')  matchDist = km < 5;
      if (activeDistance === '< 10 km') matchDist = km < 10;
      if (activeDistance === '< 20 km') matchDist = km < 20;
    }
    return matchName && matchCat && matchDist;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -m-6 p-6 lg:p-10">
      {/* ── Decorative Blurs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ────────────── Header ────────────── */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/20">
              <Leaf size={26} className="text-emerald-400" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Available Animal Feed Surplus
            </h1>
          </div>
          <p className="text-slate-400 text-base lg:text-lg max-w-2xl ml-[52px]">
            Browse surplus food items from local restaurants, markets & vendors — request a
            pickup and help reduce waste while feeding animals in need.
          </p>

          {/* ── Stats Row ── */}
          <div className="flex flex-wrap gap-4 mt-6 ml-[52px]">
            {[
              { label: 'Items Available', value: feedData.length, color: 'emerald' },
              { label: 'Total Quantity', value: '248 kg', color: 'cyan' },
              { label: 'Active Donors', value: '6', color: 'violet' },
            ].map((s) => (
              <div
                key={s.label}
                className={`
                  flex items-center gap-3 px-5 py-2.5 rounded-xl
                  bg-white/[0.04] border border-white/[0.06]
                  backdrop-blur-md
                `}
              >
                <span className={`text-${s.color}-400 text-xl font-bold`}>{s.value}</span>
                <span className="text-slate-400 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ────────────── Search & Filter Bar ────────────── */}
        <div className="mb-8">
          <div
            className="
              flex flex-col md:flex-row gap-4 p-4 rounded-2xl
              bg-white/[0.05] border border-white/[0.08]
              backdrop-blur-xl shadow-2xl shadow-black/20
            "
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="food-feed-search"
                type="text"
                placeholder="Search by item name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full pl-11 pr-4 py-3 rounded-xl
                  bg-white/[0.06] border border-white/[0.1]
                  text-white placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
                  transition-all duration-300
                "
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative min-w-[180px]">
              <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                id="food-feed-category"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="
                  w-full pl-10 pr-10 py-3 rounded-xl appearance-none cursor-pointer
                  bg-white/[0.06] border border-white/[0.1]
                  text-white
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/40
                  transition-all duration-300
                "
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-slate-800 text-white">
                    {c === 'All' ? 'All Waste Types' : c}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Distance Dropdown */}
            <div className="relative min-w-[170px]">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                id="food-feed-distance"
                value={activeDistance}
                onChange={(e) => setActiveDistance(e.target.value)}
                className="
                  w-full pl-10 pr-10 py-3 rounded-xl appearance-none cursor-pointer
                  bg-white/[0.06] border border-white/[0.1]
                  text-white
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/40
                  transition-all duration-300
                "
              >
                {DISTANCES.map((d) => (
                  <option key={d} value={d} className="bg-slate-800 text-white">
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Toggle Filters (mobile-friendly) */}
            <button
              id="food-feed-toggle-filters"
              onClick={() => setShowFilters(!showFilters)}
              className="
                md:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                bg-emerald-500/15 border border-emerald-500/25 text-emerald-400
                hover:bg-emerald-500/25 transition-all duration-300
              "
            >
              <Filter size={16} /> Filters
            </button>
          </div>

          {/* Active Filter Pills */}
          {(activeCategory !== 'All' || activeDistance !== 'Any Distance' || search) && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active:</span>
              {search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-slate-300">
                  "{search}"
                  <button onClick={() => setSearch('')} className="hover:text-white transition"><X size={12} /></button>
                </span>
              )}
              {activeCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  {activeCategory}
                  <button onClick={() => setActiveCategory('All')} className="hover:text-white transition"><X size={12} /></button>
                </span>
              )}
              {activeDistance !== 'Any Distance' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300">
                  {activeDistance}
                  <button onClick={() => setActiveDistance('Any Distance')} className="hover:text-white transition"><X size={12} /></button>
                </span>
              )}
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); setActiveDistance('Any Distance'); }}
                className="text-xs text-slate-500 hover:text-red-400 underline transition"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-400">
            Showing <span className="text-white font-semibold">{filtered.length}</span> of{' '}
            <span className="text-white font-semibold">{feedData.length}</span> items
          </p>
        </div>

        {/* ────────────── Feed Cards Grid ────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="p-5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <Search size={40} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No items found</h3>
            <p className="text-slate-500 max-w-sm">
              Try adjusting your search or filter criteria to discover available surplus.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="
                  group relative rounded-2xl overflow-hidden
                  bg-white/[0.05] border border-white/[0.08]
                  backdrop-blur-xl
                  hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/20
                  transition-all duration-500 ease-out
                  hover:-translate-y-1
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span
                    className={`
                      absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider
                      border backdrop-blur-md
                      ${categoryStyle[item.category] || 'bg-slate-500/20 text-slate-300 border-slate-400/30'}
                    `}
                  >
                    {item.category}
                  </span>

                  {/* Posted time */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] text-slate-300 font-medium">
                    {item.posted}
                  </span>

                  {/* Donor name at bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs text-slate-300 truncate font-medium">
                      by {item.donor}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-emerald-300 transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10">
                        <Package size={14} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Qty</p>
                        <p className="text-sm text-white font-semibold">{item.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/10">
                        <Clock size={14} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Collect</p>
                        <p className="text-sm text-white font-semibold">{item.collectBefore.replace('Before ', '')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-violet-500/10">
                        <MapPin size={14} className="text-violet-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Distance</p>
                        <p className="text-sm text-white font-semibold">{item.distance}</p>
                      </div>
                    </div>

                    {item.safe && (
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-500/10">
                          <ShieldCheck size={14} className="text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Safety</p>
                          <p className="text-sm text-emerald-400 font-semibold">Safe for Animals</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

                  {/* CTA */}
                  <button
                    id={`request-pickup-${item.id}`}
                    className="
                      w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                      bg-gradient-to-r from-emerald-600 to-emerald-500
                      text-white font-semibold text-sm
                      shadow-lg shadow-emerald-900/30
                      hover:from-emerald-500 hover:to-emerald-400
                      hover:shadow-emerald-500/30
                      active:scale-[0.97]
                      transition-all duration-300
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
      </div>

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
