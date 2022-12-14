import Referee from "../models/refereeModel.js";
import asyncHandler from "express-async-handler";

/* 
// @route     GET /api/referees
// @desc      Get all the referees from the database, sort them according to their match count descendingly
// @response  Send a json array consisting of:
   the match count, number of yellow cards, number of yellow cards that returned into red card, 
   number of red cards, number of penalties, date of birth, place of birth, first Super League match, short biography 
*/
const getAllReferees = asyncHandler(async (req, res) => {
  const referees = await Referee.find().sort({ matchCount: -1 });
  res.json(referees);
});

/* 
// @route     GET /api/referees/sortbyname
// @desc      Get all the referees from the database, sort them according to their name in alphabetical order (A to Z)
// @response  Send a json array consisting of:
   the match count, number of yellow cards, number of yellow cards that returned into red card, 
   number of red cards, number of penalties, date of birth, place of birth, first Super League match, short biography
*/
const getRefereeNameSorted = asyncHandler(async (req, res) => {
  const referee = await Referee.find().sort({ name: 1 });
  res.json(referee);
});

/* 
// @route     GET /api/referees/sortbyrank
// @desc      Get all the referees from the database, sort them according to their rank descendingly (A to Z)
// @response  Send a json array consisting of:
   the match count, number of yellow cards, number of yellow cards that returned into red card, 
   number of red cards, number of penalties, date of birth, place of birth, first Super League match, short biography
*/
const getRefereeRankSorted = asyncHandler(async (req, res) => {
  const referee = await Referee.find().sort({ rank: -1 });
  res.json(referee);
});

/* 
// @route     GET /api/referees/sortbymatchcount
// @desc      Get all the referees from the database, sort them according to their match count (A to Z)
// @response  Send a json array consisting of:
   the match count, number of yellow cards, number of yellow cards that returned into red card, 
   number of red cards, number of penalties, date of birth, place of birth, first Super League match, short biography
*/
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