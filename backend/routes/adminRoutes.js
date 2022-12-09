import express from "express";
import {
  getReports,
  banUser
} from "../controllers/adminController.js";
const router = express.Router();

router.route("/").get(getReports);
router.route("/ban").post(banUser);

export default router;