export const STUDIO_CATEGORIES = [
  {
    id: "photography-studios",
    slug: "photography-studios",
    name: "Photography Studios",
    type: "studio",
    tagline: "Daylight lofts, cyclorama soundstages, and high-fashion backdrops",
    icon: "Camera",
    count: "18+ spaces in Lagos & Abuja",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "podcast-studios",
    slug: "podcast-studios",
    name: "Podcast Studios",
    type: "studio",
    tagline: "Acoustically treated multi-mic suites with 4K multi-cam switching",
    icon: "Mic",
    count: "12+ suites available",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "video-production-spaces",
    slug: "video-production-spaces",
    name: "Video Production Spaces",
    type: "studio",
    tagline: "Large soundstages, green screen infinity walls, and commercial sets",
    icon: "Video",
    count: "9+ soundstages available",
    image: "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "meeting-spaces",
    slug: "meeting-spaces",
    name: "Meeting Spaces",
    type: "studio",
    tagline: "Private boardrooms, creative workshop rooms, and screening spaces",
    icon: "Users",
    count: "15+ rooms across Nigeria",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  }
];

export const EQUIPMENT_CATEGORIES = [
  {
    id: "cameras",
    slug: "cameras",
    name: "Cameras & Cinema Rigs",
    type: "equipment",
    tagline: "Full-frame cinema cameras, cine primes, and digital mirrorless bodies",
    icon: "Aperture",
    count: "35+ packages ready",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lighting-equipment",
    slug: "lighting-equipment",
    name: "Lighting Equipment",
    type: "equipment",
    tagline: "Aputure COB lights, Nanlite tubes, strobe generators, and C-stands",
    icon: "Zap",
    count: "40+ lighting kits",
    image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "audio-equipment",
    slug: "audio-equipment",
    name: "Audio Equipment",
    type: "equipment",
    tagline: "Broadcast shotgun mics, wireless lavaliers, and multichannel field recorders",
    icon: "Headphones",
    count: "24+ audio packages",
    image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80"
  }
];

export const ALL_CATEGORIES = [...STUDIO_CATEGORIES, ...EQUIPMENT_CATEGORIES];
