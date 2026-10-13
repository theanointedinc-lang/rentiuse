import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, PlusCircle, ShieldCheck, Info, Store, CheckCircle2, ArrowRight } from 'lucide-react';
import Container from '../../components/common/Container';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { setCurrentUser, getCurrentUser } from '../../data/storesData';

export default function AuthView({ mode = 'login' }) {
  const isRegister = mode === 'register';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [successInfo, setSuccessInfo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      if (!formData.name || !formData.email || !formData.password) {
        alert("Please complete the required registration fields.");
        return;
      }

      // Initialize current user
      const userPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '+234 800 000 0000',
        storeName: formData.storeName || `${formData.name}'s Creative Vault`
      };

      setCurrentUser(userPayload);

      setSuccessInfo({
        name: formData.name,
        message: `Account created for ${formData.name}! Launching your step-by-step store setup wizard...`
      });

      // Redirect into the Shopify-style store setup wizard
      setTimeout(() => {
        navigate('/owner/onboarding');
      }, 1200);
    } else {
      // Login flow
      const existing = getCurrentUser();
      if (!existing) {
        setCurrentUser({
          name: "Verified Resource Host",
          email: formData.email,
          phone: "+234 803 123 4567"
        });
      }
      navigate('/owner/dashboard');
    }
  };

  return (
    <div className="auth-view" style={{ padding: '60px 0 80px', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <Container narrow>
        <div 
          className="card-surface" 
          style={{ 
            maxWidth: '520px', 
            margin: '0 auto', 
            padding: '40px 32px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '12px' }}>
              {isRegister ? 'BECOME A RESOURCE OWNER' : 'WELCOME BACK'}
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
              {isRegister ? 'Register Your Resource Store' : 'Log in to RENTIUSE'}
            </h1>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
              {isRegister 
                ? 'Create your account to unlock your dedicated Nigerian storefront (rentiuse.com/{storeSlug}) and rental manager.'
                : 'Access your host dashboard to manage bookings, calendar, and equipment.'}
            </p>
          </div>

          {successInfo && (
            <div className="notice-box notice-success" style={{ marginBottom: '24px' }}>
              <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>Account Registered Successfully!</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.86rem' }}>
                  {successInfo.message}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <Input
                  id="auth-name"
                  name="name"
                  label="Full Name"
                  placeholder="e.g. David Vance"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />

                <Input
                  id="auth-store"
                  name="storeName"
                  label="Business / Storefront Brand Name"
                  placeholder="e.g. Vance Pro Studio & Gear Vault"
                  value={formData.storeName}
                  onChange={(e) => setFormData(prev => ({ ...prev, storeName: e.target.value }))}
                  required
                  hint="We'll generate your custom URL handle (rentiuse.com/your-store) in the next step."
                />

                <Input
                  id="auth-phone"
                  name="phone"
                  type="tel"
                  label="Nigerian Phone Number"
                  placeholder="+234 803 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </>
            )}

            <Input
              id="auth-email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />

            <Input
              id="auth-password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />

            <Button type="submit" variant="primary" size="lg" fullWidth style={{ marginTop: '8px' }}>
              {isRegister ? 'Create Account & Continue to Store Setup →' : 'Log in to Portal'}
            </Button>
          </form>

          {/* Toggle between Login and Register */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--color-border-subtle)', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            {isRegister ? (
              <span>
                Already registered?{' '}
                <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                  Log in here
                </Link>
              </span>
            ) : (
              <span>
                Want to list a studio or equipment?{' '}
                <Link to="/register/owner" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                  Register as an Owner
                </Link>
              </span>
            )}
          </div>

        </div>
      </Container>
    </div>
  );
}
