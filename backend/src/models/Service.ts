import mongoose, { Schema } from 'mongoose';
import { IService } from '../types/models';

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    iconName: { type: String, default: 'Shield' },
    imageUrl: { type: String },
    keyFeatures: [{ type: String }],
    deploymentTypes: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
