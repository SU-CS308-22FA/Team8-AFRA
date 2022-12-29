import "./MatchDetailPage.css";
import React, { useEffect, useState } from "react";
import { Table, Col, Row } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";

const StatisticsPage = ({ matchID }) => {
  const [staticsData, setStaticsData] = useState();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/matchdetail/statics`, {
        params: {
          matchID: matchID,
        },
      })
      .then((res) => {
        setStaticsData(res.data);
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
      <Row>
        <Col>
          <Table className="stats-table" >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  <img src={`${staticsData[0].team.logo}`} height={35} width={35}/>
                </th>
              </tr>
            </thead>
            <tbody>
              {staticsData[0].statistics.map((data, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }} >{data.value ? data.value : 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table className="stats-table">
            <thead>
              
              <tr style={{height: "53px", textAlign: "center"}}>
                <th style={{textAlign: "center", fontSize: "20px" }} > Statistics </th>
              </tr>
            </thead>
            <tbody>
              {staticsData[0].statistics.map((data, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{data.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table className="stats-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  <img src={`${staticsData[1].team.logo}`} height={35} width={35}/>
                </th>
              </tr>
            </thead>
            <tbody>
              {staticsData[1].statistics.map((data, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{data.value ? data.value : 0}</td>
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

export default StatisticsPage;
