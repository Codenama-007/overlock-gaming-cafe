"use server";

import { refresh } from "next/cache";
import mongoose from "mongoose";
import { requireAdminSession } from "@/lib/session";
import { connectDb } from "@/lib/mongodb";
import { BookingModel } from "@/lib/models/Booking";
import { GamingSessionModel } from "@/lib/models/GamingSession";
import { getSessionForBooking, liveSessionFilter, toBooking } from "@/lib/queries";
import { getDeleteAt } from "@/lib/sessionTiming";
import type { ActiveSession, Booking } from "@/lib/types";

export type SearchBookingState =
  | { booking: Booking; session: ActiveSession | null }
  | { error: string }
  | undefined;

export type StartSessionState = { error: string } | undefined;

export type DeleteSessionState = { error: string } | undefined;

function isObjectId(value: unknown): value is string {
  return typeof value === "string" && mongoose.Types.ObjectId.isValid(value);
}

/**
 * Finds a customer's most recent booking by phone number. Customers have no
 * accounts — the phone number is the only handle the admin has.
 */
export async function searchBooking(
  _prevState: SearchBookingState,
  formData: FormData,
): Promise<SearchBookingState> {
  await requireAdminSession();

  const phone = String(formData.get("phone") ?? "")
    .replace(/\D/g, "")
    .slice(0, 15);
  if (phone.length < 10) {
    return { error: "Please enter a valid phone number." };
  }

  try {
    await connectDb();

    const booking = await BookingModel.findOne({ phone })
      .sort({ createdAt: -1 })
      .lean();

    if (!booking) {
      return { error: "Customer not found." };
    }

    const session = await getSessionForBooking(booking._id);

    return { booking: toBooking(booking), session };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

/**
 * Starts a gamer's timer. The start time comes from the server clock and is the
 * only value persisted — end time, countdown and warning are all derived.
 */
export async function startSession(
  _prevState: StartSessionState,
  formData: FormData,
): Promise<StartSessionState> {
  await requireAdminSession();

  const bookingId = String(formData.get("bookingId") ?? "");
  if (!isObjectId(bookingId)) {
    return { error: "Please search for a customer first." };
  }

  try {
    await connectDb();

    const booking = await BookingModel.findById(bookingId).lean();
    if (!booking) {
      return { error: "Booking not found." };
    }
    if (!Number.isFinite(booking.durationMinutes) || booking.durationMinutes < 1) {
      return { error: "Invalid session duration." };
    }

    const existing = await GamingSessionModel.findOne({
      booking: booking._id,
      ...liveSessionFilter(),
    }).lean();
    if (existing) {
      return { error: "This session has already started." };
    }

    const startedAt = new Date();
    await GamingSessionModel.create({
      booking: booking._id,
      startedAt,
      deleteAt: getDeleteAt(startedAt, booking.durationMinutes),
    });

    refresh();
    return undefined;
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

/**
 * Removes the active session entry. The booking itself is kept, so the same
 * customer can be started again for a later slot.
 */
export async function deleteSession(
  _prevState: DeleteSessionState,
  formData: FormData,
): Promise<DeleteSessionState> {
  await requireAdminSession();

  const sessionId = String(formData.get("sessionId") ?? "");
  if (!isObjectId(sessionId)) {
    return { error: "Invalid session." };
  }

  try {
    await connectDb();
    const deleted = await GamingSessionModel.findByIdAndDelete(sessionId);
    if (!deleted) {
      return { error: "This session has already ended." };
    }

    refresh();
    return undefined;
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
