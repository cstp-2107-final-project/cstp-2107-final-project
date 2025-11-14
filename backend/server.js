import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

// Route imports
import ownerRoutes from "./routes/owners.js";
import petRoutes from "./routes/pets.js";
import doctorRoutes from "./routes/doctors.js";
import appointmentRoutes from "./routes/appointments.js";
import vaccinationRoutes from "./routes/vaccinations.js";
import invoiceRoutes from "./routes/invoices.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Clinic API is running" });
});

// Main API routes
app.use("/api/owners", ownerRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/vaccinations", vaccinationRoutes);
app.use("/api/invoices", invoiceRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
