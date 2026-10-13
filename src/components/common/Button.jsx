import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  type = 'button',
  to,
  onClick,
  icon,
  iconPosition = 'left',
  className = '',
  style = {},
  ...props
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const fullClass = fullWidth ? 'btn-full' : '';
  const combinedClasses = `btn ${variantClass} ${sizeClass} ${fullClass} ${className}`.trim();

  const content = (
    <>
      {isLoading && <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />}
      {!isLoading && icon && iconPosition === 'left' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
    </>
  );

  if (to && !disabled && !isLoading) {
    return (
      <Link to={to} className={combinedClasses} style={style} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={style}
      {...props}
    >
      {content}
    </button>
  );
}
