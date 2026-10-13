import React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

export default function Select({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  error,
  hint,
  disabled = false,
  className = '',
  ...props
}) {
  const selectId = id || name;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          <span>
            {label}
            {required && <span className="required-star" aria-hidden="true">*</span>}
          </span>
          {required && <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>Required</span>}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          className={`form-control ${error ? 'has-error' : ''}`}
          style={{ appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
              {opt.label ?? opt.name}
            </option>
          ))}
        </select>
        
        <div style={{ position: 'absolute', right: '12px', pointerEvents: 'none', color: 'var(--color-text-muted)', display: 'flex' }}>
          <ChevronDown size={18} />
        </div>
      </div>

      {hint && !error && (
        <p id={`${selectId}-hint`} className="form-hint">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${selectId}-error`} className="form-error" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
