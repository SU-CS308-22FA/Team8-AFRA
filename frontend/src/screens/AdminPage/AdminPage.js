import React, { useState } from "react";
import { Card, Dropdown, DropdownButton, Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
function AdminPage() {
  const [seasondata, setSeasonData] = useState([]);
  const [requestdata, setRequestData] = useState([]);
  const [seasonVar, setSeasonVar] = useState();
  const [message, setMessage] = useState();

  const handleSelectSeason=(e)=>{
    setSeasonVar(e);
  }

  const submitSeasonHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(process.env.REACT_APP_URL);
    try {
      const { seasondata } = await axios.post(
        `${process.env.REACT_APP_URL}/api/matches`,
        {
          seasonVar,
        }
      );
      setMessage("Uploaded successfully");
    } catch (error) {
      setMessage("Cannot Uploaded");
    }

    console.log(message);
  };

  const submitRequestHandler = async (e) => {
    console.log("submitted");
    
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { requestdata } = await axios.get(`${process.env.REACT_APP_URL}/api/requests`);
      console.log(requestdata);
    } catch (error) {}

  };

  return (

    <div>
      <Row>
        <Col>
        <Card.Body>
          <Card.Title>GET REQUESTS</Card.Title>
          <Card.Text> To see the current requests press Get Requests </Card.Text>
          <Form onSubmit={submitRequestHandler} className="getSubmit">
            <Button variant="primary" type="submit"> Get Requests </Button>
          </Form>
        </Card.Body>
        <Table responsive>
          <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>License</th>
            <th>Accept/Reject</th>
        </tr>
      </thead>
      <tbody>
        {requestdata.map(requestdata=>{
          return(
          <tr>
            <td>{requestdata.name}</td>
            <td>{requestdata.username}</td>
            <td>{requestdata.email}</td>
            <td>{requestdata.license}</td>
          </tr>
          )
        }
        )}
      </tbody>
      </Table>
      </Col>
      
      <Col>
      <Card.Body>
        <Card.Title>GET SEASON TO UPLOAD IT TO DATABASE</Card.Title>
        <Card.Text> To get the season enter a year</Card.Text>
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
          <Form onSubmit={submitSeasonHandler} className="getSubmit">
            <Button variant="primary" type="submit"> Get Season </Button>
          </Form>
          </Card.Body></Col>
      </Row>
      
    </div>
  );
}
export default AdminPage;