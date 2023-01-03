import "./FixturePage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";

function FixturePage() {
  const [season, setSeason] = useState(2022);
  const [week, setWeek] = useState(17);
  const [data,setData] = useState();
  const [checker,setChecker] = useState(false);
  const [flag,setFlag] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  var lastDate;
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const fetchData = async() => {
    return await axios.get(
      `${process.env.REACT_APP_URL}/api/matches/fixture`,
      {
        params: {
          season: season,
          week: week,
        },
      }
    ).then((response) => response.data);;
  }

  useEffect(() => {

    if(season !== 2020 && week > 38){
      setWeek(38);
    }
    if(season < 2020 && week > 34){
      setWeek(34);
    }

    fetchData().then((d) => {
      if(!d){
        setChecker(true);
      }
      setData(d);
      setFlag(true);
    })
    
  }, [season, week, flag]);

  const submitHandler = async() => {
    
    setIsAssigning(true);
    if(data[0].referee !== "Referee Does not Assign"){
      alert("Referees have already been assigned");
      setIsAssigning(false);
      return;
    }

    await axios.post(`${process.env.REACT_APP_URL}/api/matches/referee`,{season,week})
    .then(res => {
      alert(res.data);
      setIsAssigning(false);
      setFlag(false);
    })
    .catch(err => {
      setIsAssigning(false);
      console.log(err);
    })
  }

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [matchId, setMatchId] = useState(0);

  const handleSubmitForEdit = async(e) => {
    e.preventDefault();
    //console.log(e);
    console.log(selectedDate);
    console.log(matchId);
    setShow(false);


    var dateString = selectedDate;
    var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    console.log(reggie)
    var dateArray = reggie.exec(dateString); 
    console.log(dateArray);
    var dateObject = new Date(
    (+dateArray[1]),
    (+dateArray[2])-1, // Careful, month starts at 0!
    (+dateArray[3]),
    (+dateArray[4]),
    (+dateArray[5]),
    (+dateArray[6])
    );

    console.log(dateObject);

    var there = dateObject;
    console.log(there);
    dateObject=there;

    let matchID= matchId;

    const  dataOfUpdatedMatch  = await axios.put(
      `${process.env.REACT_APP_URL}/api/matches/changetimeofmatch`,
      { matchID,dateObject}
    );

    console.log(dataOfUpdatedMatch);
    if(dataOfUpdatedMatch.data==="Same time"){
      window.alert("There is another match at the same time. Please try again");
    }
    else{
      window.alert("Time is successfully updated");
    }

    setFlag(false);
    
  };

  const doDelay = async (matchID) => {
    await axios.put(
      `${process.env.REACT_APP_URL}/api/matches/matchdelayed`,
      { matchID}
    );

    setFlag(false);
  };

  const handleShow = () => setShow(true);
  const handleClose= () => setShow(false);

  return (
    <MainScreen>
      <Row className="justify-content-between w-100">
        <Col lg={6} className="flexbox-container d-flex p-0 justify-content-end align-self-end" style={{position: "relative", left: "95px"}}>
          <DropdownButton className="p-1" id="seasonSelector" title={season} color="primary">
            <Dropdown.Item onClick={() => {setSeason(2022);}}> 2022 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2021);}}> 2021 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2020);}}> 2020 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2019);}}> 2019 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2018);}}> 2018 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2017);}}> 2017 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2016);}}> 2016 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2015);}}> 2015 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2014);}}> 2014 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2013);}}> 2013 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setSeason(2012);}}> 2012 </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="weekSelector" title={week} color="primary">
            <Dropdown.Item onClick={() => {setWeek(1);}}> 1 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(2);}}> 2 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(3);}}> 3 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(4);}}> 4 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(5);}}> 5 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(6);}}> 6 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(7);}}> 7 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(8);}}> 8 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(9);}}> 9 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(10);}}> 10 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(11);}}> 11 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(12);}}> 12 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(13);}}> 13 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(14);}}> 14 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(15);}}> 15 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(16);}}> 16 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(17);}}> 17 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(18);}}> 18 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(19);}}> 19 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(20);}}> 20 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(21);}}> 21 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(22);}}> 22 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(23);}}> 23 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(24);}}> 24 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(25);}}> 25 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(26);}}> 26 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(27);}}> 27 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(28);}}> 28 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(29);}}> 29 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(30);}}> 30 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(31);}}> 31 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(32);}}> 32 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(33);}}> 33 </Dropdown.Item>
            <Dropdown.Item onClick={() => {setWeek(34);}}> 34 </Dropdown.Item>
            {season > 2019 && (
              <>
                <Dropdown.Item onClick={() => {setWeek(35);}}> 35 </Dropdown.Item>
                <Dropdown.Item onClick={() => {setWeek(36);}}> 36 </Dropdown.Item>
                <Dropdown.Item onClick={() => {setWeek(37);}}> 37 </Dropdown.Item>
                <Dropdown.Item onClick={() => {setWeek(38);}}> 38 </Dropdown.Item>
                {season === 2020 && (
                  <>
                    <Dropdown.Item onClick={() => {setWeek(39);}}> 39 </Dropdown.Item>
                    <Dropdown.Item onClick={() => {setWeek(40);}}> 40 </Dropdown.Item>
                    <Dropdown.Item onClick={() => {setWeek(41);}}> 41 </Dropdown.Item>
                    <Dropdown.Item onClick={() => {setWeek(42);}}> 42 </Dropdown.Item>
                  </>
                )}
              </>
            )}
          </DropdownButton>
        </Col>
        <Col lg={3} className="d-flex p-0 justify-content-end align-self-end" style={{position: "relative", right: "95px", bottom: "3px"}}>
          {userInfo && userInfo.isAdmin && (
          <>
            <Button disabled={isAssigning} onClick={submitHandler}> 
              {isAssigning ? "Assigning..." : "Assign Referee"}
            </Button>
          </>)}
        </Col>  
      </Row>
      {checker && (
        <>
          <h2 className="sub1title"> No Data </h2>
        </>
      )}
      {!flag && (
        <>
          <Loading/>
        </>
      )}
      {flag && (
        <>
          <ul>
            {data.map((d,index) => {
              const tempD = new Date(d.date);
              const tempDate = tempD.getDate() + " " + monthNames[tempD.getMonth()] + " " + tempD.getFullYear();
              var tempTime;
              if(d.isDelayed){
                tempTime = "Postponed";
              }
              else{
                const tempT = d.date.split('T')[1];
                const tempH = parseInt(tempT.split(':')[0]) + 3;
                tempTime = tempH.toString() + ":" + tempT.split(':')[1];
              }

              if(tempDate !== lastDate){
                lastDate = tempDate;
                return (
                  <div key={index}>
                    <Row className="bg-primary rowcenter date-card"> {lastDate} </Row>
                    <Card className="fixture-card">
                      <div style={{ position: 'relative', width: '100%' }} className="flexbox-container row justify-content-center"> 
                        <Row className="justify-content-between w-100">
                          <Col style={{padding: "16px"}} className="d-flex p-0 justify-content-center offset-4" lg={4}>
                            <p style={{marginLeft: "16px", marginBottom: "0px", fontSize: "20px"}}>
                              {tempTime}
                            </p>  
                          </Col>
                          <Col className="d-flex p-0 justify-content-end align-self-end" lg={4}>
                            {userInfo && userInfo.isAdmin && ( 
                              <> 
                                <Dropdown>
                                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleShow}>
                                      {" "}
                                      Change the time of the match{" "} 
                                            
                                    </Dropdown.Item>
                                        <Modal show={show} onHide={handleClose}>
                                        
                                          <Modal.Header closeButton>
                                            <Modal.Title>Choose another day and time for the match</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>Please enter the new date and the time in the form of 
                                            (YYYY-MM-DD HH:MM:SS):
                                              <Form onSubmit={handleSubmitForEdit}>
                                                  <div key={`default-radio`} className="mb-3"> 
                                                    <Form.Group controlId= "getSelectionForUpdateWeek">
                                                        <Form.Control
                                                          type="input"
                                                          value={selectedDate}
                                                          placeholder="Enter the new date (YYYY-MM-DD HH:MM:SS)"
                                                          onChange={(e) => setSelectedDate(e.target.value)}
                                                        />
                                                    </Form.Group>   
                                                  </div>
                                                  <Button variant="primary" type="submit" onClick = {() => setMatchId(d.matchID) }>
                                                    Save Changes
                                                  </Button>
                                                </Form>
                                          </Modal.Body>
                                        </Modal>
                                    <Dropdown.Item onClick= {() => doDelay(d.matchID)} >
                                      {" "}
                                      Postpone match to a later date
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </>)}
                          </Col>
                        </Row>
                        
                      </div>
                      <div className="flexbox-container" style={{cursor: "pointer"}} onClick={() => { navigate(`/matchdetails/${d.matchID}`)}}>
                        <Col className="flexbox-container">
                          <div className="w-15 p-2">
                            <img src={`${d.homeLogo}`} height={50} width={50}/>
                          </div>
                          <div className="w-20 p-2" style={{fontSize: "25px"}}> {d.home} </div>
                          <div className="w-15 p-2" style={{fontSize: "25px"}}> {d.hGoal} </div>
                        </Col>

                        <div className="w-15 p-3"> - </div>

                        <Col className="flexbox-container">
                          <div className="w-15 p-2" style={{fontSize: "25px"}}> {d.vGoal} </div>
                          <div className="w-20 p-2" style={{fontSize: "25px"}}> {d.visitor} </div>
                          <div className="w-15 p-2">
                            <img src={`${d.visitorLogo}`} height={50} width={50}/>
                          </div>
                        </Col>
                      
                      </div>
                      <div style={{fontSize: "15px"}}>
                        Referee: {d.referee}
                      </div>
                    
                    </Card>
                  </div>
                );
              }
              else {
                return (
                  <div key={index}>
                    <Card className="fixture-card">
                      <div style={{ position: 'relative', width: '100%' }} className="flexbox-container row justify-content-center"> 
                        <Row className="justify-content-between w-100">
                          <Col style={{padding: "16px"}} className="d-flex p-0 justify-content-center offset-4" lg={4}>
                            <p style={{marginLeft: "16px", marginBottom: "0px", fontSize: "20px"}}>
                              {tempTime}
                            </p>  
                          </Col>
                          <Col className="d-flex p-0 justify-content-end align-self-end" lg={4}>
                            {userInfo && userInfo.isAdmin && ( 
                              <> 
                                <Dropdown>
                                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleShow}>
                                      {" "}
                                      Change the time of the match{" "} 
                                            
                                    </Dropdown.Item>
                                        <Modal show={show} onHide={handleClose}>
                                        
                                          <Modal.Header closeButton>
                                            <Modal.Title>Choose another day and time for the match</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>Please enter the new date and the time in the form of 
                                            (YYYY-MM-DD HH:MM:SS):
                                              <Form onSubmit={handleSubmitForEdit}>
                                                  <div key={`default-radio`} className="mb-3"> 
                                                    <Form.Group controlId= "getSelectionForUpdateWeek">
                                                        <Form.Control
                                                          type="input"
                                                          value={selectedDate}
                                                          placeholder="Enter the new date (YYYY-MM-DD HH:MM:SS)"
                                                          onChange={(e) => setSelectedDate(e.target.value)}
                                                        />
                                                    </Form.Group>   
                                                  </div>
                                                  <Button variant="primary" type="submit" onClick = {() => setMatchId(d.matchID) }>
                                                    Save Changes
                                                  </Button>
                                                </Form>
                                          </Modal.Body>
                                        </Modal>
                                    <Dropdown.Item onClick= {() => doDelay(d.matchID)} >
                                      {" "}
                                      Postpone match to a later date
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </>)}
                          </Col>
                        </Row>
                        
                      </div>
                      <div className="flexbox-container" style={{cursor: "pointer"}} onClick={() => { navigate(`/matchdetails/${d.matchID}`)}}>
                        <Col className="flexbox-container">
                          <div className="w-15 p-2">
                            <img src={`${d.homeLogo}`} height={50} width={50}/>
                          </div>
                          <div className="w-20 p-2" style={{fontSize: "25px"}}> {d.home} </div>
                          <div className="w-15 p-2" style={{fontSize: "25px"}}> {d.hGoal} </div>
                        </Col>

                        <div className="w-15 p-3"> - </div>

                        <Col className="flexbox-container">
                          <div className="w-15 p-2" style={{fontSize: "25px"}}> {d.vGoal} </div>
                          <div className="w-20 p-2" style={{fontSize: "25px"}}> {d.visitor} </div>
                          <div className="w-15 p-2">
                            <img src={`${d.visitorLogo}`} height={50} width={50}/>
                          </div>
                        </Col>
                      
                      </div>
                      <div style={{fontSize: "15px"}}>
                        Referee: {d.referee}
                      </div>
                    </Card>
                  </div>
                );
              }
            })}
          </ul>
        </>
      )}
    </MainScreen>
  );
}
export default FixturePage;
