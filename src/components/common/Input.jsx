import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Input({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  hint,
  icon,
  disabled = false,
  autoComplete,
  className = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          <span>
            {label}
            {required && <span className="required-star" aria-hidden="true">*</span>}
          </span>
          {required && <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>Required</span>}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <div style={{ position: 'absolute', left: '12px', color: 'var(--color-text-muted)', display: 'flex', pointerEvents: 'none' }}>
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`form-control ${error ? 'has-error' : ''}`}
          style={{ paddingLeft: icon ? '38px' : '14px' }}
          {...props}
        />
      </div>

      {hint && !error && (
        <p id={`${inputId}-hint`} className="form-hint">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="form-error" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
