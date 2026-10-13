import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Store, 
  CheckCircle2, 
  Aperture, 
  Truck, 
  Layers, 
  Tag, 
  Info,
  Clock
} from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageGallery from '../components/common/ImageGallery';
import PriceDisplay from '../components/common/PriceDisplay';
import RatingBadge from '../components/common/RatingBadge';
import ListingCard from '../components/common/ListingCard';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import StatusBadge from '../components/common/StatusBadge';
import { getListingBySlug, getRelatedListings, formatNaira } from '../data/listingsData';

export default function EquipmentDetailView() {
  const { slug } = useParams();

  const gear = getListingBySlug(slug);

  const [rentalDays, setRentalDays] = useState(1);
  const [requestedQuantity, setRequestedQuantity] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!gear || gear.type !== 'equipment') {
    return (
      <Container style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '12px' }}>Equipment Listing Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          The equipment package "{slug}" does not exist or has been relocated.
        </p>
        <Button to="/equipment" variant="primary">
          Browse Available Equipment
        </Button>
      </Container>
    );
  }

  const relatedGear = getRelatedListings(gear, 3);
  const dailyRate = gear.pricing?.dailyRate || (gear.pricing?.hourlyRate ? gear.pricing.hourlyRate * 8 : 0);
  const subtotal = dailyRate * rentalDays * requestedQuantity;
  const deposit = (gear.pricing?.securityDeposit || 0) * requestedQuantity;
  const total = subtotal + deposit;

  const locationString = typeof gear.location === 'object'
    ? `${gear.location.address || ''}, ${gear.location.area || ''}, ${gear.location.state || 'Lagos'}`
    : gear.location;

  return (
    <div className="equipment-detail-view" style={{ paddingBottom: '80px' }}>
      
      {/* Top Breadcrumbs */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '24px 0 16px' }}>
        <Container>
          <Breadcrumbs 
            items={[
              { label: "Equipment", to: "/equipment" },
              { label: gear.title }
            ]} 
          />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-purple">{gear.categoryName || 'Equipment'}</span>
                {gear.brand && <span className="badge badge-outline">{gear.brand}</span>}
                {gear.condition && <span className="badge badge-white">Condition: {gear.condition}</span>}
                {gear.isDemo && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}>
                    DEMONSTRATION LISTING
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>
                {gear.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={15} color="var(--color-primary)" />
                  <span>{locationString}</span>
                </div>
                <RatingBadge rating={gear.rating} reviewCount={gear.reviewCount} />
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <PriceDisplay pricing={gear.pricing} period="day" size="lg" showDeposit />
            </div>
          </div>
        </Container>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '36px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'flex-start' }}>
            
            {/* Left Column: Gallery, Specs, Accessories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', minWidth: 0 }}>
              
              {/* Image Gallery */}
              <ImageGallery images={gear.images} title={gear.title} />

              {/* Description & Overview */}
              <div className="card-surface" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '14px' }}>
                  Equipment Overview
                </h3>
                <p style={{ color: '#374151', lineHeight: 1.75, fontSize: '1rem', marginBottom: '20px' }}>
                  {gear.fullDescription || gear.shortDescription}
                </p>

                {/* Brand / Model / Condition Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>Brand</span>
                    <strong style={{ fontSize: '0.95rem' }}>{gear.brand || 'Professional Grade'}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>Model</span>
                    <strong style={{ fontSize: '0.95rem' }}>{gear.model || 'Standard'}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>Available Units</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>{gear.availableQuantity || 1} Package(s)</strong>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              {gear.specs && gear.specs.length > 0 && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '18px' }}>
                    Technical Specifications
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {gear.specs.map((spec, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                        <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included Accessories */}
              {gear.includedAccessories && gear.includedAccessories.length > 0 && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '18px' }}>
                    What's Included in the Case
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    {gear.includedAccessories.map((acc, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', padding: '10px 14px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                        <Aperture size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{acc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Collection & Delivery Information */}
              <div className="card-surface" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '14px' }}>
                  Pickup, Dispatch & Security Protocol
                </h3>
                
                {gear.collectionInfo && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '0.92rem', color: '#374151' }}>
                    <Truck size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Collection Logistics:</strong> {gear.collectionInfo}</span>
                  </div>
                )}

                {gear.rentalRules && gear.rentalRules.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '10px' }}>Rental Requirements:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#4B5563' }}>
                      {gear.rentalRules.map((rule, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Owner Profile */}
              {gear.owner && (
                <div className="card-surface" style={{ padding: '32px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={gear.owner.avatar}
                    alt={gear.owner.name}
                    style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Vault Owner</span>
                      {gear.owner.verified && <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Verified Owner</span>}
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>
                      {gear.owner.storeName || gear.owner.name}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {gear.owner.bio}
                    </p>
                  </div>

                  <div>
                    {gear.owner.storeSlug && (
                      <Link to={`/${gear.owner.storeSlug}`} className="btn btn-outline btn-sm">
                        <Store size={14} />
                        <span>Visit Storefront</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Pricing & Booking Panel */}
            <div style={{ position: 'sticky', top: '96px', maxWidth: '420px', width: '100%' }}>
              <div 
                className="card-surface" 
                style={{ 
                  padding: '28px', 
                  boxShadow: 'var(--shadow-lg)', 
                  border: '1px solid var(--color-primary-light)' 
                }}
              >
                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                    Daily Rate
                  </div>
                  <PriceDisplay pricing={gear.pricing} period="day" size="lg" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  
                  <div>
                    <label htmlFor="gear-start-date" className="form-label" style={{ fontSize: '0.85rem' }}>
                      Rental Start Date
                    </label>
                    <input
                      id="gear-start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="form-control"
                      style={{ padding: '10px 14px', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label htmlFor="gear-days" className="form-label" style={{ fontSize: '0.85rem' }}>
                        Rental Days
                      </label>
                      <select
                        id="gear-days"
                        value={rentalDays}
                        onChange={(e) => setRentalDays(Number(e.target.value))}
                        className="form-control"
                        style={{ padding: '10px 14px', fontSize: '0.9rem' }}
                      >
                        <option value={1}>1 Day (24 hrs)</option>
                        <option value={2}>2 Days</option>
                        <option value={3}>3 Days</option>
                        <option value={5}>5 Days (Week)</option>
                        <option value={7}>7 Days</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="gear-quantity" className="form-label" style={{ fontSize: '0.85rem' }}>
                        Quantity
                      </label>
                      <select
                        id="gear-quantity"
                        value={requestedQuantity}
                        onChange={(e) => setRequestedQuantity(Number(e.target.value))}
                        className="form-control"
                        style={{ padding: '10px 14px', fontSize: '0.9rem' }}
                      >
                        {Array.from({ length: gear.availableQuantity || 1 }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1} Unit(s)</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                {/* Estimate Breakdown */}
                <div style={{ backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '24px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{formatNaira(dailyRate)} × {rentalDays} day(s)</span>
                    <strong style={{ color: 'var(--color-ink)' }}>{formatNaira(subtotal)}</strong>
                  </div>

                  {deposit > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Security Deposit (Held)</span>
                      <span style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{formatNaira(deposit)}</span>
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                    <strong style={{ color: 'var(--color-ink)' }}>Estimated Total</strong>
                    <strong style={{ color: 'var(--color-primary-dark)' }}>{formatNaira(total)}</strong>
                  </div>
                </div>

                {/* Owner Approval Notice */}
                <div style={{ marginBottom: '20px', padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--color-lavender)', fontSize: '0.82rem', color: '#374151', lineHeight: 1.45 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                    <ShieldCheck size={14} /> Owner Verification Window
                  </div>
                  Payment locks the requested package. The gear vault manager reviews gear condition and approvals prior to checkout.
                </div>

                <Button 
                  onClick={() => setIsBookingModalOpen(true)}
                  variant="primary" 
                  size="lg" 
                  fullWidth
                >
                  Request to Rent Package
                </Button>

                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '12px', margin: 0 }}>
                  Subject to owner inspection & identity verification.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Related Gear */}
      {relatedGear.length > 0 && (
        <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '64px', marginTop: '40px' }}>
          <Container>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px' }}>
              Other Equipment You May Need
            </h3>
            <div className="grid-listings">
              {relatedGear.map(item => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Equipment Rental Request (Phase 1)"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StatusBadge status="awaiting_approval" />
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Workflow Demonstration</span>
          </div>

          <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>{gear.title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#4B5563' }}>
              <div><strong>Start Date:</strong> {startDate || 'Not selected (sample preview)'}</div>
              <div><strong>Rental Period:</strong> {rentalDays} day(s) × {requestedQuantity} unit(s)</div>
              <div><strong>Estimated Subtotal:</strong> {formatNaira(subtotal)}</div>
              <div><strong>Vault Host:</strong> {gear.owner?.storeName || gear.owner?.name}</div>
            </div>
          </div>

          <div className="notice-box notice-info">
            <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.92rem', marginBottom: '4px' }}>
                Phase 1 Development State: Honest Interface
              </strong>
              <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                In Phase 1, live equipment availability and inventory locking are simulated for interface validation. In Phase 2, this workflow integrates verified payment escrow and automated serial tracking.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              setIsBookingModalOpen(false);
              alert('Preliminary equipment rental request workflow demonstrated!');
            }}>
              Acknowledge & Continue
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
