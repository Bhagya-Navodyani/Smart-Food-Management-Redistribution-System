// Mock Shops and Marketplace Products for Organization Shopping

export const SHOPS = [
  {
    id: 'shop-1',
    name: 'Green Valley Supermarket',
    ownerName: 'Samantha Perera',
    role: 'Shop Owner',
    verified: true,
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 142,
    address: '124 Galle Road, Colombo 03',
    city: 'Colombo',
    phone: '+94 77 123 4567',
    email: 'contact@greenvalleysuper.lk',
    openingHours: '08:00 AM - 09:00 PM',
    description: 'Premier fresh organic grocery store dedicated to reducing food waste by offering bulk discounts to registered relief organizations and community kitchens.',
    tags: ['Organic', 'Farm Fresh', 'Zero Waste Partner', 'Bulk Discounts'],
    totalDonatedKg: 1250,
    totalSales: 450
  },
  {
    id: 'shop-2',
    name: 'Sunnyside Bakery & Cafe',
    ownerName: 'David Miller',
    role: 'Bakery Owner',
    verified: true,
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewCount: 98,
    address: '88 Station Road, Bambalapitiya',
    city: 'Colombo',
    phone: '+94 71 987 6543',
    email: 'hello@sunnysidebakery.com',
    openingHours: '07:00 AM - 08:00 PM',
    description: 'Artisanal sourdough, pastries, and fresh baked breads made daily. Unsold evening stocks are offered at up to 60% discount for charitable food distribution.',
    tags: ['Artisan Bakery', 'Daily Fresh', 'Evening Surplus', 'Halal'],
    totalDonatedKg: 890,
    totalSales: 320
  },
  {
    id: 'shop-3',
    name: 'Fresh Harvest Grocers',
    ownerName: 'Robert Chen',
    role: 'Store Manager',
    verified: true,
    logo: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewCount: 215,
    address: '45 Kandy Road, Kiribathgoda',
    city: 'Gampaha',
    phone: '+94 33 221 4455',
    email: 'info@freshharvest.lk',
    openingHours: '08:30 AM - 09:30 PM',
    description: 'Direct farm-to-table produce market supplying fresh vegetables, fruits, and dairy products. We support community organizations with special wholesale rates.',
    tags: ['Farm Direct', 'Fresh Vegetables', 'Dairy', 'Community Partner'],
    totalDonatedKg: 2100,
    totalSales: 780
  },
  {
    id: 'shop-4',
    name: 'City Organic Provisions',
    ownerName: 'Anura Jayasinghe',
    role: 'Shop Owner',
    verified: true,
    logo: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 176,
    address: '12 Main Street, Negombo',
    city: 'Negombo',
    phone: '+94 31 445 6677',
    email: 'sales@cityorganic.lk',
    openingHours: '08:00 AM - 08:30 PM',
    description: 'Specializing in packaged grains, pulses, canned goods, and long-shelf-life essentials. Ideal supplier for emergency food relief packages and shelters.',
    tags: ['Grains & Pulses', 'Packaged Food', 'Relief Partner', 'High Quality'],
    totalDonatedKg: 1560,
    totalSales: 610
  },
  {
    id: 'shop-5',
    name: 'Daily Dairy & Pantry',
    ownerName: 'Maya Sharma',
    role: 'Store Director',
    verified: true,
    logo: 'https://images.unsplash.com/photo-1563636619-e910ef4a8b9b?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 84,
    address: '202 High Level Road, Nugegoda',
    city: 'Colombo',
    phone: '+94 76 554 3322',
    email: 'contact@dailydairy.lk',
    openingHours: '07:30 AM - 09:00 PM',
    description: 'Fresh pasteurized milk, cheese, yogurt, and daily essential pantry items directly sourced from local dairy cooperatives.',
    tags: ['Dairy Products', 'Fresh Milk', 'Cold Chain', 'Local Dairy'],
    totalDonatedKg: 640,
    totalSales: 290
  }
];

