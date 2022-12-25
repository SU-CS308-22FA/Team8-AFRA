import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

const team = mongoose.model("team", teamSchema);
export default team;
