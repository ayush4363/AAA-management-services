import mongoose, { Schema } from 'mongoose';
import { IPricingConfig } from '../types/models';

const PricingConfigSchema = new Schema<IPricingConfig>(
  {
    personnelTypeId: { type: String, required: true },
    personnelName: { type: String, required: true },
    description: { type: String, default: '' },
    workingDays: { type: Number, required: true, default: 26 },
    workingHours: { type: Number, required: true, default: 8 },
    basicWage: { type: Number, required: true, default: 0 },
    pfRatePercent: { type: Number, default: 13.0 },
    esiRatePercent: { type: Number, default: 3.25 },
    bonusRatePercent: { type: Number, default: 8.33 },
    leaveWithWagesPercent: { type: Number, default: 5.0 },
    uniformAllowance: { type: Number, default: 0 },
    serviceChargePercent: { type: Number, default: 10.0 },
    gstPercent: { type: Number, default: 18.0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PricingConfig = mongoose.model<IPricingConfig>(
  'PricingConfig',
  PricingConfigSchema
);
