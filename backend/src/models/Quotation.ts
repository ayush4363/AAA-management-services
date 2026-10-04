import mongoose, { Schema } from 'mongoose';
import { IQuotation } from '../types/models';

const QuotationItemSchema = new Schema(
  {
    personnelName: { type: String, required: true },
    count: { type: Number, required: true },
    workingHours: { type: Number, required: true },
    monthlyUnitCost: { type: Number, required: true },
    totalMonthlyCost: { type: Number, required: true },
    breakdown: {
      basicWage: { type: Number, required: true },
      pf: { type: Number, required: true },
      esi: { type: Number, required: true },
      bonus: { type: Number, required: true },
      el: { type: Number, required: true },
      uniform: { type: Number, required: true },
      serviceCharge: { type: Number, required: true },
      subtotal: { type: Number, required: true },
      gst: { type: Number, required: true },
      finalPerPerson: { type: Number, required: true },
    },
  },
  { _id: false }
);

const QuotationSchema = new Schema<IQuotation>(
  {
    quotationNumber: { type: String, required: true, unique: true },
    quoteRequestId: { type: Schema.Types.ObjectId, ref: 'QuoteRequest' },
    clientName: { type: String, required: true },
    organizationName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    facilityLocation: { type: String, required: true },
    items: [QuotationItemSchema],
    subtotal: { type: Number, required: true },
    serviceTaxGst: { type: Number, required: true },
    grandTotalMonthly: { type: Number, required: true },
    status: {
      type: String,
      enum: ['draft', 'approved', 'dispatched', 'accepted', 'expired'],
      default: 'draft',
    },
    validUntil: { type: Date, required: true },
    termsAndConditions: [{ type: String }],
    pdfUrl: { type: String },
  },
  { timestamps: true }
);

export const Quotation = mongoose.model<IQuotation>(
  'Quotation',
  QuotationSchema
);
