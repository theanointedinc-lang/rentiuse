import React from 'react';
import { SearchX } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = SearchX,
  title = "No resources found",
  description = "We couldn't find any listings matching your search criteria. Try adjusting your filters or search terms.",
  actionLabel,
  onAction,
  actionTo,
  className = ''
}) {
  return (
    <div 
      className={`card-surface ${className}`}
      style={{
        padding: '56px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <div 
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-lavender)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}
      >
        <Icon size={32} />
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '10px' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: actionLabel ? '24px' : '0' }}>
        {description}
      </p>

      {actionLabel && (
        <div>
          {actionTo ? (
            <Button to={actionTo} variant="primary">
              {actionLabel}
            </Button>
          ) : (
            <Button onClick={onAction} variant="primary">
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
