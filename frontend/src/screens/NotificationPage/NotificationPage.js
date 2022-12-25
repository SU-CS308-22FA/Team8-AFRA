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
               <span>
                 <Accordion.Toggle as={Card.Header} onClick={(e)=> setSeen(e,d)}
                   variant="text" eventKey="0">
                   {d.users.includes(userInfo._id) ? (<FaCircle color="grey" style={{marginRight: "10px"}}/>):(<FaCircle color="green" style={{marginRight: "10px"}}/>)}
                   <b>{d.topic}</b>
                   {d.category === "other" && <div style={{float: "right"}}><b style={{textAlign: "right",  backgroundColor:"#9EA1D4", padding:"5px 5px", borderRadius: "15px"}}>{d.category}</b></div>}
                   {d.category === "update" && <div style={{float: "right"}}><b style={{textAlign: "right",  backgroundColor:"#A8D1D1", padding:"5px 5px", borderRadius: "15px"}}>{d.category}</b></div>}
                   {d.category === "maintenance" && <div style={{float: "right"}}><b style={{textAlign: "right",  backgroundColor:"#FAAB78", padding:"5px 5px", borderRadius: "15px"}}>{d.category}</b></div>}
                   {d.category === "news" && <div style={{float: "right"}}><b style={{textAlign: "right",  backgroundColor:"#ABD9FF", padding:"5px 5px", borderRadius: "15px"}}>{d.category}</b></div>}
                 </Accordion.Toggle>
                 </span>
               </Card.Header>
               <Accordion.Collapse eventKey="0">
                 <Card.Body>
                   <h5 className="how">{d.text}
                   {(userInfo.isAdmin) && ( 
                    <Button type="submit" style={{float: 'right'}} onClick={(e) =>closeNotification(e,d) }>
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
  );
}

export default NotificationScreen;

