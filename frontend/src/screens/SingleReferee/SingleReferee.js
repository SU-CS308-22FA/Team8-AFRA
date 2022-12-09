import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
    <MainScreen title="Referee Details">
      <Card>
        <Card.Header>Referee</Card.Header>
        <Card.Body>
          <a>{refereeName}</a>
          <p></p>
          <a>{matchCount}</a>
          <p></p>
          <a>{yellowCard}</a>
          <p></p>
          <a>{yellowRedCard}</a>
          <p></p>
          <a>{redCard}</a>
          <p></p>
          <a>{penalty}</a>
        </Card.Body>

        <Card.Footer className="text-muted">
          Referee Name - {refereeName}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}
export default SingleReferee;
