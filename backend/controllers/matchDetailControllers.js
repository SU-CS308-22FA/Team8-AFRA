import fixture from "../models/matchModel.js";
import asyncHandler from "express-async-handler";
import axios from "axios";

const getInfo = asyncHandler(async (req, res) => {
  const { matchID } = req.query;
  const s = await fixture.findOne({ matchID: matchID });
  res.send(s);
});

const getEvents = asyncHandler(async (req, res) => {
  const { matchID } = req.query;

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/events",
    params: { fixture: matchID },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });
});

const getLineUps = asyncHandler(async (req, res) => {
  const { matchID } = req.query;

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups",
    params: { fixture: matchID },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });
});

const getStatics = asyncHandler(async (req, res) => {
  const { matchID } = req.query;

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics",
    params: { fixture: matchID },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });
});

export { getInfo, getEvents, getLineUps, getStatics };
