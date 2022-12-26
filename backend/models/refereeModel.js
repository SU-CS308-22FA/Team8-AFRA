import mongoose from "mongoose";

const refereeSchema = mongoose.Schema({
  rank: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  matchCount: {
    type: String,
    required: true,
  },
  yellowCard: {
    type: String,
    required: true,
  },
  yellowRedCard: {
    type: String,
    required: true,
  },
  redCard: {
    type: String,
    required: true,
  },
  penalty: {
    type: String,
    required: true,
  },

  rankedBy:
    {
      type: Array,
      default: [],
      
      
  },

  totalVotes:{
    type:Number,
    default:0,
  },

  sumOfRanks:{
    type:Number,
    default:0,
  },
});

const referee = mongoose.model("referee", refereeSchema);
export default referee;
