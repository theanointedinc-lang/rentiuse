import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, X, ArrowUpDown, Filter, Info, Layers, Tag } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ListingCard from '../components/common/ListingCard';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import Button from '../components/common/Button';
import { getAllListings } from '../data/listingsData';
import { ALL_CATEGORIES } from '../data/categoriesData';
import { NIGERIAN_LOCATIONS } from '../data/nigerianLocations';

export default function SearchResultsView() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parameters
  const queryParam = searchParams.get('q') || '';
  const typeParam = searchParams.get('type') || 'all';
  const categoryParam = searchParams.get('category') || 'all';
  const locationParam = searchParams.get('location') || 'all';
  const sortParam = searchParams.get('sort') || 'featured';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [resourceType, setResourceType] = useState(typeParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [sortOption, setSortOption] = useState(sortParam);
  const [currentPage, setCurrentPage] = useState(1);

  // Synchronize state when URL query parameters change directly
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    setResourceType(searchParams.get('type') || 'all');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedLocation(searchParams.get('location') || 'all');
    setSortOption(searchParams.get('sort') || 'featured');
  }, [searchParams]);

  const allListings = getAllListings();

  // Update URL helper
  const updateUrlParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([k, v]) => {
      if (!v || v === 'all') {
        updated.delete(k);
      } else {
        updated.set(k, v);
      }
    });
    setSearchParams(updated);
    setCurrentPage(1);
  };

  // Filter listings
  const filteredResults = useMemo(() => {
    let result = [...allListings];

    // Text search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        (item.categoryName && item.categoryName.toLowerCase().includes(q))
      );
    }

    // Type filter (studio vs equipment)
    if (resourceType !== 'all') {
      result = result.filter(item => item.type === resourceType);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory || item.slug.includes(selectedCategory));
    }

    // Location filter
    if (selectedLocation !== 'all') {
      result = result.filter(item => {
        const itemArea = item.location?.area?.toLowerCase() || '';
        const itemCity = item.location?.city?.toLowerCase() || '';
        const itemState = item.location?.state?.toLowerCase() || '';
        const query = selectedLocation.toLowerCase();

        return itemArea.includes(query) || itemCity.includes(query) || itemState.includes(query) || query.includes(itemArea);
      });
    }

    // Sort
    if (sortOption === 'price-low') {
      result.sort((a, b) => (a.pricing?.hourlyRate || a.pricing?.dailyRate || 0) - (b.pricing?.hourlyRate || b.pricing?.dailyRate || 0));
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => (b.pricing?.hourlyRate || b.pricing?.dailyRate || 0) - (a.pricing?.hourlyRate || a.pricing?.dailyRate || 0));
    } else if (sortOption === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [allListings, searchTerm, resourceType, selectedCategory, selectedLocation, sortOption]);

  const pageSize = 6;
  const totalPages = Math.ceil(filteredResults.length / pageSize) || 1;
  const paginatedResults = filteredResults.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleClearAll = () => {
    setSearchTerm('');
    setResourceType('all');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSortOption('featured');
    setSearchParams({});
    setCurrentPage(1);
  };

  const activeFilterTags = [];
  if (searchTerm) activeFilterTags.push({ key: 'q', label: `Search: "${searchTerm}"` });
  if (resourceType !== 'all') activeFilterTags.push({ key: 'type', label: resourceType === 'studio' ? 'Studios Only' : 'Equipment Only' });
  if (selectedCategory !== 'all') {
    const matched = ALL_CATEGORIES.find(c => c.slug === selectedCategory);
    activeFilterTags.push({ key: 'category', label: `Category: ${matched?.name || selectedCategory}` });
  }
  if (selectedLocation !== 'all') {
    const matchedLoc = NIGERIAN_LOCATIONS.find(l => l.id === selectedLocation);
    activeFilterTags.push({ key: 'location', label: `Location: ${matchedLoc?.label || selectedLocation}` });
  }

  const removeFilterTag = (key) => {
    if (key === 'q') setSearchTerm('');
    if (key === 'type') setResourceType('all');
    if (key === 'category') setSelectedCategory('all');
    if (key === 'location') setSelectedLocation('all');
    updateUrlParams({ [key]: 'all' });
  };

  return (
    <div className="search-results-view" style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '40px 0 28px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Marketplace Search" }]} />

          <div style={{ maxWidth: '820px' }}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px' }}>
              Marketplace Search Results
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
              Search across verified production studios, creative workspaces, cinema cameras, and audio rigs across Nigeria.
            </p>
          </div>

          {/* Dynamic Marketplace Architecture Notice */}
          <div 
            style={{ 
              marginTop: '16px', 
              padding: '10px 14px', 
              borderRadius: 'var(--radius-sm)', 
              backgroundColor: 'var(--color-lavender)', 
              border: '1px solid var(--color-lavender-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: 'var(--color-primary-dark)'
            }}
          >
            <Info size={15} style={{ flexShrink: 0 }} />
            <span>
              <strong>Dynamic Marketplace Architecture:</strong> Displaying verified, administrator-approved listings in Nigeria. Results update dynamically as owners publish and administrators verify resources.
            </span>
          </div>
        </Container>
      </section>

      {/* Main Search Controls & Results */}
      <section style={{ padding: '36px 0' }}>
        <Container>
          
          {/* Main Filter Bar */}
          <div 
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '16px 20px', 
              display: 'flex', 
              flexDirection: 'column',
              gap: '14px',
              marginBottom: '28px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            {/* Top Search Input & Resource Type Switcher */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search resources, soundstages, RED, Sony, mics..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateUrlParams({ q: e.target.value });
                  }}
                  className="form-control"
                  style={{ paddingLeft: '38px', fontSize: '0.9rem' }}
                />
              </div>

              {/* Resource Type Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  className={`nav-pill ${resourceType === 'all' ? 'active' : ''}`}
                  onClick={() => { setResourceType('all'); updateUrlParams({ type: 'all' }); }}
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                >
                  All Types
                </button>
                <button
                  type="button"
                  className={`nav-pill ${resourceType === 'studio' ? 'active' : ''}`}
                  onClick={() => { setResourceType('studio'); updateUrlParams({ type: 'studio' }); }}
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                >
                  Studios Only
                </button>
                <button
                  type="button"
                  className={`nav-pill ${resourceType === 'equipment' ? 'active' : ''}`}
                  onClick={() => { setResourceType('equipment'); updateUrlParams({ type: 'equipment' }); }}
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                >
                  Equipment Only
                </button>
              </div>
            </div>

            {/* Dropdown Filters (Category, Location, Sort) */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '12px' }}>
              
              <div style={{ minWidth: '180px' }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    updateUrlParams({ category: e.target.value });
                  }}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                  aria-label="Filter by Category"
                >
                  <option value="all">All Categories</option>
                  {ALL_CATEGORIES.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ minWidth: '180px' }}>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    updateUrlParams({ location: e.target.value });
                  }}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                  aria-label="Filter by Location"
                >
                  {NIGERIAN_LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.label}</option>
                  ))}
                </select>
              </div>

              {/* Sort selector */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {filteredResults.length} {filteredResults.length === 1 ? 'Resource' : 'Resources'} Found
                </span>

                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    updateUrlParams({ sort: e.target.value });
                  }}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem', minWidth: '150px' }}
                  aria-label="Sort Results"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

            </div>

            {/* Active Filter Tags Strip */}
            {activeFilterTags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Active Filters:
                </span>
                {activeFilterTags.map(tag => (
                  <span
                    key={tag.key}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-lavender)',
                      color: 'var(--color-primary-dark)',
                      fontSize: '0.78rem',
                      fontWeight: 600
                    }}
                  >
                    <span>{tag.label}</span>
                    <button
                      type="button"
                      onClick={() => removeFilterTag(tag.key)}
                      style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, display: 'flex' }}
                      aria-label={`Remove filter ${tag.label}`}
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}

                <button
                  type="button"
                  onClick={handleClearAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginLeft: '8px'
                  }}
                >
                  Clear All
                </button>
              </div>
            )}

          </div>

          {/* Results Grid or Empty State */}
          {allListings.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No approved listings on the marketplace yet"
              description="RENTIUSE connects Nigerian creators with physical studios and equipment. All listings undergo administrator review before publishing. Are you an owner looking to list your space or gear?"
              actionLabel="Register as an Owner to List Resources"
              actionTo="/register/owner"
            />
          ) : filteredResults.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No resources matched your search query"
              description="We couldn't find any studio spaces or equipment matching your filters. Try removing some filters or searching for terms like 'soundstage', 'podcast', 'Sony', or 'lighting'."
              actionLabel="Clear All Search Filters"
              onAction={handleClearAll}
            />
          ) : (
            <>
              <div className="grid-listings">
                {paginatedResults.map(item => (
                  <ListingCard key={item.id} listing={item} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
              />
            </>
          )}

        </Container>
      </section>

    </div>
  );
}
