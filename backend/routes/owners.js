import express from "express";
import Owner from "../models/Owner.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await Owner.find()));
router.post("/", async (req, res) => res.json(await Owner.create(req.body)));

export default router;
