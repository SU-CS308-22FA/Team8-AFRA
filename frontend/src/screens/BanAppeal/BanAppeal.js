import React, { useState } from "react";
import { Form, Button, Dropdown, DropdownButton, Col,Card, Row, Table, Container, Accordion,} from "react-bootstrap";
import {GoogleLogin} from "react-google-login";
import axios from "axios";
import "../CalendarPage/CalendarPage.css";
import { useSelector} from "react-redux";
import {useLocation} from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage";
import "./BanAppeal.css"
import hammer from "./hammer.png"

function BanAppealPage() {
  const [email, setEmail] = useState("");
  const [message, setMesage] = useState();
  const [check, setCheck] = useState(false);
  const [explaination, setExplaination] = useState("");

const submitHandler = (e) => {
  e.preventDefault();
  if (!check)
    setMesage("Please read the guidelines first!")
  else if (!explaination)
     setMesage("Your explaination is empty, please type something!")
  else if(!email)
    setMesage("Enter your email!")
  else {
    axios.post(`${process.env.REACT_APP_URL}/api/appeal/send`, {email, explaination}).then(res => { 
      setMesage(res.data)
    }).catch(err => {console.log(err)
      setMesage(err)
    })
  }
};

const handleCheck = (event) => {
  setCheck(check=> !check);
}


  return (
<div>
    <Row>
        <Col className="colOne">
           <h2 className="unbantitle"> UNBAN APPEAL </h2>
           <h4>Fill out the form below to request for an unban.</h4>
           <Container>
    {message && (
                <ErrorMessage variant="info">
                  {message}
                </ErrorMessage>
              )}
    <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Why should we unban you?</Form.Label>
            <Form.Control
              as="textarea"
              value={explaination}
              placeholder="Explain..."
              onChange={(e) => setExplaination(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label><b>I have read and understand the guidelines </b></Form.Label>
            <Form.Check  style={{marginLeft: "10px", marginTop: "5px"}}
            inline
            onChange={handleCheck}
          />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
    </Container>
        </Col>
        <Col className="colTwo">
          <Container>
          <h4  style={{ fontWeight: "bold"}}>Please read the community guidelines first.</h4>
       
      <Accordion defaultActiveKey="1">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} 
              variant="text" eventKey="0" className="fancy">
              AFRA Guidelines
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
            <b style={{color: "green"}}>Guidelines:</b><br/>
            <ul>Treat others online as you would treat them in real life</ul>
            <ul>Be tolerant towards other’s viewpoints; respectfully disagree when opinions do not align</ul>
            <ul>Respect the privacy and personal information of other users</ul>
            <ul>Communicate with courtesy and respect</ul>

            <b style={{color: "red"}}>Please do NOT:</b> <br/>
            <ul>Make personal attacks on other community members</ul>
            <ul>Use defamatory remarks or make false statements against others</ul>
            <ul>Post prejudiced comments or profanity</ul>
            <ul>Bully or make inflammatory remarks to other community members</ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <img src={hammer} className="img"/>
        
          </Container>
       
        </Col>
      </Row>
      
   
</div>
     
  )
}
export default BanAppealPage;
