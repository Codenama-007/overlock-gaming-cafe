"use server";

import { requireAdminSession } from "@/lib/session";
import { connectDb } from "@/lib/mongodb";
import { CustomerModel } from "@/lib/models/Customer";
import { GamingSessionModel } from "@/lib/models/GamingSession";
import type { Customer, GamingSession } from "@/lib/types";

export type SearchCustomerState =
  | { customer: Customer; sessions: GamingSession[] }
  | { error: string }
  | undefined;

export async function searchCustomer(
  _prevState: SearchCustomerState,
  formData: FormData,
): Promise<SearchCustomerState> {
  await requireAdminSession();

  const phone = String(formData.get("phone") ?? "").replace(/\D/g, "");
  if (!phone) {
    return { error: "Please enter a phone number." };
  }

  try {
    await connectDb();

    const customer = await CustomerModel.findOne({ phone }).lean();

    if (!customer) {
      return { error: "Customer not found." };
    }

    const sessions = await GamingSessionModel.find({ customer: customer._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return {
      customer: {
        id: String(customer._id),
        name: customer.name,
        phone: customer.phone,
      },
      sessions: sessions.map((session) => ({
        id: String(session._id),
        customerId: String(session.customer),
        platform: session.platform,
        date: session.date.toISOString(),
        durationMinutes: session.durationMinutes,
        startTime: session.startTime
          ? new Date(session.startTime).toISOString()
          : undefined,
        endTime: session.endTime
          ? new Date(session.endTime).toISOString()
          : undefined,
        startedAt: session.startedAt
          ? new Date(session.startedAt).toISOString()
          : undefined,
        status: session.status,
      })),
    };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}