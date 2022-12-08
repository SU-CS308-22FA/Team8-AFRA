import Referee from "../models/refereeModel.js";
import asyncHandler from "express-async-handler";

const getAllReferees = asyncHandler(async (req, res) => {
  const referees = await Referee.find(); //{ user: req.user._id }
  res.json(referees);
});

export { getAllReferees };
