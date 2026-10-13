import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [], className = '' }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={`breadcrumbs-nav ${className}`} style={{ marginBottom: '20px' }}>
      <ol style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.86rem' }}>
        <li>
          <Link to="/" style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ChevronRight size={14} color="#9CA3AF" />
              {isLast || !item.to ? (
                <span style={{ color: 'var(--color-ink)', fontWeight: 600 }} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
