import { Router } from 'express';
import { getHealth } from '../controllers/healthController';
import authRoutes from './authRoutes';
import businessRoutes from './businessRoutes';
import heroRoutes from './heroRoutes';
import aboutRoutes from './aboutRoutes';
import serviceRoutes from './serviceRoutes';
import whyAaaRoutes from './whyAaaRoutes';
import processRoutes from './processRoutes';
import galleryRoutes from './galleryRoutes';
import faqRoutes from './faqRoutes';
import enquiryRoutes from './enquiryRoutes';
import quoteRequestRoutes from './quoteRequestRoutes';
import pricingRoutes from './pricingRoutes';
import quotationRoutes from './quotationRoutes';
import settingsRoutes from './settingsRoutes';

const apiV1Router = Router();

// Base health check
apiV1Router.get('/health', getHealth);

// Versioned Route Groups
apiV1Router.use('/auth', authRoutes);
apiV1Router.use('/business', businessRoutes);
apiV1Router.use('/hero', heroRoutes);
apiV1Router.use('/about', aboutRoutes);
apiV1Router.use('/services', serviceRoutes);
apiV1Router.use('/why-aaa', whyAaaRoutes);
apiV1Router.use('/process', processRoutes);
apiV1Router.use('/gallery', galleryRoutes);
apiV1Router.use('/faqs', faqRoutes);
apiV1Router.use('/enquiries', enquiryRoutes);
apiV1Router.use('/quote-requests', quoteRequestRoutes);
apiV1Router.use('/pricing', pricingRoutes);
apiV1Router.use('/quotations', quotationRoutes);
apiV1Router.use('/settings', settingsRoutes);

export default apiV1Router;
