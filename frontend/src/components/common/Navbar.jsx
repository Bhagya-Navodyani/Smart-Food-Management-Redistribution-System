import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        {/* Navbar උස ලෝගෝ එකට ගැලපෙන්න h-20 දක්වා වැඩි කළා */}
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-green-600">
              <img
                src="/uploads/images/Fresh_Track-removebg-preview.png"
                alt="Fresh Track Logo"
                className="h-16 w-auto object-contain"
              />
              Fresh Track
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8 text-lg">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</Link>
            <a href="#how" className="text-gray-700 hover:text-gray-900 font-medium">How it works</a>
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">About</Link>
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">Contact</Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/signin" className="px-5 py-2 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">Sign in</Link>
            <Link to="/signup" className="px-5 py-2 rounded-md bg-green-500 text-white text-sm font-semibold hover:bg-green-600 shadow-md transition">Sign up</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link to="/" onClick={() => setOpen(false)} className="block py-2 text-gray-700 font-medium">Home</Link>
            <a href="#how" onClick={() => setOpen(false)} className="block py-2 text-gray-700 font-medium">How it works</a>
            <Link to="/" onClick={() => setOpen(false)} className="block py-2 text-gray-700 font-medium">About</Link>
            <Link to="/signin" onClick={() => setOpen(false)} className="block py-2 text-gray-700 font-medium">Sign in</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="block text-center text-white bg-green-500 px-3 py-3 rounded-lg font-bold">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
