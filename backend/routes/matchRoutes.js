import express from "express";
import { uploadDatabase } from "../controllers/matchControllers.js";

const router = express.Router();

router.route("/").post(uploadDatabase);

export default router;
