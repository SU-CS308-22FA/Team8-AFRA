import "./MatchDetailPage.css";
import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import {Card, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import EventsPage from "./EventsPage";
import LineUpsPage from "./LineUpsPage";
import StatisticsPage from "./StatisticsPage";
import Comments from "./Comments";
import { useSelector } from "react-redux";

function MatchDetailPage() {
  const [match, setMatch] = useState();
  const params = useParams();
  const matchIDVar = params.matchID;
  const [flag, setFlag] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [matchDate, setMatchDate] = useState();
  const [matchTime, setMatchTime] = useState();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/matchdetail`, {
        params: {
          matchID: matchIDVar,
        },
      })
      .then((res) => {
        const tempData = res.data;
        const tempD = new Date(tempData.date);
        const tempDate = tempD.getDate() + " " + monthNames[tempD.getMonth()] + " " + tempD.getFullYear();
        const tempT = tempData.date.split('T')[1];
        const tempH = parseInt(tempT.split(':')[0]) + 3;
        const tempTime = tempH.toString() + ":" + tempT.split(':')[1];
        setMatchDate(tempDate);
        setMatchTime(tempTime);
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
        <Card className="fixture-detail-card"> 
          <div>
            {matchDate}
          </div>
          <div>
            {matchTime}
          </div>
          <div className="flexbox-container">
            <div className="w-15 p-2">
              <img src={`${match.homeLogo}`} height={50} width={50}/>
            </div>
            <div className="w-20 p-2"> {match.home} </div>
            <div className="w-15 p-2"> {match.hGoal} </div>
            <div className="w-15 p-3"> - </div>
            <div className="w-15 p-2"> {match.vGoal} </div>
            <div className="w-20 p-2"> {match.visitor} </div>
            <div className="w-15 p-2">
              <img src={`${match.visitorLogo}`} height={50} width={50}/>
            </div>
          </div>
          <div>
            Referee: {match.referee}
          </div>
        </Card>
        <Tabs 
          defaultActiveKey="comments"
          id="match-detail-page"
          className="mb-3"
          style={{ width: "80%", margin: "0 auto", padding: "20px"}}
        >
          <Tab className="ml-3" eventKey="events" title="Events">
            <EventsPage matchID={matchIDVar} />
          </Tab>
          <Tab className="ml-3" eventKey="lineups" title="Line Ups">
            <LineUpsPage matchID={matchIDVar} />
          </Tab>
          <Tab className="ml-3" eventKey="statistics" title="Statistics">
            <StatisticsPage matchID={matchIDVar} />
          </Tab>
          <Tab className="ml-3" eventKey="comments" title="Comments">
            <Comments matchID={matchIDVar} />
          </Tab>
        </Tabs>
      </div>
    </MainScreen>
  );
}

export default MatchDetailPage;
