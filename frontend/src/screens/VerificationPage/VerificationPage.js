import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Accordion, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import {updateProfile,sendOTPmail,verifyOTPmail} from "../../actions/userActions";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./VerificationPage.css"

const VerificationPage = () => {
   const pass="";
    const [selectedFile, setSelectedFile] = useState();
    const [message, setMessage] = useState("");
    const [vermess, setVermess] = useState("");
    const [passOfOTP, SetPassOfOTP] = useState(pass);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
  
    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;
    let verified="";

    if(userInfo.verified)
        verified = "Verified"
    else
        verified = "Not verified yet!"
    
    useEffect(() => {
      if (!userInfo) {
        navigate("/")
      } else {
      }
    }, [userInfo]);
    
  
    const submitHandler = (e) => {
      e.preventDefault();
      console.log("Licence Form Submitted")
      setVermess(null)
      if(selectedFile)
        { 
            console.log(selectedFile.name);
            console.log(selectedFile.type);
            console.log(selectedFile.size);
            let formData = new FormData();
            formData.append("file", selectedFile);

            if(userInfo.licence)
              axios.post(`${process.env.REACT_APP_URL}/app/drivedelete`, userInfo)
            axios.post(`${process.env.REACT_APP_URL}/app/google-drive`, formData, { //push the file data
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.status === "No file uploaded.") 
                {
                    alert(response.data);
                }
                else //file is succesfully uploaded
                {    
                  console.log(response.data.id)
                  const licence = response.data.id;
                  dispatch(updateProfile({licence}))
                  setMessage("Licence Succesfully Uploaded!")
                }
            })  
        }
    else
      setMessage("Add a file first!")
    };
  
    const emailHandler = (e) => {
      e.preventDefault();
    };
  
    const sendOTPmessage = async (e)=>{
      e.preventDefault();
      setMessage(null);
      setVermess("Verification Code has been sent!") 
      dispatch(sendOTPmail(userInfo));
    }

    const verifyOTPmessage =  (e)=>{
      e.preventDefault();
      const userId=userInfo._id;
      axios.post(`${process.env.REACT_APP_URL}/api/users/verifyotp`, {userId: userId,otp :passOfOTP}).then(response=>{
        if(response.data==="Verification Completed"){
          let verified=true;
          let _id= userInfo._id;
          dispatch(updateProfile({_id,verified}))
        }
        setMessage(null);
        setVermess(response.data) 
      }).catch((err)=>{
         setVermess(err) 
      })
    }


    return (
      <MainScreen title="VERIFY YOUR ACCOUNT">
        <div>
          <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={emailHandler}>
               <h2>Email Verification</h2>
                {vermess && (
                  <ErrorMessage variant="info">
                    {vermess}
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <img src={userInfo.pic} alt={userInfo.name} className="profilePic" />
                <br></br>
                <h5 style={{textAlign: 'left', color:'#000000'}}> Current Email:   <b>{userInfo.email}</b> </h5>
                <br></br>
                <h5 style={{textAlign: 'left', color:'#000000'}}> Role: <b st>{userInfo.role}</b> </h5>
                <br></br>
            
                <h5 style={{textAlign: 'left', color:'#000000'}}> Status: <b>{userInfo.verified===true? <> Verified  &#9989;</> :<> not verified &#10060;</> }</b> </h5>
                {userInfo.verified===false ? (
          <Accordion>        
          <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} 
                  variant="primary" eventKey="0" onClick={sendOTPmessage}>
                  Send a verification email
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                <Form.Group controlId="passOfUser">
                          <Form.Label><b>Enter Verification Code </b></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="*******"
                            value={passOfOTP}
                            onChange={(e) => SetPassOfOTP(e.target.value)}
                          ></Form.Control>
                          </Form.Group>
                          
                          <Button type="submit" varient="primary" onClick={verifyOTPmessage}>
                          Check OTP
                        </Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
                ) : <></>}                
              </Form>
            </Col>
            <Col md={6}>
              <h2>Licence Verification</h2>
              <Form onSubmit={submitHandler}>
              {loading && <Loading />}
                {message && (
                  <ErrorMessage variant="info">
                    {message}
                  </ErrorMessage>
                )}
                <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} 
              variant="text" eventKey="0" className="fancy">
              Licence Guidelines
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
            <b style={{color: "#db7029"}}>For Referees</b><br/>
            <ul>Upload your referee card or your licence</ul>
            <ul>Your role will be switched as referee once the admins confirm your licence</ul>

            <b style={{color: "#db7029"}}>For Journalists</b> <br/>
            <ul>Upload your journalist certificate or your journalist id card</ul>
            <ul>Your role will be switched as a journalist once the admins confirm your licence</ul>
            Make sure the information is readable and is in PDF format.<br></br> <br></br>
            <Form.Group controlId="licence">
                <Form.Control className="btn-secondary"
                  type="file" 
                  id="file" 
                  name="file" 
                  accept="application/pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" style={{float: "right"}}>
                  Upload Licence
             </Button>
             <br></br> <br></br>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
             </Form>
            </Col>
          </Row>
        </div>
      </MainScreen>
    );
  };
  
  export default VerificationPage;
