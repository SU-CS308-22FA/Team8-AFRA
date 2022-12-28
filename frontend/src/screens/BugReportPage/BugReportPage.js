import "./BugReportPage.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  Button,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import { FaRegSmile, FaSpider, FaTrashAlt } from "react-icons/fa";
import whatswrong from "./what_is_wrong.jpg";

function BugReportPage() {
  const [data, setData] = useState([]);
  const [changed, setChanged] = useState(0);
  const [message, setMessage] = useState("");
  const [bugPage, setBugPage] = useState("");
  const [bugDetail, setBugDetail] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/bugreports`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setData(err);
      });
  }, [changed]);

  const deleteBugReport = (e, d) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}/api/bugreports/delete`, {
        id: d._id,
        bugReportedUserEmail: d.bugReportedUserEmail,
      })
      .then((res) => {
        setChanged((c) => c + 1);
        setMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addBugReport = (e, d) => {
    e.preventDefault();
    if (!bugPage || !bugDetail) {
      setMessage("Fields cannot be empty.");
    } else {
      axios
        .post(`${process.env.REACT_APP_URL}/api/bugreports/add`, {
          bugPage: bugPage,
          bugDetail: bugDetail,
          bugReportedUserEmail: userInfo.email,
        })
        .then((res) => {
          setChanged((c) => c + 1);
          setMessage(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <br></br>
      <h1 className="sub">Report a Bug</h1>
      <div className="whatswrong">
        <img src={whatswrong} style={{ height: "150px" }}></img>
      </div>
      <div className="getBug">
        <Row>
          <Col>
            <div>
              <Row>
                <Col>
                  <br></br>
                  <h2> About Bug Reports</h2>
                  <div>
                    <h3 className="explain">
                      <FaSpider style={{ marginRight: "10px" }} /> As you report
                      a bug, admins will also be able to see it and inform the
                      software engineers to solve the bug.
                    </h3>
                    <h3 className="explain">
                      {" "}
                      <FaSpider style={{ marginRight: "10px" }} /> When the bug
                      is solved, admin will remark it as solved and you will
                      receive an email.
                    </h3>
                    <h3 className="explain">
                      {" "}
                      <FaSpider style={{ marginRight: "10px" }} /> Please
                      clearly explain the problem that you encounter.
                    </h3>
                    <h3 className="explain">
                      <FaSpider style={{ marginRight: "10px" }} /> Thank you for
                      your cooperation, we will try to solve it as much as
                      possible. <FaRegSmile />
                    </h3>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <br></br>
              <br></br>
              {message && <ErrorMessage variant="info">{message}</ErrorMessage>}
              <Form onSubmit={addBugReport}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>The page you found a bug</Form.Label>
                  <Form.Control
                    type="bug"
                    value={bugPage}
                    placeholder="Enter the page that you think there is an error"
                    onChange={(e) => setBugPage(e.target.value)}
                    style={{ width: "50%" }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasic">
                  <Form.Label>The detail of the bug</Form.Label>
                  <Form.Control
                    as="textArea"
                    value={bugDetail}
                    placeholder="Please explain the bug"
                    onChange={(e) => setBugDetail(e.target.value)}
                    style={{ width: "50%" }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Report Bug <FaSpider />
                </Button>
              </Form>
            </div>
          </Col>

          <Col>
            <div className="loginContainer">
              <h2>Previously Reported Bugs (Not Solved Yet)</h2>
              {data.map((d) => {
                return (
                  <Accordion defaultActiveKey="1">
                    <Card>
                      <Card.Header
                        style={{ backgroundColor: "#71b8e3", padding: "0 0" }}
                        className="faq"
                      >
                        <span>
                          <Accordion.Toggle
                            as={Card.Header}
                            style={{ fontSize: "17px", textAlign: "left" }}
                            variant="text"
                            eventKey="0"
                          >
                            <b className="question">{d.bugPage} </b>
                          </Accordion.Toggle>
                        </span>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <h5
                            style={{
                              fontSize: "18px",
                              textAlign: "left",
                              fontWeight: "500",
                              color: "black",
                            }}
                          >
                            {d.bugDetail}
                            {userInfo && userInfo.isAdmin && (
                              <Button
                                type="submit"
                                style={{ float: "right" }}
                                onClick={(e) => deleteBugReport(e, d)}
                              >
                                Delete <FaTrashAlt />
                              </Button>
                            )}{" "}
                          </h5>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BugReportPage;
