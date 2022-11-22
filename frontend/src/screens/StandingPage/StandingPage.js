import React, { useState } from "react";
import { Form, Button, Dropdown, DropdownButton, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./StandingPage.css";

function StandingPage() {
    const [seasonVar, setSeasonVar] = useState();
    const [data, setData] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [displaySentence, setDisplaySentence] = useState();
    
    const handleSelectSeason=(e)=>{
      setSeasonVar(e);
    }
  
    const submitHandler = async (e) => {
      setDisplaySentence("You are now viewing the standings of Season " + seasonVar);
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/matches/standings`,
        {
          params: {
            season: seasonVar,
          },
        }
      );
      console.log(data);
      const newHead = [{"rank":"#"},{"name":"Team"},{"allplayed":"Played Matches"},{"win":"Won"},{"draw":"Drawn"},{"lose":"Lost"},{"gf":"GF"},{"ga":"GA"},{"gd":"GD"},{"points":"Points"}]
    
      setTableHead(newHead);
      setData(data);
    };
    
    return (
      <div>
        <h1 className="mtitle">Standings of Teams According to Their Total Points (Descendingly Ordered) </h1>
        <h2 className="sub"> Select a Season</h2>
        <div className="dropdown">
          <DropdownButton id="dropdown-basic-button" title="Choose a season" onSelect={handleSelectSeason}>
            <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
            <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
            <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
            <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
            <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
            <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
            <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
            <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
            <Dropdown.Item eventKey="2014">2014</Dropdown.Item>
            <Dropdown.Item eventKey="2013">2013</Dropdown.Item>
            <Dropdown.Item eventKey="2012">2012</Dropdown.Item>
          </DropdownButton>
        </div>
  
        <p> </p>
        <Form onSubmit={submitHandler} className="dropdown">
          <Button variant="primary" type="submit"> Submit your Chooses </Button>
        </Form>
        <p> </p>
        <h2 className="subsentence"> {displaySentence} </h2>
        <p> </p>

        <p> </p>

      <Table responsive>
      <thead>
        <tr>
        {tableHead.map(tableHead=>{
          return(
            <th>
            <a>{tableHead.rank}</a>
            <a>{tableHead.name}</a>
            <a>{tableHead.allplayed}</a>
            <a>{tableHead.win}</a>
            <a>{tableHead.draw}</a>
            <a>{tableHead.lose}</a>
            <a>{tableHead.gf}</a>
            <a>{tableHead.ga}</a>
            <a>{tableHead.gd}</a>
            <a>{tableHead.points}</a>
            </th>
          )
        })}
        </tr>
      </thead>

      <tbody>
        {data.map(data=>{
          return(
          <tr>
            <td>{data.rank}</td>
            <td>{data.team.name}</td>
            <td>{data.all.played}</td>
            <td>{data.all.win}</td>
            <td>{data.all.draw}</td>
            <td>{data.all.lose}</td>
            <td>{data.all.goals.for}</td>
            <td>{data.all.goals.against}</td>
            <td>{data.all.goals.for - data.all.goals.against}</td>
            <td>{data.points}</td>
            </tr>
            )
          }
        )}
      </tbody>

    </Table>
        
      </div>
    );
  }
  
  export default StandingPage;