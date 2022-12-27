import mongoose from "mongoose";

const fixtureSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  home: {
    type: String,
    required: true,
  },
  homeID: {
    type: Number,
    required: true,
  },
  homeLogo: {
    type: String,
    required: true,
  },
  visitor: {
    type: String,
    required: true,
  },
  visitorID: {
    type: Number,
    required: true,
  },
  visitorLogo: {
    type: String,
    required: true,
  },
  division: {
    // can check europe match
    type: String,
    required: true,
  },
  referee: {
    type: String,
    required: true,
  },
  hGoal: {
    type: Number,
    required: false,
  },
  vGoal: {
    type: Number,
    required: false,
  },
  matchID: {
    type: Number,
    required: true,
  },
  isDelayed: {
    type: Boolean,
    default: false,
  },
});

const fixture = mongoose.model("fixture", fixtureSchema);
export default fixture;
