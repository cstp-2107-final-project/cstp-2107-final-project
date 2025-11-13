import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await Doctor.find()));
router.post("/", async (req, res) => res.json(await Doctor.create(req.body)));

export default router;
