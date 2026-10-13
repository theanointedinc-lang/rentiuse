// Format currency utility for Nigerian Naira (₦)
export const formatNaira = (amount) => {
  if (amount === undefined || amount === null) return '₦0';
  return `₦${Number(amount).toLocaleString('en-NG')}`;
};

export const INITIAL_STORES = {}; // Starts clean as requested by user!

export const SAMPLE_CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "Spaces", label: "Productive Spaces" },
  { id: "Equipment", label: "Tools & Equipment" },
  { id: "Soundstages & Studios", label: "Studios & Soundstages" },
  { id: "Co-working & Desks", label: "Coworking & Workstations" },
  { id: "Cinema & Video Gear", label: "Cinema & Camera Rigs" },
  { id: "Power Tools & Heavy Gear", label: "Power Tools & Machinery" }
];

export const SAMPLE_COLLECTIONS = [
  "Main Collection",
  "Premium Soundstages & Studios",
  "Cinema & Camera Packages",
  "Power Tools & Heavy Equipment",
  "Coworking & Workstations",
  "Special Promotional Offers"
];

// PRE-MADE READY STORE THEMES (Shopify Online Store Themes)
export const PREMADE_THEMES = [
  {
    id: "horizon",
    name: "Horizon Pro",
    version: "v4.2.0",
    style: "Dark Cinema & Soundstages",
    description: "High-contrast dark layout with glowing neon accents. Perfect for film studios, camera packages, and creative spaces.",
    themeColor: "#6366f1",
    bgStyle: "dark_glass",
    bannerPreset: "/images/studio_space.jpg",
    previewMobileImage: "/images/studio_space.jpg",
    fontFamily: "Outfit",
    badge: "Official & Popular"
  },
  {
    id: "emerald",
    name: "Emerald Workspace",
    version: "v3.1.0",
    style: "Clean Mint & Coworking",
    description: "Fresh, clean design with emerald accents. Ideal for coworking desks, maker labs, and prototyping workstations.",
    themeColor: "#10b981",
    bgStyle: "emerald_clean",
    bannerPreset: "/images/coworking_space.jpg",
    previewMobileImage: "/images/coworking_space.jpg",
    fontFamily: "Plus Jakarta Sans",
    badge: "Featured Workspace"
  },
  {
    id: "solar",
    name: "Solar Industrial",
    version: "v2.8.0",
    style: "High Visibility Power & Heavy Tools",
    description: "Bold industrial amber aesthetics engineered for heavy tools, construction equipment, and workshop rentals.",
    themeColor: "#f59e0b",
    bgStyle: "amber_industrial",
    bannerPreset: "/images/heavy_tools.jpg",
    previewMobileImage: "/images/heavy_tools.jpg",
    fontFamily: "Outfit",
    badge: "Contractor Grade"
  },
  {
    id: "obsidian",
    name: "Obsidian Luxe",
    version: "v5.0.1",
    style: "Glassmorphism & Luxury Events",
    description: "Ultra-premium glassmorphism theme with deep purple lighting and showroom card layout for high-end spaces.",
    themeColor: "#8b5cf6",
    bgStyle: "purple_luxe",
    bannerPreset: "/images/cinema_camera_kit.jpg",
    previewMobileImage: "/images/cinema_camera_kit.jpg",
    fontFamily: "Plus Jakarta Sans",
    badge: "Premium VIP"
  }
];

export const MOCK_REVIEWS = [
  {
    id: "rev1",
    author: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "2 days ago",
    comment: "The soundstage lighting grid saved us hours during our commercial shot! David's team was extremely helpful and responsive."
  },
  {
    id: "rev2",
    author: "Jason Miller",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "1 week ago",
    comment: "RED V-Raptor package was in pristine condition with all batteries fully pre-charged. Will definitely rent again!"
  }
];

export const MOCK_SEED_STORE = {
  id: "store_david",
  slug: "david",
  name: "David's Pro Studio & Gear Vault",
  tagline: "Commercial Video Soundstage & 8K Cinema Rentals in Lagos",
  bio: "We offer top-tier video soundstages, Aputure lighting grids, and complete RED V-Raptor cinema packages for filmmakers and agencies.",
  ownerName: "David Vance",
  ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  bannerImage: "/images/studio_space.jpg",
  location: "Lagos, Nigeria",
  rating: 4.98,
  reviewCount: 48,
  verified: true,
  category: "Cinema & Studios",
  activeThemeId: "horizon",
  themeColor: "#6366f1",
  contactEmail: "david@vancefilms.ng",
  contactPhone: "+234 803 123 4567",
  workingHours: "Mon - Sat: 8:00 AM - 10:00 PM",
  policy: "Valid ID and security deposit required for high-end cinema equipment.",
  joinedDate: "Sep 2026",
  payoutAccount: "Access Bank (204****891)",
  listings: [
    {
      id: "item_david_1",
      title: "Aputure Softbox Soundstage & Cyclorama Studio",
      category: "Spaces",
      collection: "Premium Soundstages & Studios",
      type: "space",
      description: "1,800 sq ft white cyclorama soundstage featuring overhead truss with pre-rigged Aputure 600d Pro light boxes, 14ft ceiling height, client lounge, and makeup station.",
      hourlyRate: 45000,
      originalHourlyRate: 60000,
      dailyRate: 320000,
      originalDailyRate: 400000,
      securityDeposit: 100000,
      image: "/images/studio_space.jpg",
      location: "Ikeja, Lagos",
      rating: 4.99,
      reviews: 32,
      instantBook: true,
      specs: [
        "1,800 sq ft space with 14ft ceilings",
        "Seamless 3-wall white cyclorama",
        "Pre-rigged Aputure lighting grid",
        "Dedicated generator backup power"
      ],
      guidelines: [
        "No smoking or open flames",
        "Overtime billed at 1.5x hourly rate"
      ]
    },
    {
      id: "item_david_2",
      title: "RED V-Raptor 8K Cinema Camera Complete Package",
      category: "Equipment",
      collection: "Cinema & Camera Packages",
      type: "equipment",
      description: "Full production-ready RED V-Raptor 8K cinema camera package in heavy-duty Pelican case. Includes 5x Cine Prime Lenses, Teradek wireless transmitter, SmallHD monitor, and V-Mount batteries.",
      hourlyRate: 25000,
      originalHourlyRate: 35000,
      dailyRate: 180000,
      originalDailyRate: 230000,
      securityDeposit: 250000,
      image: "/images/cinema_camera_kit.jpg",
      location: "Lekki Phase 1, Lagos",
      rating: 4.96,
      reviews: 16,
      instantBook: true,
      specs: [
        "RED V-Raptor 8K VV Sensor",
        "5x Full Frame Cine Primes",
        "Teradek Wireless Video System",
        "4x 150Wh High-load V-Mount Batteries"
      ],
      guidelines: [
        "Deposit authorization required",
        "Return items repacked in original cases"
      ]
    }
  ]
};

export const INITIAL_USER_BOOKINGS = [];
