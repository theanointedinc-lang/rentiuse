import React from 'react';
import { Star, MapPin, Zap, CheckCircle2, Tag } from 'lucide-react';
import { formatNaira } from '../data/mockData';

export default function ItemCard({ item, ownerStore, onSelectItem, onVisitStore }) {
  // Calculate discount percentage if original price exists
  const hasHourlySlash = item.originalHourlyRate && item.originalHourlyRate > item.hourlyRate;
  const hasDailySlash = item.originalDailyRate && item.originalDailyRate > item.dailyRate;
  
  const discountPercent = hasHourlySlash 
    ? Math.round(((item.originalHourlyRate - item.hourlyRate) / item.originalHourlyRate) * 100)
    : hasDailySlash 
    ? Math.round(((item.originalDailyRate - item.dailyRate) / item.originalDailyRate) * 100)
    : null;

  return (
    <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Image & Badge Overlay */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img 
          src={item.image} 
          alt={item.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Category Pill & Collection Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span className="badge-pill badge-indigo" style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)' }}>
            {item.type === 'space' ? '🏢 Space' : '🛠️ Equipment'}
          </span>
          {item.collection && (
            <span className="badge-pill badge-emerald" style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)' }}>
              <Tag size={10} /> {item.collection}
            </span>
          )}
        </div>

        {/* Slash Discount Savings Badge */}
        {discountPercent && (
          <div style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '12px', 
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
            color: 'white', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '0.75rem', 
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
          }}>
            {discountPercent}% OFF
          </div>
        )}

        {/* Rating Overlay */}
        <div style={{ 
          position: 'absolute', 
          bottom: '12px', 
          right: '12px', 
          background: 'rgba(15, 23, 42, 0.85)', 
          backdropFilter: 'blur(8px)',
          padding: '4px 10px', 
          borderRadius: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          <Star size={13} color="#f59e0b" fill="#f59e0b" />
          <span>{item.rating}</span>
          <span style={{ color: 'var(--text-muted)' }}>({item.reviews})</span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Owner Store Link */}
          {ownerStore && (
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}
              onClick={() => onVisitStore(ownerStore.slug)}
            >
              <img 
                src={ownerStore.ownerAvatar} 
                alt={ownerStore.ownerName} 
                style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600 }}>
                {ownerStore.name}
              </span>
              <CheckCircle2 size={13} color="#10b981" />
            </div>
          )}

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
            {item.title}
          </h3>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.description}
          </p>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} /> {item.location}
            </span>
            {item.instantBook && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399' }}>
                <Zap size={13} /> Instant Book
              </span>
            )}
          </div>
        </div>

        {/* Pricing Footer with Slash Pricing in Naira (₦) */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rates (₦)</div>
            
            {/* Hourly Rate Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              {item.hourlyRate && (
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>
                  {formatNaira(item.hourlyRate)}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>/hr</span>
                </span>
              )}
              {hasHourlySlash && (
                <span style={{ fontSize: '0.82rem', color: '#ef4444', textDecoration: 'line-through' }}>
                  {formatNaira(item.originalHourlyRate)}
                </span>
              )}
            </div>

            {/* Daily Rate Row */}
            {item.dailyRate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginTop: '2px' }}>
                <span style={{ color: '#a5b4fc', fontWeight: 600 }}>
                  {formatNaira(item.dailyRate)}/day
                </span>
                {hasDailySlash && (
                  <span style={{ color: '#ef4444', textDecoration: 'line-through', fontSize: '0.75rem' }}>
                    {formatNaira(item.originalDailyRate)}
                  </span>
                )}
              </div>
            )}
          </div>

          <button 
            className="btn-primary" 
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => onSelectItem(item)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
