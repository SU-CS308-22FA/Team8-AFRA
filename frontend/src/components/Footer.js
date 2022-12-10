import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <h3 style={{ color: "green", textAlign: "center" }}>
          AFRA: Automated Fixture & Referee Assignment
        </h3>
        <p></p>
        <h4 style={{ color: "green", textAlign: "center" }}>
          Copyright &copy; AFRA
        </h4>
      </Container>
    </footer>
  );
};

export default Footer;
