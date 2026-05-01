import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-green-600">
            <img src="/uploads/images/Fresh_Track-removebg-preview.png" alt="Fresh Track Logo" className="h-10 w-10 object-contain" />
            Fresh Track
          </div>
          <p className="mt-2 text-sm text-gray-600">Connecting donors and organizations to reduce food waste.</p>
        </div>

        <div className="flex gap-6">
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>How it works</li>
              <li>Features</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <div className="font-semibold">Contact</div>
          <div className="mt-2">hello@freshtrack.example</div>
          <div className="mt-4 flex gap-3">
            <a href="#" className="text-gray-500 hover:text-gray-900">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Instagram</a>
          </div>
        </div>
      </div>

      <div className="border-t bg-white/60">
        <div className="max-w-6xl mx-auto px-6 py-3 text-sm text-gray-500">© {new Date().getFullYear()} Fresh Track — All rights reserved.</div>
      </div>
    </footer>
  );
}
