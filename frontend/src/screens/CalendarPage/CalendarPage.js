import React, { useState } from "react";
import { Form, Button, Dropdown, DropdownButton, Col, Row, Table,} from "react-bootstrap";
import {GoogleLogin} from "react-google-login";
import axios from "axios";
import "./CalendarPage.css";
import {FaCalendar} from "react-icons/fa";
import { useSelector } from "react-redux";
import { gapi} from "gapi-script"
import ErrorMessage from "../../components/ErrorMessage";
import googleCAL from "./calendar.png"

function CalendarPage() {
  
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [signedIn, setSignedIn] = useState(false); //i like ugly and simple solutions
  const [data, setData] = useState([]);
  const [cal, setCal] = useState([]);
  const [message, setMesage] = useState();
  const [great, setGreat] = useState('#f5511d');
  const [team, setTeam] = useState();
  const [color, setColor] = useState();

  const config = {
      headers: {
        "Content-type": "application/json",
      },
  };

  const responseGoogle = response => {
    console.log(response);
    const {code} = response;
    axios.post(`${process.env.REACT_APP_URL}/api/calendar`, {code: code, user: userInfo}).then(res => {
      setSignedIn(true);
      alert("Succesfully Signed In!");
    }).catch(err => alert(err))
  }

const submitHandler = (e) => {
  e.preventDefault();
  if (cal.length === 0)
     setMesage("Your selection is empty, please select something")
  else if(window.confirm("The selected ones will be added to your calendar.")){
    axios.post(`${process.env.REACT_APP_URL}/api/calendar/create-event`, {userInfo: userInfo, cal: cal, color:color}).then(res => { 
      setMesage(res.data)
    }).catch(err => {console.log(err)
      setMesage("Failed to add to the calendar, error with calendar servers.")
    })
  }
};

const handleColor = (e, event) => {
  event.preventDefault();
  setColor(e);
  if (e ==="1")
    setGreat('#7986cb')
  else if (e==="2")
    setGreat('#33b679')
  else if (e==="3")
  setGreat('#8e24aa')
  else if (e==="4")
  setGreat('#e67c73')
  else if (e==="5")
  setGreat('#f6c026')
  else if(e==="6")
  setGreat('#f5511d')
  else if (e==="7")
  setGreat('#039be5')
  else if (e==="8")
  setGreat('#616161')
  else if (e==="9")
  setGreat('#3f51b5')
  else if(e==="10")
  setGreat('#0b8043')
  else if (e==="11")
  setGreat('#d60000')
}
const submitTeam = (e) => {
  e.preventDefault();
  if(!team)
    setMesage("Enter a team name!")
  else
  {
    setMesage(null)
      console.log("Team submitted here it is " + team)
    axios.get(`${process.env.REACT_APP_URL}/api/calendar/team`, { params: {
      team: team,
    },}).then(res =>
      setData(res.data)
    ).catch(err => setMesage("Enter a valid team"))
    console.log(data)
  }
};

const responseError = error => {
  console.log(error)
  alert("Sign In ERROR, Please try again!");
}

const handleCheck = (e) => {
  var updatedList = cal;
  if (e.target.checked) {
    updatedList.push(e.target.value);
  } else {
    updatedList.splice(cal.indexOf(e.target.value), 1);
  }
  setCal(updatedList);
  console.log(cal);
}
  return (
    <div>
      <Row>
        <Col className="calColOne">
           <h2 class="editTitle"> EDIT YOUR CALENDAR</h2>
           <h4 className="calText"> Hello {userInfo.name}, {!signedIn? <> to modify your calendar you need to authorize first &#9917;</> :<> select the events you want to add to your calendar <FaCalendar color={great}/></> } </h4>
           {!signedIn && (
                 <div class="google">
                    <GoogleLogin clientId="930549873699-q4im77aiuv2m72mqkup5nn8vf7puf2bt.apps.googleusercontent.com" 
                    buttontext="Sign in and Authorize Calendar" 
                    onSuccess= {responseGoogle}
                    onFailure= {responseError}
                    cookiePolicy= {'single_host_origin'}
                    responseType='code'
                    accessType="offline"
                    scope='openid email profile https://www.googleapis.com/auth/calendar'
                    /> </div>)}
        </Col>
        <a href="https://calendar.google.com/calendar/u/0/r" target="_blank"><img src={googleCAL} className="googleCAL"/></a>
      
      </Row>
      {
              signedIn &&
      <div>
      <Row>
        <Col className="calColThree">
        <h5 className="calExplanation">Enter the team name to list their matches</h5>
                <Form onSubmit={submitTeam}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="name"
                      value={team}
                      placeholder="Enter team"
                      onChange={(e) => setTeam(e.target.value)}
                    />
                  </Form.Group>
                <Button variant="primary" type="submit">
                  List Matches
                </Button>
              </Form>
        </Col>
        <Col>
        <br>
        </br>
          <div className="colorDrop">
                <DropdownButton 
                  id="dropdown-basic-button"
                  title="Pick event color"
                  onSelect={handleColor} >
                  <Dropdown.Item eventKey="1" style={{color: '#7986cb', fontWeight: 'bold'}}> &#9824; Lavender</Dropdown.Item>
                  <Dropdown.Item eventKey="2" style={{color: '#33b679', fontWeight: 'bold'}}> &#9824; Sage</Dropdown.Item>
                  <Dropdown.Item eventKey="3" style={{color: '#8e24aa', fontWeight: 'bold'}}> &#9824; Grape</Dropdown.Item>
                  <Dropdown.Item eventKey="4" style={{color: '#e67c73', fontWeight: 'bold'}}> &#9824; Flamingo</Dropdown.Item>
                  <Dropdown.Item eventKey="5" style={{color: '#f6c026', fontWeight: 'bold'}}> &#9824; Banana</Dropdown.Item>
                  <Dropdown.Item eventKey="6" style={{color: '#f5511d', fontWeight: 'bold'}}> &#9824; Tangerine</Dropdown.Item>
                  <Dropdown.Item eventKey="7" style={{color: '#039be5', fontWeight: 'bold'}}> &#9824; Peacock</Dropdown.Item>
                  <Dropdown.Item eventKey="8" style={{color: '#616161', fontWeight: 'bold'}}> &#9824; Graphite</Dropdown.Item>
                  <Dropdown.Item eventKey="9" style={{color: '#3f51b5', fontWeight: 'bold'}}> &#9824; Blueberry</Dropdown.Item>
                  <Dropdown.Item eventKey="10" style={{color: '#0b8043', fontWeight: 'bold'}}> &#9824; Basil</Dropdown.Item>
                  <Dropdown.Item eventKey="11" style={{color: '#d60000', fontWeight: 'bold'}}>&#9824; Tomato</Dropdown.Item>
                </DropdownButton>
              </div>
        </Col>
      </Row>
      <br></br>
      <br></br>
      {message && (
                <ErrorMessage variant="info">
                  {message}
                </ErrorMessage>
              )}
      <Table responsive>
            <thead className="theadCal">
              <tr>
                <th>DATE</th>
                <th>TIME</th>
                <th>HOME</th>
                <th>VISITOR</th>
                <th>DIVISION</th>
                <th>REFEREE</th>
                <th>ADD</th>
              </tr>
            </thead>
            <tbody >
              {data.map((d) => {
                return (
                  <tr className= "tbodyCal">
                    <td>{d.date.split("T")[0]}</td>
                    <td>{d.date.split("T")[1].split('.')[0]}</td>
                    <td>{d.home}</td>
                    <td>{d.visitor}</td>
                    <td>{d.division}</td>
                    <td>{d.referee || "Not yet assigned"}</td>
                    <td> <input value={d._id} type="checkbox" onChange={handleCheck} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Form onSubmit={submitHandler} className="getSubmit">
              <Button variant="primary" type="submit">
                {" "}
                Add To My Calendar{" "}
              </Button>
            </Form>
      </div>}
   </div>
  )
}
export default CalendarPage;
