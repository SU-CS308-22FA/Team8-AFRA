import mongoose from "mongoose";

const BugSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  bugPage: {
    type: String,
    required: true,
  },
  bugDetail: {
    type: String,
    required: true,
  },
  bugReportedUserEmail: {
    type: String,
    required: true,
  },
});

const Bug = mongoose.model("Bug", BugSchema);

export default Bug;
