import express from "express";
import {
  authUser,
  deleteUserProfile,
  registerUser,
  updateUserProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/deleteaccount").post(protect, deleteUserProfile);

export default router;
