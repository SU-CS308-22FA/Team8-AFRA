import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  TeamName: {
    type: String,
    required: true,
  },
  teamRank: {
    type: Number,
    required: true,
  },
  teamInfo: {
    type: String,
    required: false,
  },
});

const team = mongoose.model("team", teamSchema);
export default team;
