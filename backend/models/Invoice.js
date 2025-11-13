import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  description: String,
  amount: Number,
  paid: Boolean,
  date: String,
});

export default mongoose.model("Invoice", InvoiceSchema);
