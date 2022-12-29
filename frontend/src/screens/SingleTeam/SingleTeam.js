import "./SingleTeam.css";
import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Col, Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFutbol, FaHome, FaMap, FaMedal } from "react-icons/fa";

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
    <div>
      <br></br>
      <h1 className="teamTitle">{name}</h1>

      <div className="teamLogo">
        <img src={logo} alt="Team Logo" style={{ height: "150px" }} />
      </div>

      <div className="getBug">
        <Row>
          <Col>
            <div>
              <Row>
                <Col>
                  <br></br>
                  <h2> About {name}</h2>
                  <div>
                    <h3 className="explain">
                      <FaFutbol style={{ marginRight: "10px" }} />
                      <strong>Country of Origin:</strong> {country}
                    </h3>
                    <h3 className="explain">
                      <FaFutbol style={{ marginRight: "10px" }} />
                      <strong>Date of Foundation:</strong> {founded}
                    </h3>
                    <h3 className="explain">
                      <FaMedal style={{ marginRight: "10px" }} />
                      <strong>Team Rank: </strong>{" "}
                      {isInDB ? teamRank : "No Rank is Assigned"}
                    </h3>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Card></Card>
            </div>
          </Col>

          <Col>
            <div>
              <Row>
                <Col>
                  <br></br>
                  <h2>Stadium Information</h2>
                  <div>
                    <h3 className="explain">
                      <FaHome style={{ marginRight: "10px" }} />
                      <strong>Stadium Name:</strong> {stadiumName}
                    </h3>
                    <h3 className="explain">
                      <FaMap style={{ marginRight: "10px" }} />
                      <strong>Stadium Address:</strong> {stadiumAddress}
                    </h3>
                    <h3 className="explain">
                      <FaHome style={{ marginRight: "10px" }} />
                      <strong>Stadium City:</strong> {stadiumCity}
                    </h3>
                    <h3 className="explain">
                      <FaHome style={{ marginRight: "10px" }} />
                      <strong>Stadium Capacity:</strong> {stadiumCapacity}
                    </h3>
                    <h3 className="explain">
                      <FaHome style={{ marginRight: "10px" }} />
                      <strong>Stadium Surface:</strong> {stadiumSurface}
                    </h3>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <section>
        <h2>Stadium Details</h2>
        <img src={stadiumImage} alt="Stadium" style={{ height: "140px" }} />
      </section>
      {isInDB && (
        <section>
          <h2>Short Team Information for {name}</h2>
          <p>{teamInfo}</p>
        </section>
      )}
    </div>
  );
}
export default SingleTeam;
