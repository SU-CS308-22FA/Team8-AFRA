import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import axios from "axios";


function MailScreen() {
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  
  
  useEffect(() => {
 
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_URL}/api/admin/mail`, {topic, text}).then(res => { 
        setMessage(res.data)
      }).catch(err => {console.log(err)
        setMessage(err)
      })
  };

  return (
    <MainScreen title="Send Mails">
      <div className="loginContainer">
        {message && <ErrorMessage variant="info">{message}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type="text"
              value={topic}
              placeholder="Enter topic"
              onChange={(e) => setTopic(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textArea"
              value={text}
              placeholder="Text"
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        
      </div>
    </MainScreen>
    
  );
}

export default MailScreen;

