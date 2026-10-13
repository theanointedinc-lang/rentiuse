import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';

// Public Marketplace Views
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import WhyRentiuseView from './views/WhyRentiuseView';
import ContactView from './views/ContactView';
import ExploreStudiosView from './views/ExploreStudiosView';
import ExploreEquipmentView from './views/ExploreEquipmentView';
import SearchResultsView from './views/SearchResultsView';
import StudioDetailView from './views/StudioDetailView';
import EquipmentDetailView from './views/EquipmentDetailView';
import HelpView from './views/HelpView';
import TermsView from './views/TermsView';
import PrivacyView from './views/PrivacyView';
import CancellationPolicyView from './views/CancellationPolicyView';
import NotFoundView from './views/NotFoundView';

// Storefront & Portal Views
import StorefrontRouteWrapper from './views/StorefrontRouteWrapper';
import OwnerPortalView from './views/portals/OwnerPortalView';
import CustomerPortalView from './views/portals/CustomerPortalView';
import AdminPortalView from './views/portals/AdminPortalView';
import AuthView from './views/portals/AuthView';
import StoreOnboardingWizardView from './views/portals/StoreOnboardingWizardView';
import ListingBuilderView from './views/portals/ListingBuilderView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          {/* Main Public Website Routes */}
          <Route index element={<HomeView />} />
          <Route path="about" element={<AboutView />} />
          <Route path="why-rentiuse" element={<WhyRentiuseView />} />
          <Route path="contact" element={<ContactView />} />
          
          {/* Catalog & Search Routes */}
          <Route path="studios" element={<ExploreStudiosView />} />
          <Route path="equipment" element={<ExploreEquipmentView />} />
          <Route path="search" element={<SearchResultsView />} />
          <Route path="studios/:slug" element={<StudioDetailView />} />
          <Route path="equipment/:slug" element={<EquipmentDetailView />} />

          {/* Help & Policies */}
          <Route path="help" element={<HelpView />} />
          <Route path="terms" element={<TermsView />} />
          <Route path="privacy" element={<PrivacyView />} />
          <Route path="cancellation-policy" element={<CancellationPolicyView />} />

          {/* Auth & Registration Routes */}
          <Route path="login" element={<AuthView mode="login" />} />
          <Route path="register/owner" element={<AuthView mode="register" />} />

          {/* Shopify-Style Owner Store Setup Wizard */}
          <Route path="owner/onboarding" element={<StoreOnboardingWizardView />} />

          {/* Guided Resource Listing Builder */}
          <Route path="owner/listings/new" element={<ListingBuilderView />} />
          <Route path="owner/listings/:id/edit" element={<ListingBuilderView />} />

          {/* Owner Portal Management Routes */}
          <Route path="owner/dashboard" element={<OwnerPortalView section="overview" />} />
          <Route path="owner/store" element={<OwnerPortalView section="store" />} />
          <Route path="owner/listings" element={<OwnerPortalView section="listings" />} />
          <Route path="owner/bookings" element={<OwnerPortalView section="bookings" />} />
          <Route path="owner/calendar" element={<OwnerPortalView section="calendar" />} />
          <Route path="owner/inventory" element={<OwnerPortalView section="inventory" />} />
          <Route path="owner/pricing" element={<OwnerPortalView section="pricing" />} />
          <Route path="owner/earnings" element={<OwnerPortalView section="earnings" />} />
          <Route path="owner/store-settings" element={<OwnerPortalView section="store-settings" />} />
          <Route path="owner/account-settings" element={<OwnerPortalView section="account-settings" />} />
          <Route path="owner/settings" element={<OwnerPortalView section="store-settings" />} />

          {/* Customer Portal Routes */}
          <Route path="account/bookings" element={<CustomerPortalView tab="bookings" />} />
          <Route path="account/saved" element={<CustomerPortalView tab="saved" />} />
          <Route path="account/settings" element={<CustomerPortalView tab="settings" />} />

          {/* Admin Portal Routes */}
          <Route path="admin" element={<AdminPortalView section="overview" />} />
          <Route path="admin/users" element={<AdminPortalView section="users" />} />
          <Route path="admin/owners" element={<AdminPortalView section="owners" />} />
          <Route path="admin/listings" element={<AdminPortalView section="listings" />} />
          <Route path="admin/bookings" element={<AdminPortalView section="bookings" />} />
          <Route path="admin/payments" element={<AdminPortalView section="payments" />} />
          <Route path="admin/settings" element={<AdminPortalView section="settings" />} />

          {/* Dynamic Storefront Route (rentiuse.com/{storeSlug}) */}
          <Route path=":storeSlug" element={<StorefrontRouteWrapper />} />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
