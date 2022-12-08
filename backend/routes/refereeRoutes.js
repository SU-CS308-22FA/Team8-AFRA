import express from "express";

import { getAllReferees } from "../controllers/refereeController.js";

const router = express.Router();

router.route("/").get(getAllReferees);

export default router;
