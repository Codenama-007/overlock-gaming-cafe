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

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);
customerSchema.index({ phone: 1 }, { unique: true });

const sessionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    platform: { type: String, enum: ["PC", "PS5"], required: true },
    date: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },
    startTime: Date,
    endTime: Date,
    startedAt: Date,
    status: {
      type: String,
      enum: ["BOOKED", "ACTIVE", "WARNING", "COMPLETED", "CANCELLED"],
      default: "BOOKED",
    },
  },
  { timestamps: true },
);

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
const GamingSession =
  mongoose.models.GamingSession || mongoose.model("GamingSession", sessionSchema);

const SAMPLE = {
  name: "Rahul",
  phone: "9960827157",
  platform: "PC",
  durationMinutes: 120,
};

async function seed() {
  await mongoose.connect(uri);

  let customer = await Customer.findOne({ phone: SAMPLE.phone });
  if (!customer) {
    customer = await Customer.create({
      name: SAMPLE.name,
      phone: SAMPLE.phone,
    });
    console.log(`Created customer: ${customer.name} (${customer.phone})`);
  } else {
    console.log(`Customer exists: ${customer.name} (${customer.phone})`);
  }

  const sessionCount = await GamingSession.countDocuments({
    customer: customer._id,
  });
  if (sessionCount === 0) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    await GamingSession.create({
      customer: customer._id,
      platform: SAMPLE.platform,
      durationMinutes: SAMPLE.durationMinutes,
      date,
      status: "BOOKED",
    });
    console.log("Created a BOOKED sample session (2 hours, PC).");
  } else {
    console.log("Sample session already exists, skipping.");
  }

  console.log("Seed complete.");
}

seed()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error("Seed failed:", err.message);
    process.exit(1);
  });