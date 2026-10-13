import React, { useState } from 'react';
import { 
  Store, 
  Globe, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  Wrench, 
  ArrowRight, 
  X, 
  User, 
  Mail, 
  Lock, 
  CreditCard, 
  MapPin, 
  Target, 
  Briefcase,
  Layers,
  ShieldCheck
} from 'lucide-react';

export default function CreateStoreModal({ onClose, onCreateStore }) {
  const [step, setStep] = useState(1);

  // Step 1: Account Credentials & Identity
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Business Profile & Goals (Shopify Partner style questions)
  const [assetTypeIntent, setAssetTypeIntent] = useState('both'); // 'spaces', 'equipment', 'both'
  const [businessStage, setBusinessStage] = useState('existing_business');
  const [monthlyVolumeTarget, setMonthlyVolumeTarget] = useState('500k_2m');
  const [primaryCategory, setPrimaryCategory] = useState('Cinema & Studios');

  // Step 3: Storefront & Subdomain
  const [storeName, setStoreName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugStatus, setSlugStatus] = useState({ available: true, message: '' });
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [themeColor, setThemeColor] = useState('#6366f1');

  // Step 4: Nigerian Payout Bank & Location
  const [stateLocation, setStateLocation] = useState('Lagos State');
  const [cityLocation, setCityLocation] = useState('Ikeja, Lagos');
  const [bankName, setBankName] = useState('Access Bank');
  const [accountNumber, setAccountNumber] = useState('');
  const [cacNumber, setCacNumber] = useState('');

  // Handle Subdomain Slug formatting
  const handleSlugInput = (e) => {
    const raw = e.target.value;
    const formatted = raw.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSlug(formatted);

    if (formatted.length < 3) {
      setSlugStatus({ available: false, message: 'Minimum 3 characters required' });
    } else {
      setSlugStatus({ available: true, message: `https://rentiuse.com/${formatted} is available!` });
    }
  };

  const handleStoreNameChange = (e) => {
    const val = e.target.value;
    setStoreName(val);
    if (!slug) {
      const autoSlug = val.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      setSlug(autoSlug);
      setSlugStatus({ available: true, message: `https://rentiuse.com/${autoSlug} is available!` });
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!storeName || !slug) return alert('Please enter store name and subdomain slug');

    const newStore = {
      id: `store_${Date.now()}`,
      slug: slug,
      name: storeName,
      tagline: tagline || `${primaryCategory} Rentals & Services`,
      bio: bio || `Welcome to ${storeName}. Book high quality spaces and equipment on demand in Naira (₦).`,
      ownerName: fullName || 'Store Owner',
      ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bannerImage: assetTypeIntent === 'spaces' ? '/images/studio_space.jpg' : '/images/cinema_camera_kit.jpg',
      location: cityLocation || 'Lagos, Nigeria',
      rating: 5.0,
      reviewCount: 0,
      verified: true,
      category: primaryCategory,
      themeColor: themeColor,
      contactEmail: email || 'owner@rentiuse.com',
      contactPhone: phone || '+234 803 000 0000',
      workingHours: 'Mon - Sat: 8:00 AM - 8:00 PM',
      joinedDate: 'Sep 2026',
      payoutAccount: `${bankName} (${accountNumber ? accountNumber.slice(0, 3) + '****' + accountNumber.slice(-3) : 'Verified'})`,
      listings: [
        {
          id: `item_${Date.now()}_1`,
          title: `${storeName} Premium Featured Asset`,
          category: primaryCategory.includes('Studio') || assetTypeIntent === 'spaces' ? 'Spaces' : 'Equipment',
          collection: 'Main Collection',
          type: assetTypeIntent === 'spaces' ? 'space' : 'equipment',
          description: `Premier asset available for rent at ${storeName}. Verified technical specifications and flexible hourly or daily rates in Naira (₦).`,
          hourlyRate: 45000,
          originalHourlyRate: 60000, // Slash price
          dailyRate: 320000,
          originalDailyRate: 400000, // Slash price
          securityDeposit: 100000,
          image: assetTypeIntent === 'spaces' ? '/images/studio_space.jpg' : '/images/cinema_camera_kit.jpg',
          location: cityLocation || 'Lagos, Nigeria',
          rating: 5.0,
          reviews: 1,
          instantBook: true,
          specs: ['High-end performance & maintenance', '24/7 Generator power backup', 'Verified owner security guarantee'],
          guidelines: ['Standard security deposit required', 'Handle with professional care']
        }
      ]
    };

    onCreateStore(newStore);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '720px', width: '100%', padding: '40px', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} />
        </button>

        {/* Top Onboarding Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="badge-pill badge-indigo" style={{ marginBottom: '8px' }}>
            <Sparkles size={13} /> Shopify-Style Merchant Onboarding
          </span>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 800 }}>Create Your RENTIUSE Store Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Step {step} of 4 — Tell us about your rental business and setup your custom subdomain.
          </p>
        </div>

        {/* 4-Step Progress Indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: step >= 1 ? '#6366f1' : 'rgba(255,255,255,0.1)' }} />
          <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: step >= 2 ? '#6366f1' : 'rgba(255,255,255,0.1)' }} />
          <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: step >= 3 ? '#6366f1' : 'rgba(255,255,255,0.1)' }} />
          <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: step >= 4 ? '#6366f1' : 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* STEP 1: Account Credentials & Identity */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="#818cf8" /> Account & Personal Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Full Name / Account Owner</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. David Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Work Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="owner@yourbusiness.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Phone Number (WhatsApp Ready)</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="+234 803 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Account Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              onClick={() => {
                if (fullName && email && phone) setStep(2);
                else alert('Please fill in your name, email, and phone number');
              }}
            >
              Continue to Business Profile <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Business Intent & Survey (Shopify Partner style questions) */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={18} color="#34d399" /> Business Intent & Asset Type
            </h3>

            {/* Question 1: What type of assets will you rent? */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.88rem' }}>
                1. What main assets will you be renting out on RENTIUSE?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <button 
                  type="button"
                  className={`btn-secondary ${assetTypeIntent === 'spaces' ? 'btn-outline-glow' : ''}`}
                  onClick={() => setAssetTypeIntent('spaces')}
                  style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                >
                  <Building2 size={16} /> Productive Spaces
                </button>
                <button 
                  type="button"
                  className={`btn-secondary ${assetTypeIntent === 'equipment' ? 'btn-outline-glow' : ''}`}
                  onClick={() => setAssetTypeIntent('equipment')}
                  style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                >
                  <Wrench size={16} /> Tools & Gear
                </button>
                <button 
                  type="button"
                  className={`btn-secondary ${assetTypeIntent === 'both' ? 'btn-outline-glow' : ''}`}
                  onClick={() => setAssetTypeIntent('both')}
                  style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                >
                  <Layers size={16} /> Both Spaces & Gear
                </button>
              </div>
            </div>

            {/* Question 2: Business Stage */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.88rem' }}>
                2. Which best describes your current business stage?
              </label>
              <select className="form-select" value={businessStage} onChange={(e) => setBusinessStage(e.target.value)}>
                <option value="existing_business">Active rental business (Moving operations online)</option>
                <option value="individual_owner">Individual owner renting spare equipment/space</option>
                <option value="agency_manager">Property manager or Agency handling client assets</option>
                <option value="new_venture">Starting a brand new rental startup</option>
              </select>
            </div>

            {/* Question 3: Estimated Monthly Volume Target */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.88rem' }}>
                3. Estimated monthly revenue target in Naira (₦)?
              </label>
              <select className="form-select" value={monthlyVolumeTarget} onChange={(e) => setMonthlyVolumeTarget(e.target.value)}>
                <option value="under_500k">Under ₦500,000 / month</option>
                <option value="500k_2m">₦500,000 - ₦2,000,000 / month</option>
                <option value="2m_10m">₦2,000,000 - ₦10,000,000 / month</option>
                <option value="above_10m">Above ₦10,000,000 / month</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>Back</button>
              <button className="btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={() => setStep(3)}>Next Step <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* STEP 3: Storefront Name & Custom Subdomain */}
        {step === 3 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} color="#818cf8" /> Custom Storefront & Subdomain
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Store Title / Business Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. David's Pro Studio & Gear Vault"
                value={storeName}
                onChange={handleStoreNameChange}
                required
              />
            </div>

            {/* Custom Subdomain Slug Box */}
            <div style={{ marginBottom: '20px', background: 'rgba(99,102,241,0.08)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(99,102,241,0.3)' }}>
              <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.88rem' }}>Your Custom Store Subdomain URL</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>https://rentiuse.com/</span>
                <input 
                  type="text" 
                  className="form-input" 
                  value={slug}
                  onChange={handleSlugInput}
                  style={{ fontFamily: 'monospace', fontWeight: 700, color: '#818cf8', width: '220px' }}
                  required
                />
              </div>
              <div style={{ fontSize: '0.8rem', marginTop: '8px', color: slugStatus.available ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {slugStatus.available ? <Check size={14} /> : <AlertCircle size={14} />}
                {slugStatus.message || 'Enter desired store slug'}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Primary Category</label>
              <select className="form-select" value={primaryCategory} onChange={(e) => setPrimaryCategory(e.target.value)}>
                <option value="Cinema & Studios">Cinema & Video Studios</option>
                <option value="Co-working & Workspaces">Co-working & Workstations</option>
                <option value="Power Tools & Construction">Power Tools & Heavy Machinery</option>
                <option value="Maker & Prototyping Lab">Maker & Prototyping Lab</option>
                <option value="Event Spaces">Event Centers & Multipurpose Spaces</option>
              </select>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Store Tagline / Bio</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Commercial video soundstages & 8K cinema gear rentals in Lagos"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>Back</button>
              <button className="btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={() => {
                if (storeName && slug) setStep(4);
                else alert('Please enter store title');
              }}>
                Next: Bank & Location <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Nigerian Payout Bank & Location */}
        {step === 4 && (
          <form onSubmit={handleFinalSubmit}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="#fbbf24" /> Payout Bank Account & Location (Nigeria ₦)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>State Location</label>
                <select className="form-select" value={stateLocation} onChange={(e) => setStateLocation(e.target.value)}>
                  <option value="Lagos State">Lagos State</option>
                  <option value="FCT Abuja">FCT Abuja</option>
                  <option value="Rivers State">Rivers State (Port Harcourt)</option>
                  <option value="Oyo State">Oyo State (Ibadan)</option>
                  <option value="Kano State">Kano State</option>
                  <option value="Anambra State">Anambra State</option>
                  <option value="Edo State">Edo State</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>City / Neighborhood</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Ikeja, Lekki Phase 1, Victoria Island"
                  value={cityLocation}
                  onChange={(e) => setCityLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Payout Bank Name (₦)</label>
                <select className="form-select" value={bankName} onChange={(e) => setBankName(e.target.value)}>
                  <option value="Access Bank">Access Bank</option>
                  <option value="GTBank">Guaranty Trust Bank (GTBank)</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="First Bank">First Bank Nigeria</option>
                  <option value="UBA">United Bank for Africa (UBA)</option>
                  <option value="Kuda Bank">Kuda Microfinance Bank</option>
                  <option value="Moniepoint">Moniepoint Microfinance Bank</option>
                  <option value="OPay">OPay Digital Bank</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Naira Account Number (10 Digits)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 0123456789"
                  maxLength="10"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>CAC Business Reg. Number (Optional)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. RC-1849201"
                value={cacNumber}
                onChange={(e) => setCacNumber(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(3)}>Back</button>
              <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center', padding: '12px' }}>
                🚀 Launch Store (rentiuse.com/{slug})
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
