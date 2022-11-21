import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
function AdminPage() {
  const [seasonVar, setSeasonVar] = useState("2021");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(process.env.REACT_APP_URL);
    try {
      const { data } = await axios.post(
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

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Season</Form.Label>
          <Form.Control
            value={seasonVar}
            onChange={(e) => setSeasonVar(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>{message}</div>
    </div>
  );
}

export default AdminPage;
