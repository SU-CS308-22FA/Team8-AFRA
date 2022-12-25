import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import axios from "axios";
import "./FixturePage.css";
import Modal from 'react-bootstrap/Modal';




function FixturePage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [varSeason, setvarSeason] = useState();
  const [varWeek, setVarWeek] = useState();
  const [seasonVar, setSeasonVar] = useState();
  const [weekVar, setWeekVar] = useState();
  const [displaySentence, setDisplaySentence] = useState();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(3);
  const [matchId, setMatchId] = useState(0);
  const handleSelectSeason = (e) => {
    setSeasonVar(e);
  };


let weeksOfTheMatches=["1","2","3","4","5","6","7","8","9","10","11","12",
"13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28",
"29","30","31","32","33","34","35","36","37","38","39"];
  const handleSubmitForEdit = async(e) => {
    e.preventDefault();
    //console.log(e);
    console.log(selectedWeek);
    console.log(matchId);
    setShow(false);

    let matchID= matchId;
    const { dataOfUpdatedMatch } = await axios.put(
      `${process.env.REACT_APP_URL}/api/matches/changetimeofmatch`,
      { matchID,selectedWeek}
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/matches/fixture`,
      {
        params: {
          season: seasonVar,
          week: weekVar,
        },
      }
    );
    setData(data);
    
  };

  const checkBackend = async (matchID) => {
    

    await axios.put(
      `${process.env.REACT_APP_URL}/api/matches/matchdelayed`,
      { matchID}
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/matches/fixture`,
      {
        params: {
          season: seasonVar,
          week: weekVar,
        },
      }
    );
    setData(data);
  };

  const handleShow = () => setShow(true);
  const handleClose= () => setShow(false);

  const handleSelectWeek = (e) => {
    setWeekVar(e);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setVarWeek(weekVar);
    setvarSeason(seasonVar);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/matches/fixture`,
      {
        params: {
          season: seasonVar,
          week: weekVar,
        },
      }
    );
    if (data.length === 0) {
      setDisplaySentence("No Data");
    } else {
      setDisplaySentence(
        "You are now viewing the matches of Week " +
          weekVar +
          " of Season " +
          seasonVar
      );
    }

    setData(data);
  };



  return (
    <div>
      <div>
        <h1 className="mtitle">Fixture Details by Wanted Season & Week</h1>
        <h2 className="sub"> Season</h2>
        <div className="dropdown">
          <DropdownButton
            id="dropdown-basic-button"
            title="Choose a season"
            onSelect={handleSelectSeason}
          >
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
        <h2 className="sub"> Week </h2>
        <div className="dropdown">
          <DropdownButton
            id="dropdown-basic-button"
            title="Choose a week"
            onSelect={handleSelectWeek}
          >
            <Dropdown.Item eventKey="1">1</Dropdown.Item>
            <Dropdown.Item eventKey="2">2</Dropdown.Item>
            <Dropdown.Item eventKey="3">3</Dropdown.Item>
            <Dropdown.Item eventKey="4">4</Dropdown.Item>
            <Dropdown.Item eventKey="5">5</Dropdown.Item>
            <Dropdown.Item eventKey="6">6</Dropdown.Item>
            <Dropdown.Item eventKey="7">7</Dropdown.Item>
            <Dropdown.Item eventKey="8">8</Dropdown.Item>
            <Dropdown.Item eventKey="9">9</Dropdown.Item>
            <Dropdown.Item eventKey="10">10</Dropdown.Item>
            <Dropdown.Item eventKey="11">11</Dropdown.Item>
            <Dropdown.Item eventKey="12">12</Dropdown.Item>
            <Dropdown.Item eventKey="13">13</Dropdown.Item>
            <Dropdown.Item eventKey="14">14</Dropdown.Item>
            <Dropdown.Item eventKey="15">15</Dropdown.Item>
            <Dropdown.Item eventKey="16">16</Dropdown.Item>
            <Dropdown.Item eventKey="17">17</Dropdown.Item>
            <Dropdown.Item eventKey="18">18</Dropdown.Item>
            <Dropdown.Item eventKey="19">19</Dropdown.Item>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
            <Dropdown.Item eventKey="21">21</Dropdown.Item>
            <Dropdown.Item eventKey="22">22</Dropdown.Item>
            <Dropdown.Item eventKey="23">23</Dropdown.Item>
            <Dropdown.Item eventKey="24">24</Dropdown.Item>
            <Dropdown.Item eventKey="25">25</Dropdown.Item>
            <Dropdown.Item eventKey="26">26</Dropdown.Item>
            <Dropdown.Item eventKey="27">27</Dropdown.Item>
            <Dropdown.Item eventKey="28">28</Dropdown.Item>
            <Dropdown.Item eventKey="29">29</Dropdown.Item>
            <Dropdown.Item eventKey="30">30</Dropdown.Item>
            <Dropdown.Item eventKey="31">31</Dropdown.Item>
            <Dropdown.Item eventKey="32">32</Dropdown.Item>
            <Dropdown.Item eventKey="33">33</Dropdown.Item>
            <Dropdown.Item eventKey="34">34</Dropdown.Item>
            <Dropdown.Item eventKey="35">35</Dropdown.Item>
            <Dropdown.Item eventKey="36">36</Dropdown.Item>
            <Dropdown.Item eventKey="37">37</Dropdown.Item>
            <Dropdown.Item eventKey="38">38</Dropdown.Item>
            <Dropdown.Item eventKey="39">39</Dropdown.Item>
          </DropdownButton>
        </div>

        <p> </p>
        <Form onSubmit={submitHandler} className="dropdown">
          <Button variant="primary" type="submit">
            {" "}
            Submit your Chooses{" "}
          </Button>
        </Form>
        <h2 className="sub1title"> {displaySentence} </h2>

        <p> </p>

        <ol>
          {data.map((match) => (
            <>
           
              <h3 key={match} className="startLine">
                {" "}
                <p>
                  {match.isDelayed ? "This match has been delayed. Time is uncertain" : ""}
                </p>
                <a href={`/matchdetails/${match.matchID}`}>
                  <h5 className="teamNames">
                    {" "}
                    {match.home} - {match.visitor}{" "} 
                    
                  </h5>{" "}
                </a>
                 <h5> 
                  {userInfo.isAdmin ? <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShow}>
                          {" "}
                          Change the time of the match{" "} 
                                
                        </Dropdown.Item>
                            <Modal show={show} onHide={handleClose}>
                            
                              <Modal.Header closeButton>
                                <Modal.Title>Choose another week for the match</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>Avaiable Weeks:
                                  <Form onSubmit={handleSubmitForEdit}>
                                    {weeksOfTheMatches.map((labelName) => (
                                    
                                      <div key={`default-radio`} className="mb-3">
                                        {labelName> match.week ?  
                                        <Form.Group controlId= "getSelectionForUpdateWeek">
                                            <Form.Check 
                                              type='radio'
                                              name= "belongSameRadio"
                                              id={`default-radio`}
                                              label={labelName}
                                              value= {labelName}
                                              onChange={(e) => setSelectedWeek(e.target.value)}
                                            />
                                        </Form.Group>
                                        : <></>}
                                        
                                      </div>
                                    ))}
                                      <Button variant="primary" type="submit" onClick = {() => setMatchId(match.matchID) }>
                                        Save Changes
                                      </Button>
                                    </Form>
                              </Modal.Body>
                            </Modal>
                        <Dropdown.Item onClick= {() => checkBackend(match.matchID)} >
                          {" "}
                          Postpone match to a later date
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> : <></>}
                    
                </h5>
                
                {match.hGoal} - {match.vGoal} <p> </p>
              </h3>
              <h5 className="explain">
                {" "}
                The referee of the match was: {match.referee}{" "}
              </h5>{" "}
              <p> </p>
              <hr />
            </>
          ))}
        </ol>
      </div>
    </div>
  );
}
export default FixturePage;
