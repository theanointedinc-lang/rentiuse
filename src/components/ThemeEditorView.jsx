import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Monitor, 
  Smartphone, 
  Save, 
  Plus, 
  ChevronRight, 
  Sliders, 
  Eye, 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Sparkles, 
  Check, 
  Building2, 
  Wrench, 
  Tag, 
  ShoppingBag,
  Layers,
  Star,
  MapPin,
  CheckCircle2,
  Trash2,
  Percent,
  Upload,
  FolderPlus
} from 'lucide-react';
import { formatNaira, SAMPLE_COLLECTIONS } from '../data/mockData';

export default function ThemeEditorView({ 
  store, 
  theme, 
  onSaveStore, 
  onClose,
  onAddListing,
  onVisitStore
}) {
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [activeSection, setActiveSection] = useState('hero'); // 'announcement', 'header', 'hero', 'featured_collection', 'add_product'

  // Editable Theme & Store Settings
  const [announcementText, setAnnouncementText] = useState('Welcome to our store • All rentals insured up to ₦1M');
  const [storeName, setStoreName] = useState(store?.name || 'My Store');
  const [storeTagline, setStoreTagline] = useState(store?.tagline || 'Browse our latest spaces & gear');
  const [storeBio, setStoreBio] = useState(store?.bio || '');
  const [subdomainSlug, setSubdomainSlug] = useState(store?.slug || 'my-store');
  const [themeColor, setThemeColor] = useState(store?.themeColor || theme?.themeColor || '#6366f1');
  
  // Custom Banner Cover Image (Preset or Uploaded from device gallery)
  const [bannerImage, setBannerImage] = useState(store?.bannerImage || theme?.bannerPreset || '/images/studio_space.jpg');
  const [collectionHeaderImage, setCollectionHeaderImage] = useState('/images/coworking_space.jpg');
  const [selectedCollection, setSelectedCollection] = useState('Main Collection');

  // Add Product within Theme Editor
  const [newProductTitle, setNewProductTitle] = useState('');
  const [newProductHourlyRate, setNewProductHourlyRate] = useState(45000);
  const [newProductCompareHourlyRate, setNewProductCompareHourlyRate] = useState(60000);
  const [newProductDailyRate, setNewProductDailyRate] = useState(320000);
  const [newProductCompareDailyRate, setNewProductCompareDailyRate] = useState(400000);
  const [newProductType, setNewProductType] = useState('space');
  const [newProductImage, setNewProductImage] = useState('/images/studio_space.jpg');

  // File Inputs Refs
  const heroFileInputRef = useRef(null);
  const collectionFileInputRef = useRef(null);
  const productFileInputRef = useRef(null);

  // Gallery File Upload Handlers (converts image file from gallery to base64 Data URL)
  const handleHeroGalleryUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCollectionGalleryUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCollectionHeaderImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductGalleryUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProductImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSaveStore({
      ...store,
      name: storeName,
      tagline: storeTagline,
      bio: storeBio,
      slug: subdomainSlug,
      themeColor: themeColor,
      bannerImage: bannerImage,
      announcementText: announcementText
    });
    alert('🎉 Theme changes & store custom photos saved!');
  };

  const handleAddProductFromEditor = (e) => {
    e.preventDefault();
    if (!newProductTitle) return alert('Please enter product title');

    const item = {
      id: `item_${Date.now()}`,
      title: newProductTitle,
      type: newProductType,
      category: newProductType === 'space' ? 'Spaces' : 'Equipment',
      collection: selectedCollection,
      description: `Premier asset available for rent at ${storeName}. High grade specifications and flexible rates in ₦ Naira.`,
      hourlyRate: Number(newProductHourlyRate),
      originalHourlyRate: Number(newProductCompareHourlyRate) > Number(newProductHourlyRate) ? Number(newProductCompareHourlyRate) : null,
      dailyRate: Number(newProductDailyRate),
      originalDailyRate: Number(newProductCompareDailyRate) > Number(newProductCompareDailyRate) ? Number(newProductCompareDailyRate) : null,
      securityDeposit: 100000,
      image: newProductImage,
      location: store?.location || 'Lagos, Nigeria',
      rating: 5.0,
      reviews: 1,
      instantBook: true,
      specs: ['Verified technical specifications', '24/7 Power backup'],
      guidelines: ['Handle with care', 'Standard security deposit applies']
    };

    onAddListing(item);
    setNewProductTitle('');
    alert(`🎉 Product "${newProductTitle}" added to ${selectedCollection}!`);
  };

  const currentListings = store ? store.listings : [];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#090d16', color: 'white', display: 'flex', flexDirection: 'column' }}>
      
      {/* TOP CONTROL BAR */}
      <header style={{ height: '56px', background: '#111827', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <ArrowLeft size={18} /> Exit Editor
          </button>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-pill badge-emerald" style={{ fontSize: '0.72rem' }}>
              {theme?.name || 'Horizon'} Active
            </span>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Home page</span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '3px' }}>
          <button 
            onClick={() => setDeviceMode('desktop')}
            style={{ 
              background: deviceMode === 'desktop' ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: deviceMode === 'desktop' ? 'white' : '#94a3b8',
              border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem'
            }}
          >
            <Monitor size={15} /> Desktop
          </button>
          <button 
            onClick={() => setDeviceMode('mobile')}
            style={{ 
              background: deviceMode === 'mobile' ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: deviceMode === 'mobile' ? 'white' : '#94a3b8',
              border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem'
            }}
          >
            <Smartphone size={15} /> Mobile
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn-secondary" 
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            onClick={() => onVisitStore(subdomainSlug)}
          >
            Preview Subdomain (rentiuse.com/{subdomainSlug})
          </button>
          <button 
            className="btn-primary" 
            style={{ padding: '6px 20px', fontSize: '0.88rem', background: 'white', color: '#090d16', border: 'none', fontWeight: 800 }}
            onClick={handleSave}
          >
            <Save size={15} /> Save & Publish
          </button>
        </div>
      </header>

      {/* WORKSPACE BODY */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* LEFT SECTION TREE & GALLERY IMAGE UPLOADER PANEL */}
        <aside style={{ width: '320px', background: '#0e1420', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="#818cf8" /> TEMPLATE SECTIONS
            </div>

            {/* SECTION ITEM 1: HERO BANNER */}
            <button 
              onClick={() => setActiveSection('hero')}
              style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 14px', borderRadius: '10px', border: 'none',
                background: activeSection === 'hero' ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.03)',
                color: activeSection === 'hero' ? 'white' : '#94a3b8', fontSize: '0.88rem', cursor: 'pointer', marginBottom: '8px',
                borderLeft: activeSection === 'hero' ? '4px solid #6366f1' : 'none', fontWeight: 600
              }}
            >
              <span>› Hero Banner</span>
              <ChevronRight size={14} />
            </button>

            {/* SECTION ITEM 2: FEATURED COLLECTION */}
            <button 
              onClick={() => setActiveSection('featured_collection')}
              style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 14px', borderRadius: '10px', border: 'none',
                background: activeSection === 'featured_collection' ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.03)',
                color: activeSection === 'featured_collection' ? 'white' : '#94a3b8', fontSize: '0.88rem', cursor: 'pointer', marginBottom: '8px',
                borderLeft: activeSection === 'featured_collection' ? '4px solid #10b981' : 'none', fontWeight: 600
              }}
            >
              <span>› Featured Collection</span>
              <ChevronRight size={14} />
            </button>

            {/* SECTION ITEM 3: ADD PRODUCT TO STORE */}
            <button 
              onClick={() => setActiveSection('add_product')}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 14px', borderRadius: '10px', border: 'none',
                background: activeSection === 'add_product' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.03)',
                color: '#fbbf24', fontSize: '0.88rem', cursor: 'pointer', fontWeight: 700,
                borderLeft: activeSection === 'add_product' ? '4px solid #f59e0b' : 'none'
              }}
            >
              <Plus size={16} /> + Add Product to Store
            </button>
          </div>

          {/* DYNAMIC SECTION CONTROLS & GALLERY FILE UPLOADER */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            
            {/* 1. HERO BANNER CONTROLS + GALLERY UPLOAD */}
            {activeSection === 'hero' && (
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#818cf8', fontWeight: 800, marginBottom: '12px' }}>
                  Edit Hero Banner
                </h4>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tagline</label>
                  <input type="text" className="form-input" value={storeTagline} onChange={(e) => setStoreTagline(e.target.value)} style={{ fontSize: '0.85rem' }} />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Brand Accent Color</label>
                  <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
                </div>

                {/* GALLERY FILE UPLOAD FOR HERO BANNER */}
                <div style={{ marginBottom: '16px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(99,102,241,0.4)', padding: '14px', borderRadius: '10px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'white', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                    Upload Hero Cover from Device Gallery
                  </label>

                  <input 
                    type="file" 
                    accept="image/*"
                    ref={heroFileInputRef} 
                    onChange={handleHeroGalleryUpload}
                    style={{ display: 'none' }}
                  />

                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.8rem', background: 'rgba(99,102,241,0.15)', borderColor: '#818cf8', color: '#a5b4fc' }}
                    onClick={() => heroFileInputRef.current && heroFileInputRef.current.click()}
                  >
                    <Upload size={14} /> Choose Image from Gallery
                  </button>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>Or pick background preset:</div>
                  <select className="form-select" value={bannerImage} onChange={(e) => setBannerImage(e.target.value)} style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                    <option value="/images/studio_space.jpg">Preset: Soundstage Cyclorama</option>
                    <option value="/images/cinema_camera_kit.jpg">Preset: RED 8K Camera Kit</option>
                    <option value="/images/coworking_space.jpg">Preset: Coworking Loft</option>
                    <option value="/images/heavy_tools.jpg">Preset: Milwaukee Power Tools</option>
                  </select>
                </div>
              </div>
            )}

            {/* 2. FEATURED COLLECTION CONTROLS + GALLERY UPLOAD */}
            {activeSection === 'featured_collection' && (
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 800, marginBottom: '12px' }}>
                  Edit Featured Collection
                </h4>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Target Collection</label>
                  <select className="form-select" value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)} style={{ fontSize: '0.82rem' }}>
                    {SAMPLE_COLLECTIONS.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                {/* GALLERY FILE UPLOAD FOR FEATURED COLLECTION */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(16,185,129,0.4)', padding: '14px', borderRadius: '10px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'white', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                    Upload Collection Header Image from Gallery
                  </label>

                  <input 
                    type="file" 
                    accept="image/*"
                    ref={collectionFileInputRef} 
                    onChange={handleCollectionGalleryUpload}
                    style={{ display: 'none' }}
                  />

                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.8rem', background: 'rgba(16,185,129,0.15)', borderColor: '#34d399', color: '#6ee7b7' }}
                    onClick={() => collectionFileInputRef.current && collectionFileInputRef.current.click()}
                  >
                    <Upload size={14} /> Select Gallery Photo
                  </button>
                </div>
              </div>
            )}

            {/* 3. ADD PRODUCT TO STORE CONTROLS + GALLERY UPLOAD */}
            {activeSection === 'add_product' && (
              <form onSubmit={handleAddProductFromEditor}>
                <h4 style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 800, marginBottom: '12px' }}>
                  + Add Product to Store
                </h4>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Listing Title</label>
                  <input type="text" className="form-input" placeholder="e.g. RED V-Raptor or Studio 1" value={newProductTitle} onChange={(e) => setNewProductTitle(e.target.value)} style={{ fontSize: '0.82rem' }} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Discounted ₦/hr</label>
                    <input type="number" className="form-input" value={newProductHourlyRate} onChange={(e) => setNewProductHourlyRate(e.target.value)} style={{ fontSize: '0.8rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#ef4444' }}>Original Compare ₦/hr</label>
                    <input type="number" className="form-input" value={newProductCompareHourlyRate} onChange={(e) => setNewProductCompareHourlyRate(e.target.value)} style={{ fontSize: '0.8rem' }} />
                  </div>
                </div>

                {/* GALLERY FILE UPLOAD FOR NEW PRODUCT */}
                <div style={{ marginBottom: '14px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(245,158,11,0.4)', padding: '12px', borderRadius: '10px' }}>
                  <label style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                    Product Image from Device Gallery
                  </label>

                  <input 
                    type="file" 
                    accept="image/*"
                    ref={productFileInputRef} 
                    onChange={handleProductGalleryUpload}
                    style={{ display: 'none' }}
                  />

                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '6px', fontSize: '0.78rem', background: 'rgba(245,158,11,0.15)', borderColor: '#fbbf24', color: '#fde68a' }}
                    onClick={() => productFileInputRef.current && productFileInputRef.current.click()}
                  >
                    <Upload size={13} /> Upload Photo from Device
                  </button>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.85rem' }}>
                  Publish Product (₦)
                </button>
              </form>
            )}

          </div>

        </aside>

        {/* RIGHT LIVE CANVAS PREVIEW */}
        <main style={{ flex: 1, padding: '24px', background: '#070913', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto' }}>
          
          <div style={{ 
            width: deviceMode === 'desktop' ? '100%' : '420px', 
            maxWidth: deviceMode === 'desktop' ? '1080px' : '420px',
            background: 'var(--bg-dark)', 
            border: '1px solid rgba(255,255,255,0.12)', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
            transition: 'width 0.3s ease'
          }}>
            
            {/* Announcement Bar */}
            <div style={{ background: themeColor, color: 'white', padding: '8px 16px', textAlign: 'center', fontSize: '0.82rem', fontWeight: 600 }}>
              {announcementText}
            </div>

            {/* Header */}
            <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', background: 'rgba(15,23,42,0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={22} color={themeColor} />
                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{storeName}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#818cf8', fontFamily: 'monospace' }}>
                rentiuse.com/{subdomainSlug}
              </div>
            </div>

            {/* Hero Cover (Live Canvas Render featuring gallery uploaded photo) */}
            <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
              <img src={bannerImage} alt={storeName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px', textAlign: 'center' }}>
                <span className="badge-pill badge-indigo" style={{ marginBottom: '10px' }}>Storefront Hero</span>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                  {storeName}
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#a5b4fc', marginBottom: '20px', maxWidth: '600px' }}>
                  {storeTagline}
                </p>
                <button className="btn-primary" style={{ background: themeColor, padding: '12px 28px' }}>
                  Browse Inventory (₦)
                </button>
              </div>
            </div>

            {/* Featured Collection Section */}
            <div style={{ padding: '36px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{selectedCollection}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Listed products & spaces with discount slash prices in Naira (₦)</p>
                </div>
              </div>

              {currentListings.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: deviceMode === 'desktop' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr', gap: '20px' }}>
                  {currentListings.map(item => (
                    <div key={item.id} className="glass-panel" style={{ padding: '16px', borderRadius: '14px' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{formatNaira(item.hourlyRate)}/hr</span>
                        {item.originalHourlyRate && (
                          <span style={{ fontSize: '0.8rem', color: '#ef4444', textDecoration: 'line-through' }}>{formatNaira(item.originalHourlyRate)}</span>
                        )}
                      </div>
                      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.85rem', background: themeColor }}>Book Now</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <p>No products added yet. Use "+ Add Product to Store" on the left menu to populate this collection.</p>
                </div>
              )}
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
