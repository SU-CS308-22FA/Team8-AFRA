import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, RadioGroup, Accordion, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { FaStar, FaTrashAlt, FaCircle } from "react-icons/fa";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import axios from "axios";


function NotificationScreen() {
    const [data, setData] = useState([]);
    const [changed, setChanged] = useState(0);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [unread, setUnread] = useState();
  
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/users/getnotifications`).then(res => { 
        setData(res.data.reverse()) 
        console.log(data)
      }).catch(err => {
        setData(err)
      })
    if(changed === 0){
        axios.post(`${process.env.REACT_APP_URL}/api/users/getunseen`, {id: userInfo._id}).then(res => { 
            console.log("this is unseen" + res.data)
            setUnread(res.data)
         }).catch(err => {console.log(err)
           })
    }
    console.log("this is changed: " + changed)
    console.log("this is unread: " + unread)
    if(changed == unread)
    {
        localStorage.removeItem("notification")
        console.log("cleared local storage")
    }  
  }, [changed]);

  const setSeen =(e, d)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_URL}/api/users/setseen`, {id: d._id, user: userInfo._id}).then(res => { 
        if(res.data === "seen")
          setChanged((c) => c + 1)
    }).catch(err => {console.log(err)
      })
  }

  const closeNotification =(e, d)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_URL}/api/admin/closeNot`, {id: d._id}).then(res => { 
        setChanged((c) => c + 1)
    }).catch(err => {console.log(err)
      })
  }

  return (
    <Row>
    <Col>
    <br></br>
    <h2 className="editTitle" > NOTIFICATIONS</h2>
      <div className="loginContainer">
        {!data && <Loading/>}
        {data && data.map((d)=> { return(
             <Accordion defaultActiveKey="1" >
             <Card className="notcard">
               <Card.Header >
                 <Accordion.Toggle as={Card.Header} onClick={(e)=> setSeen(e,d)}
                   variant="text" eventKey="0">
                   <span><b>{d.topic}</b>
                   {d.users.includes(userInfo._id) ? (<FaCircle color="grey"/>):(<FaCircle color="green"/>)}</span>
                   {(userInfo.isAdmin) && ( <Button type="submit" style={{float: 'right'}} onClick={(e) =>closeNotification(e,d) }>
                <FaTrashAlt/>
              </Button>)} 
                 </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey="0">
                 <Card.Body>
                   <h5 className="how">{d.text}</h5>
                 </Card.Body>
               </Accordion.Collapse>
             </Card>
           </Accordion>
        )})}
      </div>
    </Col>
    
    </Row>
  );
}

export default NotificationScreen;

