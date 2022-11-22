import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../actions/commentsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateComment({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);

 
  
  const dispatch = useDispatch();

  const commentCreate = useSelector((state) => state.commentCreate);
  const { loading, error, comment } = commentCreate;

  console.log(comment);

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setLikes(0);


  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCommentAction(title, content));
    if ( !title || !content) return;

    resetHandler();
    history.push("/mycomments");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Comment">
      <Card>
        <Card.Header>Create a new Comment</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
             </Form.Group>
             
              <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
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
            
            <Form.Group controlId="content">
          </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Comment
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateComment;