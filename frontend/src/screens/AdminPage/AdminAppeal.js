import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import "./AdminBan.css"

function AdminAppeal() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [changed, setChanged] = useState(0);

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_URL}/api/appeal`)
    .then((response) => setData(response.data)).catch((err) => console.log(err) );
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

  return (
    <div>
        <Row>
        <Col>
        <br></br>
           <h2 className="caltitle" > APPEAL REQUESTS </h2>
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
                  <tr>
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
    </div>
  );
}
export default AdminAppeal;
