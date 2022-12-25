import express from "express";
import {
  sendAppeal,
  acceptAppeal,
  denyAppeal,
  getAppeal, 
  listBanned,
  manualUnban
} from "../controllers/appealController.js";
const router = express.Router();

router.route("/send").post(sendAppeal);
router.route("/accept").post(acceptAppeal);
router.route("/deny").post(denyAppeal);
router.route("/manualunban").post(manualUnban);
router.route("/").get(getAppeal);
router.route("/list").get(listBanned);

export default router;