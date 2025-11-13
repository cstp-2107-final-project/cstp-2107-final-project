// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";

// import ownerRoutes from "./routes/owners.js";
// import petRoutes from "./routes/pets.js";
// import doctorRoutes from "./routes/doctors.js";
// import vaccinationRoutes from "./routes/vaccinations.js";
// import appointmentRoutes from "./routes/appointments.js";
// // import invoiceRoutes from "./routes/invoices.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// app.use("/api/owners", ownerRoutes);
// app.use("/api/pets", petRoutes);
// app.use("/api/doctors", doctorRoutes);
// app.use("/api/vaccinations", vaccinationRoutes);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/invoices", invoiceRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

// ✅ Route imports
import ownerRoutes from "./routes/owners.js";
import petRoutes from "./routes/pets.js";
import doctorRoutes from "./routes/doctors.js";
import appointmentRoutes from "./routes/appointments.js";
import vaccinationRoutes from "./routes/vaccinations.js";
import invoiceRoutes from "./routes/invoices.js"; // <-- IMPORTANT LINE

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Clinic API is running" });
});

// API routes
app.use("/api/owners", ownerRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/vaccinations", vaccinationRoutes);
app.use("/api/invoices", invoiceRoutes); // <-- uses the imported invoiceRoutes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
