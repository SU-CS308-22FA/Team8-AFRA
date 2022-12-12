import mongoose from "mongoose";

const blacklistSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required:true,
      unique: false,
    },
    cause: { 
      type: String, 
      required:true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  }
);

const Blacklist = mongoose.model("Blacklist", blacklistSchema);

export default Blacklist;
