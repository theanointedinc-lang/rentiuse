import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Aperture, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ChevronDown,
  PlusCircle,
  Eye,
  Layers
} from 'lucide-react';
import Container from '../components/common/Container';
import SearchBar from '../components/common/SearchBar';
import SectionHeader from '../components/common/SectionHeader';
import CategoryCard from '../components/common/CategoryCard';
import ListingCard from '../components/common/ListingCard';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { ALL_CATEGORIES } from '../data/categoriesData';
import { 
  getAllListings, 
  getFeaturedListings, 
  getRecentlyAddedListings,
  isDemoPreviewEnabled,
  setDemoPreviewEnabled 
} from '../data/listingsData';
import { FAQS_DATA } from '../data/faqData';

export default function HomeView() {
  const [openFaqId, setOpenFaqId] = useState(FAQS_DATA[0]?.id || null);
  const [demoEnabled, setDemoEnabled] = useState(isDemoPreviewEnabled());
  const [listingsVersion, setListingsVersion] = useState(0);

  // Listen for storage changes
  useEffect(() => {
    const handleUpdate = () => {
      setDemoEnabled(isDemoPreviewEnabled());
      setListingsVersion(v => v + 1);
    };
    window.addEventListener('rentiuse_listings_updated', handleUpdate);
    return () => window.removeEventListener('rentiuse_listings_updated', handleUpdate);
  }, []);

  const allApproved = getAllListings();
  const featuredListings = getFeaturedListings();
  const recentListings = getRecentlyAddedListings();

  const toggleFaq = (id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  const handleToggleDemo = () => {
    const next = !demoEnabled;
    setDemoEnabled(next);
    setDemoPreviewEnabled(next);
  };

  return (
    <div className="home-view" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>
      
      {/* 1. HERO SECTION */}
      <section 
        style={{ 
          position: 'relative', 
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          paddingTop: 'clamp(48px, 8vw, 84px)',
          paddingBottom: 'clamp(56px, 10vw, 96px)',
          backgroundImage: 'radial-gradient(ellipse at 50% -20%, rgba(117, 72, 219, 0.12) 0%, rgba(255, 255, 255, 0) 70%)'
        }}
      >
        <Container>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
            
            {/* Mission Tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-lavender)', color: 'var(--color-primary-dark)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px', border: '1px solid var(--color-lavender-dark)' }}>
              <Sparkles size={14} />
              <span>Nigeria's Premier Space & Equipment Rental Marketplace</span>
            </div>

            {/* Required Hero Headline */}
            <h1 style={{ marginBottom: '20px', lineHeight: 1.15 }}>
              Everything you need to create.{' '}
              <span style={{ color: 'var(--color-primary)' }}>
                Nothing you need to own.
              </span>
            </h1>

            {/* Required Supporting Text */}
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.28rem)', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 32px' }}>
              Discover professional studios, creative spaces and equipment available to rent for your next project.
            </p>

            {/* Hero CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '44px' }}>
              <Button to="/search" variant="primary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                Explore Rentals
              </Button>
              <Button to="/register/owner" variant="secondary" size="lg" icon={<PlusCircle size={18} />}>
                List Your Resources
              </Button>
            </div>

            {/* Search Bar Interface */}
            <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'left' }}>
              <SearchBar />
            </div>

          </div>

          {/* Value Props Strip */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '24px', 
              paddingTop: '32px',
              borderTop: '1px solid var(--color-border-subtle)',
              maxWidth: '980px',
              margin: '0 auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-lavender)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)', flexShrink: 0 }}>
                <Building2 size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--color-ink)' }}>Verified Studios</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Acoustic suites & soundstages</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-lavender)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)', flexShrink: 0 }}>
                <Aperture size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--color-ink)' }}>Cinema & Audio Gear</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>8K cameras, lights & kits</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-lavender)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--color-ink)' }}>Owner Approval Required</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Protected inventory & dates</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. CATEGORY DISCOVERY SECTION */}
      <section>
        <Container>
          <SectionHeader
            badge="Categories"
            title="Browse by Rental Category"
            subtitle="Find the exact production space or high-performance equipment suited to your creative workflow."
            action={
              <Link to="/search" className="btn btn-outline-purple btn-sm">
                <span>View All Categories</span>
                <ArrowRight size={14} />
              </Link>
            }
          />

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
              gap: '20px' 
            }}
          >
            {ALL_CATEGORIES.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. FEATURED RESOURCES / EMPTY ONBOARDING SECTION */}
      <section>
        <Container>
          {featuredListings.length > 0 ? (
            <>
              <SectionHeader
                badge="Approved Listings"
                title="Featured Studios & Equipment"
                subtitle="Explore verified commercial soundstages and production packages available across Nigeria."
                action={
                  <Link to="/studios" className="btn btn-outline btn-sm">
                    <span>Explore Studios</span>
                    <ArrowRight size={14} />
                  </Link>
                }
              />
              <div className="grid-listings">
                {featuredListings.slice(0, 6).map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          ) : (
            <div 
              className="card-surface" 
              style={{ 
                padding: '56px 32px', 
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative'
              }}
            >
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--color-lavender)', 
                  color: 'var(--color-primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 20px' 
                }}
              >
                <Layers size={32} />
              </div>

              <div style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-lavender)', color: 'var(--color-primary-dark)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px' }}>
                MARKETPLACE ONBOARDING IN PROGRESS
              </div>

              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '12px' }}>
                Be Among the First to List Your Resources
              </h2>

              <p style={{ color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 28px', fontSize: '1rem', lineHeight: 1.65 }}>
                RENTIUSE connects Nigerian creators with physical studios and equipment. Every listing is reviewed by administrators before publication to maintain verified standards. Do you own a studio, podcast room, or camera package?
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button to="/register/owner" variant="primary" size="lg" icon={<PlusCircle size={18} />}>
                  List Your Resources as an Owner
                </Button>
                <Button to="/why-rentiuse" variant="secondary" size="lg">
                  Why We Started RENTIUSE
                </Button>
              </div>

              {/* Developer / Design System Preview Toggle (Transparent) */}
              <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--color-border-subtle)', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                <span>Developer Visual Demonstration Mode:</span>
                <button
                  type="button"
                  onClick={handleToggleDemo}
                  style={{
                    background: demoEnabled ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                    color: demoEnabled ? '#FFFFFF' : 'var(--color-ink)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '3px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Eye size={12} />
                  <span>{demoEnabled ? 'Demo Mode Active' : 'Enable Demo Preview'}</span>
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* 4. HOW RENTIUSE WORKS SECTION */}
      <section 
        style={{ 
          backgroundColor: '#FFFFFF', 
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          padding: '80px 0' 
        }}
      >
        <Container>
          <SectionHeader
            align="center"
            badge="Booking Lifecycle"
            title="How RENTIUSE Works"
            subtitle="Accessing resources shouldn't be complicated. Our three-step workflow ensures verified payments and protected host availability."
          />

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '32px',
              marginTop: '48px'
            }}
          >
            {/* Step 1 */}
            <div className="card-surface" style={{ padding: '32px 24px', textAlign: 'center', position: 'relative' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  background: 'var(--color-lavender)', 
                  color: 'var(--color-primary-dark)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '0 auto 20px'
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                Discover a Resource
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Browse verified photography studios, soundstages, cameras, and audio rigs. Review specifications, inclusions, and rental rates in Nigerian Naira (NGN).
              </p>
            </div>

            {/* Step 2 */}
            <div className="card-surface" style={{ padding: '32px 24px', textAlign: 'center', position: 'relative' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  background: 'var(--color-lavender)', 
                  color: 'var(--color-primary-dark)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '0 auto 20px'
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                Request Booking & Pay Online
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Select your rental date and duration. Complete online payment through our secure gateway to protect inventory and lock your reservation request.
              </p>
              <div style={{ marginTop: '14px' }}>
                <StatusBadge status="pending_payment" size="sm" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="card-surface" style={{ padding: '32px 24px', textAlign: 'center', position: 'relative' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  background: 'var(--color-primary)', 
                  color: '#FFFFFF',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '0 auto 20px',
                  boxShadow: 'var(--shadow-purple)'
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                Owner Approves Your Request
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                The resource owner reviews your request. Once approved, your booking is confirmed with access details. If declined or expired, you receive a 100% automatic refund.
              </p>
              <div style={{ marginTop: '14px' }}>
                <StatusBadge status="awaiting_approval" size="sm" />
              </div>
            </div>
          </div>

          {/* Transparent Policy Callout */}
          <div 
            style={{ 
              maxWidth: '820px', 
              margin: '48px auto 0', 
              padding: '20px 24px', 
              backgroundColor: 'var(--color-lavender)', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-lavender-dark)',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}
          >
            <ShieldCheck size={24} color="var(--color-primary-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                Why Successful Payment Alone Does Not Confirm a Booking
              </strong>
              <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55, margin: 0 }}>
                High-end film studios and professional cameras cannot be double-booked or handed over without host confirmation. Requiring owner approval ensures that equipment condition, technician presence, and space readiness are guaranteed before you arrive on set.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. RECENTLY ADDED RESOURCES (Conditionally rendered if approved listings exist) */}
      {recentListings.length > 0 && (
        <section>
          <Container>
            <SectionHeader
              badge="Latest Listings"
              title="Recently Approved Resources"
              subtitle="Fresh studios, podcasts, and cameras listed by verified owners across Nigeria."
              action={
                <Link to="/equipment" className="btn btn-outline btn-sm">
                  <span>Explore All Gear</span>
                  <ArrowRight size={14} />
                </Link>
              }
            />

            <div className="grid-listings">
              {recentListings.slice(0, 6).map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 6. BENEFITS FOR RENTERS & OWNERS (2 COLUMN EDITORIAL) */}
      <section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* Renter Benefits Card */}
            <div className="card-surface" style={{ padding: '36px' }}>
              <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-lavender)', color: 'var(--color-primary-dark)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '18px' }}>
                FOR CREATORS & BUSINESSES
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>
                Work Without Having to Own Everything
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                Purchasing an 8K cinema camera or building a soundproof podcast room costs millions of Naira. RENTIUSE lets you rent professional-grade gear for just the hours or days you actually need it.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>Transparent pricing in Nigerian Naira (₦) with no hidden fees</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>Access premium studio spaces in Ikeja, Lekki, VI, and Abuja</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>Protected payments with 100% refund if host declines</span>
                </li>
              </ul>
              <Button to="/search" variant="outline-purple">
                Explore Available Categories
              </Button>
            </div>

            {/* Owner Benefits Card */}
            <div className="card-surface" style={{ padding: '36px' }}>
              <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: 'var(--radius-full)', backgroundColor: '#FEF3C7', color: '#B45309', fontSize: '0.82rem', fontWeight: 700, marginBottom: '18px' }}>
                FOR RESOURCE OWNERS
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>
                Turn Idle Spaces & Equipment Into Steady Income
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                Do you have a photo studio sitting empty between shoots or high-end cameras gathering dust in Pelican cases? List them on RENTIUSE and connect with vetted Nigerian creators.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>Full control over booking approvals — accept or decline any request</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>Your own branded storefront link (rentiuse.com/your-store)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>Direct payouts to your Nigerian bank account</span>
                </li>
              </ul>
              <Button to="/register/owner" variant="primary">
                Start Listing Your Resources
              </Button>
            </div>

          </div>
        </Container>
      </section>

      {/* 7. OWNER ACQUISITION BANNER (Section 8.I) */}
      <section>
        <Container>
          <div 
            style={{ 
              backgroundColor: 'var(--color-ink)', 
              borderRadius: 'var(--radius-xl)', 
              padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 56px)', 
              color: '#FFFFFF',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(117, 72, 219, 0.3)', color: '#F1ECFF', fontSize: '0.8rem', fontWeight: 600, marginBottom: '16px' }}>
                OWNER OPPORTUNITY
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
                Have a studio or equipment sitting unused? Put it to work.
              </h2>
              <p style={{ color: '#D1D5DB', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
                Join Nigeria's leading rental network. Set your custom rates, manage availability, and earn revenue with total control over who rents your assets.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Button to="/register/owner" variant="primary" size="lg">
                  Start Listing
                </Button>
                <Button to="/why-rentiuse" variant="ghost" size="lg" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
                  Read Our Story
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. FAQS SECTION */}
      <section>
        <Container narrow>
          <SectionHeader
            align="center"
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about discovering rentals, payments, owner approvals, and listing in Nigeria."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '36px' }}>
            {FAQS_DATA.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="card-surface" 
                  style={{ 
                    overflow: 'hidden',
                    borderColor: isOpen ? 'var(--color-primary-light)' : 'var(--color-border)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      cursor: 'pointer'
                    }}
                    aria-expanded={isOpen}
                  >
                    <span style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--color-ink)' }}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={20} 
                      color="var(--color-primary)" 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 24px 22px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px' }}>
                      <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.65 }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/help" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>View full Help Center & Policies</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

    </div>
  );
}
