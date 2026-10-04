import mongoose, { Schema } from 'mongoose';
import { IBusinessInfo } from '../types/models';

const BusinessInfoSchema = new Schema<IBusinessInfo>(
  {
    companyName: { type: String, required: true, default: 'AAA Management Services' },
    tagline: { type: String, default: 'Professional Security and Facility Management Services' },
    phone: { type: String, required: true, default: '9045393714' },
    alternatePhone: { type: String },
    email: { type: String, required: true, default: 'contact@aaamanagementservices.com' },
    address: {
      street: { type: String, default: 'Shamshabad Road, Infront Of TV Tower' },
      landmark: { type: String, default: 'Chamruali Mod' },
      locality: { type: String, default: 'Rajpur' },
      city: { type: String, default: 'Agra' },
      state: { type: String, default: 'Uttar Pradesh' },
      pincode: { type: String, default: '282001' },
      country: { type: String, default: 'India' },
    },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    operatingHours: { type: String, default: '24/7 Operations & Control Room' },
    gstNumber: { type: String },
    registrationNumber: { type: String },
    socialLinks: {
      linkedin: { type: String },
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },
  },
  { timestamps: true }
);

export const BusinessInfo = mongoose.model<IBusinessInfo>('BusinessInfo', BusinessInfoSchema);
