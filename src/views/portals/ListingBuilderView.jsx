import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  PlusCircle, 
  ArrowLeft, 
  Save, 
  Eye, 
  Send, 
  Trash2, 
  Image as ImageIcon, 
  Camera, 
  Film, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Layers,
  Info
} from 'lucide-react';
import Container from '../../components/common/Container';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { 
  formatNaira, 
  createListingSubmission, 
  updateStoredListing, 
  getStoredListings 
} from '../../data/listingsData';
import { getCurrentUser, getStoreBySlug } from '../../data/storesData';
import { STUDIO_CATEGORIES, EQUIPMENT_CATEGORIES, ALL_CATEGORIES } from '../../data/categoriesData';

const SAMPLE_PHOTO_PRESETS = {
  studio: [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
  ],
  equipment: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1589872766857-2110abb95a08?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'
  ]
};

export default function ListingBuilderView() {
  const navigate = useNavigate();
  const { id: listingId } = useParams();

  const currentUser = getCurrentUser();
  const currentStore = currentUser?.storeSlug ? getStoreBySlug(currentUser.storeSlug) : null;

  const [activeTab, setActiveTab] = useState('basics'); // 'basics', 'media', 'location', 'pricing', 'specs', 'review'
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [notice, setNotice] = useState(null);
  const [errors, setErrors] = useState({});

  // Listing Form State
  const [form, setForm] = useState({
    title: '',
    type: 'studio', // 'studio' | 'equipment'
    category: 'photography-studios',
    shortDescription: '',
    fullDescription: '',
    images: [SAMPLE_PHOTO_PRESETS.studio[0]],
    customImageUrl: '',

    // Location & Logistics
    state: currentStore?.state || 'Lagos',
    city: currentStore?.city || 'Ikeja',
    area: currentStore?.area || 'Ikeja GRA',
    address: currentStore?.address || '',
    logisticsInfo: 'Collection directly from our verified vault or dispatch via secure courier.',

    // Pricing
    rentalUnit: 'both', // 'hour' | 'day' | 'both'
    hourlyRate: '35000',
    dailyRate: '250000',
    securityDeposit: '60000',
    minimumRentalHours: '3',

    // Capacity & Quantities
    quantity: '1',
    capacity: '20',
    floorArea: '1800',
    brand: '',
    model: '',
    condition: 'Flawless',

    // Availability & Scheduling
    operatingHours: currentStore?.operatingHours || '8:00 AM – 8:00 PM',
    availableDays: currentStore?.operatingDays || 'Monday – Saturday',
    bufferMinutes: '60',

    // Specifications & Policies
    facilities: "Seamless White Cyclorama\nMotorized Overhead Truss\nGenerator Backup Power\nAir-conditioned client lounge",
    houseRules: "Valid government ID required\nNo smoking or open flame on cyclorama\nOvertime billed at hourly rate",
    cancellationPolicy: "Flexible: Full refund if cancelled 48 hours before booking start."
  });

  // If editing an existing listing, load it
  useEffect(() => {
    if (listingId) {
      const all = getStoredListings();
      const existing = all.find(i => i.id === listingId);
      if (existing) {
        setForm({
          ...existing,
          hourlyRate: String(existing.pricing?.hourlyRate || ''),
          dailyRate: String(existing.pricing?.dailyRate || ''),
          securityDeposit: String(existing.pricing?.securityDeposit || ''),
          minimumRentalHours: String(existing.pricing?.minimumBookingHours || '3'),
          state: existing.location?.state || 'Lagos',
          city: existing.location?.city || 'Ikeja',
          area: existing.location?.area || 'Ikeja GRA',
          address: existing.location?.address || '',
          facilities: Array.isArray(existing.facilities) ? existing.facilities.join('\n') : (existing.facilities || ''),
          houseRules: Array.isArray(existing.houseRules) ? existing.houseRules.join('\n') : (existing.houseRules || ''),
          images: existing.images || [SAMPLE_PHOTO_PRESETS[existing.type || 'studio'][0]]
        });
      }
    }
  }, [listingId]);

  // When type changes, adjust category
  const handleTypeChange = (newType) => {
    const cats = newType === 'studio' ? STUDIO_CATEGORIES : EQUIPMENT_CATEGORIES;
    setForm(prev => ({
      ...prev,
      type: newType,
      category: cats[0].slug,
      rentalUnit: newType === 'equipment' ? 'day' : 'both',
      images: [SAMPLE_PHOTO_PRESETS[newType][0]]
    }));
  };

  const handleAddImage = (url) => {
    if (!url || !url.trim()) return;
    setForm(prev => ({
      ...prev,
      images: [...prev.images, url.trim()],
      customImageUrl: ''
    }));
  };

  const handleRemoveImage = (index) => {
    setForm(prev => {
      const filtered = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: filtered.length > 0 ? filtered : [SAMPLE_PHOTO_PRESETS[prev.type][0]]
      };
    });
  };

  const handleSetPrimaryImage = (index) => {
    setForm(prev => {
      const selected = prev.images[index];
      const rest = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: [selected, ...rest]
      };
    });
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Please provide a listing title';
    if (!form.shortDescription.trim()) errs.shortDescription = 'Please provide a short summary';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.area.trim()) errs.area = 'Area/Neighborhood is required';
    if (!form.hourlyRate && !form.dailyRate) errs.pricing = 'Enter at least an hourly or daily rate';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildPayload = () => {
    const matchedCategory = ALL_CATEGORIES.find(c => c.slug === form.category);
    
    return {
      title: form.title,
      type: form.type,
      category: form.category,
      categoryName: matchedCategory?.name || form.category,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription || form.shortDescription,
      images: form.images,
      location: {
        address: form.address || `${form.area}, ${form.city}`,
        area: form.area,
        city: form.city,
        state: form.state,
        country: 'Nigeria'
      },
      logisticsInfo: form.logisticsInfo,
      pricing: {
        currency: 'NGN',
        rentalUnit: form.rentalUnit,
        hourlyRate: Number(form.hourlyRate) || 0,
        dailyRate: Number(form.dailyRate) || 0,
        securityDeposit: Number(form.securityDeposit) || 0,
        minimumBookingHours: Number(form.minimumRentalHours) || 1
      },
      specs: form.type === 'equipment' ? [
        form.brand ? `Brand: ${form.brand}` : null,
        form.model ? `Model: ${form.model}` : null,
        `Condition: ${form.condition}`,
        `Available Units: ${form.quantity}`
      ].filter(Boolean) : [
        `Capacity: Up to ${form.capacity} persons`,
        `Dimensions: ${form.floorArea} sq ft floor`,
        `Turnaround buffer: ${form.bufferMinutes} minutes`
      ],
      facilities: form.facilities.split('\n').map(s => s.trim()).filter(Boolean),
      houseRules: form.houseRules.split('\n').map(s => s.trim()).filter(Boolean),
      cancellationPolicy: form.cancellationPolicy,
      operatingHours: form.operatingHours,
      availableDays: form.availableDays,
      owner: {
        name: currentUser?.name || 'Verified Owner',
        storeName: currentStore?.name || currentUser?.storeName || 'Host Studio',
        storeSlug: currentStore?.slug || currentUser?.storeSlug || 'my-store',
        avatar: currentStore?.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verified: true,
        phone: currentStore?.contactPhone || currentUser?.phone || '+234 800 000 0000',
        email: currentStore?.contactEmail || currentUser?.email || 'host@rentiuse.com',
        bio: currentStore?.bio || 'Verified creative workspace and equipment provider.'
      }
    };
  };

  const handleSaveDraft = (e) => {
    e?.preventDefault();
    if (!form.title.trim()) {
      alert('Please enter at least a title to save a draft.');
      return;
    }

    const payload = buildPayload();
    if (listingId) {
      updateStoredListing(listingId, { ...payload, status: 'draft' });
    } else {
      createListingSubmission(payload, true);
    }

    setNotice('Listing saved as Draft. It remains unpublished in your private inventory.');
    setTimeout(() => {
      navigate('/owner/listings');
    }, 1500);
  };

  const handleSubmitForApproval = (e) => {
    e?.preventDefault();
    if (!validate()) {
      alert('Please complete the required listing information before submitting for approval.');
      return;
    }

    const payload = buildPayload();
    if (listingId) {
      updateStoredListing(listingId, { ...payload, status: 'pending_approval' });
    } else {
      createListingSubmission(payload, false);
    }

    setNotice('Listing submitted for Administrator Approval! It will be reviewed by platform moderation before going live.');
    setTimeout(() => {
      navigate('/owner/listings');
    }, 1800);
  };

  const availableCategories = form.type === 'studio' ? STUDIO_CATEGORIES : EQUIPMENT_CATEGORIES;

  return (
    <div className="listing-builder-view" style={{ minHeight: '85vh', paddingBottom: '90px', backgroundColor: 'var(--color-bg-subtle)' }}>
      
      {/* Top Header */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '24px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/owner/listings" className="btn btn-ghost btn-sm" style={{ padding: '8px' }}>
                <ArrowLeft size={18} />
              </Link>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span className="badge badge-purple">GUIDED LISTING BUILDER</span>
                  <span className="badge badge-outline">{listingId ? 'Edit Resource' : 'New Resource'}</span>
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                  {form.title ? form.title : 'Create Resource Listing'}
                </h1>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                onClick={() => setIsPreviewOpen(true)}
                className="btn btn-outline btn-sm"
              >
                <Eye size={14} /> Preview Listing
              </button>

              <button 
                type="button" 
                onClick={handleSaveDraft}
                className="btn btn-ghost btn-sm"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <Save size={14} /> Save Draft
              </button>

              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleSubmitForApproval}
                icon={<Send size={14} />}
              >
                Submit for Approval
              </Button>
            </div>
          </div>

          {/* Section Navigation Pills */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'basics', label: '1. Basic Info & Type' },
              { id: 'media', label: '2. Media Gallery' },
              { id: 'location', label: '3. Location & Access' },
              { id: 'pricing', label: '4. Rates & Deposit' },
              { id: 'specs', label: '5. Specs & Capacity' },
              { id: 'policies', label: '6. Rules & Policies' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn btn-sm ${activeTab === tab.id ? 'btn-secondary' : 'btn-ghost'}`}
                style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', fontSize: '0.82rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '36px 0' }}>
        <Container narrow>
          
          {notice && (
            <div className="notice-box notice-success" style={{ marginBottom: '24px' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{notice}</span>
            </div>
          )}

          <div className="card-surface" style={{ padding: '36px 32px' }}>
            
            {/* TAB 1: BASICS */}
            {activeTab === 'basics' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                  Resource Type & Core Details
                </h3>

                {/* Type Selection */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px' }}>
                    Select Resource Category Type <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div
                      onClick={() => handleTypeChange('studio')}
                      style={{
                        padding: '18px',
                        borderRadius: 'var(--radius-md)',
                        border: `2px solid ${form.type === 'studio' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        background: form.type === 'studio' ? 'var(--color-lavender)' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <Camera size={20} color="var(--color-primary)" />
                        <strong style={{ fontSize: '1rem' }}>Studio / Creative Space</strong>
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        Soundstages, cycloramas, podcast rooms, daylight photo lofts
                      </span>
                    </div>

                    <div
                      onClick={() => handleTypeChange('equipment')}
                      style={{
                        padding: '18px',
                        borderRadius: 'var(--radius-md)',
                        border: `2px solid ${form.type === 'equipment' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        background: form.type === 'equipment' ? 'var(--color-lavender)' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <Film size={20} color="var(--color-primary)" />
                        <strong style={{ fontSize: '1rem' }}>Equipment / Gear Rig</strong>
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        Cinema cameras, lenses, lighting packages, audio mics, and grip gear
                      </span>
                    </div>
                  </div>
                </div>

                <Input
                  id="listing-title"
                  name="title"
                  label="Listing Title"
                  placeholder={form.type === 'studio' ? "e.g. Daylight Editorial Loft Studio & Cyclorama" : "e.g. Sony FX6 Full-Frame Cinema Camera Kit"}
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  error={errors.title}
                  required
                />

                <Select
                  id="listing-category"
                  name="category"
                  label="Category Classification"
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  options={availableCategories.map(c => ({ value: c.slug, label: c.name }))}
                  required
                />

                <Textarea
                  id="listing-short-desc"
                  name="shortDescription"
                  label="Short Summary"
                  placeholder="A concise 1-2 sentence overview visible on search cards..."
                  rows={2}
                  value={form.shortDescription}
                  onChange={(e) => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                  error={errors.shortDescription}
                  required
                />

                <Textarea
                  id="listing-full-desc"
                  name="fullDescription"
                  label="Full Description & Technical Narrative"
                  placeholder="Describe electrical power capabilities, ceiling clearance, sound treatment, included accessories..."
                  rows={4}
                  value={form.fullDescription}
                  onChange={(e) => setForm(prev => ({ ...prev, fullDescription: e.target.value }))}
                />
              </div>
            )}

            {/* TAB 2: MEDIA GALLERY */}
            {activeTab === 'media' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                  Multiple Image Gallery
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Upload high-resolution photography showcasing the real physical condition of your space or equipment package.
                </p>

                {/* Current Images Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  {form.images.map((img, idx) => (
                    <div 
                      key={idx}
                      style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        border: idx === 0 ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: '#FFFFFF'
                      }}
                    >
                      <img src={img} alt={`Upload ${idx}`} style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                      
                      {idx === 0 && (
                        <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'var(--color-primary)', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                          Primary Cover
                        </span>
                      )}

                      <div style={{ padding: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF' }}>
                        {idx !== 0 ? (
                          <button 
                            type="button" 
                            onClick={() => handleSetPrimaryImage(idx)}
                            style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Set as Cover
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Main Photo</span>
                        )}

                        {form.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer' }}
                            title="Remove photo"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Image URL */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      id="custom-img"
                      name="customImageUrl"
                      label="Add Image via URL"
                      placeholder="https://..."
                      value={form.customImageUrl}
                      onChange={(e) => setForm(prev => ({ ...prev, customImageUrl: e.target.value }))}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddImage(form.customImageUrl)}
                    className="btn btn-secondary btn-sm"
                    style={{ marginBottom: '14px' }}
                  >
                    + Add Image
                  </button>
                </div>

                {/* Preset Photography Samples */}
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Quick Preset Royalty-Free Sample Photos
                  </span>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {SAMPLE_PHOTO_PRESETS[form.type].map((preset, idx) => (
                      <img
                        key={idx}
                        src={preset}
                        alt="Preset sample"
                        onClick={() => handleAddImage(preset)}
                        title="Click to add to gallery"
                        style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', cursor: 'pointer', border: '1px solid var(--color-border)' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LOCATION & ACCESS */}
            {activeTab === 'location' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                  Location & Logistics
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Select
                    id="listing-state"
                    name="state"
                    label="State"
                    value={form.state}
                    onChange={(e) => setForm(prev => ({ ...prev, state: e.target.value }))}
                    options={[
                      { value: 'Lagos', label: 'Lagos State' },
                      { value: 'Abuja', label: 'Abuja (FCT)' },
                      { value: 'Rivers', label: 'Rivers State' },
                      { value: 'Oyo', label: 'Oyo State' }
                    ]}
                    required
                  />

                  <Input
                    id="listing-city"
                    name="city"
                    label="City / LGA"
                    placeholder="e.g. Ikeja or Lekki"
                    value={form.city}
                    onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))}
                    error={errors.city}
                    required
                  />
                </div>

                <Input
                  id="listing-area"
                  name="area"
                  label="Area / Neighborhood"
                  placeholder="e.g. Victoria Island or Ikeja GRA"
                  value={form.area}
                  onChange={(e) => setForm(prev => ({ ...prev, area: e.target.value }))}
                  error={errors.area}
                  required
                />

                <Input
                  id="listing-address"
                  name="address"
                  label="Street Address / Vault Location (Disclosed only to approved renters)"
                  placeholder="e.g. 14 Commercial Avenue, Sabo"
                  value={form.address}
                  onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
                />

                <Textarea
                  id="listing-logistics"
                  name="logisticsInfo"
                  label={form.type === 'studio' ? "Studio Access & Parking Instructions" : "Equipment Pickup & Courier Dispatch Policy"}
                  rows={3}
                  value={form.logisticsInfo}
                  onChange={(e) => setForm(prev => ({ ...prev, logisticsInfo: e.target.value }))}
                />
              </div>
            )}

            {/* TAB 4: PRICING & RATES */}
            {activeTab === 'pricing' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                  Rental Rates & Security Safeguards (₦ NGN)
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  All pricing on RENTIUSE is standardized in Nigerian Naira (₦).
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <Input
                    id="listing-hourly"
                    name="hourlyRate"
                    label="Hourly Rate (₦)"
                    type="number"
                    placeholder="35000"
                    value={form.hourlyRate}
                    onChange={(e) => setForm(prev => ({ ...prev, hourlyRate: e.target.value }))}
                    hint={form.hourlyRate ? `Formatted: ${formatNaira(form.hourlyRate)}/hr` : ''}
                  />

                  <Input
                    id="listing-daily"
                    name="dailyRate"
                    label="Daily Rate (₦)"
                    type="number"
                    placeholder="250000"
                    value={form.dailyRate}
                    onChange={(e) => setForm(prev => ({ ...prev, dailyRate: e.target.value }))}
                    hint={form.dailyRate ? `Formatted: ${formatNaira(form.dailyRate)}/day` : ''}
                  />

                  <Input
                    id="listing-deposit"
                    name="securityDeposit"
                    label="Refundable Security Deposit (₦)"
                    type="number"
                    placeholder="60000"
                    value={form.securityDeposit}
                    onChange={(e) => setForm(prev => ({ ...prev, securityDeposit: e.target.value }))}
                    hint={form.securityDeposit ? `Held in escrow: ${formatNaira(form.securityDeposit)}` : ''}
                  />
                </div>

                <div style={{ marginTop: '16px', maxWidth: '300px' }}>
                  <Input
                    id="listing-min-hours"
                    name="minimumRentalHours"
                    label="Minimum Rental Duration"
                    type="number"
                    placeholder="3"
                    value={form.minimumRentalHours}
                    onChange={(e) => setForm(prev => ({ ...prev, minimumRentalHours: e.target.value }))}
                    hint={form.type === 'studio' ? 'Minimum booking hours' : 'Minimum rental days or hours'}
                  />
                </div>
              </div>
            )}

            {/* TAB 5: SPECS & CAPACITY */}
            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                  Specifications, Quantities & Capacity
                </h3>

                {form.type === 'equipment' ? (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <Input
                        id="gear-brand"
                        name="brand"
                        label="Equipment Brand"
                        placeholder="e.g. Sony, RED Digital Cinema, ARRI, Aputure"
                        value={form.brand}
                        onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))}
                      />

                      <Input
                        id="gear-model"
                        name="model"
                        label="Model / Kit Name"
                        placeholder="e.g. FX6 Cinema Line or 600d Pro"
                        value={form.model}
                        onChange={(e) => setForm(prev => ({ ...prev, model: e.target.value }))}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <Input
                        id="gear-quantity"
                        name="quantity"
                        label="Available Stock Quantity"
                        type="number"
                        placeholder="1"
                        value={form.quantity}
                        onChange={(e) => setForm(prev => ({ ...prev, quantity: e.target.value }))}
                      />

                      <Select
                        id="gear-condition"
                        name="condition"
                        label="Physical Condition"
                        value={form.condition}
                        onChange={(e) => setForm(prev => ({ ...prev, condition: e.target.value }))}
                        options={[
                          { value: 'Flawless', label: 'Flawless / Like New' },
                          { value: 'Excellent', label: 'Excellent / Production Ready' },
                          { value: 'Good', label: 'Good / Minor Wear' }
                        ]}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <Input
                        id="studio-capacity"
                        name="capacity"
                        label="Maximum Cast & Crew Capacity"
                        type="number"
                        placeholder="25"
                        value={form.capacity}
                        onChange={(e) => setForm(prev => ({ ...prev, capacity: e.target.value }))}
                        hint="Maximum occupants allowed at one time"
                      />

                      <Input
                        id="studio-floor"
                        name="floorArea"
                        label="Floor Area (sq ft)"
                        type="number"
                        placeholder="1800"
                        value={form.floorArea}
                        onChange={(e) => setForm(prev => ({ ...prev, floorArea: e.target.value }))}
                        hint="Approximate usable staging space"
                      />
                    </div>
                  </>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                  <Input
                    id="operating-hours"
                    name="operatingHours"
                    label="Available Operating Hours"
                    placeholder="e.g. 7:00 AM – 10:00 PM"
                    value={form.operatingHours}
                    onChange={(e) => setForm(prev => ({ ...prev, operatingHours: e.target.value }))}
                  />

                  <Input
                    id="buffer-minutes"
                    name="bufferMinutes"
                    label="Buffer Time Between Rentals (Minutes)"
                    type="number"
                    placeholder="60"
                    value={form.bufferMinutes}
                    onChange={(e) => setForm(prev => ({ ...prev, bufferMinutes: e.target.value }))}
                    hint="Sanitization and gear inspection turnaround window"
                  />
                </div>
              </div>
            )}

            {/* TAB 6: POLICIES */}
            {activeTab === 'policies' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                  Facilities, Accessories & Rental Rules
                </h3>

                <Textarea
                  id="listing-facilities"
                  name="facilities"
                  label={form.type === 'studio' ? "Included Studio Facilities (1 per line)" : "Included Kit Accessories & Cases (1 per line)"}
                  rows={4}
                  value={form.facilities}
                  onChange={(e) => setForm(prev => ({ ...prev, facilities: e.target.value }))}
                />

                <Textarea
                  id="listing-house-rules"
                  name="houseRules"
                  label="House Rules & Rental Constraints (1 per line)"
                  rows={3}
                  value={form.houseRules}
                  onChange={(e) => setForm(prev => ({ ...prev, houseRules: e.target.value }))}
                />

                <Select
                  id="listing-cancellation"
                  name="cancellationPolicy"
                  label="Cancellation Terms"
                  value={form.cancellationPolicy}
                  onChange={(e) => setForm(prev => ({ ...prev, cancellationPolicy: e.target.value }))}
                  options={[
                    { value: 'Flexible: Full refund if cancelled 48 hours before booking start.', label: 'Flexible: Full refund up to 48 hours before start' },
                    { value: 'Moderate: 50% refund if cancelled at least 24 hours before start.', label: 'Moderate: 50% refund up to 24 hours before start' },
                    { value: 'Strict: No refund within 48 hours of booking start time.', label: 'Strict: No refund within 48 hours' }
                  ]}
                />
              </div>
            )}

            {/* Step Controls */}
            <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={handleSaveDraft}
                  className="btn btn-outline btn-sm"
                >
                  <Save size={14} /> Save as Draft
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsPreviewOpen(true)}
                  className="btn btn-secondary btn-sm"
                >
                  <Eye size={14} /> Live Preview
                </button>

                <Button 
                  variant="primary" 
                  onClick={handleSubmitForApproval}
                  icon={<Send size={15} />}
                >
                  Submit for Administrator Approval
                </Button>
              </div>
            </div>

          </div>

        </Container>
      </section>

      {/* LIVE PREVIEW MODAL */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Public Listing Preview"
        size="lg"
      >
        <div style={{ maxHeight: '75vh', overflowY: 'auto', paddingRight: '8px' }}>
          
          <div className="notice-box notice-warning" style={{ marginBottom: '20px' }}>
            <Info size={18} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.82rem' }}>
              <strong>Preview Watermark:</strong> This is an interactive preview of how verified Nigerian renters will see your listing once approved by platform administrators.
            </span>
          </div>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <img src={form.images[0]} alt="Preview cover" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-purple">{form.type === 'studio' ? 'Creative Studio' : 'Equipment'}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{form.area}, {form.city}</span>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>{form.title || 'Untitled Resource'}</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>{form.shortDescription}</p>

              {/* Rates strip */}
              <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Hourly Rate</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)' }}>{formatNaira(form.hourlyRate)}/hr</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Daily Rate</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)' }}>{formatNaira(form.dailyRate)}/day</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Refundable Deposit</span>
                  <strong style={{ fontSize: '1.1rem' }}>{formatNaira(form.securityDeposit)}</strong>
                </div>
              </div>

              {/* Facilities / Accessories */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
                  {form.type === 'studio' ? 'Key Studio Facilities' : 'Included Gear Package Items'}
                </h4>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {form.facilities.split('\n').filter(Boolean).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(false)}>
              Close Preview
            </Button>
            <Button variant="primary" size="sm" onClick={() => { setIsPreviewOpen(false); handleSubmitForApproval(); }}>
              Looks Great — Submit for Approval
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
