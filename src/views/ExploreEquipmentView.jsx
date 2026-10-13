import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, Aperture, SlidersHorizontal, ArrowUpDown, Search } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ListingCard from '../components/common/ListingCard';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import { getEquipment } from '../data/listingsData';
import { EQUIPMENT_CATEGORIES } from '../data/categoriesData';
import { NIGERIAN_LOCATIONS } from '../data/nigerianLocations';

export default function ExploreEquipmentView() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const locationParam = searchParams.get('location') || 'all';
  const brandParam = searchParams.get('brand') || 'all';
  const rentalUnitParam = searchParams.get('rentalUnit') || 'all';
  const sortParam = searchParams.get('sort') || 'featured';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [rentalUnit, setRentalUnit] = useState(rentalUnitParam);
  const [sortOption, setSortOption] = useState(sortParam);
  const [currentPage, setCurrentPage] = useState(1);

  const allEquipment = getEquipment();

  // Extract unique brands for brand filter
  const availableBrands = useMemo(() => {
    const brands = new Set();
    allEquipment.forEach(item => {
      if (item.brand) brands.add(item.brand);
    });
    return Array.from(brands);
  }, [allEquipment]);

  // Filtering logic
  const filteredEquipment = useMemo(() => {
    let result = [...allEquipment];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        (item.model && item.model.toLowerCase().includes(q)) ||
        item.shortDescription.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory || item.slug.includes(selectedCategory));
    }

    // Location
    if (selectedLocation !== 'all') {
      result = result.filter(item => {
        const itemArea = item.location?.area?.toLowerCase() || '';
        const itemCity = item.location?.city?.toLowerCase() || '';
        const itemState = item.location?.state?.toLowerCase() || '';
        const query = selectedLocation.toLowerCase();

        return itemArea.includes(query) || itemCity.includes(query) || itemState.includes(query) || query.includes(itemArea);
      });
    }

    // Brand
    if (selectedBrand !== 'all') {
      result = result.filter(item => item.brand === selectedBrand);
    }

    // Rental Unit (Hourly vs Daily)
    if (rentalUnit === 'hourly') {
      result = result.filter(item => !!item.pricing?.hourlyRate);
    } else if (rentalUnit === 'daily') {
      result = result.filter(item => !!item.pricing?.dailyRate);
    }

    // Sort
    if (sortOption === 'price-low') {
      result.sort((a, b) => (a.pricing?.dailyRate || a.pricing?.hourlyRate || 0) - (b.pricing?.dailyRate || b.pricing?.hourlyRate || 0));
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => (b.pricing?.dailyRate || b.pricing?.hourlyRate || 0) - (a.pricing?.dailyRate || a.pricing?.hourlyRate || 0));
    } else if (sortOption === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [allEquipment, searchQuery, selectedCategory, selectedLocation, selectedBrand, rentalUnit, sortOption]);

  const pageSize = 6;
  const totalPages = Math.ceil(filteredEquipment.length / pageSize) || 1;
  const paginatedEquipment = filteredEquipment.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedBrand('all');
    setRentalUnit('all');
    setSortOption('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedLocation !== 'all' || selectedBrand !== 'all' || rentalUnit !== 'all' || sortOption !== 'featured';

  return (
    <div className="explore-equipment-view" style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '48px 0 32px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Explore Equipment" }]} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '780px' }}>
            <span className="badge badge-purple" style={{ alignSelf: 'flex-start' }}>
              PRODUCTION GEAR & WORKSTATIONS
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800 }}>
              Professional Equipment Rentals
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Rent 8K cinema cameras, prime lens packages, high-output studio lighting, wireless audio kits, and stabilizers. Flexible hourly and daily rates in Nigerian Naira (₦).
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
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '32px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            {/* Search Input Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search gear by name, brand, or model (e.g. RED, FX6, Aputure)..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="form-control"
                  style={{ paddingLeft: '38px', fontSize: '0.9rem' }}
                />
              </div>

              {/* Rental Unit Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  className={`nav-pill ${rentalUnit === 'all' ? 'active' : ''}`}
                  onClick={() => setRentalUnit('all')}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  All Rates
                </button>
                <button
                  type="button"
                  className={`nav-pill ${rentalUnit === 'daily' ? 'active' : ''}`}
                  onClick={() => setRentalUnit('daily')}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Daily Rates
                </button>
                <button
                  type="button"
                  className={`nav-pill ${rentalUnit === 'hourly' ? 'active' : ''}`}
                  onClick={() => setRentalUnit('hourly')}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Hourly Rates
                </button>
              </div>
            </div>

            {/* Filter Dropdowns (Category, Location, Brand, Sort) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '14px' }}>
              
              {/* Category Filter */}
              <div style={{ minWidth: '170px' }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                  aria-label="Filter by Equipment Category"
                >
                  <option value="all">All Equipment Types</option>
                  {EQUIPMENT_CATEGORIES.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div style={{ minWidth: '150px' }}>
                <select
                  value={selectedBrand}
                  onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                  aria-label="Filter by Brand"
                >
                  <option value="all">All Brands</option>
                  {availableBrands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div style={{ minWidth: '170px' }}>
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
                  <X size={14} /> Clear All
                </button>
              )}

              {/* Sort & Count Header */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {filteredEquipment.length} {filteredEquipment.length === 1 ? 'Package' : 'Packages'} Available
                </span>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem', minWidth: '140px' }}
                  aria-label="Sort Equipment"
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
          {allEquipment.length === 0 ? (
            <EmptyState
              icon={Aperture}
              title="No equipment packages published yet"
              description="RENTIUSE is currently onboarding cinema cameras, lighting kits, and audio gear across Nigeria. Every listing requires administrator review before going live. Do you own cinema cameras, lighting, or audio equipment?"
              actionLabel="List Your Equipment on RENTIUSE"
              actionTo="/register/owner"
            />
          ) : filteredEquipment.length === 0 ? (
            <EmptyState
              icon={Aperture}
              title="No equipment packages match your search"
              description="We couldn't find any cameras or equipment matching your filters. Try clearing your search term or selecting 'All Brands' to view all production packages."
              actionLabel="Clear All Filters"
              onAction={handleClearFilters}
            />
          ) : (
            <>
              <div className="grid-listings">
                {paginatedEquipment.map(gear => (
                  <ListingCard key={gear.id} listing={gear} />
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
