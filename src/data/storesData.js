// Storage keys
export const STORAGE_KEY_STORES = 'rentiuse_stores';
export const STORAGE_KEY_CURRENT_USER = 'rentiuse_current_user';
export const STORAGE_KEY_ONBOARDING_DRAFT = 'rentiuse_onboarding_draft';

// Reserved platform routes that CANNOT be used as store slugs
export const RESERVED_STORE_SLUGS = [
  'admin',
  'owner',
  'account',
  'studios',
  'equipment',
  'about',
  'why-rentiuse',
  'contact',
  'search',
  'help',
  'terms',
  'privacy',
  'cancellation-policy',
  'login',
  'register',
  'api',
  'dashboard',
  'settings',
  'auth',
  'null',
  'undefined',
  'static',
  'assets',
  'pricing',
  'inventory',
  'bookings',
  'calendar',
  'earnings',
  'onboarding'
];

/**
 * Check if a slug is a reserved system route
 */
export const isSlugReserved = (slug) => {
  if (!slug) return true;
  return RESERVED_STORE_SLUGS.includes(slug.toLowerCase().trim());
};

/**
 * Get all registered stores from persistent client storage
 */
export const getStoredStores = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STORES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

/**
 * Get a specific store by slug
 */
export const getStoreBySlug = (slug) => {
  if (!slug) return null;
  const stores = getStoredStores();
  return stores[slug.toLowerCase().trim()] || null;
};

/**
 * Check if a slug is already taken by another store
 */
export const isSlugTaken = (slug, excludeSlug = null) => {
  if (!slug) return false;
  const clean = slug.toLowerCase().trim();
  if (isSlugReserved(clean)) return true;
  const stores = getStoredStores();
  if (excludeSlug && clean === excludeSlug.toLowerCase().trim()) return false;
  return Boolean(stores[clean]);
};

/**
 * Validate a candidate store slug
 */
export const validateSlug = (slug, currentSlug = null) => {
  if (!slug || !slug.trim()) {
    return { valid: false, message: 'Store slug is required' };
  }
  const clean = slug.toLowerCase().trim();
  if (clean.length < 3) {
    return { valid: false, message: 'Slug must be at least 3 characters long' };
  }
  if (clean.length > 40) {
    return { valid: false, message: 'Slug cannot exceed 40 characters' };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(clean)) {
    return { valid: false, message: 'Slug can only contain lowercase letters, numbers, and hyphens' };
  }
  if (isSlugReserved(clean)) {
    return { valid: false, message: `"${clean}" is a reserved system URL and cannot be used` };
  }
  if (isSlugTaken(clean, currentSlug)) {
    return { valid: false, message: `The URL handle "rentiuse.com/${clean}" is already taken` };
  }
  return { valid: true, message: `rentiuse.com/${clean} is available!` };
};

/**
 * Convert a store title to a valid slug candidate
 */
export const slugifyStoreName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Save or update a store
 */
export const saveStore = (storeData) => {
  try {
    const stores = getStoredStores();
    const slug = storeData.slug.toLowerCase().trim();
    
    const updatedStore = {
      ...storeData,
      slug,
      updatedAt: new Date().toISOString(),
      status: storeData.status || 'active', // 'active', 'pending_verification'
      rating: storeData.rating ?? null,
      reviewCount: storeData.reviewCount ?? 0
    };

    stores[slug] = updatedStore;
    localStorage.setItem(STORAGE_KEY_STORES, JSON.stringify(stores));
    
    // Also update current user's active storeSlug if matches
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email === storeData.contactEmail) {
      setCurrentUser({
        ...currentUser,
        storeSlug: slug,
        storeName: storeData.name
      });
    }

    window.dispatchEvent(new Event('rentiuse_stores_updated'));
    window.dispatchEvent(new Event('rentiuse_listings_updated'));
    return updatedStore;
  } catch (e) {
    console.error('Failed to save store:', e);
    return null;
  }
};

/**
 * Current user / owner session helpers
 */
export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    window.dispatchEvent(new Event('rentiuse_user_updated'));
  } catch (e) {}
};

export const logoutUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    window.dispatchEvent(new Event('rentiuse_user_updated'));
  } catch (e) {}
};

/**
 * Onboarding draft helpers (save and resume wizard)
 */
export const getOnboardingDraft = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ONBOARDING_DRAFT);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const saveOnboardingDraft = (draft) => {
  try {
    localStorage.setItem(STORAGE_KEY_ONBOARDING_DRAFT, JSON.stringify({
      ...draft,
      savedAt: new Date().toISOString()
    }));
  } catch (e) {}
};

export const clearOnboardingDraft = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_ONBOARDING_DRAFT);
  } catch (e) {}
};

/**
 * Get target route when user clicks "List Your Resources"
 */
export const getListYourResourcesPath = () => {
  const user = getCurrentUser();
  if (!user) {
    return '/register/owner';
  }
  // If user has a registered store, take them directly to their dashboard
  if (user.storeSlug) {
    return '/owner/dashboard';
  }
  // Otherwise resume onboarding wizard
  return '/owner/onboarding';
};
