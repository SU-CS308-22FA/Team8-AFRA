import "./Faq.css"
import React, {useEffect, useState } from "react";
import { Form, Button, Row, Col, RadioGroup, Accordion, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaQuestion, FaFutbol, FaTrashAlt } from "react-icons/fa";
import saul from "./saul.png"
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";

function FaqScreen() {
  const [data, setData] = useState([]);
  const [changed, setChanged] = useState(0);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/faq`).then(res => { 
        setData(res.data) 
      }).catch(err => {
        setData(err)
      })
  }, [changed]);

  const deleteFaq =(e, d)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_URL}/api/faq/delete`, {id: d._id}).then(res => { 
        setChanged((c) => c + 1)
        setMessage(res.data)
    }).catch(err => {console.log(err)
      })
  }

  const addFaq =(e, d)=>{
    e.preventDefault();
    if(!question || !answer)
    {
        setMessage("Fields cannot be empty.")
    }
    else{
        axios.post(`${process.env.REACT_APP_URL}/api/faq/add`, {question, answer}).then(res => { 
            setChanged((c) => c + 1)
            setMessage(res.data)
        }).catch(err => {console.log(err)
          })
    }
  }

  return (
    <div>
    <Row> 
        <Col>
        <br></br>
        <h2 className="faq" > Do You Have Questions?</h2>
        <h3 className="ex">We have answers to most of them! </h3>
        <h3 className="ex">Below you will find answers as to what AFRA is and how everything works. </h3>
        <h3 className="ex">If you still cannot find the answer you're looking for, just <a href="mailto:afra.projet.308@gmail.com">Contact us!</a></h3>
        <div className="saul">
            <img src={saul} style={{height: "350px"}}></img>
        </div>
        </Col>
    </Row>
    <Row>
        <Col>
        <br></br>
        <h2 className="sub" > About AFRA</h2>
        <div>
         
        <h3 className="about"> <FaFutbol style={{marginRight: "10px"}}/> AFRA is a web application that is designed to facilitate the burden of TFF by reducing human error in assigning fixtures and referees. </h3>
        <h3 className="about"> <FaFutbol style={{marginRight: "10px"}}/> It also incorporates a user friendly design and has a simple structured interface. </h3>
        <h3 className="about"> <FaFutbol style={{marginRight: "10px"}}/> We added all the features users look for and more for the best user experience. </h3>
        <h3 className="about"> <FaFutbol style={{marginRight: "10px"}}/> That way the users can find everything they wish for and more, in a single webpage.</h3>
        </div>
        </Col>
    <Col>
    <br></br>
    <h2 className="sub" > Frequently Asked Questions (FAQ)</h2>
      <div className="loginContainer">
        {data.map((d, i)=> { return(
             <Accordion defaultActiveKey="1" >
             <Card className="notcard">
               <Card.Header style={{backgroundColor: "#BAD7E9", padding: "0 0"}} className="faq">
               <span>
                 <Accordion.Toggle as={Card.Header} style={{fontSize:"17px", textAlign: "left"}}
                   variant="text" eventKey="0">
                   <b className="question">{i+1}) <wbr></wbr>{d.question} </b>
                 </Accordion.Toggle>
                 </span>
               </Card.Header>
               <Accordion.Collapse eventKey="0">
                 <Card.Body>
                   <h5 style={{fontSize:"18px", textAlign: "left", fontWeight: "500", color: "black"}}>{d.answer} 
                   {(userInfo.isAdmin) && ( 
                    <Button type="submit" style={{float: 'right'}} onClick={(e) =>deleteFaq(e,d) }>
                        Delete <FaTrashAlt/>
                    </Button>)} </h5>
                 </Card.Body>
               </Accordion.Collapse>
             </Card>
           </Accordion>
        )})}
      </div>
    </Col>
    
    </Row>
    {userInfo.isAdmin &&  <Row>
    <Col>
    <br></br>
    <h2 className="sub" >Add FAQ</h2>
      <div style={{ display: "flex",
                    flexDirection: "column",
                    margin: "10px 70px 10px 70px"}}>
        {message && <ErrorMessage variant="info">{message}</ErrorMessage>}
        <Form onSubmit={addFaq}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="question"
              value={question}
              placeholder="Enter question"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
      <Form.Group controlId="formBasic">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              as="textArea"
              value={answer}
              placeholder="Enter the Answer"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Col>
    </Row>}
   
    </div>
  );
}

export default FaqScreen;

