import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Aperture, ShieldCheck, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import Container from './Container';

export default function Footer() {
  return (
    <footer 
      style={{ 
        backgroundColor: 'var(--color-ink)', 
        color: '#E5E7EB', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '64px',
        paddingBottom: '40px',
        marginTop: 'auto'
      }}
    >
      <Container>
        {/* Top 4-Column Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Column 1: Brand & Core Mission */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Logo variant="dark" size="lg" />
            </div>

            <p style={{ fontSize: '0.92rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '16px' }}>
              Access the resources you need to work. Nigeria's premier rental marketplace for creative studios, production spaces, and professional equipment.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(117, 72, 219, 0.2)', border: '1px solid rgba(117, 72, 219, 0.4)', fontSize: '0.8rem', color: '#F1ECFF' }}>
              <span>🇳🇬 Launch Market: Nigeria First (NGN)</span>
            </div>
          </div>

          {/* Column 2: Explore Rentals */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '18px', letterSpacing: '-0.01em' }}>
              Explore Rentals
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li>
                <Link to="/studios" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Photography Studios
                </Link>
              </li>
              <li>
                <Link to="/studios" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Podcast Suites
                </Link>
              </li>
              <li>
                <Link to="/studios" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Video Soundstages
                </Link>
              </li>
              <li>
                <Link to="/equipment" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Cameras & Cinema Rigs
                </Link>
              </li>
              <li>
                <Link to="/equipment" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Lighting & Grip Gear
                </Link>
              </li>
              <li>
                <Link to="/equipment" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Audio & Sound Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Story */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '18px', letterSpacing: '-0.01em' }}>
              About RENTIUSE
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li>
                <Link to="/why-rentiuse" style={{ color: '#F1ECFF', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Why We Started RENTIUSE
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Contact Us & Support
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link to="/register/owner" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  List Your Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Policies */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '18px', letterSpacing: '-0.01em' }}>
              Trust & Policies
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li>
                <Link to="/cancellation-policy" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = '#FFFFFF'} onMouseOut={(e) => e.target.style.color = '#9CA3AF'}>
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div style={{ marginTop: '24px', padding: '14px', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                <ShieldCheck size={16} /> Owner Booking Approval
              </div>
              <p style={{ fontSize: '0.78rem', color: '#9CA3AF', lineHeight: 1.45, margin: 0 }}>
                Every reservation requires owner approval after payment to protect inventory and schedule accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.84rem',
            color: '#9CA3AF'
          }}
        >
          <div>
            © 2026 RENTIUSE Technologies Ltd. All rights reserved.
          </div>

          <div style={{ color: '#F1ECFF', fontWeight: 600 }}>
            Work Shouldn't Be Limited by What You Own.
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/terms" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Terms</Link>
            <Link to="/privacy" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/cancellation-policy" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Refunds</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
