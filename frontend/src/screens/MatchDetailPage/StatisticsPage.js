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
          <Table responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  {staticsData[0].team.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {staticsData[0].statistics.map((data) => {
                return (
                  <tr>
                    <td>{data.value ? data.value : 0}</td>
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
                <th style={{ textAllign: "center" }}> Statistics </th>
              </tr>
            </thead>
            <tbody>
              {staticsData[0].statistics.map((data) => {
                return (
                  <tr>
                    <td>{data.type}</td>
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
                  {staticsData[1].team.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {staticsData[1].statistics.map((data) => {
                return (
                  <tr>
                    <td>{data.value ? data.value : 0}</td>
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
