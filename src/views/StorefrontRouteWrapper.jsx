import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Store, 
  MapPin, 
  ShieldCheck, 
  Copy, 
  Check, 
  PlusCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ListingCard from '../components/common/ListingCard';
import RatingBadge from '../components/common/RatingBadge';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import NotFoundView from './NotFoundView';
import { getAllListings, isDemoPreviewEnabled } from '../data/listingsData';
import { getStoreBySlug, isSlugReserved, RESERVED_STORE_SLUGS } from '../data/storesData';
import { MOCK_SEED_STORE } from '../data/mockData';

export { RESERVED_STORE_SLUGS };

export default function StorefrontRouteWrapper() {
  const { storeSlug } = useParams();
  const [copiedLink, setCopiedLink] = useState(false);

  const isReserved = isSlugReserved(storeSlug);
  const allApprovedListings = getAllListings();

  // Find store by slug
  const storeData = useMemo(() => {
    if (isReserved) return null;

    // 1. Check registered stores
    const foundStore = getStoreBySlug(storeSlug);
    if (foundStore) {
      const storeListings = allApprovedListings.filter(i => 
        i.ownerStore?.slug === storeSlug || i.owner?.storeSlug === storeSlug
      );
      return { ...foundStore, listings: storeListings };
    }

    // 2. If Demo Preview Mode is explicitly enabled by developer/evaluator
    if (isDemoPreviewEnabled() && MOCK_SEED_STORE.slug === storeSlug) {
      return {
        ...MOCK_SEED_STORE,
        listings: allApprovedListings.filter(i => i.owner?.storeSlug === storeSlug)
      };
    }

    // 3. Match from active listings by owner.storeSlug
    const matchedListing = allApprovedListings.find(i => i.owner?.storeSlug === storeSlug);
    if (matchedListing && matchedListing.owner) {
      const owner = matchedListing.owner;
      const ownerListings = allApprovedListings.filter(i => i.owner?.storeSlug === storeSlug);

      return {
        slug: storeSlug,
        name: owner.storeName || owner.name,
        tagline: owner.bio,
        bio: `${owner.storeName || owner.name} is a verified resource host on RENTIUSE offering production spaces and gear rentals in Nigeria.`,
        ownerName: owner.name,
        ownerAvatar: owner.avatar,
        bannerImage: matchedListing.images?.[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
        location: `${matchedListing.location?.area || 'Lagos'}, Nigeria`,
        rating: null,
        reviewCount: 0,
        verified: true,
        joinedDate: "2026",
        contactEmail: owner.email || "host@rentiuse.com",
        contactPhone: owner.phone || "+234 800 000 0000",
        listings: ownerListings
      };
    }

    return null;
  }, [storeSlug, isReserved, allApprovedListings]);

  if (isReserved) {
    return <NotFoundView />;
  }

  // If storefront has not been created by any owner yet
  if (!storeData) {
    return (
      <div style={{ padding: '80px 0' }}>
        <Container narrow>
          <EmptyState
            icon={Store}
            title={`Storefront "${storeSlug}" Not Yet Published`}
            description={`The storefront handle "rentiuse.com/${storeSlug}" is currently unclaimed. Are you the owner of this creative studio or rental business? Register today to establish your verified storefront.`}
            actionLabel={`Claim and Create rentiuse.com/${storeSlug}`}
            actionTo={`/register/owner`}
          />
        </Container>
      </div>
    );
  }

  const storeUrl = `https://rentiuse.com/${storeData.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="storefront-page" style={{ paddingBottom: '80px' }}>
      
      {/* Subdomain Notice Strip */}
      <div style={{ backgroundColor: 'var(--color-lavender)', borderBottom: '1px solid var(--color-lavender-dark)', padding: '10px 24px', textAlign: 'center', fontSize: '0.85rem' }}>
        <span>Viewing Verified Merchant Storefront: </span>
        <strong style={{ color: 'var(--color-primary-dark)', fontFamily: 'monospace' }}>
          rentiuse.com/{storeData.slug}
        </strong>
      </div>

      {/* Hero Banner Header */}
      <section style={{ position: 'relative', height: '260px', overflow: 'hidden', backgroundColor: 'var(--color-ink)' }}>
        <img 
          src={storeData.bannerImage || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'} 
          alt={storeData.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(23, 21, 38, 0.85) 0%, rgba(23, 21, 38, 0.2) 100%)' }} />

        <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0 }}>
          <Container>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
                <img 
                  src={storeData.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                  alt={storeData.name} 
                  style={{ 
                    width: '90px', 
                    height: '90px', 
                    borderRadius: '20px', 
                    border: '3px solid #FFFFFF', 
                    objectFit: 'cover',
                    boxShadow: 'var(--shadow-lg)'
                  }} 
                />

                <div style={{ color: '#FFFFFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>Verified Owner Store</span>
                    <span style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>Joined {storeData.joinedDate || '2026'}</span>
                  </div>
                  <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, lineHeight: 1.2 }}>
                    {storeData.name}
                  </h1>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="secondary" size="sm" onClick={handleCopyLink} icon={copiedLink ? <Check size={14} color="#10B981" /> : <Copy size={14} />}>
                  {copiedLink ? 'Link Copied!' : 'Copy Storefront Link'}
                </Button>
              </div>

            </div>
          </Container>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '36px 0' }}>
        <Container>
          
          {/* Metadata Card */}
          <div className="card-surface" style={{ padding: '20px 28px', marginBottom: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>Location</span>
              <strong style={{ fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="var(--color-primary)" /> {storeData.location || 'Nigeria'}
              </strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>Verification Status</span>
              <strong style={{ fontSize: '0.92rem', color: '#065F46', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={15} color="#10B981" /> Verified Owner Store
              </strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>Payment Currency</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary-dark)' }}>Nigerian Naira (₦ NGN)</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>Booking Policy</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={15} color="var(--color-primary)" /> Online Payment & Host Approval
              </strong>
            </div>
          </div>

          {/* Store Bio */}
          {storeData.bio && (
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>About This Store</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', maxWidth: '820px', lineHeight: 1.65 }}>
                {storeData.bio || storeData.tagline}
              </p>
            </div>
          )}

          {/* Listings Collection */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                Available Rentals ({storeData.listings?.length || 0})
              </h3>
            </div>

            {(!storeData.listings || storeData.listings.length === 0) ? (
              <div style={{ padding: '48px 24px', textAlign: 'center', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <Clock size={32} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>Catalog Under Preparation</h4>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 20px', fontSize: '0.92rem' }}>
                  This host is currently curating and submitting their rental listings for administrator verification. Approved items will appear here automatically.
                </p>
                <Link to="/search" className="btn btn-outline-purple btn-sm">
                  Explore Other Marketplace Categories
                </Link>
              </div>
            ) : (
              <div className="grid-listings">
                {storeData.listings.map(item => (
                  <ListingCard key={item.id} listing={item} showOwner={false} />
                ))}
              </div>
            )}
          </div>

        </Container>
      </section>

    </div>
  );
}
