// src/components/NavBar.js

import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../UserContext";
import { NavLink } from "react-router-dom";

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const { user } = useContext(UserContext);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="ms-2">
          ShupperShopping
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              onClick={() => setExpanded(false)}
              className="font-weight-bold text-uppercase"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/products"
              onClick={() => setExpanded(false)}
              className="font-weight-bold text-uppercase"
            >
              Products
            </Nav.Link>
          </Nav>
          {user.isAdmin ? (
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/Users"
                onClick={() => setExpanded(false)}
                className="font-weight-bold text-uppercase"
              >
                Users
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/profile"
                onClick={() => setExpanded(false)}
                className="font-weight-bold text-uppercase"
              >
                Profile
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/logout"
                onClick={() => setExpanded(false)}
                className="font-weight-bold text-uppercase"
              >
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            user.id !== null ? (
              <Nav>
                <Nav.Link
                  as={NavLink}
                  to="/profile"
                  onClick={() => setExpanded(false)}
                  className="font-weight-bold text-uppercase"
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/logout"
                  onClick={() => setExpanded(false)}
                  className="font-weight-bold text-uppercase"
                >
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    onClick={() => setExpanded(false)}
                    className="font-weight-bold text-uppercase"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/register"
                    onClick={() => setExpanded(false)}
                    className="font-weight-bold text-uppercase"
                  >
                    Register
                  </Nav.Link>
                </>
              </Nav>
            )
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
