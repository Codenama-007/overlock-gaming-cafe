"use server";

import { connectDb } from "@/lib/mongodb";
import { CustomerModel } from "@/lib/models/Customer";
import { GamingSessionModel } from "@/lib/models/GamingSession";
import { durationOptions, platformOptions } from "@/data/bookingOptions";
import type { GamePlatform, GamingSession, SessionStatus } from "@/lib/types";

export type BookingState =
  | { success: true; booking: GamingSession }
  | { message: string }
  | undefined;

function toSerializableSession(input: {
  _id: { toString(): string };
  customer: { toString(): string };
  platform: GamePlatform;
  date: Date;
  durationMinutes: number;
  startTime?: Date | null;
  endTime?: Date | null;
  startedAt?: Date | null;
  status: SessionStatus;
}): GamingSession {
  return {
    id: input._id.toString(),
    customerId: input.customer.toString(),
    platform: input.platform,
    date: input.date.toISOString(),
    durationMinutes: input.durationMinutes,
    startTime: input.startTime ? new Date(input.startTime).toISOString() : undefined,
    endTime: input.endTime ? new Date(input.endTime).toISOString() : undefined,
    startedAt: input.startedAt ? new Date(input.startedAt).toISOString() : undefined,
    status: input.status,
  };
}

export async function createBooking(
  _prevState: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/\D/g, "");
  const platform = String(formData.get("platform") ?? "").toUpperCase() as GamePlatform;
  const dateRaw = String(formData.get("date") ?? "");
  const durationMinutes = Number(formData.get("durationMinutes"));

  if (!name) {
    return { message: "Please enter your name." };
  }
  if (!/^\d{10,15}$/.test(phone)) {
    return { message: "Please enter a valid phone number." };
  }
  if (!platformOptions.some((option) => option.value === platform)) {
    return { message: "Invalid platform." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateRaw)) {
    return { message: "Please choose a valid date." };
  }
  const date = new Date(`${dateRaw}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return { message: "Please choose a valid date." };
  }
  if (!durationOptions.some((option) => option.minutes === durationMinutes)) {
    return { message: "Invalid session duration." };
  }

  try {
    await connectDb();

    const customer = await CustomerModel.findOneAndUpdate(
      { phone },
      { $set: { name } },
      { new: true, upsert: true },
    );

    const session = await GamingSessionModel.create({
      customer: customer?._id,
      platform,
      date,
      durationMinutes,
      status: "BOOKED",
    });

    return { success: true, booking: toSerializableSession(session.toObject()) };
  } catch {
    return { message: "Something went wrong. Please try again." };
  }
}