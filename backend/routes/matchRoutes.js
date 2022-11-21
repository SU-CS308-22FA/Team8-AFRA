import express from "express";
import {
  uploadDatabase,
  getMatchesBySeasonAndWeek,
  getStandingsBySeason
} from "../controllers/matchControllers.js";

const router = express.Router();

router.route("/").post(uploadDatabase);
router.route("/fixture").get(getMatchesBySeasonAndWeek);
router.route("/standings").get(getStandingsBySeason);

export default router;
