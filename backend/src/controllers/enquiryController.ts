import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { ContactEnquiry } from '../models/ContactEnquiry';

export const submitEnquiry = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, serviceType, message, organizationName } = req.body;

    if (!fullName || !email || !phone || !message) {
      return sendError(res, 'Full name, email, phone, and message are required', 'ValidationError', 400);
    }

    const enquiry = await ContactEnquiry.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      serviceType: serviceType || 'General Inquiries',
      organizationName: organizationName ? organizationName.trim() : undefined,
      message: message.trim(),
      status: 'new',
    });

    return sendSuccess(
      res,
      'Your enquiry has been registered. The AAA Management Services operations team will contact you shortly.',
      enquiry,
      201
    );
  } catch (error: any) {
    return sendError(res, error.message, 'SubmitError', 500);
  }
};

export const getEnquiries = async (_req: Request, res: Response) => {
  try {
    const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 });
    return sendSuccess(res, 'Contact enquiries retrieved', enquiries);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body;
    const enquiry = await ContactEnquiry.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    if (!enquiry) {
      return sendError(res, 'Enquiry not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Enquiry updated successfully', enquiry);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await ContactEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return sendError(res, 'Enquiry not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Enquiry deleted successfully', null);
  } catch (error: any) {
    return sendError(res, error.message, 'DeleteError', 500);
  }
};
