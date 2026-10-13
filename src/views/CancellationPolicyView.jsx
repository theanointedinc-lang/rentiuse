import React from 'react';
import { ShieldCheck, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import StatusBadge from '../components/common/StatusBadge';

export default function CancellationPolicyView() {
  return (
    <div className="cancellation-policy-view" style={{ paddingBottom: '80px' }}>
      
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '48px 0 32px' }}>
        <Container narrow>
          <Breadcrumbs items={[{ label: "Cancellation & Refund Policy" }]} />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: '8px' }}>
            Cancellation & Refund Policy
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Clear, transparent policies for Renters and Resource Owners on RENTIUSE Nigeria.
          </p>
        </Container>
      </section>

      <section style={{ padding: '48px 0' }}>
        <Container narrow>
          <div className="card-surface" style={{ padding: '40px', lineHeight: 1.8, color: '#374151', fontSize: '0.98rem' }}>
            
            <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--color-lavender)', border: '1px solid var(--color-lavender-dark)', marginBottom: '32px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <ShieldCheck size={22} color="var(--color-primary-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--color-primary-dark)', fontSize: '0.95rem', marginBottom: '4px' }}>
                  100% Refund Guarantee If Owner Declines Or Fails to Confirm
                </strong>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#374151', lineHeight: 1.5 }}>
                  Because RENTIUSE requires Owner Approval before any booking becomes confirmed, if a host declines your rental request or the approval window expires, you receive an immediate, full 100% refund with zero cancellation penalty.
                </p>
              </div>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '14px', color: 'var(--color-ink)' }}>
              1. Renter-Initiated Cancellation Tiers
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Once a booking has been confirmed by the Host, cancellation terms depend on the policy tier chosen by the Host for that listing:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
                <strong style={{ color: '#065F46', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>
                  Flexible Policy:
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#4B5563' }}>
                  Full 100% refund if cancelled at least 24 hours prior to the scheduled start time. 50% refund if cancelled less than 24 hours in advance.
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
                <strong style={{ color: '#1E40AF', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>
                  Standard Policy:
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#4B5563' }}>
                  Full 100% refund if cancelled at least 48 hours prior to start time. 50% refund if cancelled between 24 and 48 hours prior. Non-refundable within 24 hours.
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
                <strong style={{ color: '#991B1B', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>
                  Strict Policy:
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#4B5563' }}>
                  Full refund if cancelled at least 7 days prior to check-in. 50% refund between 48 hours and 7 days. Non-refundable under 48 hours.
                </p>
              </div>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              2. Security Deposit Releases
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Security deposits are never retained as rental revenue. Upon successful completion of the rental and verification that equipment is intact and undamaged, any held deposit is released within 24 hours.
            </p>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--color-ink)' }}>
              3. Refund Processing Timelines in Nigeria
            </h2>
            <p style={{ margin: 0 }}>
              Once initiated, refunds are processed immediately by RENTIUSE. Depending on your Nigerian issuing bank (Access Bank, GTBank, Zenith, UBA, etc.), funds typically reflect within 1 to 3 business days.
            </p>

          </div>
        </Container>
      </section>

    </div>
  );
}
