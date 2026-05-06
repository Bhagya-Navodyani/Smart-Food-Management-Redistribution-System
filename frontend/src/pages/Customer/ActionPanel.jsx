import React, { useMemo, useState } from 'react';
import { CheckCircle2, HandHeart, Leaf, Recycle, Trash2 } from 'lucide-react';
import { customerFoodItems } from '../../data/customerData';

const actions = [
  { name: 'Consume', icon: CheckCircle2, tone: 'bg-emerald-100 text-emerald-700' },
  { name: 'Donate', icon: HandHeart, tone: 'bg-blue-100 text-blue-700' },
  { name: 'Compost', icon: Leaf, tone: 'bg-lime-100 text-lime-700' },
  { name: 'Animal Feed', icon: Recycle, tone: 'bg-amber-100 text-amber-700' },
  { name: 'Waste', icon: Trash2, tone: 'bg-rose-100 text-rose-700' }
];

export default function ActionPanel() {
  const [selectedItemId, setSelectedItemId] = useState(customerFoodItems[0]?.id || '');
  const [selectedAction, setSelectedAction] = useState('Consume');
  const [actionLog, setActionLog] = useState([]);

  const selectedItem = useMemo(
    () => customerFoodItems.find((item) => item.id === selectedItemId),
    [selectedItemId]
  );

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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Action Panel</h1>
        <p className="text-gray-600">Apply actions to food items and record them for analytics.</p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Select food item</label>
          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
          >
            {customerFoodItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.status})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Choose action</label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.name}
                  type="button"
                  onClick={() => setSelectedAction(action.name)}
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${selectedAction === action.name ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  <Icon className="h-4 w-4" />
                  {action.name}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleApply}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Apply action
        </button>

        {selectedItem && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
            Selected: <span className="font-semibold">{selectedItem.name}</span> • Current status: {selectedItem.status}
          </div>
        )}
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Action history</h2>
        {actionLog.length === 0 ? (
          <p className="text-sm text-gray-500">No actions recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {actionLog.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-gray-200 p-3">
                <p className="font-medium text-gray-900">{entry.action} • {entry.itemName}</p>
                <p className="text-xs text-gray-500">{entry.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
