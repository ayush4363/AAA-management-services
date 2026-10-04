import mongoose, { Schema } from 'mongoose';
import { IAbout } from '../types/models';

const AboutSchema = new Schema<IAbout>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullStory: { type: String, required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true },
    yearsOfExperience: { type: Number, default: 0 },
    guardsDeployed: { type: Number, default: 0 },
    clientsProtected: { type: Number, default: 0 },
    citiesCovered: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const About = mongoose.model<IAbout>('About', AboutSchema);
