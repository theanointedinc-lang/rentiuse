import React, { useEffect } from 'react';
import { Info, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({
  isOpen,
  onClose,
  type = 'info', // 'info' | 'success' | 'warning'
  title,
  message,
  duration = 4500
}) {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const isWarning = type === 'warning';
  
  const Icon = isSuccess ? CheckCircle : isWarning ? AlertCircle : Info;
  const borderColor = isSuccess ? '#6EE7B7' : isWarning ? '#FCD34D' : '#D8B4FE';
  const bgColor = isSuccess ? '#ECFDF5' : isWarning ? '#FFFBEB' : '#F1ECFF';
  const iconColor = isSuccess ? '#059669' : isWarning ? '#D97706' : '#7548DB';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1100,
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        maxWidth: '420px',
        width: '90vw',
        animation: 'fadeIn 0.2s ease-out'
      }}
      role="status"
    >
      <Icon size={20} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        {title && <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '2px', color: 'var(--color-ink)' }}>{title}</h4>}
        <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.45 }}>{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-text-muted)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex'
        }}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
