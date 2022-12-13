import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCommentAction,
  updateCommentAction,
} from "../../actions/commentsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";


function SingleComment() {
  const params = useParams();
  const com = params.id;
  const matchID = params.matchID;
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const commentUpdate = useSelector((state) => state.commentUpdate);
  const { loading, error } = commentUpdate;

  const commentDelete = useSelector((state) => state.commentDelete);
  const { loading: loadingDelete, error: errorDelete } = commentDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCommentAction(id));
    }
    navigate(`/matchdetails/${matchID}`);
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/comments/${com}`
      );
      setTitle(data.title);
      setContent(data.content);
      setDate(data.updatedAt);
    };

    fetching();
  }, [com, date]);

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateCommentAction(com, title, content));
    if (!title || !content) return;

    resetHandler();
    navigate(`/matchdetails/${matchID}`);
  };

  return (
    <MainScreen title="Edit Comment">
      <Card>
        <Card.Header>Edit your Comment</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Comment Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content"></Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Comment
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(com)}
            >
              Delete Comment
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleComment;
