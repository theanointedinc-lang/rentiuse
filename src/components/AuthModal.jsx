import React, { useState } from 'react';
import { Building2, Mail, Lock, User, ArrowRight, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  registeredUsers, 
  onSignInSuccess, 
  onSignUpSuccess 
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp) {
      // Check if email already registered
      const existing = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        setErrorMsg('An account with this email already exists. Please Sign In instead.');
        return;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        fullName,
        email,
        password,
        joinedDate: 'Sep 2026'
      };

      onSignUpSuccess(newUser);
      alert(`🎉 Account created for ${email}! Proceeding to store setup.`);
      onClose();
    } else {
      // Sign In Flow with Email & Password
      const user = registeredUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        onSignInSuccess(user);
        alert(`Welcome back, ${user.fullName || user.email}!`);
        onClose();
      } else {
        // If demo email or user not found, allow quick demo login or show error
        setErrorMsg('Invalid email or password. If you are new, click "Sign Up" below to create your account.');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '440px', width: '100%', padding: '36px', position: 'relative' }} onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Building2 size={26} color="white" />
          </div>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800 }}>
            {isSignUp ? 'Sign Up Once' : 'Sign In to RENTIUSE'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            {isSignUp 
              ? 'Create your account once to manage your store & bookings' 
              : 'Sign in with your registered email and password'
            }
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', padding: '10px 14px', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Full Name / Business Name</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. David Vance"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                  required
                />
                <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                className="form-input" 
                placeholder="owner@yourdomain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ paddingLeft: '40px' }}
                required
              />
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingLeft: '40px' }}
                required
              />
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginBottom: '16px' }}>
            {isSignUp ? 'Complete Registration' : 'Sign In'} <ArrowRight size={16} />
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isSignUp ? 'Already registered?' : 'Need an account?'}{' '}
            <button 
              type="button" 
              onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
              style={{ background: 'none', border: 'none', color: '#818cf8', fontWeight: 700, cursor: 'pointer' }}
            >
              {isSignUp ? 'Sign In with Email' : 'Sign Up Once'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
