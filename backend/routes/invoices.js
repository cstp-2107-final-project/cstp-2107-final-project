import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/", async (req, res) => res.json(await Invoice.create(req.body)));


// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { connectDB } from "../config/db.js";

// import Owner from "../models/Owner.js";
// import Pet from "../models/Pet.js";
// import Doctor from "../models/Doctor.js";
// import Vaccination from "../models/Vaccination.js";
// import Appointment from "../models/Appointment.js";
// import Invoice from "../models/Invoice.js";

// dotenv.config();
// await connectDB();

// await Promise.all([
//   Owner.deleteMany(),
//   Pet.deleteMany(),
//   Doctor.deleteMany(),
//   Vaccination.deleteMany(),
//   Appointment.deleteMany(),
//   Invoice.deleteMany()
// ]);

// const owner = await Owner.create({
//   name: "Rita Singh",
//   email: "rita@example.com",
//   phone: "555-1234",
//   address: "Downtown"
// });

// const pet = await Pet.create({
//   name: "Buddy",
//   species: "Dog",
//   breed: "Labrador",
//   ownerId: owner._id
// });

// console.log("Seed completed.");
// mongoose.connection.close();

export default router;