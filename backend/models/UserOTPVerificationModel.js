import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserOTPVerificationSchema = mongoose.Schema(
    {
        userId: String,
        otp: String,
        createdAt: Date,
        expiresAt: Date
    },
    {
      timestamps: true,
    }
  );
  
 
  const UserOTPVerification = mongoose.model("UserOTPVerification", UserOTPVerificationSchema);
  
  export default UserOTPVerification;
  