import express from "express";

import {
  getAllBugReports,
  addBugReport,
  deleteBugReport,
} from "../controllers/bugReportController.js";

const router = express.Router();

router.route("/").get(getAllBugReports);
router.route("/add").post(addBugReport);
router.route("/delete").post(deleteBugReport);
export default router;
