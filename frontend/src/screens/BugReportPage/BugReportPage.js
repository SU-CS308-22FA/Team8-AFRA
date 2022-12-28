import "./BugReportPage.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import { FaTrashAlt } from "react-icons/fa";
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
      .post(`${process.env.REACT_APP_URL}/api/bugreports/delete`, { id: d._id })
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

      <div>
        {message && <ErrorMessage variant="info">{message}</ErrorMessage>}
        <Form onSubmit={addBugReport}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>BugPage</Form.Label>
            <Form.Control
              type="question"
              value={bugPage}
              placeholder="Enter question"
              onChange={(e) => setBugPage(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasic">
            <Form.Label>BugDetail</Form.Label>
            <Form.Control
              as="textArea"
              value={bugDetail}
              placeholder="Enter the Answer"
              onChange={(e) => setBugDetail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="loginContainer">
        {data.map((d, i) => {
          return (
            <Accordion defaultActiveKey="1">
              <Card className="notcard">
                <Card.Header
                  style={{ backgroundColor: "#BAD7E9", padding: "0 0" }}
                  className="faq"
                >
                  <span>
                    <Accordion.Toggle
                      as={Card.Header}
                      style={{ fontSize: "17px", textAlign: "left" }}
                      variant="text"
                      eventKey="0"
                    >
                      <b className="question">
                        {i + 1}) <wbr></wbr>
                        {d.bugPage}{" "}
                      </b>
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
    </div>
  );
}

export default BugReportPage;
