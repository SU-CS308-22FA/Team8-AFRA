import express from "express";
import {
  getTeamsBySeason,
  getTeamsFromDatabase,
} from "../controllers/teamController.js";

const router = express.Router();

router.route("/").get(getTeamsBySeason);
router.route("/teamsFromDatabase").get(getTeamsFromDatabase);

export default router;
