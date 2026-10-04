import mongoose, { Schema } from 'mongoose';
import { IFAQ } from '../types/models';

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: {
      type: String,
      enum: ['general', 'services', 'pricing', 'compliance'],
      default: 'general',
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const FAQ = mongoose.model<IFAQ>('FAQ', FAQSchema);
