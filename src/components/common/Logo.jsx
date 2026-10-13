import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'default', size = 'md', to = '/' }) {
  const isDark = variant === 'dark';
  
  // Size calculations
  const iconSize = size === 'lg' ? 36 : size === 'sm' ? 24 : 30;
  const fontSize = size === 'lg' ? '1.5rem' : size === 'sm' ? '1.1rem' : '1.3rem';

  const content = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', userSelect: 'none' }}>
      {/* Abstract Modern Geometric Mark */}
      <div 
        style={{ 
          width: `${iconSize}px`, 
          height: `${iconSize}px`, 
          borderRadius: size === 'lg' ? '10px' : '8px', 
          background: 'linear-gradient(135deg, #7548DB 0%, #5630B5 100%)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(117, 72, 219, 0.28)',
          flexShrink: 0
        }}
        aria-hidden="true"
      >
        <svg width={iconSize * 0.6} height={iconSize * 0.6} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized interconnected resource exchange icon */}
          <path d="M4 8L12 3L20 8V16L12 21L4 16V8Z" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8V16" stroke="#F1ECFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 10L16 14" stroke="#F1ECFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* RENTIUSE Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize, 
          fontWeight: 800, 
          letterSpacing: '-0.03em', 
          color: isDark ? '#FFFFFF' : '#171526',
          lineHeight: 1
        }}>
          RENTIUSE
        </span>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none', display: 'inline-block' }} aria-label="RENTIUSE Homepage">
        {content}
      </Link>
    );
  }

  return content;
}
