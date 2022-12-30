import "./SingleTeam.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaFutbol,
  FaHome,
  FaMap,
  FaMedal,
  FaQuestionCircle,
} from "react-icons/fa";

function SingleTeam() {
  const params = useParams();
  const teamID = params.teamID;
  const season = params.season;

  const [name, setName] = useState();
  const [country, setCountry] = useState();
  const [founded, setFounded] = useState();
  const [logo, setLogo] = useState();
  const [stadiumName, setStadiumName] = useState();
  const [stadiumAddress, setStadiumAddress] = useState();
  const [stadiumCity, setStadiumCity] = useState();
  const [stadiumCapacity, setStadiumCapacity] = useState();
  const [stadiumSurface, setStadiumSurface] = useState();
  const [stadiumImage, setStadiumImage] = useState();
  const [teamRank, setTeamRank] = useState();
  const [teamInfo, setTeamInfo] = useState();
  const [isInDB, setIsInDB] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/teams`, {
        params: {
          season: season,
        },
      })
      .then((res) => {
        const teams = res.data;
        console.log(teams);
        teams.forEach((element) => {
          var cleanID = String(element.team.id);
          if (cleanID === teamID) {
            setName(element.team.name);
            setCountry(element.team.country);
            setFounded(element.team.founded);
            setLogo(element.team.logo);
            setStadiumName(element.venue.name);
            setStadiumAddress(element.venue.address);
            setStadiumCity(element.venue.city);
            setStadiumCapacity(element.venue.capacity);
            setStadiumSurface(element.venue.surface);
            setStadiumImage(element.venue.image);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_URL}/api/teams/teamsFromDatabase`)
      .then((res) => {
        const teams = res.data;
        teams.forEach((element) => {
          var cleanID = String(element.id);
          if (cleanID === teamID) {
            setTeamInfo(element.teamInfo);
            setTeamRank(element.teamRank);
            setIsInDB(true);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid main-div">
      <div className="col-12">
        <div id="club-info-section" className="row">
          <div id="club-logo" className="col-3">
            <img id="club-image" src={logo} alt="logo" />
          </div>
          <div id="club-info" className="col-9">
            <div id="c-i-h" className="row">
              <h1 id="c-info-head">
                {" "}
                <b>{name}</b>{" "}
              </h1>{" "}
              <br />{" "}
            </div>
            <div id="c-i-t1" className="row">
              <h3 className="explain">
                <FaFutbol style={{ marginRight: "10px" }} />
                <strong>Country of Origin:</strong> {country}
              </h3>
            </div>
            <div id="c-i-t1" className="row">
              <h3 className="explain">
                <FaFutbol style={{ marginRight: "10px" }} />
                <strong>Date of Foundation:</strong> {founded}
              </h3>
            </div>
            <div id="c-i-tlast" className="row">
              <h3 className="explain">
                <FaMedal style={{ marginRight: "10px" }} />
                <strong>Team Rank: </strong>{" "}
                {isInDB ? teamRank : "No Rank is Assigned"}
              </h3>
            </div>
            {isInDB && (
              <div id="c-i-t1" className="row">
                <h3 className="shortInfo">
                  <FaQuestionCircle style={{ marginRight: "10px" }} />
                  <strong>About {name}</strong>
                </h3>
                <br />
              </div>
            )}
            {isInDB && (
              <div id="c-i-tinfohead" className="row">
                <h3 className="explain">{teamInfo}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <br></br>
      <div className="col-12">
        <div id="stadium-info-section" className="row">
          <div id="club-logo" className="col-3">
            <img
              id="club-image"
              src={stadiumImage}
              alt="Stadium"
              style={{ height: "250px" }}
            />
          </div>
          <div id="club-info" className="col-9">
            <div id="c-i-t1" className="row">
              <h3 className="shortInfo">
                <FaHome style={{ marginRight: "10px" }} />
                <FaHome style={{ marginRight: "10px" }} />
                <strong>{name} Stadium</strong>
              </h3>
              <br />
            </div>
            <div id="c-i-t1" className="row">
              <h3 className="explain">
                <FaHome style={{ marginRight: "10px" }} />
                <strong>Stadium Name:</strong> {stadiumName}
              </h3>
            </div>
            <div id="c-i-t1" className="row">
              <h3 className="explain">
                <FaMap style={{ marginRight: "10px" }} />
                <strong>Stadium Address:</strong> {stadiumAddress}
              </h3>
            </div>
            <div id="c-i-t1" className="row">
              <h3 className="explain">
                <FaHome style={{ marginRight: "10px" }} />
                <strong>Stadium City:</strong> {stadiumCity}
              </h3>
            </div>
            <div id="c-i-t1" className="row">
              <h3 className="explain">
                <FaHome style={{ marginRight: "10px" }} />
                <strong>Stadium Capacity:</strong> {stadiumCapacity}
              </h3>
            </div>
            <div id="c-i-tlast" className="row">
              <h3 className="explain">
                <FaHome style={{ marginRight: "10px" }} />
                <strong>Stadium Surface:</strong> {stadiumSurface}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleTeam;
