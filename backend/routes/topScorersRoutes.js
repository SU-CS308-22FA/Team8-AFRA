import express from "express";
import {
  getScorers,
  getAssists,
  getYellowCards,
  getRedCards,
} from "../controllers/topScorersController.js";
const router = express.Router();

router.route("/scorers").get(getScorers);
router.route("/assists").get(getAssists);
router.route("/yellowcards").get(getYellowCards);
router.route("/redcards").get(getRedCards);

export default router;
