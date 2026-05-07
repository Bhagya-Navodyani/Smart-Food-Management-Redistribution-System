import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, HandHeart, Leaf, Recycle, Trash2, Sparkles, ArrowRight, Clock3, Salad } from 'lucide-react';
import { customerFoodItems } from '../../data/customerData';

const actions = [
  { name: 'Consume', icon: CheckCircle2, tone: 'from-emerald-500 to-teal-500', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', desc: 'Use this item in a meal or snack today.' },
  { name: 'Donate', icon: HandHeart, tone: 'from-sky-500 to-blue-500', chip: 'bg-sky-50 text-sky-700 border-sky-200', desc: 'Send it to a nearby organization or community kitchen.' },
  { name: 'Compost', icon: Leaf, tone: 'from-lime-500 to-green-500', chip: 'bg-lime-50 text-lime-700 border-lime-200', desc: 'Turn organic waste into compost for reuse.' },
  { name: 'Animal Feed', icon: Recycle, tone: 'from-amber-500 to-orange-500', chip: 'bg-amber-50 text-amber-700 border-amber-200', desc: 'Redirect suitable leftovers to animal feed.' },
  { name: 'Waste', icon: Trash2, tone: 'from-rose-500 to-red-500', chip: 'bg-rose-50 text-rose-700 border-rose-200', desc: 'Mark as waste when it is no longer safe.' }
];

const CATEGORY_IMAGE_BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_CATEGORY_IMAGE_BASE_URL) ||
  '/images/categories';

const imageByCategory = {
  Vegetables: `${CATEGORY_IMAGE_BASE}/vegetables.jpg`,
  Fruits: `${CATEGORY_IMAGE_BASE}/fruits.jpg`,
  Dairy: `${CATEGORY_IMAGE_BASE}/dairy.jpg`,
  'Cooked Food': `${CATEGORY_IMAGE_BASE}/cooked-food.jpg`,
  Bakery: `${CATEGORY_IMAGE_BASE}/bakery.jpg`,
  default: `${CATEGORY_IMAGE_BASE}/default.jpg`
};

function getItemImage(item) {
  return imageByCategory[item.category] || imageByCategory.default;
}

export default function ActionPanel() {
  const [selectedItemId, setSelectedItemId] = useState(customerFoodItems[0]?.id || '');
  const [selectedAction, setSelectedAction] = useState('Consume');
  const [actionLog, setActionLog] = useState([]);

  const selectedItem = useMemo(
    () => customerFoodItems.find((item) => item.id === selectedItemId),
    [selectedItemId]
  );

  const selectedActionConfig = actions.find((action) => action.name === selectedAction) || actions[0];

  const handleApply = () => {
    if (!selectedItem) return;
    const entry = {
      id: `LOG-${Date.now()}`,
      itemName: selectedItem.name,
      action: selectedAction,
      time: new Date().toLocaleString()
    };
    setActionLog((prev) => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 p-8 text-white shadow-xl"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-12 top-6 h-32 w-32 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-lime-300/30 blur-3xl" />
        </div>
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Animated action workflow
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight">Action Panel</h1>
            <p className="mt-3 max-w-2xl text-emerald-50">
              Turn each food item into the right action with a more visual, guided workflow and a live food preview.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">Record actions</span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">Reduce waste</span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">Donate faster</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={selectedItem ? getItemImage(selectedItem) : imageByCategory.default}
                alt="Selected food preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80">Current item</p>
                  <p className="text-xl font-semibold">{selectedItem?.name}</p>
                </div>
                <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {selectedItem?.status}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 bg-white/10 p-4 text-center text-xs text-white/90">
              <div>
                <p className="font-semibold text-base">{customerFoodItems.length}</p>
                <p>Items</p>
              </div>
              <div>
                <p className="font-semibold text-base">{actionLog.length}</p>
                <p>Actions</p>
              </div>
              <div>
                <p className="font-semibold text-base">{customerFoodItems.filter((item) => item.status === 'Near Expiry').length}</p>
                <p>Urgent</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Select food item</h2>
              <p className="text-sm text-gray-500">Preview a real food item and choose what happens next.</p>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 md:flex">
              <Salad className="h-4 w-4" />
              Fresh, near expiry, expired
            </div>
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-700">Choose item</label>
          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          >
            {customerFoodItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.status})
              </option>
            ))}
          </select>

          {selectedItem && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
              <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                <div className="relative h-56 md:h-full min-h-[220px]">
                  <img src={getItemImage(selectedItem)} alt={selectedItem.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow">
                    {selectedItem.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {selectedItem.status}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      Expiry {selectedItem.expiryDate}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      {selectedItem.quantity}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-gray-900">{selectedItem.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {selectedItem.category} item selected for a visual action workflow. Choose the best next step for this food.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Clock3 className="h-4 w-4" />
                    Use the action buttons below to record the item outcome.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Choose action</h2>
            <p className="text-sm text-gray-500">Pick one action and animate it into the history log.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {actions.map((action) => {
              const Icon = action.icon;
              const isActive = selectedAction === action.name;
              return (
                <motion.button
                  key={action.name}
                  type="button"
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAction(action.name)}
                  className={`group rounded-2xl border p-4 text-left transition ${isActive ? 'border-emerald-400 bg-emerald-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${action.tone} text-white shadow-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-gray-900">{action.name}</p>
                        {isActive && <ArrowRight className="h-4 w-4 text-emerald-600" />}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{action.desc}</p>
                      <div className={`mt-3 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${action.chip}`}>
                        Selected to record
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white" whileHover={{ scale: 1.01 }}>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-3">
                {selectedActionConfig.icon && <selectedActionConfig.icon className="h-6 w-6" />}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/80">Ready action</p>
                <p className="text-lg font-semibold">{selectedAction}</p>
              </div>
            </div>
          </motion.div>

          <button
            onClick={handleApply}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Apply action
            <ArrowRight className="h-4 w-4" />
          </button>

          {selectedItem && (
            <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              Selected: <span className="font-semibold">{selectedItem.name}</span> • Current status: {selectedItem.status}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Action history</h2>
            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {actionLog.length} records
            </div>
          </div>
          {actionLog.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
              No actions recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {actionLog.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-emerald-100 p-2 text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{entry.action} • {entry.itemName}</p>
                      <p className="text-xs text-gray-500">{entry.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[280px]">
              <img
                src={selectedItem ? getItemImage(selectedItem) : imageByCategory.default}
                alt="Food illustration"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm uppercase tracking-[0.18em] text-white/80">Food spotlight</p>
                <h3 className="text-2xl font-bold">{selectedItem?.category}</h3>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900">Visual guide</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Add animated transitions, food imagery, and action cards so the user instantly understands what to do with each item.
              </p>
              <div className="mt-4 space-y-3">
                {['Fresh items need quick consumption', 'Near expiry items can be donated', 'Expired items should not be donated'].map((tip) => (
                  <div key={tip} className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    <div className="rounded-full bg-emerald-100 p-1 text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
