import React, { useState } from "react";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import "./RefereesScreen.css";

function RefereesScreen() {
  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [displaySentence, setDisplaySentence] = useState();

  const submitHandler = async (e) => {
    setDisplaySentence("You are now viewing the referees");
    e.preventDefault();

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/referees`
    );
    console.log(data);

    const newHead = [
      { rank: "#Rank" },
      { name: "Referee" },
      { matchCount: "Match Count" },
      { yellowCard: "Yellow Card" },
      { yellowRedCard: "Yellow to Red Card" },
      { redCard: "Red Card" },
      { penalty: "Penalty" },
    ];
    setTableHead(newHead);
    setData(data);
  };

  return (
    <div>
      <h1 className="mainTitle">Referees in Super League</h1>
      <h3 className="subTitle">Press the button to see the referees</h3>
      <p> </p>
      <Form onSubmit={submitHandler} className="submitButton">
        <Button variant="primary" type="submit">
          See Referees
        </Button>
      </Form>
      <p> </p>
      <h2 className="subsentence"> {displaySentence} </h2>
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
                  <a>{tableHead.yellowCard}</a>
                  <a>{tableHead.yellowRedCard}</a>
                  <a>{tableHead.redCard}</a>
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
                <td>{data.name}</td>
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
