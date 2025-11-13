import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" }
});

export default mongoose.model("Pet", PetSchema);
