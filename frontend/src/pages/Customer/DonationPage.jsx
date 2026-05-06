import React from 'react';
import { HandHeart, Send } from 'lucide-react';
import { customerFoodItems, donationHistory } from '../../data/customerData';

export default function DonationPage() {
  const donationItems = customerFoodItems.filter((item) => item.status !== 'Expired');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Donation Center</h1>
        <p className="text-gray-600">Send donation requests and track donation history.</p>
      </div>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-gray-900">
          <HandHeart className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Available items for donation</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {donationItems.map((item) => (
            <div key={item.id} className="rounded-lg border border-gray-200 p-3">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">{item.category} • {item.quantity}</p>
              <div className="mt-3 flex justify-end">
                <button className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700">
                  <Send className="h-3.5 w-3.5" />
                  Send donation request
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Donation history</h2>
        <div className="space-y-3">
          {donationHistory.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-gray-200 p-3">
              <p className="font-semibold text-gray-900">{entry.itemName} ({entry.quantity})</p>
              <p className="text-sm text-gray-600">Organization: {entry.organization}</p>
              <p className="text-xs text-gray-500">{entry.date}</p>
              <span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${entry.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
