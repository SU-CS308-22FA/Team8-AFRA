import Referee from "../models/refereeModel.js";
import asyncHandler from "express-async-handler";

const getAllReferees = asyncHandler(async (req, res) => {
  const referees = await Referee.find().sort({ matchCount: -1 }); //{ user: req.user._id }
  res.json(referees);
});

const getRefereeNameSorted = asyncHandler(async (req, res) => {
  const referee = await Referee.find().sort({ name: 1 });
  res.json(referee);
});

const getRefereeRankSorted = asyncHandler(async (req, res) => {
  const referee = await Referee.find().sort({ rank: -1 });
  res.json(referee);
});

const getRefereeMatchCountSorted = asyncHandler(async (req, res) => {
  const referee = await Referee.find().sort({ matchCount: -1 });
  res.json(referee);
});

export {
  getAllReferees,
  getRefereeNameSorted,
  getRefereeRankSorted,
  getRefereeMatchCountSorted,
};
