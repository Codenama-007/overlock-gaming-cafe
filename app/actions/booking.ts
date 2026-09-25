"use server";

import { connectDb } from "@/lib/mongodb";
import { BookingModel } from "@/lib/models/Booking";
import { durationOptions } from "@/data/bookingOptions";
import type { Booking } from "@/lib/types";

export type BookingState =
  | { success: true; booking: Booking }
  | { message: string }
  | undefined;

/**
 * Stores a booking request. There are no customer accounts — this is simply a
 * record of the name, phone number and duration the customer gave us, which the
 * admin later looks up by phone number.
 */
export async function createBooking(
  _prevState: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const username = String(formData.get("username") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/\D/g, "").slice(0, 15);
  const durationMinutes = Number(formData.get("durationMinutes"));

  if (username.length < 2) {
    return { message: "Please enter your name." };
  }
  if (username.length > 60) {
    return { message: "Please enter a shorter name." };
  }
  if (!/^\d{10,15}$/.test(phone)) {
    return { message: "Please enter a valid phone number." };
  }
  if (!durationOptions.some((option) => option.minutes === durationMinutes)) {
    return { message: "Invalid session duration." };
  }

  try {
    await connectDb();

    const booking = await BookingModel.create({
      username,
      phone,
      durationMinutes,
    });

    return {
      success: true,
      booking: {
        id: String(booking._id),
        username: booking.username,
        phone: booking.phone,
        durationMinutes: booking.durationMinutes,
        createdAt: booking.createdAt.toISOString(),
      },
    };
  } catch {
    return { message: "Something went wrong. Please try again." };
  }
}
