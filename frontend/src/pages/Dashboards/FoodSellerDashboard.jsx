import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, ChefHat, Clock3, MapPin, Package, Store, Sparkles, Truck } from 'lucide-react';
import { getCurrentUserRole, getVisibleGiveFoodListings } from '../../data/giveFoodListings';

const roleLabelMap = {
  Customer: 'Customers',
  'Food sellers': 'Food sellers',
  Organizations: 'Organizations'
};

const FoodSellerDashboard = () => {
  const navigate = useNavigate();
  const currentRole = getCurrentUserRole();
  const visibleListings = getVisibleGiveFoodListings('Food sellers');
  const availableCount = visibleListings.filter((listing) => listing.status === 'available').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-cyan-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/40">
          <div className="grid gap-6 p-8 lg:grid-cols-[1.4fr_0.8fr] lg:p-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-emerald-700">
                <Sparkles className="h-4 w-4" />
                Seller Preview
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900 lg:text-5xl">Food Seller Dashboard</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 lg:text-base">
                  Preview the donation listings that are visible to {roleLabelMap[currentRole] || currentRole}. Use this view to check item details before you claim, coordinate, or manage stock.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/foodsellers/dashboard')}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  <ChefHat className="h-4 w-4" />
                  Refresh Preview
                </button>
                <button
                  onClick={() => navigate('/foodsellers/dashboard')}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Store className="h-4 w-4" />
                  Manage Inventory
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-gray-100 bg-gray-900 p-5 text-white shadow-lg shadow-gray-200/50">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">Visible Listings</p>
                <p className="mt-3 text-3xl font-black">{visibleListings.length}</p>
                <p className="mt-2 text-sm text-gray-300">Listings that match the seller role.</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-emerald-900">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">Available Now</p>
                <p className="mt-3 text-3xl font-black">{availableCount}</p>
                <p className="mt-2 text-sm text-emerald-700">Ready to review or request.</p>
              </div>
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5 text-cyan-900">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">Role</p>
                <p className="mt-3 text-2xl font-black">{currentRole}</p>
                <p className="mt-2 text-sm text-cyan-700">Current signed-in access type.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Preview Listings</h2>
              <p className="text-sm text-gray-500">Only items tagged for sellers or visible to everyone are shown here.</p>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm md:flex">
              <Truck className="h-4 w-4 text-emerald-600" />
              Seller-ready view
            </div>
          </div>

          {visibleListings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center shadow-sm">
              <Package className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">No seller listings yet</h3>
              <p className="mt-2 text-sm text-gray-500">When a donation is tagged for sellers, it will appear here automatically.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleListings.map((listing) => (
                <article key={listing.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={listing.images?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'}
                      alt={listing.itemName}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gray-700 backdrop-blur">
                      {listing.status}
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      For {listing.preferredRecipient === 'any' ? 'Everyone' : listing.preferredRecipient}
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">{listing.category}</p>
                      <h3 className="mt-1 text-xl font-black text-gray-900">{listing.itemName}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{listing.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="rounded-2xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Package className="h-4 w-4" />
                          Quantity
                        </div>
                        <p className="mt-1 font-bold text-gray-900">{listing.quantity} {listing.unit}</p>
                      </div>
                      <div className="rounded-2xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <CalendarDays className="h-4 w-4" />
                          Expiry
                        </div>
                        <p className="mt-1 font-bold text-gray-900">{new Date(listing.expiryDate).toLocaleDateString()}</p>
                      </div>
                      <div className="rounded-2xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock3 className="h-4 w-4" />
                          Available
                        </div>
                        <p className="mt-1 font-bold text-gray-900">{new Date(listing.availableFrom).toLocaleDateString()}</p>
                      </div>
                      <div className="rounded-2xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          Pickup
                        </div>
                        <p className="mt-1 truncate font-bold text-gray-900">{listing.pickupLocation}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/food-details/${listing.id}`)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
                    >
                      Open Listing Preview
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FoodSellerDashboard;