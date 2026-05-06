import React, { useMemo, useState } from 'react';
import { Search, Plus, Pencil, Eye, Filter } from 'lucide-react';
import { customerFoodItems } from '../../data/customerData';

const initialForm = {
  name: '',
  category: 'Vegetables',
  quantity: '',
  expiryDate: ''
};

function getStatusColor(status) {
  if (status === 'Fresh') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (status === 'Near Expiry') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-rose-50 text-rose-700 border-rose-200';
}

function computeStatus(expiryDate) {
  const today = new Date();
  const end = new Date(expiryDate);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Expired';
  if (diff <= 2) return 'Near Expiry';
  return 'Fresh';
}

export default function FoodList() {
  const [items, setItems] = useState(customerFoodItems);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form, setForm] = useState(initialForm);

  const categories = useMemo(() => ['All', ...new Set(items.map((item) => item.category))], [items]);
  const statuses = ['All', 'Fresh', 'Near Expiry', 'Expired'];

  const filtered = items.filter((item) => {
    const inSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const inCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const inStatus = statusFilter === 'All' || item.status === statusFilter;
    return inSearch && inCategory && inStatus;
  });

  const openAdd = () => {
    setForm(initialForm);
    setShowAddModal(true);
  };

  const openEdit = (item) => {
    setSelectedItem(item);
    setForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      expiryDate: item.expiryDate
    });
    setShowEditModal(true);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const status = computeStatus(form.expiryDate);
    const newItem = {
      id: `F${Math.floor(Math.random() * 10000)}`,
      ...form,
      status
    };
    setItems((prev) => [newItem, ...prev]);
    setShowAddModal(false);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const status = computeStatus(form.expiryDate);
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              ...form,
              status
            }
          : item
      )
    );
    setShowEditModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Food List</h1>
          <p className="text-gray-600">Manage all your food items and avoid expiry waste.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Add Food
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food name"
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3 text-sm font-medium text-gray-500">
          {filtered.length} items found
        </div>
        <div className="divide-y divide-gray-100">
          {filtered.map((item) => (
            <div key={item.id} className="grid gap-3 px-4 py-4 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_auto] md:items-center">
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">ID: {item.id}</p>
              </div>
              <p className="text-sm text-gray-700">{item.category}</p>
              <p className="text-sm text-gray-700">{item.quantity}</p>
              <div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="rounded-md border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="rounded-md border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                  title="Edit food"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && !showEditModal && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-emerald-800">
            <Filter className="h-4 w-4" />
            <h3 className="font-semibold">Food details and suggested action</h3>
          </div>
          <p className="text-sm text-emerald-900">
            {selectedItem.name} ({selectedItem.quantity}) in {selectedItem.category} category is currently
            {' '}
            <span className="font-semibold">{selectedItem.status}</span>.
            Suggested action: {selectedItem.status === 'Expired' ? 'Waste or compost safely.' : selectedItem.status === 'Near Expiry' ? 'Consume or donate soon.' : 'Keep and monitor expiry date.'}
          </p>
        </div>
      )}

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={showAddModal ? handleAdd : handleEdit}
            className="w-full max-w-md space-y-3 rounded-xl bg-white p-5"
          >
            <h2 className="text-xl font-bold text-gray-900">{showAddModal ? 'Add Food Item' : 'Edit Food Item'}</h2>
            <input
              required
              placeholder="Food name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
            />
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
            >
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Dairy</option>
              <option>Cooked Food</option>
              <option>Bakery</option>
              <option>Packaged Items</option>
            </select>
            <input
              required
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
            />
            <input
              required
              type="date"
              value={form.expiryDate}
              onChange={(e) => setForm((prev) => ({ ...prev, expiryDate: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
            />
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
                {showAddModal ? 'Add Item' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
