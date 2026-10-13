import React, { useState } from 'react';
import { Search, Sparkles, Building2, Wrench, ArrowRight, ShieldCheck, Zap, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function MarketplaceHero({ onSearch, onOpenCreateStore, onOpenAuth }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <section style={{ padding: '70px 24px 50px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow Ambient background */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '750px',
        height: '420px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(7, 9, 19, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="badge-pill badge-indigo" style={{ marginBottom: '24px', display: 'inline-flex' }}>
          <Sparkles size={14} /> Productive Spaces, Equipment & Product Rentals (Nigeria)
        </div>

        <h1 style={{ fontSize: '3.6rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
          Rent & Monetize <span className="gradient-text">Spaces, Equipment & Products</span> in Naira (₦).
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '780px', margin: '0 auto 40px', lineHeight: 1.6 }}>
          The premier marketplace connecting space hosts, equipment owners, and creators. Launch your branded storefront (e.g. <strong style={{ color: '#a5b4fc' }}>rentiuse.com/yourbrand</strong>), schedule date & time of use, and take instant bookings effortlessly.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          <button className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem', fontWeight: 800 }} onClick={onOpenCreateStore}>
            <PlusCircle size={20} /> Create Your Store Free
          </button>

          <button className="btn-secondary" style={{ padding: '16px 28px', fontSize: '1.05rem' }} onClick={onOpenAuth}>
            Sign In to Merchant Dashboard
          </button>
        </div>

        {/* Feature Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#10b981" /> Verified Space & Equipment Storefronts
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="#f59e0b" /> Slash Prices & Collections in Naira (₦)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#6366f1" /> Date & Time of Use Scheduling
          </span>
        </div>
      </div>
    </section>
  );
}
