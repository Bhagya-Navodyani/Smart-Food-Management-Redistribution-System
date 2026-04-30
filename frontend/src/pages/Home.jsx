import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-900">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1600&q=60"
            alt="food-hero"
            className="w-full h-[60vh] object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 text-white">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">Save Food. Feed People. Reduce Waste.</h1>
            <p className="mt-4 text-lg text-gray-100/90">Join a community that redistributes surplus food to those who need it — simple, safe, and social.</p>
            <div className="mt-6 flex gap-4">
              <Link to="/signup" className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium shadow-lg">Create account</Link>
              <Link to="/signin" className="inline-block px-6 py-3 bg-white text-gray-800 rounded-lg font-medium shadow">Sign in</Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <iframe
                title="Intro video"
                className="w-full h-64 lg:h-80"
                src="https://www.youtube.com/embed/2Vv-BfVoq4g?rel=0&autoplay=0&mute=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <svg className="absolute -left-10 -top-8 opacity-80 animate-floating" width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#10B981" fillOpacity="0.12" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">For Customers</h3>
            <p className="mt-2 text-gray-600">Browse available donations and request food nearby.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">For Organizations</h3>
            <p className="mt-2 text-gray-600">Claim donations and coordinate distribution to beneficiaries.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">For Food Sellers</h3>
            <p className="mt-2 text-gray-600">List surplus food quickly and reduce waste while helping the community.</p>
          </div>
        </section>

        <section className="mt-12 bg-gradient-to-r from-white to-green-50 rounded-lg p-8 shadow">
          <h2 className="text-2xl font-bold">How it works</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <strong className="text-green-600">1.</strong> Post surplus
            </div>
            <div className="p-4">
              <strong className="text-green-600">2.</strong> Organizations claim
            </div>
            <div className="p-4">
              <strong className="text-green-600">3.</strong> Deliver & track impact
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Impact story</h2>
          <p className="mt-4 text-gray-600">Watch how communities are making a difference.</p>
          <div className="mt-6 rounded-lg overflow-hidden shadow">
            <img src="https://images.unsplash.com/photo-1516687404459-31a1f6a1a6d6?auto=format&fit=crop&w=1400&q=60" alt="impact" className="w-full h-56 object-cover" />
          </div>
        </section>
      </main>

      <footer className="bg-white/80 border-t mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} Smart Food Management</div>
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
