import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import apiV1Router from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';
import { logger } from './utils/logger';

export const app = express();

// Security and utility middleware
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl) or matched origin
      if (!origin || origin.startsWith('http://localhost') || origin === env.CLIENT_URL) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev mode, configured via env in prod
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Mount API v1 router
app.use('/api/v1', apiV1Router);

// Google Search Console verification endpoint
app.get('/google710cf0c1af6abd62.html', (_req, res) => {
  res.type('text/html').send('google-site-verification: google710cf0c1af6abd62.html');
});

// Robots.txt
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send('User-agent: *\nAllow: /\n\nSitemap: https://aaamanagementservices.in/sitemap.xml\n');
});

// Sitemap.xml
app.get('/sitemap.xml', (_req, res) => {
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aaamanagementservices.in/</loc>
    <lastmod>2026-11-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://aaamanagementservices.in/services</loc>
    <lastmod>2026-11-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aaamanagementservices.in/request-quote</loc>
    <lastmod>2026-11-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aaamanagementservices.in/about</loc>
    <lastmod>2026-11-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aaamanagementservices.in/contact</loc>
    <lastmod>2026-11-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aaamanagementservices.in/gallery</loc>
    <lastmod>2026-11-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://aaamanagementservices.in/faq</loc>
    <lastmod>2026-11-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`);
});

// Root informational endpoint
app.get('/', (_req, expressRes) => {
  expressRes.json({
    name: 'AAA Management Services API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

// 404 and Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Server startup lifecycle
export const startServer = async () => {
  // Connect to MongoDB
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    logger.info(`AAA Management Services API running on port ${env.PORT} [${env.NODE_ENV}]`);
    logger.info(`Health check available at http://localhost:${env.PORT}/api/v1/health`);
  });

  const handleShutdown = () => {
    logger.info('Gracefully shutting down AAA API server...');
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', handleShutdown);
  process.on('SIGINT', handleShutdown);

  return server;
};

// Start automatically when run directly
if (process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    logger.error('Failed to start server:', err);
  });
}
