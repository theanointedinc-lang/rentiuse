import React from 'react';

export default function SectionHeader({
  badge,
  title,
  subtitle,
  action,
  align = 'left', // 'left' | 'center'
  className = '',
  style = {}
}) {
  const isCentered = align === 'center';

  return (
    <div 
      className={`section-header ${className}`} 
      style={{ 
        display: 'flex', 
        flexDirection: isCentered ? 'column' : 'row',
        alignItems: isCentered ? 'center' : 'flex-end',
        justifyContent: isCentered ? 'center' : 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px',
        textAlign: isCentered ? 'center' : 'left',
        ...style 
      }}
    >
      <div style={{ maxWidth: isCentered ? '760px' : '680px' }}>
        {badge && (
          <div style={{ marginBottom: '10px' }}>
            <span className="badge badge-purple">
              {badge}
            </span>
          </div>
        )}
        <h2 style={{ marginBottom: subtitle ? '10px' : '0' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            {subtitle}
          </p>
        )}
      </div>

      {action && !isCentered && (
        <div style={{ flexShrink: 0 }}>
          {action}
        </div>
      )}
    </div>
  );
}
