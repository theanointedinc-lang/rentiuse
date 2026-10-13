import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, Layers } from 'lucide-react';
import { ALL_CATEGORIES } from '../../data/categoriesData';
import { NIGERIAN_LOCATIONS } from '../../data/nigerianLocations';

export default function SearchBar({
  initialType = 'all',
  initialCategory = 'all',
  initialLocation = 'all',
  initialDate = '',
  compact = false,
  className = ''
}) {
  const navigate = useNavigate();

  const [resourceType, setResourceType] = useState(initialType);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [rentalDate, setRentalDate] = useState(initialDate);
  const [rentalDuration, setRentalDuration] = useState('full-day'); // 'hourly' | 'half-day' | 'full-day'

  // Filter categories based on resource type
  const availableCategories = resourceType === 'all' 
    ? ALL_CATEGORIES 
    : ALL_CATEGORIES.filter(c => c.type === resourceType);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (resourceType !== 'all') params.set('type', resourceType);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedLocation !== 'all') params.set('location', selectedLocation);
    if (rentalDate) params.set('date', rentalDate);
    if (rentalDuration) params.set('duration', rentalDuration);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`search-bar-container ${className}`}
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        padding: compact ? '10px' : '14px',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--color-border)',
        width: '100%'
      }}
    >
      {/* Top Toggle: All | Studios | Equipment */}
      {!compact && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', paddingLeft: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginRight: '6px' }}>
            Resource Type:
          </span>
          <button
            type="button"
            className={`nav-pill ${resourceType === 'all' ? 'active' : ''}`}
            onClick={() => { setResourceType('all'); setSelectedCategory('all'); }}
            style={{ padding: '4px 14px', fontSize: '0.82rem' }}
          >
            All Resources
          </button>
          <button
            type="button"
            className={`nav-pill ${resourceType === 'studio' ? 'active' : ''}`}
            onClick={() => { setResourceType('studio'); setSelectedCategory('all'); }}
            style={{ padding: '4px 14px', fontSize: '0.82rem' }}
          >
            Studios & Spaces
          </button>
          <button
            type="button"
            className={`nav-pill ${resourceType === 'equipment' ? 'active' : ''}`}
            onClick={() => { setResourceType('equipment'); setSelectedCategory('all'); }}
            style={{ padding: '4px 14px', fontSize: '0.82rem' }}
          >
            Equipment & Gear
          </button>
        </div>
      )}

      {/* Main Grid Input Controls */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: compact ? '1fr 1fr auto' : 'repeat(auto-fit, minmax(180px, 1fr)) auto', 
          gap: '10px', 
          alignItems: 'center' 
        }}
      >
        {/* Category Selector */}
        <div style={{ padding: '6px 12px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
          <label htmlFor="search-category" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Layers size={11} color="var(--color-primary)" /> Category
          </label>
          <select
            id="search-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-ink)', cursor: 'pointer', paddingTop: '2px' }}
          >
            <option value="all">All Categories</option>
            {availableCategories.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Location Selector */}
        <div style={{ padding: '6px 12px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
          <label htmlFor="search-location" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <MapPin size={11} color="var(--color-primary)" /> Location (Nigeria)
          </label>
          <select
            id="search-location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-ink)', cursor: 'pointer', paddingTop: '2px' }}
          >
            {NIGERIAN_LOCATIONS.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.label}</option>
            ))}
          </select>
        </div>

        {/* Rental Date */}
        <div style={{ padding: '6px 12px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
          <label htmlFor="search-date" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Calendar size={11} color="var(--color-primary)" /> Rental Date
          </label>
          <input
            id="search-date"
            type="date"
            value={rentalDate}
            onChange={(e) => setRentalDate(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-ink)', cursor: 'pointer', paddingTop: '2px' }}
          />
        </div>

        {/* Rental Duration / Time */}
        {!compact && (
          <div style={{ padding: '6px 12px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
            <label htmlFor="search-duration" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Clock size={11} color="var(--color-primary)" /> Duration
            </label>
            <select
              id="search-duration"
              value={rentalDuration}
              onChange={(e) => setRentalDuration(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-ink)', cursor: 'pointer', paddingTop: '2px' }}
            >
              <option value="hourly">Hourly Session (2-4 hrs)</option>
              <option value="half-day">Half Day (5-6 hrs)</option>
              <option value="full-day">Full Day (8-12 hrs)</option>
              <option value="multi-day">Multi-day Production</option>
            </select>
          </div>
        )}

        {/* Submit Search Button */}
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              height: '100%',
              minHeight: '48px',
              padding: '0 24px',
              borderRadius: 'var(--radius-md)',
              width: '100%'
            }}
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
