import React from 'react';
import { ExternalLink, Star, MapPin, CheckCircle2, Building2, Wrench } from 'lucide-react';

export default function StorefrontCard({ store, onVisitStore }) {
  return (
    <div className="glass-card" style={{ padding: '20px', borderRadius: '18px', position: 'relative' }}>
      {/* Banner & Avatar Row */}
      <div style={{ position: 'relative', height: '90px', borderRadius: '12px', overflow: 'hidden', marginBottom: '36px' }}>
        <img 
          src={store.bannerImage} 
          alt={store.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.7) 100%)' 
        }} />

        {/* Subdomain Badge */}
        <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <span className="badge-pill badge-indigo" style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(4px)' }}>
            {store.slug}.rentiuse.com
          </span>
        </div>

        {/* Avatar floating overlapping banner */}
        <div style={{ position: 'absolute', bottom: '-24px', left: '16px' }}>
          <img 
            src={store.ownerAvatar} 
            alt={store.ownerName} 
            style={{ 
              width: '54px', 
              height: '54px', 
              borderRadius: '50%', 
              border: '3px solid #0f172a', 
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}
          />
        </div>
      </div>

      {/* Store Information */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{store.name}</h3>
          <CheckCircle2 size={16} color="#10b981" />
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {store.tagline || store.bio}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={13} /> {store.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={13} color="#f59e0b" fill="#f59e0b" /> {store.rating} ({store.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Featured Items Pill Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: 'auto' }}>
        <span style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600 }}>
          {store.listings.length} Active Listings
        </span>

        <button 
          className="btn-outline-glow" 
          style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => onVisitStore(store.slug)}
        >
          Visit Storefront <ExternalLink size={13} />
        </button>
      </div>
    </div>
  );
}
