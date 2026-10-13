import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Building2, Aperture, Users } from 'lucide-react';
import Container from '../components/common/Container';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function AboutView() {
  return (
    <div className="about-view" style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '56px 0 40px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "About Us" }]} />

          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-lavender)', color: 'var(--color-primary-dark)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
              <Sparkles size={14} /> ABOUT RENTIUSE
            </div>
            <h1 style={{ marginBottom: '18px', lineHeight: 1.2 }}>
              Connecting Nigerian creators with the resources they need to work.
            </h1>
            <p style={{ fontSize: '1.18rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              Work shouldn't be limited by what you own. RENTIUSE is built to bridge the gap between people who need productive workspaces and equipment, and the individuals and businesses that have them sitting idle.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Editorial Content */}
      <section style={{ padding: '64px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '12px' }}>OUR PURPOSE</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '18px' }}>
                The Challenge of Accessing Production Resources
              </h2>
              <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '16px' }}>
                Getting work done frequently demands access to high-caliber physical infrastructure: an acoustically calibrated soundstage, a multi-camera podcast suite, or an 8K digital cinema package. Yet in Nigeria, these assets are often fragmented across disparate contacts, word-of-mouth recommendations, and social media DMs.
              </p>
              <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.7 }}>
                Buying high-end production equipment outright requires enormous capital outlays that make little financial sense for periodic projects. Meanwhile, commercial facilities and certified equipment owners face gaps in booking calendars where valuable assets sit unused.
              </p>
            </div>
            
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '380px' }}>
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80" 
                alt="Professional studio setup in Nigeria" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
            <div style={{ order: 2 }}>
              <span className="badge badge-purple" style={{ marginBottom: '12px' }}>THE PLATFORM</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '18px' }}>
                Connecting Renters and Resource Owners
              </h2>
              <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '16px' }}>
                RENTIUSE provides an open, trusted multi-vendor marketplace designed specifically for the Nigerian commercial landscape. Renters can view exact specifications, compare transparent hourly and daily rates in Naira, and request bookings directly.
              </p>
              <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.7 }}>
                For resource owners, RENTIUSE offers custom digital storefronts, calendar-aware availability controls, online payment protection, and complete approval authority over every reservation before equipment or access is handed over.
              </p>
            </div>

            <div style={{ order: 1, borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '380px' }}>
              <img 
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80" 
                alt="Cinema cameras and filming gear" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '64px' }}>
            <div className="card-surface" style={{ padding: '36px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-lavender)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                To empower individuals, creators, and businesses to access the physical resources they need on demand—without the prohibitive cost and friction of permanent ownership.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '36px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-lavender)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Our Long-Term Vision</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                To establish Africa’s premier shared-resource economy, where creative spaces, film gear, machinery, and workstations can be seamlessly discovered, protected, and monetized.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '36px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-lavender)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Trust & Transparency</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                We believe in honest technology. In Phase 1, our marketplace foundation is built cleanly with transparent booking statuses, upfront Naira pricing, and owner approval safeguards.
              </p>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div 
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-xl)', 
              padding: '48px 36px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
              Ready to get started with RENTIUSE?
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 28px', fontSize: '1rem', lineHeight: 1.6 }}>
              Whether you need to rent a studio space for your shoot tomorrow, or you want to monetize underutilized equipment you already own, RENTIUSE is built for you.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button to="/search" variant="primary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                Explore Rentals
              </Button>
              <Button to="/register/owner" variant="secondary" size="lg">
                List Your Resources as an Owner
              </Button>
            </div>
          </div>

        </Container>
      </section>

    </div>
  );
}
