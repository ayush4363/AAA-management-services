# AAA MANAGEMENT SERVICES

> **Production Platform & Architecture for Enterprise Security Management**  
> Physical Security, Guarding Services, Armed Escorts, and Facility Protection.

---

## 1. Project Overview

AAA Management Services is an enterprise-grade digital platform and CMS tailored for a professional security management enterprise headquartered in Agra, Uttar Pradesh, India.

The solution is architected as an integrated ecosystem:
1. **Public-Facing Web Presence:** Premium, trustworthy presentation for corporate, industrial, and institutional clients.
2. **Administrative CMS Portal:** Management of services, company profile, operational media, incoming leads, and quote requests.
3. **Statutory Manpower Pricing Engine:** Backend-calculated labor compliance and quotation generation (Basic Wages, PF, ESI, Bonus, EL, Uniform, Service Charge, GST).
4. **Decoupled REST API:** Secure Express & TypeScript service connecting to MongoDB.

---

## 2. Architecture Principles

- **Database → Backend API → Frontend:** Editable business information, pricing variables, and operational statistics are never hardcoded into frontend components.
- **Server-Side Pricing Security:** All pricing and quote calculations are strictly computed on the backend. Client payloads are never trusted for financial math.
- **Strict Separation of Concerns:**
  - `routes/` - Endpoint definitions and route mounting
  - `controllers/` - Request handling and response dispatching
  - `services/` - Business logic and pricing algorithms
  - `models/` - Mongoose schemas with validation and timestamps
  - `middleware/` - Security, JWT authorization, error and 404 trapping
  - `config/` - Environment variables, database, and cloud storage

---

## 3. Project Directory Structure

```
aaamanagmentservices/
├── .agents/                    # Taste Skill v2 (Frontend Design Intelligence)
├── backend/                    # Express + TypeScript + MongoDB API
│   ├── src/
│   │   ├── config/             # env.ts, database.ts, cloudinary.ts
│   │   ├── controllers/        # Controllers for all 15 operational domains
│   │   ├── middleware/         # errorHandler, notFound, auth
│   │   ├── models/             # 15 Mongoose schemas
│   │   ├── routes/             # Versioned (/api/v1) route groups
│   │   ├── services/           # pricingService, storageService
│   │   ├── types/              # api.ts, models.ts
│   │   ├── utils/              # logger.ts, response.ts
│   │   └── server.ts           # Server bootstrap & lifecycle
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React + Vite + TypeScript + Tailwind CSS
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, PageContainer, LoadingState, ErrorState
│   │   │   └── ui/             # Button, Input, Textarea, Select, Card, Badge, Modal
│   │   ├── constants/          # routes.ts
│   │   ├── layouts/            # PublicLayout, AdminLayout
│   │   ├── pages/
│   │   │   ├── admin/          # 14 Admin CMS routing placeholders
│   │   │   ├── public/         # 7 Public website routing placeholders
│   │   │   └── NotFoundPage.tsx
│   │   ├── services/           # Centralized API service layer (apiClient, etc.)
│   │   ├── types/              # Frontend interfaces mirroring backend
│   │   ├── App.tsx             # Master React Router mapping
│   │   ├── index.css           # Tailwind + Phase 0 design tokens
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .env.example                # Template for environment configuration
├── .gitignore
├── DESIGN_SYSTEM.md            # Phase 0 Design Intelligence Specification
├── package.json                # Monorepo workspace configuration
└── README.md
```

---

## 4. Environment Variables

Create `.env` based on `.env.example`:

```bash
# Server Environment
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/aaa_management_services

# Authentication
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend (Vite)
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 5. Development Commands

### Install All Dependencies
```bash
npm install
```

### Start Both Frontend and Backend Simultaneously
```bash
npm run dev
```

### Run Workspaces Individually
```bash
# Backend only (runs on http://localhost:5000)
npm run dev:backend

# Frontend only (runs on http://localhost:5173)
npm run dev:frontend
```

### TypeScript Validation & Production Build
```bash
# Run type checks
npm run typecheck --workspace=backend
npm run typecheck --workspace=frontend

# Build both applications
npm run build
```

---

## 6. Route Architecture

### Public Routes
- `/` - Home Page
- `/about` - Corporate & Mission Profile
- `/services` - Security Services Catalog
- `/gallery` - Operations & Field Media
- `/contact` - Direct Headquarters Inquiries
- `/faq` - Compliance & FAQs
- `/request-quote` - Security Manpower Quotation Request

### Admin CMS Routes
- `/admin/login` - Administrator Authentication
- `/admin/dashboard` - Operations & Lead Summary
- `/admin/business` - Company Profile & Location Management
- `/admin/hero` - Top Hero Banner Editor
- `/admin/about` - About & Statistics Editor
- `/admin/services` - Service Catalog CMS
- `/admin/why-aaa` - Trust & Competitive Advantage Badges
- `/admin/process` - Deployment Workflow Steps
- `/admin/gallery` - Media Management
- `/admin/faqs` - FAQ & Guidance Editor
- `/admin/enquiries` - Inbound Contact Inquiries
- `/admin/quote-requests` - Quotation Request Pipeline
- `/admin/pricing` - Manpower Wage & Statutory Pricing Formulae
- `/admin/quotations` - Quotation History & Status
- `/admin/settings` - Global System Preferences

---

## 7. Security Notes

- **Zero Hardcoded Credentials:** No dummy admin credentials exist in code.
- **Fail-Safe Decoupled Database:** The server gracefully starts and remains responsive even during localized database maintenance.
- **Sanitized Client Responses:** Error middleware suppresses stack traces and internal identifiers in production mode.
