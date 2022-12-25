import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Table,Accordion, Card, Button, Form
} from "react-bootstrap";
import axios from "axios";
import {FaBan, FaRadiation} from "react-icons/fa";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import "./AdminBan.css"

function AdminBan() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [subMessage, setSubmessage] = useState("");
  const [changed, setChanged] = useState(0);
  const [load, setLoad] = useState(true);
  const [email, setEmail] = useState("");
  const [explaination, setExplaination] = useState("");


  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_URL}/api/admin`)
    .then((response) => {setData(response.data)
      setLoad(false);
    }).catch((err) => console.log(err) );
  }, [changed])

  const handleSelect = (eventKey, d, e) => {
    setLoad(true);
    e.preventDefault()
    if(eventKey === "ban"){
        axios.post(`${process.env.REACT_APP_URL}/api/admin/ban`, {user: d.user, comment: d.comment, report: d._id, cause: d.cause})
        .then(()=> { 
            setMessage("Succesfully banned and sent the notification email to = " + d.userEmail) 
            setChanged((c) => c + 1)})
        .catch((err)=> setMessage(err))
    }
    else{
        axios.post(`${process.env.REACT_APP_URL}/api/admin/false-report`, {reportedBy: d.reportedBy, report: d._id})
        .then(()=> { 
            setMessage("The report has been set as a false report -> made by = " + d.reportedByusername) 
            setChanged((c) => c + 1)})
        .catch((err)=> setMessage(err))
    }
  }

  const manualBan = (e) =>{
    e.preventDefault()
    if(!explaination)
      setSubmessage("Explain the cause")
    else if(!email)
    setSubmessage("Enter the email")
    else{
      axios.post(`${process.env.REACT_APP_URL}/api/admin/manualban`, {email: email, cause: explaination})
    .then((res)=> { 
        setSubmessage(res.data) 
        setChanged((c) => c + 1)})
    .catch((err)=> setSubmessage(err))
    }
  }
  
  return (
    <div>
        <Row>
        <Col>
        <br></br>
           <h2 className="editTitle" > BAN THE USERS <FaBan style={{color: "red"}}/></h2>
        </Col>
      </Row>
      <Row style={{textAlign:'center'}}>
      {load && (
                <Loading/>
              )}
      {message && (
                <ErrorMessage variant="info">
                  {message}
                </ErrorMessage>
              )}
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead thead className="thead">
              <tr>
                <th>Reported User</th>
                <th>Reported By</th>
                <th>Cause</th>
                <th>Related Comment</th>
                <th>Report Date</th>
                <th>BAN/NOT</th>
              </tr>
            </thead>
            <tbody className= "tbody">
              {data.map((d) => {
                return (
                  <tr className= "tbody">
                    <td>{d.userEmail}</td>
                    <td>{d.reportedByusername}</td>
                    <td>{d.cause}</td>
                    <td>{d.commentContent}</td>
                    <td>{d.date.split("T")[0]}</td>
                    <td>  {" "}
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Ban or Not"
                        onSelect={(e,eventKey)=> {handleSelect(e,d,eventKey)}}
                      >
                        <Dropdown.Item
                          eventKey={"ban"}
                        >
                          BAN
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={"not"}
                        >
                          DO NOT BAN
                        </Dropdown.Item>
                      </DropdownButton> 
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
        <Accordion defaultActiveKey="1">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} 
              variant="text" eventKey="0" className="manual">
              How Does It Work?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <h5 className="how">Banning the user removes the related comment and sends an email with the ban cause to the user.</h5>
              <h5 className="how">Not banning sets a false report count for the reporter.</h5>
              <h5 className="how">If a user made more than 3 false reports they get banned for false reporting.</h5>
              <h5 className="how">You can also manually ban a user.</h5>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      </Col>
      <Col>
        <Accordion defaultActiveKey="1">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} 
              variant="text" eventKey="0" className="manual">
              Manually Ban the Users  <FaRadiation style={{marginLeft:"10px", marginBottom: "4px"}}></FaRadiation>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {subMessage && (
                <ErrorMessage variant="info">
                  {subMessage}
                </ErrorMessage>
              )}
            <Form onSubmit={manualBan}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email of the user</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Why are you banning this user?</Form.Label>
            <Form.Control
              as="textarea"
              value={explaination}
              placeholder="Explain..."
              onChange={(e) => setExplaination(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            BAN
          </Button>
        </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      </Col>
      </Row>
    </div>
  );
}
export default AdminBan;
