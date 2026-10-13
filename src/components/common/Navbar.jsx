import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, PlusCircle, LogIn, Compass, Building2, Aperture, Info, HelpCircle, Store, User } from 'lucide-react';
import Logo from './Logo';
import Container from './Container';
import { getCurrentUser, getListYourResourcesPath } from '../../data/storesData';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleUpdate = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('rentiuse_user_updated', handleUpdate);
    window.addEventListener('rentiuse_stores_updated', handleUpdate);
    return () => {
      window.removeEventListener('rentiuse_user_updated', handleUpdate);
      window.removeEventListener('rentiuse_stores_updated', handleUpdate);
    };
  }, []);

  const navLinks = [
    { label: "Explore", to: "/search", icon: Compass },
    { label: "Studios", to: "/studios", icon: Building2 },
    { label: "Equipment", to: "/equipment", icon: Aperture },
    { label: "Why Rentiuse", to: "/why-rentiuse", icon: Info },
    { label: "About", to: "/about", icon: HelpCircle }
  ];

  const listResourcesPath = getListYourResourcesPath();

  return (
    <header 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 900, 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'none' }} className="desktop-nav-container">
              <ul style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', margin: 0, padding: 0 }}>
                {navLinks.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Desktop Right Action CTAs */}
          <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="desktop-actions-container">
            {currentUser ? (
              <>
                <Link 
                  to="/owner/dashboard"
                  className="btn btn-ghost btn-sm"
                  style={{ fontWeight: 600, color: 'var(--color-ink)' }}
                >
                  <Store size={15} color="var(--color-primary)" />
                  <span>{currentUser.storeName || 'Owner Portal'}</span>
                </Link>

                <Link 
                  to="/owner/listings/new"
                  className="btn btn-primary btn-sm"
                >
                  <PlusCircle size={15} />
                  <span>+ Add Resource</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="btn btn-ghost btn-sm"
                  style={{ fontWeight: 600, color: 'var(--color-ink)' }}
                >
                  <LogIn size={15} />
                  <span>Log in</span>
                </Link>

                <Link 
                  to={listResourcesPath}
                  className="btn btn-primary btn-sm"
                >
                  <PlusCircle size={15} />
                  <span>List Your Resources</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="mobile-toggle-container" style={{ display: 'flex' }}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px',
                color: 'var(--color-ink)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div 
          style={{ 
            backgroundColor: 'var(--color-white)', 
            borderBottom: '1px solid var(--color-border)',
            padding: '20px 24px 28px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          className="mobile-drawer"
        >
          <nav>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => `btn btn-full ${isActive ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ justifyContent: 'flex-start', padding: '12px 16px', fontSize: '1rem' }}
                    >
                      <Icon size={18} color="var(--color-primary)" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentUser ? (
              <>
                <Link 
                  to="/owner/dashboard"
                  className="btn btn-outline btn-full"
                >
                  <Store size={16} />
                  <span>My Store Dashboard</span>
                </Link>

                <Link 
                  to="/owner/listings/new"
                  className="btn btn-primary btn-full"
                >
                  <PlusCircle size={16} />
                  <span>+ Add New Resource</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="btn btn-outline btn-full"
                >
                  <LogIn size={16} />
                  <span>Log in</span>
                </Link>

                <Link 
                  to={listResourcesPath}
                  className="btn btn-primary btn-full"
                >
                  <PlusCircle size={16} />
                  <span>List Your Resources</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Media query helper styles */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav-container { display: block !important; }
          .desktop-actions-container { display: flex !important; }
          .mobile-toggle-container { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </header>
  );
}
