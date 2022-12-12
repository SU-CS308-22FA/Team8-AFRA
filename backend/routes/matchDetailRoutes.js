import express from "express";
import {
  getInfo,
  getEvents,
  getLineUps,
  getStatics,
} from "../controllers/matchDetailControllers.js";

const router = express.Router();

router.route("/").get(getInfo);
router.route("/events").get(getEvents);
router.route("/lineups").get(getLineUps);
router.route("/statics").get(getStatics);

export default router;
