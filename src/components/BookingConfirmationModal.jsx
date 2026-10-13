import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, QrCode, MapPin, Calendar, Clock, Phone, ShieldCheck, Download, X, Building2, Wrench } from 'lucide-react';
import { formatNaira } from '../data/mockData';

export default function BookingConfirmationModal({ booking, onClose }) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  }, []);

  if (!booking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', width: '100%', padding: '36px', position: 'relative' }} onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'rgba(16, 185, 129, 0.15)', 
            border: '2px solid #10b981', 
            color: '#10b981',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 25px rgba(16,185,129,0.4)'
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Reservation Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Your rental reservation is active. Merchant has been notified of your date & time of use.
          </p>
        </div>

        {/* Digital Ticket / Pass Container */}
        <div style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', marginBottom: '24px', position: 'relative' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Merchant Storefront</div>
              <div style={{ fontWeight: 800, color: '#818cf8', fontSize: '1rem' }}>{booking.storeName}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Digital Access Pass Code</div>
              <div style={{ fontWeight: 800, color: '#34d399', fontFamily: 'monospace', fontSize: '1rem' }}>{booking.checkInCode}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <img src={booking.image} alt={booking.itemTitle} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '4px' }}>
                <span className="badge-pill badge-emerald" style={{ fontSize: '0.72rem' }}>
                  {booking.itemType || 'Rental Listing'}
                </span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>{booking.itemTitle}</h4>
              <div style={{ fontSize: '0.82rem', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <Calendar size={14} /> <strong>Scheduled Date & Time of Use:</strong>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: 700, paddingLeft: '20px' }}>
                {booking.dates}
              </div>
            </div>
          </div>

          {/* Pricing & Contact Details */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Total Reserved (₦)</div>
              <div style={{ fontWeight: 800, color: '#34d399', fontSize: '1.2rem' }}>{formatNaira(booking.totalPrice)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Host Direct Line</div>
              <div style={{ fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={13} /> {booking.ownerPhone}
              </div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div style={{ background: 'white', padding: '14px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <QrCode size={64} color="#0f172a" />
            <div style={{ color: '#0f172a', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>SCAN UPON ARRIVAL / COLLECTION</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Verified RENTIUSE Check-in Pass</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={() => window.print()}>
            <Download size={16} /> Print Pass & Receipt
          </button>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
