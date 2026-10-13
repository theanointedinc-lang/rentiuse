import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, ArrowRight, Store } from 'lucide-react';
import PriceDisplay from './PriceDisplay';
import RatingBadge from './RatingBadge';

export default function ListingCard({ listing, showOwner = true }) {
  if (!listing) return null;

  const detailPath = listing.type === 'studio' 
    ? `/studios/${listing.slug}` 
    : `/equipment/${listing.slug}`;

  const coverImage = listing.images?.[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80';
  const locationString = typeof listing.location === 'object' 
    ? `${listing.location.area || listing.location.city}, ${listing.location.state}`
    : listing.location;

  return (
    <article className="card-interactive" style={{ height: '100%' }}>
      {/* Media Header */}
      <Link to={detailPath} style={{ position: 'relative', display: 'block', height: '220px', overflow: 'hidden', backgroundColor: '#E5E7EB' }}>
        <img
          src={coverImage}
          alt={listing.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          loading="lazy"
        />

        {/* Floating Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span className="badge badge-white">
            {listing.categoryName || listing.category}
          </span>
          {listing.isFeatured && (
            <span className="badge badge-purple">
              Featured
            </span>
          )}
        </div>

        {/* Demo Tag for honest Phase 1 transparency */}
        {listing.isDemo && (
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'rgba(23, 21, 38, 0.75)', color: '#FFFFFF', backdropFilter: 'blur(4px)' }}>
              DEMO LISTING
            </span>
          </div>
        )}
      </Link>

      {/* Card Content Body */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Location & Rating Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
              <MapPin size={13} color="var(--color-primary)" />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                {locationString}
              </span>
            </div>
            <RatingBadge rating={listing.rating} reviewCount={listing.reviewCount} size="sm" />
          </div>

          {/* Title */}
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '8px' }}>
            <Link to={detailPath} style={{ color: 'var(--color-ink)', textDecoration: 'none' }}>
              {listing.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p style={{ 
            fontSize: '0.86rem', 
            color: 'var(--color-text-muted)', 
            lineHeight: 1.5, 
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {listing.shortDescription}
          </p>

          {/* Owner info */}
          {showOwner && listing.owner && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '6px 10px', background: 'var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
              <Store size={13} color="var(--color-primary)" />
              <span style={{ color: 'var(--color-text-muted)' }}>Store:</span>
              <strong style={{ color: 'var(--color-ink)' }}>{listing.owner.storeName || listing.owner.name}</strong>
              {listing.owner.verified && <ShieldCheck size={13} color="#10B981" title="Verified Owner" />}
            </div>
          )}
        </div>

        {/* Pricing & CTA Footer */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <PriceDisplay pricing={listing.pricing} period={listing.pricing?.rentalUnit === 'day' ? 'day' : 'hour'} size="md" />
          </div>

          <Link 
            to={detailPath}
            className="btn btn-outline-purple btn-sm"
            style={{ textDecoration: 'none' }}
          >
            <span>View Details</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
