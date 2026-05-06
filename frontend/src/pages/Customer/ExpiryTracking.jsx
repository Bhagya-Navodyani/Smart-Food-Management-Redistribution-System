import React from 'react';
import { AlertTriangle, XCircle, Clock } from 'lucide-react';
import { customerFoodItems } from '../../data/customerData';

export default function ExpiryTracking() {
  const nearExpiry = customerFoodItems.filter((item) => item.status === 'Near Expiry');
  const expired = customerFoodItems.filter((item) => item.status === 'Expired');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Expiry Tracking</h1>
        <p className="text-gray-600">Monitor near-expiry and expired food with clear visual indicators.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="mb-4 flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Near Expiry Items ({nearExpiry.length})</h2>
          </div>
          <div className="space-y-3">
            {nearExpiry.map((item) => (
              <div key={item.id} className="rounded-lg border border-amber-200 bg-white p-3">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.category} • {item.quantity}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                  <Clock className="h-3.5 w-3.5" />
                  Expires on {item.expiryDate}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <div className="mb-4 flex items-center gap-2 text-rose-800">
            <XCircle className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Expired Items ({expired.length})</h2>
          </div>
          <div className="space-y-3">
            {expired.map((item) => (
              <div key={item.id} className="rounded-lg border border-rose-200 bg-white p-3">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.category} • {item.quantity}</p>
                <p className="mt-1 text-xs font-medium text-rose-700">Expired on {item.expiryDate}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
