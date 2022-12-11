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

function AdminBan() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [changed, setChanged] = useState(0);

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_URL}/api/admin`)
    .then((response) => setData(response.data)).catch((err) => console.log(err) );
  }, [changed])

  const handleSelect = (eventKey, d, e) => {
   
    e.preventDefault()
    if(eventKey === "ban"){
        axios.post(`${process.env.REACT_APP_URL}/api/admin/ban`, {user: d.user, comment: d.comment, report: d._id, cause: d.cause})
        .then(()=> { 
            setMessage("Succesfully banned and sent the notfication email to = " + d.userEmail) 
            setChanged((c) => c + 1)})
        .catch((err)=> console.log(err))
    }
    else{
        axios.post(`${process.env.REACT_APP_URL}/api/admin/false-report`, {reportedBy: d.reportedBy, report: d._id})
        .then(()=> { 
            setMessage("The report has been set as a false report -> made by = " + d.reportedByusername) 
            setChanged((c) => c + 1)})
        .catch((err)=> console.log(err))
    }
  }

  return (
    <div>
        <Row>
        <Col>
        <br></br>
           <h2 className="caltitle" > Here are the reports </h2>
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
                <th>Email of reported user</th>
                <th>Reported By</th>
                <th>Report Cause</th>
                <th>Related Comment</th>
                <th>Report Date</th>
                <th>Ban ?</th>
              </tr>
            </thead>
            <tbody className= "tbo">
              {data.map((d) => {
                return (
                  <tr>
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
    </div>
  );
}
export default AdminBan;
