import React, { useEffect,useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction, listComments,updateLikeAction, } from "../../actions/commentsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";



import Dropdown from 'react-bootstrap/Dropdown';
import {FaHeart,FaRegHeart,FaRegUserCircle} from 'react-icons/fa';
import { BsXCircleFill,BsXCircle } from "react-icons/bs";




function MyComments({ history, search }) {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.commentList);
  const { loading, error, comments } = commentList;
  //const filteredComments = comments.filter((comment) =>
  //   comment.title.toLowerCase().includes(search.toLowerCase())
   //);
   //const [tempcomments,setComments] = useState(comments);
   //const [sorted, setSorted] = useState({sorted: "_id", reversed: false});

   console.log(comments);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const commentDelete = useSelector((state) => state.commentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = commentDelete;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: successCreate } = commentCreate;

  const commentUpdate = useSelector((state) => state.commentUpdate);
  const { success: successUpdate } = commentUpdate;

  
  

  useEffect(() => {
    dispatch(listComments(0));
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,

  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCommentAction(id));
    }
  };


  const likeHandler = async(id,title, content,likes) => {
  
    await dispatch(updateLikeAction(id,title, content,likes));
    window.location.reload();
 
  }
  
  return (
    <MainScreen title={`Welcome To Match Details Page ${userInfo && userInfo.name}`} >
      {console.log(comments)}
      <Link to="/createcomment">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Comments
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {comments &&
        comments
          .filter((filteredComment) =>
            filteredComment.content.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((comment) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={comment._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {comment.title}
                    </Accordion.Toggle>
                  </span>
                  {comment.user===userInfo._id ? (
                    <div>
                    <Button href={`/comment/${comment._id}`}>Edit</Button>
                      <Button
                        variant={comment.user===userInfo._id ? "danger" :"secondary"}
                        className="mx-2"
                        disabled= {comment.user!==userInfo._id ? "disabled" :null}
                        onClick = {() => comment.user===userInfo._id ? deleteHandler(comment._id) : null }
                        //onClick={() => deleteHandler(comment._id)}
                      >
                        Delete <BsXCircle/>
                      </Button>
                    </div>
                  ) :  <></>
                  }
                  <div>
                    <Button
                        variant={comment.usersThatLikedTheComment.includes(userInfo.username)==false ? "secondary" : "danger"}
                        className="mx-2"
                        value="Like"
                        disabled= {comment.user===userInfo._id ? "disabled" :null}
                        onClick = {() => likeHandler(comment._id,comment.title,comment.content,comment.likes) }
                      >
                        {comment.usersThatLikedTheComment.includes(userInfo.username)==false ? < FaRegHeart/> : < FaHeart/>} {comment.likes}
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        <FaRegUserCircle/>{comment.username}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{comment.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {comment.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
         
    </MainScreen>
  );
}

export default MyComments;
