import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  MapPin,
  Calendar,
  Star,
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  MessageCircle
} from 'lucide-react';

const MyOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 'ORD-001',
      storeName: 'Green Market',
      items: [
        { name: 'Fresh Organic Vegetables', quantity: '5kg', price: 12.99 },
        { name: 'Seasonal Fruits', quantity: '2kg', price: 8.99 }
      ],
      status: 'delivered',
      orderDate: '2024-05-01',
      deliveryDate: '2024-05-02',
      totalAmount: 21.98,
      savings: 20.00,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      address: '123 Green Street, Downtown',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      storeName: 'City Bakery',
      items: [
        { name: 'Artisan Bread Collection', quantity: '6 pieces', price: 8.99 }
      ],
      status: 'in-transit',
      orderDate: '2024-05-03',
      deliveryDate: '2024-05-04',
      totalAmount: 8.99,
      savings: 10.00,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=100&q=80',
      rating: 0,
      address: '456 Bakery Avenue, Midtown',
      trackingNumber: 'TRK123456790'
    },
    {
      id: 'ORD-003',
      storeName: 'Fruit Paradise',
      items: [
        { name: 'Mixed Fruits Basket', quantity: '3kg', price: 16.99 }
      ],
      status: 'processing',
      orderDate: '2024-05-04',
      deliveryDate: '2024-05-05',
      totalAmount: 16.99,
      savings: 16.00,
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=100&q=80',
      rating: 0,
      address: '789 Fruit Lane, Uptown',
      trackingNumber: 'TRK123456791'
    },
    {
      id: 'ORD-004',
      storeName: 'Fresh Dairy Co.',
      items: [
        { name: 'Dairy Products Pack', quantity: '1 pack', price: 14.99 }
      ],
      status: 'cancelled',
      orderDate: '2024-04-30',
      deliveryDate: '2024-05-01',
      totalAmount: 14.99,
      savings: 14.00,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=100&q=80',
      rating: 0,
      address: '321 Dairy Road, Westside',
      trackingNumber: 'TRK123456792'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Orders', color: 'bg-gray-100 text-gray-700' },
    { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-700' },
    { value: 'in-transit', label: 'In Transit', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-700' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'in-transit': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'in-transit': return 'text-yellow-600 bg-yellow-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const renderStars = (rating, orderId) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 cursor-pointer transition-colors ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track your food orders and manage your purchases</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">8</span>
          </div>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Truck className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold text-gray-900">2</span>
          </div>
          <p className="text-sm text-gray-600">In Transit</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-green-600 font-bold">$</div>
            <span className="text-2xl font-bold text-gray-900">$156</span>
          </div>
          <p className="text-sm text-gray-600">Total Saved</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID or store name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {statusOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`
                  px-4 py-2 rounded-full font-medium transition-all
                  ${selectedStatus === option.value
                    ? option.color
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <img
                    src={order.image}
                    alt={order.storeName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{order.storeName}</h3>
                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        Ordered on {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${order.totalAmount}</p>
                  <p className="text-sm text-green-600">Saved ${order.savings}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-medium">{item.quantity} - ${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{order.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                  </div>
                </div>
                {order.status === 'in-transit' && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                    <Truck className="w-4 h-4" />
                    <span>Tracking: {order.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-4">
                  {order.status === 'delivered' && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Rate this order:</span>
                      {renderStars(order.rating, order.id)}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Contact Store
                  </button>
                  {order.status === 'in-transit' && (
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
