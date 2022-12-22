import express from "express";
import {
  sendAppeal,
  acceptAppeal,
  denyAppeal,
  getAppeal
} from "../controllers/appealController.js";
const router = express.Router();

router.route("/send").post(sendAppeal);
router.route("/accept").post(acceptAppeal);
router.route("/deny").post(denyAppeal);
router.route("/").get(getAppeal);

export default router;