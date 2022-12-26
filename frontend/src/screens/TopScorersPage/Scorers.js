import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import Card from "react-bootstrap/Card";
import "./TopScorersPage.css";

const Scorers = ({ season }) => {
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/topscorers/scorers`, {
        params: {
          season: season,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return !flag ? (
    <Loading />
  ) : (
    <div>
      <Table striped bordered hover size="sm">
        <tbody>
          {data.map((d, index) => {
            return (
              <Card body key={index}>
                <div className="flexbox-container">
                  <div class="w-15 p-3" style={{ fontSize: "25px" }}>
                    {index + 1}
                  </div>
                  <div class="w-15 p-3">
                    <img
                      src={`${d.statistics[0].team.logo}`}
                      height={45}
                      weight={45}
                    />
                  </div>
                  <div class="w-15 p-3" style={{ fontSize: "25px" }}>
                    {d.player.name}
                  </div>
                  <div className="m-auto"></div>
                  <div class="w-15 p-3" style={{ fontSize: "25px" }}>
                    {d.statistics[0].goals.total}
                  </div>
                </div>
              </Card>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Scorers;
