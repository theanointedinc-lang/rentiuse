import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  PlusCircle, 
  Calendar, 
  Package, 
  DollarSign, 
  Settings, 
  ShieldCheck, 
  Info,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Eye,
  Camera,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Send,
  Trash2,
  Edit,
  Building,
  UserCheck,
  Sliders,
  Filter
} from 'lucide-react';
import Container from '../../components/common/Container';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import { 
  formatNaira, 
  getStoredListings, 
  deleteStoredListing,
  submitDraftForApproval,
  getOwnerListings
} from '../../data/listingsData';
import { 
  getCurrentUser, 
  getStoreBySlug, 
  saveStore,
  getStoredStores 
} from '../../data/storesData';

export default function OwnerPortalView({ section = 'overview' }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [storeData, setStoreData] = useState(() => {
    const u = getCurrentUser();
    if (u?.storeSlug) {
      return getStoreBySlug(u.storeSlug);
    }
    const all = getStoredStores();
    const firstSlug = Object.keys(all)[0];
    return firstSlug ? all[firstSlug] : null;
  });

  const [listings, setListings] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [notice, setNotice] = useState(null);
  const [listingFilter, setListingFilter] = useState('all'); // 'all', 'approved', 'pending_approval', 'draft', 'rejected'

  // Settings form states
  const [settingsForm, setSettingsForm] = useState({
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0123456789',
    accountName: currentUser?.name || 'Verified Resource Owner',
    phone: storeData?.contactPhone || '+234 803 123 4567',
    email: storeData?.contactEmail || 'host@rentiuse.com',
    operatingDays: storeData?.operatingDays || 'Monday – Saturday',
    operatingHours: storeData?.operatingHours || '8:00 AM – 8:00 PM',
    blackoutDate: ''
  });

  // Blackout dates list state
  const [blackoutDates, setBlackoutDates] = useState(['2026-12-25', '2026-12-26']);

  const loadData = () => {
    const user = getCurrentUser();
    setCurrentUser(user);

    let store = null;
    if (user?.storeSlug) {
      store = getStoreBySlug(user.storeSlug);
    } else {
      const all = getStoredStores();
      const first = Object.keys(all)[0];
      if (first) store = all[first];
    }
    setStoreData(store);

    if (store?.slug) {
      setListings(getOwnerListings(store.slug));
    } else {
      setListings(getStoredListings());
    }
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('rentiuse_listings_updated', handleUpdate);
    window.addEventListener('rentiuse_stores_updated', handleUpdate);
    return () => {
      window.removeEventListener('rentiuse_listings_updated', handleUpdate);
      window.removeEventListener('rentiuse_stores_updated', handleUpdate);
    };
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', path: '/owner/dashboard', icon: LayoutDashboard },
    { id: 'store', label: 'My Storefront', path: '/owner/store', icon: Store },
    { id: 'listings', label: 'My Listings', path: '/owner/listings', icon: Package },
    { id: 'new', label: '+ Add Resource', path: '/owner/listings/new', icon: PlusCircle },
    { id: 'bookings', label: 'Booking Requests', path: '/owner/bookings', icon: Clock },
    { id: 'calendar', label: 'Calendar & Availability', path: '/owner/calendar', icon: Calendar },
    { id: 'inventory', label: 'Inventory & Stock', path: '/owner/inventory', icon: Layers },
    { id: 'pricing', label: 'Pricing & Deposits', path: '/owner/pricing', icon: Sliders },
    { id: 'earnings', label: 'Earnings & Payouts', path: '/owner/earnings', icon: DollarSign },
    { id: 'store-settings', label: 'Store Settings', path: '/owner/store-settings', icon: Settings },
    { id: 'account-settings', label: 'Account Settings', path: '/owner/account-settings', icon: UserCheck }
  ];

  const approvedListings = listings.filter(i => i.status === 'approved');
  const pendingListings = listings.filter(i => i.status === 'pending_approval');
  const draftListings = listings.filter(i => i.status === 'draft');
  const rejectedListings = listings.filter(i => i.status === 'rejected');

  const filteredListings = listings.filter(item => {
    if (listingFilter === 'all') return true;
    return item.status === listingFilter;
  });

  const handleCopyLink = () => {
    if (!storeData?.slug) return;
    const url = `https://rentiuse.com/${storeData.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSubmitDraft = (id, title) => {
    submitDraftForApproval(id);
    setNotice(`Draft "${title}" has been submitted for administrator review.`);
    setTimeout(() => setNotice(null), 4000);
  };

  const handleDeleteListing = (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      deleteStoredListing(id);
      setNotice(`Listing "${title}" removed.`);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handleAddBlackoutDate = (e) => {
    e.preventDefault();
    if (settingsForm.blackoutDate && !blackoutDates.includes(settingsForm.blackoutDate)) {
      setBlackoutDates(prev => [...prev, settingsForm.blackoutDate]);
      setSettingsForm(prev => ({ ...prev, blackoutDate: '' }));
      setNotice('Blackout maintenance date registered on calendar.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleRemoveBlackoutDate = (date) => {
    setBlackoutDates(prev => prev.filter(d => d !== date));
  };

  const handleSaveBankSettings = (e) => {
    e.preventDefault();
    setNotice('Bank settlement details verified and saved for automated Paystack/Flutterwave escrow disbursement.');
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="owner-portal-view" style={{ paddingBottom: '90px', backgroundColor: 'var(--color-bg-subtle)' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '28px 0 20px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Owner Portal", to: "/owner/dashboard" }, { label: section.toUpperCase() }]} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src={storeData?.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'} 
                alt="Store Avatar" 
                style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover', border: '2px solid var(--color-border)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>VERIFIED OWNER PORTAL</span>
                  {storeData?.slug && (
                    <span className="badge badge-outline" style={{ fontSize: '0.72rem', fontFamily: 'monospace' }}>
                      rentiuse.com/{storeData.slug}
                    </span>
                  )}
                </div>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>
                  {storeData?.name || `${currentUser?.name || 'Resource Owner'}'s Vault`}
                </h1>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link to="/owner/listings/new" className="btn btn-primary btn-sm">
                <PlusCircle size={15} />
                <span>+ Add Resource</span>
              </Link>

              {storeData?.slug ? (
                <Link to={`/${storeData.slug}`} className="btn btn-outline btn-sm">
                  <Store size={14} />
                  <span>View Public Storefront</span>
                </Link>
              ) : (
                <Link to="/owner/onboarding" className="btn btn-secondary btn-sm">
                  <Store size={14} />
                  <span>Launch Storefront Wizard</span>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Grid: Sidebar Navigation + Dynamic Tab Content */}
      <section style={{ padding: '36px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr)) 3.2fr', gap: '32px', alignItems: 'flex-start' }}>
            
            {/* Sidebar Navigation */}
            <aside className="card-surface" style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700, padding: '8px 12px', marginBottom: '4px' }}>
                Store Operations
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = (section === item.id) || (section === 'dashboard' && item.id === 'overview') || (section === 'settings' && item.id === 'store-settings');
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`btn btn-full ${isActive ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ justifyContent: 'space-between', padding: '10px 14px', fontSize: '0.88rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={16} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                        <span>{item.label}</span>
                      </div>

                      {item.id === 'listings' && pendingListings.length > 0 && (
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '10px' }}>
                          {pendingListings.length}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {storeData?.slug && (
                <div style={{ marginTop: '24px', padding: '14px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>Public Storefront Link</span>
                  <div style={{ color: 'var(--color-primary-dark)', fontFamily: 'monospace', fontWeight: 700, marginTop: '2px', wordBreak: 'break-all' }}>
                    rentiuse.com/{storeData.slug}
                  </div>
                  <button 
                    onClick={handleCopyLink} 
                    className="btn btn-ghost btn-sm" 
                    style={{ width: '100%', marginTop: '8px', padding: '6px', fontSize: '0.75rem', border: '1px solid var(--color-border)' }}
                  >
                    {copiedLink ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
                    <span>{copiedLink ? 'Copied to Clipboard' : 'Copy Public URL'}</span>
                  </button>
                </div>
              )}
            </aside>

            {/* Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {notice && (
                <div className="notice-box notice-success">
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{notice}</span>
                </div>
              )}

              {/* 1. SECTION: OVERVIEW */}
              {(section === 'overview' || section === 'dashboard') && (
                <>
                  {/* Status Metric Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div className="card-surface" style={{ padding: '20px', borderLeft: '4px solid #10B981' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Published & Live</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#065F46', marginTop: '4px' }}>{approvedListings.length}</div>
                      <span style={{ fontSize: '0.75rem', color: '#10B981' }}>Visible to Nigerian Renters</span>
                    </div>

                    <div className="card-surface" style={{ padding: '20px', borderLeft: '4px solid #F59E0B' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Pending Moderation</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#B45309', marginTop: '4px' }}>{pendingListings.length}</div>
                      <span style={{ fontSize: '0.75rem', color: '#B45309' }}>Under Admin Inspection</span>
                    </div>

                    <div className="card-surface" style={{ padding: '20px', borderLeft: '4px solid var(--color-primary)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Private Drafts</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginTop: '4px' }}>{draftListings.length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Not yet submitted</span>
                    </div>

                    <div className="card-surface" style={{ padding: '20px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Storefront State</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065F46', marginTop: '8px' }}>
                        {storeData ? '✓ Active Store' : 'Uninitialized'}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {storeData?.slug ? `rentiuse.com/${storeData.slug}` : 'Setup Required'}
                      </span>
                    </div>
                  </div>

                  {/* Recent Resource Inventory */}
                  <div className="card-surface" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Resource Inventory</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                          Manage creative spaces and equipment gear packages under your storefront.
                        </p>
                      </div>

                      <Link to="/owner/listings/new" className="btn btn-primary btn-sm">
                        <PlusCircle size={15} />
                        <span>+ Add New Resource</span>
                      </Link>
                    </div>

                    {listings.length === 0 ? (
                      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <Package size={36} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>No listings created yet</h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 20px' }}>
                          You haven't submitted any spaces or equipment for verification. Submit your first resource using the guided listing builder.
                        </p>
                        <Link to="/owner/listings/new" className="btn btn-primary btn-sm">
                          Create Your First Listing
                        </Link>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {listings.slice(0, 5).map(item => (
                          <div 
                            key={item.id}
                            style={{ 
                              padding: '16px 20px', 
                              borderRadius: 'var(--radius-md)', 
                              border: '1px solid var(--color-border)', 
                              background: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              gap: '16px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <img 
                                src={item.images?.[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=200&q=80'} 
                                alt={item.title} 
                                style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }} 
                              />
                              <div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 2px' }}>{item.title}</h4>
                                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                                  {item.type === 'studio' ? 'Creative Studio' : 'Equipment'} • {formatNaira(item.pricing?.hourlyRate)}/hr ({formatNaira(item.pricing?.dailyRate)}/day)
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {item.status === 'approved' && (
                                <span className="badge" style={{ background: '#D1FAE5', color: '#065F46', borderColor: '#6EE7B7' }}>
                                  ✓ Live on Marketplace
                                </span>
                              )}
                              {item.status === 'pending_approval' && (
                                <span className="badge" style={{ background: '#FEF3C7', color: '#B45309', borderColor: '#FCD34D' }}>
                                  ⏳ Awaiting Admin Approval
                                </span>
                              )}
                              {item.status === 'draft' && (
                                <span className="badge" style={{ background: '#F3F4F6', color: '#4B5563', borderColor: '#E5E7EB' }}>
                                  📝 Draft
                                </span>
                              )}

                              {item.status === 'approved' && (
                                <Link to={item.type === 'studio' ? `/studios/${item.slug}` : `/equipment/${item.slug}`} className="btn btn-outline btn-sm">
                                  <Eye size={13} /> View Live
                                </Link>
                              )}

                              {item.status === 'draft' && (
                                <button 
                                  onClick={() => handleSubmitDraft(item.id, item.title)} 
                                  className="btn btn-primary btn-sm"
                                  style={{ fontSize: '0.78rem' }}
                                >
                                  <Send size={13} /> Submit for Approval
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* 2. SECTION: MY STORE */}
              {section === 'store' && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Storefront Management</h3>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0 }}>
                        Your independent rental shop on RENTIUSE with unique path-based URL.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link to="/owner/onboarding" className="btn btn-secondary btn-sm">
                        <Edit size={14} /> Edit Store Details
                      </Link>
                      {storeData?.slug && (
                        <Link to={`/${storeData.slug}`} className="btn btn-primary btn-sm">
                          <ExternalLink size={14} /> Open Live Storefront
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Storefront Visual Preview */}
                  {storeData ? (
                    <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', background: '#FFFFFF' }}>
                      <div style={{ position: 'relative', height: '160px' }}>
                        <img src={storeData.bannerImage} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(23, 21, 38, 0.45)' }} />
                        <div style={{ position: 'absolute', bottom: '16px', left: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img src={storeData.ownerAvatar} alt="Avatar" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #FFFFFF', objectFit: 'cover' }} />
                          <div style={{ color: '#FFFFFF' }}>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{storeData.name}</h2>
                            <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>{storeData.tagline}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '0.88rem' }}>
                        <div>
                          <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Storefront URL</span>
                          <strong style={{ color: 'var(--color-primary-dark)', fontFamily: 'monospace' }}>rentiuse.com/{storeData.slug}</strong>
                        </div>

                        <div>
                          <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Operating Schedule</span>
                          <strong>{storeData.operatingDays} ({storeData.operatingHours})</strong>
                        </div>

                        <div>
                          <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Location</span>
                          <strong>{storeData.location}</strong>
                        </div>

                        <div>
                          <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Contact</span>
                          <strong>{storeData.contactPhone}</strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                      <p>You haven't launched a store yet.</p>
                      <Link to="/owner/onboarding" className="btn btn-primary">
                        Launch Storefront Setup Wizard
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* 3. SECTION: MY LISTINGS */}
              {section === 'listings' && (
                <div className="card-surface" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Manage Resource Listings</h3>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
                        Track your live, pending, and draft items.
                      </p>
                    </div>

                    <Link to="/owner/listings/new" className="btn btn-primary btn-sm">
                      <PlusCircle size={15} />
                      <span>+ Create Resource</span>
                    </Link>
                  </div>

                  {/* Filter Tabs */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <button 
                      onClick={() => setListingFilter('all')}
                      className={`btn btn-sm ${listingFilter === 'all' ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ fontSize: '0.8rem' }}
                    >
                      All ({listings.length})
                    </button>
                    <button 
                      onClick={() => setListingFilter('approved')}
                      className={`btn btn-sm ${listingFilter === 'approved' ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ fontSize: '0.8rem', color: '#065F46' }}
                    >
                      Live ({approvedListings.length})
                    </button>
                    <button 
                      onClick={() => setListingFilter('pending_approval')}
                      className={`btn btn-sm ${listingFilter === 'pending_approval' ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ fontSize: '0.8rem', color: '#B45309' }}
                    >
                      Pending ({pendingListings.length})
                    </button>
                    <button 
                      onClick={() => setListingFilter('draft')}
                      className={`btn btn-sm ${listingFilter === 'draft' ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ fontSize: '0.8rem' }}
                    >
                      Drafts ({draftListings.length})
                    </button>
                  </div>

                  {filteredListings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                      <Package size={36} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ fontWeight: 700 }}>No listings found in this category</h4>
                      <Link to="/owner/listings/new" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
                        Create a Listing
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {filteredListings.map(item => (
                        <div 
                          key={item.id}
                          style={{ 
                            padding: '18px', 
                            borderRadius: 'var(--radius-md)', 
                            border: '1px solid var(--color-border)', 
                            background: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '16px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <img 
                              src={item.images?.[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=200&q=80'} 
                              alt={item.title} 
                              style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover' }} 
                            />
                            <div>
                              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px' }}>{item.title}</h4>
                              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                                {item.type === 'studio' ? 'Creative Studio' : 'Equipment'} • {formatNaira(item.pricing?.hourlyRate)}/hr ({formatNaira(item.pricing?.dailyRate)}/day) • Deposit: {formatNaira(item.pricing?.securityDeposit)}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {item.status === 'approved' && (
                              <span className="badge" style={{ background: '#D1FAE5', color: '#065F46', borderColor: '#6EE7B7' }}>
                                ✓ Published
                              </span>
                            )}
                            {item.status === 'pending_approval' && (
                              <span className="badge" style={{ background: '#FEF3C7', color: '#B45309', borderColor: '#FCD34D' }}>
                                ⏳ Pending Approval
                              </span>
                            )}
                            {item.status === 'draft' && (
                              <span className="badge" style={{ background: '#F3F4F6', color: '#4B5563', borderColor: '#E5E7EB' }}>
                                📝 Draft
                              </span>
                            )}

                            {item.status === 'approved' && (
                              <Link to={item.type === 'studio' ? `/studios/${item.slug}` : `/equipment/${item.slug}`} className="btn btn-outline btn-sm">
                                <Eye size={13} /> View
                              </Link>
                            )}

                            {item.status === 'draft' && (
                              <button 
                                onClick={() => handleSubmitDraft(item.id, item.title)} 
                                className="btn btn-primary btn-sm"
                                style={{ fontSize: '0.78rem' }}
                              >
                                <Send size={13} /> Submit for Approval
                              </button>
                            )}

                            <Link to={`/owner/listings/${item.id}/edit`} className="btn btn-ghost btn-sm" title="Edit listing">
                              <Edit size={14} />
                            </Link>

                            <button 
                              onClick={() => handleDeleteListing(item.id, item.title)} 
                              className="btn btn-ghost btn-sm"
                              style={{ color: '#DC2626' }}
                              title="Delete listing"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 4. SECTION: BOOKING REQUESTS */}
              {section === 'bookings' && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Booking Requests & Host Approval</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0 }}>
                      All reservations undergo online escrow authorization followed by mandatory host approval within 24 hours.
                    </p>
                  </div>

                  <div className="notice-box notice-info" style={{ marginBottom: '24px' }}>
                    <Info size={18} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem' }}>
                      <strong>Nigerian Escrow Safeguard:</strong> Payment alone does NOT confirm a booking. When a renter pays online, funds are securely held in escrow. You have 24 hours to review their production schedule and click "Approve" or "Decline".
                    </span>
                  </div>

                  <div style={{ padding: '48px 20px', textAlign: 'center', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <Clock size={36} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '6px' }}>No Pending Booking Requests</h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
                      When verified renters request reservations for your approved resources, requests will appear here with production notes for your approval.
                    </p>
                  </div>
                </div>
              )}

              {/* 5. SECTION: CALENDAR & AVAILABILITY */}
              {section === 'calendar' && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
                    Calendar & Schedule Management
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                    Set available operating windows and block dates for equipment maintenance or private studio productions.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                    <Input
                      id="cal-days"
                      name="operatingDays"
                      label="Available Days"
                      value={settingsForm.operatingDays}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, operatingDays: e.target.value }))}
                    />

                    <Input
                      id="cal-hours"
                      name="operatingHours"
                      label="Operating Window"
                      value={settingsForm.operatingHours}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, operatingHours: e.target.value }))}
                    />
                  </div>

                  {/* Blackout Dates */}
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px' }}>
                      Maintenance & Blackout Dates
                    </h4>
                    <form onSubmit={handleAddBlackoutDate} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '16px' }}>
                      <div style={{ flex: 1, maxWidth: '240px' }}>
                        <Input
                          id="blackout-date"
                          name="blackoutDate"
                          type="date"
                          label="Select Date to Block"
                          value={settingsForm.blackoutDate}
                          onChange={(e) => setSettingsForm(prev => ({ ...prev, blackoutDate: e.target.value }))}
                        />
                      </div>
                      <button type="submit" className="btn btn-secondary btn-sm" style={{ marginBottom: '14px' }}>
                        + Add Blackout Date
                      </button>
                    </form>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {blackoutDates.map(date => (
                        <span 
                          key={date} 
                          className="badge badge-purple" 
                          style={{ padding: '6px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <span>{date} (Blocked)</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveBlackoutDate(date)} 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. SECTION: INVENTORY */}
              {section === 'inventory' && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
                    Equipment & Spaces Inventory
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                    Control live availability and quantity stock across your rental items.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {listings.map(item => (
                      <div 
                        key={item.id}
                        style={{ 
                          padding: '16px 20px', 
                          borderRadius: 'var(--radius-md)', 
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '14px'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '1rem', display: 'block' }}>{item.title}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                            {item.type === 'studio' ? 'Studio Space' : 'Equipment Package'} • {item.location?.area}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span className="badge badge-purple" style={{ color: '#065F46', background: '#D1FAE5' }}>
                            ✓ In Stock & Available
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. SECTION: PRICING */}
              {section === 'pricing' && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
                    Pricing & Escrow Deposit Structure
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                    Summary of all standardized rental rates across your inventory in Nigerian Naira (₦).
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {listings.map(item => (
                      <div 
                        key={item.id}
                        style={{ 
                          padding: '16px 20px', 
                          borderRadius: 'var(--radius-md)', 
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '0.98rem' }}>{item.title}</strong>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
                          <span>Hourly: <strong>{formatNaira(item.pricing?.hourlyRate)}</strong></span>
                          <span>Daily: <strong>{formatNaira(item.pricing?.dailyRate)}</strong></span>
                          <span style={{ color: 'var(--color-primary-dark)' }}>Deposit: <strong>{formatNaira(item.pricing?.securityDeposit)}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. SECTION: EARNINGS & PAYOUTS */}
              {section === 'earnings' && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
                    Earnings & Nigerian Bank Payouts
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                    Configure your Nigerian settlement bank account for automatic rental payout transfers.
                  </p>

                  <form onSubmit={handleSaveBankSettings} style={{ maxWidth: '520px', marginBottom: '32px' }}>
                    <Select
                      id="bank-name"
                      name="bankName"
                      label="Settlement Bank"
                      value={settingsForm.bankName}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, bankName: e.target.value }))}
                      options={[
                        { value: 'Guaranty Trust Bank (GTBank)', label: 'Guaranty Trust Bank (GTBank)' },
                        { value: 'Zenith Bank', label: 'Zenith Bank' },
                        { value: 'Access Bank', label: 'Access Bank' },
                        { value: 'First Bank of Nigeria', label: 'First Bank of Nigeria' },
                        { value: 'Kuda Microfinance Bank', label: 'Kuda Microfinance Bank' }
                      ]}
                    />

                    <Input
                      id="acct-number"
                      name="accountNumber"
                      label="10-Digit NUBAN Account Number"
                      value={settingsForm.accountNumber}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, accountNumber: e.target.value }))}
                    />

                    <Input
                      id="acct-name"
                      name="accountName"
                      label="Account Name (Must match CAC or NIN verified owner name)"
                      value={settingsForm.accountName}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, accountName: e.target.value }))}
                    />

                    <Button type="submit" variant="primary" size="sm">
                      Save Settlement Bank Details
                    </Button>
                  </form>

                  <div style={{ padding: '24px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Payouts Disbursed</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-ink)', marginTop: '4px' }}>₦0</div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Launch state: Zero fake earnings. Payouts trigger automatically upon completed rentals.
                    </span>
                  </div>
                </div>
              )}

              {/* 9. SECTION: STORE SETTINGS */}
              {(section === 'store-settings' || section === 'settings') && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
                    Storefront Profile & Operations Settings
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                    Update your business contact information and storefront preferences.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Input
                      id="set-phone"
                      name="phone"
                      label="Public Contact Phone"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, phone: e.target.value }))}
                    />

                    <Input
                      id="set-email"
                      name="email"
                      label="Support Email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <Link to="/owner/onboarding" className="btn btn-secondary btn-sm">
                      Open Full Store Setup Wizard to Reconfigure Branding
                    </Link>
                  </div>
                </div>
              )}

              {/* 10. SECTION: ACCOUNT SETTINGS */}
              {section === 'account-settings' && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
                    Host Account & Identity Verification
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                    Your host login credentials and Nigerian KYC identity status.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px' }}>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'block' }}>Host Name</span>
                      <strong>{currentUser?.name || 'Verified Resource Owner'}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'block' }}>Email</span>
                      <strong>{currentUser?.email || 'owner@rentiuse.com'}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'block' }}>KYC Verification Status</span>
                      <strong style={{ color: '#065F46' }}>✓ Verified Resource Host</strong>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}
