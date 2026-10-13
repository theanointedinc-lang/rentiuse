import React from 'react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function TermsView() {
  return (
    <div className="terms-view" style={{ paddingBottom: '80px' }}>
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '48px 0 32px' }}>
        <Container narrow>
          <Breadcrumbs items={[{ label: "Terms of Service" }]} />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: '8px' }}>
            Terms of Service
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Effective Date: Phase 1 Platform Release • Last Updated: October 2026
          </p>
        </Container>
      </section>

      <section style={{ padding: '48px 0' }}>
        <Container narrow>
          <div className="card-surface" style={{ padding: '40px', lineHeight: 1.8, color: '#374151', fontSize: '0.98rem' }}>
            
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              1. Platform Overview & Scope
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Welcome to RENTIUSE ("the Platform"), operated by RENTIUSE Technologies Ltd. in Nigeria. RENTIUSE connects individuals and corporate entities seeking temporary access to creative spaces and equipment ("Renters") with the independent owners, rental houses, and studios that offer them ("Owners" or "Hosts").
            </p>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              2. Booking Lifecycle & Owner Approval
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Every rental request submitted on RENTIUSE requires verified online payment followed by mandatory Owner Approval. Completing online payment reserves the inventory slot on hold but does not constitute a finalized booking. A binding reservation is established only after the Host formally accepts the booking request.
            </p>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              3. Payments, Pricing & Currencies
            </h2>
            <p style={{ marginBottom: '20px' }}>
              All baseline pricing on RENTIUSE Nigeria is calculated in Nigerian Naira (NGN / ₦). Rates may be configured on an hourly, daily, or multi-day schedule. Where a listing requires an authorized Security Deposit, the deposit is temporarily authorized prior to handover and released upon post-rental inspection.
            </p>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              4. Equipment Care, Conduct & Liability
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Renters agree to operate hired gear only through trained personnel, adhere to specified house rules, and return equipment repacked in original cases. In the event of damage, negligence, or lost components, the Renter is liable up to the full replacement or repair cost, with the security deposit acting as the primary recourse.
            </p>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              5. Governing Law
            </h2>
            <p style={{ margin: 0 }}>
              These Terms are governed by and construed in accordance with the Laws of the Federal Republic of Nigeria.
            </p>

          </div>
        </Container>
      </section>
    </div>
  );
}
