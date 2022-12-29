import "./MatchDetailPage.css";
import React, { useEffect, useState } from "react";
import { Table, Col, Row } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";

const LineUpsPage = ({ matchID }) => {
  const [lineUpsData, setLineUpsData] = useState();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/matchdetail/lineups`, {
        params: {
          matchID: matchID,
        },
      })
      .then((res) => {
        setLineUpsData(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return !flag ? (
    <Loading/>
  ) : (
    <div>
      <Col style={{ textAlign: "center" }}>
        <b style={{ fontSize: "x-large" }}>Lines Up</b>
      </Col>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  {lineUpsData[0].team.name}{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {lineUpsData[0].startXI.map((data) => {
                return (
                  <tr>
                    <td>{data.player.number}</td>
                    <td>{data.player.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  {lineUpsData[1].team.name}{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {lineUpsData[1].startXI.map((data) => {
                return (
                  <tr>
                    <td>{data.player.number}</td>
                    <td>{data.player.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Col style={{ textAlign: "center" }}>
        <b style={{ fontSize: "x-large" }}>Substitutes</b>
      </Col>

      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  {lineUpsData[0].team.name}{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {lineUpsData[0].substitutes.map((data) => {
                return (
                  <tr>
                    <td>{data.player.number}</td>
                    <td>{data.player.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  {lineUpsData[1].team.name}{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {lineUpsData[1].substitutes.map((data) => {
                return (
                  <tr>
                    <td>{data.player.number}</td>
                    <td>{data.player.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default LineUpsPage;
