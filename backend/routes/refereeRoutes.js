import express from "express";
const router = express.Router();

import { getAllReferees } from "../controllers/refereeController.js";

router.route("/").get(getAllReferees);

export default router;
