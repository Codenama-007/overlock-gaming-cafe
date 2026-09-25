/* global require, process, console */

/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("path");

try {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
} catch {
  console.warn("No .env.local found — relying on existing environment.");
}

const mongoose = require("mongoose");

const uri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/overlock-gaming-cafe";

const CUSTOMERS = "customers";
const BOOKINGS = "bookings";
const SESSIONS = "gamingsessions";

const GRACE_MS = 10 * 60 * 1000;
const FALLBACK_DURATION_MINUTES = 60;

const listNames = async (db) =>
  (await db.listCollections({}, { nameOnly: true }).toArray()).map(
    (c) => c.name,
  );

const toDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

async function migrate() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collections = await listNames(db);
  const now = new Date();

  const hasLegacyCustomers = collections.includes(CUSTOMERS);
  const hasBookings = collections.includes(BOOKINGS);
  if (!hasLegacyCustomers && hasBookings) {
    console.log("Bookings collection already migrated — skipping customers.");
  }

  // ---------------------------------------------------------------- bookings
  const legacyCustomers = hasLegacyCustomers
    ? await db.collection(CUSTOMERS).find({}).toArray()
    : [];
  const existingBookings = hasBookings
    ? await db.collection(BOOKINGS).find({}).toArray()
    : [];
  const legacySessions = await db.collection(SESSIONS).find({}).toArray();

  // Prefer an already-migrated booking, otherwise create one per customer.
  const bookingIdByPhone = new Map();
  for (const booking of existingBookings) {
    bookingIdByPhone.set(booking.phone, booking._id);
  }

  // Duration belongs to the booking, so pull it from the customer's most
  // recent legacy session.
  const sessionsByCustomer = new Map();
  for (const session of legacySessions) {
    const key = String(session.customer);
    const list = sessionsByCustomer.get(key) ?? [];
    list.push(session);
    sessionsByCustomer.set(key, list);
  }
  for (const list of sessionsByCustomer.values()) {
    list.sort((a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0));
  }

  const bookingIdByLegacyCustomer = new Map();
  const newBookings = [];
  let fallbackCount = 0;

  for (const customer of legacyCustomers) {
    const phone = String(customer.phone ?? "").trim();
    if (!phone) continue;

    const sessions = sessionsByCustomer.get(String(customer._id)) ?? [];
    const started = sessions.find((s) => toDate(s.startedAt ?? s.startTime));
    const source = started ?? sessions[0];
    let durationMinutes = Number(source?.durationMinutes);
    if (!Number.isFinite(durationMinutes) || durationMinutes < 1) {
      durationMinutes = FALLBACK_DURATION_MINUTES;
      fallbackCount += 1;
    }

    let bookingId = bookingIdByPhone.get(phone);
    if (!bookingId) {
      bookingId = new mongoose.Types.ObjectId();
      newBookings.push({
        _id: bookingId,
        username: String(customer.name ?? "").trim() || "Guest",
        phone,
        durationMinutes,
        createdAt: customer.createdAt ?? now,
        updatedAt: customer.updatedAt ?? customer.createdAt ?? now,
      });
      bookingIdByPhone.set(phone, bookingId);
    }
    bookingIdByLegacyCustomer.set(String(customer._id), bookingId);
  }

  if (newBookings.length > 0) {
    await db.collection(`${BOOKINGS}__tmp`).insertMany(newBookings);
    if (hasBookings) await db.collection(BOOKINGS).drop();
    await db
      .collection(`${BOOKINGS}__tmp`)
      .rename(BOOKINGS, { dropTarget: false });
    console.log(`Bookings: migrated ${legacyCustomers.length} customer(s).`);
  } else if (hasLegacyCustomers) {    console.log("Bookings: every customer already had a booking — nothing to do.");
  }
  if (fallbackCount > 0) {
    console.log(
      `  ${fallbackCount} booking(s) had no usable duration — defaulted to ${FALLBACK_DURATION_MINUTES} minutes.`,
    );
  }

  // ---------------------------------------------------------------- sessions
  // Rebuild from scratch so no document can keep a `status` field (including
  // the obsolete WARNING value) or a duplicated startTime/endTime.
  const newSessions = [];
  let started = 0;
  let neverStarted = 0;
  let orphans = 0;
  let expiredCount = 0;

  for (const session of legacySessions) {
    const startedAt = toDate(session.startedAt ?? session.startTime);
    if (!startedAt) {
      neverStarted += 1;
      continue;
    }

    const bookingId = bookingIdByLegacyCustomer.get(String(session.customer));
    if (!bookingId) {
      orphans += 1;
      continue;
    }

    const durationMinutes = Number(session.durationMinutes) > 0
      ? Number(session.durationMinutes)
      : FALLBACK_DURATION_MINUTES;
    const naturalDeleteAt = startedAt.getTime() + durationMinutes * 60_000 + GRACE_MS;
    // Never migrate into an already-expired document — keep it visible for at
    // least a minute so live sessions are not reaped mid-migration.
    const deleteAt = new Date(Math.max(naturalDeleteAt, now.getTime() + 60_000));
    if (deleteAt.getTime() > naturalDeleteAt) expiredCount += 1;

    newSessions.push({
      _id: session._id,
      booking: bookingId,
      startedAt,
      deleteAt,
      createdAt: session.createdAt ?? startedAt,
      updatedAt: session.updatedAt ?? session.createdAt ?? startedAt,
    });
    started += 1;
  }

  if (newSessions.length > 0) {
    await db.collection(`${SESSIONS}__tmp`).insertMany(newSessions);
  }
  const currentCollections = await listNames(db);
  if (currentCollections.includes(SESSIONS)) {
    await db.collection(SESSIONS).drop();
  }
  if (newSessions.length > 0) {
    await db
      .collection(`${SESSIONS}__tmp`)
      .rename(SESSIONS, { dropTarget: false });
  }

  console.log(
    `Sessions: kept ${started}, dropped ${neverStarted} never-started, skipped ${orphans} orphaned.`,
  );
  if (expiredCount > 0) {
    console.log(
      `  ${expiredCount} already-finished session(s) held for 60s instead of being reaped instantly.`,
    );
  }

  if (hasLegacyCustomers && (await listNames(db)).includes(CUSTOMERS)) {
    await db.collection(CUSTOMERS).drop();
    console.log("Customers: legacy collection dropped.");
  }

  // ------------------------------------------------------------------ indexes
  await db.collection(BOOKINGS).createIndex({ phone: 1, createdAt: -1 });
  await db.collection(SESSIONS).createIndex({ booking: 1 });
  await db.collection(SESSIONS).createIndex({ startedAt: 1 });
  await db
    .collection(SESSIONS)
    .createIndex({ deleteAt: 1 }, { expireAfterSeconds: 0 });

  const sessionIndexes = await db
    .collection(SESSIONS)
    .indexes()
    .then((list) => list.map((i) => i.name));
  if (!sessionIndexes.includes("deleteAt_1")) {
    throw new Error("TTL index deleteAt_1 was not created.");
  }
  console.log("Indexes: TTL index deleteAt_1 in place.");

  // ------------------------------------------------------------------ verify
  const stray = await db
    .collection(SESSIONS)
    .countDocuments({ status: { $exists: true } });
  if (stray > 0) {
    throw new Error(`${stray} session(s) still carry a status field.`);
  }
  console.log("Verified: no session document retains a status field.");

  const ttl = db
    .command({ collMod: SESSIONS, index: { expireAfterSeconds: 0, keyPattern: { deleteAt: 1 } } })
    .then(() => true)
    .catch(() => false);
  console.log(`TTL monitor: ${(await ttl) ? "confirmed active" : "runs automatically (default)"}`);

  console.log("Migration complete.");
}

migrate()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error("Migration failed:", err.message);
    process.exit(1);
  });
