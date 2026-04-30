import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshowImages = [
    { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80', alt: 'Fresh vegetables and fruits' },
    { src: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1200&q=80', alt: 'Healthy food arrangement' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', alt: 'Food preparation' },
    { src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80', alt: 'Fresh produce market' },
    { src: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1200&q=80', alt: 'Organic vegetables' },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=60',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: '🍎', title: 'Food Tracking', desc: 'Manage vegetables, fruits, cooked food with smart expiry alerts', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=60' },
    { icon: '🟢', title: 'Status Indicators', desc: 'Visual indicators: 🟢 Fresh 🟠 Near Expiry 🔴 Expired', img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=200&q=60' },
    { icon: '💡', title: 'Smart Suggestions', desc: 'AI-powered recipe ideas and usage recommendations', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=60' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Track waste reduction insights and food usage patterns', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=200&q=60' },
  ];

  const actions = [
    { icon: '🍽️', label: 'Consume', color: 'bg-emerald-500', desc: 'Track daily consumption' },
    { icon: '🤝', label: 'Donate', color: 'bg-green-500', desc: 'Share with those in need' },
    { icon: '🐄', label: 'Animal Feed', color: 'bg-lime-500', desc: 'Safe for livestock' },
    { icon: '🌱', label: 'Compost', color: 'bg-teal-500', desc: 'Create rich soil' },
    { icon: '🗑️', label: 'Waste', color: 'bg-gray-400', desc: 'Track disposal' },
  ];

  const userRoles = [
    { role: 'Regular User', icon: '👤', features: ['Add & manage food items', 'Track expiry dates', 'Smart suggestions', 'Browse marketplace'], cta: 'Get Started', link: '/signup?role=Customer', color: 'from-emerald-400 to-green-500' },
    { role: 'Shop Owner', icon: '🏪', features: ['Manage inventory', 'Apply discounts', 'Donate unsold items', 'View analytics'], cta: 'Join as Seller', link: '/signup?role=Food%20sellers', color: 'from-green-400 to-emerald-500' },
    { role: 'Organization', icon: '🏢', features: ['Receive donations', 'Accept/reject requests', 'Track donation history', 'Coordinate distribution'], cta: 'Register Org', link: '/signup?role=Organizations', color: 'from-teal-400 to-green-500' },
    { role: 'Admin', icon: '🧑‍💼', features: ['Manage all users', 'Monitor system items', 'View analytics', 'Manage categories'], cta: 'Admin Access', link: '/signup?role=Admin', color: 'from-lime-400 to-green-500' },
  ];

  const stats = [
    { value: '50K+', label: 'Food Items Tracked', icon: '📦' },
    { value: '12K', label: 'Meals Saved', icon: '🍽️' },
    { value: '5.2t', label: 'Food Redistributed', icon: '📊' },
    { value: '2.1t', label: 'Compost Created', icon: '🌱' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-700">
      
      {/* Hero Section with Slideshow */}
      <header className="relative h-[80vh] overflow-hidden">
        {slideshowImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/40 via-green-600/30 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6 animate-bounce">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              🌱 Smart Food Management & Redistribution System
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              Reduce Food Waste.<br />
              <span className="text-green-100">Feed Communities.</span>
            </h1>
            <p className="mt-6 text-xl text-white/90 max-w-lg drop-shadow-md">
              Track expiry dates, get smart suggestions, and take sustainable actions like donation, composting, and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                Start Managing Food
                <span className="animate-pulse">→</span>
              </Link>
              <Link to="/signin" className="inline-flex items-center gap-2 px-8 py-4 bg-green-500/30 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-green-500/50 transition-all">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Slideshow Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slideshowImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Stats Bar */}
        <section className="-mt-28 relative z-20">
          <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border border-green-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-125 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-bold text-green-500">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">See How It Works</h2>
            <p className="mt-3 text-gray-500">Watch our system in action - from tracking to redistribution</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <video
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=60"
              >
                <source src="https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_Supermarket_Dairy_06_preview.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-lg">🛒 Shop Management</h3>
                  <p className="text-sm text-white/80">Track inventory and apply smart discounts</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <video
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=60"
              >
                <source src="https://joy1.videvo.net/videvo_files/video/free/2015-08/large_watermarked/FoodPackaging_02_Videvo_preview.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-lg">📦 Food Distribution</h3>
                  <p className="text-sm text-white/80">Redistribute surplus to communities in need</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features with Images */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Smart Food Management Features</h2>
            <p className="mt-3 text-gray-500">Everything you need to manage food efficiently and sustainably</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="h-32 overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Image Gallery Carousel */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Food Management Gallery</h2>
            <p className="mt-3 text-gray-500">Explore our sustainable food ecosystem</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex gap-4 animate-marquee">
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <div key={i} className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-lg group">
                  <img src={img} alt={`gallery-${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Types */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What Can You Do With Your Food?</h2>
            <p className="mt-3 text-gray-500">Smart action recommendations for every food item</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {actions.map((action, i) => (
              <div key={i} className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all text-center cursor-pointer hover:-translate-y-3 border border-green-50">
                <div className={`w-16 h-16 mx-auto ${action.color} rounded-full flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform group-hover:rotate-12`}>
                  {action.icon}
                </div>
                <h4 className="mt-4 font-semibold text-gray-800">{action.label}</h4>
                <p className="mt-1 text-xs text-gray-500">{action.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* User Roles */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Choose Your Role</h2>
            <p className="mt-3 text-gray-500">Tailored features for every type of user</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userRoles.map((role, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col border border-green-50">
                <div className={`bg-gradient-to-r ${role.color} p-6 text-white`}>
                  <div className="text-4xl mb-3">{role.icon}</div>
                  <h3 className="text-xl font-bold">{role.role}</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {role.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link to={role.link} className={`mt-6 w-full py-3 text-center rounded-lg bg-gradient-to-r ${role.color} text-white font-semibold hover:opacity-90 transition-opacity shadow-md`}>
                    {role.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works with Animations */}
        <section className="mt-20 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-10 border border-green-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
            <p className="mt-3 text-gray-500">Simple steps to reduce waste and make an impact</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Add Food', desc: 'Log items with expiry dates', icon: '📝', color: 'bg-blue-100 text-blue-600' },
              { step: '2', title: 'Track Status', desc: 'See Fresh, Near Expiry, Expired', icon: '👁️', color: 'bg-green-100 text-green-600' },
              { step: '3', title: 'Get Suggestions', desc: 'Smart recommendations', icon: '💡', color: 'bg-yellow-100 text-yellow-600' },
              { step: '4', title: 'Take Action', desc: 'Consume, Donate, or Compost', icon: '✅', color: 'bg-emerald-100 text-emerald-600' },
            ].map((item, i) => (
              <div key={i} className="text-center relative group">
                <div className={`w-20 h-20 mx-auto ${item.color} rounded-full flex items-center justify-center text-3xl shadow-lg mb-4 group-hover:scale-110 transition-transform group-hover:rotate-6`}>
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm hidden md:flex animate-pulse">
                  {item.step}
                </div>
                <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shop Owner Section with Video */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-10 flex flex-col lg:flex-row items-center gap-10 border border-green-100">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                🏪 For Shop Owners
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Turn Near-Expiry Stock Into Value</h2>
              <ul className="space-y-3">
                {['Manage inventory with expiry tracking', 'Auto-apply discounts for near-expiry items', 'Donate unsold food to organizations', 'Track sales, waste, and donation analytics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup?role=Food%20sellers" className="inline-block mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-1">
                Join as Shop Owner →
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-72 object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=60"
                >
                  <source src="https://joy1.videvo.net/videvo_files/video/free/2019-05/large_watermarked/190424_04_Grocery_Store_05_preview.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Reduce Food Waste?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users, shop owners, and organizations making a difference. 
              Track your food, save money, and help the planet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                Get Started Free
              </Link>
              <Link to="/signin" className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all border-2 border-white/30">
                Sign In
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
