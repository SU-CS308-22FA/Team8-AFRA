import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./SingleReferee.css";
import axios from "axios";

function SingleReferee({ match, history }) {
  const params = useParams();
  const refereeName = params.refereeName;

  const [referees, setReferees] = useState([]);
  const [matchCount, setMatchCount] = useState();
  const [yellowCard, setYellowCard] = useState();
  const [yellowRedCard, setYellowRedCard] = useState();
  const [redCard, setRedCard] = useState();
  const [penalty, setPenalty] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees`)
      .then((res) => {
        const referees = res.data;
        setReferees(referees);
        referees.forEach((element) => {
          var cleanName = element.name;
          if (cleanName === refereeName) {
            setMatchCount(element.matchCount);
            setYellowCard(element.yellowCard);
            setYellowRedCard(element.yellowRedCard);
            setRedCard(element.redCard);
            setPenalty(element.penalty);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MainScreen title={refereeName}>
      <div>
        <h3 className="subTitle"> Here photograph will be seen </h3>
        <Row>
          <Col>
            <h3 className="subTitle">Personal Information of {refereeName}</h3>
          </Col>
          <Col>
            <h3 className="subTitle">Technical Details about {refereeName}</h3>
            <Row className="allRows">
              <Col>
                <Row className="allRows">
                  <h4 className="sub4Title">Number of matches</h4>
                </Row>
                <Row className="allRows">
                  <h5>{matchCount}</h5>
                </Row>
              </Col>
              <Col>
                <Row className="allRows">
                  <h4>Number of Penalties</h4>
                </Row>
                <Row className="allRows">
                  <h5>{penalty}</h5>
                </Row>
              </Col>
            </Row>
            <Row className="allRows">
              <Col>
                <Row className="allRows">
                  <h4>Number of Yellow Cards</h4>
                </Row>
                <Row className="allRows">
                  <h5>{yellowCard}</h5>
                </Row>
              </Col>
              <Col>
                <Row className="allRows">
                  <h4>Number of Red Cards</h4>
                </Row>
                <Row className="allRows">
                  <h5>{redCard}</h5>
                </Row>
              </Col>
            </Row>
            <Row className="allRows">
              <Col>
                <Row className="allRows">
                  <h4>Number of Red Cards from Yellow Cards</h4>
                </Row>
                <Row className="allRows">
                  <h5>{yellowRedCard}</h5>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}
export default SingleReferee;
