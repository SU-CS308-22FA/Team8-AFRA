import express from "express";
import {
 getAllRequests,
} from "../controllers/requestController.js";

const router = express.Router();

router.route("/").get(getAllRequests);

export default router;