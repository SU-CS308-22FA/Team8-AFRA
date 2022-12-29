import React, { useState } from "react";
import {
  Card,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Table,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
function AdminPage() {
  const [requestdata, setRequestData] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [seasonVar, setSeasonVar] = useState(2022);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState();

  const handleSelectSeason = (e) => {
    setSeasonVar(e);
  };

  const handleSelectRole = (e) => {
    setRole(e);

    const myArray = role.split(",");
    const bob = {
      id: myArray[1],
      role: myArray[0],
    };
    axios
      .post(`${process.env.REACT_APP_URL}/api/requests/verify`, bob)
      .then((response) => window.location.reload());

    console.log(role);
  };

  const submitSeasonHandler = async (e) => {
    setMessage("");
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios
      .post(`${process.env.REACT_APP_URL}/api/matches`, { seasonVar })
      .then((response) => {
        setMessage(response.data);
      });
  };

  const submitRequestHandler = async (e) => {
    console.log("submitted");

    const newHead = [
      { date: "Request Date" },
      { name: "Name" },
      { licence: "License" },
      { userID: "User ID" },
      { acceptance: "Accept/Reject" },
    ];

    setHeadData(newHead);

    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { requestdata } = await axios
        .get(`${process.env.REACT_APP_URL}/api/requests`)
        .then((response) => setRequestData(response.data));
      console.log(requestdata);
    } catch (error) {}
  };

  return (
    <div>
      <Row>
        <Col>
          <Card.Body>
            <Card.Title>GET REQUESTS</Card.Title>
            <Card.Text>
              {" "}
              To see the current requests press Get Requests{" "}
            </Card.Text>
            <Form onSubmit={submitRequestHandler} className="getSubmit">
              <Button variant="primary" type="submit">
                {" "}
                Get Requests{" "}
              </Button>
            </Form>
          </Card.Body>
          <Table responsive>
            <thead>
              <tr>
                {headData.map((headData) => {
                  return (
                    <th>
                      <a>{headData.date}</a>
                      <a>{headData.name}</a>
                      <a>{headData.licence}</a>
                      <a>{headData.userID}</a>
                      <a>{headData.acceptance}</a>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {requestdata.map((requestdata) => {
                return (
                  <tr>
                    <td>{requestdata.date.split("T")[0]}</td>
                    <td>{requestdata.name}</td>
                    <td>
                      {" "}
                      <a href={requestdata.licence}>
                        Drive link of uploaded license
                      </a>{" "}
                    </td>
                    <td>{requestdata.user}</td>
                    <td>
                      {" "}
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Choose a role"
                        onSelect={handleSelectRole}
                      >
                        <Dropdown.Item
                          eventKey={"journalist" + "," + requestdata._id}
                        >
                          Accept as journalist
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={"referee" + "," + requestdata._id}
                        >
                          Accept as referee
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={"deny" + "," + requestdata._id}
                        >
                          Deny
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>

        <Col>
          <Card.Body>
            <Card.Title>GET SEASON TO UPLOAD IT TO DATABASE</Card.Title>
            <Card.Text> To get the season enter a year</Card.Text>
            <div className="dropdown">
              <DropdownButton
                id="dropdown-basic-button"
                title={seasonVar}
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
            <Form onSubmit={submitSeasonHandler} className="getSubmit">
              <Button variant="primary" type="submit">
                {" "}
                Get Season
              </Button>
            </Form>
            <h4 className="subsentencee"> {message} </h4>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
}
export default AdminPage;
