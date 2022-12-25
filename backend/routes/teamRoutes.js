import express from "express";
import { getTeamsBySeason } from "../controllers/teamController.js";

const router = express.Router();

router.route("/").get(getTeamsBySeason);

export default router;
