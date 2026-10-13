import React, { useState } from 'react';
import ItemCard from './ItemCard';
import { formatNaira, MOCK_REVIEWS } from '../data/mockData';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageSquare, 
  Tag, 
  Building2, 
  Wrench,
  Share2
} from 'lucide-react';

export default function StorefrontView({ store, onSelectItem, onBackToMarketplace }) {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  if (!store) return null;

  const subdomainUrl = `https://rentiuse.com/${store.slug}`;

  const copyStoreLink = () => {
    navigator.clipboard.writeText(subdomainUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Get unique collections present in this store
  const storeCollections = Array.from(
    new Set(store.listings.map(item => item.collection).filter(Boolean))
  );

  // Filter listings by collection
  const filteredListings = store.listings.filter(item => {
    if (selectedCollection === 'all') return true;
    return item.collection === selectedCollection;
  });

  return (
    <div className="animate-fade-in">
      {/* Subdomain Notice Strip */}
      <div style={{ background: 'rgba(99, 102, 241, 0.12)', borderBottom: '1px solid rgba(99, 102, 241, 0.3)', padding: '10px 24px', textAlign: 'center', fontSize: '0.88rem' }}>
        You are currently viewing <strong style={{ color: '#a5b4fc' }}>{store.name}</strong> on custom subdomain{' '}
        <span className="badge-pill badge-indigo" style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>
          {store.slug}.rentiuse.com
        </span>
      </div>

      {/* Store Header Cover */}
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: '#0f172a' }}>
        <img 
          src={store.bannerImage} 
          alt={store.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(180deg, rgba(7,9,19,0.2) 0%, rgba(7,9,19,0.9) 100%)' 
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            
            {/* Store Avatar & Info */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
              <img 
                src={store.ownerAvatar} 
                alt={store.ownerName} 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '24px', 
                  border: '4px solid #070913', 
                  objectFit: 'cover',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge-pill badge-emerald">Verified Storefront</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Joined {store.joinedDate}</span>
                </div>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
                  {store.name}
                </h1>
                <p style={{ color: '#a5b4fc', fontSize: '1rem', fontWeight: 500 }}>
                  {store.tagline}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="btn-secondary" onClick={copyStoreLink}>
                {copiedLink ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                {copiedLink ? 'Link Copied!' : 'Copy Store Link'}
              </button>
              <button className="btn-primary" onClick={() => setContactModalOpen(true)}>
                <MessageSquare size={16} /> Contact Store Owner
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Store Content Layout */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px 80px' }}>
        
        {/* Store Metadata Bar */}
        <div className="glass-panel" style={{ padding: '20px 28px', marginBottom: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Store Domain Slug</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#818cf8', fontFamily: 'monospace' }}>
              rentiuse.com/{store.slug}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Location & Payout Currency</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#f59e0b" /> {store.location} (₦ Naira)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Store Rating</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={15} color="#f59e0b" fill="#f59e0b" />
              <span>{store.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({store.reviewCount} reviews)</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Protection Guarantee</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={16} /> Rentiuse Verified ₦ Security
            </div>
          </div>
        </div>

        {/* Store Bio */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>About {store.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '850px', lineHeight: 1.6 }}>
            {store.bio}
          </p>
        </div>

        {/* COLLECTIONS FILTER TABS */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Tag size={16} color="#818cf8" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Store Collections</h3>
          </div>

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px' }}>
            <button 
              className={`btn-secondary ${selectedCollection === 'all' ? 'btn-outline-glow' : ''}`}
              onClick={() => setSelectedCollection('all')}
              style={{ borderRadius: '999px', fontSize: '0.85rem' }}
            >
              All Items ({store.listings.length})
            </button>

            {storeCollections.map(col => (
              <button 
                key={col}
                className={`btn-secondary ${selectedCollection === col ? 'btn-outline-glow' : ''}`}
                onClick={() => setSelectedCollection(col)}
                style={{ borderRadius: '999px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                {col} ({store.listings.filter(i => i.collection === col).length})
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px', marginBottom: '64px' }}>
          {filteredListings.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              ownerStore={store} 
              onSelectItem={onSelectItem} 
              onVisitStore={() => {}} 
            />
          ))}
        </div>

      </main>
    </div>
  );
}
