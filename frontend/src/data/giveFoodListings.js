const STORAGE_KEY = 'give-food-listings';

export const defaultGiveFoodListings = [
  {
    id: 1,
    itemName: 'Fresh Organic Vegetables',
    category: 'VEGETABLES',
    quantity: 5,
    unit: 'kg',
    expiryDate: '2024-05-08',
    description: 'Mixed vegetables including carrots, broccoli, and spinach. Perfect for soups and salads.',
    pickupLocation: '123 Green Street, Downtown',
    availableFrom: '2024-05-05',
    availableUntil: '2024-05-08',
    preferredRecipient: 'any',
    status: 'available',
    views: 24,
    requests: 3,
    images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'],
    listedDate: '2024-05-01'
  },
  {
    id: 2,
    itemName: 'Artisan Bread Collection',
    category: 'BAKERY',
    quantity: 6,
    unit: 'pieces',
    expiryDate: '2024-05-06',
    description: 'Freshly baked sourdough, whole wheat, and rye bread. Still fresh and perfect for consumption.',
    pickupLocation: '456 Bakery Avenue, Midtown',
    availableFrom: '2024-05-04',
    availableUntil: '2024-05-06',
    preferredRecipient: 'organization',
    status: 'requested',
    views: 18,
    requests: 2,
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'],
    listedDate: '2024-05-02'
  },
  {
    id: 3,
    itemName: 'Mixed Fruits Basket',
    category: 'FRUITS',
    quantity: 3,
    unit: 'kg',
    expiryDate: '2024-05-07',
    description: 'Seasonal fruits including apples, oranges, and bananas. All ripe and ready to eat.',
    pickupLocation: '789 Fruit Lane, Uptown',
    availableFrom: '2024-05-05',
    availableUntil: '2024-05-07',
    preferredRecipient: 'individual',
    status: 'claimed',
    views: 31,
    requests: 5,
    images: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80'],
    listedDate: '2024-05-03'
  },
  {
    id: 4,
    itemName: 'Dairy Products Pack',
    category: 'DAIRY',
    quantity: 2,
    unit: 'liters',
    expiryDate: '2024-05-05',
    description: 'Fresh milk and artisanal cheese from local farms. High quality dairy products.',
    pickupLocation: '321 Dairy Road, Westside',
    availableFrom: '2024-05-04',
    availableUntil: '2024-05-05',
    preferredRecipient: 'seller',
    status: 'expired',
    views: 12,
    requests: 1,
    images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80'],
    listedDate: '2024-05-01'
  },
  {
    id: 5,
    itemName: 'Cooked Rice & Curry',
    category: 'COOKED FOOD',
    quantity: 10,
    unit: 'portions',
    expiryDate: '2024-05-09',
    description: 'Freshly cooked rice and vegetable curry from restaurant surplus. Hot and ready to serve.',
    pickupLocation: '555 Restaurant Row, Eastside',
    availableFrom: '2024-05-08',
    availableUntil: '2024-05-09',
    preferredRecipient: 'organization',
    status: 'available',
    views: 42,
    requests: 6,
    images: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80'],
    listedDate: '2024-05-04'
  },
  {
    id: 6,
    itemName: 'Packaged Cereal Boxes',
    category: 'PACKAGED',
    quantity: 8,
    unit: 'boxes',
    expiryDate: '2024-08-15',
    description: 'Unopened cereal boxes - corn flakes, oat rings, and granola. Long shelf life remaining.',
    pickupLocation: '777 Grocery Lane, Northside',
    availableFrom: '2024-05-05',
    availableUntil: '2024-08-15',
    preferredRecipient: 'any',
    status: 'available',
    views: 28,
    requests: 4,
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80'],
    listedDate: '2024-05-05'
  },
  {
    id: 7,
    itemName: 'Fresh Eggs Carton',
    category: 'DAIRY',
    quantity: 24,
    unit: 'eggs',
    expiryDate: '2024-05-12',
    description: 'Farm fresh organic eggs. Perfect condition, no cracks. Great for breakfast or baking.',
    pickupLocation: '999 Farm Road, Countryside',
    availableFrom: '2024-05-06',
    availableUntil: '2024-05-12',
    preferredRecipient: 'individual',
    status: 'requested',
    views: 35,
    requests: 3,
    images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80'],
    listedDate: '2024-05-06'
  },
  {
    id: 8,
    itemName: 'Lettuce & Greens Bundle',
    category: 'VEGETABLES',
    quantity: 2,
    unit: 'kg',
    expiryDate: '2024-05-10',
    description: 'Fresh romaine lettuce, kale, and mixed salad greens. Crisp and washed.',
    pickupLocation: '111 Health Street, Westside',
    availableFrom: '2024-05-07',
    availableUntil: '2024-05-10',
    preferredRecipient: 'seller',
    status: 'available',
    views: 19,
    requests: 2,
    images: ['https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=400&q=80'],
    listedDate: '2024-05-07'
  }
];

const cloneListings = (listings) => listings.map((listing) => ({ ...listing }));

export const getGiveFoodListings = () => {
  if (typeof window === 'undefined') {
    return cloneListings(defaultGiveFoodListings);
  }

  const storedListings = window.localStorage.getItem(STORAGE_KEY);

  if (!storedListings) {
    return cloneListings(defaultGiveFoodListings);
  }

  try {
    const parsedListings = JSON.parse(storedListings);
    if (Array.isArray(parsedListings)) {
      return parsedListings;
    }
  } catch (error) {
    return cloneListings(defaultGiveFoodListings);
  }

  return cloneListings(defaultGiveFoodListings);
};

export const saveGiveFoodListings = (listings) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
};

export const deleteGiveFoodListing = (listingId) => {
  const nextListings = getGiveFoodListings().filter((listing) => listing.id !== listingId);
  saveGiveFoodListings(nextListings);
  return nextListings;
};

export const updateGiveFoodListing = (listingId, updatedFields) => {
  const nextListings = getGiveFoodListings().map((listing) => (
    listing.id === listingId
      ? { ...listing, ...updatedFields }
      : listing
  ));

  saveGiveFoodListings(nextListings);
  return nextListings;
};