import fixture from "../models/matchModel.js";
import asyncHandler from "express-async-handler";
import axios from "axios";

const uploadDatabase = asyncHandler(async (req, res) => {
  const { seasonVar } = req.body;
  console.log(seasonVar);

  const s = await fixture.findOne({ season: seasonVar });
  if (s) {
    res.status(404);
    throw new Error(error);
  }
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: { league: "203", season: seasonVar, timezone: "Europe/Istanbul" },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (r) {
      var weekCounter = 0;
      for (var i = 0; i < r.data.response.length; i++) {
        if (i % 9 == 0) {
          weekCounter = weekCounter + 1;
        }
        const date = r.data.response[i].fixture.date;
        const season = seasonVar;
        const week = weekCounter;
        const home = r.data.response[i].teams.home.name;
        const visitor = r.data.response[i].teams.away.name;
        const division = "SL";
        const referee = r.data.response[i].fixture.referee;
        const hGoal = r.data.response[i].goals.home;
        const vGoal = r.data.response[i].goals.away;

        const match = new fixture({
          date,
          season,
          week,
          home,
          visitor,
          division,
          referee,
          hGoal,
          vGoal,
        });
        match.save();
      }
    })
    .catch(function (error) {
      res.status(404);
    });
  res.status(200);
});

const getMatchesBySeasonAndWeek = asyncHandler(async (req, res) => {
  const { season, week } = req.query;

  const r = await fixture.find({
    season: season,
    week: week,
  });
  res.json(r);
});

export { uploadDatabase, getMatchesBySeasonAndWeek };
