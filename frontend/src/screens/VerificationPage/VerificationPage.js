import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import {updateProfile,sendOTPmail,verifyOTPmail} from "../../actions/userActions";
import axios from 'axios'

const VerificationPage = ({ location, history }) => {
   const pass="";
    const [selectedFile, setSelectedFile] = useState();
    const [passOfOTP, SetPassOfOTP] = useState(pass);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;
    let verified="";

    if(userInfo.verified)
        verified = "Verified"
    else
        verified = "Not verified yet!"
    
    useEffect(() => {
      if (!userInfo) {
        history.push("/");
      } else {
      }
    }, [history, userInfo]);
    
  
    const submitHandler = (e) => {
      e.preventDefault();
      console.log("Licence Form Submitted")

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
                }
            })  
        }
    else
        alert("You need to add a FILE");
    };
  
    const emailHandler = (e) => {
      e.preventDefault();
      
    };
  
    const sendOTPmessage = async ()=>{
      dispatch(sendOTPmail(userInfo));
    }

    const verifyOTPmessage =  (e)=>{
      e.preventDefault();
      //await dispatch(verifyOTPmail(otp));
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const userId=userInfo._id;
      axios.post(`${process.env.REACT_APP_URL}/api/users/verifyotp`, {userId: userId,otp :passOfOTP}).then(response=>{
        console.log(response.data);
        if(response.data==="VERIFIED"){
          console.log("verification done")
          let verified=true;
          let _id= userInfo._id;
          dispatch(updateProfile({_id,verified}))
        }
        
      }).catch((err)=>{
        console.log(err);
      })
    
      //window.location.reload();
    }



    
    return (
      <MainScreen title="VERIFY YOUR ACCOUNT">
        <div>
          <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={emailHandler}>
               <h2>Email Verification</h2>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Success!
                  </ErrorMessage>
                )}
                <img src={userInfo.pic} alt={userInfo.name} className="profilePic" />
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <br></br>
                <h5> This is your current email address:   <b>{userInfo.email}</b> </h5>
                <br></br>
                <h5> Status:   <b>{userInfo.role}</b> </h5>
                <br></br>
            
                <h5> Your account is:   <b>{userInfo.verified===true? "verified": "Not verified yet!"}</b> </h5>
                {userInfo.verified===false ? (
                  <Form onSubmit={emailHandler}>
                  <Button type="submit" varient="primary" onClick={()=> sendOTPmessage()}>
                  Send a verification email
                </Button>
                <Form.Group controlId="passOfUser">
                <Form.Label>Enter One Time Password </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter One Time Password"
                  value={passOfOTP}
                  onChange={(e) => SetPassOfOTP(e.target.value)}
                ></Form.Control>
                </Form.Group>
                
                <Button type="submit" varient="primary" onClick={verifyOTPmessage}>
                Check OTP
              </Button>
              </Form>
                ) : <></>}
                
              </Form>
            </Col>

            <Col>
              <h2>Licence Verification</h2>
              <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Success!
                  </ErrorMessage>
                )}
                <Form.Group controlId="licence">
                <Form.Label>Upload Your Licence as a PDF</Form.Label>
                <Form.Control
                  type="file" 
                  id="file" 
                  name="file" 
                  accept="application/pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                ></Form.Control>
              </Form.Group>
              <Button type="submit">
                  Upload Licence
             </Button>
             </Form>
            </Col>
          </Row>
        </div>
      </MainScreen>
    );
  };
  
  export default VerificationPage;
  
