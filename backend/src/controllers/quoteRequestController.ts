import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { QuoteRequest } from '../models/QuoteRequest';

export const submitQuoteRequest = async (req: Request, res: Response) => {
  try {
    const {
      clientName,
      organizationName,
      email,
      phone,
      facilityLocation,
      personnelRequired,
      serviceDurationMonths,
      specialRequirements,
    } = req.body;

    if (!clientName || !organizationName || !email || !phone || !facilityLocation) {
      return sendError(
        res,
        'Client name, organization, email, phone, and facility location are required',
        'ValidationError',
        400
      );
    }

    const quoteRequest = await QuoteRequest.create({
      clientName: clientName.trim(),
      organizationName: organizationName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      facilityLocation: facilityLocation.trim(),
      personnelRequired: Array.isArray(personnelRequired) ? personnelRequired : [],
      serviceDurationMonths: Number(serviceDurationMonths) || 12,
      specialRequirements: specialRequirements ? specialRequirements.trim() : undefined,
      status: 'pending',
    });

    return sendSuccess(
      res,
      'Your quote request has been registered. Our security deployment team will review your specifications.',
      quoteRequest,
      201
    );
  } catch (error: any) {
    return sendError(res, error.message, 'SubmitError', 500);
  }
};

export const getQuoteRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await QuoteRequest.find().sort({ createdAt: -1 });
    return sendSuccess(res, 'Quote requests retrieved', requests);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const updateQuoteRequestStatus = async (req: Request, res: Response) => {
  try {
    const { status, notes, estimatedBudget } = req.body;
    const request = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { status, notes, estimatedBudget },
      { new: true }
    );
    if (!request) {
      return sendError(res, 'Quote request not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Quote request updated', request);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};

export const deleteQuoteRequest = async (req: Request, res: Response) => {
  try {
    const request = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return sendError(res, 'Quote request not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Quote request deleted', null);
  } catch (error: any) {
    return sendError(res, error.message, 'DeleteError', 500);
  }
};
