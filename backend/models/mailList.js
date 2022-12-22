import mongoose from "mongoose";

const maillistSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required:true,
      unique: false,
    }
  }
);

const Maillist = mongoose.model("Maillist", maillistSchema);

export default Maillist;
