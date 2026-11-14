import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(distDir)) {
  console.error('[generate-routes] Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[generate-routes] Error: dist/index.html does not exist.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

const routes = [
  {
    path: 'services',
    title: 'Security Services & Guard Deployment | AAA Management Services',
    description:
      'Professional security services in Agra: unarmed security guards, licensed armed escorts, night patrol officers, and facility sentries.',
  },
  {
    path: 'about',
    title: 'About Us | AAA Management Services Agra',
    description:
      'Learn about AAA Management Services, Agra premier security and facility management agency providing statutory compliant security personnel.',
  },
  {
    path: 'contact',
    title: 'Contact Us | AAA Management Services Agra',
    description:
      'Contact AAA Management Services in Agra for security guard deployment, site consultation, and 24/7 security services.',
  },
  {
    path: 'request-quote',
    title: 'Request a Security Quote | AAA Management Services',
    description:
      'Request a customized security manpower quotation for guards, supervisors, and armed sentries in Agra.',
  },
  {
    path: 'gallery',
    title: 'Operations Gallery | AAA Management Services',
    description:
      'Explore authentic photos of our disciplined security guards, armed sentries, and field deployment teams in Agra.',
  },
  {
    path: 'faq',
    title: 'Frequently Asked Questions | AAA Management Services',
    description:
      'Frequently asked questions regarding security guard hiring, statutory compliance, deployment timelines, and pricing in Agra.',
  },
];

console.log('[generate-routes] Generating static entry points for valid public routes...');

routes.forEach((route) => {
  const canonicalUrl = `https://aaamanagementservices.in/${route.path}`;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

  if (html.includes('<meta name="description"')) {
    html = html.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${route.description}" />`
    );
  } else {
    html = html.replace(
      '</head>',
      `    <meta name="description" content="${route.description}" />\n  </head>`
    );
  }

  // 1. Write dist/<route>.html
  const distFile = path.join(distDir, `${route.path}.html`);
  fs.writeFileSync(distFile, html, 'utf-8');

  // 2. Write dist/<route>/index.html
  const distSubdir = path.join(distDir, route.path);
  if (!fs.existsSync(distSubdir)) {
    fs.mkdirSync(distSubdir, { recursive: true });
  }
  fs.writeFileSync(path.join(distSubdir, 'index.html'), html, 'utf-8');

  // 3. Write public/<route>.html
  const publicFile = path.join(publicDir, `${route.path}.html`);
  fs.writeFileSync(publicFile, html, 'utf-8');

  // 4. Write public/<route>/index.html
  const publicSubdir = path.join(publicDir, route.path);
  if (!fs.existsSync(publicSubdir)) {
    fs.mkdirSync(publicSubdir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicSubdir, 'index.html'), html, 'utf-8');

  console.log(`[generate-routes] Created: /${route.path}.html and /${route.path}/index.html`);
});

// Also create 404.html in dist and public with clean 404 status presentation
let notFoundHtml = template
  .replace(/<title>.*?<\/title>/, '<title>404 - Page Not Found | AAA Management Services</title>')
  .replace(/<link rel="canonical" href=".*?" \/>/, '')
  .replace(
    '</head>',
    '    <meta name="robots" content="noindex, follow" />\n  </head>'
  );

fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');
fs.writeFileSync(path.join(publicDir, '404.html'), notFoundHtml, 'utf-8');
console.log('[generate-routes] Created: 404.html for genuine not-found responses.');
console.log('[generate-routes] All static routes successfully generated.');
