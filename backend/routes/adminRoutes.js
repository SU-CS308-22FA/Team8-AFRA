import express from "express";
import {
  getReports,
  banUser,
  falseReport,
  mailSend,
  manualBan,
  sendNotification,
  closeNotification
} from "../controllers/adminController.js";
const router = express.Router();

router.route("/").get(getReports);
router.route("/ban").post(banUser);
router.route("/false-report").post(falseReport);
router.route("/mail").post(mailSend);
router.route("/manualBan").post(manualBan);
router.route("/sendNot").post(sendNotification);
router.route("/closeNot").post(closeNotification);

export default router;