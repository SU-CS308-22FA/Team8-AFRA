import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentAction,
  listComments,
  updateLikeAction,
  commentFiltered,
  listUserComments,
  listWordComments,
} from "../../actions/commentsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Dropdown from "react-bootstrap/Dropdown";
import {
  FaHeart,
  FaRegHeart,
  FaRegUserCircle,
  FaFontAwesomeFlag,
} from "react-icons/fa";
import { BsXCircle } from "react-icons/bs";
import "./Comments.css";
import axios from "axios";

const Comments = ({ matchID }) => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.commentList);
  const { loading, error, comments } = commentList;

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

  const sortByLike = async () => {
    dispatch(listComments(1));
  };
  const sortByDate = async () => {
    dispatch(listComments(2));
  };
  const sortByLikeReverse = async () => {
    dispatch(listComments(3));
  };
  const sortByDefault = async () => {
    dispatch(listComments(0));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCommentAction(id));
    }
  };

  const likeHandler = async (id, title, content, likes) => {
    await dispatch(updateLikeAction(id, title, content, likes));
    dispatch(listComments(0));
  };

  const [isFlagged, setFlagged] = useState(false);
  const [reporterId, setReporterId] = useState("");
  const [reportedId, setReportedId] = useState("");
  const [reportedComment, setReportedComment] = useState("");
  const [reportCause, setReportCause] = useState("");
  const flagHandler = async (reporterid, reportedid, reportedcommmentid, e) => {
    e.preventDefault();
    setReporterId(reporterid);
    setReportedId(reportedid);
    setReportedComment(reportedcommmentid);
    setFlagged(true);
  };

  const submitCauseHandler = (e) => {
    e.preventDefault();
    if (reportCause === "") alert("Please enter a report cause!");
    else {
      axios
        .post(`${process.env.REACT_APP_URL}/api/users/report`, {
          user: reportedId,
          reportedBy: reporterId,
          comment: reportedComment,
          cause: reportCause,
        })
        .then((res) => {
          alert(res.data);
          setFlagged(false);
        })
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    dispatch(listComments(0));
  }, [dispatch, userInfo, successDelete, successCreate, successUpdate]);

  const [filter, setFilter] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const searchByWord = async (word) => {
    dispatch(listWordComments(searchWord));
  };

  const searchByUser = async () => {
    dispatch(listUserComments(searchUser));
  };

  const filterComments = async () => {
    dispatch(commentFiltered(filter));
  };

  const submitWordHandler = (e) => {
    e.preventDefault();
    console.log(searchWord);
    if (searchWord === "") alert("Please enter a word to search in comments!");
    else searchByWord();
  };

  const submitUserHandler = (e) => {
    e.preventDefault();
    console.log(searchUser);
    if (searchUser === "")
      alert("Please enter a username to see their comments!");
    else searchByUser();
  };

  const handleCheck = (e) => {
    var updatedList = filter;
    if (e.target.checked) {
      updatedList.push(e.target.value);
    } else {
      updatedList.splice(filter.indexOf(e.target.value), 1);
    }
    setFilter(updatedList);
  };

  const submitFilterHandler = (e) => {
    e.preventDefault();
    if (filter.length === 0) alert("Please select at least 1 filter");
    else filterComments();
  };

  return (
    <div>
      <div>
        <Row>
          <Col>
            <Row className="filterSub">
              <h2 className="filterSub">
                Filter Comments & Search in Comments
              </h2>
            </Row>
            <Row>
              <p></p>
            </Row>
            <Row>
              <Table striped borderer hover>
                <thead>
                  <tr>
                    <th>Roles</th>
                    <th>Select Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Journalist Comments</th>
                    <td>
                      <input
                        value="journalist"
                        type="checkbox"
                        onChange={handleCheck}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Referee Comments</th>
                    <td>
                      <input
                        value="referee"
                        type="checkbox"
                        onChange={handleCheck}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>User Comments</th>
                    <td>
                      <input
                        value="user"
                        type="checkbox"
                        onChange={handleCheck}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <p></p>
            </Row>
            <Row>
              <Table striped borderer hover>
                <thead>
                  <tr>
                    <th>Like Counts</th>
                    <th>Select Like Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>5-9 Likes</th>
                    <td>
                      <input
                        value="fiveLikes"
                        type="checkbox"
                        onChange={handleCheck}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>More Than 10 Likes</th>
                    <td>
                      <input
                        value="tenLikes"
                        type="checkbox"
                        onChange={handleCheck}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row className="filterSubmit">
              <Col>
                <Form onSubmit={submitFilterHandler} className="getSubmit">
                  <Button variant="primary" type="submit">
                    Filter Comments
                  </Button>
                </Form>
              </Col>
              <Col>
                <Form onSubmit={sortByDefault} className="getSubmit">
                  <Button variant="primary" type="submit">
                    See Default Page
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <p></p>
            </Row>
            <Row className="sub3title">
              <h3 className="sub3title">**Search In Comments**</h3>
            </Row>
            <Row>
              <p></p>
            </Row>
            <Row className="filterSubmit">
              <Table>
                <thead>
                  <th>Search by Word</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Form onSubmit={submitWordHandler}>
                        <Form.Group controlId="comment">
                          <Form.Control
                            type="text"
                            placeholder="Enter a Word"
                            value={searchWord}
                            onChange={(d) => setSearchWord(d.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" varient="primary">
                          Search
                        </Button>
                      </Form>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <p></p>
            </Row>
            <Row className="filterSubmit">
              <Table>
                <thead>
                  <th>Search by User</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Form onSubmit={submitUserHandler}>
                        <Form.Group controlId="comment">
                          <Form.Control
                            type="text"
                            placeholder="Enter a username"
                            value={searchUser}
                            onChange={(d) => setSearchUser(d.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" varient="primary">
                          Search
                        </Button>
                      </Form>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Col>

          <Col>
            <Row className="create">
              {userInfo ? (
                <Col className="create">
                  <Link to="/createcomment">
                    <Button
                      style={{ marginLeft: 10, marginBottom: 6 }}
                      size="lg"
                    >
                      Create new Comments
                    </Button>
                  </Link>
                </Col>
              ) : (
                <div></div>
              )}

              <Col className="sort">
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Sort Comments
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => sortByDate()}>
                      {" "}
                      Sorted by Date(Oldest to Newest){" "}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => sortByLike()}>
                      {" "}
                      Sorted by Like(Most to Least)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => sortByLikeReverse()}>
                      {" "}
                      Sorted by Like(Least to Most)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => sortByDefault()}>
                      Default (Newest to Oldest)
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {loading && <Loading />}
            {loadingDelete && <Loading />}
            {comments &&
              comments.reverse().map((comment) => (
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
                      {comment.user === userInfo._id ? (
                        <div>
                          <Button href={`/comment/${comment._id}`}>Edit</Button>
                          <Button
                            variant={
                              comment.user === userInfo._id
                                ? "danger"
                                : "secondary"
                            }
                            className="mx-2"
                            disabled={
                              comment.user !== userInfo._id ? "disabled" : null
                            }
                            onClick={() =>
                              comment.user === userInfo._id
                                ? deleteHandler(comment._id)
                                : null
                            }
                            //onClick={() => deleteHandler(comment._id)}
                          >
                            Delete <BsXCircle />
                          </Button>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div>
                        <Button
                          variant={
                            comment.usersThatLikedTheComment.includes(
                              userInfo.username
                            ) == false
                              ? "secondary"
                              : "danger"
                          }
                          className="mx-2"
                          value="Like"
                          disabled={
                            comment.user === userInfo._id || !userInfo
                              ? "disabled"
                              : null
                          }
                          onClick={() =>
                            likeHandler(
                              comment._id,
                              comment.title,
                              comment.content,
                              comment.likes
                            )
                          }
                        >
                          {comment.usersThatLikedTheComment.includes(
                            userInfo.username
                          ) == false ? (
                            <FaRegHeart />
                          ) : (
                            <FaHeart />
                          )}{" "}
                          {comment.likes}
                        </Button>
                        <Button
                          className="mx-2"
                          value="Like"
                          disabled={
                            comment.user === userInfo._id || !userInfo
                              ? "disabled"
                              : null
                          }
                          onClick={(e) =>
                            flagHandler(
                              userInfo._id,
                              comment.user,
                              comment._id,
                              e
                            )
                          }
                        >
                          {comment.usersThatLikedTheComment.includes(
                            userInfo.username
                          ) == false ? (
                            <FaFontAwesomeFlag />
                          ) : (
                            <FaFontAwesomeFlag />
                          )}{" "}
                        </Button>
                      </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <h4>
                          <Badge variant="success">
                            <FaRegUserCircle />
                            {comment.username}
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
          </Col>
        </Row>
      </div>
      {isFlagged ? (
        <div>
          <h5>
            {" "}
            Hello {userInfo.name}, why dou you want to report this user?{" "}
          </h5>
          <div>
            <h6> Please explain why do you want to report this comment: </h6>
            <Form onSubmit={submitCauseHandler}>
              <Form.Group controlId="report">
                <Form.Control
                  type="text"
                  placeholder="Enter a Cause"
                  value={reportCause}
                  onChange={(d) => setReportCause(d.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" varient="primary">
                Submit Cause
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Comments;