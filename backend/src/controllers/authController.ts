import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AdminUser } from '../models/AdminUser';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/auth';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 'ValidationError', 400);
    }

    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return sendError(res, 'Invalid credentials', 'Unauthorized', 401);
    }

    if (!user.isActive) {
      return sendError(res, 'Admin account has been deactivated', 'Forbidden', 403);
    }

    if (!user.password) {
      return sendError(res, 'Invalid credentials', 'Unauthorized', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 'Unauthorized', 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Sign JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return sendSuccess(res, 'Authentication successful', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error: any) {
    return sendError(res, error.message || 'Login failed', 'AuthError', 500);
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Unauthorized', 'Unauthorized', 401);
    }

    const user = await AdminUser.findById(req.user.id).select('-password');
    if (!user) {
      return sendError(res, 'User not found', 'NotFound', 404);
    }

    return sendSuccess(res, 'Profile retrieved', user);
  } catch (error: any) {
    return sendError(res, error.message, 'ProfileError', 500);
  }
};

export const logout = async (_req: Request, res: Response) => {
  return sendSuccess(res, 'Logged out successfully', null);
};

export const updatePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return sendError(res, 'Current password and new password are required', 'ValidationError', 400);
    }

    const user = await AdminUser.findById(req.user?.id);
    if (!user || !user.password) {
      return sendError(res, 'User not found', 'NotFound', 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return sendError(res, 'Current password does not match', 'Unauthorized', 401);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return sendSuccess(res, 'Password updated successfully', null);
  } catch (error: any) {
    return sendError(res, error.message, 'PasswordError', 500);
  }
};
