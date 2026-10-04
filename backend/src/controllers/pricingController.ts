import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { PricingConfig } from '../models/PricingConfig';
import { PricingService } from '../services/pricingService';

export const getPricingConfigs = async (_req: Request, res: Response) => {
  try {
    const configs = await PricingConfig.find({ isActive: true });
    return sendSuccess(res, 'Pricing configurations retrieved', configs);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const getAllPricingConfigsAdmin = async (_req: Request, res: Response) => {
  try {
    const configs = await PricingConfig.find();
    return sendSuccess(res, 'All pricing configs retrieved', configs);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const calculatePricing = async (req: Request, res: Response) => {
  try {
    const { personnelConfigId, customConfig, count } = req.body;

    let configToUse = customConfig;

    if (personnelConfigId) {
      const found = await PricingConfig.findById(personnelConfigId);
      if (found) {
        configToUse = found.toObject();
      }
    }

    if (!configToUse) {
      return sendError(res, 'A valid personnel pricing configuration is required', 'ValidationError', 400);
    }

    const calculated = PricingService.calculatePersonnelCost(configToUse, count || 1);
    return sendSuccess(res, 'Statutory manpower pricing computed on backend', calculated);
  } catch (error: any) {
    return sendError(res, error.message || 'Pricing calculation failed', 'PricingError', 500);
  }
};

export const updatePricingConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const config = await PricingConfig.findByIdAndUpdate(id, req.body, { new: true });
    if (!config) {
      return sendError(res, 'Pricing configuration not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Pricing configuration updated successfully', config);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};

export const createPricingConfig = async (req: Request, res: Response) => {
  try {
    const config = await PricingConfig.create(req.body);
    return sendSuccess(res, 'Pricing configuration created', config, 201);
  } catch (error: any) {
    return sendError(res, error.message, 'CreateError', 500);
  }
};
