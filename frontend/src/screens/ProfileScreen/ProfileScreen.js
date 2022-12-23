import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile, updateProfile, logout } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaRegCheckSquare, FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";
import axios from 'axios'

const ProfileScreen = ({ location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [match, setMatch] = useState("");
  const [username, setUsername] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setUsername(userInfo.username);
      setPic(userInfo.pic);
    }
  }, [userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("file", pics);
      data.append("upload_preset", "theafra");
      data.append("cloud_name", "theafra");
      fetch("https://api.cloudinary.com/v1_1/theafra/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url)
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMatch("Passwords do not match");
    } else {
      dispatch(updateProfile({ name, email, password, pic, username}));
      setMatch(null);
    }
  };

  const deleteHandler = (e) => {
    if (window.confirm("Are you sure?"))
    {
      dispatch(deleteProfile())
      console.log("profile deleted")

      dispatch(logout())
      console.log("logging out")
      navigate('/')

      axios.post(`${process.env.REACT_APP_URL}/app/drivedelete`, userInfo)
    }
  }
  
  const subscriptionHandler = (e) => {
    e.preventDefault();
    if (window.confirm("You are subscribing to AFRA emails, are you sure ?"))
    {
      axios.post(`${process.env.REACT_APP_URL}/api/users/subscribe`, {email: userInfo.email}).then(res => { 
        setMessage(res.data)
      }).catch(err => {console.log(err)
        setMessage(err)
      })
      dispatch(updateProfile({subscribed: true}));
    }
  }
  const unsubHandler = (e) => {
    e.preventDefault();
    if (window.confirm("You unsubscribing from AFRA emails, are you sure ?"))
    {
      axios.post(`${process.env.REACT_APP_URL}/api/users/unsubscribe`, {email: userInfo.email}).then(res => { 
        setMessage(res.data)
      }).catch(err => {console.log(err)
        setMessage(err)
      })
      dispatch(updateProfile({subscribed: false}));
    }
  }

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {match && <ErrorMessage variant="danger">{match}</ErrorMessage>}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>
              <Button type="submit" varient="primary">
                Update
              </Button>
  
              <Button type="submit" style={{float: 'right'}} onClick={() => deleteHandler() }>
                <FaTrashAlt/>
              </Button>
              
            </Form>
          </Col>
          <Col>
           <Container className="picCon">
           {message && (
                <ErrorMessage variant="info">
                  {message}
                </ErrorMessage>
              )}
            <img src={pic} alt={name} className="profilePic" />
            {!userInfo.subscribed && <div> 
          <Button type="submit" onClick={(e) => subscriptionHandler(e) }>
                <FaEnvelopeOpen></FaEnvelopeOpen> &#8205; Subsribe to AFRA emails
           </Button></div>}
           {userInfo.subscribed && <div>
          <Button type="submit" onClick={(e) => unsubHandler(e) }>
          <FaEnvelopeOpen></FaEnvelopeOpen> &#8205; Unsubscribe from AFRA emails
           </Button></div>}
           <br></br>
           <Link to="/verification">
                <Button>
                Verify Your Account &#8205;  <FaRegCheckSquare/>
                </Button>
            </Link>
            </Container>
          </Col>
        </Row>
        <Row> 
          
           
        </Row>
       
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
