import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, RadioGroup } from "react-bootstrap";
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
  const [notTopic, setnotTopic] = useState("");
  const [catagory, setCat] = useState("update");
  const [notText, setnotText] = useState("");
  const [message, setMessage] = useState("");
  const [notMessage, setnotMessage] = useState("");
  
  useEffect(() => {
 
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setnotMessage(null);
    if(!text || !topic)
    {
      setMessage("Fields cannot be empty.")
    }
    else{
      axios.post(`${process.env.REACT_APP_URL}/api/admin/mail`, {topic, text}).then(res => { 
        setMessage(res.data)
      }).catch(err => {console.log(err)
        setMessage(err)
      })
    }
  };

  const submitNot = (e) => {
    e.preventDefault();
    setMessage(null);
    if(!notText || !notTopic)
    {
      setnotMessage("Fields cannot be empty.")
    }
    else{
      axios.post(`${process.env.REACT_APP_URL}/api/admin/sendNot`, {topic: notTopic, text: notText, catagory: catagory}).then(res => { 
        setnotMessage("Notification for: " + catagory + " has been sent!")
      }).catch(err => {console.log(err)
        setnotMessage(err)
      })
    }
  };

  const handleRadio = (e) => {
    setCat(e.target.value);
  };
  return (
    <Row>
    <Col>
    <br></br>
    <h2 className="editTitle" > SEND EMAILS</h2>
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
    </Col>
    <Col>
    <br></br>
    <h2 className="editTitle" > SEND NOTIFICATION</h2>
      <div className="loginContainer">
        {notMessage && <ErrorMessage variant="info">{notMessage}</ErrorMessage>}
        <Form onSubmit={submitNot}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type="text"
              value={notTopic}
              placeholder="Enter topic"
              onChange={(e) => setnotTopic(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="kind">
          <Form.Label>Catagory</Form.Label>
          <br></br>
        <Form.Check
          inline
          value="update"
          type="radio"
          aria-label="radio 1"
          label="Update"
          onChange={handleRadio}
          checked={catagory === "update"}
        />
        <Form.Check
          inline
          value="maintenance"
          type="radio"
          aria-label="radio 2"
          label="Maintenance"
          onChange={handleRadio}
          checked={catagory === "maintenance"}
        />
        <Form.Check
          inline
          value="news"
          type="radio"
          aria-label="radio 2"
          label="News"
          onChange={handleRadio}
          checked={catagory === "news"}
        />
        <Form.Check
          inline
          value="other"
          type="radio"
          aria-label="radio 2"
          label="Other"
          onChange={handleRadio}
          checked={catagory === "other"}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textArea"
              value={notText}
              placeholder="Text"
              onChange={(e) => setnotText(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Col>
    </Row>
  );
}

export default MailScreen;

