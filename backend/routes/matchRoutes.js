import express from "express";
import {
  uploadDatabase,
  getMatchesBySeasonAndWeek,
  getStandingsBySeason,
  changeTimeOfTheMatch,
  matchDelayed,
} from "../controllers/matchControllers.js";

const router = express.Router();

router.route("/").post(uploadDatabase);
router.route("/fixture").get(getMatchesBySeasonAndWeek);
router.route("/standings").get(getStandingsBySeason);
router.route("/changetimeofmatch").put(changeTimeOfTheMatch);
router.route("/matchdelayed").put(matchDelayed);

export default router;
