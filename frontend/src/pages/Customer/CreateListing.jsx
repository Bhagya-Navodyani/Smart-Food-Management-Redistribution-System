import React from 'react';
import CreateListingForm from '../../components/customer/CreateListingForm';

export default function CreateListing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6">
      <div className="mb-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Donate or Sell Listing</h1>
        <p className="mt-2 text-gray-600">
          Use this page to publish a proper listing with photos, pickup info, expiry details, and contact information.
        </p>
      </div>

      <div className="max-w-7xl">
        <CreateListingForm />
      </div>
    </div>
  );
}
