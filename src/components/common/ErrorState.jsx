import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = "Something went wrong",
  message = "We encountered an issue loading this information. Please check your connection and try again.",
  onRetry,
  className = ''
}) {
  return (
    <div 
      className={`card-surface ${className}`}
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '560px',
        margin: '0 auto',
        border: '1px solid #FECACA'
      }}
    >
      <div 
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}
      >
        <AlertTriangle size={28} />
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#991B1B' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.55, marginBottom: '20px' }}>
        {message}
      </p>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" icon={<RotateCcw size={16} />}>
          Try Again
        </Button>
      )}
    </div>
  );
}
