import "server-only";

import mongoose from "mongoose";

export type GamingSessionDoc = {
  _id: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  startedAt: Date;
  deleteAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * A session is a temporary record that exists only while a gamer is playing.
 *
 * `startedAt` is the single source of truth. Everything the dashboard shows is
 * derived from it plus the booking duration:
 *
 *   endTime    = startedAt + booking.durationMinutes
 *   remaining  = endTime - now
 *   warning    = remaining <= 20 minutes  (display only, never stored)
 *
 * `deleteAt` is endTime + a 10 minute grace period. The TTL index below makes
 * MongoDB remove the document on its own, so cleanup never depends on a browser
 * being open.
 */
const gamingSessionSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    startedAt: { type: Date, required: true },
    deleteAt: { type: Date, required: true },
  },
  { timestamps: true },
);

gamingSessionSchema.index({ booking: 1 });
gamingSessionSchema.index({ startedAt: 1 });
// Database-side auto-deletion. Documents without `deleteAt` are never touched.
gamingSessionSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

export const GamingSessionModel =
  (mongoose.models.GamingSession as
    | mongoose.Model<GamingSessionDoc>
    | undefined) ??
  mongoose.model<GamingSessionDoc>("GamingSession", gamingSessionSchema);
