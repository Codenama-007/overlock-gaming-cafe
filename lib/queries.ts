import "server-only";

import mongoose from "mongoose";
import { connectDb } from "@/lib/mongodb";
import { GamingSessionModel } from "@/lib/models/GamingSession";
import { getEndTime } from "@/lib/sessionTiming";
import type { ActiveSession, Booking } from "@/lib/types";

export type PopulatedBooking = {
  _id: mongoose.Types.ObjectId;
  username: string;
  phone: string;
  durationMinutes: number;
};

export type SessionWithBooking = {
  _id: mongoose.Types.ObjectId;
  startedAt: Date;
  deleteAt: Date;
  booking: PopulatedBooking;
};

/**
 * Sessions past their `deleteAt` have served their purpose. Filtering on it
 * keeps them out of the admin's view even if the TTL monitor has not swept them
 * yet — MongoDB only checks for expired documents roughly once a minute.
 */
export function liveSessionFilter(): { deleteAt: { $gt: Date } } {
  return { deleteAt: { $gt: new Date() } };
}

export function toBooking(doc: {
  _id: mongoose.Types.ObjectId;
  username: string;
  phone: string;
  durationMinutes: number;
  createdAt?: Date;
}): Booking {
  return {
    id: String(doc._id),
    username: doc.username,
    phone: doc.phone,
    durationMinutes: doc.durationMinutes,
    createdAt: new Date(doc.createdAt ?? Date.now()).toISOString(),
  };
}

export function toActiveSession(doc: SessionWithBooking): ActiveSession {
  const durationMinutes = doc.booking.durationMinutes;
  return {
    id: String(doc._id),
    bookingId: String(doc.booking._id),
    username: doc.booking.username,
    phone: doc.booking.phone,
    durationMinutes,
    startedAt: new Date(doc.startedAt).toISOString(),
    endTime: new Date(
      getEndTime(doc.startedAt, durationMinutes),
    ).toISOString(),
    deleteAt: new Date(doc.deleteAt).toISOString(),
  };
}

/**
 * The database clock, not the web server's. It is the same clock MongoDB uses
 * when it sweeps expired sessions, so the countdown the admin sees can never
 * disagree with when the document actually disappears.
 */
async function getDatabaseNow(): Promise<number> {
  const db = (await connectDb()).connection.db;
  if (!db) return Date.now();

  try {
    const info = await db.command({ hostInfo: 1 });
    const current: unknown = info.system?.currentTime ?? info.localTime;
    const time = new Date(current as string).getTime();
    return Number.isNaN(time) ? Date.now() : time;
  } catch {
    return Date.now();
  }
}

export type DashboardSnapshot = {
  sessions: ActiveSession[];
  serverNow: number;
};

/** Everything the admin dashboard needs for its live session table. */
export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  await connectDb();

  const [sessions, serverNow] = await Promise.all([
    GamingSessionModel.find(liveSessionFilter())
      .sort({ startedAt: 1 })
      .populate<{ booking: PopulatedBooking }>("booking")
      .lean<SessionWithBooking[]>(),
    getDatabaseNow(),
  ]);

  return {
    sessions: sessions
      .filter((session) => session.booking?._id)
      .map(toActiveSession),
    serverNow,
  };
}

/** The most recent session for a booking, if the gamer is still playing. */
export async function getSessionForBooking(
  bookingId: mongoose.Types.ObjectId,
): Promise<ActiveSession | null> {
  await connectDb();

  const session = await GamingSessionModel.findOne({
    booking: bookingId,
    ...liveSessionFilter(),
  })
    .populate<{ booking: PopulatedBooking }>("booking")
    .lean<SessionWithBooking>();

  return session?.booking?._id ? toActiveSession(session) : null;
}
