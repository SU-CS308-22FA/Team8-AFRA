import express from "express";
import {
  authUser,
  deleteUserProfile,
  registerUser,
  updateUserProfile,
  checkBanned, 
  sendOTPVerificationEmail,
  VerifyOTP
  reportUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/check-banned", checkBanned);
router.route("/profile").post(protect, updateUserProfile);
router.route("/deleteaccount").post(protect, deleteUserProfile);
router.route("/sendotpmessage").post(sendOTPVerificationEmail);
router.route("/verifyotp").post(VerifyOTP);
router.route("/report").post(reportUser);

export default router;
