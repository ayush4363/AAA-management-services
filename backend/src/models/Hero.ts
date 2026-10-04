import mongoose, { Schema } from 'mongoose';
import { IHero } from '../types/models';

const HeroSchema = new Schema<IHero>(
  {
    eyebrow: { type: String, required: true, default: 'AAA MANAGEMENT SERVICES' },
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    primaryCtaText: { type: String, default: 'Request Security Quote' },
    primaryCtaLink: { type: String, default: '/request-quote' },
    secondaryCtaText: { type: String, default: 'Explore Services' },
    secondaryCtaLink: { type: String, default: '/services' },
    backgroundImageUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Hero = mongoose.model<IHero>('Hero', HeroSchema);
