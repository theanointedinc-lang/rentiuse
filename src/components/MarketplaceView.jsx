import React, { useState } from 'react';
import MarketplaceHero from './MarketplaceHero';
import ItemCard from './ItemCard';
import StorefrontCard from './StorefrontCard';
import { SAMPLE_CATEGORIES, MOCK_SEED_STORE } from '../data/mockData';
import { 
  Building2, 
  Wrench, 
  Store, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  PlusCircle,
  ArrowRight,
  Filter,
  CheckCircle2,
  HelpCircle,
  Tag,
  DollarSign
} from 'lucide-react';

export default function MarketplaceView({ 
  stores, 
  onSelectItem, 
  onVisitStore, 
  onOpenCreateStore, 
  onOpenAuth,
  onLoadDemoStore,
  onNavigateToAbout
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const storeList = Object.values(stores);

  // Flatten all listings across stores for marketplace feed
  const allListings = storeList.flatMap(store => 
    store.listings.map(listing => ({ ...listing, ownerStore: store }))
  );

  // Filter listings
  const filteredListings = allListings.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory || item.subcategory === selectedCategory;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div>
      {/* Landing Page Hero Header */}
      <MarketplaceHero 
        onSearch={(query) => setSearchQuery(query)}
        onOpenCreateStore={onOpenCreateStore}
        onOpenAuth={onOpenAuth}
      />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        
        {/* WHY WE STARTED RENTIUSE BANNER */}
        <section style={{ padding: '40px 0 20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '24px',
            padding: '36px 32px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ maxWidth: '720px' }}>
              <span className="badge-pill badge-indigo" style={{ marginBottom: '12px' }}>
                <Sparkles size={13} /> Our Story & Mission
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
                Why We Started RENTIUSE — Work Shouldn’t Be Limited by What You Own
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6 }}>
                People need access to studios, equipment, and workspaces to work, while many of those resources are sitting unused. Rentiuse bridges that gap.
              </p>
            </div>

            <button 
              className="btn-primary" 
              style={{ padding: '12px 24px', fontSize: '0.95rem', whiteSpace: 'nowrap' }}
              onClick={onNavigateToAbout}
            >
              Read Our Full Story <ArrowRight size={16} />
            </button>
          </div>
        </section>
        
        {/* SECTION 1: HOW IT WORKS (Business Owner Workflow) */}
        <section id="how-it-works" style={{ padding: '60px 0', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
            <span className="badge-pill badge-emerald" style={{ marginBottom: '12px' }}>
              <Sparkles size={13} /> Simplified Merchant Platform
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
              How RENTIUSE Works For Business Owners
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Set up your online rental store, organize items into collections, set slash prices (₦), and collect rental revenue effortlessly.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '32px', borderRadius: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc', fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>Create Account & Subdomain</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Register your business and choose your custom store subdomain slug (e.g. <strong style={{ color: '#818cf8' }}>rentiuse.com/yourname</strong>).
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '32px', borderRadius: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>Add Products & Collections</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Upload spaces and equipment. Group items into custom collections and add slash pricing discounts in Naira (₦).
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '32px', borderRadius: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>Receive Bookings & Auto Payouts</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Accept bookings from verified clients. Earnings are paid directly into your Nigerian bank account.
              </p>
            </div>

          </div>
        </section>


        {/* SECTION 2: FEATURED STORES & EXPLORE */}
        <section id="explore" style={{ padding: '60px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge-pill badge-indigo" style={{ marginBottom: '8px' }}>
                <Store size={13} /> Active Merchant Storefronts
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Explore Businesses on RENTIUSE</h2>
            </div>
            
            <button className="btn-primary" onClick={onOpenCreateStore}>
              <PlusCircle size={16} /> Create Your Store Now
            </button>
          </div>

          {/* If No Stores Exist Yet */}
          {storeList.length === 0 ? (
            <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 100%)', border: '1px dashed rgba(99,102,241,0.4)', borderRadius: '24px', marginBottom: '48px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Store size={32} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px' }}>No Published Stores Yet</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Be the first business owner to launch your online store on RENTIUSE and start accepting rental bookings!
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary" style={{ padding: '12px 28px' }} onClick={onOpenCreateStore}>
                  <PlusCircle size={18} /> Launch Your Store Now
                </button>
                <button className="btn-secondary" style={{ padding: '12px 24px' }} onClick={onLoadDemoStore}>
                  <Sparkles size={16} color="#34d399" /> Load Sample Store Demo
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '48px' }}>
              {storeList.map(store => (
                <StorefrontCard key={store.id} store={store} onVisitStore={onVisitStore} />
              ))}
            </div>
          )}

          {/* Available Rental Items Feed if items exist */}
          {allListings.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>Available Spaces & Equipment</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
                {filteredListings.map(item => (
                  <ItemCard 
                    key={item.id} 
                    item={item} 
                    ownerStore={item.ownerStore}
                    onSelectItem={onSelectItem} 
                    onVisitStore={onVisitStore}
                  />
                ))}
              </div>
            </div>
          )}
        </section>


        {/* SECTION 3: PRICING & FEATURES SUMMARY */}
        <section id="pricing" className="glass-panel" style={{ padding: '56px 40px', background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.85) 100%)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <span className="badge-pill badge-emerald" style={{ marginBottom: '12px' }}>
              Simple Transparent Pricing
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px' }}>
              Everything You Need To Scale Your Business
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              0% Store Creation Fee. Set up your custom store subdomain and start taking bookings today.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} /> Custom Subdomain Storefront
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Get your own custom web address (e.g. <strong style={{ color: '#818cf8' }}>rentiuse.com/yourname</strong>) to share with clients on Instagram, WhatsApp, or email.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag size={18} /> Collections & Slash Prices
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Organize inventory into collections, display struck-through original prices with discount slash prices in Nigerian Naira (₦).
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} /> Instant Direct Payouts
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Receive payments safely in Naira (₦). Payouts are transferred automatically to your preferred bank account upon booking confirmation.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
