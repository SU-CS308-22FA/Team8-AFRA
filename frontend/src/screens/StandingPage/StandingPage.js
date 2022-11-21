import React, { useState } from "react";
import { Form, Button, Dropdown, DropdownButton, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./StandingPage.css";

function StandingPage() {
    const [seasonVar, setSeasonVar] = useState();
    const [data, setData] = useState([]);
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
        "http://localhost:4000/api/matches/standings",
        {
          params: {
            season: seasonVar,
          },
        }
      );
      console.log(data);
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
        
      </div>
    );
  }
  
  export default StandingPage;