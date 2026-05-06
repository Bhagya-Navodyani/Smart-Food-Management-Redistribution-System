export const customerFoodItems = [
  {
    id: 'F001',
    name: 'Spinach bundle',
    category: 'Vegetables',
    quantity: '2 bunches',
    expiryDate: '2026-05-08',
    status: 'Near Expiry'
  },
  {
    id: 'F002',
    name: 'Bananas',
    category: 'Fruits',
    quantity: '8 pcs',
    expiryDate: '2026-05-07',
    status: 'Near Expiry'
  },
  {
    id: 'F003',
    name: 'Milk carton',
    category: 'Dairy',
    quantity: '1L',
    expiryDate: '2026-05-05',
    status: 'Expired'
  },
  {
    id: 'F004',
    name: 'Cooked rice',
    category: 'Cooked Food',
    quantity: '1 box',
    expiryDate: '2026-05-06',
    status: 'Near Expiry'
  },
  {
    id: 'F005',
    name: 'Tomatoes',
    category: 'Vegetables',
    quantity: '1 kg',
    expiryDate: '2026-05-11',
    status: 'Fresh'
  },
  {
    id: 'F006',
    name: 'Yogurt cups',
    category: 'Dairy',
    quantity: '4 cups',
    expiryDate: '2026-05-12',
    status: 'Fresh'
  },
  {
    id: 'F007',
    name: 'Bread loaf',
    category: 'Bakery',
    quantity: '1 loaf',
    expiryDate: '2026-05-06',
    status: 'Expired'
  },
  {
    id: 'F008',
    name: 'Apples',
    category: 'Fruits',
    quantity: '6 pcs',
    expiryDate: '2026-05-14',
    status: 'Fresh'
  }
];

export const customerActionStats = {
  saved: 27,
  wasted: 9,
  donated: 11,
  composted: 6
};

export const customerRecentActivity = [
  {
    id: 'A001',
    type: 'Donate',
    text: 'Donated cooked rice to community kitchen',
    time: '30 minutes ago'
  },
  {
    id: 'A002',
    type: 'Consume',
    text: 'Used spinach bundle in lunch meal',
    time: '2 hours ago'
  },
  {
    id: 'A003',
    type: 'Compost',
    text: 'Composted vegetable peels',
    time: 'Yesterday'
  },
  {
    id: 'A004',
    type: 'Waste',
    text: 'Marked bread loaf as waste',
    time: 'Yesterday'
  }
];

export const donationHistory = [
  {
    id: 'D001',
    itemName: 'Cooked rice',
    quantity: '1 box',
    organization: 'Hope Food Center',
    status: 'Accepted',
    date: '2026-05-05'
  },
  {
    id: 'D002',
    itemName: 'Bananas',
    quantity: '4 pcs',
    organization: 'Community Care Hub',
    status: 'Pending',
    date: '2026-05-04'
  }
];

export const smartAlerts = [
  {
    id: 'AL001',
    type: 'urgent',
    title: '3 items expiring in 2 days',
    message: 'Spinach, Bananas, and Cooked rice need attention',
    icon: 'AlertTriangle',
    severity: 'high'
  },
  {
    id: 'AL002',
    type: 'expired',
    title: '2 items already expired',
    message: 'Milk carton and Bread loaf are past expiry date',
    icon: 'XCircle',
    severity: 'critical'
  },
  {
    id: 'AL003',
    type: 'info',
    title: 'Great week! 78% waste reduction',
    message: 'You\'re doing better than last week',
    icon: 'Lightbulb',
    severity: 'low'
  }
];

export const smartSuggestions = [
  {
    id: 'SG001',
    priority: 'high',
    suggestion: 'Consume milk today (expires tomorrow)',
    action: 'Use in smoothie or cereal',
    icon: 'Zap',
    actionType: 'consume'
  },
  {
    id: 'SG002',
    priority: 'high',
    suggestion: 'Donate extra vegetables',
    action: 'Spinach bundle is perfect for community kitchen',
    icon: 'HandHeart',
    actionType: 'donate'
  },
  {
    id: 'SG003',
    priority: 'medium',
    suggestion: 'Compost expired bread',
    action: 'Bread loaf has passed expiry - best for composting',
    icon: 'Leaf',
    actionType: 'compost'
  }
];

export const categoryDistribution = [
  { name: 'Vegetables', waste: 3, saved: 8 },
  { name: 'Fruits', waste: 1, saved: 5 },
  { name: 'Dairy', waste: 2, saved: 7 },
  { name: 'Cooked Food', waste: 2, saved: 4 },
  { name: 'Bakery', waste: 1, saved: 3 }
];

export const expiryTrend = [
  { date: 'Apr 29', expired: 2, saved: 5 },
  { date: 'Apr 30', expired: 1, saved: 8 },
  { date: 'May 1', expired: 3, saved: 6 },
  { date: 'May 2', expired: 2, saved: 9 },
  { date: 'May 3', expired: 4, saved: 7 },
  { date: 'May 4', expired: 1, saved: 11 },
  { date: 'May 5', expired: 2, saved: 10 },
  { date: 'May 6', expired: 0, saved: 13 }
];
