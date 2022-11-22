import express from "express";
import {
 getAllRequests, verifyUser
} from "../controllers/requestController.js";

const router = express.Router();

router.route("/").get(getAllRequests);
router.route("/verify").post(verifyUser);

export default router;