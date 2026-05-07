import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  DollarSign,
  Gift,
  HandHeart,
  MapPin,
  Package,
  Phone,
  Sparkles,
  Truck,
  Upload
} from 'lucide-react';

const initialForm = {
  type: 'donate',
  title: '',
  category: 'vegetables',
  condition: 'fresh',
  quantity: '',
  unit: 'kg',
  expiryDate: '',
  description: '',
  location: '',
  contactName: '',
  contactPhone: '',
  urgent: false,
  // Donate-specific
  donationWindow: 'today',
  refrigeration: false,
  organizationReady: true,
  allergens: '',
  // Sell-specific
  price: '',
  negotiable: false,
  paymentMethod: 'cash',
  deliveryOption: 'pickup'
};

const sectionLabel = 'text-sm font-semibold uppercase tracking-wide text-gray-500';

export default function CreateListingForm() {
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImages = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const previews = selectedFiles.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((current) => [...current, ...previews].slice(0, 4));
  };

  const clearImage = (indexToRemove) => {
    setImages((current) => current.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    setTimeout(() => {
      setSubmitting(false);
      setMessage(`${form.type === 'donate' ? 'Donation' : 'Sale'} listing created for ${form.title || 'your item'}.`);
      setForm(initialForm);
      setImages([]);
    }, 800);
  };

  const isDonate = form.type === 'donate';
  const listingTone = isDonate ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200';
  const actionLabel = isDonate ? 'Publish Donation Listing' : 'Publish Sale Listing';

  const previewSummary = useMemo(() => ({
    headline: form.title || 'Your listing title',
    quantity: form.quantity ? `${form.quantity} ${form.unit}` : 'Quantity not set',
    location: form.location || 'Location not added',
    contact: form.contactName || 'Contact person not added'
  }), [form.title, form.quantity, form.unit, form.location, form.contactName]);

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
      <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${listingTone}`}>
            <Sparkles className="h-4 w-4" />
            Shared form with type-specific requirements
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Advanced listing form</h2>
            <p className="mt-1 text-sm text-gray-600">
              The core fields are shared, but donation and sale sections change depending on the selected type.
            </p>
          </div>
        </div>

        <section className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div>
            <h3 className={sectionLabel}>1. Listing type</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className={`cursor-pointer rounded-xl border p-4 transition ${isDonate ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white'}`}>
              <input type="radio" name="type" value="donate" checked={isDonate} onChange={handleChange} className="sr-only" />
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-600 p-2 text-white"><Gift className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-gray-900">Donate</p>
                  <p className="text-sm text-gray-600">For safe food that should be handed over quickly and responsibly.</p>
                </div>
              </div>
            </label>
            <label className={`cursor-pointer rounded-xl border p-4 transition ${!isDonate ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'}`}>
              <input type="radio" name="type" value="sell" checked={!isDonate} onChange={handleChange} className="sr-only" />
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-500 p-2 text-white"><DollarSign className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-gray-900">Sell</p>
                  <p className="text-sm text-gray-600">For items that still have value and can legally be sold.</p>
                </div>
              </div>
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div>
            <h3 className={sectionLabel}>2. Shared item details</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">Listing title</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="Fresh tomatoes, cooked rice, bakery items..." className="mt-1 w-full rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="mt-1 w-full rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy</option>
                <option value="bakery">Bakery</option>
                <option value="cooked">Cooked Food</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Condition</label>
              <select name="condition" value={form.condition} onChange={handleChange} className="mt-1 w-full rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                <option value="fresh">Fresh</option>
                <option value="near-expiry">Near expiry</option>
                <option value="prepared">Prepared today</option>
                <option value="frozen">Frozen</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Expiry date</label>
              <div className="relative mt-1">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input name="expiryDate" value={form.expiryDate} onChange={handleChange} type="date" className="w-full rounded-xl border-gray-200 bg-white py-3 pl-10 pr-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="mt-1 flex gap-2">
                <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Example: 3" className="w-24 rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
                <select name="unit" value={form.unit} onChange={handleChange} className="flex-1 rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="pieces">pieces</option>
                  <option value="boxes">boxes</option>
                  <option value="packs">packs</option>
                  <option value="liters">liters</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <div className="relative mt-1">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input name="location" value={form.location} onChange={handleChange} placeholder="City, area, or pickup address" className="w-full rounded-xl border-gray-200 bg-white py-3 pl-10 pr-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="What is included, how it was stored, and any important notes..." className="mt-1 w-full rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
          </div>
        </section>

        {isDonate ? (
          <section className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h3 className={sectionLabel}>3. Donation requirements</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Preferred donation window</label>
                <select name="donationWindow" value={form.donationWindow} onChange={handleChange} className="mt-1 w-full rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This week</option>
                </select>
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <input type="checkbox" name="refrigeration" checked={form.refrigeration} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <div>
                  <p className="font-semibold text-gray-900">Needs refrigeration</p>
                  <p className="text-sm text-gray-500">Useful for rescue teams and recipients.</p>
                </div>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <input type="checkbox" name="organizationReady" checked={form.organizationReady} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <div>
                  <p className="font-semibold text-gray-900">Ready for charity/organization pickup</p>
                  <p className="text-sm text-gray-500">Mark this if packing is already done.</p>
                </div>
              </label>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Allergens or special handling</label>
                <input name="allergens" value={form.allergens} onChange={handleChange} placeholder="Milk, nuts, needs refrigeration, etc." className="mt-1 w-full rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h3 className={sectionLabel}>3. Sale requirements</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Price</label>
                <div className="relative mt-1">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input name="price" value={form.price} onChange={handleChange} placeholder="0.00" type="number" step="0.01" required className="w-full rounded-xl border-gray-200 bg-white py-3 pl-10 pr-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Payment method</label>
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="mt-1 w-full rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                  <option value="cash">Cash</option>
                  <option value="mobile-money">Mobile money</option>
                  <option value="bank-transfer">Bank transfer</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Delivery option</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <label className={`cursor-pointer rounded-xl border p-3 ${form.deliveryOption === 'pickup' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'}`}>
                    <input type="radio" name="deliveryOption" value="pickup" checked={form.deliveryOption === 'pickup'} onChange={handleChange} className="sr-only" />
                    <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Pickup</div>
                  </label>
                  <label className={`cursor-pointer rounded-xl border p-3 ${form.deliveryOption === 'delivery' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'}`}>
                    <input type="radio" name="deliveryOption" value="delivery" checked={form.deliveryOption === 'delivery'} onChange={handleChange} className="sr-only" />
                    <div className="flex items-center gap-2"><HandHeart className="h-4 w-4" /> Delivery</div>
                  </label>
                </div>
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <input type="checkbox" name="negotiable" checked={form.negotiable} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <div>
                  <p className="font-semibold text-gray-900">Price negotiable</p>
                  <p className="text-sm text-gray-500">Mark if buyers can discuss the final price.</p>
                </div>
              </label>
            </div>
          </section>
        )}

        <section className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <h3 className={sectionLabel}>4. Photos and contact</h3>
          <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-white p-4">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center">
              <input type="file" accept="image/*" multiple onChange={handleImages} className="hidden" />
              <div className="rounded-full bg-emerald-50 p-3 text-emerald-600"><Upload className="h-6 w-6" /></div>
              <div>
                <p className="font-semibold text-gray-900">Upload up to 4 photos</p>
                <p className="text-sm text-gray-500">Front view, packaging, date label, and portion size work best.</p>
              </div>
            </label>
          </div>

          {images.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {images.map((image, index) => (
                <div key={image.preview} className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <img src={image.preview} alt={`Preview ${index + 1}`} className="h-36 w-full object-cover" />
                  <button type="button" onClick={() => clearImage(index)} className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white">Remove</button>
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">Contact name</label>
              <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="Your name or organization" className="mt-1 w-full rounded-xl border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Contact phone</label>
              <div className="relative mt-1">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input name="contactPhone" value={form.contactPhone} onChange={handleChange} placeholder="07X XXX XXXX" className="w-full rounded-xl border-gray-200 bg-white py-3 pl-10 pr-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
            </div>
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 md:col-span-2">
              <input type="checkbox" name="urgent" checked={form.urgent} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <div>
                <p className="font-semibold text-gray-900">Urgent listing</p>
                <p className="text-sm text-gray-500">Highlight items that should be picked up today.</p>
              </div>
            </label>
          </div>
        </section>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600">Donation and sale requirements now adapt to the selected type.</div>
          <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
            {submitting ? (
              <>
                <Clock3 className="h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                {actionLabel}
              </>
            )}
          </button>
        </div>

        {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</div>}
      </div>

      <aside className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Listing preview</h3>
          <p className="text-sm text-gray-600">A quick summary of what others will see.</p>
        </div>

        <div className={`rounded-2xl border p-4 ${listingTone}`}>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
            <Package className="h-4 w-4" />
            {isDonate ? 'Donation' : 'Sale'}
          </div>
          <h4 className="mt-3 text-xl font-bold text-gray-900">{previewSummary.headline}</h4>
          <p className="mt-1 text-sm text-gray-600">{previewSummary.quantity}</p>
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-gray-400" /> {form.expiryDate || 'Expiry date not added'}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-400" /> {previewSummary.location}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" /> {previewSummary.contact}</div>
            {isDonate ? (
              <div className="flex items-center gap-2"><HandHeart className="h-4 w-4 text-gray-400" /> {form.donationWindow} donation window</div>
            ) : (
              <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-gray-400" /> {form.price || '0.00'} {form.negotiable ? '(negotiable)' : ''}</div>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-900">Checklist before posting</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> Item is safe to share.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> Photos show actual condition.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> Pickup details and contact are correct.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-200 p-4 text-sm text-gray-600">
          <div className="mb-2 flex items-center gap-2 font-semibold text-gray-900"><Camera className="h-4 w-4" /> Tip</div>
          Add one clear image of the item and one image that shows the expiry label.
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="mb-2 flex items-center gap-2 font-semibold"><AlertCircle className="h-4 w-4" /> Why this is different</div>
          Donation asks for pickup and safety details. Selling asks for price, payment, and delivery terms.
        </div>
      </aside>
    </form>
  );
}
