// import express from "express";
// import Pet from "../models/Pet.js";

// const router = express.Router();

// router.get("/", async (req, res) =>
//   res.json(await Pet.find().populate("ownerId"))
// );
// router.post("/", async (req, res) => res.json(await Pet.create(req.body)));

// export default router;
// backend/routes/pets.js
import express from "express";
import Pet from "../models/Pet.js";
import Owner from "../models/Owner.js";

const router = express.Router();

/**
 * GET /api/pets
 * Admin: get all pets with owner info
 */
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find().populate("ownerId");
    res.json(pets);
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/pets/owner/:email
 * Owner: get pets for a specific owner email
 */
router.get("/owner/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.json([]); // owner not found yet => no pets
    }

    const pets = await Pet.find({ ownerId: owner._id });
    res.json(pets);
  } catch (err) {
    console.error("Error fetching owner pets:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/pets
 * Owner or admin: add a new pet for a given ownerEmail
 * body: { ownerEmail, name, species, breed, age }
 */
router.post("/", async (req, res) => {
  try {
    const { ownerEmail, name, species, breed, age } = req.body;

    if (!ownerEmail || !name || !species) {
      return res.status(400).json({ message: "ownerEmail, name, and species are required" });
    }

    const owner = await Owner.findOne({ email: ownerEmail });

    if (!owner) {
      return res.status(400).json({ message: "Owner not found for email " + ownerEmail });
    }

    const pet = await Pet.create({
      name,
      species,
      breed,
      age,
      ownerId: owner._id,
    });

    // Return with owner populated so admin page has info
    const populatedPet = await pet.populate("ownerId");
    res.status(201).json(populatedPet);
  } catch (err) {
    console.error("Error creating pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/pets/:id
 * Admin: update pet info
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedPet = await Pet.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("ownerId");

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(updatedPet);
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/pets/:id
 * Admin: delete pet
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pet.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json({ message: "Pet deleted" });
  } catch (err) {
    console.error("Error deleting pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
