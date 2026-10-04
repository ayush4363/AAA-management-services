import mongoose, { Schema } from 'mongoose';
import { IProcessStep } from '../types/models';

const ProcessStepSchema = new Schema<IProcessStep>(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, default: 'Compass' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ProcessStep = mongoose.model<IProcessStep>('ProcessStep', ProcessStepSchema);
