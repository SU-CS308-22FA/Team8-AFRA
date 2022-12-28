import "./TeamsScreen.css";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function TeamsScreen() {
  const [seasonVar, setSeasonVar] = useState("2022");
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [changed, setChanged] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/teams`, {
        params: {
          season: seasonVar,
        },
      })
      .then((res) => {
        setData(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changed]);

  const handleSelectSeason = (eventKey, e) => {
    e.preventDefault();
    setSeasonVar(eventKey);
    setChanged((c) => c + 1);
  };

  return !flag ? (
    <div>
      <p></p>
      <Loading />
    </div>
  ) : (
    <div>
      <h1 className="mtitle">Teams in Super League</h1>
      <p> </p>
      <div className="center">
        <table className="center">
          <thead className="center">
            <tr>
              <Col className="center">
                <th className="center">
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={seasonVar}
                    onSelect={(e, eventKey) => handleSelectSeason(e, eventKey)}
                  >
                    <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
                    <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
                    <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                    <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
                    <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
                    <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
                    <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
                    <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
                    <Dropdown.Item eventKey="2014">2014</Dropdown.Item>
                    <Dropdown.Item eventKey="2013">2013</Dropdown.Item>
                    <Dropdown.Item eventKey="2012">2012</Dropdown.Item>
                  </DropdownButton>
                </th>
              </Col>
            </tr>
          </thead>
        </table>
      </div>
      <div
        className="row row-cols-4 row-cols-md-4 g-4"
        style={{ marginLeft: 40, marginRight: 40 }}
      >
        {data.map((data) => {
          return (
            <div className="card-body text-dark">
              <Card
                className="card-body text-dark"
                style={{ width: "18rem" }}
                onClick={() => navigate(`/team/${data.team.id}/${seasonVar}`)}
              >
                <Row className="allRows">
                  <img variant="top" src={data.team.logo} width={100} />
                </Row>

                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    {data.team.name}
                  </Card.Title>
                </Card.Body>
                <Row className="allRows"></Row>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamsScreen;
