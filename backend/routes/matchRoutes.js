import express from "express";
import {
  uploadDatabase,
  getMatchesBySeasonAndWeek,
} from "../controllers/matchControllers.js";

const router = express.Router();

router.route("/").post(uploadDatabase);
router.route("/fixture").get(getMatchesBySeasonAndWeek);

export default router;
