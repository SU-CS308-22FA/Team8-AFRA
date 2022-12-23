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
        <h4 style={{ color: '#2146C7', textAlign: "center" }}>
          Copyright &copy; AFRA
        </h4>
      </Container>
    </footer>
  );
};

export default Footer;
