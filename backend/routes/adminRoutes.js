import express from "express";
import {
  getReports,
  banUser,
  falseReport,
  mailSend,
  manualBan
} from "../controllers/adminController.js";
const router = express.Router();

router.route("/").get(getReports);
router.route("/ban").post(banUser);
router.route("/false-report").post(falseReport);
router.route("/mail").post(mailSend);
router.route("/manualBan").post(manualBan);

export default router;