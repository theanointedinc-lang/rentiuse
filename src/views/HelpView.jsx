import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  CreditCard, 
  RotateCcw, 
  Building2, 
  ChevronDown, 
  CheckCircle2, 
  Hourglass,
  Clock,
  ArrowRight
} from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import SectionHeader from '../components/common/SectionHeader';
import StatusBadge, { BOOKING_STATUSES } from '../components/common/StatusBadge';
import { FAQS_DATA } from '../data/faqData';

export default function HelpView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(FAQS_DATA[0]?.id || null);

  const filteredFaqs = FAQS_DATA.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="help-view" style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '48px 0 36px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Help Center" }]} />

          <div style={{ maxWidth: '780px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '12px' }}>SUPPORT & KNOWLEDGE BASE</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '12px' }}>
              How Can We Help You?
            </h1>
            <p style={{ fontSize: '1.08rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Find transparent guides on rental booking lifecycles, online payment security, owner approval workflows, and cancellations in Nigeria.
            </p>
          </div>

          {/* Quick Search Control */}
          <div style={{ marginTop: '24px', maxWidth: '580px', position: 'relative' }}>
            <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search help topics (e.g., owner approval, refund, security deposit)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '42px', height: '48px', fontSize: '0.95rem' }}
            />
          </div>
        </Container>
      </section>

      {/* Booking Status Glossary (Required by Section 21) */}
      <section style={{ padding: '48px 0', backgroundColor: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <SectionHeader
            badge="Standard Lifecycle"
            title="Understanding Booking Statuses"
            subtitle="RENTIUSE uses an explicit status vocabulary so customers and resource owners always know the exact state of a reservation."
          />

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
              gap: '16px' 
            }}
          >
            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="pending_payment" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Customer has selected a rental window. Awaiting online payment completion to protect inventory.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="awaiting_approval" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Payment successfully verified. The resource owner has been notified and must approve the booking.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="confirmed" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Owner accepted the request. Check-in passes, contact details, and space access codes are unlocked.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="declined" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Owner was unable to accommodate the request. An automatic 100% refund is initiated immediately.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="refund_pending" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Refund triggered and currently processing back to the customer's Nigerian bank or card.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="refunded" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Funds have been successfully settled back to the original funding source.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="cancelled" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Renter initiated cancellation prior to check-in according to the listing's cancellation rules.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="completed" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                The rental session concluded and the equipment was returned and verified by the host.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '8px' }}><StatusBadge status="expired" /></div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Host approval window timed out without response. Full automated refund processed to renter.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main FAQ Accordion */}
      <section style={{ padding: '60px 0' }}>
        <Container narrow>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              type="button"
              className={`nav-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Topics
            </button>
            <button
              type="button"
              className={`nav-pill ${selectedCategory === 'bookings' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('bookings')}
            >
              Bookings & Approvals
            </button>
            <button
              type="button"
              className={`nav-pill ${selectedCategory === 'payments' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('payments')}
            >
              Payments & Naira
            </button>
            <button
              type="button"
              className={`nav-pill ${selectedCategory === 'refunds' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('refunds')}
            >
              Refunds & Declines
            </button>
            <button
              type="button"
              className={`nav-pill ${selectedCategory === 'owners' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('owners')}
            >
              Listing as Owner
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredFaqs.map(faq => {
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
                    onClick={() => setOpenFaqId(prev => prev === faq.id ? null : faq.id)}
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

          {/* Need more help banner */}
          <div style={{ marginTop: '48px', padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Still Have Questions?</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
              Our operations team is available to assist you with equipment inquiries, custom studio arrangements, and owner registration.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact Support Desk
            </Link>
          </div>

        </Container>
      </section>

    </div>
  );
}
