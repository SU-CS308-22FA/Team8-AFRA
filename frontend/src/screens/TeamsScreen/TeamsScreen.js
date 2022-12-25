import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TeamsScreen.css";
import Loading from "../../components/Loading";

function TeamsScreen() {
  const [seasonVar, setSeasonVar] = useState();
  const [data, setData] = useState([]);
  const [displaySentence, setDisplaySentence] = useState();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/teams`, {
        params: {
          season: "2022",
        },
      })
      .then((res) => {
        setData(res.data);
        setDisplaySentence("You are now viewing the teams of Season 2022");
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelectSeason = (e) => {
    setSeasonVar(e);
  };

  const submitHandler = async (e) => {
    setDisplaySentence("You are now viewing the teams of Season " + seasonVar);
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/teams`, {
      params: {
        season: seasonVar,
      },
    });
    console.log(data);
    setData(data);
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
      <h2 className="subsentence"> {displaySentence} </h2>
      <p> </p>
      <div style={{ marginLeft: 60 }}>
        <table>
          <thead>
            <tr>
              <Col>
                <th>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Choose a season"
                    onSelect={handleSelectSeason}
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
              <Col>
                <Form onSubmit={submitHandler} className="dropdown">
                  <Button variant="primary" type="submit">
                    {" "}
                    Submit your Chooses{" "}
                  </Button>
                </Form>
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
              <Card className="card-body text-dark" style={{ width: "18rem" }}>
                <Row className="allRows">
                  <img variant="top" src={data.team.logo} width={100} />
                </Row>

                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    {data.team.name}
                  </Card.Title>
                  <Card.Text>
                    To see further details about the team please visit the
                    details page.
                  </Card.Text>
                </Card.Body>
                <Row className="allRows">
                  <Link to={`/team/${data.team.id}/${seasonVar}`}>
                    <Button variant="primary" size="lg">
                      See Team Details
                    </Button>
                  </Link>
                </Row>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamsScreen;
