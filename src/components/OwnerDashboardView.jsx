import React, { useState, useRef } from 'react';
import { 
  Store, 
  Globe, 
  PlusCircle, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  Trash2, 
  Building2, 
  Wrench, 
  Check, 
  AlertCircle, 
  Tag, 
  Percent, 
  Search, 
  Grid, 
  Layers, 
  Settings, 
  User, 
  ShieldCheck, 
  ChevronRight,
  Sliders,
  FolderKanban,
  Zap,
  Lock,
  Palette,
  Eye,
  Smartphone,
  Monitor,
  MoreHorizontal,
  Edit,
  Sparkles,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Flame,
  FileText,
  Upload,
  ArrowRight,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Bot,
  Copy,
  CreditCard,
  Layout,
  Mic,
  Share2,
  Clock,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react';
import { formatNaira, SAMPLE_COLLECTIONS, PREMADE_THEMES } from '../data/mockData';
import ThemeEditorView from './ThemeEditorView';

export default function OwnerDashboardView({ 
  userStores, 
  activeStore, 
  setActiveStoreSlug, 
  onUpdateStore, 
  onAddListing, 
  onDeleteListing, 
  onVisitStore,
  onOpenCreateStore
}) {
  const [activeSidebarNav, setActiveSidebarNav] = useState('online_store');
  const [productsSubNav, setProductsSubNav] = useState('all'); // 'all', 'spaces', 'equipment', 'products', 'collections'
  const [onlineStoreSubNav, setOnlineStoreSubNav] = useState('themes');
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [productSearchQuery, setProductSearchQuery] = useState('');

  // Selected managed store
  const storeKeys = Object.keys(userStores);
  const [selectedManageStoreSlug, setSelectedManageStoreSlug] = useState(
    activeStore ? activeStore.slug : (storeKeys[0] || null)
  );

  React.useEffect(() => {
    if (activeStore && activeStore.slug !== selectedManageStoreSlug) {
      setSelectedManageStoreSlug(activeStore.slug);
    } else if ((!selectedManageStoreSlug || !userStores[selectedManageStoreSlug]) && storeKeys.length > 0) {
      setSelectedManageStoreSlug(storeKeys[0]);
    }
  }, [activeStore, userStores]);

  const currentManagedStore = userStores[selectedManageStoreSlug] || activeStore || (storeKeys[0] ? userStores[storeKeys[0]] : null);

  // Active Theme state
  const [activeThemeId, setActiveThemeId] = useState(
    currentManagedStore?.activeThemeId || 'horizon'
  );
  const currentTheme = PREMADE_THEMES.find(t => t.id === activeThemeId) || PREMADE_THEMES[0];

  // Full Screen Live Visual Theme Editor State
  const [isLiveThemeEditorOpen, setIsLiveThemeEditorOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState(currentTheme);

  // Add Product / Space / Equipment Form Drawer State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productType, setProductType] = useState('space'); // 'space', 'equipment', 'product'
  const [productCategory, setProductCategory] = useState('Spaces');
  const [productCollection, setProductCollection] = useState('Main Collection');
  const [productDesc, setProductDesc] = useState('');
  
  // Pricing in Naira (₦)
  const [productHourlyRate, setProductHourlyRate] = useState(45000);
  const [productCompareHourlyRate, setProductCompareHourlyRate] = useState(60000);
  const [productDailyRate, setProductDailyRate] = useState(320000);
  const [productCompareDailyRate, setProductCompareDailyRate] = useState(400000);
  const [productDeposit, setProductDeposit] = useState(100000);
  const [productImage, setProductImage] = useState('/images/studio_space.jpg');
  const [productLocation, setProductLocation] = useState('Lagos, Nigeria');
  const [productSpecs, setProductSpecs] = useState('24/7 Generator backup\nHigh speed fiber internet');

  // Custom Collections State
  const [collectionsList, setCollectionsList] = useState([
    'Main Collection',
    'Soundstages & Studios',
    'Camera & Lens Vault',
    'Coworking & Desks',
    'Heavy Power & Tools'
  ]);
  const [newCollectionInput, setNewCollectionInput] = useState('');

  // Store Settings Form State
  const [settingsStoreName, setSettingsStoreName] = useState(currentManagedStore?.name || 'My Rental Store');
  const [settingsTagline, setSettingsTagline] = useState(currentManagedStore?.tagline || 'Premier spaces & tools for rent in Nigeria');
  const [settingsSlug, setSettingsSlug] = useState(currentManagedStore?.slug || 'my-store');
  const [settingsBankName, setSettingsBankName] = useState('Access Bank Nigeria');
  const [settingsAccountNumber, setSettingsAccountNumber] = useState('0123456789');
  const [settingsAccountName, setSettingsAccountName] = useState('RENTAL BUSINESS LTD');
  const [settingsCacNumber, setSettingsCacNumber] = useState('RC-1849204');
  const [settingsPhone, setSettingsPhone] = useState('+234 803 123 4567');

  // Local Bookings List state for Orders view
  const [dashboardBookings, setDashboardBookings] = useState([
    {
      id: 'BK-9021',
      itemTitle: 'Soundstage Studio A - Cyclorama',
      clientName: 'Funke Akindele (SceneOne TV)',
      clientEmail: 'funke@sceneone.ng',
      clientPhone: '+234 802 999 1122',
      duration: '2 Full Days',
      dates: 'Oct 14 - Oct 16, 2026',
      totalNaira: 640000,
      status: 'Confirmed',
      payoutStatus: 'Escrowed (Auto-release on check-in)'
    },
    {
      id: 'BK-8940',
      itemTitle: 'RED V-Raptor 8K Camera Package',
      clientName: 'Kemi Adetiba Studios',
      clientEmail: 'kemi@kingofboys.com',
      clientPhone: '+234 809 444 8811',
      duration: '1 Day Rental',
      dates: 'Oct 18, 2026',
      totalNaira: 320000,
      status: 'Pending Approval',
      payoutStatus: 'Pending Client Transfer'
    },
    {
      id: 'BK-7712',
      itemTitle: 'Lekki Executive Coworking Desk',
      clientName: 'Tunde Afolayan',
      clientEmail: 'tunde@afolayanmedia.com',
      clientPhone: '+234 813 555 7722',
      duration: '5 Hours',
      dates: 'Sep 22, 2026',
      totalNaira: 22500,
      status: 'Completed',
      payoutStatus: 'Paid to Bank (Ref: NGN-84920)'
    }
  ]);

  // File Input Ref for Device Gallery Upload
  const fileInputRef = useRef(null);

  // Gallery Upload Handler for Product Form
  const handleProductGalleryUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiPromptSubmit = (e) => {
    e.preventDefault();
    if (!aiPromptInput) return;
    setProductTitle(aiPromptInput);
    setAiPromptInput('');
    setIsAddProductOpen(true);
  };

  const openAddFormWithType = (type) => {
    setProductType(type);
    if (type === 'space') {
      setProductCategory('Spaces');
      setProductImage('/images/studio_space.jpg');
      setProductSpecs('24/7 Generator backup\nHigh speed fiber internet\nAir conditioning & Soundproofing');
    } else if (type === 'equipment') {
      setProductCategory('Equipment');
      setProductImage('/images/cinema_camera_kit.jpg');
      setProductSpecs('Includes flight case & accessories\nInsured replacement value ₦5,000,000');
    } else {
      setProductCategory('Products');
      setProductImage('/images/heavy_tools.jpg');
      setProductSpecs('Heavy duty industrial grade\nStandard safety gear included');
    }
    setIsAddProductOpen(true);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!productTitle) return alert('Please enter title');
    if (!currentManagedStore) return alert('Please create or select a store first');

    const item = {
      id: `item_${Date.now()}`,
      title: productTitle,
      type: productType,
      category: productCategory,
      collection: productCollection,
      description: productDesc || `High quality ${productType === 'space' ? 'Space' : productType === 'equipment' ? 'Equipment' : 'Product'} available for instant rental booking on RENTIUSE.`,
      hourlyRate: Number(productHourlyRate),
      originalHourlyRate: Number(productCompareHourlyRate) > Number(productHourlyRate) ? Number(productCompareHourlyRate) : null,
      dailyRate: Number(productDailyRate),
      originalDailyRate: Number(productCompareDailyRate) > Number(productDailyRate) ? Number(productCompareDailyRate) : null,
      securityDeposit: Number(productDeposit),
      image: productImage,
      location: productLocation,
      rating: 5.0,
      reviews: 1,
      instantBook: true,
      specs: productSpecs.split('\n').filter(Boolean),
      guidelines: ['Handle with care', 'Standard security deposit applies']
    };

    onAddListing(item);
    setIsAddProductOpen(false);
    setProductTitle('');
    setProductDesc('');
    alert(`🎉 "${productTitle}" published under ${productCategory} in ${productCollection}!`);
  };

  const handleAddCollectionSubmit = (e) => {
    e.preventDefault();
    if (!newCollectionInput.trim()) return;
    if (!collectionsList.includes(newCollectionInput.trim())) {
      setCollectionsList(prev => [...prev, newCollectionInput.trim()]);
      setProductCollection(newCollectionInput.trim());
    }
    setNewCollectionInput('');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (!currentManagedStore) return alert('No store selected');
    onUpdateStore({
      ...currentManagedStore,
      name: settingsStoreName,
      tagline: settingsTagline,
      slug: settingsSlug
    });
    alert('🎉 Store profile & payout settings updated successfully!');
  };

  const currentListings = currentManagedStore ? currentManagedStore.listings : [];

  // Filter listings based on selected subNav and search query
  const filteredListings = currentListings.filter(item => {
    const matchesSearch = !productSearchQuery || item.title.toLowerCase().includes(productSearchQuery.toLowerCase());
    if (productsSubNav === 'spaces') {
      return matchesSearch && (item.type === 'space' || item.category === 'Spaces');
    }
    if (productsSubNav === 'equipment') {
      return matchesSearch && (item.type === 'equipment' || item.category === 'Equipment');
    }
    if (productsSubNav === 'products') {
      return matchesSearch && (item.type === 'product' || item.category === 'Products' || item.category === 'Tools');
    }
    return matchesSearch;
  });

  const spaceCount = currentListings.filter(i => i.type === 'space' || i.category === 'Spaces').length;
  const equipmentCount = currentListings.filter(i => i.type === 'equipment' || i.category === 'Equipment').length;
  const productCount = currentListings.filter(i => i.type === 'product' || i.category === 'Products' || i.category === 'Tools').length;

  const nigerianBanks = [
    'Access Bank Nigeria',
    'Guaranty Trust Bank (GTBank)',
    'Zenith Bank',
    'Kuda Microfinance Bank',
    'Moniepoint Microfinance Bank',
    'OPay Digital Services',
    'First Bank of Nigeria',
    'United Bank for Africa (UBA)',
    'Stanbic IBTC Bank',
    'Sterling Bank',
    'Wema Bank / ALAT',
    'Fidelity Bank Nigeria'
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#0f131c', color: 'white', display: 'flex' }}>
      
      {/* LEFT SIDEBAR */}
      <aside style={{ width: '250px', background: '#090c14', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
        <div>
          
          {/* Store Switcher Dropdown */}
          <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              Active Merchant Store
            </div>
            {storeKeys.length > 0 ? (
              <select 
                value={selectedManageStoreSlug || ''} 
                onChange={(e) => {
                  setSelectedManageStoreSlug(e.target.value);
                  setActiveStoreSlug(e.target.value);
                }}
                style={{ 
                  width: '100%', background: '#161d2a', border: '1px solid rgba(255,255,255,0.12)', color: 'white', 
                  padding: '8px 12px', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' 
                }}
              >
                {Object.values(userStores).map(s => (
                  <option key={s.slug} value={s.slug}>{s.name} ({s.slug})</option>
                ))}
              </select>
            ) : (
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '8px' }} onClick={onOpenCreateStore}>
                + Create First Store
              </button>
            )}
          </div>

          {/* MAIN SIDEBAR NAVIGATION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
            
            {/* 1. HOME */}
            <button 
              onClick={() => setActiveSidebarNav('home')}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', border: 'none',
                background: activeSidebarNav === 'home' ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: activeSidebarNav === 'home' ? 'white' : '#94a3b8', fontWeight: activeSidebarNav === 'home' ? 700 : 500, fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left'
              }}
            >
              <Building2 size={17} color={activeSidebarNav === 'home' ? '#818cf8' : 'currentColor'} /> Home
            </button>

            {/* 2. ORDERS & BOOKINGS */}
            <button 
              onClick={() => setActiveSidebarNav('orders')}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', border: 'none',
                background: activeSidebarNav === 'orders' ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: activeSidebarNav === 'orders' ? 'white' : '#94a3b8', fontWeight: activeSidebarNav === 'orders' ? 700 : 500, fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left'
              }}
            >
              <ShoppingBag size={17} color={activeSidebarNav === 'orders' ? '#818cf8' : 'currentColor'} /> Orders & Bookings
            </button>

            {/* 3. PRODUCTS & INVENTORY (SPACES, EQUIPMENT, PRODUCTS) */}
            <div>
              <button 
                onClick={() => {
                  setActiveSidebarNav('products');
                  setProductsSubNav('all');
                }}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 12px', borderRadius: '8px', border: 'none',
                  background: activeSidebarNav === 'products' ? 'rgba(99,102,241,0.2)' : 'transparent',
                  color: activeSidebarNav === 'products' ? 'white' : '#94a3b8', fontWeight: activeSidebarNav === 'products' ? 700 : 500, fontSize: '0.9rem', cursor: 'pointer'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Tag size={18} color={activeSidebarNav === 'products' ? '#818cf8' : 'currentColor'} />
                  Products & Assets
                </span>
                <ChevronRight size={14} color="#64748b" />
              </button>

              {activeSidebarNav === 'products' && (
                <div style={{ paddingLeft: '32px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button 
                    onClick={() => setProductsSubNav('all')} 
                    style={{ background: 'none', border: 'none', color: productsSubNav === 'all' ? '#818cf8' : '#94a3b8', fontWeight: productsSubNav === 'all' ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}
                  >
                    • All Inventory ({currentListings.length})
                  </button>
                  <button 
                    onClick={() => setProductsSubNav('spaces')} 
                    style={{ background: 'none', border: 'none', color: productsSubNav === 'spaces' ? '#10b981' : '#94a3b8', fontWeight: productsSubNav === 'spaces' ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}
                  >
                    • 🏢 Space Rentals ({spaceCount})
                  </button>
                  <button 
                    onClick={() => setProductsSubNav('equipment')} 
                    style={{ background: 'none', border: 'none', color: productsSubNav === 'equipment' ? '#818cf8' : '#94a3b8', fontWeight: productsSubNav === 'equipment' ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}
                  >
                    • 🛠️ Equipment Rentals ({equipmentCount})
                  </button>
                  <button 
                    onClick={() => setProductsSubNav('products')} 
                    style={{ background: 'none', border: 'none', color: productsSubNav === 'products' ? '#fbbf24' : '#94a3b8', fontWeight: productsSubNav === 'products' ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}
                  >
                    • 📦 General Products ({productCount})
                  </button>
                  <button 
                    onClick={() => setProductsSubNav('collections')} 
                    style={{ background: 'none', border: 'none', color: productsSubNav === 'collections' ? '#818cf8' : '#94a3b8', fontWeight: productsSubNav === 'collections' ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}
                  >
                    • 📂 Collections
                  </button>
                </div>
              )}
            </div>

            {/* 4. CUSTOMERS */}
            <button 
              onClick={() => setActiveSidebarNav('customers')} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', border: 'none', 
                background: activeSidebarNav === 'customers' ? 'rgba(99,102,241,0.2)' : 'transparent', 
                color: activeSidebarNav === 'customers' ? 'white' : '#94a3b8', fontWeight: activeSidebarNav === 'customers' ? 700 : 500, fontSize: '0.88rem', cursor: 'pointer' 
              }}
            >
              <Users size={17} color={activeSidebarNav === 'customers' ? '#818cf8' : 'currentColor'} /> Customers
            </button>

            {/* 5. ANALYTICS (₦) */}
            <button 
              onClick={() => setActiveSidebarNav('analytics')} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', border: 'none', 
                background: activeSidebarNav === 'analytics' ? 'rgba(99,102,241,0.2)' : 'transparent', 
                color: activeSidebarNav === 'analytics' ? 'white' : '#94a3b8', fontWeight: activeSidebarNav === 'analytics' ? 700 : 500, fontSize: '0.88rem', cursor: 'pointer' 
              }}
            >
              <BarChart3 size={17} color={activeSidebarNav === 'analytics' ? '#818cf8' : 'currentColor'} /> Analytics (₦)
            </button>
          </div>

          <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, paddingLeft: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>
            Sales Channels
          </div>

          {/* 6. ONLINE STORE */}
          <div style={{ marginBottom: '16px' }}>
            <button 
              onClick={() => {
                setActiveSidebarNav('online_store');
                setOnlineStoreSubNav('themes');
              }}
              style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 12px', borderRadius: '8px', border: 'none',
                background: activeSidebarNav === 'online_store' ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: activeSidebarNav === 'online_store' ? 'white' : '#94a3b8', fontWeight: activeSidebarNav === 'online_store' ? 700 : 500, fontSize: '0.9rem', cursor: 'pointer'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Store size={18} color={activeSidebarNav === 'online_store' ? '#818cf8' : 'currentColor'} />
                Online Store
              </span>
              <ChevronRight size={14} color="#64748b" />
            </button>

            {activeSidebarNav === 'online_store' && (
              <div style={{ paddingLeft: '32px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button 
                  onClick={() => setOnlineStoreSubNav('themes')} 
                  style={{ background: 'none', border: 'none', color: onlineStoreSubNav === 'themes' ? '#818cf8' : '#94a3b8', fontWeight: onlineStoreSubNav === 'themes' ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}
                >
                  • Themes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 7. SETTINGS */}
        <div>
          <button 
            onClick={() => setActiveSidebarNav('settings')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', borderRadius: '8px', border: 'none', 
              background: activeSidebarNav === 'settings' ? 'rgba(99,102,241,0.2)' : 'transparent', 
              color: activeSidebarNav === 'settings' ? 'white' : '#94a3b8', fontWeight: activeSidebarNav === 'settings' ? 700 : 500, fontSize: '0.88rem', cursor: 'pointer' 
            }}
          >
            <Settings size={18} color={activeSidebarNav === 'settings' ? '#818cf8' : 'currentColor'} /> Settings
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        
        {/* VIEW 1: HOME DASHBOARD */}
        {activeSidebarNav === 'home' && (
          <div className="animate-fade-in" style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '580px', margin: '0 auto 32px', background: '#131926', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '18px', padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ background: '#1e293b', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
                  {currentManagedStore ? currentManagedStore.name.toLowerCase().replace(/[^a-z0-9]/g, '') : 'my-store'}
                </span>
                <div style={{ flex: 1, background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '4px 12px', fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                  {currentManagedStore ? `rentiuse.com/${currentManagedStore.slug}` : 'rentiuse.com/yourbrand'}
                </div>
                {currentManagedStore && (
                  <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => onVisitStore(currentManagedStore.slug)}>
                    <ExternalLink size={12} /> Visit
                  </button>
                )}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '20px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700 }}>● Online Store Active</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Subdomain Routing & Nigerian Payouts Configured</div>
                </div>
                <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => setActiveSidebarNav('online_store')}>
                  Customize Theme
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '6px' }}>
                Welcome to <span style={{ color: 'white', fontWeight: 700 }}>{currentManagedStore ? currentManagedStore.name : 'RENTIUSE Store Manager'}</span>
              </div>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'white' }}>
                What do you want to work on next?
              </h1>
            </div>

            {/* AI Assistant Prompt Bar */}
            <form onSubmit={handleAiPromptSubmit} style={{ maxWidth: '640px', margin: '0 auto 48px' }}>
              <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(99,102,241,0.4)', background: 'rgba(15,23,42,0.9)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 800 }}>🤖</div>
                <input type="text" className="form-input" placeholder="Type a product, space, or equipment title..." value={aiPromptInput} onChange={(e) => setAiPromptInput(e.target.value)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '0.95rem', flex: 1 }} />
                <button type="submit" style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer' }}><Sparkles size={18} /></button>
              </div>
            </form>

            {/* Quick Action Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', textAlign: 'left' }}>
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <Building2 size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>List Space Rental</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>Add soundstages, studios, or coworking lofts.</p>
                <button className="btn-primary" style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', fontWeight: 700, fontSize: '0.85rem' }} onClick={() => openAddFormWithType('space')}>+ Add Space</button>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(99,102,241,0.3)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <Wrench size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>List Equipment Rental</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>Add cinema gear, lighting rigs, or power tools.</p>
                <button className="btn-primary" style={{ background: '#6366f1', color: 'white', border: 'none', padding: '8px 16px', fontWeight: 700, fontSize: '0.85rem' }} onClick={() => openAddFormWithType('equipment')}>+ Add Equipment</button>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(245,158,11,0.3)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <Package size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>Customize Store Theme</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>Pick a ready-made theme and publish to subdomain.</p>
                <button className="btn-secondary" style={{ padding: '8px 16px', fontWeight: 700, fontSize: '0.85rem' }} onClick={() => { setActiveSidebarNav('online_store'); setOnlineStoreSubNav('themes'); }}>Edit Theme</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ORDERS & BOOKINGS VIEW */}
        {activeSidebarNav === 'orders' && (
          <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Orders & Rental Bookings</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage incoming client reservations, verify payouts, and approve check-ins.</p>
              </div>
            </div>

            {/* STAT CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Rental Revenue</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '4px 0' }}>{formatNaira(982500)}</div>
                <div style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>Direct to Nigerian Bank</div>
              </div>
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confirmed Bookings</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', margin: '4px 0' }}>12</div>
                <div style={{ fontSize: '0.75rem', color: '#34d399' }}>● 3 In Progress Today</div>
              </div>
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Action</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', margin: '4px 0' }}>1</div>
                <div style={{ fontSize: '0.75rem', color: '#fbbf24' }}>Requires Host Approval</div>
              </div>
            </div>

            {/* ORDERS TABLE */}
            <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Recent Reservations</h3>
                <span className="badge-pill badge-indigo">{dashboardBookings.length} Active Requests</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                      <th style={{ padding: '14px 20px' }}>Booking ID</th>
                      <th style={{ padding: '14px 20px' }}>Product / Space</th>
                      <th style={{ padding: '14px 20px' }}>Client</th>
                      <th style={{ padding: '14px 20px' }}>Scheduled Date & Time</th>
                      <th style={{ padding: '14px 20px' }}>Total Amount</th>
                      <th style={{ padding: '14px 20px' }}>Status</th>
                      <th style={{ padding: '14px 20px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardBookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '16px 20px', fontFamily: 'monospace', fontWeight: 700, color: '#818cf8' }}>{b.id}</td>
                        <td style={{ padding: '16px 20px', fontWeight: 700 }}>{b.itemTitle}</td>
                        <td style={{ padding: '16px 20px' }}>
                          <div>{b.clientName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.clientPhone}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600 }}>{b.duration}</div>
                          <div style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>{b.dates}</div>
                        </td>
                        <td style={{ padding: '16px 20px', fontWeight: 800, color: '#34d399' }}>{formatNaira(b.totalNaira)}</td>
                        <td style={{ padding: '16px 20px' }}>
                          <span className={`badge-pill ${b.status === 'Confirmed' ? 'badge-emerald' : b.status === 'Completed' ? 'badge-indigo' : 'badge-gold'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                            onClick={() => alert(`Client Contact:\nName: ${b.clientName}\nEmail: ${b.clientEmail}\nPhone: ${b.clientPhone}`)}
                          >
                            Contact Client
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ONLINE STORE THEMES VIEW */}
        {activeSidebarNav === 'online_store' && (
          <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Store size={22} color="#10b981" />
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Online Store & Themes</h1>
              </div>
              {currentManagedStore ? (
                <button className="btn-secondary" style={{ padding: '8px 18px' }} onClick={() => onVisitStore(currentManagedStore.slug)}>
                  View live store (rentiuse.com/{currentManagedStore.slug})
                </button>
              ) : (
                <button className="btn-primary" onClick={onOpenCreateStore}>
                  <PlusCircle size={16} /> Create Store Now
                </button>
              )}
            </div>

            {/* ACTIVE THEME CARD */}
            {currentManagedStore ? (
              <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '48px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ background: '#161d2a', padding: '36px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                  <img src={currentManagedStore.bannerImage || currentTheme.bannerPreset} alt="Banner" style={{ width: '560px', height: '240px', objectFit: 'cover', borderRadius: '12px' }} />
                  <div style={{ position: 'absolute', bottom: '48px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(10px)', padding: '12px 24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{currentManagedStore.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#818cf8', fontFamily: 'monospace' }}>rentiuse.com/{currentManagedStore.slug}</div>
                  </div>
                </div>
                <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0e1420' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{currentTheme.name}</h3>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Added: Just now • Version {currentTheme.version} • <span style={{ color: '#34d399' }}>● Active Theme</span></div>
                  </div>
                  <button className="btn-primary" style={{ background: 'white', color: '#090d16', border: 'none', padding: '10px 22px', fontWeight: 800 }} onClick={() => { setEditingTheme(currentTheme); setIsLiveThemeEditorOpen(true); }}>
                    <Edit size={16} /> Edit theme
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '48px 36px', textAlign: 'center', borderRadius: '20px', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 100%)', border: '1px dashed rgba(99,102,241,0.4)' }}>
                <Store size={40} color="#818cf8" style={{ marginBottom: '16px' }} />
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>Launch Your Storefront & Subdomain</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
                  Set up your store subdomain (e.g. <strong style={{ color: '#818cf8' }}>rentiuse.com/yourbrand</strong>) to start customizing themes and publishing spaces or products.
                </p>
                <button className="btn-primary" style={{ padding: '12px 28px' }} onClick={onOpenCreateStore}>
                  <PlusCircle size={18} /> Create Store & Set Up Theme
                </button>
              </div>
            )}

            {/* DISCOVER READY-MADE THEMES */}
            <section style={{ marginTop: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Discover Ready-Made Themes</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Pick a ready-made theme designed for soundstages, tools, coworking, and event rentals.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '24px' }}>
                {PREMADE_THEMES.map(theme => {
                  const isCurrent = currentManagedStore && activeThemeId === theme.id;
                  return (
                    <div key={theme.id} className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', border: isCurrent ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ position: 'relative', height: '180px', background: '#090d16' }}>
                        <img src={theme.bannerPreset} alt={theme.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                        <div style={{ position: 'absolute', top: '12px', left: '12px' }}><span className="badge-pill badge-indigo">{theme.badge}</span></div>
                        <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>{theme.name}</h3>
                          <div style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>{theme.style}</div>
                        </div>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{theme.description}</p>
                        <button 
                          className="btn-primary" 
                          style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                          onClick={() => {
                            setEditingTheme(theme);
                            if (currentManagedStore) {
                              setIsLiveThemeEditorOpen(true);
                            } else {
                              onOpenCreateStore();
                            }
                          }}
                        >
                          <Edit size={14} /> Edit theme
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 4: PRODUCTS, SPACE RENTALS & EQUIPMENT RENTALS VIEW */}
        {activeSidebarNav === 'products' && (
          <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '0 auto' }}>
            
            {/* HEADER & QUICK CREATION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Products, Spaces & Equipment Inventory</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Stock your store with spaces, film gear, and products for instant client bookings.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-primary" style={{ background: '#10b981', color: 'white', border: 'none', padding: '9px 16px', fontWeight: 700, fontSize: '0.85rem' }} onClick={() => openAddFormWithType('space')}>
                  + Add Space
                </button>
                <button className="btn-primary" style={{ background: '#6366f1', color: 'white', border: 'none', padding: '9px 16px', fontWeight: 700, fontSize: '0.85rem' }} onClick={() => openAddFormWithType('equipment')}>
                  + Add Equipment
                </button>
                <button className="btn-primary" style={{ background: 'white', color: '#090d16', border: 'none', padding: '9px 16px', fontWeight: 800, fontSize: '0.85rem' }} onClick={() => openAddFormWithType('product')}>
                  + Add Product
                </button>
              </div>
            </div>

            {/* ASSET TYPE FILTER TABS */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', overflowX: 'auto' }}>
              <button 
                onClick={() => setProductsSubNav('all')}
                style={{ background: 'none', border: 'none', color: productsSubNav === 'all' ? 'white' : '#94a3b8', fontWeight: productsSubNav === 'all' ? 800 : 500, fontSize: '0.92rem', cursor: 'pointer', borderBottom: productsSubNav === 'all' ? '2px solid #6366f1' : 'none', paddingBottom: '8px' }}
              >
                All Inventory ({currentListings.length})
              </button>
              <button 
                onClick={() => setProductsSubNav('spaces')}
                style={{ background: 'none', border: 'none', color: productsSubNav === 'spaces' ? '#34d399' : '#94a3b8', fontWeight: productsSubNav === 'spaces' ? 800 : 500, fontSize: '0.92rem', cursor: 'pointer', borderBottom: productsSubNav === 'spaces' ? '2px solid #10b981' : 'none', paddingBottom: '8px' }}
              >
                🏢 Space Rentals ({spaceCount})
              </button>
              <button 
                onClick={() => setProductsSubNav('equipment')}
                style={{ background: 'none', border: 'none', color: productsSubNav === 'equipment' ? '#818cf8' : '#94a3b8', fontWeight: productsSubNav === 'equipment' ? 800 : 500, fontSize: '0.92rem', cursor: 'pointer', borderBottom: productsSubNav === 'equipment' ? '2px solid #818cf8' : 'none', paddingBottom: '8px' }}
              >
                🛠️ Equipment Rentals ({equipmentCount})
              </button>
              <button 
                onClick={() => setProductsSubNav('products')}
                style={{ background: 'none', border: 'none', color: productsSubNav === 'products' ? '#fbbf24' : '#94a3b8', fontWeight: productsSubNav === 'products' ? 800 : 500, fontSize: '0.92rem', cursor: 'pointer', borderBottom: productsSubNav === 'products' ? '2px solid #f59e0b' : 'none', paddingBottom: '8px' }}
              >
                📦 Products ({productCount})
              </button>
              <button 
                onClick={() => setProductsSubNav('collections')}
                style={{ background: 'none', border: 'none', color: productsSubNav === 'collections' ? 'white' : '#94a3b8', fontWeight: productsSubNav === 'collections' ? 800 : 500, fontSize: '0.92rem', cursor: 'pointer', borderBottom: productsSubNav === 'collections' ? '2px solid #6366f1' : 'none', paddingBottom: '8px' }}
              >
                📂 Collections ({collectionsList.length})
              </button>
            </div>

            {/* TAB 1: LISTINGS FEED FOR SPACES, EQUIPMENT & PRODUCTS */}
            {productsSubNav !== 'collections' && (
              <div>
                <div style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input type="text" className="form-input" placeholder="Search spaces, equipment or products..." value={productSearchQuery} onChange={(e) => setProductSearchQuery(e.target.value)} style={{ paddingLeft: '40px' }} />
                  </div>
                </div>

                {filteredListings.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '22px' }}>
                    {filteredListings.map(item => {
                      const itemIsSpace = item.type === 'space' || item.category === 'Spaces';
                      const itemIsEquipment = item.type === 'equipment' || item.category === 'Equipment';
                      return (
                        <div key={item.id} className="glass-panel" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: itemIsSpace ? '1px solid rgba(16,185,129,0.3)' : itemIsEquipment ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.1)' }}>
                          <div>
                            <div style={{ position: 'relative', height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '14px' }}>
                              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                                <span className={`badge-pill ${itemIsSpace ? 'badge-emerald' : itemIsEquipment ? 'badge-indigo' : 'badge-gold'}`} style={{ fontSize: '0.72rem' }}>
                                  {itemIsSpace ? '🏢 Space Rental' : itemIsEquipment ? '🛠️ Equipment Rental' : '📦 Product'}
                                </span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{item.title}</h3>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px' }}>
                              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{formatNaira(item.hourlyRate)}/hr</span>
                              {item.originalHourlyRate && (
                                <span style={{ fontSize: '0.82rem', color: '#ef4444', textDecoration: 'line-through' }}>{formatNaira(item.originalHourlyRate)}</span>
                              )}
                              <span style={{ fontSize: '0.78rem', color: '#a5b4fc', marginLeft: 'auto' }}>({formatNaira(item.dailyRate)}/day)</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '0.8rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }} onClick={() => onDeleteListing(item.id)}>
                                <Trash2 size={14} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="glass-panel" style={{ background: '#0e1420', padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>No items in this category</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Add spaces or equipment to start accepting rental bookings.</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button className="btn-primary" style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 22px', fontWeight: 800 }} onClick={() => openAddFormWithType('space')}>+ Add Space</button>
                      <button className="btn-primary" style={{ background: '#6366f1', color: 'white', border: 'none', padding: '10px 22px', fontWeight: 800 }} onClick={() => openAddFormWithType('equipment')}>+ Add Equipment</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: COLLECTIONS MANAGER */}
            {productsSubNav === 'collections' && (
              <div>
                <form onSubmit={handleAddCollectionSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '28px', maxWidth: '560px' }}>
                  <input type="text" className="form-input" placeholder="New collection name (e.g. Soundstages & Lighting)" value={newCollectionInput} onChange={(e) => setNewCollectionInput(e.target.value)} required />
                  <button type="submit" className="btn-primary" style={{ whitespace: 'nowrap' }}>+ Add Collection</button>
                </form>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {collectionsList.map(col => {
                    const count = currentListings.filter(i => i.collection === col).length;
                    return (
                      <div key={col} className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <FolderKanban size={20} />
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>{col}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{count} Item(s) in this collection</p>
                        <button className="btn-secondary" style={{ width: '100%', fontSize: '0.8rem', padding: '8px' }} onClick={() => { setProductsSubNav('all'); setProductSearchQuery(''); }}>
                          View Collection Items
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: CUSTOMERS VIEW */}
        {activeSidebarNav === 'customers' && (
          <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Customers CRM</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Track verified client details, booking histories, and contact records.</p>
            </div>

            <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                    <th style={{ padding: '14px 20px' }}>Customer Name</th>
                    <th style={{ padding: '14px 20px' }}>Contact Info</th>
                    <th style={{ padding: '14px 20px' }}>Total Bookings</th>
                    <th style={{ padding: '14px 20px' }}>Total Spent (₦)</th>
                    <th style={{ padding: '14px 20px' }}>Location</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 700 }}>Funke Akindele (SceneOne TV)</td>
                    <td style={{ padding: '16px 20px' }}>funke@sceneone.ng • +234 802 999 1122</td>
                    <td style={{ padding: '16px 20px', fontWeight: 700 }}>4 Bookings</td>
                    <td style={{ padding: '16px 20px', color: '#34d399', fontWeight: 800 }}>{formatNaira(1280000)}</td>
                    <td style={{ padding: '16px 20px' }}>Ikeja, Lagos</td>
                    <td style={{ padding: '16px 20px' }}><span className="badge-pill badge-emerald">VIP Tenant</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 700 }}>Kemi Adetiba Studios</td>
                    <td style={{ padding: '16px 20px' }}>kemi@kingofboys.com • +234 809 444 8811</td>
                    <td style={{ padding: '16px 20px', fontWeight: 700 }}>2 Bookings</td>
                    <td style={{ padding: '16px 20px', color: '#34d399', fontWeight: 800 }}>{formatNaira(640000)}</td>
                    <td style={{ padding: '16px 20px' }}>Victoria Island, Lagos</td>
                    <td style={{ padding: '16px 20px' }}><span className="badge-pill badge-indigo">Verified</span></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '16px 20px', fontWeight: 700 }}>Tunde Afolayan</td>
                    <td style={{ padding: '16px 20px' }}>tunde@afolayanmedia.com • +234 813 555 7722</td>
                    <td style={{ padding: '16px 20px', fontWeight: 700 }}>1 Booking</td>
                    <td style={{ padding: '16px 20px', color: '#34d399', fontWeight: 800 }}>{formatNaira(22500)}</td>
                    <td style={{ padding: '16px 20px' }}>Lekki, Lagos</td>
                    <td style={{ padding: '16px 20px' }}><span className="badge-pill badge-indigo">Verified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 6: ANALYTICS (₦) VIEW */}
        {activeSidebarNav === 'analytics' && (
          <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Analytics & Revenue (₦)</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Real-time rental income, booking statistics, and automated bank payouts.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Gross Store Volume</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34d399' }}>{formatNaira(1942500)}</div>
                <div style={{ fontSize: '0.8rem', color: '#818cf8', marginTop: '6px' }}>↑ 24.5% vs last month</div>
              </div>
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Average Booking Value</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white' }}>{formatNaira(277500)}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px' }}>Per reservation</div>
              </div>
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Automated Payout Bank</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#a5b4fc', margin: '6px 0' }}>Access Bank Nigeria</div>
                <div style={{ fontSize: '0.78rem', color: '#34d399' }}>● Payout Account Verified</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Monthly Earnings Overview (₦)</h3>
              <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ flex: 1, background: 'rgba(99,102,241,0.3)', height: '40%', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', color: '#a5b4fc', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '8px' }}>May</div>
                <div style={{ flex: 1, background: 'rgba(99,102,241,0.4)', height: '60%', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', color: '#a5b4fc', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '8px' }}>Jun</div>
                <div style={{ flex: 1, background: 'rgba(99,102,241,0.6)', height: '75%', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', color: '#a5b4fc', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '8px' }}>Jul</div>
                <div style={{ flex: 1, background: 'rgba(16,185,129,0.8)', height: '95%', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', color: 'white', fontWeight: 800, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '8px' }}>Aug</div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: STORE SETTINGS VIEW */}
        {activeSidebarNav === 'settings' && (
          <div className="animate-fade-in" style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Store & Payout Settings</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage your store profile, custom subdomain, and Nigerian bank payout account.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="glass-panel" style={{ padding: '36px', borderRadius: '20px' }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Store Name</label>
                <input type="text" className="form-input" value={settingsStoreName} onChange={(e) => setSettingsStoreName(e.target.value)} required />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Store Tagline / Description</label>
                <input type="text" className="form-input" value={settingsTagline} onChange={(e) => setSettingsTagline(e.target.value)} required />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Custom Store Subdomain Slug</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#818cf8', fontWeight: 700 }}>rentiuse.com/</span>
                  <input type="text" className="form-input" value={settingsSlug} onChange={(e) => setSettingsSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} required />
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px', color: '#34d399' }}>Nigerian Bank Payout Account (₦)</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Direct bank settlements via NGN payment gateway upon booking approval.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Select Bank</label>
                    <select className="form-select" value={settingsBankName} onChange={(e) => setSettingsBankName(e.target.value)}>
                      {nigerianBanks.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Account Number (10 Digits)</label>
                    <input type="text" className="form-input" value={settingsAccountNumber} onChange={(e) => setSettingsAccountNumber(e.target.value)} maxLength={10} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Account Holder Name</label>
                    <input type="text" className="form-input" value={settingsAccountName} onChange={(e) => setSettingsAccountName(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CAC Registration (Optional)</label>
                    <input type="text" className="form-input" value={settingsCacNumber} onChange={(e) => setSettingsCacNumber(e.target.value)} />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
                Save Settings & Payout Profile
              </button>
            </form>
          </div>
        )}

      </main>

      {/* FULL SCREEN LIVE VISUAL THEME EDITOR */}
      {isLiveThemeEditorOpen && (
        <ThemeEditorView 
          store={currentManagedStore}
          theme={editingTheme}
          onSaveStore={onUpdateStore}
          onClose={() => setIsLiveThemeEditorOpen(false)}
          onAddListing={onAddListing}
          onVisitStore={onVisitStore}
        />
      )}

      {/* "+ ADD SPACE / EQUIPMENT / PRODUCT" FORM DRAWER */}
      {isAddProductOpen && (
        <div className="modal-overlay" onClick={() => setIsAddProductOpen(false)}>
          <div className="glass-panel animate-fade-in" style={{ maxWidth: '780px', width: '100%', padding: '36px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h2>
                  {productType === 'space' ? '🏢 Add Space Rental' : productType === 'equipment' ? '🛠️ Add Equipment Rental' : '📦 Add General Product'}
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Publish to {currentManagedStore?.name || 'Store'} storefront</div>
              </div>
              <button className="btn-secondary" onClick={() => setIsAddProductOpen(false)}>Cancel</button>
            </div>

            <form onSubmit={handleAddProductSubmit}>
              {/* ASSET TYPE PILL SELECTOR */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Select Listing Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <button 
                    type="button" 
                    className={`btn-secondary ${productType === 'space' ? 'btn-outline-glow' : ''}`}
                    onClick={() => { setProductType('space'); setProductCategory('Spaces'); }}
                    style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                  >
                    🏢 Space Rental
                  </button>
                  <button 
                    type="button" 
                    className={`btn-secondary ${productType === 'equipment' ? 'btn-outline-glow' : ''}`}
                    onClick={() => { setProductType('equipment'); setProductCategory('Equipment'); }}
                    style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                  >
                    🛠️ Equipment Rental
                  </button>
                  <button 
                    type="button" 
                    className={`btn-secondary ${productType === 'product' ? 'btn-outline-glow' : ''}`}
                    onClick={() => { setProductType('product'); setProductCategory('Products'); }}
                    style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                  >
                    📦 Product
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  {productType === 'space' ? 'Space Name / Studio Title' : productType === 'equipment' ? 'Equipment Package Title' : 'Product Title'}
                </label>
                <input type="text" className="form-input" placeholder={productType === 'space' ? 'e.g. Soundstage Studio 1 - White Cyclorama' : productType === 'equipment' ? 'e.g. RED V-Raptor 8K Camera Kit' : 'e.g. Heavy Duty Extension Reel'} value={productTitle} onChange={(e) => setProductTitle(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Category</label>
                  <select className="form-select" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                    <option value="Spaces">Spaces (Soundstages & Studios)</option>
                    <option value="Equipment">Equipment (Cameras, Lighting & Power)</option>
                    <option value="Coworking">Coworking & Desks</option>
                    <option value="Products">General Products & Tools</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Collection</label>
                  <select className="form-select" value={productCollection} onChange={(e) => setProductCollection(e.target.value)}>
                    {collectionsList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* GALLERY DEVICE FILE UPLOAD */}
              <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(99,102,241,0.4)', padding: '20px', borderRadius: '14px', textAlign: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  Upload {productType === 'space' ? 'Space' : productType === 'equipment' ? 'Equipment' : 'Product'} Photo from Device Gallery
                </label>

                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleProductGalleryUpload}
                  style={{ display: 'none' }}
                />

                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ padding: '10px 24px', fontSize: '0.88rem', background: 'rgba(99,102,241,0.15)', borderColor: '#818cf8', color: '#a5b4fc' }}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <Upload size={16} /> Choose Photo from Gallery
                </button>

                {productImage && (
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <img src={productImage} alt="Selected preview" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    <span style={{ fontSize: '0.78rem', color: '#34d399' }}>Photo Selected</span>
                  </div>
                )}
              </div>

              {/* PRICING INPUTS IN NAIRA */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hourly Rental Rate (₦/hr)</label>
                  <input type="number" className="form-input" value={productHourlyRate} onChange={(e) => setProductHourlyRate(e.target.value)} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#ef4444' }}>Original Compare Price (₦/hr)</label>
                  <input type="number" className="form-input" value={productCompareHourlyRate} onChange={(e) => setProductCompareHourlyRate(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Rental Rate (₦/day)</label>
                  <input type="number" className="form-input" value={productDailyRate} onChange={(e) => setProductDailyRate(e.target.value)} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#ef4444' }}>Original Compare Price (₦/day)</label>
                  <input type="number" className="form-input" value={productCompareDailyRate} onChange={(e) => setProductCompareDailyRate(e.target.value)} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Refundable Security Deposit (₦)</label>
                <input type="number" className="form-input" value={productDeposit} onChange={(e) => setProductDeposit(e.target.value)} required />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Technical Specs / Features (One per line)</label>
                <textarea className="form-input" rows={3} value={productSpecs} onChange={(e) => setProductSpecs(e.target.value)} style={{ resize: 'vertical' }} />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Publish {productType === 'space' ? 'Space' : productType === 'equipment' ? 'Equipment' : 'Product'} to Store (₦)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
