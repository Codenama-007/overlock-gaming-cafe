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

const bookingSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);
bookingSchema.index({ phone: 1, createdAt: -1 });

const sessionSchema = new mongoose.Schema(
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
sessionSchema.index({ booking: 1 });
sessionSchema.index({ startedAt: 1 });
sessionSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
const GamingSession =
  mongoose.models.GamingSession || mongoose.model("GamingSession", sessionSchema);

const GRACE_MS = 10 * 60 * 1000;

const SAMPLE_BOOKINGS = [
  { username: "Rahul", phone: "9960827157", durationMinutes: 120 },
  { username: "Ayaan", phone: "9876543210", durationMinutes: 60 },
  { username: "Sameer", phone: "9123456780", durationMinutes: 180 },
];

async function seed() {
  await mongoose.connect(uri);

  for (const sample of SAMPLE_BOOKINGS) {
    const existing = await Booking.findOne({ phone: sample.phone });
    if (existing) {
      console.log(`Booking exists: ${existing.username} (${existing.phone})`);
      continue;
    }
    const booking = await Booking.create(sample);
    console.log(`Created booking: ${booking.username} (${booking.phone})`);
  }

  // One live session so the dashboard table is not empty: Rahul started 90
  // minutes into a 2 hour slot, leaving 30 minutes on the clock.
  const rahul = await Booking.findOne({ phone: "9960827157" });
  if (rahul) {
    const live = await GamingSession.countDocuments({
      booking: rahul._id,
      deleteAt: { $gt: new Date() },
    });
    if (live === 0) {
      const startedAt = new Date(Date.now() - 90 * 60 * 1000);
      await GamingSession.create({
        booking: rahul._id,
        startedAt,
        deleteAt: new Date(
          startedAt.getTime() + rahul.durationMinutes * 60_000 + GRACE_MS,
        ),
      });
      console.log("Created a live session for Rahul (30 minutes left).");
    } else {
      console.log("Rahul already has a live session, skipping.");
    }
  }

  await Booking.syncIndexes();
  await GamingSession.syncIndexes();
  console.log("Indexes synced (deleteAt TTL in place).");

  console.log("Seed complete.");
}

seed()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error("Seed failed:", err.message);
    process.exit(1);
  });
