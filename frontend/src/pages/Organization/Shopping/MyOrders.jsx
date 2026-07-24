import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Store } from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: 'ORD-882190',
    date: '2026-07-22',
    shopName: 'Green Valley Supermarket',
    shopId: 'shop-1',
    status: 'Delivered',
    totalItems: 3,
    totalPrice: 1050,
    items: [
      { name: 'Organic Red Apples (1kg Bag)', qty: 2, price: 450 },
      { name: 'Ripe Cavendish Bananas (Box)', qty: 1, price: 280 }
    ]
  },
  {
    id: 'ORD-881044',
    date: '2026-07-24',
    shopName: 'Sunnyside Bakery & Cafe',
    shopId: 'shop-2',
    status: 'In Transit',
    totalItems: 2,
    totalPrice: 900,
    items: [
      { name: 'Artisan Whole Wheat Sourdough Loaf', qty: 1, price: 350 },
      { name: 'Assorted Butter Croissants & Danish', qty: 1, price: 550 }
    ]
  }
];

const MyOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 p-6 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Package className="w-8 h-8 text-emerald-600" /> Organization Orders & Requests
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track procurement orders and surplus food requests placed with shop owners
          </p>
        </div>

        <div className="space-y-6">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 hover:border-emerald-200 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Order ID: {order.id}
                  </span>
                  <div
                    onClick={() => navigate(`/organization/shopping/shop/${order.shopId}`)}
                    className="text-base font-bold text-gray-900 hover:text-emerald-600 cursor-pointer flex items-center gap-1.5 mt-0.5"
                  >
                    <Store className="w-4 h-4 text-emerald-600" /> {order.shopName}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {order.status === 'Delivered' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Truck className="w-3.5 h-3.5" />
                    )}
                    {order.status}
                  </span>
                  <span className="text-xs font-medium text-gray-400">{order.date}</span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-800">
                      {item.qty}x {item.name}
                    </span>
                    <span className="font-bold text-gray-900">
                      LKR {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Total Procurement Amount</span>
                <span className="text-xl font-black text-emerald-700">
                  LKR {order.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
