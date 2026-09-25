import "server-only";

import mongoose from "mongoose";
import type { GamePlatform, SessionStatus } from "@/lib/types";

export type GamingSessionDoc = {
  _id: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  platform: GamePlatform;
  date: Date;
  durationMinutes: number;
  startTime?: Date | null;
  endTime?: Date | null;
  startedAt?: Date | null;
  status: SessionStatus;
  createdAt: Date;
  updatedAt: Date;
};

const gamingSessionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    platform: {
      type: String,
      enum: ["PC", "PS5"],
      required: true,
    },
    date: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    startTime: { type: Date },
    endTime: { type: Date },
    startedAt: { type: Date },
    status: {
      type: String,
      enum: ["BOOKED", "ACTIVE", "WARNING", "COMPLETED", "CANCELLED"],
      default: "BOOKED",
    },
  },
  { timestamps: true },
);

gamingSessionSchema.index({ customer: 1, createdAt: -1 });
gamingSessionSchema.index({ status: 1 });

export const GamingSessionModel =
  (mongoose.models.GamingSession as mongoose.Model<GamingSessionDoc> | undefined) ??
  mongoose.model<GamingSessionDoc>("GamingSession", gamingSessionSchema);