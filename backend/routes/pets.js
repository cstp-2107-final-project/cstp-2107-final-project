import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

router.get("/", async (req, res) =>
  res.json(await Pet.find().populate("ownerId"))
);
router.post("/", async (req, res) => res.json(await Pet.create(req.body)));

export default router;
