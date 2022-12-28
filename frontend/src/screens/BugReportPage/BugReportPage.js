import "./BugReportPage.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";

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

  const deleteBanReport = (e, d) => {
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
      <h1 className="sub">Report a Bug</h1>
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
    </div>
  );
}

export default BugReportPage;
