import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { BusinessInfo } from '../models/BusinessInfo';

export const getBusinessInfo = async (_req: Request, res: Response) => {
  try {
    let info = await BusinessInfo.findOne();
    if (!info) {
      // Auto-create initial default with verified Agra headquarters if collection is empty
      info = await BusinessInfo.create({
        companyName: 'AAA Management Services',
        tagline: 'Professional Security, Facility Guarding & Armed Protection Services',
        phone: '9045393714',
        alternatePhone: '9045393714',
        email: 'contact@aaamanagementservices.com',
        address: {
          street: 'Shamshabad Road, Infront Of TV Tower',
          landmark: 'Chamruali Mod',
          locality: 'Rajpur',
          city: 'Agra',
          state: 'Uttar Pradesh',
          pincode: '282001',
          country: 'India',
        },
        operatingHours: '24/7 Operations Room & Emergency Dispatch',
      });
    }
    return sendSuccess(res, 'Business information retrieved', info);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const updateBusinessInfo = async (req: Request, res: Response) => {
  try {
    let info = await BusinessInfo.findOne();
    if (info) {
      Object.assign(info, req.body);
      await info.save();
    } else {
      info = await BusinessInfo.create(req.body);
    }
    return sendSuccess(res, 'Business profile updated successfully', info);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};
