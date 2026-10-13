import React from 'react';
import { formatNaira } from '../../data/listingsData';

export default function PriceDisplay({
  pricing,
  period = 'hour', // 'hour' | 'day' | 'both'
  size = 'md', // 'sm' | 'md' | 'lg'
  showDeposit = false,
  className = '',
  style = {}
}) {
  if (!pricing) return null;

  const { hourlyRate, dailyRate, securityDeposit } = pricing;
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  const priceValueSize = isLarge ? '1.85rem' : isSmall ? '1.1rem' : '1.35rem';
  const unitSize = isLarge ? '0.95rem' : isSmall ? '0.75rem' : '0.85rem';

  return (
    <div className={`price-display-wrapper ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', ...style }}>
      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px' }}>
        {period === 'day' && dailyRate ? (
          <>
            <span style={{ fontSize: priceValueSize, fontWeight: 800, color: 'var(--color-primary-dark)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {formatNaira(dailyRate)}
            </span>
            <span style={{ fontSize: unitSize, color: 'var(--color-text-muted)', fontWeight: 500 }}>
              / day
            </span>
          </>
        ) : hourlyRate ? (
          <>
            <span style={{ fontSize: priceValueSize, fontWeight: 800, color: 'var(--color-primary-dark)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {formatNaira(hourlyRate)}
            </span>
            <span style={{ fontSize: unitSize, color: 'var(--color-text-muted)', fontWeight: 500 }}>
              / hr
            </span>
            {dailyRate && period === 'both' && (
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '6px' }}>
                ({formatNaira(dailyRate)} / day)
              </span>
            )}
          </>
        ) : (
          <span style={{ fontSize: priceValueSize, fontWeight: 700, color: 'var(--color-primary-dark)' }}>
            {formatNaira(dailyRate)}
          </span>
        )}
      </div>

      {showDeposit && securityDeposit && (
        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
          Refundable deposit: <strong style={{ color: 'var(--color-ink)' }}>{formatNaira(securityDeposit)}</strong>
        </span>
      )}
    </div>
  );
}
