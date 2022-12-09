import express from "express";

import {
  getAllReferees,
  //getRefereeById,
} from "../controllers/refereeController.js";

const router = express.Router();

router.route("/").get(getAllReferees);
//router.route("/:id").get(getRefereeById);

export default router;
