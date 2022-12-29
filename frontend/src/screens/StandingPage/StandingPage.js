import "./StandingPage.css";
import React, { useState, useEffect } from "react";
import { Col, Dropdown, DropdownButton, Row, Table } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";

function StandingPage() {
  const [seasonVar, setSeasonVar] = useState("2022");
  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [changed, setChanged] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/matches/standings`, {
        params: {
          season: seasonVar,
        },
      })
      .then((res) => {
        console.log(data);
        setData(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
    const newHead = [
      { rank: "#" },
      { name: "Team" },
      { allplayed: "Played Matches" },
      { win: "Won" },
      { draw: "Drawn" },
      { lose: "Lost" },
      { gf: "GF" },
      { ga: "GA" },
      { gd: "GD" },
      { points: "Points" },
    ];
    setTableHead(newHead);
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
      <h1 className="mtitle">Standings of Teams</h1>
      <br></br>
      <div className="dropdown">
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
      </div>

      <p> </p>

      <Table responsive>
        <thead>
          <tr className="thead" style={{ height: "50px", textAlign: "center" }}>
            {tableHead.map((tableHead) => {
              return (
                <th>
                  <a>{tableHead.rank}</a>
                  <a>{tableHead.name}</a>
                  <a>{tableHead.allplayed}</a>
                  <a>{tableHead.win}</a>
                  <a>{tableHead.draw}</a>
                  <a>{tableHead.lose}</a>
                  <a>{tableHead.gf}</a>
                  <a>{tableHead.ga}</a>
                  <a>{tableHead.gd}</a>
                  <a>{tableHead.points}</a>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((data) => {
            return (
              <tr
                className="tbodyCal"
                style={{ height: "50px", textAlign: "center" }}
              >
                <td>{data.rank}</td>
                <td>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <img variant="top" src={data.team.logo} width={50} />
                    </Col>
                    <Col style={{ textAlign: "left" }}>{data.team.name}</Col>
                  </Row>
                </td>
                <td>{data.all.played}</td>
                <td>{data.all.win}</td>
                <td>{data.all.draw}</td>
                <td>{data.all.lose}</td>
                <td>{data.all.goals.for}</td>
                <td>{data.all.goals.against}</td>
                <td>{data.all.goals.for - data.all.goals.against}</td>
                <td>{data.points}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default StandingPage;
