import express from "express";
import {
  getReports,
  banUser,
  falseReport
} from "../controllers/adminController.js";
const router = express.Router();

router.route("/").get(getReports);
router.route("/ban").post(banUser);
router.route("/false-report").post(falseReport);

export default router;