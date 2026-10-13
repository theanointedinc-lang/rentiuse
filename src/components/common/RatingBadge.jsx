import React from 'react';
import { Star } from 'lucide-react';

export default function RatingBadge({ rating, reviewCount, size = 'md', className = '' }) {
  if (!rating) return null;

  const isSmall = size === 'sm';
  const iconSize = isSmall ? 13 : 15;
  const fontSize = isSmall ? '0.78rem' : '0.85rem';

  return (
    <div 
      className={`rating-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize,
        fontWeight: 600,
        color: 'var(--color-ink)'
      }}
      aria-label={`Rating: ${rating} out of 5 stars from ${reviewCount || 0} reviews`}
    >
      <Star size={iconSize} fill="#F59E0B" color="#F59E0B" />
      <span>{Number(rating).toFixed(1)}</span>
      {reviewCount !== undefined && reviewCount !== null && (
        <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
