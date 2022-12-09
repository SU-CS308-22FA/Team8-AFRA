import Referee from "../models/refereeModel.js";
import asyncHandler from "express-async-handler";

const getAllReferees = asyncHandler(async (req, res) => {
  const referees = await Referee.find().sort({ matchCount: -1 }); //{ user: req.user._id }
  res.json(referees);
});

/*
const getRefereeById = asyncHandler(async (req, res) => {
  const referee = await Referee.findById(req.params.id);

  if (referee) {
    res.json(referee);
  } else {
    res.status(404).json({ message: "Referee not found" });
  }

  res.json(referee);
});

export { getAllReferees, getRefereeById };
*/

export { getAllReferees };
