import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleReferee({ match, history }) {
  const params = useParams();
  const refereeName = params.refereeName;

  return (
    <MainScreen title="Referee Details">
      <Card>
        <Card.Header>Referee</Card.Header>
        <Card.Body>
          <a>{refereeName}</a>
        </Card.Body>

        <Card.Footer className="text-muted">
          Referee Name - {refereeName}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
  /*
  import React, { useEffect, useState } from "react";
  import MainScreen from "../../components/MainScreen";
  import axios from "axios";
  import { Button, Card, Form } from "react-bootstrap";
  import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
  
  function RefereeDetails({ match, history }) {
    const { name } = useParams();
    console.log(name);
    const [referees, setReferees] = useState([]);
    const [myName, setName] = useState([]);
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
            cleanName = cleanName.replace(" ", "");
            cleanName = cleanName.replace(" ", "");
            cleanName = cleanName.replace(" ", "");
            if (cleanName === name) {
              setMatchCount(element.matchCount);
              setYellowCard(element.yellowCard);
              setYellowRedCard(element.yellowRedCard);
              setRedCard(element.redCard);
              setPenalty(element.penalty);
              setName(element.name);
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
            <a>{name}</a>
          </Card.Body>
  
          <Card.Footer className="text-muted">Referee Name - {name}</Card.Footer>
        </Card>
      </MainScreen>
    );
  }
  */
  /*
    useEffect(() => {
      const fetching = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL}/api/referees/${match.params.id}`
        );
        setName(data.name);
        setMatchCount(data.matchCount);
        setYellowCard(data.yellowCard);
        setYellowRedCard(data.yellowRedCard);
        setRedCard(data.redCard);
        setPenalty(data.penalty);
      };
      console.log({ name });
      console.log("data.name");
      fetching();
    });
  */
}
export default SingleReferee;

/*
import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function SingleReferee({ match, history }) {
  const [name, setName] = useState();
  const [matchCount, setMatchCount] = useState();
  const [yellowCard, setYellowCard] = useState();
  const [yellowRedCard, setYellowRedCard] = useState();
  const [redCard, setRedCard] = useState();
  const [penalty, setPenalty] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/referees/${match.params.id}`
      );
      setName(data.name);
      setMatchCount(data.matchCount);
      setYellowCard(data.yellowCard);
      setYellowRedCard(data.yellowRedCard);
      setRedCard(data.redCard);
      setPenalty(data.penalty);
    };
    console.log({ name });
    console.log("data.name");
    fetching();
  });

  return (
    <MainScreen title="Referee Details">
      <Card>
        <Card.Header>Referee</Card.Header>
        <Card.Body>
          <a>{matchCount}</a>
        </Card.Body>

        <Card.Footer className="text-muted">Referee Name - {name}</Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleReferee;
*/
