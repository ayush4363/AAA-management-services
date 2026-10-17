import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { ContactPage } from './pages/public/ContactPage';
import { FaqPage } from './pages/public/FaqPage';
import { RequestQuotePage } from './pages/public/RequestQuotePage';

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

        {/* Redirect any /admin access to home */}
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path="/admin/*" element={<Navigate to="/" replace />} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<PublicLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
