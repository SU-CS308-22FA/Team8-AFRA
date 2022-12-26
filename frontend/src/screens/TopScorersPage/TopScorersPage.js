import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import { Row, Col, Tabs, Tab, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";
import "./TopScorersPage.css";
import Scorers from "./Scorers";
import Assists from "./Assists";
import RedCard from "./RedCard";
import YellowCard from "./YellowCard";

function TopScorersPage() {
  const params = useParams();
  const season = params.season;

  return (
    <MainScreen>
      <Row>
        <Col lg={11}>
          <Tabs
            defaultActiveKey="top-scorers"
            id="top-scorers-page"
            className="mb-3"
          >
            <Tab className="ml-3" eventKey="top-scorers" title="Top Scorers">
              <Scorers season={season} />
            </Tab>
            <Tab eventKey="top-assists" title="Top Assists">
              <Assists season={season} />
            </Tab>
            <Tab eventKey="top-yellow-card" title="Top Yellow Card">
              <YellowCard season={season} />
            </Tab>
            <Tab eventKey="top-red-card" title="Top Red Card">
              <RedCard season={season} />
            </Tab>
          </Tabs>
        </Col>
        <Col className="dropdown-season" lg={1}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {season}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/topscorers/2022">2022</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2021">2021</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2020">2020</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2019">2019</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2018">2018</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2017">2017</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2016">2016</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2015">2015</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2014">2014</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2013">2013</Dropdown.Item>
              <Dropdown.Item href="/topscorers/2012">2012</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </MainScreen>
  );
}

export default TopScorersPage;
