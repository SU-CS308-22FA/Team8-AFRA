import express from "express";
import {
  getFaq,
  addFaq,
  deleteFaq,
} from "../controllers/faqController.js";
const router = express.Router();

router.route("/").get(getFaq);
router.route("/add").post(addFaq);
router.route("/delete").post(deleteFaq);

export default router;