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
  visitor: {
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
    required: false,
  },
  hGoal: {
    type: Number,
    required: false,
  },
  vGoal: {
    type: Number,
    required: false,
  },
});

const fixture = mongoose.model("fixture", fixtureSchema);
export default fixture;
