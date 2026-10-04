import mongoose, { Schema } from 'mongoose';
import { IWebsiteSettings } from '../types/models';

const WebsiteSettingsSchema = new Schema<IWebsiteSettings>(
  {
    siteTitle: { type: String, default: 'AAA Management Services' },
    metaDescription: {
      type: String,
      default: 'Premier Security and Facility Management Services headquartered in Agra, Uttar Pradesh.',
    },
    enableQuoteRequests: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
    supportPhone: { type: String, default: '9045393714' },
    supportEmail: { type: String, default: 'contact@aaamanagementservices.com' },
  },
  { timestamps: true }
);

export const WebsiteSettings = mongoose.model<IWebsiteSettings>(
  'WebsiteSettings',
  WebsiteSettingsSchema
);
