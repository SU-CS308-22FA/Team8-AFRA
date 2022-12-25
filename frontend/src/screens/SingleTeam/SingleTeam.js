import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./SingleTeam.css";
import axios from "axios";

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
  }, []);

  return (
    <MainScreen title={name}>
      <div>
        <div>
          <Row className="allRows">
            <Col>
              <Row className="allRows">
                <img
                  src={logo}
                  style={{ height: "140px" }}
                  alt="Team-Logo"
                ></img>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="subTitle">Team Details</h3>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>Country Origin</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{country}</h5>
                  </Row>
                </Col>
                <Col>
                  <Row className="allRows">
                    <h4>Date of Foundation</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{founded}</h5>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <h3 className="subTitle">Stadium Details</h3>
              <Row className="allRows">
                <h4>Stadium Image</h4>
              </Row>
              <Row className="allRows">
                <img
                  src={stadiumImage}
                  style={{ height: "140px" }}
                  alt="Team-Logo"
                ></img>
              </Row>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>Stadium Name</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{stadiumName}</h5>
                  </Row>
                </Col>
                <Col>
                  <Row className="allRows">
                    <h4>Stadium Address</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{stadiumAddress}</h5>
                  </Row>
                </Col>
              </Row>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>Stadium City</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{stadiumCity}</h5>
                  </Row>
                </Col>
                <Col>
                  <Row className="allRows">
                    <h4>Stadium Capacity</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{stadiumCapacity}</h5>
                  </Row>
                </Col>
              </Row>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>Stadium Surface</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{stadiumSurface}</h5>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div>
          <h3 className="subTitle-bio"> Short Team Information for {name} </h3>
          <Row className="allRows">
            <Col>
              <Row>
                <h6>{name}</h6>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </MainScreen>
  );
}
export default SingleTeam;
