import React from 'react';
import CreateListingForm from '../../components/customer/CreateListingForm';

export default function CreateListing() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Donation / Sale Listing</h1>
        <p className="text-gray-600">Create a listing to donate or sell your items quickly.</p>
      </div>

      <div className="max-w-3xl">
        <CreateListingForm />
      </div>
    </div>
  );
}
