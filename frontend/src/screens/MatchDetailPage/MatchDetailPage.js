import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import { Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MatchDetailPage.css";
import EventsPage from "./EventsPage";
import LineUpsPage from "./LineUpsPage";
import StatisticsPage from "./StatisticsPage";
import Comments from "./Comments";

function MatchDetailPage() {
  const [viewState, setViewState] = useState(4);
  const [match, setMatch] = useState();
  const params = useParams();
  const matchIDVar = params.matchID;
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/matchdetail`, {
        params: {
          matchID: matchIDVar,
        },
      })
      .then((res) => {
        const tempData = res.data;
        setMatch(tempData);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return !flag ? (
    <Loading/>
  ) : (
    <MainScreen>
      <div>
        <div>
          <h3 key={match} className="startLine">
            {" "}
            <h5 className="teamNames">
              {" "}
              {match.home} - {match.visitor}{" "}
            </h5>{" "}
            {match.hGoal} - {match.vGoal} <p> </p>
          </h3>
          <h5 className="explain">
            {" "}
            The referee of the match was: {match.referee}{" "}
          </h5>{" "}
          <p> </p>
        </div>
        <hr className="newhr"></hr>
        <div>
          <Row className="rowcenter">
            <Col className="rowcenter">
              <div>
                <button onClick={() => setViewState(1)}>Events</button>
              </div>
            </Col>
            <Col className="rowcenter">
              <button onClick={() => setViewState(2)}>Line Ups</button>
            </Col>
            <Col className="rowcenter">
              <button onClick={() => setViewState(3)}>Statistics</button>
            </Col>
            <Col className="rowcenter">
              <button onClick={() => setViewState(4)}>Comments</button>
            </Col>
          </Row>
        </div>
        <p></p>
        {viewState === 1 ? <EventsPage matchID={matchIDVar} /> : ""}
        {viewState === 2 ? <LineUpsPage matchID={matchIDVar} /> : ""}
        {viewState === 3 ? <StatisticsPage matchID={matchIDVar} /> : ""}
        {viewState === 4 ? <Comments matchID={matchIDVar} /> : ""}
      </div>
    </MainScreen>
  );
}

export default MatchDetailPage;
