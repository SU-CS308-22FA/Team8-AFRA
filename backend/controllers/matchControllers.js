import fixture from "../models/matchModel.js";
import asyncHandler from "express-async-handler";
import axios from "axios";

const uploadDatabase = asyncHandler(async (req, res) => {
  const { seasonVar } = req.body;

  const s = await fixture.findOne({ season: seasonVar });
  if (s) {
    res.send("Cannot Uploaded since the data already uploaded to database");
    return;
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
  await axios
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
        const homeLogo = r.data.response[i].teams.home.logo;
        const visitor = r.data.response[i].teams.away.name;
        const visitorLogo = r.data.response[i].teams.away.logo;
        const division = "SL";
        const referee = r.data.response[i].fixture.referee;
        const hGoal = r.data.response[i].goals.home;
        const vGoal = r.data.response[i].goals.away;
        const matchID = r.data.response[i].fixture.id;
        console.log(matchID);
        const match = new fixture({
          date,
          season,
          week,
          home,
          homeLogo,
          visitor,
          visitorLogo,
          division,
          referee,
          hGoal,
          vGoal,
          matchID,
        });
        match.save();
      }
      res.send("Uploaded successfully");
    })
    .catch(function (err) {
      res.send("Cannot Uploaded since the API does not work");
    });
});

const getMatchesBySeasonAndWeek = asyncHandler(async (req, res) => {
  const { season, week } = req.query;

  const r = await fixture.find({
    season: season,
    week: week,
  });
  res.json(r);
});

const getStandingsBySeason = asyncHandler(async (req, res) => {
  const { season } = req.query;
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/standings",
    params: { season: season, league: "203" },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (r) {
      res.json(r.data.response[0].league.standings[0]);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// "/changetimeofmatch"
//PUT
const changeTimeOfTheMatch = asyncHandler(async (req, res) => {
  console.log("axios sending to changeTimeOfMatch successfully");
  console.log(req.body);
  const { matchID, selectedWeek } = req.body;
  console.log(matchID);
  console.log(selectedWeek);
  const filter = { matchID: matchID };
  const update = { week: selectedWeek, isDelayed: false };
  let thematch = await fixture.findOneAndUpdate(filter, update);
  console.log(thematch);
  if (thematch) {
    const updatedMatch = thematch.save();
    res.json(updatedMatch);
  } else {
    res.status(404);
    throw new Error("Match not found");
  }
});

// PUT
// "/matchdelayed"
const matchDelayed = asyncHandler(async (req, res) => {
  console.log("axios sending to matchDelayed successfully");
  console.log(req.body);
  const { matchID } = req.body;
  console.log(matchID);
  const filter = { matchID: matchID };
  const update = { isDelayed: true };
  let thematch = await fixture.findOneAndUpdate(filter, update);
  console.log(thematch);
  if (thematch) {
    const updatedMatch = thematch.save();
    res.json(updatedMatch);
  } else {
    res.status(404);
    throw new Error("Match not found");
  }
});

export {
  uploadDatabase,
  getMatchesBySeasonAndWeek,
  getStandingsBySeason,
  changeTimeOfTheMatch,
  matchDelayed,
};
