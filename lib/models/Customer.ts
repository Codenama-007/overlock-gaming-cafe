import "server-only";

import mongoose from "mongoose";

export type CustomerDoc = {
  _id: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

customerSchema.index({ phone: 1 }, { unique: true });

export const CustomerModel =
  (mongoose.models.Customer as mongoose.Model<CustomerDoc> | undefined) ??
  mongoose.model<CustomerDoc>("Customer", customerSchema);