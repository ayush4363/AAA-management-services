import mongoose, { Schema } from 'mongoose';
import { IAdminUser } from '../types/models';

const AdminUserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'editor'],
      default: 'admin',
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const AdminUser = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
