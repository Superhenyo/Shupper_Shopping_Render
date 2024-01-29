
// Import necessary dependencies
import { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate, Link } from "react-router-dom";

// Define the custom style for the button
const customButtonStyle = {
  background: "linear-gradient(to right, #006175 0%, #00a950 100%)",
  borderRadius: "40px",
  boxSizing: "border-box",
  color: "#00a84f",
  display: "block",
  height: "50px",
  fontSize: "1.4em",
  padding: "4px",
  position: "relative",
  textDecoration: "none",
  width: "7em",
  zIndex: 2,
};

// Define the style for the button on hover
const customButtonHoverStyle = {
  color: "#fff",
};

// Define the style for the inner span of the button
const customButtonSpanStyle = {
  alignItems: "center",
  background: "#0e0e10",
  borderRadius: "40px",
  display: "flex",
  justifyContent: "center",
  height: "100%",
  transition: "background 0.5s ease",
  width: "100%",
};

// Define the style for the inner span of the button on hover
const customButtonSpanHoverStyle = {
  background: "transparent",
};

// Login component
export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);

          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome to Shupper",
          });
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again",
          });
        }
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  useEffect(() => {
    setIsActive(email !== "" && password !== "");
  }, [email, password]);

  return (
    (user.id !== null) ? (
      <Navigate to="/" />
    ) : (
      <Container fluid className="profileContainer">
        <Row className="justify-content-md-center align-self-center p-5">
          <Col xs={12} md={6}>
            <Card className="form-card bg-body-secondary">
              <Card.Body>
                <Form onSubmit={(e) => authenticate(e)}>
                  <h1 className="my-5 text-center">Login</h1>
                  <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant={isActive ? "primary" : "danger"}
                    type="submit"
                    id="submitBtn"
                    disabled={!isActive}
                    className="mx-auto d-grid gap-2"
                    size="lg"
                    style={{ ...customButtonStyle, ...(isHovered ? customButtonHoverStyle : {}) }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span style={isHovered ? customButtonSpanHoverStyle : customButtonSpanStyle} className="bn31span">
                      Submit
                    </span>
                  </Button>
                  <p className="message signin text-center">
                  No Account? <Link to="/Register">Click here to register</Link>
                    </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  );
}
