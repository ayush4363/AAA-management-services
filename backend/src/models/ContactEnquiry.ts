import mongoose, { Schema } from 'mongoose';
import { IContactEnquiry } from '../types/models';

const ContactEnquirySchema = new Schema<IContactEnquiry>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    serviceType: { type: String, required: true },
    organizationName: { type: String, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'closed'],
      default: 'new',
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const ContactEnquiry = mongoose.model<IContactEnquiry>(
  'ContactEnquiry',
  ContactEnquirySchema
);
