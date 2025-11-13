import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String
});

export default mongoose.model("Owner", OwnerSchema);
