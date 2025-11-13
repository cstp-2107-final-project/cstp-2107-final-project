import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  phone: String,
  email: String
});

export default mongoose.model("Doctor", DoctorSchema);
