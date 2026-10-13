import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ text = 'Loading resources...', size = 'md' }) {
  const iconSize = size === 'lg' ? 36 : size === 'sm' ? 18 : 24;

  return (
    <div style={{ padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
      <Loader2 size={iconSize} color="var(--color-primary)" style={{ animation: 'spin 1s linear infinite' }} />
      {text && <span style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{text}</span>}
    </div>
  );
}

export function SkeletonListingCard() {
  return (
    <div className="card-surface" style={{ height: '420px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '220px', backgroundColor: '#E5E7EB', animation: 'pulse 1.8s ease-in-out infinite' }} />
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <div style={{ height: '14px', width: '40%', backgroundColor: '#E5E7EB', borderRadius: '4px' }} />
        <div style={{ height: '20px', width: '85%', backgroundColor: '#E5E7EB', borderRadius: '4px' }} />
        <div style={{ height: '14px', width: '100%', backgroundColor: '#F3F4F6', borderRadius: '4px' }} />
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ height: '24px', width: '35%', backgroundColor: '#E5E7EB', borderRadius: '4px' }} />
          <div style={{ height: '32px', width: '30%', backgroundColor: '#E5E7EB', borderRadius: '6px' }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid-listings">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonListingCard key={i} />
      ))}
    </div>
  );
}

export default function LoadingState({ type = 'grid', count = 6, text }) {
  if (type === 'spinner') return <LoadingSpinner text={text} />;
  return <SkeletonGrid count={count} />;
}
