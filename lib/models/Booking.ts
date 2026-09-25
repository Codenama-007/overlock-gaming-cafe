import "server-only";

import mongoose from "mongoose";

export type BookingDoc = {
  _id: mongoose.Types.ObjectId;
  username: string;
  phone: string;
  durationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
};

const bookingSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

// Phone is intentionally NOT unique: a customer may book more than once, and
// the admin always works with their most recent booking.
bookingSchema.index({ phone: 1, createdAt: -1 });

export const BookingModel =
  (mongoose.models.Booking as mongoose.Model<BookingDoc> | undefined) ??
  mongoose.model<BookingDoc>("Booking", bookingSchema);
