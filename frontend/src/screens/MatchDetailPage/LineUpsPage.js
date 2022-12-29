import "./MatchDetailPage.css";
import React, { useEffect, useState } from "react";
import { Table, Col, Row } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import { Justify } from "react-bootstrap-icons";

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
    <div style={{ width: "80%", margin: "0 auto", padding: "20px"}}>
      <Row className="flexbox-container bg-primary">
        <Col lg={4}> 
          <img src={`${lineUpsData[0].team.logo}`} height={70} width={70}/> 
        </Col>
        <Col lg={4} className="d-flex justify-content-center" style={{fontSize: "x-large"}}> 
          <div> Lineups </div>
        </Col>
        <Col lg={4} className="d-flex justify-content-end"> 
          <img src={`${lineUpsData[1].team.logo}`} height={70} width={70} /> 
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
            {lineUpsData[0].startXI.map((d, index) => {
              return(
                <div key={index} className="flexbox-container">
                  <div className="p-2" style={{fontSize: "20px"}}> {d.player.number} </div>
                  <div className="p-2" style={{fontSize: "20px"}}> {d.player.name} </div>
                </div>
              );
            })}
        </Col>
        <Col lg={6}>
            {lineUpsData[1].startXI.map((d, index) => {
              return(
                <div key={index} className="flexbox-container d-flex justify-content-end">
                  <div className="p-2" style={{fontSize: "20px"}}> {d.player.name} </div>
                  <div className="p-2" style={{fontSize: "20px"}}> {d.player.number} </div>
                </div>
              );
            })}
        </Col>
      </Row>
      <p></p>
      <Row className="flexbox-container bg-primary">
        <Col lg={4}> 
          <img src={`${lineUpsData[0].team.logo}`} height={70} width={70}/> 
        </Col>
        <Col lg={4} className="d-flex justify-content-center" style={{fontSize: "x-large"}}> 
          <div> Substitutes </div>
        </Col>
        <Col lg={4} className="d-flex justify-content-end"> 
          <img src={`${lineUpsData[1].team.logo}`} height={70} width={70} /> 
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
            {lineUpsData[0].substitutes.map((d, index) => {
              return(
                <div key={index} className="flexbox-container">
                  <div className="p-2" style={{fontSize: "20px"}}> {d.player.number} </div>
                  <div className="p-2" style={{fontSize: "20px"}}> {d.player.name} </div>
                </div>
              );
            })}
        </Col>
        <Col lg={6}>
            {lineUpsData[1].substitutes.map((d, index) => {
              return(
                <div key={index} className="flexbox-container d-flex justify-content-end">
                  <div className="p-2" style={{fontSize: "20px"}}> {d.player.name} </div>
                  <div className="p-2" style={{fontSize: "20px"}}> {d.player.number} </div>
                </div>
              );
            })}
        </Col>
      </Row>
    </div>
  );
};

export default LineUpsPage;
