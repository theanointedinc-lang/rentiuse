import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Textarea({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  error,
  hint,
  disabled = false,
  className = '',
  ...props
}) {
  const textareaId = id || name;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="form-label">
          <span>
            {label}
            {required && <span className="required-star" aria-hidden="true">*</span>}
          </span>
          {required && <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>Required</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
        className={`form-control ${error ? 'has-error' : ''}`}
        style={{ resize: 'vertical', minHeight: '100px' }}
        {...props}
      />

      {hint && !error && (
        <p id={`${textareaId}-hint`} className="form-hint">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${textareaId}-error`} className="form-error" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
