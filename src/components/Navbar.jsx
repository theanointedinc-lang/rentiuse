import React from 'react';
import { 
  Building2, 
  PlusCircle, 
  LogIn, 
  Store,
  Globe,
  Sparkles,
  LogOut,
  User
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  onOpenCreateStore,
  onOpenAuth,
  currentUser,
  onSignOut,
  activeStoreSlug,
  stores
}) {
  const activeStore = stores[activeStoreSlug];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }} className="glass-panel">
      
      {/* Subdomain Notice Strip */}
      {activeStore && currentTab === 'storefront' && (
        <div style={{ background: 'rgba(99, 102, 241, 0.15)', borderBottom: '1px solid rgba(99, 102, 241, 0.3)', padding: '6px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span>Viewing Store Subdomain: <strong style={{ color: '#818cf8', fontFamily: 'monospace' }}>rentiuse.com/{activeStore.slug}</strong></span>
          </div>
          <button 
            onClick={() => setCurrentTab('marketplace')} 
            style={{ background: 'none', border: 'none', color: '#a5b4fc', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem' }}
          >
            ← Back to RENTIUSE Main Website
          </button>
        </div>
      )}

      {/* Main Header Container */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => setCurrentTab('marketplace')}
        >
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Building2 size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              RENTIUSE
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '-2px' }}>
              Spaces & Equipment Platform (NG)
            </div>
          </div>
        </div>

        {/* Website Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            style={{ background: 'none', border: 'none', color: currentTab === 'marketplace' ? '#a5b4fc' : 'var(--text-white)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}
            onClick={() => setCurrentTab('marketplace')}
          >
            Home
          </button>

          <button 
            style={{ background: 'none', border: 'none', color: currentTab === 'about' ? '#a5b4fc' : 'var(--text-white)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}
            onClick={() => setCurrentTab('about')}
          >
            Why Rentiuse
          </button>

          <a 
            href="#how-it-works"
            onClick={() => setCurrentTab('marketplace')}
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
          >
            How It Works
          </a>

          <a 
            href="#explore"
            onClick={() => setCurrentTab('marketplace')}
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
          >
            Spaces & Tools
          </a>

          <a 
            href="#pricing"
            onClick={() => setCurrentTab('marketplace')}
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
          >
            Pricing & Features
          </a>

          {activeStore && (
            <button 
              className="btn-secondary" 
              onClick={() => setCurrentTab('dashboard')}
              style={{ fontSize: '0.85rem', padding: '6px 14px', borderColor: '#818cf8', color: '#a5b4fc' }}
            >
              <Store size={14} /> My Dashboard
            </button>
          )}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentUser ? (
            /* Logged-in User Chip & Sign Out */
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: '999px', fontSize: '0.85rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontWeight: 700, color: 'white' }}>{currentUser.fullName || currentUser.email}</span>
              </div>

              <button className="btn-primary" onClick={() => setCurrentTab('dashboard')} style={{ fontSize: '0.88rem' }}>
                <Store size={15} /> Dashboard
              </button>

              <button 
                className="btn-secondary" 
                onClick={onSignOut}
                style={{ padding: '8px 12px', fontSize: '0.82rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            /* Logged-out Action Buttons */
            <>
              <button className="btn-secondary" onClick={onOpenAuth} style={{ fontSize: '0.9rem' }}>
                <LogIn size={16} /> Sign In
              </button>
              <button className="btn-primary" onClick={onOpenCreateStore} style={{ fontSize: '0.9rem' }}>
                <PlusCircle size={16} /> Create Your Store
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
