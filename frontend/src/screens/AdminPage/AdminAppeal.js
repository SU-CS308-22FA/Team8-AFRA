import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Table,
  Accordion, Card, Button
} from "react-bootstrap";
import axios from "axios";
import { FaBalanceScale } from "react-icons/fa";
import ErrorMessage from "../../components/ErrorMessage";
import "./AdminBan.css"

function AdminAppeal() {
  const [data, setData] = useState([]);
  const [banned, setBanned] = useState([]);
  const [submessage, setSubmessage] = useState("");
  const [message, setMessage] = useState("");
  const [changed, setChanged] = useState(0);

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_URL}/api/appeal`)
    .then((response) => {setData(response.data)
    }).catch((err) => console.log(err) );
  }, [changed])

  const handleSelect = (eventKey, d, e) => {
   
    e.preventDefault()
    if(eventKey === "accept"){
        axios.post(`${process.env.REACT_APP_URL}/api/appeal/accept`, {user: d.user})
        .then(()=> { 
            setMessage("Appeal accepted, notification email sent to = " + d.email) 
            setChanged((c) => c + 1)})
        .catch((err)=> console.log(err))
    }
    else{
        axios.post(`${process.env.REACT_APP_URL}/api/appeal/deny`, {explaination: d.explaination, user: d.user})
        .then(()=> { 
            setMessage("Appeal was not accepted, detailed email sent to " + d.email) 
            setChanged((c) => c + 1)})
        .catch((err)=> console.log(err))
    }
  }

  const manualUnban= (e, d) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_URL}/api/appeal/manualunban`, {user: d.user})
    .then((res)=> { 
        setSubmessage(res.data)
        listBan();
        setChanged((c) => c + 1)
      })
    .catch((err)=> setSubmessage(err))
  }

  const listBan = () => {
    axios.get(`${process.env.REACT_APP_URL}/api/appeal/list`)
    .then((res) => {setBanned(res.data)
    }).catch((err) => setSubmessage(err));
  }
  return (
    <div>
        <Row>
        <Col>
        <br></br>
           <h2 class="editTitle" > APPEAL REQUESTS <FaBalanceScale color="#db7029"></FaBalanceScale></h2>
        </Col>
      </Row>
      <Row style={{textAlign:'center'}}>
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
                <th>Email of the user</th>
                <th>Ban Cause</th>
                <th>Explaination</th>
                <th>Appeal Date</th>
                <th>Accept/Deny</th>
              </tr>
            </thead>
            <tbody className= "tbo">
              {data.map((d) => {
                return (
                  <tr className= "tbody">
                    <td>{d.email}</td>
                    <td>{d.cause}</td>
                    <td>{d.explaination}</td>
                    <td>{d.date.split("T")[0]}</td>
                    <td>  {" "}
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Accept or Deny"
                        onSelect={(e,eventKey)=> {handleSelect(e,d,eventKey)}}
                      >
                        <Dropdown.Item
                          eventKey={"accept"}
                        >
                          ACCEPT
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={"deny"}
                        >
                          DENY
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
              <h5 className="how">Accepting the appeal removes user ban, deletes him from the blacklist and sends an email as <b style={{color: "green"}}>"appeal accepted"</b></h5>
              <h5 className="how">Denying the appeal, notifies the user with an email explaining <b style={{color: "red"}}>"appeal denied"</b></h5>
              <h5 className="how">You can also see the blacklist directly and unban the users</h5>
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
              variant="text" eventKey="0" className="manual" onClick={listBan}>
              List All Banned Users
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
            {submessage && (
                <ErrorMessage variant="info">
                  {submessage}
                </ErrorMessage>
              )}
            <Table responsive>
            <thead className="subthead">
              <tr>
                <th>Email</th>
                <th>Cause</th>
                <th>UNBAN</th>
              </tr>
            </thead>
            <tbody className= "subtbody">
              {banned.map((d) => {
                return (
                  <tr className= "subtbody">
                    <td>{d.email}</td>
                    <td>{d.cause}</td>
                    <td> <Button onClick={(e) => manualUnban(e, d)}>UNBAN</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      </Col>
      </Row>
    </div>
  );
}
export default AdminAppeal;
