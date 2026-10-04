import mongoose, { Schema } from 'mongoose';
import { IPersonnelType } from '../types/models';

const PersonnelTypeSchema = new Schema<IPersonnelType>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dutyType: {
      type: String,
      enum: ['unarmed', 'armed', 'supervisory', 'technical'],
      default: 'unarmed',
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PersonnelType = mongoose.model<IPersonnelType>(
  'PersonnelType',
  PersonnelTypeSchema
);
