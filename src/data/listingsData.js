// Currency formatting helper for Nigerian Naira (₦ NGN)
export const formatNaira = (amount) => {
  if (amount === undefined || amount === null || isNaN(Number(amount))) return '₦0';
  return `₦${Number(amount).toLocaleString('en-NG')}`;
};

// STORAGE KEYS
const STORAGE_KEY_LISTINGS = 'rentiuse_marketplace_listings';
const STORAGE_KEY_DEMO_ENABLED = 'rentiuse_demo_preview_enabled';

/**
 * OPTIONAL REFERENCE SAMPLES (For developer preview / design testing only)
 * These are NEVER published to the live marketplace by default.
 */
export const DEMO_PREVIEW_SAMPLES = [
  {
    id: "demo-studio-1",
    slug: "aputure-softbox-soundstage-lagos",
    title: "Aputure Softbox Soundstage & Cyclorama Studio",
    type: "studio",
    category: "video-production-spaces",
    categoryName: "Video Production Spaces",
    shortDescription: "1,800 sq ft white cyclorama soundstage with pre-rigged motorized lighting truss, 14ft clearance, and green room.",
    fullDescription: "Built specifically for high-end commercials, music videos, and fashion editorials, this soundstage in Ikeja features a seamless 3-wall white cyclorama. The ceiling offers a reinforced steel truss with pre-rigged lighting fixtures, DMX control board, acoustic perimeter walls, and generator backup power.",
    location: {
      address: "14 Commercial Avenue, Ikeja",
      area: "Ikeja",
      city: "Ikeja",
      state: "Lagos",
      country: "Nigeria"
    },
    pricing: {
      currency: "NGN",
      hourlyRate: 45000,
      dailyRate: 320000,
      securityDeposit: 80000,
      minimumBookingHours: 3
    },
    spacesCount: 2,
    operatingHours: "Monday – Saturday: 7:00 AM – 10:00 PM",
    rating: 4.98,
    reviewCount: 38,
    isFeatured: true,
    isRecent: true,
    status: "approved",
    isDemoPreview: true,
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: [
      "1,800 sq ft Seamless White Cyclorama (14ft high)",
      "Motorized lighting truss with DMX controller",
      "Soundproof generator backup",
      "VIP Client lounge & makeup vanity",
      "High-speed fiber WiFi"
    ],
    houseRules: [
      "No open flames or smoking inside the cyclorama",
      "Footwear protectors required on white curve",
      "Overtime billed at standard hourly rate"
    ],
    cancellationPolicy: "Flexible: Full refund if cancelled at least 48 hours before scheduled start time.",
    owner: {
      name: "David Vance",
      storeName: "David's Pro Studio & Gear Vault",
      storeSlug: "david",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      phone: "+234 803 123 4567",
      email: "david@vancefilms.ng",
      bio: "Commercial director and production equipment provider in Ikeja."
    }
  },
  {
    id: "demo-gear-1",
    slug: "red-v-raptor-8k-cinema-camera-package",
    title: "RED V-Raptor 8K VV Cinema Camera Complete Package",
    type: "equipment",
    category: "cameras",
    categoryName: "Cameras & Cinema Rigs",
    brand: "RED Digital Cinema",
    model: "V-Raptor 8K VV + RF Mount",
    condition: "Flawless",
    availableQuantity: 2,
    shortDescription: "Production-ready 8K VV flagship camera in Pelican 1510 with 5x Full-Frame Cine Primes, SmallHD monitor, and batteries.",
    fullDescription: "Complete cinema package ready for commercial, episodic, and feature film sets. Features the RED V-Raptor 8K VV sensor recording 8K REDCODE RAW up to 120 fps. Package includes 5x Cine Prime lenses, SmallHD monitor, V-mount cage, and wireless video transmitter.",
    location: {
      address: "Freedom Way, Lekki Phase 1",
      area: "Lekki Phase 1",
      city: "Lekki",
      state: "Lagos",
      country: "Nigeria"
    },
    pricing: {
      currency: "NGN",
      hourlyRate: 25000,
      dailyRate: 180000,
      securityDeposit: 250000,
      minimumBookingHours: 4,
      rentalUnit: "day"
    },
    collectionInfo: "Direct collection from Lekki Phase 1 vault or secure dispatch across Lagos.",
    rating: 4.96,
    reviewCount: 22,
    isFeatured: true,
    isRecent: true,
    status: "approved",
    isDemoPreview: true,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      "8K Large Format Sensor (40.96mm x 21.60mm)",
      "Dynamic range: 17+ stops in REDCODE RAW",
      "High speed: 8K up to 120fps, 4K up to 240fps"
    ],
    includedAccessories: [
      "5x Full-Frame Cine Primes (25, 35, 50, 75, 100mm)",
      "2x 2TB CFexpress Cards + Card Reader",
      "4x 150Wh V-Mount Batteries + Quad Charger"
    ],
    rentalRules: [
      "Security deposit authorization and photo ID / CAC verification required",
      "Gear inspected and verified upon collection and return"
    ],
    cancellationPolicy: "Strict: 48 hours notice required.",
    owner: {
      name: "David Vance",
      storeName: "David's Pro Studio & Gear Vault",
      storeSlug: "david",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      phone: "+234 803 123 4567",
      email: "david@vancefilms.ng",
      bio: "High-end cinema camera systems & grip rental in Lagos."
    }
  }
];

