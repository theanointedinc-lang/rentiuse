import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Store, 
  Package, 
  Clock, 
  DollarSign, 
  Settings, 
  Info, 
  Lock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Trash2,
  RefreshCw,
  ExternalLink,
  Check,
  Filter
} from 'lucide-react';
import Container from '../../components/common/Container';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import { 
  formatNaira,
  getStoredListings,
  setListingApprovalStatus,
  deleteStoredListing,
  resetListingsToCleanState,
  isDemoPreviewEnabled,
  setDemoPreviewEnabled
} from '../../data/listingsData';

export default function AdminPortalView({ section = 'overview' }) {
  const location = useLocation();

  const [listings, setListings] = useState(getStoredListings());
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending_approval', 'approved', 'rejected'
  const [actionNotice, setActionNotice] = useState(null);
  const [demoMode, setDemoMode] = useState(isDemoPreviewEnabled());

  // Load registered stores
  const [registeredStores, setRegisteredStores] = useState(() => {
    try {
      const data = localStorage.getItem('rentiuse_stores');
      return data ? Object.values(JSON.parse(data)) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      setListings(getStoredListings());
      setDemoMode(isDemoPreviewEnabled());
      try {
        const data = localStorage.getItem('rentiuse_stores');
        setRegisteredStores(data ? Object.values(JSON.parse(data)) : []);
      } catch (e) {}
    };
    window.addEventListener('rentiuse_listings_updated', handleUpdate);
    return () => window.removeEventListener('rentiuse_listings_updated', handleUpdate);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Admin Overview', path: '/admin', icon: ShieldCheck },
    { id: 'listings', label: 'Listing Review & Approval', path: '/admin/listings', icon: Package },
    { id: 'owners', label: 'Owner Moderation & KYC', path: '/admin/owners', icon: Store },
    { id: 'users', label: 'User Management', path: '/admin/users', icon: Users },
    { id: 'bookings', label: 'Booking Oversight', path: '/admin/bookings', icon: Clock },
    { id: 'payments', label: 'Commissions & Refunds', path: '/admin/payments', icon: DollarSign },
    { id: 'settings', label: 'Platform Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleApprove = (id, title) => {
    setListingApprovalStatus(id, 'approved');
    setListings(getStoredListings());
    setActionNotice(`Listing "${title}" has been APPROVED and is now live on the public marketplace.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleReject = (id, title) => {
    setListingApprovalStatus(id, 'rejected');
    setListings(getStoredListings());
    setActionNotice(`Listing "${title}" marked as REJECTED. It remains unpublished.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleUnpublish = (id, title) => {
    setListingApprovalStatus(id, 'pending_approval');
    setListings(getStoredListings());
    setActionNotice(`Listing "${title}" UNPUBLISHED and moved back to pending moderation.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      deleteStoredListing(id);
      setListings(getStoredListings());
      setActionNotice(`Listing "${title}" permanently removed.`);
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  const handleResetToClean = () => {
    if (window.confirm("Reset marketplace to 100% clean empty launch state? All submissions will be cleared.")) {
      resetListingsToCleanState();
      setListings([]);
      setDemoMode(false);
      setActionNotice("Marketplace reset to clean launch state (0 listings).");
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  const handleToggleDemo = () => {
    const next = !demoMode;
    setDemoPreviewEnabled(next);
    setDemoMode(next);
    setActionNotice(next 
      ? "Developer Preview Mode ENABLED: Reference samples visible with demo watermark." 
      : "Developer Preview Mode DISABLED: Marketplace is 100% clean empty."
    );
    setTimeout(() => setActionNotice(null), 4000);
  };

  const pendingListings = listings.filter(i => i.status === 'pending_approval');
  const approvedListings = listings.filter(i => i.status === 'approved');
  const rejectedListings = listings.filter(i => i.status === 'rejected');

  const filteredListings = listings.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  return (
    <div className="admin-portal-view" style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '36px 0 24px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Administration", to: "/admin" }, { label: section.toUpperCase() }]} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-dark">PLATFORM ADMINISTRATION</span>
                <span className="badge badge-outline">Listing Moderation & Verification</span>
              </div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800 }}>
                RENTIUSE Central Admin
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleResetToClean} 
                className="btn btn-outline btn-sm"
                title="Clears all client submissions to return to initial launch state"
                style={{ fontSize: '0.8rem' }}
              >
                <RefreshCw size={13} /> Reset Clean Launch State
              </button>

              <button 
                onClick={handleToggleDemo} 
                className={`btn btn-sm ${demoMode ? 'btn-secondary' : 'btn-ghost'}`}
                style={{ fontSize: '0.8rem', border: '1px solid var(--color-border)' }}
              >
                {demoMode ? 'Preview Mode: ON' : 'Preview Mode: OFF'}
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '36px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr)) 3fr', gap: '32px', alignItems: 'flex-start' }}>
            
            {/* Nav */}
            <aside className="card-surface" style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700, padding: '8px 12px', marginBottom: '4px' }}>
                Admin Modules
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || section === item.id;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`btn btn-full ${isActive ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ justifyContent: 'space-between', padding: '10px 14px', fontSize: '0.9rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={17} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                        <span>{item.label}</span>
                      </div>
                      {item.id === 'listings' && pendingListings.length > 0 && (
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 700, 
                          background: '#FEF3C7', 
                          color: '#B45309', 
                          padding: '2px 8px', 
                          borderRadius: '12px' 
                        }}>
                          {pendingListings.length}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div style={{ marginTop: '24px', padding: '14px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                <strong>Platform Integrity Rule:</strong>
                <p style={{ margin: '4px 0 0', lineHeight: 1.45 }}>
                  Phase 1 launches with zero synthetic data. Only approved owner submissions populate the public catalog.
                </p>
              </div>
            </aside>

            {/* Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {actionNotice && (
                <div className="notice-box notice-success">
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{actionNotice}</span>
                </div>
              )}

              {/* SECTION: LISTINGS OR OVERVIEW */}
              {(section === 'listings' || section === 'overview') && (
                <>
                  {/* Metric Overview Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div className="card-surface" style={{ padding: '20px' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Submissions</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-ink)', marginTop: '4px' }}>{listings.length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>All Owner Resources</span>
                    </div>

                    <div className="card-surface" style={{ padding: '20px', borderLeft: '4px solid #F59E0B' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Pending Review</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#B45309', marginTop: '4px' }}>{pendingListings.length}</div>
                      <span style={{ fontSize: '0.75rem', color: '#B45309' }}>Unpublished drafts</span>
                    </div>

                    <div className="card-surface" style={{ padding: '20px', borderLeft: '4px solid #10B981' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Approved & Live</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#065F46', marginTop: '4px' }}>{approvedListings.length}</div>
                      <span style={{ fontSize: '0.75rem', color: '#10B981' }}>Live on Marketplace</span>
                    </div>

                    <div className="card-surface" style={{ padding: '20px', borderLeft: '4px solid #EF4444' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Rejected</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#DC2626', marginTop: '4px' }}>{rejectedListings.length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Requires modifications</span>
                    </div>
                  </div>

                  {/* Listings Moderation Table / Cards */}
                  <div className="card-surface" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Listing Moderation Queue</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                          Review owner submissions. Approved listings instantly publish to categories, search, and the owner storefront.
                        </p>
                      </div>

                      {/* Filter Pills */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => setFilterStatus('all')}
                          className={`btn btn-sm ${filterStatus === 'all' ? 'btn-secondary' : 'btn-ghost'}`}
                          style={{ fontSize: '0.8rem' }}
                        >
                          All ({listings.length})
                        </button>
                        <button 
                          onClick={() => setFilterStatus('pending_approval')}
                          className={`btn btn-sm ${filterStatus === 'pending_approval' ? 'btn-secondary' : 'btn-ghost'}`}
                          style={{ fontSize: '0.8rem', color: '#B45309' }}
                        >
                          Pending ({pendingListings.length})
                        </button>
                        <button 
                          onClick={() => setFilterStatus('approved')}
                          className={`btn btn-sm ${filterStatus === 'approved' ? 'btn-secondary' : 'btn-ghost'}`}
                          style={{ fontSize: '0.8rem', color: '#065F46' }}
                        >
                          Approved ({approvedListings.length})
                        </button>
                        <button 
                          onClick={() => setFilterStatus('rejected')}
                          className={`btn btn-sm ${filterStatus === 'rejected' ? 'btn-secondary' : 'btn-ghost'}`}
                          style={{ fontSize: '0.8rem', color: '#DC2626' }}
                        >
                          Rejected ({rejectedListings.length})
                        </button>
                      </div>
                    </div>

                    {filteredListings.length === 0 ? (
                      <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <Package size={40} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                          {listings.length === 0 ? 'No Resource Submissions in Queue' : 'No listings match this filter'}
                        </h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto 20px', lineHeight: 1.55 }}>
                          {listings.length === 0
                            ? 'The RENTIUSE marketplace starts clean with zero pre-populated records. When resource owners register and submit listings, they will appear here for verification before publishing.'
                            : 'Try selecting a different status filter above to view submissions.'}
                        </p>
                        {listings.length === 0 && (
                          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/owner/listings/new" className="btn btn-primary btn-sm">
                              Submit a Listing via Owner Portal
                            </Link>
                            <Link to="/" className="btn btn-outline btn-sm">
                              View Empty Marketplace Homepage
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {filteredListings.map(item => {
                          const isApproved = item.status === 'approved';
                          const isPending = item.status === 'pending_approval';
                          const isRejected = item.status === 'rejected';

                          return (
                            <div 
                              key={item.id}
                              style={{ 
                                padding: '20px', 
                                borderRadius: 'var(--radius-md)', 
                                border: '1px solid var(--color-border)',
                                background: '#FFFFFF',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                  <img 
                                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=200&q=80'} 
                                    alt={item.title} 
                                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} 
                                  />
                                  <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                      <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                                        {item.type === 'studio' ? 'Creative Studio' : 'Equipment'}
                                      </span>
                                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                        {item.categoryName}
                                      </span>
                                    </div>
                                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 4px' }}>
                                      {item.title}
                                    </h4>
                                    <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                                      {item.shortDescription}
                                    </p>
                                  </div>
                                </div>

                                {/* Status Badge */}
                                <div>
                                  {isApproved && (
                                    <span className="badge" style={{ background: '#D1FAE5', color: '#065F46', borderColor: '#6EE7B7' }}>
                                      <CheckCircle2 size={13} style={{ marginRight: '4px' }} /> Live on Marketplace
                                    </span>
                                  )}
                                  {isPending && (
                                    <span className="badge" style={{ background: '#FEF3C7', color: '#B45309', borderColor: '#FCD34D' }}>
                                      <Clock size={13} style={{ marginRight: '4px' }} /> Pending Approval
                                    </span>
                                  )}
                                  {isRejected && (
                                    <span className="badge" style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#FCA5A5' }}>
                                      <XCircle size={13} style={{ marginRight: '4px' }} /> Rejected
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Details Strip */}
                              <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
                                gap: '12px', 
                                padding: '12px 16px', 
                                background: 'var(--color-bg-subtle)', 
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.82rem'
                              }}>
                                <div>
                                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Rates (NGN)</span>
                                  <strong>{formatNaira(item.pricing?.hourlyRate)}/hr</strong> • {formatNaira(item.pricing?.dailyRate)}/day
                                </div>
                                <div>
                                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Deposit</span>
                                  <strong>{formatNaira(item.pricing?.securityDeposit)}</strong> refundable
                                </div>
                                <div>
                                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Location</span>
                                  <strong>{item.location?.area}, {item.location?.city}</strong>
                                </div>
                                <div>
                                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Owner Storefront</span>
                                  <Link 
                                    to={`/${item.owner?.storeSlug || 'my-store'}`}
                                    style={{ color: 'var(--color-primary-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                                  >
                                    rentiuse.com/{item.owner?.storeSlug || 'my-store'} <ExternalLink size={11} />
                                  </Link>
                                </div>
                              </div>

                              {/* Admin Action Buttons */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--color-border-subtle)' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                  {isApproved && (
                                    <Link 
                                      to={item.type === 'studio' ? `/studios/${item.slug}` : `/equipment/${item.slug}`} 
                                      className="btn btn-outline btn-sm"
                                    >
                                      <Eye size={14} /> View Live Listing
                                    </Link>
                                  )}
                                </div>

                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                  {!isApproved && (
                                    <button 
                                      onClick={() => handleApprove(item.id, item.title)}
                                      className="btn btn-primary btn-sm"
                                      style={{ backgroundColor: '#059669', borderColor: '#059669' }}
                                    >
                                      <CheckCircle2 size={14} /> Approve & Publish to Marketplace
                                    </button>
                                  )}

                                  {isApproved && (
                                    <button 
                                      onClick={() => handleUnpublish(item.id, item.title)}
                                      className="btn btn-outline btn-sm"
                                    >
                                      Unpublish (Move to Review)
                                    </button>
                                  )}

                                  {!isRejected && !isApproved && (
                                    <button 
                                      onClick={() => handleReject(item.id, item.title)}
                                      className="btn btn-outline btn-sm"
                                      style={{ color: '#DC2626', borderColor: '#FCA5A5' }}
                                    >
                                      <XCircle size={14} /> Reject
                                    </button>
                                  )}

                                  <button 
                                    onClick={() => handleDelete(item.id, item.title)}
                                    className="btn btn-ghost btn-sm"
                                    style={{ color: 'var(--color-text-muted)' }}
                                    title="Delete listing submission"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                </>
              )}

              {/* SECTION: OWNERS & KYC */}
              {section === 'owners' && (
                <div className="card-surface" style={{ padding: '28px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Owner Moderation & KYC Verification</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      Directory of registered resource hosts and custom storefront handles.
                    </p>
                  </div>

                  {registeredStores.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <Store size={36} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>No Merchant Stores Registered</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 20px' }}>
                        The platform launched clean with zero synthetic stores. Real hosts appear here when registering via the owner registration entry point.
                      </p>
                      <Link to="/register/owner" className="btn btn-primary btn-sm">
                        Register a Storefront
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {registeredStores.map(store => (
                        <div 
                          key={store.slug}
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
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 2px' }}>{store.name}</h4>
                            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                              Owner: {store.ownerName} • {store.contactEmail || 'No email provided'} • {store.location || 'Nigeria'}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                              rentiuse.com/{store.slug}
                            </span>
                            <Link to={`/${store.slug}`} className="btn btn-outline btn-sm">
                              <ExternalLink size={13} /> View Storefront
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: USERS, BOOKINGS, PAYMENTS, SETTINGS (Phase 2 Architectural Spec) */}
              {['users', 'bookings', 'payments', 'settings'].includes(section) && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <Lock size={20} color="var(--color-primary)" />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                      {section.toUpperCase()} Backend Architecture Specification
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                    As specified in Phase 1 standards, this module is prepared for Phase 2 backend connection. No fabricated customer records, artificial transactions, or fake escrow disbursements are shown.
                  </p>

                  <div style={{ background: 'var(--color-bg-subtle)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
                    <strong>Phase 2 Implementation Specifications:</strong>
                    <ul style={{ margin: '10px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li>Server-side Role-Based Access Control (RBAC) enforced via httpOnly session tokens.</li>
                      <li>Escrow disbursement reconciliation integrated with Paystack and Flutterwave Nigerian bank transfers.</li>
                      <li>Automated 24-hour host approval expiry and refund reversal webhooks.</li>
                    </ul>
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
