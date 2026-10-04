import mongoose, { Schema } from 'mongoose';
import { IQuoteRequest } from '../types/models';

const QuoteRequestSchema = new Schema<IQuoteRequest>(
  {
    clientName: { type: String, required: true, trim: true },
    organizationName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    facilityLocation: { type: String, required: true },
    personnelRequired: [
      {
        personnelType: { type: String, required: true },
        count: { type: Number, required: true, min: 1 },
        shiftHours: { type: Number, required: true, default: 8 },
      },
    ],
    serviceDurationMonths: { type: Number, default: 12 },
    specialRequirements: { type: String },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'generated', 'sent', 'declined'],
      default: 'pending',
    },
    estimatedBudget: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

export const QuoteRequest = mongoose.model<IQuoteRequest>(
  'QuoteRequest',
  QuoteRequestSchema
);
