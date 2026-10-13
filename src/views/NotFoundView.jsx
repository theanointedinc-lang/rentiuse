import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Building2, Aperture, HelpCircle } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

export default function NotFoundView() {
  return (
    <div className="not-found-view" style={{ padding: '80px 0', minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <Container narrow>
        <div 
          className="card-surface" 
          style={{ 
            padding: '60px 32px', 
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div 
            style={{ 
              width: '72px', 
              height: '72px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-lavender)', 
              color: 'var(--color-primary-dark)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '1.8rem',
              fontWeight: 800
            }}
          >
            404
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '14px' }}>
            Page Not Found
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 32px' }}>
            The page or resource you are looking for does not exist or may have been moved. Let's get you back on track to explore rentals.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <Button to="/" variant="primary" size="lg" icon={<Home size={18} />}>
              Back to Homepage
            </Button>
            <Button to="/search" variant="secondary" size="lg" icon={<Compass size={18} />}>
              Explore Marketplace
            </Button>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '24px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '0.88rem' }}>
            <Link to="/studios" style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <Building2 size={14} /> Browse Studios
            </Link>
            <Link to="/equipment" style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <Aperture size={14} /> Browse Equipment
            </Link>
            <Link to="/help" style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <HelpCircle size={14} /> Help Center
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
