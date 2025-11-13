import mongoose from "mongoose";

const VaccinationSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  vaccine: String,
  date: Date,
  nextDue: Date,
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }
});

export default mongoose.model("Vaccination", VaccinationSchema);
