import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBell, FaQuestionCircle, FaSpider } from "react-icons/fa";
import { logout } from "../actions/userActions";
import afra from "../afra.png";

function Header({ setSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const Not = localStorage.getItem("notification");

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={afra} style={{ height: "40px" }} alt="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto"></Nav>
          {userInfo ? (
            <Nav>
              <Nav.Link href="/bugreport">
                <FaSpider color={"black"}></FaSpider>
              </Nav.Link>
            </Nav>
          ) : (
            <div></div>
          )}
          <Nav>
            <Nav.Link href="/faq">
              FAQ <wbr></wbr>
              <FaQuestionCircle
                style={{ marginBottom: "3px" }}
              ></FaQuestionCircle>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/fixture">Fixture</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/teams">Teams</Nav.Link>
            <Nav.Link href="/topscorers/2022">Top Scorers</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/standings">Standings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/referees">Referees</Nav.Link>
          </Nav>
          <Nav>
            {userInfo ? (
              <>
                <Nav style={{ marginTop: "9px" }}>
                  <Nav.Link href="/calendar">Google Calendar</Nav.Link>
                </Nav>
                <Nav style={{ marginTop: "9px" }}>
                  <Nav.Link href="/notification">
                    <FaBell color={Not === "new" && "red"}></FaBell>
                  </Nav.Link>
                </Nav>
                <NavDropdown
                  title={
                    <>
                      {" "}
                      {userInfo.name} &#8205; &#8205;
                      <img
                        src={userInfo.pic}
                        alt={"pic"}
                        style={{ height: "40px", borderRadius: "50%" }}
                      />
                    </>
                  }
                  id="collasible-nav-dropdown"
                >
                  {userInfo.isAdmin ? (
                    <>
                      <NavDropdown.Item href="/adminpage">
                        {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                        Admin Page
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/adminban">
                        {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                        Ban Users
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/adminappeal">
                        {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                        Ban Appeal
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/adminmail">
                        {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                        Notification/Mail
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item href="/profile">
                        {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                      /> */}
                        My Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
