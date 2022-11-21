import express from "express";
import {
  getMatchesBySeasonAndWeek,
  uploadDatabase,
} from "../controllers/matchController.js";

const router = express.Router();

router.route("/").post(uploadDatabase);

export default router;
