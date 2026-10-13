import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, Building2, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import SectionHeader from '../components/common/SectionHeader';
import ListingCard from '../components/common/ListingCard';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import Button from '../components/common/Button';
import { getStudios } from '../data/listingsData';
import { STUDIO_CATEGORIES } from '../data/categoriesData';
import { NIGERIAN_LOCATIONS } from '../data/nigerianLocations';

export default function ExploreStudiosView() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter state from URL params
  const categoryParam = searchParams.get('category') || 'all';
  const locationParam = searchParams.get('location') || 'all';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [sortOption, setSortOption] = useState(sortParam);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const allStudios = getStudios();

  // Apply filtering and sorting
  const filteredStudios = useMemo(() => {
    let result = [...allStudios];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory || item.slug.includes(selectedCategory));
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      result = result.filter(item => {
        const itemArea = item.location?.area?.toLowerCase() || '';
        const itemCity = item.location?.city?.toLowerCase() || '';
        const itemState = item.location?.state?.toLowerCase() || '';
        const query = selectedLocation.toLowerCase();

        return itemArea.includes(query) || itemCity.includes(query) || itemState.includes(query) || query.includes(itemArea);
      });
    }

    // Filter by max hourly price
    if (maxPrice && !isNaN(Number(maxPrice))) {
      result = result.filter(item => (item.pricing?.hourlyRate || 0) <= Number(maxPrice));
    }

    // Sort
    if (sortOption === 'price-low') {
      result.sort((a, b) => (a.pricing?.hourlyRate || 0) - (b.pricing?.hourlyRate || 0));
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => (b.pricing?.hourlyRate || 0) - (a.pricing?.hourlyRate || 0));
    } else if (sortOption === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [allStudios, selectedCategory, selectedLocation, maxPrice, sortOption]);

  const pageSize = 6;
  const totalPages = Math.ceil(filteredStudios.length / pageSize) || 1;
  const paginatedStudios = filteredStudios.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedLocation('all');
    setMaxPrice('');
    setSortOption('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedLocation !== 'all' || maxPrice !== '' || sortOption !== 'featured';

  return (
    <div className="explore-studios-view" style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '48px 0 32px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Explore Studios" }]} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '780px' }}>
            <span className="badge badge-purple" style={{ alignSelf: 'flex-start' }}>
              CREATIVE SPACES & SOUNDSTAGES
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800 }}>
              Professional Studios in Nigeria
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Book daylight lofts, cyclorama soundstages, podcast suites, and creative meeting rooms across Lagos and Abuja. Hourly and daily rates in Nigerian Naira.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Filter & Listing Section */}
      <section style={{ padding: '40px 0' }}>
        <Container>
          
          {/* Top Filter Bar Controls */}
          <div 
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '16px 20px', 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              gap: '16px',
              marginBottom: '32px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            {/* Filter Inputs (Category, Location, Price) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
              
              {/* Category Filter */}
              <div style={{ minWidth: '180px' }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                  aria-label="Filter by Studio Category"
                >
                  <option value="all">All Studio Types</option>
                  {STUDIO_CATEGORIES.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div style={{ minWidth: '180px' }}>
                <select
                  value={selectedLocation}
                  onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                  aria-label="Filter by Nigerian Location"
                >
                  {NIGERIAN_LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.label}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div style={{ minWidth: '160px' }}>
                <select
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                  aria-label="Filter by Max Hourly Rate"
                >
                  <option value="">Any Hourly Price</option>
                  <option value="30000">Up to ₦30,000 / hr</option>
                  <option value="45000">Up to ₦45,000 / hr</option>
                  <option value="65000">Up to ₦65,000 / hr</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px'
                  }}
                >
                  <X size={14} /> Clear Filters
                </button>
              )}
            </div>

            {/* Sort & Count Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {filteredStudios.length} {filteredStudios.length === 1 ? 'Studio' : 'Studios'} Available
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowUpDown size={14} color="var(--color-text-muted)" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem', minWidth: '150px' }}
                  aria-label="Sort Studio Listings"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

          </div>

          {/* Listings Grid or Empty State */}
          {allStudios.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No studio spaces published yet"
              description="RENTIUSE is currently onboarding creative spaces across Lagos, Abuja, and Port Harcourt. Every studio is vetted by platform administrators before appearing publicly. Do you own a photography studio, podcast suite, or production space?"
              actionLabel="List Your Studio on RENTIUSE"
              actionTo="/register/owner"
            />
          ) : filteredStudios.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No studios match your filter criteria"
              description="We couldn't find any studio spaces matching your chosen category, price, or location. Try clearing your filters to see all available studios."
              actionLabel="Clear All Filters"
              onAction={handleClearFilters}
            />
          ) : (
            <>
              <div className="grid-listings">
                {paginatedStudios.map(studio => (
                  <ListingCard key={studio.id} listing={studio} />
                ))}
              </div>

              {/* Pagination */}
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
