import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { ContactPage } from './pages/public/ContactPage';
import { FaqPage } from './pages/public/FaqPage';
import { RequestQuotePage } from './pages/public/RequestQuotePage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminBusinessPage } from './pages/admin/AdminBusinessPage';
import { AdminHeroPage } from './pages/admin/AdminHeroPage';
import { AdminAboutPage } from './pages/admin/AdminAboutPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminWhyAaaPage } from './pages/admin/AdminWhyAaaPage';
import { AdminProcessPage } from './pages/admin/AdminProcessPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminFaqsPage } from './pages/admin/AdminFaqsPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminQuoteRequestsPage } from './pages/admin/AdminQuoteRequestsPage';
import { AdminPricingPage } from './pages/admin/AdminPricingPage';
import { AdminQuotationsPage } from './pages/admin/AdminQuotationsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// 404 Page
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes Wrapped in PublicLayout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="request-quote" element={<RequestQuotePage />} />
        </Route>

        {/* Admin Login (Standalone) */}
        <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLoginPage />} />

        {/* Admin Portal Wrapped in AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to={ROUTES.ADMIN.DASHBOARD} replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="business" element={<AdminBusinessPage />} />
          <Route path="hero" element={<AdminHeroPage />} />
          <Route path="about" element={<AdminAboutPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="why-aaa" element={<AdminWhyAaaPage />} />
          <Route path="process" element={<AdminProcessPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="faqs" element={<AdminFaqsPage />} />
          <Route path="enquiries" element={<AdminEnquiriesPage />} />
          <Route path="quote-requests" element={<AdminQuoteRequestsPage />} />
          <Route path="pricing" element={<AdminPricingPage />} />
          <Route path="quotations" element={<AdminQuotationsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" element={<PublicLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
