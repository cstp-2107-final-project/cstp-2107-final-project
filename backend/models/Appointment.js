import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  date: String,
  time: String,
  reason: String,
  status: String
});

export default mongoose.model("Appointment", AppointmentSchema);
