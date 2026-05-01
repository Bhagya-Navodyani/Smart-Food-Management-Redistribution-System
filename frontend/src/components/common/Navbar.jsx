import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-green-600">SmartFood</Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <a href="#how" className="text-gray-700 hover:text-gray-900">How it works</a>
            <Link to="/" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link to="/" className="text-gray-700 hover:text-gray-900">Contact</Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            <Link to="/signin" className="px-4 py-2 rounded-md border border-transparent text-sm font-medium text-gray-700 hover:bg-gray-100">Sign in</Link>
            <Link to="/signup" className="px-4 py-2 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600">Sign up</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link to="/" onClick={() => setOpen(false)} className="block text-gray-700">Home</Link>
            <a href="#how" onClick={() => setOpen(false)} className="block text-gray-700">How it works</a>
            <Link to="/" onClick={() => setOpen(false)} className="block text-gray-700">About</Link>
            <Link to="/signin" onClick={() => setOpen(false)} className="block text-gray-700">Sign in</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="block text-white bg-green-500 px-3 py-2 rounded">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
