import React, { useState } from 'react';

export default function CreateListingForm() {
  const [form, setForm] = useState({
    type: 'donate',
    name: '',
    category: 'vegetables',
    quantity: '',
    expiryDate: '',
    price: '',
    description: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    // For now just simulate submission; integrate API later
    setTimeout(() => {
      setSubmitting(false);
      setMessage(`Listing created (${form.type.toUpperCase()}): ${form.name}`);
      setForm({ type: 'donate', name: '', category: 'vegetables', quantity: '', expiryDate: '', price: '', description: '' });
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="type" value="donate" checked={form.type === 'donate'} onChange={handleChange} />
          <span className="text-sm">Donate</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="type" value="sell" checked={form.type === 'sell'} onChange={handleChange} />
          <span className="text-sm">Sell</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Item name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-200 shadow-sm">
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 2kg, 3 pieces" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Expiry date</label>
          <input name="expiryDate" value={form.expiryDate} onChange={handleChange} type="date" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Price (if selling)</label>
          <input name="price" value={form.price} onChange={handleChange} placeholder="0.00" type="number" step="0.01" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Provide clear photos and label allergens when possible.</div>
        <button type="submit" disabled={submitting} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50">
          {submitting ? 'Submitting...' : 'Create Listing'}
        </button>
      </div>

      {message && <div className="text-sm text-emerald-700 font-semibold">{message}</div>}
    </form>
  );
}