/**
 * Helper: Check if Demo Preview Mode is enabled
 */
export const isDemoPreviewEnabled = () => {
  try {
    return localStorage.getItem(STORAGE_KEY_DEMO_ENABLED) === 'true';
  } catch (e) {
    return false;
  }
};

/**
 * Toggle Demo Preview Mode for testing/evaluator purposes
 */
export const setDemoPreviewEnabled = (enabled) => {
  try {
    localStorage.setItem(STORAGE_KEY_DEMO_ENABLED, enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('rentiuse_listings_updated'));
  } catch (e) {}
};

/**
 * Get all stored listings (drafts, pending_approval, and approved)
 */
export const getStoredListings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_LISTINGS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

/**
 * Save listings to persistent client storage
 */
export const saveStoredListings = (listings) => {
  try {
    localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(listings));
    window.dispatchEvent(new Event('rentiuse_listings_updated'));
  } catch (e) {}
};

/**
 * Add a new listing submitted by an owner.
 * Can be saved as 'draft' or submitted as 'pending_approval'
 */
export const createListingSubmission = (listingData, isDraft = false) => {
  const current = getStoredListings();
  const slug = listingData.slug || listingData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const newListing = {
    ...listingData,
    id: listingData.id || `listing_${Date.now()}`,
    slug: listingData.slug || `${slug}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: isDraft ? 'draft' : 'pending_approval', // Draft or awaiting admin approval
    createdAt: listingData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: null,
    reviewCount: 0
  };

  saveStoredListings([newListing, ...current]);
  return newListing;
};

/**
 * Update an existing listing
 */
export const updateStoredListing = (listingId, updatedData) => {
  const current = getStoredListings();
  const updated = current.map(item => {
    if (item.id === listingId) {
      return {
        ...item,
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
    }
    return item;
  });
  saveStoredListings(updated);
};

/**
 * Submit an existing draft listing for admin approval
 */
export const submitDraftForApproval = (listingId) => {
  setListingApprovalStatus(listingId, 'pending_approval');
};

/**
 * Get all listings for a specific owner store slug (including drafts and pending)
 */
export const getOwnerListings = (storeSlug) => {
  if (!storeSlug) return [];
  const stored = getStoredListings();
  return stored.filter(item => 
    item.owner?.storeSlug === storeSlug || 
    item.ownerStore?.slug === storeSlug
  );
};

/**
 * Admin action: Approve or reject a listing
 */
export const setListingApprovalStatus = (listingId, newStatus) => {
  const current = getStoredListings();
  const updated = current.map(item => {
    if (item.id === listingId) {
      return { 
        ...item, 
        status: newStatus, 
        approvedAt: newStatus === 'approved' ? new Date().toISOString() : null,
        reviewedAt: new Date().toISOString()
      };
    }
    return item;
  });
  saveStoredListings(updated);
};

/**
 * Admin action: Delete a listing
 */
export const deleteStoredListing = (listingId) => {
  const current = getStoredListings();
  const updated = current.filter(item => item.id !== listingId);
  saveStoredListings(updated);
};

/**
 * Reset marketplace back to pristine empty launch state
 */
export const resetListingsToCleanState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_LISTINGS);
    localStorage.removeItem(STORAGE_KEY_DEMO_ENABLED);
    window.dispatchEvent(new Event('rentiuse_listings_updated'));
  } catch (e) {}
};

/**
 * Get all APPROVED listings that are eligible to appear publicly on the marketplace.
 * By default, starts EMPTY at launch!
 */
export const getAllListings = () => {
  const stored = getStoredListings();
  const approved = stored.filter(item => item.status === 'approved');

  // If developer preview mode is explicitly toggled ON, include demo samples with clear badge
  if (isDemoPreviewEnabled()) {
    return [...approved, ...DEMO_PREVIEW_SAMPLES];
  }

  return approved;
};

// Filtered Queries
export const getStudios = () => getAllListings().filter(item => item.type === 'studio');
export const getEquipment = () => getAllListings().filter(item => item.type === 'equipment');
export const getListingBySlug = (slug) => {
  const all = getAllListings();
  const match = all.find(item => item.slug === slug);
  if (match) return match;

  // Also check demo preview if enabled
  if (isDemoPreviewEnabled()) {
    return DEMO_PREVIEW_SAMPLES.find(item => item.slug === slug);
  }
  return null;
};
export const getFeaturedListings = () => getAllListings().filter(item => item.isFeatured);
export const getRecentlyAddedListings = () => getAllListings().filter(item => item.isRecent);
export const getRelatedListings = (currentListing, limit = 3) => {
  return getAllListings().filter(item => 
    item.id !== currentListing.id && 
    (item.category === currentListing.category || item.type === currentListing.type)
  ).slice(0, limit);
};
