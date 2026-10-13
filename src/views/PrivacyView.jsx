import React from 'react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function PrivacyView() {
  return (
    <div className="privacy-view" style={{ paddingBottom: '80px' }}>
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '48px 0 32px' }}>
        <Container narrow>
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: '8px' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Compliance: Nigeria Data Protection Regulation (NDPR) & Global Best Practices
          </p>
        </Container>
      </section>

      <section style={{ padding: '48px 0' }}>
        <Container narrow>
          <div className="card-surface" style={{ padding: '40px', lineHeight: 1.8, color: '#374151', fontSize: '0.98rem' }}>
            
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: '20px' }}>
              We collect information provided directly by users during account registration, storefront creation, contact submissions, and rental booking requests. This includes your name, verified email address, phone number, physical pickup location, and government-issued identification for high-value gear authorization.
            </p>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              2. How Your Information is Used
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Your data is utilized solely to: (a) facilitate rental discovery and connect Renters with Hosts; (b) verify identity to prevent marketplace theft; (c) communicate booking status updates (approval, decline, check-in codes); and (d) process settlement payouts to Nigerian bank accounts.
            </p>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              3. Payment Security & Bank Information
            </h2>
            <p style={{ marginBottom: '20px' }}>
              RENTIUSE does not store raw debit card numbers or bank account PINs on our servers. All financial transactions are securely tokenized through licensed Nigerian payment gateways conforming to PCI-DSS Level 1 standards.
            </p>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              4. Data Retention & Your Rights
            </h2>
            <p style={{ margin: 0 }}>
              Under the Nigeria Data Protection Act, you have the right to request access to your personal data, rectify inaccuracies, or request account deletion by reaching out to our data privacy team via the Contact page.
            </p>

          </div>
        </Container>
      </section>
    </div>
  );
}
