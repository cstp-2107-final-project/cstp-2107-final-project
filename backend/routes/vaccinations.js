import express from "express";
import Vaccination from "../models/Vaccination.js";

const router = express.Router();

router.get("/", async (req, res) =>
  res.json(await Vaccination.find().populate("petId").populate("doctorId"))
);
router.post("/", async (req, res) =>
  res.json(await Vaccination.create(req.body))
);

export default router;
