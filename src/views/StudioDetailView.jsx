import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Store, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  FileText, 
  Users, 
  Phone, 
  Mail,
  Info
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

export default function StudioDetailView() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const studio = getListingBySlug(slug);

  // Booking estimation panel state
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [durationHours, setDurationHours] = useState(4);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!studio || studio.type !== 'studio') {
    return (
      <Container style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '12px' }}>Studio Space Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          The studio listing "{slug}" does not exist or has been relocated.
        </p>
        <Button to="/studios" variant="primary">
          Browse Available Studios
        </Button>
      </Container>
    );
  }

  const relatedStudios = getRelatedListings(studio, 3);
  const hourlyRate = studio.pricing?.hourlyRate || 0;
  const estimatedSubtotal = hourlyRate * durationHours;
  const securityDeposit = studio.pricing?.securityDeposit || 0;
  const estimatedTotal = estimatedSubtotal + securityDeposit;

  const locationString = typeof studio.location === 'object'
    ? `${studio.location.address || ''}, ${studio.location.area || ''}, ${studio.location.state || 'Lagos'}`
    : studio.location;

  return (
    <div className="studio-detail-view" style={{ paddingBottom: '80px' }}>
      
      {/* Top Breadcrumbs */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '24px 0 16px' }}>
        <Container>
          <Breadcrumbs 
            items={[
              { label: "Studios", to: "/studios" },
              { label: studio.title }
            ]} 
          />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-purple">{studio.categoryName || 'Studio Space'}</span>
                <span className="badge badge-outline">🇳🇬 {studio.location.state || 'Nigeria'}</span>
                {studio.isDemo && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}>
                    DEMONSTRATION LISTING
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>
                {studio.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={15} color="var(--color-primary)" />
                  <span>{locationString}</span>
                </div>
                <RatingBadge rating={studio.rating} reviewCount={studio.reviewCount} />
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <PriceDisplay pricing={studio.pricing} period="hour" size="lg" showDeposit />
            </div>
          </div>
        </Container>
      </section>

      {/* Main Studio Body Grid */}
      <section style={{ padding: '36px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'flex-start' }}>
            
            {/* Left Column: Gallery, Inclusions, House Rules */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', minWidth: 0 }}>
              
              {/* Image Gallery */}
              <ImageGallery images={studio.images} title={studio.title} />

              {/* Description */}
              <div className="card-surface" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '14px' }}>
                  About This Space
                </h3>
                <p style={{ color: '#374151', lineHeight: 1.75, fontSize: '1rem', marginBottom: '16px' }}>
                  {studio.fullDescription || studio.shortDescription}
                </p>

                {studio.operatingHours && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}>
                    <Clock size={16} color="var(--color-primary)" />
                    <span><strong>Operating Hours:</strong> {studio.operatingHours}</span>
                  </div>
                )}
              </div>

              {/* Facilities & Amenities */}
              {studio.facilities && studio.facilities.length > 0 && (
                <div className="card-surface" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '18px' }}>
                    Facilities & Included Amenities
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                    {studio.facilities.map((fac, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                        <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* House Rules & Policies */}
              <div className="card-surface" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>
                  House Rules & Cancellation Policy
                </h3>
                
                {studio.houseRules && studio.houseRules.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', color: 'var(--color-ink)' }}>
                      Studio Guidelines:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {studio.houseRules.map((rule, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#4B5563' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {studio.cancellationPolicy && (
                  <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: '4px' }}>
                      Cancellation Terms:
                    </div>
                    <p style={{ margin: 0, color: '#4B5563', lineHeight: 1.5 }}>
                      {studio.cancellationPolicy}
                    </p>
                  </div>
                )}
              </div>

              {/* Owner / Storefront Profile */}
              {studio.owner && (
                <div className="card-surface" style={{ padding: '32px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={studio.owner.avatar}
                    alt={studio.owner.name}
                    style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Host & Owner</span>
                      {studio.owner.verified && <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Verified Host</span>}
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>
                      {studio.owner.storeName || studio.owner.name}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {studio.owner.bio}
                    </p>
                  </div>

                  <div>
                    {studio.owner.storeSlug && (
                      <Link to={`/${studio.owner.storeSlug}`} className="btn btn-outline btn-sm">
                        <Store size={14} />
                        <span>Visit Storefront</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Sticky Availability & Booking Panel */}
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
                    Rental Estimate
                  </div>
                  <PriceDisplay pricing={studio.pricing} period="hour" size="lg" />
                </div>

                {/* Date & Time Selection Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  
                  <div>
                    <label htmlFor="studio-booking-date" className="form-label" style={{ fontSize: '0.85rem' }}>
                      Select Rental Date
                    </label>
                    <input
                      id="studio-booking-date"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="form-control"
                      style={{ padding: '10px 14px', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label htmlFor="studio-start-time" className="form-label" style={{ fontSize: '0.85rem' }}>
                        Start Time
                      </label>
                      <select
                        id="studio-start-time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="form-control"
                        style={{ padding: '10px 14px', fontSize: '0.9rem' }}
                      >
                        <option value="08:00">8:00 AM</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="studio-duration" className="form-label" style={{ fontSize: '0.85rem' }}>
                        Duration (Hours)
                      </label>
                      <select
                        id="studio-duration"
                        value={durationHours}
                        onChange={(e) => setDurationHours(Number(e.target.value))}
                        className="form-control"
                        style={{ padding: '10px 14px', fontSize: '0.9rem' }}
                      >
                        <option value={2}>2 Hours</option>
                        <option value={3}>3 Hours</option>
                        <option value={4}>4 Hours (Half Day)</option>
                        <option value={8}>8 Hours (Full Day)</option>
                        <option value={10}>10 Hours</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Estimate Breakdown */}
                <div style={{ backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '24px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{formatNaira(hourlyRate)} × {durationHours} hrs</span>
                    <strong style={{ color: 'var(--color-ink)' }}>{formatNaira(estimatedSubtotal)}</strong>
                  </div>

                  {securityDeposit > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Security Deposit (Refundable)</span>
                      <span style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{formatNaira(securityDeposit)}</span>
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                    <strong style={{ color: 'var(--color-ink)' }}>Estimated Total</strong>
                    <strong style={{ color: 'var(--color-primary-dark)' }}>{formatNaira(estimatedTotal)}</strong>
                  </div>
                </div>

                {/* Booking Lifecycle Notice */}
                <div style={{ marginBottom: '20px', padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--color-lavender)', fontSize: '0.82rem', color: '#374151', lineHeight: 1.45 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                    <ShieldCheck size={14} /> Owner Approval Policy
                  </div>
                  Payment protects your requested slot. The host must explicitly approve before your reservation is locked.
                </div>

                {/* Action CTA */}
                <Button 
                  onClick={() => setIsBookingModalOpen(true)}
                  variant="primary" 
                  size="lg" 
                  fullWidth
                >
                  Request to Book Space
                </Button>

                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '12px', margin: 0 }}>
                  You won't be charged until you review order details.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Related Studio Listings */}
      {relatedStudios.length > 0 && (
        <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '64px', marginTop: '40px' }}>
          <Container>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px' }}>
              Similar Studios You Might Like
            </h3>
            <div className="grid-listings">
              {relatedStudios.map(item => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Booking Request Modal (Honest Phase 1 Development Notice) */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Rental Booking Request (Phase 1)"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StatusBadge status="awaiting_approval" />
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Workflow Demonstration</span>
          </div>

          <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>{studio.title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#4B5563' }}>
              <div><strong>Scheduled Date:</strong> {bookingDate || 'Not selected (sample preview)'}</div>
              <div><strong>Time & Duration:</strong> {startTime} ({durationHours} hours)</div>
              <div><strong>Estimated Subtotal:</strong> {formatNaira(estimatedSubtotal)}</div>
              <div><strong>Host Store:</strong> {studio.owner?.storeName || studio.owner?.name}</div>
            </div>
          </div>

          {/* Honest development-state message as required by Section 15 */}
          <div className="notice-box notice-info">
            <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.92rem', marginBottom: '4px' }}>
                Phase 1 Development State: Honest Interface
              </strong>
              <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                In Phase 1, payments and live calendar allocations are not connected to a live banking provider. In Phase 2, this workflow will process online payment via Paystack/Flutterwave, lock inventory, and send real-time notification to the host for acceptance.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              setIsBookingModalOpen(false);
              alert('Preliminary booking workflow demonstrated! This will connect to Phase 2 payment gateway.');
            }}>
              Acknowledge & Continue
            </Button>
          </div>

        </div>
      </Modal>

    </div>
  );
}
