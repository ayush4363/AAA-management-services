import mongoose, { Schema } from 'mongoose';
import { IWhyChooseUs } from '../types/models';

const WhyChooseUsSchema = new Schema<IWhyChooseUs>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, default: 'CheckCircle' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const WhyChooseUs = mongoose.model<IWhyChooseUs>('WhyChooseUs', WhyChooseUsSchema);
