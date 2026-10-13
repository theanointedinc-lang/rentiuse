import React from 'react';
import { ShoppingBag, Calendar, MapPin, CheckCircle2, Phone, X, ExternalLink } from 'lucide-react';

export default function MyBookingsModal({ bookings, onClose, onVisitStore }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '680px', width: '100%', padding: '36px', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc' }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>My Active Bookings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>View your active rental passes, check-in codes, and owner contacts.</p>
          </div>
        </div>

        {bookings.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bookings.map(b => (
              <div key={b.id} className="glass-card" style={{ padding: '20px', borderRadius: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img src={b.image} alt={b.itemTitle} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#818cf8', fontWeight: 700 }}>{b.storeName}</span>
                    <span className="badge-pill badge-emerald"><CheckCircle2 size={12} /> {b.status}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>{b.itemTitle}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} /> {b.dates}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginTop: '4px' }}>
                    Check-in Code: {b.checkInCode}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>${b.totalPrice}</div>
                  <button 
                    className="btn-outline-glow" 
                    style={{ padding: '6px 12px', fontSize: '0.75rem', marginTop: '8px' }}
                    onClick={() => { onClose(); onVisitStore(b.storeSlug); }}
                  >
                    View Store <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <p>You have no active bookings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
