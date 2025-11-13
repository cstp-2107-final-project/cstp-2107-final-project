import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await Appointment.find()));
router.post("/", async (req, res) =>
  res.json(await Appointment.create(req.body))
);

export default router;