export const MARKETPLACE_PRODUCTS = [
  {
    id: 'prod-101',
    shopId: 'shop-1',
    shopName: 'Green Valley Supermarket',
    shopLogo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.9,
    shopAddress: 'Colombo 03',
    name: 'Organic Red Apples (1kg Bag)',
    category: 'Fruits',
    price: 450,
    originalPrice: 650,
    discount: 30,
    quantity: '15 bags in stock',
    unit: '1 kg',
    expiryDate: '2026-07-29',
    status: 'Near Expiry',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bccb?auto=format&fit=crop&q=80&w=600',
    description: 'Fresh crisp Fuji red apples, perfect for snacking or community lunch meal distribution. High vitamin C content.',
    rating: 4.8,
    reviews: 32,
    badge: '30% OFF'
  },
  {
    id: 'prod-102',
    shopId: 'shop-1',
    shopName: 'Green Valley Supermarket',
    shopLogo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.9,
    shopAddress: 'Colombo 03',
    name: 'Fresh Spinach & Salad Greens Crate',
    category: 'Vegetables',
    price: 320,
    originalPrice: 500,
    discount: 36,
    quantity: '10 crates in stock',
    unit: '2 kg crate',
    expiryDate: '2026-07-27',
    status: 'Near Expiry',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600',
    description: 'Farm-fresh hydroponic spinach leaves and mixed green leaves. Harvested yesterday, best consumed within 3 days.',
    rating: 4.7,
    reviews: 19,
    badge: '36% OFF'
  },
  {
    id: 'prod-103',
    shopId: 'shop-1',
    shopName: 'Green Valley Supermarket',
    shopLogo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.9,
    shopAddress: 'Colombo 03',
    name: 'Ripe Cavendish Bananas (Box)',
    category: 'Fruits',
    price: 280,
    originalPrice: 420,
    discount: 33,
    quantity: '18 boxes in stock',
    unit: '3 kg box',
    expiryDate: '2026-07-26',
    status: 'Near Expiry',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600',
    description: 'Sweet ripe bananas ready for immediate consumption, smoothie preparation, or baking banana bread in large volumes.',
    rating: 4.9,
    reviews: 45,
    badge: 'Best Seller'
  },
  {
    id: 'prod-201',
    shopId: 'shop-2',
    shopName: 'Sunnyside Bakery & Cafe',
    shopLogo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.8,
    shopAddress: 'Bambalapitiya',
    name: 'Artisan Whole Wheat Sourdough Loaf',
    category: 'Bakery',
    price: 350,
    originalPrice: 700,
    discount: 50,
    quantity: '20 loaves available',
    unit: '600g loaf',
    expiryDate: '2026-07-26',
    status: 'Near Expiry',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    description: 'Naturally fermented whole wheat sourdough bread. Baked fresh this morning, offered at half price for evening clearance.',
    rating: 4.9,
    reviews: 58,
    badge: '50% OFF'
  },
  {
    id: 'prod-202',
    shopId: 'shop-2',
    shopName: 'Sunnyside Bakery & Cafe',
    shopLogo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.8,
    shopAddress: 'Bambalapitiya',
    name: 'Assorted Butter Croissants & Danish (Pack of 6)',
    category: 'Bakery',
    price: 550,
    originalPrice: 1100,
    discount: 50,
    quantity: '12 packs in stock',
    unit: '6 pcs pack',
    expiryDate: '2026-07-26',
    status: 'Near Expiry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    description: 'Flaky French butter croissants and chocolate Danishes. Great treat for children shelters and morning breakfast distributions.',
    rating: 4.8,
    reviews: 27,
    badge: '50% OFF'
  },
  {
    id: 'prod-203',
    shopId: 'shop-2',
    shopName: 'Sunnyside Bakery & Cafe',
    shopLogo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.8,
    shopAddress: 'Bambalapitiya',
    name: 'Multigrain Sandwich Bread (Family Pack)',
    category: 'Bakery',
    price: 300,
    originalPrice: 480,
    discount: 37,
    quantity: '25 packs available',
    unit: '800g pack',
    expiryDate: '2026-07-28',
    status: 'Fresh',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600',
    description: 'Nutritious multigrain sliced bread enriched with chia seeds, flaxseeds, and oats. Excellent shelf life.',
    rating: 4.6,
    reviews: 14,
    badge: '37% OFF'
  },
  {
    id: 'prod-301',
    shopId: 'shop-3',
    shopName: 'Fresh Harvest Grocers',
    shopLogo: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.7,
    shopAddress: 'Kiribathgoda',
    name: 'Farm Fresh Tomatoes (5kg Sack)',
    category: 'Vegetables',
    price: 650,
    originalPrice: 1100,
    discount: 40,
    quantity: '30 sacks available',
    unit: '5 kg sack',
    expiryDate: '2026-07-30',
    status: 'Fresh',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600',
    description: 'Firm red cooking tomatoes sourced directly from Welimada farms. Ideal for large batch meal cooking and sauces.',
    rating: 4.7,
    reviews: 62,
    badge: '40% OFF'
  },
  {
    id: 'prod-302',
    shopId: 'shop-3',
    shopName: 'Fresh Harvest Grocers',
    shopLogo: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.7,
    shopAddress: 'Kiribathgoda',
    name: 'Organic Carrots & Potato Combo Pack',
    category: 'Vegetables',
    price: 720,
    originalPrice: 1050,
    discount: 31,
    quantity: '22 packs available',
    unit: '6 kg combo',
    expiryDate: '2026-08-04',
    status: 'Fresh',
    image: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&q=80&w=600',
    description: '3kg Nuwara Eliya sweet carrots + 3kg fresh potatoes. Essential staple combo for relief food packs.',
    rating: 4.9,
    reviews: 38,
    badge: 'Top Value'
  },
  {
    id: 'prod-303',
    shopId: 'shop-3',
    shopName: 'Fresh Harvest Grocers',
    shopLogo: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.7,
    shopAddress: 'Kiribathgoda',
    name: 'Fresh Sweet Oranges (Bag of 12)',
    category: 'Fruits',
    price: 580,
    originalPrice: 900,
    discount: 35,
    quantity: '14 bags in stock',
    unit: '12 pcs bag',
    expiryDate: '2026-08-01',
    status: 'Fresh',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600',
    description: 'Juicy vitamin-C rich citrus oranges. Great for fresh juice preparation or dessert fruit distribution.',
    rating: 4.8,
    reviews: 21,
    badge: '35% OFF'
  },
  {
    id: 'prod-401',
    shopId: 'shop-4',
    shopName: 'City Organic Provisions',
    shopLogo: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.9,
    shopAddress: 'Negombo',
    name: 'Premium White Rice (10kg Bag)',
    category: 'Groceries',
    price: 2100,
    originalPrice: 2800,
    discount: 25,
    quantity: '50 bags in stock',
    unit: '10 kg bag',
    expiryDate: '2027-01-15',
    status: 'Fresh',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    description: 'High-grade long grain samba white rice. Long shelf life, triple cleaned and sealed for institutional usage.',
    rating: 5.0,
    reviews: 110,
    badge: 'Bulk Offer'
  },
  {
    id: 'prod-402',
    shopId: 'shop-4',
    shopName: 'City Organic Provisions',
    shopLogo: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.9,
    shopAddress: 'Negombo',
    name: 'Red Dhal / Lentils (5kg Pack)',
    category: 'Groceries',
    price: 1450,
    originalPrice: 1900,
    discount: 23,
    quantity: '40 packs in stock',
    unit: '5 kg pack',
    expiryDate: '2026-12-20',
    status: 'Fresh',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=600',
    description: 'High protein red split lentils. Quick cooking staple protein source for community kitchens and dry ration care packages.',
    rating: 4.9,
    reviews: 74,
    badge: '23% OFF'
  },
  {
    id: 'prod-501',
    shopId: 'shop-5',
    shopName: 'Daily Dairy & Pantry',
    shopLogo: 'https://images.unsplash.com/photo-1563636619-e910ef4a8b9b?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.6,
    shopAddress: 'Nugegoda',
    name: 'Fresh Whole Pasteurized Milk (1L Bottle)',
    category: 'Dairy',
    price: 280,
    originalPrice: 380,
    discount: 26,
    quantity: '35 bottles in stock',
    unit: '1 Liter bottle',
    expiryDate: '2026-07-28',
    status: 'Near Expiry',
    image: 'https://images.unsplash.com/photo-1563636619-e910ef4a8b9b?auto=format&fit=crop&q=80&w=600',
    description: '100% pure farm milk chilled and pasteurized. Must be kept refrigerated between 2-4°C.',
    rating: 4.8,
    reviews: 41,
    badge: '26% OFF'
  },
  {
    id: 'prod-502',
    shopId: 'shop-5',
    shopName: 'Daily Dairy & Pantry',
    shopLogo: 'https://images.unsplash.com/photo-1563636619-e910ef4a8b9b?auto=format&fit=crop&w=150&q=80',
    shopRating: 4.6,
    shopAddress: 'Nugegoda',
    name: 'Natural Greek Yogurt Tubs (4 Pack)',
    category: 'Dairy',
    price: 480,
    originalPrice: 720,
    discount: 33,
    quantity: '20 packs in stock',
    unit: '4 x 150g tubs',
    expiryDate: '2026-07-30',
    status: 'Fresh',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    description: 'Probiotic-rich thick Greek style yogurt. Great nutrition for elder care homes and children center meal programs.',
    rating: 4.7,
    reviews: 29,
    badge: '33% OFF'
  }
];

