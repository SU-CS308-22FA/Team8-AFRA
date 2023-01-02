import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./LandingStyles.css";

function LandingPage() {
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/fixture");
    }
  }, [userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">WELCOME TO AFRA</h1>
              <p className="subtitle">Automated Fixture & Referee Assignment</p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
