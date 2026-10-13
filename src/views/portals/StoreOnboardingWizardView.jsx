import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Store, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Globe, 
  Sparkles, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  FileText, 
  Building2,
  Clock,
  Layers,
  Info
} from 'lucide-react';
import Container from '../../components/common/Container';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { 
  getCurrentUser, 
  setCurrentUser, 
  validateSlug, 
  slugifyStoreName, 
  saveStore, 
  getOnboardingDraft, 
  saveOnboardingDraft, 
  clearOnboardingDraft 
} from '../../data/storesData';
import { ALL_CATEGORIES } from '../../data/categoriesData';
import { NIGERIAN_LOCATIONS } from '../../data/nigerianLocations';

const BANNER_PRESETS = [
  {
    id: 'studio-light',
    label: 'Modern Soundstage',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cinema-gear',
    label: 'Cinema Camera Vault',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'creative-loft',
    label: 'Daylight Photo Loft',
    url: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'audio-suite',
    label: 'Music & Audio Suite',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
  }
];

const LOGO_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
];

export default function StoreOnboardingWizardView() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [currentStep, setCurrentStep] = useState(1);
  const [saveDraftMessage, setSaveDraftMessage] = useState(null);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Identity & Slug
    name: '',
    slug: '',
    autoSlug: true,

    // Step 2: Category & Resource Types
    resourceType: 'both', // 'studio', 'equipment', 'both'
    category: 'photography-studios',
    tagline: '',
    description: '',

    // Step 3: Branding & Visuals
    logoUrl: LOGO_PRESETS[0],
    bannerUrl: BANNER_PRESETS[0].url,

    // Step 4: Location & Contacts
    state: 'Lagos',
    city: 'Ikeja',
    area: 'Ikeja GRA',
    address: '',
    phone: currentUser?.phone || '+234 803 123 4567',
    whatsapp: currentUser?.phone || '+234 803 123 4567',
    email: currentUser?.email || 'owner@rentiuse.com',

    // Step 5: Terms & Business Specs
    operatingDays: 'Monday – Saturday',
    operatingHours: '8:00 AM – 8:00 PM',
    securityDepositPolicy: 'Standard 20-30% refundable security deposit required prior to physical equipment release or space access.',
    verificationTier: 'Government Photo ID + Proof of Address',
    cacNumber: ''
  });

  // Load saved draft on mount if available
  useEffect(() => {
    const draft = getOnboardingDraft();
    if (draft) {
      setFormData(prev => ({ ...prev, ...draft }));
      setSaveDraftMessage('Resumed your previously saved store setup draft.');
      setTimeout(() => setSaveDraftMessage(null), 4000);
    } else if (currentUser?.name && !formData.name) {
      // Pre-fill from current user name
      const defaultName = currentUser.storeName || `${currentUser.name}'s Creative Vault`;
      setFormData(prev => ({
        ...prev,
        name: defaultName,
        slug: slugifyStoreName(defaultName),
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone
      }));
    }
  }, []);

  // Update slug when store name changes if autoSlug is enabled
  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData(prev => {
      const next = { ...prev, name: val };
      if (prev.autoSlug) {
        next.slug = slugifyStoreName(val);
      }
      return next;
    });
    if (errors.name) setErrors(prev => ({ ...prev, name: null }));
  };

  const handleSlugChange = (e) => {
    const rawVal = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({
      ...prev,
      slug: rawVal,
      autoSlug: false
    }));
    if (errors.slug) setErrors(prev => ({ ...prev, slug: null }));
  };

  // Step Validation
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.name.trim()) {
        errs.name = 'Please provide a store name';
      }
      const slugCheck = validateSlug(formData.slug);
      if (!slugCheck.valid) {
        errs.slug = slugCheck.message;
      }
    } else if (step === 2) {
      if (!formData.tagline.trim()) {
        errs.tagline = 'Please enter a short headline / elevator pitch';
      }
      if (!formData.description.trim()) {
        errs.description = 'Please provide a store description';
      }
    } else if (step === 3) {
      if (!formData.logoUrl) {
        errs.logoUrl = 'Please select or enter a logo image';
      }
      if (!formData.bannerUrl) {
        errs.bannerUrl = 'Please select or enter a banner image';
      }
    } else if (step === 4) {
      if (!formData.city.trim()) errs.city = 'City is required';
      if (!formData.area.trim()) errs.area = 'Area/Neighborhood is required';
      if (!formData.phone.trim()) errs.phone = 'Contact phone number is required';
      if (!formData.email.trim()) errs.email = 'Business email is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    saveOnboardingDraft(formData);
    setSaveDraftMessage('Store setup progress saved to local draft. You can resume anytime.');
    setTimeout(() => setSaveDraftMessage(null), 4000);
  };

  const handleCompleteSetup = () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(4)) {
      alert('Please complete all required fields before launching your store.');
      return;
    }

    const storePayload = {
      slug: formData.slug,
      name: formData.name,
      tagline: formData.tagline,
      bio: formData.description,
      ownerName: currentUser?.name || 'Verified Resource Owner',
      ownerAvatar: formData.logoUrl,
      bannerImage: formData.bannerUrl,
      category: formData.category,
      resourceType: formData.resourceType,
      location: `${formData.area}, ${formData.city}, ${formData.state}, Nigeria`,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      area: formData.area,
      contactPhone: formData.phone,
      contactWhatsapp: formData.whatsapp,
      contactEmail: formData.email,
      operatingDays: formData.operatingDays,
      operatingHours: formData.operatingHours,
      securityDepositPolicy: formData.securityDepositPolicy,
      verificationTier: formData.verificationTier,
      cacNumber: formData.cacNumber,
      status: 'active',
      joinedDate: new Date().getFullYear().toString(),
      verified: true
    };

    saveStore(storePayload);
    clearOnboardingDraft();

    // Redirect to Owner Dashboard
    navigate('/owner/dashboard');
  };

  const stepsList = [
    { num: 1, title: 'Store Identity & URL' },
    { num: 2, title: 'Category & Resources' },
    { num: 3, title: 'Visual Branding' },
    { num: 4, title: 'Location & Contacts' },
    { num: 5, title: 'Rental Terms' },
    { num: 6, title: 'Review & Launch' }
  ];

  const slugValidation = validateSlug(formData.slug);

  return (
    <div className="store-onboarding-wizard" style={{ minHeight: '85vh', paddingBottom: '90px', backgroundColor: 'var(--color-bg-subtle)' }}>
      
      {/* Top Header Bar */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '24px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-purple">SHOPIFY-STYLE STORE BUILDER</span>
                <span className="badge badge-outline">Multi-Vendor Setup</span>
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                Set Up Your RENTIUSE Resource Storefront
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                type="button" 
                onClick={handleSaveDraft}
                className="btn btn-outline btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Save size={14} />
                <span>Save Draft & Exit</span>
              </button>

              <Link to="/owner/dashboard" className="btn btn-ghost btn-sm" style={{ color: 'var(--color-text-muted)' }}>
                Skip to Dashboard
              </Link>
            </div>
          </div>

          {/* Progress Indicator Steps */}
          <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
            {stepsList.map(s => {
              const isPast = s.num < currentStep;
              const isCurrent = s.num === currentStep;
              return (
                <div 
                  key={s.num}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '8px 10px',
                    borderTop: `3px solid ${isCurrent ? 'var(--color-primary)' : isPast ? '#10B981' : 'var(--color-border)'}`,
                    opacity: isCurrent || isPast ? 1 : 0.6
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isCurrent ? 'var(--color-primary)' : isPast ? '#065F46' : 'var(--color-text-muted)' }}>
                    {isPast ? `✓ Step ${s.num}` : `Step ${s.num}`}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: isCurrent ? 700 : 500, color: 'var(--color-ink)' }}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Main Wizard Form Container */}
      <section style={{ padding: '36px 0' }}>
        <Container narrow>
          
          {saveDraftMessage && (
            <div className="notice-box notice-success" style={{ marginBottom: '24px' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.88rem' }}>{saveDraftMessage}</span>
            </div>
          )}

          <div className="card-surface" style={{ padding: '36px 32px', boxShadow: 'var(--shadow-md)' }}>
            
            {/* STEP 1: IDENTITY & SLUG */}
            {currentStep === 1 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Step 1 of 6</span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Store Identity & Custom URL Handle</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Every resource owner gets their own dedicated storefront with a unique path-based URL in Nigeria.
                  </p>
                </div>

                <Input
                  id="store-name"
                  name="name"
                  label="Storefront Business Name"
                  placeholder="e.g. Vance Soundstages & Cinema Vault"
                  value={formData.name}
                  onChange={handleNameChange}
                  error={errors.name}
                  required
                  hint="This name appears on your storefront, quotes, and public booking confirmations."
                />

                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="store-slug" style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px' }}>
                    Store URL Handle (Slug) <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', border: `1px solid ${errors.slug ? '#DC2626' : 'var(--color-border)'}`, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <span style={{ padding: '10px 14px', background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--color-border)', fontFamily: 'monospace' }}>
                      rentiuse.com/
                    </span>
                    <input
                      id="store-slug"
                      type="text"
                      value={formData.slug}
                      onChange={handleSlugChange}
                      placeholder="dave-studios"
                      style={{ border: 'none', padding: '10px 14px', width: '100%', outline: 'none', fontSize: '0.92rem', fontFamily: 'monospace', fontWeight: 600 }}
                    />
                  </div>
                  
                  {/* Live Slug Availability Feedback */}
                  <div style={{ marginTop: '8px', fontSize: '0.82rem' }}>
                    {slugValidation.valid ? (
                      <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <Check size={14} /> {slugValidation.message}
                      </span>
                    ) : (
                      <span style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertCircle size={14} /> {errors.slug || slugValidation.message}
                      </span>
                    )}
                  </div>
                  <span style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.78rem', marginTop: '4px' }}>
                    Reserved system paths (e.g., /admin, /studios, /equipment) are strictly protected.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 2: CATEGORY & RESOURCE TYPES */}
            {currentStep === 2 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Step 2 of 6</span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Categories & Resource Types</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Tell renters what creative assets your business provides.
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px' }}>
                    Resource Types Offered <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                    {[
                      { id: 'studio', label: 'Creative Studios & Spaces', desc: 'Soundstages, cycloramas, podcast studios, daylight photo lofts' },
                      { id: 'equipment', label: 'Equipment & Gear', desc: 'Cinema cameras, lighting rigs, audio mics, lenses, and grip trucks' },
                      { id: 'both', label: 'Both Studios & Gear', desc: 'Full production house providing both physical spaces and gear packages' }
                    ].map(type => {
                      const isSelected = formData.resourceType === type.id;
                      return (
                        <div
                          key={type.id}
                          onClick={() => setFormData(prev => ({ ...prev, resourceType: type.id }))}
                          style={{
                            padding: '16px',
                            borderRadius: 'var(--radius-md)',
                            border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            background: isSelected ? 'var(--color-lavender)' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <strong style={{ display: 'block', fontSize: '0.94rem', color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-ink)', marginBottom: '4px' }}>
                            {type.label}
                          </strong>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4, display: 'block' }}>
                            {type.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Select
                  id="store-category"
                  name="category"
                  label="Primary Creative Discipline"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  options={ALL_CATEGORIES.map(c => ({ value: c.slug, label: c.name }))}
                  required
                />

                <Input
                  id="store-tagline"
                  name="tagline"
                  label="Storefront Tagline / Headline"
                  placeholder="e.g. Lagos' premier cinema camera vault and motorized soundstage"
                  value={formData.tagline}
                  onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  error={errors.tagline}
                  required
                  hint="A punchy 1-sentence value proposition displayed beneath your store name."
                />

                <Textarea
                  id="store-description"
                  name="description"
                  label="About Your Rental Business"
                  placeholder="Describe your facilities, team, equipment maintenance standards, and generator backup power..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  error={errors.description}
                  required
                />
              </div>
            )}

            {/* STEP 3: VISUAL BRANDING */}
            {currentStep === 3 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Step 3 of 6</span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Store Branding & Imagery</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Personalize your storefront with high-resolution cover banners and a logo.
                  </p>
                </div>

                {/* Cover Banner Selection */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px' }}>
                    Select Storefront Cover Banner <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                    {BANNER_PRESETS.map(preset => {
                      const isSelected = formData.bannerUrl === preset.url;
                      return (
                        <div
                          key={preset.id}
                          onClick={() => setFormData(prev => ({ ...prev, bannerUrl: preset.url }))}
                          style={{
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            border: `2px solid ${isSelected ? 'var(--color-primary)' : 'transparent'}`,
                            cursor: 'pointer',
                            boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
                          }}
                        >
                          <img src={preset.url} alt={preset.label} style={{ width: '100%', height: '70px', objectFit: 'cover' }} />
                          <div style={{ padding: '6px', fontSize: '0.75rem', textAlign: 'center', background: '#FFFFFF', fontWeight: isSelected ? 700 : 500 }}>
                            {preset.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Input
                    id="custom-banner"
                    name="customBanner"
                    label="Or Enter Custom Banner Image URL"
                    placeholder="https://..."
                    value={formData.bannerUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, bannerUrl: e.target.value }))}
                  />
                </div>

                {/* Logo / Avatar Selection */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px' }}>
                    Select Storefront Logo / Host Avatar <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {LOGO_PRESETS.map((logo, idx) => {
                      const isSelected = formData.logoUrl === logo;
                      return (
                        <img
                          key={idx}
                          src={logo}
                          alt="Preset avatar"
                          onClick={() => setFormData(prev => ({ ...prev, logoUrl: logo }))}
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `3px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            cursor: 'pointer',
                            transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                            transition: 'all 0.2s'
                          }}
                        />
                      );
                    })}
                  </div>
                  <Input
                    id="custom-logo"
                    name="customLogo"
                    label="Or Enter Custom Logo URL"
                    placeholder="https://..."
                    value={formData.logoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                  />
                </div>

                {/* Live Preview Strip */}
                <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Live Branding Preview
                  </span>
                  <div style={{ position: 'relative', height: '110px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <img src={formData.bannerUrl} alt="Banner preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(23, 21, 38, 0.45)' }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={formData.logoUrl} alt="Logo" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #FFFFFF', objectFit: 'cover' }} />
                      <div style={{ color: '#FFFFFF' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 800 }}>{formData.name || 'Your Store Name'}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>rentiuse.com/{formData.slug || 'your-slug'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: LOCATION & CONTACTS */}
            {currentStep === 4 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Step 4 of 6</span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Business Location & Contacts</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Provide genuine Nigerian business location details for physical equipment collection and studio check-ins.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Select
                    id="store-state"
                    name="state"
                    label="State"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    options={[
                      { value: 'Lagos', label: 'Lagos State' },
                      { value: 'Abuja', label: 'Abuja (FCT)' },
                      { value: 'Rivers', label: 'Rivers State' },
                      { value: 'Oyo', label: 'Oyo State' },
                      { value: 'Edo', label: 'Edo State' }
                    ]}
                    required
                  />

                  <Input
                    id="store-city"
                    name="city"
                    label="City / LGA"
                    placeholder="e.g. Ikeja or Lekki"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    error={errors.city}
                    required
                  />
                </div>

                <Input
                  id="store-area"
                  name="area"
                  label="Area / Neighborhood"
                  placeholder="e.g. Victoria Island, Ikeja GRA, or Lekki Phase 1"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  error={errors.area}
                  required
                />

                <Input
                  id="store-address"
                  name="address"
                  label="Physical Studio / Vault Address (Optional / Disclosed to confirmed renters)"
                  placeholder="e.g. 14 Commercial Avenue, Sabo"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Input
                    id="store-phone"
                    name="phone"
                    label="Nigerian Business Phone"
                    type="tel"
                    placeholder="+234 803 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    error={errors.phone}
                    required
                  />

                  <Input
                    id="store-whatsapp"
                    name="whatsapp"
                    label="WhatsApp Business Number"
                    type="tel"
                    placeholder="+234 803 123 4567"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                </div>

                <Input
                  id="store-email"
                  name="email"
                  label="Public Support / Booking Email"
                  type="email"
                  placeholder="bookings@yourstore.ng"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  error={errors.email}
                  required
                />
              </div>
            )}

            {/* STEP 5: RENTAL TERMS & POLICIES */}
            {currentStep === 5 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Step 5 of 6</span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Rental Terms & Verification Requirements</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Define operational hours, deposit safeguards, and identity verification tiers for your storefront.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Input
                    id="operating-days"
                    name="operatingDays"
                    label="Operating Days"
                    placeholder="e.g. Monday – Saturday"
                    value={formData.operatingDays}
                    onChange={(e) => setFormData(prev => ({ ...prev, operatingDays: e.target.value }))}
                  />

                  <Input
                    id="operating-hours"
                    name="operatingHours"
                    label="Operating Hours"
                    placeholder="e.g. 7:00 AM – 9:00 PM"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, operatingHours: e.target.value }))}
                  />
                </div>

                <Select
                  id="verification-tier"
                  name="verificationTier"
                  label="Renter Verification Requirement"
                  value={formData.verificationTier}
                  onChange={(e) => setFormData(prev => ({ ...prev, verificationTier: e.target.value }))}
                  options={[
                    { value: 'Government Photo ID + Proof of Address', label: 'Tier 1: Government Photo ID (NIN / Driver\'s License / Passport)' },
                    { value: 'Registered CAC Company + Director ID', label: 'Tier 2: Registered CAC Corporate Verification (High-end Cinema Gear)' },
                    { value: 'Student ID or NIN', label: 'Tier 3: Student ID or NIN (Budget Indie Spaces)' }
                  ]}
                />

                <Textarea
                  id="deposit-policy"
                  name="securityDepositPolicy"
                  label="Security Deposit & Loss Policy"
                  rows={3}
                  value={formData.securityDepositPolicy}
                  onChange={(e) => setFormData(prev => ({ ...prev, securityDepositPolicy: e.target.value }))}
                  hint="Explained clearly to renters prior to completing their booking checkout."
                />

                <Input
                  id="store-cac"
                  name="cacNumber"
                  label="Nigerian CAC Registration Number (Optional / For Verified Merchant Badge)"
                  placeholder="e.g. RC 1894231 or BN 3849120"
                  value={formData.cacNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, cacNumber: e.target.value }))}
                  hint="If provided, your storefront will display a verified Nigerian business badge after admin inspection."
                />
              </div>
            )}

            {/* STEP 6: REVIEW & LAUNCH */}
            {currentStep === 6 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Step 6 of 6</span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Review & Launch Your Storefront</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Confirm your storefront specifications before initializing your custom URL handle.
                  </p>
                </div>

                {/* Summary Card */}
                <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', marginBottom: '24px', background: '#FFFFFF' }}>
                  
                  {/* Banner */}
                  <div style={{ position: 'relative', height: '140px' }}>
                    <img src={formData.bannerUrl} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(23, 21, 38, 0.45)' }} />
                    <div style={{ position: 'absolute', bottom: '16px', left: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img src={formData.logoUrl} alt="Logo" style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #FFFFFF', objectFit: 'cover' }} />
                      <div style={{ color: '#FFFFFF' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{formData.name}</h3>
                        <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>{formData.tagline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '0.86rem' }}>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Storefront URL</span>
                      <strong style={{ color: 'var(--color-primary-dark)', fontFamily: 'monospace' }}>rentiuse.com/{formData.slug}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Resource Offerings</span>
                      <strong>{formData.resourceType === 'both' ? 'Studios & Equipment' : formData.resourceType === 'studio' ? 'Studios Only' : 'Equipment Only'}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Location</span>
                      <strong>{formData.area}, {formData.city}, {formData.state}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Operating Schedule</span>
                      <strong>{formData.operatingDays} ({formData.operatingHours})</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Contact Email</span>
                      <strong>{formData.email}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Verification Safeguard</span>
                      <strong>{formData.verificationTier}</strong>
                    </div>
                  </div>
                </div>

                <div className="notice-box notice-info" style={{ marginBottom: '24px' }}>
                  <Info size={18} style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block' }}>Approval & Publishing Lifecycle (Requirement F)</strong>
                    <p style={{ margin: '2px 0 0', fontSize: '0.84rem', lineHeight: 1.5 }}>
                      Launching your store initializes your unique path-based URL (`rentiuse.com/{formData.slug}`). Any resource listings you create will start in draft or pending moderation state, and will only become visible to the public once reviewed by platform administrators.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Navigation Buttons */}
            <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} icon={<ArrowLeft size={16} />}>
                    Back
                  </Button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {currentStep < 6 ? (
                  <Button variant="primary" onClick={handleContinue} icon={<ArrowRight size={16} />} iconPosition="right">
                    Continue to Step {currentStep + 1}
                  </Button>
                ) : (
                  <Button variant="primary" size="lg" onClick={handleCompleteSetup} icon={<Sparkles size={18} />}>
                    Launch Storefront & Enter Dashboard
                  </Button>
                )}
              </div>
            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}
