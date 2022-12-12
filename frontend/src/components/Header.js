import React, { useEffect } from "react";
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

function Header({ setSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/"></Navbar.Brand>
        <br></br>
        <Navbar.Brand href="/">AFRA</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto"></Nav>
          <Nav>
            <Nav.Link href="/fixture">Fixture</Nav.Link>
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
               <Nav>
            <Nav.Link href="/calendar" >Google Calendar</Nav.Link>
              </Nav>
                <Nav.Link href="/mycomments">My Comments</Nav.Link>
                <NavDropdown
                  title={`${userInfo.name}`}
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
                        Admin Ban
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
