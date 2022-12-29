import "./MatchDetailPage.css";
import React, { useEffect, useState } from "react";
import { Table, Col, Row } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";

const StatisticsPage = ({ matchID }) => {
  const [staticsData, setStaticsData] = useState();
  const [flag, setFlag] = useState(false);
  const [dataFlag, setDataFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/matchdetail/statics`, {
        params: {
          matchID: matchID,
        },
      })
      .then((res) => {
        if(res.data.length === 0){
          setDataFlag(true);
        }
        setStaticsData(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
        setDataFlag(true);
      });
  }, []);
  
  return !flag ? (
    <Loading/>
  ) : ( dataFlag ? (<div className="center d-flex justify-content-center" style={{fontSize: "25px"}}>The game hasn't played yet</div>) : (
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
  )
  );
};

export default StatisticsPage;
