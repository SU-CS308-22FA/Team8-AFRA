import asyncHandler from "express-async-handler";
import axios from "axios";

const getScorers = asyncHandler(async (req, res) => {
  const { season } = req.query;

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/players/topscorers",
    params: { league: "203", season: season },
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

const getAssists = asyncHandler(async (req, res) => {
  const { season } = req.query;

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/players/topassists",
    params: { league: "203", season: season },
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

const getYellowCards = asyncHandler(async (req, res) => {
  const { season } = req.query;

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/players/topyellowcards",
    params: { league: "203", season: season },
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

const getRedCards = asyncHandler(async (req, res) => {
  const { season } = req.query;

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/players/topredcards",
    params: { league: "203", season: season },
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

export { getScorers, getAssists, getYellowCards, getRedCards };
