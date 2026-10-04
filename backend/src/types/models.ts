export interface IAdminUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'superadmin' | 'admin' | 'editor';
  isActive: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBusinessInfo {
  _id?: string;
  companyName: string;
  tagline: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  address: {
    street: string;
    landmark: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  operatingHours: string;
  gstNumber?: string;
  registrationNumber?: string;
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHero {
  _id?: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImageUrl?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAbout {
  _id?: string;
  title: string;
  shortDescription: string;
  fullStory: string;
  mission: string;
  vision: string;
  yearsOfExperience: number;
  guardsDeployed: number;
  clientsProtected: number;
  citiesCovered: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  imageUrl?: string;
  keyFeatures: string[];
  deploymentTypes: string[];
  isFeatured: boolean;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWhyChooseUs {
  _id?: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProcessStep {
  _id?: string;
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGalleryImage {
  _id?: string;
  title: string;
  category: 'guarding' | 'events' | 'training' | 'patrol' | 'infrastructure';
  imageUrl: string;
  thumbnailUrl?: string;
  publicId?: string;
  altText: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFAQ {
  _id?: string;
  question: string;
  answer: string;
  category: 'general' | 'services' | 'pricing' | 'compliance';
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContactEnquiry {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  organizationName?: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuoteRequest {
  _id?: string;
  clientName: string;
  organizationName: string;
  email: string;
  phone: string;
  facilityLocation: string;
  personnelRequired: Array<{
    personnelType: string;
    count: number;
    shiftHours: number;
  }>;
  serviceDurationMonths: number;
  specialRequirements?: string;
  status: 'pending' | 'reviewing' | 'generated' | 'sent' | 'declined';
  estimatedBudget?: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPersonnelType {
  _id?: string;
  code: string;
  title: string;
  description: string;
  dutyType: 'unarmed' | 'armed' | 'supervisory' | 'technical';
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPricingConfig {
  _id?: string;
  personnelTypeId: string;
  personnelName: string;
  description: string;
  workingDays: number;
  workingHours: number;
  basicWage: number;
  pfRatePercent: number;
  esiRatePercent: number;
  bonusRatePercent: number;
  leaveWithWagesPercent: number;
  uniformAllowance: number;
  serviceChargePercent: number;
  gstPercent: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuotationItem {
  personnelName: string;
  count: number;
  workingHours: number;
  monthlyUnitCost: number;
  totalMonthlyCost: number;
  breakdown: {
    basicWage: number;
    pf: number;
    esi: number;
    bonus: number;
    el: number;
    uniform: number;
    serviceCharge: number;
    subtotal: number;
    gst: number;
    finalPerPerson: number;
  };
}

export interface IQuotation {
  _id?: string;
  quotationNumber: string;
  quoteRequestId?: string;
  clientName: string;
  organizationName: string;
  email: string;
  phone: string;
  facilityLocation: string;
  items: IQuotationItem[];
  subtotal: number;
  serviceTaxGst: number;
  grandTotalMonthly: number;
  status: 'draft' | 'approved' | 'dispatched' | 'accepted' | 'expired';
  validUntil: Date;
  termsAndConditions: string[];
  pdfUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWebsiteSettings {
  _id?: string;
  siteTitle: string;
  metaDescription: string;
  enableQuoteRequests: boolean;
  maintenanceMode: boolean;
  supportPhone: string;
  supportEmail: string;
  updatedAt?: Date;
}
