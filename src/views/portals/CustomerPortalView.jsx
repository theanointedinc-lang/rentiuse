import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Bookmark, User, ShieldCheck, Info, Calendar } from 'lucide-react';
import Container from '../../components/common/Container';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';

export default function CustomerPortalView({ tab = 'bookings' }) {
  const location = useLocation();

  const navItems = [
    { id: 'bookings', label: 'My Bookings & Rentals', path: '/account/bookings', icon: Clock },
    { id: 'saved', label: 'Saved Resources', path: '/account/saved', icon: Bookmark },
    { id: 'settings', label: 'Profile & Settings', path: '/account/settings', icon: User }
  ];

  return (
    <div className="customer-portal-view" style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '36px 0 24px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "My Account" }, { label: tab.toUpperCase() }]} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-purple">CUSTOMER ACCOUNT</span>
                <span className="badge badge-outline">Phase 1 Architecture</span>
              </div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800 }}>
                Renter Account & Bookings
              </h1>
            </div>

            <div>
              <Link to="/search" className="btn btn-primary btn-sm">
                <span>Browse Rentals</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '36px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr)) 3fr', gap: '32px', alignItems: 'flex-start' }}>
            
            {/* Nav */}
            <aside className="card-surface" style={{ padding: '16px' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || tab === item.id;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`btn btn-full ${isActive ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ justifyContent: 'flex-start', padding: '10px 14px', fontSize: '0.9rem' }}
                    >
                      <Icon size={17} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div className="notice-box notice-info">
                <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.94rem', marginBottom: '4px' }}>
                    Customer Portal Foundation (Section 19)
                  </strong>
                  <p style={{ fontSize: '0.86rem', margin: 0, lineHeight: 1.55 }}>
                    In Phase 1, customer routes are organized and accessible. Server-enforced authentication, JWT session validation, and real customer booking history will be bound during Phase 2 backend integration.
                  </p>
                </div>
              </div>

              {/* Sample Booking Status Representation */}
              <div className="card-surface" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
                  Booking Lifecycle Demonstration
                </h3>
                <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Acoustic Wave Podcast & Broadcast Suite</h4>
                    <StatusBadge status="awaiting_approval" />
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                    Host Store: <strong>SoundWave Studios Lekki</strong> • Scheduled: <strong>Next Friday (10:00 AM)</strong>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.45 }}>
                    Payment has been verified online. Awaiting host confirmation. Once the host accepts, check-in instructions and direct host telephone line will be unlocked here.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}
