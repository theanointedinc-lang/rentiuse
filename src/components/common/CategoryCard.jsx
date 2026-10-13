import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mic, Video, Users, Aperture, Zap, Headphones, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  Camera,
  Mic,
  Video,
  Users,
  Aperture,
  Zap,
  Headphones
};

export default function CategoryCard({ category }) {
  const IconComponent = ICON_MAP[category.icon] || Camera;
  const targetRoute = category.type === 'studio' 
    ? `/studios?category=${category.slug}`
    : `/equipment?category=${category.slug}`;

  return (
    <Link 
      to={targetRoute}
      className="card-interactive"
      style={{
        textDecoration: 'none',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Category Image Header */}
      <div style={{ position: 'relative', height: '170px', overflow: 'hidden', backgroundColor: '#EDE9FE' }}>
        <img 
          src={category.image} 
          alt={category.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          loading="lazy"
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to top, rgba(23, 21, 38, 0.7) 0%, rgba(23, 21, 38, 0.1) 60%)' 
        }} />
        
        {/* Floating Category Icon */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'var(--color-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          color: 'var(--color-primary-dark)'
        }}>
          <IconComponent size={20} />
        </div>
      </div>

      {/* Category Card Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
            {category.name}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.45, marginBottom: '12px' }}>
            {category.tagline}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '10px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-primary)' }}>
            {category.count}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-ink)' }}>
            Explore <ArrowRight size={13} color="var(--color-primary)" />
          </span>
        </div>
      </div>
    </Link>
  );
}
