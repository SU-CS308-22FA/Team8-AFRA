import React, { useState } from "react";
import { Form, Button, Dropdown, DropdownButton, Col, Row, Table,} from "react-bootstrap";
import {GoogleLogin} from "react-google-login";
import axios from "axios";
import "../CalendarPage/CalendarPage.css";
import { useSelector} from "react-redux";
import {useLocation} from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage";

function BanAppealPage() {
  const [email, setEmail] = useState("");
  const [message, setMesage] = useState();
  const [explaination, setExplaination] = useState("");

const submitHandler = (e) => {
  e.preventDefault();
  if (!message)
     setMesage("Your explaination is empty, please type something!")
  else {
    axios.post(`${process.env.REACT_APP_URL}/api/appeal/send`, {email, explaination}).then(res => { 
      setMesage(res.data)
    }).catch(err => {console.log(err)
      setMesage(err)
    })
  }
};


  return (
<div>
    <Row>
        <Col>
           <h2 class="caltitle"> Explain your reason to get unbanned... </h2>
        </Col>
      </Row>
    
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
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Why should we unban you?</Form.Label>
            <Form.Control
              type="textarea"
              value={explaination}
              placeholder="Explain..."
              onChange={(e) => setExplaination(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
</div>
     
  )
}
export default BanAppealPage;
