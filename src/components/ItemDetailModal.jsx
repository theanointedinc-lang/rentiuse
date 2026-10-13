import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Zap,
  X,
  Tag,
  Building2,
  Wrench,
  Package
} from 'lucide-react';
import { formatNaira } from '../data/mockData';

export default function ItemDetailModal({ item, ownerStore, onClose, onConfirmBooking }) {
  // Helper for formatting date strings YYYY-MM-DD
  const getTodayStr = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowStr = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [rentalMode, setRentalMode] = useState('hourly'); // 'hourly' or 'daily'
  const [startDate, setStartDate] = useState(getTodayStr());
  const [endDate, setEndDate] = useState(getTomorrowStr());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [hoursCount, setHoursCount] = useState(4);
  const [daysCount, setDaysCount] = useState(2);

  const [renterName, setRenterName] = useState('');
  const [renterEmail, setRenterEmail] = useState('');
  const [renterPhone, setRenterPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  if (!item) return null;

  // Asset type detection
  const isSpace = item.type === 'space' || item.category === 'Spaces';
  const isEquipment = item.type === 'equipment' || item.category === 'Equipment';

  // Calculate pricing based on mode
  const baseRate = rentalMode === 'hourly' ? (item.hourlyRate || 35000) : (item.dailyRate || 250000);
  const activeDuration = rentalMode === 'hourly' ? hoursCount : daysCount;
  const rentalSubtotal = baseRate * activeDuration;
  const deposit = item.securityDeposit || 50000;
  const serviceFee = Math.round(rentalSubtotal * 0.05); // 5% platform fee
  const totalAmount = rentalSubtotal + deposit + serviceFee;

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!renterName || !renterEmail) {
      alert('Please enter your name and email address.');
      return;
    }

    const formattedDateRange = rentalMode === 'hourly'
      ? `${startDate} (${startTime} to ${endTime}) • ${hoursCount} Hours`
      : `${startDate} to ${endDate} (${startTime} check-in) • ${daysCount} Days`;

    const bookingData = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      storeName: ownerStore?.name || 'Rentiuse Partner Store',
      storeSlug: ownerStore?.slug || 'david',
      itemTitle: item.title,
      itemType: isSpace ? 'Space Rental' : isEquipment ? 'Equipment Rental' : 'Product Rental',
      image: item.image,
      startDate,
      endDate: rentalMode === 'hourly' ? startDate : endDate,
      startTime,
      endTime,
      dates: formattedDateRange,
      totalPrice: totalAmount,
      status: 'Confirmed',
      checkInCode: `RNT-${Math.floor(1000 + Math.random() * 9000)}-NG`,
      ownerPhone: ownerStore?.contactPhone || '+234 803 123 4567',
      renterName,
      renterEmail,
      renterPhone
    };

    onConfirmBooking(bookingData);
  };

  const timeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel" style={{ maxWidth: '920px', width: '100%', padding: '36px', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '32px' }}>
          
          {/* Left Column: Asset Details & Media */}
          <div>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '260px', marginBottom: '20px' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
                <span className={`badge-pill ${isSpace ? 'badge-emerald' : isEquipment ? 'badge-indigo' : 'badge-gold'}`}>
                  {isSpace ? '🏢 Space Rental' : isEquipment ? '🛠️ Equipment Rental' : '📦 Product Rental'}
                </span>
                {item.collection && (
                  <span className="badge-pill badge-indigo">
                    <Tag size={10} /> {item.collection}
                  </span>
                )}
              </div>
            </div>

            {/* Owner Store Badge */}
            {ownerStore && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '0.9rem' }}>
                  {ownerStore.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {ownerStore.name} <CheckCircle2 size={13} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Verified Merchant • rentiuse.com/{ownerStore.slug}
                  </div>
                </div>
              </div>
            )}

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>{item.title}</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
              {item.description}
            </p>

            {/* Technical Specifications / Space Features */}
            {item.specs && item.specs.length > 0 && (
              <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#818cf8" /> Asset Specifications & Guarantees
                </h4>
                <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {item.specs.map((spec, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Date & Time Picker + Reservation Form */}
          <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '28px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase' }}>Select Date & Time of Use</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>Schedule Rental Booking</h3>
            </div>

            {/* Rental Billing Mode Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <button 
                type="button"
                className={`btn-secondary ${rentalMode === 'hourly' ? 'btn-outline-glow' : ''}`}
                onClick={() => setRentalMode('hourly')}
                style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem', fontWeight: 700 }}
              >
                Hourly ({formatNaira(item.hourlyRate || 35000)}/hr)
              </button>
              <button 
                type="button"
                className={`btn-secondary ${rentalMode === 'daily' ? 'btn-outline-glow' : ''}`}
                onClick={() => setRentalMode('daily')}
                style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem', fontWeight: 700 }}
              >
                Daily ({formatNaira(item.dailyRate || 250000)}/day)
              </button>
            </div>

            {/* DATE AND TIME PICKER INPUTS */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
              
              {/* HOURLY MODE DATE & TIME SELECTION */}
              {rentalMode === 'hourly' && (
                <div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} /> Date of Use
                    </label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ fontSize: '0.85rem' }}
                      required 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} /> Start Time
                      </label>
                      <select className="form-select" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ fontSize: '0.82rem' }}>
                        {timeOptions.map(t => <option key={t} value={t}>{t} HRS</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} /> End Time
                      </label>
                      <select className="form-select" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{ fontSize: '0.82rem' }}>
                        {timeOptions.map(t => <option key={t} value={t}>{t} HRS</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Total Hours of Use:</span>
                      <strong style={{ color: '#818cf8' }}>{hoursCount} Hours</strong>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="14" 
                      value={hoursCount} 
                      onChange={(e) => setHoursCount(Number(e.target.value))} 
                      style={{ width: '100%', accentColor: '#6366f1' }}
                    />
                  </div>
                </div>
              )}

              {/* DAILY MODE DATE & TIME SELECTION */}
              {rentalMode === 'daily' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} /> Start Date
                      </label>
                      <input 
                        type="date" 
                        className="form-input"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ fontSize: '0.82rem' }}
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} /> End Date
                      </label>
                      <input 
                        type="date" 
                        className="form-input"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ fontSize: '0.82rem' }}
                        required 
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} /> Arrival / Check-in Time
                    </label>
                    <select className="form-select" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ fontSize: '0.82rem' }}>
                      {timeOptions.map(t => <option key={t} value={t}>{t} HRS</option>)}
                    </select>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Total Days of Use:</span>
                      <strong style={{ color: '#34d399' }}>{daysCount} Days</strong>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={daysCount} 
                      onChange={(e) => setDaysCount(Number(e.target.value))} 
                      style={{ width: '100%', accentColor: '#10b981' }}
                    />
                  </div>
                </div>
              )}

            </div>

            {/* DYNAMIC PRICE BREAKDOWN IN NAIRA (₦) */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Rate ({formatNaira(baseRate)} × {activeDuration} {rentalMode === 'hourly' ? 'hrs' : 'days'})</span>
                <span style={{ fontWeight: 600 }}>{formatNaira(rentalSubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Refundable Deposit</span>
                <span style={{ fontWeight: 600 }}>{formatNaira(deposit)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Platform Fee (5%)</span>
                <span style={{ fontWeight: 600 }}>{formatNaira(serviceFee)}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800 }}>
                <span>Total Amount Due</span>
                <span style={{ color: '#34d399' }}>{formatNaira(totalAmount)}</span>
              </div>
            </div>

            {/* CUSTOMER INFORMATION FORM */}
            <form onSubmit={handleSubmitBooking}>
              <div style={{ marginBottom: '12px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Full Name"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  style={{ padding: '9px 14px', fontSize: '0.88rem' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Email Address"
                  value={renterEmail}
                  onChange={(e) => setRenterEmail(e.target.value)}
                  style={{ padding: '9px 14px', fontSize: '0.88rem' }}
                  required
                />
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="Phone (+234)"
                  value={renterPhone}
                  onChange={(e) => setRenterPhone(e.target.value)}
                  style={{ padding: '9px 14px', fontSize: '0.88rem' }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
                <Zap size={16} /> Confirm Reservation ({formatNaira(totalAmount)})
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
