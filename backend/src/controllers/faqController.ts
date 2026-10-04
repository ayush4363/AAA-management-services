import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { FAQ } from '../models/FAQ';

export const getFAQs = async (_req: Request, res: Response) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    return sendSuccess(res, 'FAQs retrieved', faqs);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const getAllFAQsAdmin = async (_req: Request, res: Response) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1 });
    return sendSuccess(res, 'All FAQs retrieved for admin', faqs);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const createFAQ = async (req: Request, res: Response) => {
  try {
    const { question, answer, category, order } = req.body;
    if (!question || !answer) {
      return sendError(res, 'Question and answer are required', 'ValidationError', 400);
    }
    const faq = await FAQ.create({
      question: question.trim(),
      answer: answer.trim(),
      category: category || 'general',
      order: Number(order) || 0,
      isActive: true,
    });
    return sendSuccess(res, 'FAQ created successfully', faq, 201);
  } catch (error: any) {
    return sendError(res, error.message, 'CreateError', 500);
  }
};

export const updateFAQ = async (req: Request, res: Response) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) {
      return sendError(res, 'FAQ not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'FAQ updated successfully', faq);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};

export const deleteFAQ = async (req: Request, res: Response) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return sendError(res, 'FAQ not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'FAQ deleted successfully', null);
  } catch (error: any) {
    return sendError(res, error.message, 'DeleteError', 500);
  }
};
