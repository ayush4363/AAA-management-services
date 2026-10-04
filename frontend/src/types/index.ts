export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface BusinessInfo {
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
}

export interface ServiceItem {
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
}

export interface GalleryItem {
  _id?: string;
  title: string;
  category: string;
  imageUrl: string;
  altText: string;
}

export interface ContactEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  organizationName?: string;
  message: string;
}

export interface QuoteRequestInput {
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
}

export interface PricingConfigItem {
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
}

export interface QuotationRecord {
  _id?: string;
  quotationNumber: string;
  clientName: string;
  organizationName: string;
  email: string;
  phone: string;
  facilityLocation: string;
  subtotal: number;
  serviceTaxGst: number;
  grandTotalMonthly: number;
  status: string;
  validUntil: string;
}

export interface HeroData {
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
}

export interface AboutData {
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
}

export interface WhyChooseUsItem {
  _id?: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
}

export interface ProcessStepItem {
  _id?: string;
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
}
