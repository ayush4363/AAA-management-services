import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { Quotation } from '../models/Quotation';
import { PricingConfig } from '../models/PricingConfig';
import { PricingService } from '../services/pricingService';

export const getQuotations = async (_req: Request, res: Response) => {
  try {
    const list = await Quotation.find().sort({ createdAt: -1 });
    return sendSuccess(res, 'Quotations retrieved', list);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const getQuotationById = async (req: Request, res: Response) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return sendError(res, 'Quotation not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Quotation details retrieved', quotation);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const createQuotation = async (req: Request, res: Response) => {
  try {
    const {
      clientName,
      organizationName,
      email,
      phone,
      facilityLocation,
      quoteRequestId,
      rawItems, // Array of { personnelConfigId, count, workingHours }
      validDays = 30,
      customTerms,
    } = req.body;

    if (!clientName || !organizationName || !email || !phone || !facilityLocation || !Array.isArray(rawItems) || rawItems.length === 0) {
      return sendError(res, 'Client details and items are required', 'ValidationError', 400);
    }

    // Generate quotation number
    const countTotal = await Quotation.countDocuments();
    const currentYear = new Date().getFullYear();
    const quotationNumber = `AAA/QTN/${currentYear}/${String(countTotal + 1).padStart(4, '0')}`;

    const items = [];
    let subtotal = 0;
    let serviceTaxGst = 0;

    for (const item of rawItems) {
      const config = await PricingConfig.findById(item.personnelConfigId);
      if (!config) continue;

      const count = Number(item.count) || 1;
      const { breakdown, totalMonthly } = PricingService.calculatePersonnelCost(config.toObject(), count);

      items.push({
        personnelName: config.personnelName,
        count,
        workingHours: item.workingHours || config.workingHours,
        monthlyUnitCost: breakdown.finalPerPerson,
        totalMonthlyCost: totalMonthly,
        breakdown,
      });

      subtotal += breakdown.subtotal * count;
      serviceTaxGst += breakdown.gst * count;
    }

    const grandTotalMonthly = subtotal + serviceTaxGst;
    const validUntil = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000);

    const termsAndConditions = customTerms || [
      'Statutory benefits (PF, ESI, Bonus, EL) will be paid strictly as per Government regulations.',
      'Billing will be submitted monthly on the 1st of every calendar month.',
      'Payment terms: Within 7 days of invoice submission.',
      'Guard replacement guarantee: Within 2 hours of contingency.',
      'Service agreement valid for 12 months with 30-day exit notice.',
    ];

    const quotation = await Quotation.create({
      quotationNumber,
      quoteRequestId,
      clientName: clientName.trim(),
      organizationName: organizationName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      facilityLocation: facilityLocation.trim(),
      items,
      subtotal,
      serviceTaxGst,
      grandTotalMonthly,
      status: 'approved',
      validUntil,
      termsAndConditions,
    });

    return sendSuccess(res, 'Formal security quotation generated successfully', quotation, 201);
  } catch (error: any) {
    return sendError(res, error.message, 'CreateError', 500);
  }
};

export const updateQuotationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!quotation) {
      return sendError(res, 'Quotation not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Quotation status updated', quotation);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};

export const deleteQuotation = async (req: Request, res: Response) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);
    if (!quotation) {
      return sendError(res, 'Quotation not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Quotation deleted successfully', null);
  } catch (error: any) {
    return sendError(res, error.message, 'DeleteError', 500);
  }
};
