import asyncHandler from "express-async-handler";
import Team from "../models/teamModel.js";
import axios from "axios";

const getTeamsBySeason = asyncHandler(async (req, res) => {
  const { season } = req.query;
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/teams",
    params: { season: season, league: "203" },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (r) {
      res.json(r.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });
});

const getTeamsFromDatabase = asyncHandler(async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

export { getTeamsBySeason, getTeamsFromDatabase };
