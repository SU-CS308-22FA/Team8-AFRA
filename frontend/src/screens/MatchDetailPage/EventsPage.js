import "./MatchDetailPage.css";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import { BiTimer } from "react-icons/bi";


const EventsPage = ({ matchID }) => {
  const [eventData, setEventData] = useState();
  const [flag, setFlag] = useState(false);
  const [dataFlag, setDataFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/matchdetail/events`, {
        params: {
          matchID: matchID,
        },
      })
      .then((res) => {
        if(res.data.length === 0){
          setDataFlag(true);
        }
        setEventData(res.data);
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
      {eventData.map((d, index) => {
        if(d.type === "subst"){
          return(
              <div>
              <Card key={index} className="event-card">
                <Row className="flexbox-container">
                  <Col> {d.detail} </Col>
                  <Col className="d-flex justify-content-end flexbox-container"> 
                    <BiTimer style={{fontSize: "1.5em"}}/>
                    <div className="p-1"> {d.time.elapsed} </div>
                  </Col>
                </Row>
                <hr className="hr-card"></hr>
                <Row>
                  <Col>
                    <div style={{fontSize: "24px"}}>
                      {d.player.name}
                    </div>
                    <div>
                      {d.assist.name}
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-end">
                      <img src={`${d.team.logo}`} height={50} width={50}/>
                    </Col>
                </Row>
              </Card>
              <p></p>
            </div>
          );
        }
        else {
          return(
            <div>
              <Card key={index} className="event-card">
                <Row className="flexbox-container">
                  <Col > {d.detail === "Normal Goal" ? (<>Goal</>) : (<>{d.detail}</>)} </Col>
                  <Col className="d-flex justify-content-end flexbox-container"> 
                    <BiTimer style={{fontSize: "1.5em"}}/>
                    <div className="p-1"> {d.time.elapsed} </div>
                  </Col>
                </Row>
                <hr className="hr-card"></hr>
                <Row className="flexbox-container">
                  <Col>
                    <div style={{fontSize: "24px"}}> {d.player.name} </div>
                    { d.assist.name && (
                      <div>Assist: {d.assist.name} </div>
                    )}
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <img src={`${d.team.logo}`} height={50} width={50}/>
                  </Col>
                </Row>
              </Card>
              <p></p>
            </div>
          );
        }
      })}
    </div>
  )
  );
};

export default EventsPage;
