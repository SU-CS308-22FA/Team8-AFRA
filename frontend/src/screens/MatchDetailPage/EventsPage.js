import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const EventsPage = ({ matchID }) => {
  const [eventData, setEventData] = useState();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/matchdetail/events`, {
        params: {
          matchID: matchID,
        },
      })
      .then((res) => {
        console.log(res);
        setEventData(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return !flag ? (
    <>Waiting</>
  ) : (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Time</th>
            <th>Team</th>
            <th>Player</th>
            <th>Changed Player</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((data) => {
            return (
              <tr>
                <td>{data.time.elapsed}</td>
                <td>{data.team.name}</td>
                <td>{data.player.name}</td>
                <td>{data.assist.name}</td>
                <td>{data.detail}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default EventsPage;
