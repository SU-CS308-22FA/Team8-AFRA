import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RefereesScreen.css";

function RefereesScreen() {
  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState([]);

  useEffect(() => {
    const newHead = [
      { rank: "# Rank" },
      { name: "Referee" },
      { matchCount: "Match Count" },
      { yellowCard: "Yellow Card" },
      { yellowRedCard: "Yellow to Red Card" },
      { redCard: "Red Card" },
      { penalty: "Penalty" },
    ];
    setTableHead(newHead);
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees`)
      .then((res) => {
        const referees = res.data;
        setData(referees);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className="mainTitle">Referees in Super League</h1>
      <p> </p>

      <Table responsive>
        <thead>
          <tr>
            {tableHead.map((tableHead) => {
              return (
                <th>
                  <a>{tableHead.rank}</a>
                  <a>{tableHead.name}</a>
                  <a>{tableHead.matchCount}</a>
                  <a style={{ color: "#FFE15D" }}>{tableHead.yellowCard}</a>
                  <a style={{ color: "#FF7000" }}>{tableHead.yellowRedCard}</a>
                  <a style={{ color: "red" }}>{tableHead.redCard}</a>
                  <a>{tableHead.penalty}</a>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((data) => {
            return (
              <tr>
                <td>{10}</td>
                <td>
                  <a href={`/referee/${data.name}`}>{data.name}</a>
                </td>
                <td>{data.matchCount}</td>
                <td>{data.yellowCard}</td>
                <td>{data.yellowRedCard}</td>
                <td>{data.redCard}</td>
                <td>{data.penalty}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default RefereesScreen;
