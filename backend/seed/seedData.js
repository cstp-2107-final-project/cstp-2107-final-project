// backend/seed/seedData.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

import Owner from "../models/Owner.js";
import Pet from "../models/Pet.js";
import Doctor from "../models/Doctor.js";
import Vaccination from "../models/Vaccination.js";
import Appointment from "../models/Appointment.js";
import Invoice from "../models/Invoice.js";

dotenv.config();

await connectDB();

try {
  // Clear old data
  await Promise.all([
    Owner.deleteMany(),
    Pet.deleteMany(),
    Doctor.deleteMany(),
    Vaccination.deleteMany(),
    Appointment.deleteMany(),
    Invoice.deleteMany(),
  ]);

  // Create an owner that matches your login email
  const owner = await Owner.create({
    name: "Chaitanya",
    email: "chaitanya@example.com", // use this to log in as OWNER
    phone: "555-1234",
    address: "Downtown",
  });

  const pet = await Pet.create({
    name: "Buddy",
    species: "Dog",
    breed: "Labrador",
    age: 3,
    ownerId: owner._id,
  });

  const doctor = await Doctor.create({
    name: "Dr. Smith",
    specialty: "General Veterinary",
    phone: "555-5678",
    email: "drsmith@clinic.com",
  });

  await Vaccination.create({
    petId: pet._id,
    vaccine: "Rabies",
    date: new Date("2025-01-10"),
    nextDue: new Date("2026-01-10"),
    doctorId: doctor._id,
  });

  await Appointment.create({
    petId: pet._id,
    doctorId: doctor._id,
    date: "2025-12-20",
    time: "10:30",
    reason: "Annual check-up",
    status: "Scheduled",
  });

  await Invoice.create({
    petId: pet._id,
    description: "Vaccination and check-up",
    amount: 120,
    paid: false,
    date: "2025-12-20",
  });

  console.log("✅ Seed completed");
} catch (err) {
  console.error("Seed error:", err);
} finally {
  mongoose.connection.close();
}
