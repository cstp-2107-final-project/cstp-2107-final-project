// import mongoose from "mongoose";

// const PetSchema = new mongoose.Schema({
//   name: String,
//   species: String,
//   breed: String,
//   age: Number,
//   ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" }
// });

// export default mongoose.model("Pet", PetSchema);
// backend/models/Pet.js
import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", PetSchema);
