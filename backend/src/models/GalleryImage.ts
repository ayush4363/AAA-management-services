import mongoose, { Schema } from 'mongoose';
import { IGalleryImage } from '../types/models';

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['guarding', 'events', 'training', 'patrol', 'infrastructure'],
      default: 'guarding',
    },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    publicId: { type: String },
    altText: { type: String, default: 'AAA Management Services Security Operation' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const GalleryImage = mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