// Helper Functions
export const getAllShops = () => SHOPS;

export const getShopById = (shopId) => {
  return SHOPS.find((s) => s.id === shopId) || SHOPS[0];
};

export const getAllMarketplaceItems = () => MARKETPLACE_PRODUCTS;

export const getItemsByShopId = (shopId) => {
  return MARKETPLACE_PRODUCTS.filter((item) => item.shopId === shopId);
};

// Wishlist Storage Helper
export const getWishlistStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('orgMarketplaceWishlist') || '[]');
  } catch {
    return [];
  }
};

export const toggleWishlistStorage = (productId) => {
  const current = getWishlistStorage();
  let updated;
  if (current.includes(productId)) {
    updated = current.filter((id) => id !== productId);
  } else {
    updated = [...current, productId];
  }
  localStorage.setItem('orgMarketplaceWishlist', JSON.stringify(updated));
  return updated;
};

// Cart Helper for Marketplace integration
export const addMarketplaceItemToCart = (product, qty = 1) => {
  try {
    const existingCart = JSON.parse(localStorage.getItem('orgCartItems') || '[]');
    const existingIndex = existingCart.findIndex((item) => item.id === product.id || item.name === product.name);
    
    let updatedCart;
    if (existingIndex >= 0) {
      updatedCart = [...existingCart];
      updatedCart[existingIndex].quantity += qty;
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          name: product.name,
          store: product.shopName,
          shopId: product.shopId,
          price: product.price,
          quantity: qty,
          image: product.image,
          unit: product.unit,
          category: product.category
        }
      ];
    }
    localStorage.setItem('orgCartItems', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    return updatedCart;
  } catch (err) {
    console.error("Error adding to cart:", err);
    return [];
  }
};
